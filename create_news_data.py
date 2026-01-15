#!/usr/bin/env python3
"""
Convert extracted news JSON to JavaScript format
"""

import json
import re
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

def clean_html(html_content):
    """Clean and format HTML content"""
    if not html_content:
        return ""
    # Unescape HTML entities
    html_content = html_content.replace('\\r\\n', '\n')
    html_content = html_content.replace('\\"', '"')
    html_content = html_content.replace('\\/', '/')
    return html_content

def format_date(date_str):
    """Format date string to readable format"""
    try:
        # Parse "2017-06-11 08:23:13"
        parts = date_str.split()[0].split('-')
        if len(parts) == 3:
            year, month, day = parts
            months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            return f"{months[int(month)]} {day}, {year}"
    except:
        pass
    return date_str.split()[0] if date_str else ""

def main():
    # Load extracted data
    with open('extracted_old_data.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    news_items = data.get('news', [])
    
    # Convert to JavaScript format
    js_content = "// News data extracted from old WordPress site\n"
    js_content += "const newsData = [\n"
    
    for i, news in enumerate(news_items):
        title = news['title'].replace('\\"', '"').replace('"', '\\"')
        date = format_date(news['date'])
        content = clean_html(news['content'])
        excerpt = strip_html(news.get('excerpt', ''))[:200]
        
        js_content += "    {\n"
        js_content += f'        title: "{title}",\n'
        js_content += f'        date: "{date}",\n'
        js_content += f'        excerpt: "{excerpt.replace(chr(34), chr(39))}",\n'
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
    
    print(f"Created news-data.js with {len(news_items)} news items")

if __name__ == '__main__':
    main()
