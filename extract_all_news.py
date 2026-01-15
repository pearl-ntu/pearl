#!/usr/bin/env python3
"""
Extract ALL news items from old WordPress SQL dump - improved version
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
    """Remove HTML tags from content"""
    if not html_content:
        return ""
    s = MLStripper()
    try:
        s.feed(html_content)
        return s.get_text()
    except:
        return html_content

def extract_all_posts_from_sql(sql_file_path):
    """Extract ALL posts from WordPress SQL dump - no limits"""
    print("Reading SQL file (this may take a moment)...")
    
    with open(sql_file_path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    print(f"File size: {len(content):,} characters")
    
    # Find all INSERT INTO wp_posts statement positions
    insert_positions = []
    for match in re.finditer(r"INSERT INTO `wp_posts`", content, re.IGNORECASE):
        insert_positions.append(match.start())
    
    print(f"Found {len(insert_positions)} INSERT INTO wp_posts statements")
    
    if not insert_positions:
        print("No INSERT statements found.")
        return []
    
    # Process ALL INSERT statements
    all_rows_combined = []
    for idx, pos in enumerate(insert_positions):
        # Find the end of this INSERT statement
        next_pos = insert_positions[idx + 1] if idx + 1 < len(insert_positions) else len(content)
        # Limit to 10MB per statement to avoid memory issues
        end_pos = min(next_pos, pos + 10000000)
        insert_stmt = content[pos:end_pos]
        
        # Extract VALUES part
        values_match = re.search(r'VALUES\s+(.+)', insert_stmt, re.DOTALL | re.IGNORECASE)
        if not values_match:
            continue
        
        insert_data = values_match.group(1)
        
        if idx < 3 or idx % 10 == 0:
            print(f"Processing INSERT {idx + 1}/{len(insert_positions)}...")
    
    # Extract rows - improved parsing
    rows = []
    current_pos = 0
    paren_count = 0
    in_quotes = False
    escape_next = False
    current_row = ""
    
    i = 0
    max_iterations = len(insert_data) * 2  # Safety limit
    iteration_count = 0
    
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
                    # Complete row found
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
        if idx < 3 or idx % 10 == 0:
            print(f"  Extracted {len(rows_from_this)} rows (total: {len(all_rows_combined)})")
    
    rows = all_rows_combined
    print(f"\nTotal rows extracted from all INSERT statements: {len(rows)}")
    
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
    except Exception as e:
        return None

def categorize_content(posts):
    """Categorize posts into news, research, team members, etc."""
    news_items = []
    
    for post in posts:
        if not post or post['status'] != 'publish':
            continue
        
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
    
    return news_items

def main():
    sql_file = 'xiaogang_liu/xiaogang_liu-wp1.sql'
    
    print("=" * 70)
    print("Extracting ALL News Items from Old WordPress Site")
    print("=" * 70)
    print()
    
    # Extract post rows
    rows = extract_all_posts_from_sql(sql_file)
    
    if not rows:
        print("No post rows found.")
        return
    
    print(f"Parsing {len(rows)} post rows...")
    
    # Parse rows
    posts = []
    for i, row in enumerate(rows):
        if i % 500 == 0:
            print(f"  Processing row {i}/{len(rows)}...")
        post = parse_post_row(row)
        if post:
            posts.append(post)
    
    print(f"\nSuccessfully parsed {len(posts)} posts")
    
    # Categorize - get only news
    print("\nCategorizing content...")
    news_items = categorize_content(posts)
    
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
    print(f"\nFirst 5 news items (newest):")
    for i, news in enumerate(news_items[:5], 1):
        print(f"  {i}. {news['title'][:60]}... ({news['date'][:10]})")
    
    print(f"\nLast 5 news items (oldest):")
    for i, news in enumerate(news_items[-5:], 1):
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
