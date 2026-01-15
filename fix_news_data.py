#!/usr/bin/env python3
"""
Fix news-data.js by properly escaping quotes and content
"""

import json
import re

    # Load extracted data - use the complete extraction
    with open('extracted_all_news.json', 'r', encoding='utf-8') as f:
        news_items = json.load(f)

def format_date(date_str):
    """Format date string to readable format"""
    try:
        parts = date_str.split()[0].split('-')
        if len(parts) == 3:
            year, month, day = parts
            months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            return f"{months[int(month)]} {day}, {year}"
    except:
        pass
    return date_str.split()[0] if date_str else ""

def escape_js_string(text):
    """Escape string for JavaScript"""
    if not text:
        return ""
    # Replace backslashes first
    text = text.replace('\\', '\\\\')
    # Replace quotes
    text = text.replace('"', '\\"')
    # Replace newlines
    text = text.replace('\n', '\\n')
    text = text.replace('\r', '')
    return text

# Convert to JavaScript format
js_content = "// News data extracted from old WordPress site\n"
js_content += "const newsData = [\n"

for i, news in enumerate(news_items):
    title = escape_js_string(news['title'].replace('\\"', '"'))
    date = format_date(news['date'])
    excerpt = escape_js_string(news.get('excerpt', '')[:200])
    
    # Clean content - remove escaped quotes and fix formatting
    content = news['content']
    content = content.replace('\\r\\n', '\n')
    content = content.replace('\\"', '"')
    content = content.replace('\\/', '/')
    # Escape for template literal
    content = content.replace('`', '\\`')
    content = content.replace('${', '\\${')
    
    js_content += "    {\n"
    js_content += f'        title: "{title}",\n'
    js_content += f'        date: "{date}",\n'
    js_content += f'        excerpt: "{excerpt}",\n'
    js_content += f'        content: `{content}`,\n'
    js_content += f'        slug: "{news.get("slug", "")}"\n'
    js_content += "    }"
    if i < len(news_items) - 1:
        js_content += ","
    js_content += "\n"

js_content += "];\n"

# Save to file
with open('news-data.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f"Fixed news-data.js with {len(news_items)} news items")
