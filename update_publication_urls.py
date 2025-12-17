#!/usr/bin/env python3
"""
Script to update publication URLs in publications-data.js
Allows updating URLs one by one or in batches
"""

import re
import os
import sys
import json

def parse_js_file(js_file_path):
    """Parse JavaScript file to extract publications"""
    with open(js_file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    publications = []
    
    # Find the array content
    array_match = re.search(r'const\s+publicationsData\s*=\s*\[(.*?)\];', content, re.DOTALL)
    if not array_match:
        raise ValueError("Could not find publicationsData array")
    
    array_content = array_match.group(1)
    
    # Find each object in the array
    # Match: { title: "...", authors: "...", journal: "...", year: ..., citations: ..., url: "..." }
    # This regex handles multiline objects
    obj_pattern = r'\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}'
    
    for obj_match in re.finditer(obj_pattern, array_content, re.DOTALL):
        obj_str = obj_match.group(0)
        
        # Extract fields using regex
        title_match = re.search(r'title:\s*"([^"\\]*(?:\\.[^"\\]*)*)"', obj_str)
        authors_match = re.search(r'authors:\s*"([^"\\]*(?:\\.[^"\\]*)*)"', obj_str)
        journal_match = re.search(r'journal:\s*"([^"\\]*(?:\\.[^"\\]*)*)"', obj_str)
        year_match = re.search(r'year:\s*(\d+)', obj_str)
        citations_match = re.search(r'citations:\s*(\d+)', obj_str)
        url_match = re.search(r'url:\s*"([^"\\]*(?:\\.[^"\\]*)*)"', obj_str)
        
        if all([title_match, authors_match, journal_match, year_match, citations_match, url_match]):
            pub = {
                'title': title_match.group(1),
                'authors': authors_match.group(1),
                'journal': journal_match.group(1),
                'year': int(year_match.group(1)),
                'citations': int(citations_match.group(1)),
                'url': url_match.group(1)
            }
            publications.append(pub)
    
    return publications, content

def save_to_js_file(js_file_path, publications, original_content):
    """Save publications back to JavaScript file"""
    # Build the new array content
    array_items = []
    for pub in publications:
        # Escape quotes and backslashes in strings
        title = pub['title'].replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n').replace('\r', '\\r')
        authors = pub['authors'].replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n').replace('\r', '\\r')
        journal = pub['journal'].replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n').replace('\r', '\\r')
        url = pub['url'].replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n').replace('\r', '\\r')
        
        item = f'''    {{
        title: "{title}",
        authors: "{authors}",
        journal: "{journal}",
        year: {pub['year']},
        citations: {pub['citations']},
        url: "{url}"
    }}'''
        array_items.append(item)
    
    new_array_content = ',\n'.join(array_items)
    new_content_js = f'const publicationsData = [\n{new_array_content}\n];'
    
    # Replace the array in original content, preserving everything before and after
    pattern = r'const\s+publicationsData\s*=\s*\[.*?\];'
    new_full_content = re.sub(pattern, new_content_js, original_content, flags=re.DOTALL)
    
    with open(js_file_path, 'w', encoding='utf-8') as f:
        f.write(new_full_content)

def update_urls_interactive(publications, batch_size=10):
    """Interactive function to update URLs"""
    total = len(publications)
    updated_count = 0
    
    print(f"\n{'='*70}")
    print(f"Publication URL Updater")
    print(f"{'='*70}")
    print(f"Total publications: {total}")
    print(f"Batch size: {batch_size}")
    print(f"\nCommands:")
    print(f"  - Enter URL to update")
    print(f"  - Press Enter to skip (keep current URL)")
    print(f"  - Type 'q' to quit and save")
    print(f"  - Type 'skip' to skip remaining in batch")
    print(f"{'='*70}\n")
    
    i = 0
    while i < total:
        batch_end = min(i + batch_size, total)
        print(f"\n--- Batch {i//batch_size + 1}: Publications {i+1}-{batch_end} of {total} ---\n")
        
        for j in range(i, batch_end):
            pub = publications[j]
            current_url = pub.get('url', 'N/A')
            
            print(f"\n[{j+1}/{total}] {pub.get('year', 'N/A')}")
            title_display = pub.get('title', 'N/A')
            if len(title_display) > 80:
                title_display = title_display[:77] + '...'
            print(f"Title: {title_display}")
            
            journal_display = pub.get('journal', 'N/A')
            if len(journal_display) > 60:
                journal_display = journal_display[:57] + '...'
            print(f"Journal: {journal_display}")
            
            url_display = current_url
            if len(url_display) > 80:
                url_display = url_display[:77] + '...'
            print(f"Current URL: {url_display}")
            
            new_url = input(f"\nEnter new URL (or Enter to skip, 'q' to quit, 'skip' for batch): ").strip()
            
            if new_url.lower() == 'q':
                print(f"\nSaving changes and quitting...")
                return publications, updated_count
            
            if new_url.lower() == 'skip':
                print(f"Skipping remaining publications in this batch...")
                break
            
            if new_url:
                publications[j]['url'] = new_url
                updated_count += 1
                print(f"✓ URL updated!")
            else:
                print(f"⊘ Skipped (keeping current URL)")
        
        i = batch_end
        
        if i < total:
            continue_batch = input(f"\nContinue to next batch? (y/n, default: y): ").strip().lower()
            if continue_batch == 'n':
                break
    
    return publications, updated_count

def main():
    js_file = 'publications-data.js'
    
    if not os.path.exists(js_file):
        print(f"Error: {js_file} not found!")
        print(f"Please run this script from the directory containing {js_file}")
        sys.exit(1)
    
    print(f"Loading publications from {js_file}...")
    try:
        publications, original_content = parse_js_file(js_file)
        print(f"✓ Loaded {len(publications)} publications")
        
        if len(publications) == 0:
            print("Warning: No publications found! Check the file format.")
            sys.exit(1)
            
    except Exception as e:
        print(f"Error loading publications: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
    
    # Check command line arguments
    batch_size = 10
    if len(sys.argv) > 1:
        if sys.argv[1] == '--batch-size' and len(sys.argv) > 2:
            try:
                batch_size = int(sys.argv[2])
                if batch_size < 1:
                    print("Error: batch-size must be at least 1")
                    sys.exit(1)
            except ValueError:
                print("Error: batch-size must be a number")
                sys.exit(1)
        else:
            print("Usage:")
            print("  python update_publication_urls.py                    # Interactive mode (default batch size: 10)")
            print("  python update_publication_urls.py --batch-size 5     # Interactive mode with custom batch size")
            sys.exit(1)
    
    # Interactive mode
    publications, updated_count = update_urls_interactive(publications, batch_size=batch_size)
    
    # Save changes
    print(f"\n{'='*70}")
    print(f"Saving changes to {js_file}...")
    try:
        save_to_js_file(js_file, publications, original_content)
        print(f"✓ Successfully saved {updated_count} updated URLs!")
        print(f"  Updated: {updated_count} out of {len(publications)} publications")
    except Exception as e:
        print(f"Error saving file: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

if __name__ == '__main__':
    main()
