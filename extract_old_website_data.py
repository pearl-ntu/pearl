#!/usr/bin/env python3
"""
Extract data from old WordPress site (xiaogang_liu folder)
Extracts: News, Research, Old Members, Publications structure
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

def parse_sql_file(sql_file_path):
    """Parse WordPress SQL dump and extract relevant data"""
    
    print("Reading SQL file...")
    with open(sql_file_path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    # Extract posts data
    posts_pattern = r"INSERT INTO `wp_posts` VALUES\s+(.+?);"
    posts_matches = re.findall(posts_pattern, content, re.DOTALL)
    
    news_items = []
    research_content = []
    publications_content = []
    team_members = []
    pages = []
    
    print(f"Found {len(posts_matches)} post entries")
    
    for match in posts_matches:
        # Parse post data - WordPress posts format:
        # ID, post_author, post_date, post_date_gmt, post_content, post_title, post_excerpt, post_status, comment_status, ping_status, post_password, post_name, to_ping, pinged, post_modified, post_modified_gmt, post_content_filtered, post_parent, guid, menu_order, post_type, post_mime_type, comment_count
        values = match.split("',")
        
        if len(values) < 20:
            continue
        
        try:
            # Extract key fields
            post_id = values[0].strip().replace("'", "").replace("(", "")
            post_title = values[5].strip().replace("'", "") if len(values) > 5 else ""
            post_content = values[4].strip().replace("'", "") if len(values) > 4 else ""
            post_type = values[20].strip().replace("'", "").replace(")", "") if len(values) > 20 else ""
            post_status = values[7].strip().replace("'", "") if len(values) > 7 else ""
            post_date = values[2].strip().replace("'", "") if len(values) > 2 else ""
            
            # Only process published content
            if post_status != 'publish':
                continue
            
            # Clean HTML entities
            post_title = html.unescape(post_title)
            post_content = html.unescape(post_content)
            
            # Categorize by post type and title
            title_lower = post_title.lower()
            content_lower = post_content.lower()
            
            if post_type == 'post':
                # News/Blog posts
                news_items.append({
                    'id': post_id,
                    'title': post_title,
                    'content': post_content,
                    'date': post_date,
                    'excerpt': strip_html(post_content)[:200] + '...' if len(strip_html(post_content)) > 200 else strip_html(post_content)
                })
            
            elif post_type == 'page':
                # Pages (Research, Publications, etc.)
                if 'research' in title_lower or 'research' in content_lower[:500]:
                    research_content.append({
                        'id': post_id,
                        'title': post_title,
                        'content': post_content,
                        'date': post_date
                    })
                elif 'publication' in title_lower:
                    publications_content.append({
                        'id': post_id,
                        'title': post_title,
                        'content': post_content,
                        'date': post_date
                    })
                else:
                    pages.append({
                        'id': post_id,
                        'title': post_title,
                        'content': post_content,
                        'date': post_date
                    })
            
            # Check for team members (might be in custom post type or pages)
            if 'team' in title_lower or 'member' in title_lower or 'people' in title_lower:
                team_members.append({
                    'id': post_id,
                    'title': post_title,
                    'content': post_content,
                    'date': post_date
                })
        
        except Exception as e:
            print(f"Error parsing post: {e}")
            continue
    
    return {
        'news': news_items,
        'research': research_content,
        'publications': publications_content,
        'team_members': team_members,
        'pages': pages
    }

def extract_publications_toc_structure(publications_content):
    """Extract TOC structure from publications page"""
    toc_structure = []
    
    for pub in publications_content:
        content = pub['content']
        
        # Look for year headings (h2 tags with years)
        year_pattern = r'<h2[^>]*>(\d{4})</h2>'
        years = re.findall(year_pattern, content, re.IGNORECASE)
        
        # Look for publication list items
        pub_pattern = r'<li[^>]*>(.*?)</li>'
        publications = re.findall(pub_pattern, content, re.DOTALL)
        
        toc_structure.append({
            'years': years,
            'publication_count': len(publications)
        })
    
    return toc_structure

def main():
    sql_file = 'xiaogang_liu/xiaogang_liu-wp1.sql'
    
    print("=" * 70)
    print("Extracting Data from Old WordPress Site")
    print("=" * 70)
    
    data = parse_sql_file(sql_file)
    
    print(f"\nExtracted:")
    print(f"  News items: {len(data['news'])}")
    print(f"  Research pages: {len(data['research'])}")
    print(f"  Publication pages: {len(data['publications'])}")
    print(f"  Team member entries: {len(data['team_members'])}")
    print(f"  Other pages: {len(data['pages'])}")
    
    # Extract TOC structure
    toc_info = extract_publications_toc_structure(data['publications'])
    
    # Save extracted data
    output = {
        'news': data['news'][:50],  # Limit to first 50 news items
        'research': data['research'],
        'publications_structure': toc_info,
        'team_members': data['team_members'],
        'summary': {
            'total_news': len(data['news']),
            'total_research': len(data['research']),
            'total_publications_pages': len(data['publications']),
            'total_team_members': len(data['team_members'])
        }
    }
    
    with open('extracted_old_data.json', 'w', encoding='utf-8') as f:
        json.dump(output, f, indent=2, ensure_ascii=False)
    
    print(f"\nData saved to: extracted_old_data.json")
    print(f"\nSample News Items:")
    for i, news in enumerate(data['news'][:5], 1):
        print(f"  {i}. {news['title'][:60]}... ({news['date']})")
    
    if data['publications']:
        print(f"\nPublications Page Found:")
        print(f"  Title: {data['publications'][0]['title']}")
        print(f"  Content length: {len(data['publications'][0]['content'])} chars")
        print(f"  TOC structure: {toc_info}")

if __name__ == '__main__':
    main()
