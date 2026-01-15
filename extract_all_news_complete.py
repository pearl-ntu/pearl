#!/usr/bin/env python3
"""
Extract ALL news items from ALL INSERT statements in WordPress SQL dump
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
    if not html_content:
        return ""
    s = MLStripper()
    try:
        s.feed(html_content)
        return s.get_text()
    except:
        return html_content

def extract_rows_from_insert(insert_statement):
    """Extract rows from a single INSERT statement"""
    # Find the VALUES part
    values_match = re.search(r'VALUES\s+(.+?)(?=;|$)', insert_statement, re.DOTALL | re.IGNORECASE)
    if not values_match:
        return []
    
    values_data = values_match.group(1)
    rows = []
    current_row = ""
    paren_count = 0
    in_quotes = False
    escape_next = False
    
    i = 0
    while i < len(values_data):
        char = values_data[i]
        
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
                        rows.append(row_content)
                    current_row = ""
            else:
                current_row += char
        else:
            current_row += char
        
        i += 1
    
    return rows

def parse_post_row(row):
    """Parse a single WordPress post row"""
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
        post_id = fields[0]
        post_date = fields[2]
        post_title = html.unescape(fields[5]) if len(fields) > 5 else ""
        post_content = html.unescape(fields[4]) if len(fields) > 4 else ""
        post_excerpt = html.unescape(fields[6]) if len(fields) > 6 else ""
        post_status = fields[7] if len(fields) > 7 else ""
        post_name = fields[11] if len(fields) > 11 else ""
        post_type = fields[20] if len(fields) > 20 else ""
        
        return {
            'id': post_id,
            'date': post_date,
            'title': post_title,
            'content': post_content,
            'excerpt': post_excerpt,
            'status': post_status,
            'slug': post_name,
            'type': post_type
        }
    except:
        return None

def main():
    sql_file = 'xiaogang_liu/xiaogang_liu-wp1.sql'
    
    print("=" * 70)
    print("Extracting ALL News Items from ALL INSERT Statements")
    print("=" * 70)
    print()
    
    print("Reading SQL file...")
    with open(sql_file, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    print(f"File size: {len(content):,} characters")
    
    # Find ALL INSERT INTO wp_posts statements
    # Pattern: INSERT INTO `wp_posts` ... VALUES ... ;
    insert_pattern = r"INSERT INTO `wp_posts`[^;]+;"
    all_inserts = re.findall(insert_pattern, content, re.DOTALL | re.IGNORECASE)
    
    print(f"Found {len(all_inserts)} INSERT statements")
    
    if not all_inserts:
        print("No INSERT statements found!")
        return
    
    # Process all INSERT statements
    all_rows = []
    for idx, insert_stmt in enumerate(all_inserts):
        print(f"Processing INSERT statement {idx + 1}/{len(all_inserts)}...")
        rows = extract_rows_from_insert(insert_stmt)
        all_rows.extend(rows)
        print(f"  Extracted {len(rows)} rows from this statement")
    
    print(f"\nTotal rows extracted: {len(all_rows)}")
    
    # Parse all rows
    print(f"\nParsing {len(all_rows)} post rows...")
    posts = []
    for i, row in enumerate(all_rows):
        if i % 200 == 0:
            print(f"  Processing row {i}/{len(all_rows)}...")
        post = parse_post_row(row)
        if post:
            posts.append(post)
    
    print(f"Successfully parsed {len(posts)} posts")
    
    # Filter for published posts only
    news_items = []
    for post in posts:
        if post['status'] == 'publish' and post['type'] == 'post':
            news_items.append({
                'title': post['title'],
                'date': post['date'],
                'content': post['content'],
                'excerpt': strip_html(post['content'])[:300] if post['content'] else (post['excerpt'][:300] if post['excerpt'] else ''),
                'slug': post['slug']
            })
    
    # Sort by date (newest first)
    news_items.sort(key=lambda x: x['date'], reverse=True)
    
    print(f"\nExtracted {len(news_items)} news items")
    print(f"\nDate range:")
    if news_items:
        print(f"  Oldest: {news_items[-1]['date'][:10]}")
        print(f"  Newest: {news_items[0]['date'][:10]}")
    
    # Save to JSON
    output_file = 'extracted_all_news.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(news_items, f, indent=2, ensure_ascii=False)
    
    print(f"\nData saved to: {output_file}")
    
    # Show samples
    print(f"\nFirst 10 news items (newest):")
    for i, news in enumerate(news_items[:10], 1):
        print(f"  {i}. {news['title'][:60]}... ({news['date'][:10]})")
    
    # Count by year
    from collections import Counter
    years = [item['date'][:4] for item in news_items if item['date']]
    year_counts = Counter(years)
    print(f"\nNews items by year:")
    for year in sorted(year_counts.keys(), reverse=True):
        print(f"  {year}: {year_counts[year]} items")

if __name__ == '__main__':
    main()
