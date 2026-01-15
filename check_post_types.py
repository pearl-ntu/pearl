#!/usr/bin/env python3
"""Check post types and statuses to see why we're missing news after 2019"""

import re
import html

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
        post_date = fields[2]
        post_type = fields[20] if len(fields) > 20 else ""
        post_status = fields[7] if len(fields) > 7 else ""
        post_title = html.unescape(fields[5]) if len(fields) > 5 else ""
        
        return {
            'date': post_date,
            'type': post_type,
            'status': post_status,
            'title': post_title[:50] if post_title else ""
        }
    except:
        return None

# Use the working extraction script's method
with open('xiaogang_liu/xiaogang_liu-wp1.sql', 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

# Find INSERT INTO wp_posts
insert_pattern = r"INSERT INTO `wp_posts` VALUES\s+(.+?)(?=INSERT INTO|LOCK TABLES|UNLOCK TABLES|;?\s*$)"
all_inserts = re.findall(insert_pattern, content, re.DOTALL | re.IGNORECASE)

if not all_inserts:
    insert_pattern2 = r"INSERT INTO `wp_posts`[^;]+;"
    all_inserts = re.findall(insert_pattern2, content, re.DOTALL | re.IGNORECASE)

if all_inserts:
    insert_data = all_inserts[0]
    
    # Extract rows
    rows = []
    paren_count = 0
    in_quotes = False
    escape_next = False
    current_row = ""
    
    i = 0
    while i < len(insert_data) and len(rows) < 500:  # Limit for testing
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
                        rows.append(row_content)
                    current_row = ""
            else:
                current_row += char
        else:
            current_row += char
        
        i += 1
    
    print(f"Extracted {len(rows)} rows for analysis")
    
    # Analyze
    posts = []
    for row in rows:
        post = parse_post_row(row)
        if post:
            posts.append(post)
    
    print(f"Parsed {len(posts)} posts")
    
    # Check by type and status
    print("\nPosts by type:")
    types = {}
    for post in posts:
        types[post['type']] = types.get(post['type'], 0) + 1
    for t, count in sorted(types.items()):
        print(f"  {t}: {count}")
    
    print("\nPosts by status:")
    statuses = {}
    for post in posts:
        statuses[post['status']] = statuses.get(post['status'], 0) + 1
    for s, count in sorted(statuses.items()):
        print(f"  {s}: {count}")
    
    # Check posts after 2019
    print("\nPosts with type='post' and status='publish' after 2019:")
    news_after_2019 = [p for p in posts if p['type'] == 'post' and p['status'] == 'publish' and p['date'][:4] > '2019']
    print(f"Found {len(news_after_2019)} news items after 2019")
    
    if news_after_2019:
        print("\nSample news items after 2019:")
        for i, news in enumerate(news_after_2019[:10], 1):
            print(f"  {i}. {news['title']} ({news['date'][:10]})")
    
    # Check all posts after 2019 regardless of type/status
    all_after_2019 = [p for p in posts if p['date'][:4] > '2019']
    print(f"\nTotal posts after 2019 (all types/statuses): {len(all_after_2019)}")
