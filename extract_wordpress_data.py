#!/usr/bin/env python3
"""
Extract News, Research, and Team Members from Old WordPress SQL Dump
"""

import re
import json
import html
from html.parser import HTMLParser
from datetime import datetime

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
    """Remove HTML tags from content"""
    if not html_content:
        return ""
    s = MLStripper()
    try:
        s.feed(html_content)
        return s.get_text()
    except:
        return html_content

def extract_posts_from_sql(sql_file_path):
    """Extract posts from WordPress SQL dump"""
    print("Reading SQL file...")
    
    with open(sql_file_path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    print(f"File size: {len(content):,} characters")
    
    # Find all INSERT INTO wp_posts statements
    # They might be split across multiple lines
    insert_pattern = r"INSERT INTO `wp_posts` VALUES\s+(.+?)(?=INSERT INTO|LOCK TABLES|UNLOCK TABLES|;?\s*$)"
    
    all_inserts = re.findall(insert_pattern, content, re.DOTALL | re.IGNORECASE)
    print(f"Found {len(all_inserts)} INSERT statements")
    
    if not all_inserts:
        # Try alternative pattern
        insert_pattern2 = r"INSERT INTO `wp_posts`[^;]+;"
        all_inserts = re.findall(insert_pattern2, content, re.DOTALL | re.IGNORECASE)
        print(f"Alternative search found {len(all_inserts)} INSERT statements")
    
    if not all_inserts:
        print("No INSERT statements found. Checking file structure...")
        # Check if file has wp_posts at all
        if 'wp_posts' in content:
            print("wp_posts found in file, but INSERT pattern not matching")
            # Try to find the actual structure
            sample = content[content.find('wp_posts'):content.find('wp_posts')+2000]
            print("Sample around wp_posts:")
            print(sample[:500])
        return []
    
    # Process ALL INSERT statements - combine data from all
    all_rows_combined = []
    
    for insert_idx, insert_stmt in enumerate(all_inserts):
        # Extract VALUES part from each INSERT statement
        values_match = re.search(r'VALUES\s+(.+?)(?=INSERT INTO|LOCK TABLES|UNLOCK TABLES|;?\s*$)', insert_stmt, re.DOTALL | re.IGNORECASE)
        if not values_match:
            # Try alternative: just get everything after VALUES
            values_match = re.search(r'VALUES\s+(.+)', insert_stmt, re.DOTALL | re.IGNORECASE)
        
        if values_match:
            insert_data = values_match.group(1)
            
            # Extract rows from this INSERT statement
            rows_from_this = []
            paren_count = 0
            in_quotes = False
            escape_next = False
            current_row = ""
            
            i = 0
            while i < len(insert_data):
                char = insert_data[i]
                
                if escape_next:
                    current_row += char
                    escape_next = False
                    i += 1
                    continue
                
                if char == '\\':
                    escape_next = True
                    current_row += char
                    i += 1
                    continue
                
                if char == "'" and not escape_next:
                    in_quotes = not in_quotes
                    current_row += char
                    i += 1
                    continue
                
                if not in_quotes:
                    if char == '(':
                        if paren_count == 0:
                            current_row = ""
                        paren_count += 1
                        current_row += char
                    elif char == ')':
                        paren_count -= 1
                        current_row += char
                        if paren_count == 0:
                            row_content = current_row.strip().lstrip('(').rstrip(')')
                            if row_content:
                                rows_from_this.append(row_content)
                            current_row = ""
                    else:
                        current_row += char
                else:
                    current_row += char
                
                i += 1
            
            all_rows_combined.extend(rows_from_this)
            if insert_idx < 5:  # Show first few
                print(f"  INSERT {insert_idx + 1}: Extracted {len(rows_from_this)} rows")
    
    rows = all_rows_combined
    
    if not rows:
        print("No rows extracted from INSERT statements")
        return []
    
    print(f"Total rows extracted from all INSERT statements: {len(rows)}")
    
    return rows

def parse_post_row(row):
    """Parse a single WordPress post row"""
    # WordPress post fields (22 fields):
    # Split by comma but respect quoted strings
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
            # Remove surrounding quotes
            field_value = current_field.strip().strip("'").strip('"')
            fields.append(field_value)
            current_field = ""
        else:
            current_field += char
    
    if current_field:
        field_value = current_field.strip().strip("'").strip('"')
        fields.append(field_value)
    
    if len(fields) < 22:
        return None
    
    try:
        # WordPress post structure
        post_id = fields[0]
        post_author = fields[1]
        post_date = fields[2]
        post_title = html.unescape(fields[5]) if len(fields) > 5 else ""
        post_content = html.unescape(fields[4]) if len(fields) > 4 else ""
        post_excerpt = html.unescape(fields[6]) if len(fields) > 6 else ""
        post_status = fields[7] if len(fields) > 7 else ""
        post_name = fields[11] if len(fields) > 11 else ""
        post_type = fields[20] if len(fields) > 20 else ""
        post_mime_type = fields[21] if len(fields) > 21 else ""
        
        return {
            'id': post_id,
            'author': post_author,
            'date': post_date,
            'title': post_title,
            'content': post_content,
            'excerpt': post_excerpt,
            'status': post_status,
            'slug': post_name,
            'type': post_type,
            'mime_type': post_mime_type
        }
    except Exception as e:
        return None

def categorize_content(posts):
    """Categorize posts into news, research, team members, etc."""
    news_items = []
    research_pages = []
    team_members = []
    events = []
    other_pages = []
    
    for post in posts:
        if not post or post['status'] != 'publish':
            continue
        
        title_lower = post['title'].lower()
        content_lower = post['content'].lower()[:1000]  # First 1000 chars
        post_type = post['type']
        
        # News items (blog posts)
        if post_type == 'post':
            news_items.append({
                'title': post['title'],
                'date': post['date'],
                'content': post['content'],
                'excerpt': strip_html(post['content'])[:300] if post['content'] else (post['excerpt'][:300] if post['excerpt'] else ''),
                'slug': post['slug']
            })
        
        # Pages
        elif post_type == 'page':
            page_data = {
                'title': post['title'],
                'content': post['content'],
                'date': post['date'],
                'slug': post['slug']
            }
            
            # Categorize by keywords
            if any(keyword in title_lower for keyword in ['research', 'study', 'project', 'investigation']):
                research_pages.append(page_data)
            elif any(keyword in title_lower for keyword in ['team', 'member', 'people', 'person', 'student', 'postdoc', 'professor']):
                team_members.append(page_data)
            elif any(keyword in title_lower for keyword in ['event', 'conference', 'workshop', 'seminar']):
                events.append(page_data)
            else:
                other_pages.append(page_data)
    
    return {
        'news': news_items,
        'research': research_pages,
        'team_members': team_members,
        'events': events,
        'other_pages': other_pages
    }

def main():
    sql_file = 'xiaogang_liu/xiaogang_liu-wp1.sql'
    
    print("=" * 70)
    print("Extracting Data from Old WordPress Site")
    print("=" * 70)
    print()
    
    # Extract post rows
    rows = extract_posts_from_sql(sql_file)
    
    if not rows:
        print("No post rows found. Trying alternative extraction method...")
        return
    
    print(f"Parsing {len(rows)} post rows...")
    
    # Parse rows
    posts = []
    for i, row in enumerate(rows):
        if i % 100 == 0:
            print(f"  Processing row {i}/{len(rows)}...")
        post = parse_post_row(row)
        if post:
            posts.append(post)
    
    print(f"\nSuccessfully parsed {len(posts)} posts")
    
    # Categorize
    print("\nCategorizing content...")
    categorized = categorize_content(posts)
    
    print(f"\nExtracted:")
    print(f"  News items: {len(categorized['news'])}")
    print(f"  Research pages: {len(categorized['research'])}")
    print(f"  Team member pages: {len(categorized['team_members'])}")
    print(f"  Events: {len(categorized['events'])}")
    print(f"  Other pages: {len(categorized['other_pages'])}")
    
    # Save to JSON
    output_file = 'extracted_old_data.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(categorized, f, indent=2, ensure_ascii=False)
    
    print(f"\nData saved to: {output_file}")
    
    # Show samples
    if categorized['news']:
        print(f"\nSample News Items:")
        for i, news in enumerate(categorized['news'][:5], 1):
            print(f"  {i}. {news['title'][:60]}... ({news['date'][:10]})")
    
    if categorized['research']:
        print(f"\nResearch Pages Found:")
        for research in categorized['research'][:5]:
            print(f"  - {research['title']}")

if __name__ == '__main__':
    main()
