#!/usr/bin/env python3
"""
Extract data from old WordPress site - Improved version
"""

import re
import json
import html
from html.parser import HTMLParser

class MLStripper(HTMLParser):
    def __init__(self):
        super().__init__()
        self.reset()
        self.strict = False
        self.convert_charrefs = True
        self.text = []
    def handle_data(self, d):
        self.text.append(d)
    def get_text(self):
        return ''.join(self.text)

def strip_html(html_content):
    s = MLStripper()
    s.feed(html_content)
    return s.get_text()

def parse_sql_insert(sql_file_path):
    """Parse SQL INSERT statements more carefully"""
    
    print("Reading SQL file (this may take a moment)...")
    with open(sql_file_path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    # Find the wp_posts INSERT statement
    posts_match = re.search(r"INSERT INTO `wp_posts` VALUES\s+(.+?);", content, re.DOTALL)
    
    if not posts_match:
        print("Could not find wp_posts INSERT statement")
        return None
    
    posts_data = posts_match.group(1)
    
    # Split by ),( to get individual rows, but be careful with nested parentheses
    # WordPress post format has ~22 fields
    rows = []
    current_row = ""
    paren_depth = 0
    in_string = False
    escape_next = False
    
    for char in posts_data:
        if escape_next:
            current_row += char
            escape_next = False
            continue
        
        if char == '\\':
            escape_next = True
            current_row += char
            continue
        
        if char == "'" and not escape_next:
            in_string = not in_string
            current_row += char
            continue
        
        if not in_string:
            if char == '(':
                paren_depth += 1
                current_row += char
            elif char == ')':
                paren_depth -= 1
                current_row += char
                if paren_depth == 0:
                    rows.append(current_row.strip().lstrip('(').rstrip(')'))
                    current_row = ""
            else:
                current_row += char
        else:
            current_row += char
    
    print(f"Found {len(rows)} post rows")
    
    news_items = []
    research_content = []
    publications_content = []
    team_members = []
    all_pages = []
    
    for i, row in enumerate(rows[:100]):  # Process first 100 rows
        try:
            # Split by ',' but respect quoted strings
            fields = []
            current_field = ""
            in_quotes = False
            escape_next = False
            
            for char in row:
                if escape_next:
                    current_field += char
                    escape_next = False
                    continue
                
                if char == '\\':
                    escape_next = True
                    current_field += char
                    continue
                
                if char == "'":
                    in_quotes = not in_quotes
                    current_field += char
                    continue
                
                if not in_quotes and char == ',':
                    fields.append(current_field.strip().strip("'"))
                    current_field = ""
                else:
                    current_field += char
            
            if current_field:
                fields.append(current_field.strip().strip("'"))
            
            if len(fields) < 22:
                continue
            
            # WordPress post fields (simplified):
            # 0: ID, 1: post_author, 2: post_date, 3: post_date_gmt, 
            # 4: post_content, 5: post_title, 6: post_excerpt,
            # 7: post_status, 8: comment_status, 9: ping_status,
            # 10: post_password, 11: post_name, 12: to_ping,
            # 13: pinged, 14: post_modified, 15: post_modified_gmt,
            # 16: post_content_filtered, 17: post_parent,
            # 18: guid, 19: menu_order, 20: post_type, 21: post_mime_type, 22: comment_count
            
            post_id = fields[0]
            post_title = html.unescape(fields[5]) if len(fields) > 5 else ""
            post_content = html.unescape(fields[4]) if len(fields) > 4 else ""
            post_type = fields[20] if len(fields) > 20 else ""
            post_status = fields[7] if len(fields) > 7 else ""
            post_date = fields[2] if len(fields) > 2 else ""
            
            if post_status != 'publish':
                continue
            
            title_lower = post_title.lower()
            content_lower = post_content.lower()[:500]
            
            if post_type == 'post':
                news_items.append({
                    'id': post_id,
                    'title': post_title,
                    'content': post_content[:1000],  # First 1000 chars
                    'date': post_date,
                    'excerpt': strip_html(post_content)[:200]
                })
            
            elif post_type == 'page':
                page_data = {
                    'id': post_id,
                    'title': post_title,
                    'content': post_content[:5000],  # First 5000 chars
                    'date': post_date
                }
                
                if 'research' in title_lower or 'research' in content_lower:
                    research_content.append(page_data)
                elif 'publication' in title_lower:
                    publications_content.append(page_data)
                elif 'team' in title_lower or 'member' in title_lower or 'people' in title_lower:
                    team_members.append(page_data)
                else:
                    all_pages.append(page_data)
        
        except Exception as e:
            if i < 10:  # Only print first few errors
                print(f"Error parsing row {i}: {e}")
            continue
    
    return {
        'news': news_items,
        'research': research_content,
        'publications': publications_content,
        'team_members': team_members,
        'pages': all_pages
    }

def main():
    sql_file = 'xiaogang_liu/xiaogang_liu-wp1.sql'
    
    print("=" * 70)
    print("Extracting Data from Old WordPress Site")
    print("=" * 70)
    
    data = parse_sql_insert(sql_file)
    
    if not data:
        print("Failed to extract data")
        return
    
    print(f"\nExtracted:")
    print(f"  News items: {len(data['news'])}")
    print(f"  Research pages: {len(data['research'])}")
    print(f"  Publication pages: {len(data['publications'])}")
    print(f"  Team member entries: {len(data['team_members'])}")
    print(f"  Other pages: {len(data['pages'])}")
    
    # Save extracted data
    output = {
        'news': data['news'],
        'research': data['research'],
        'publications': data['publications'],
        'team_members': data['team_members'],
        'pages': data['pages'],
        'summary': {
            'total_news': len(data['news']),
            'total_research': len(data['research']),
            'total_publications_pages': len(data['publications']),
            'total_team_members': len(data['team_members']),
            'total_pages': len(data['pages'])
        }
    }
    
    with open('extracted_old_data.json', 'w', encoding='utf-8') as f:
        json.dump(output, f, indent=2, ensure_ascii=False)
    
    print(f"\nData saved to: extracted_old_data.json")
    
    if data['news']:
        print(f"\nSample News Items:")
        for i, news in enumerate(data['news'][:3], 1):
            print(f"  {i}. {news['title'][:60]}... ({news['date']})")
    
    if data['publications']:
        print(f"\nPublications Pages Found:")
        for pub in data['publications']:
            print(f"  - {pub['title']} (ID: {pub['id']})")
            # Look for TOC structure
            if 'h2' in pub['content'].lower() or 'year' in pub['content'].lower()[:1000]:
                print(f"    Contains year headings (possible TOC structure)")

if __name__ == '__main__':
    main()
