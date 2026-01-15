#!/usr/bin/env python3
"""
Script to add TOC (Table of Contents) images to publications
Usage: python add_toc_images.py
"""

import json
import re
import os

def load_publications():
    """Load publications from JavaScript file"""
    with open('publications-data.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract the array content
    array_match = re.search(r'const\s+publicationsData\s*=\s*\[(.*?)\];', content, re.DOTALL)
    if not array_match:
        return None, content
    
    array_content = array_match.group(1)
    
    # Parse publications (simplified - assumes consistent format)
    publications = []
    # This is a simplified parser - for full parsing, we'd need a more robust approach
    # For now, we'll work with the structure
    
    return publications, content

def add_toc_image_interactive():
    """Interactive function to add TOC images to publications"""
    print("\n" + "="*70)
    print("Add TOC Images to Publications")
    print("="*70)
    print("\nThis script helps you add TOC (Table of Contents) figure URLs to publications.")
    print("TOC figures are graphical abstracts/images that represent each publication.\n")
    
    # Read current publications
    with open('publications-data.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all publication entries
    pub_pattern = r'\{\s*title:\s*"([^"]+)",\s*authors:\s*"([^"]+)",\s*journal:\s*"([^"]+)",\s*year:\s*(\d+),\s*citations:\s*(\d+),\s*url:\s*"([^"]+)"\s*\}'
    matches = list(re.finditer(pub_pattern, content, re.DOTALL))
    
    print(f"Found {len(matches)} publications\n")
    print("To add a TOC image, you need to:")
    print("1. Find the TOC image URL (from journal website or your files)")
    print("2. Add it to the publication entry\n")
    print("Example format:")
    print('  tocImage: "images/publications/toc-2025-01.jpg"')
    print('  or')
    print('  tocImage: "https://pubs.acs.org/doi/10.1021/jacs.5c15490/toc-image"\n')
    
    return content

def update_publication_with_toc(js_content, title_search, toc_image_url):
    """Update a publication entry to include TOC image"""
    # Find the publication by title
    pattern = rf'(\{{\s*title:\s*"[^"]*{re.escape(title_search)}[^"]*",\s*authors:\s*"[^"]+",\s*journal:\s*"[^"]+",\s*year:\s*\d+,\s*citations:\s*\d+,\s*url:\s*"[^"]+")(\s*\}})'
    
    def replace_func(match):
        pub_start = match.group(1)
        pub_end = match.group(2)
        # Check if tocImage already exists
        if 'tocImage' in match.group(0):
            # Replace existing tocImage
            return re.sub(r',\s*tocImage:\s*"[^"]*"', f',\n        tocImage: "{toc_image_url}"', match.group(0))
        else:
            # Add tocImage before closing brace
            return pub_start + f',\n        tocImage: "{toc_image_url}"' + pub_end
    
    new_content = re.sub(pattern, replace_func, js_content, flags=re.IGNORECASE)
    return new_content

def main():
    print("TOC Image Manager for Publications")
    print("="*70)
    print("\nOptions:")
    print("1. Interactive mode - add TOC images one by one")
    print("2. Batch mode - provide a CSV/JSON file with title and image URL mappings")
    print("3. View current publications\n")
    
    choice = input("Choose option (1/2/3): ").strip()
    
    if choice == '1':
        add_toc_image_interactive()
        print("\nTo add TOC images manually, edit publications-data.js")
        print("Add 'tocImage: \"URL\"' field to each publication object\n")
    elif choice == '2':
        file_path = input("Enter path to CSV/JSON file: ").strip()
        if os.path.exists(file_path):
            print(f"Processing {file_path}...")
            # TODO: Implement batch processing
            print("Batch processing not yet implemented. Please use manual editing.")
        else:
            print(f"File not found: {file_path}")
    elif choice == '3':
        with open('publications-data.js', 'r', encoding='utf-8') as f:
            content = f.read()
        # Count publications
        pub_count = len(re.findall(r'title:\s*"[^"]+"', content))
        print(f"\nTotal publications: {pub_count}")
        # Count with TOC images
        toc_count = len(re.findall(r'tocImage:', content))
        print(f"Publications with TOC images: {toc_count}")
        print(f"Publications without TOC images: {pub_count - toc_count}\n")

if __name__ == '__main__':
    main()
