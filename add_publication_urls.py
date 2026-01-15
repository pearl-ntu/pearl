#!/usr/bin/env python3
"""
Interactive script to add URLs to publications
Shows paper title, asks for URL, updates publications-data.js
"""

import re
import os
from datetime import datetime

def load_publications():
    """Load publications from JavaScript file"""
    with open('publications-data.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Pattern to extract publications
    pub_pattern = r'\{\s*title:\s*"([^"]+)",\s*authors:\s*"([^"]+)",\s*journal:\s*"([^"]+)",\s*year:\s*(\d+),\s*citations:\s*(\d+)(?:,\s*url:\s*"([^"]+)")?(?:,\s*tocImage:\s*"([^"]*)")?\s*\}'
    
    publications = []
    for match in re.finditer(pub_pattern, content, re.DOTALL):
        title = match.group(1)
        authors = match.group(2)
        journal = match.group(3)
        year = match.group(4)
        citations = match.group(5)
        url = match.group(6) if match.group(6) else ""
        tocImage = match.group(7) if match.group(7) else ""
        
        publications.append({
            'title': title,
            'authors': authors,
            'journal': journal,
            'year': year,
            'citations': citations,
            'url': url,
            'tocImage': tocImage,
            'full_match': match.group(0),
            'start_pos': match.start(),
            'end_pos': match.end()
        })
    
    return publications, content

def find_publication_by_title(title_search, publications):
    """Find publication by partial title match - flexible matching"""
    # Normalize search term: remove quotes (both regular and escaped), extra spaces, make lowercase
    # Remove all types of quotes: ", ", \"
    search_normalized = re.sub(r'["""\\"]', '', title_search.lower().strip())
    # Split into words, filter out very short words
    search_words = [w for w in search_normalized.split() if len(w) > 1]
    search_words_set = set(search_words)
    
    if not search_words:
        # Fallback: use original search if normalization removed everything
        search_normalized = title_search.lower().strip()
        search_words = [w for w in search_normalized.split() if len(w) > 0]
        search_words_set = set(search_words)
    
    matches = []
    
    for i, pub in enumerate(publications):
        # Normalize publication title - remove escaped quotes and regular quotes
        pub_title_normalized = re.sub(r'["""\\"]', '', pub['title'].lower())
        pub_words = [w for w in pub_title_normalized.split() if len(w) > 1]
        pub_words_set = set(pub_words)
        
        # Strategy 1: Exact substring match (normalized, ignoring quotes)
        if search_normalized in pub_title_normalized or pub_title_normalized in search_normalized:
            matches.append((i, pub))
            continue
        
        # Strategy 2: Word-based matching
        common_words = search_words_set.intersection(pub_words_set)
        
        # If we have matching words, check ratio
        if len(search_words) > 0:
            match_ratio = len(common_words) / len(search_words)
            
            # For short searches (3 words or less), require at least 1 match or 50% ratio
            if len(search_words) <= 3:
                if len(common_words) >= 1 or match_ratio >= 0.5:
                    matches.append((i, pub))
                    continue
            
            # For medium searches (4-6 words), require at least 3 matches or 50% ratio
            elif len(search_words) <= 6:
                if len(common_words) >= 3 or match_ratio >= 0.5:
                    matches.append((i, pub))
                    continue
            
            # For longer searches, require at least 3 matches or 40% ratio
            else:
                if len(common_words) >= 3 or match_ratio >= 0.4:
                    matches.append((i, pub))
                    continue
        
        # Strategy 3: Check if key words (first 2-3 words) are all present
        if len(search_words) >= 2:
            key_words = set(search_words[:min(3, len(search_words))])
            if key_words.issubset(pub_words_set):
                matches.append((i, pub))
                continue
        
        # Strategy 4: Check if significant portion of first words match
        if len(search_words) >= 3:
            first_half = set(search_words[:len(search_words)//2 + 1])
            if len(first_half.intersection(pub_words_set)) >= 2:
                matches.append((i, pub))
                continue
    
    return matches

def update_publication_url(title, new_url, js_content):
    """Update a publication's URL in the JavaScript file"""
    # Escape special characters for regex
    title_escaped = re.escape(title)
    
    # If removing URL (empty string), remove the url field entirely
    if not new_url or new_url.strip() == '':
        # Remove URL field - has url, has tocImage
        pattern1 = rf'(\{{\s*title:\s*"{title_escaped}",\s*authors:\s*"[^"]+",\s*journal:\s*"[^"]+",\s*year:\s*\d+,\s*citations:\s*\d+),\s*url:\s*"[^"]*"(\s*,\s*tocImage:\s*"[^"]*"\s*\}})'
        new_content = re.sub(pattern1, r'\1\2', js_content, flags=re.IGNORECASE | re.DOTALL)
        if new_content != js_content:
            return new_content
        
        # Remove URL field - has url, no tocImage
        pattern2 = rf'(\{{\s*title:\s*"{title_escaped}",\s*authors:\s*"[^"]+",\s*journal:\s*"[^"]+",\s*year:\s*\d+,\s*citations:\s*\d+),\s*url:\s*"[^"]*"(\s*\}})'
        new_content = re.sub(pattern2, r'\1\2', js_content, flags=re.IGNORECASE | re.DOTALL)
        if new_content != js_content:
            return new_content
        
        return js_content  # URL already doesn't exist or couldn't be removed
    
    # Pattern to find publication and update URL
    # Handle cases with/without existing url and tocImage
    patterns = [
        # Has url, has tocImage - replace existing URL
        (rf'(\{{\s*title:\s*"{title_escaped}",\s*authors:\s*"[^"]+",\s*journal:\s*"[^"]+",\s*year:\s*\d+,\s*citations:\s*\d+,\s*url:\s*)"[^"]*"(\s*,\s*tocImage:\s*"[^"]*"\s*\}})',
         lambda m: m.group(1) + f'url: "{new_url}"' + m.group(2)),
        # Has url, no tocImage - replace existing URL
        (rf'(\{{\s*title:\s*"{title_escaped}",\s*authors:\s*"[^"]+",\s*journal:\s*"[^"]+",\s*year:\s*\d+,\s*citations:\s*\d+,\s*url:\s*)"[^"]*"(\s*\}})',
         lambda m: m.group(1) + f'url: "{new_url}"' + m.group(2)),
        # No url, has tocImage - add URL before tocImage
        (rf'(\{{\s*title:\s*"{title_escaped}",\s*authors:\s*"[^"]+",\s*journal:\s*"[^"]+",\s*year:\s*\d+,\s*citations:\s*\d+)(\s*,\s*tocImage:\s*"[^"]*"\s*\}})',
         lambda m: m.group(1) + f',\n        url: "{new_url}"' + m.group(2)),
        # No url, no tocImage - add URL before closing brace
        (rf'(\{{\s*title:\s*"{title_escaped}",\s*authors:\s*"[^"]+",\s*journal:\s*"[^"]+",\s*year:\s*\d+,\s*citations:\s*\d+)(\s*\}})',
         lambda m: m.group(1) + f',\n        url: "{new_url}"' + m.group(2)),
    ]
    
    for pattern, replace_func in patterns:
        new_content = re.sub(pattern, replace_func, js_content, flags=re.IGNORECASE | re.DOTALL)
        if new_content != js_content:
            return new_content
    
    # If no pattern matched, return original
    return js_content

def interactive_add_urls():
    """Interactive mode to add/update URLs one by one"""
    print("\n" + "="*70)
    print("Interactive Publication URL Updater")
    print("="*70)
    
    # Load publications
    publications, js_content = load_publications()
    
    # Find publications without URLs (or with empty URLs)
    pubs_without_url = [p for p in publications if not p['url'] or p['url'].strip() == '']
    pubs_with_url = [p for p in publications if p['url'] and p['url'].strip() != '']
    
    print(f"\nTotal publications: {len(publications)}")
    print(f"Publications with URLs: {len(pubs_with_url)}")
    print(f"Publications without URLs: {len(pubs_without_url)}\n")
    
    # Ask if user wants to update existing URLs
    allow_update_existing = False
    if pubs_with_url:
        response = input("Do you want to update URLs for publications that already have URLs? (y/n): ").strip().lower()
        allow_update_existing = (response == 'y')
        print()
    
    # Determine which publications to work with
    if allow_update_existing:
        pubs_to_work_with = publications  # All publications
        print("Mode: Update any publication URL (including those with existing URLs)\n")
    else:
        pubs_to_work_with = pubs_without_url  # Only those without URLs
        if not pubs_to_work_with:
            print("All publications already have URLs!")
            print("Run again and type 'y' when asked to update existing URLs.\n")
            return
        print("Mode: Add URLs only to publications without URLs\n")
    
    print("="*70)
    print("Starting interactive URL addition...")
    print("="*70)
    print("\nInstructions:")
    print("  - Enter the publication title (or part of it)")
    print("  - Enter the URL when prompted")
    print("  - Type 'skip' to skip a publication")
    print("  - Type 'done' to finish")
    print("  - Type 'list' to see remaining publications without URLs\n")
    
    updated = 0
    skipped = 0
    
    # Show first few to work with
    display_count = min(5, len(pubs_to_work_with))
    if allow_update_existing:
        print(f"\nFirst {display_count} publications (showing all):")
    else:
        print(f"\nFirst {display_count} publications without URLs:")
    
    for i, pub in enumerate(pubs_to_work_with[:display_count], 1):
        has_url = pub['url'] and pub['url'].strip() != ''
        url_status = f"URL: {pub['url'][:50]}..." if has_url else "No URL"
        print(f"  {i}. {pub['title'][:70]}...")
        print(f"     Journal: {pub['journal'][:50]}")
        print(f"     Year: {pub['year']}, Citations: {pub['citations']}, {url_status}\n")
    
    while True:
        print("\n" + "-"*70)
        title_input = input("Enter publication title (or 'done' to finish, 'list' to see more): ").strip()
        
        if title_input.lower() == 'done':
            break
        
        if title_input.lower() == 'list':
            print(f"\nPublications to update ({len(pubs_to_work_with)}):")
            for i, pub in enumerate(pubs_to_work_with, 1):
                has_url = pub['url'] and pub['url'].strip() != ''
                url_status = f"URL: {pub['url'][:60]}..." if has_url else "[No URL]"
                print(f"  {i}. {pub['title']}")
                print(f"     {pub['journal']} ({pub['year']}) - {url_status}")
            continue
        
        if not title_input:
            print("Please enter a title or 'done' to finish.")
            continue
        
        # Find matching publications
        matches = find_publication_by_title(title_input, pubs_to_work_with)
        
        if not matches:
            print(f"No publication found matching: {title_input}")
            print("Try a different search term or check the spelling.")
            continue
        
        if len(matches) > 1:
            print(f"\nFound {len(matches)} matches:")
            for i, (idx, pub) in enumerate(matches, 1):
                print(f"  {i}. {pub['title']}")
                print(f"     {pub['journal']} ({pub['year']})")
            
            choice = input(f"\nSelect number (1-{len(matches)}) or 'skip': ").strip()
            if choice.lower() == 'skip':
                skipped += 1
                continue
            try:
                choice_num = int(choice) - 1
                if 0 <= choice_num < len(matches):
                    selected_pub = matches[choice_num][1]
                else:
                    print("Invalid selection.")
                    continue
            except ValueError:
                print("Invalid selection.")
                continue
        else:
            selected_pub = matches[0][1]
        
        # Show selected publication
        print(f"\nSelected publication:")
        print(f"  Title: {selected_pub['title']}")
        print(f"  Journal: {selected_pub['journal']}")
        print(f"  Year: {selected_pub['year']}, Citations: {selected_pub['citations']}")
        
        if selected_pub['url'] and selected_pub['url'].strip():
            print(f"  Current URL: {selected_pub['url']}")
            url_input = input("\nEnter new URL (or 'skip' to keep current, 'remove' to delete URL): ").strip()
        else:
            url_input = input("\nEnter URL (or 'skip' to skip): ").strip()
        
        if url_input.lower() == 'remove':
            url_input = ""  # Set to empty to remove URL
        
        if url_input.lower() == 'skip':
            skipped += 1
            continue
        
        if not url_input:
            print("URL cannot be empty. Skipping...")
            skipped += 1
            continue
        
        # Validate URL format (basic check)
        if not (url_input.startswith('http://') or url_input.startswith('https://')):
            confirm = input("URL doesn't start with http:// or https://. Use anyway? (y/n): ").strip().lower()
            if confirm != 'y':
                continue
        
        # Update
        js_content = update_publication_url(selected_pub['title'], url_input, js_content)
        
        # Update the publication in our list
        for p in pubs_to_work_with:
            if p['title'] == selected_pub['title']:
                p['url'] = url_input
                break
        
        updated += 1
        if url_input:
            print(f"[OK] Updated: {selected_pub['title'][:60]}...")
            print(f"     URL: {url_input[:60]}...")
        else:
            print(f"[OK] Removed URL from: {selected_pub['title'][:60]}...")
    
    if updated > 0:
        # Create backup
        backup_name = f"publications-data.js.backup.{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        with open(backup_name, 'w', encoding='utf-8') as f:
            with open('publications-data.js', 'r', encoding='utf-8') as orig:
                f.write(orig.read())
        print(f"\n[OK] Backup created: {backup_name}")
        
        # Save updated file
        with open('publications-data.js', 'w', encoding='utf-8') as f:
            f.write(js_content)
        
        print(f"[OK] Updated {updated} publications!")
        print(f"[INFO] Skipped {skipped} publications")
    else:
        print("\nNo publications were updated.")
    
    # Count remaining without URLs
    remaining_without_url = len([p for p in publications if not p.get('url') or not p['url'].strip()])
    print(f"\nRemaining publications without URLs: {remaining_without_url}\n")

if __name__ == '__main__':
    try:
        interactive_add_urls()
    except KeyboardInterrupt:
        print("\n\nInterrupted by user. Changes not saved.")
    except Exception as e:
        print(f"\n[ERROR] {e}")
        import traceback
        traceback.print_exc()
