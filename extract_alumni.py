#!/usr/bin/env python3
"""
Extract alumni data from old WordPress site
"""

import json
import re
from html.parser import HTMLParser

def extract_alumni_from_content(content):
    """Extract alumni information from HTML content"""
    alumni = []
    
    # Find the Alumni section
    alumni_match = re.search(r'<h1>Alumni:</h1>.*?<ul>(.*?)</ul>', content, re.DOTALL | re.IGNORECASE)
    if not alumni_match:
        return alumni
    
    alumni_html = alumni_match.group(1)
    
    # Extract each list item
    li_pattern = r'<li>(.*?)</li>'
    for match in re.finditer(li_pattern, alumni_html, re.DOTALL):
        item_text = match.group(1)
        # Remove HTML tags
        item_text = re.sub(r'<[^>]+>', '', item_text)
        item_text = item_text.strip()
        
        if item_text:
            # Parse name and details
            # Format: "Name (Role, Years)" or "Name (Role, Years; Current position)"
            parts = item_text.split('(')
            if len(parts) >= 2:
                name = parts[0].strip()
                details = '(' + '('.join(parts[1:])
                
                # Extract role and years
                role_match = re.search(r'\(([^,]+),\s*(\d{4}-\d{4})\)', details)
                if role_match:
                    role = role_match.group(1).strip()
                    years = role_match.group(2).strip()
                    
                    # Check for current position
                    current_pos = None
                    if 'Currently' in details or ';' in details:
                        current_match = re.search(r'Currently\s+(.+?)(?:\)|$)', details, re.IGNORECASE)
                        if current_match:
                            current_pos = current_match.group(1).strip()
                    
                    alumni.append({
                        'name': name,
                        'role': role,
                        'years': years,
                        'currentPosition': current_pos
                    })
                else:
                    # Fallback: just store name and full details
                    alumni.append({
                        'name': name,
                        'role': details,
                        'years': '',
                        'currentPosition': None
                    })
    
    return alumni

def extract_urop_students(content):
    """Extract UROP/internship students"""
    urop_students = []
    
    # Find UROP section
    urop_match = re.search(r'UROP/internship students:.*?<ul>(.*?)</ul>', content, re.DOTALL | re.IGNORECASE)
    if not urop_match:
        return urop_students
    
    urop_html = urop_match.group(1)
    
    # Extract each list item
    li_pattern = r'<li>(.*?)</li>'
    for match in re.finditer(li_pattern, urop_html, re.DOTALL):
        item_text = match.group(1)
        item_text = re.sub(r'<[^>]+>', '', item_text)
        item_text = item_text.strip()
        
        if item_text:
            # Format: "Name (Year)" or "Name (Institution; Year)"
            parts = item_text.split('(')
            if len(parts) >= 2:
                name = parts[0].strip()
                details = '(' + '('.join(parts[1:])
                
                # Extract year
                year_match = re.search(r'(\d{4})', details)
                year = year_match.group(1) if year_match else ''
                
                # Extract institution if present
                institution = None
                if ';' in details:
                    inst_match = re.search(r'\(([^;]+);', details)
                    if inst_match:
                        institution = inst_match.group(1).strip()
                
                urop_students.append({
                    'name': name,
                    'year': year,
                    'institution': institution
                })
    
    return urop_students

def main():
    # Load extracted data
    with open('extracted_old_data.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Find the People page
    team_members = data.get('team_members', [])
    
    alumni_list = []
    urop_list = []
    
    for page in team_members:
        if 'people' in page.get('title', '').lower() or 'people' in page.get('slug', '').lower():
            content = page.get('content', '')
            
            # Unescape HTML
            content = content.replace('\\r\\n', '\n')
            content = content.replace('\\"', '"')
            content = content.replace('\\/', '/')
            
            alumni_list = extract_alumni_from_content(content)
            urop_list = extract_urop_students(content)
            break
    
    print(f"Extracted {len(alumni_list)} alumni")
    print(f"Extracted {len(urop_list)} UROP/internship students")
    
    # Save to JSON for review
    output = {
        'alumni': alumni_list,
        'urop_students': urop_list
    }
    
    with open('extracted_alumni.json', 'w', encoding='utf-8') as f:
        json.dump(output, f, indent=2, ensure_ascii=False)
    
    print("\nSample alumni:")
    for i, alum in enumerate(alumni_list[:5], 1):
        print(f"  {i}. {alum['name']} - {alum.get('role', '')} ({alum.get('years', '')})")
        if alum.get('currentPosition'):
            print(f"     Currently: {alum['currentPosition']}")
    
    print(f"\nData saved to: extracted_alumni.json")
    
    return alumni_list, urop_list

if __name__ == '__main__':
    main()
