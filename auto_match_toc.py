#!/usr/bin/env python3
"""
Auto-Match TOC Images by Paper Title
Just name your images with the paper title (or part of it) and run this script!
"""

import os
import re
import glob
from difflib import SequenceMatcher

def similarity(a, b):
    """Calculate similarity between two strings"""
    return SequenceMatcher(None, a.lower(), b.lower()).ratio()

def list_publications():
    """Extract all publications from JavaScript file"""
    with open('publications-data.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Pattern to extract publications
    pub_pattern = r'\{\s*title:\s*"([^"]+)",\s*authors:\s*"[^"]+",\s*journal:\s*"([^"]+)",\s*year:\s*(\d+),\s*citations:\s*(\d+),\s*url:\s*"([^"]+)"(?:,\s*tocImage:\s*"([^"]*)")?\s*\}'
    
    publications = []
    for match in re.finditer(pub_pattern, content, re.DOTALL):
        publications.append({
            'title': match.group(1),
            'journal': match.group(2),
            'year': match.group(3),
            'citations': match.group(4),
            'url': match.group(5),
            'tocImage': match.group(6) if match.group(6) else "",
            'full_match': match.group(0)  # Keep original for replacement
        })
    
    return publications, content

def list_toc_images():
    """List all TOC images in the publications folder"""
    image_dir = 'images/publications'
    if not os.path.exists(image_dir):
        return []
    
    images = []
    for ext in ['*.jpg', '*.jpeg', '*.png', '*.gif', '*.webp']:
        images.extend(glob.glob(os.path.join(image_dir, ext)))
        images.extend(glob.glob(os.path.join(image_dir, ext.upper())))
    
    # Return relative paths and filenames
    result = []
    for img in images:
        rel_path = img.replace('\\', '/')
        filename = os.path.basename(img)
        # Remove extension for matching
        name_without_ext = os.path.splitext(filename)[0]
        result.append({
            'path': rel_path,
            'filename': filename,
            'name': name_without_ext
        })
    
    return result

def find_best_match(image_name, publications):
    """Find the best matching publication for an image filename"""
    best_match = None
    best_score = 0
    
    image_lower = image_name.lower()
    
    for pub in publications:
        title_lower = pub['title'].lower()
        
        # Try different matching strategies
        # 1. Exact substring match
        if image_lower in title_lower or title_lower in image_lower:
            score = min(len(image_lower), len(title_lower)) / max(len(image_lower), len(title_lower))
            if score > best_score:
                best_score = score
                best_match = pub
                continue
        
        # 2. Word-based matching
        image_words = set(image_lower.split())
        title_words = set(title_lower.split())
        common_words = image_words.intersection(title_words)
        
        if len(common_words) >= 3:  # At least 3 common words
            score = len(common_words) / max(len(image_words), len(title_words))
            if score > best_score:
                best_score = score
                best_match = pub
                continue
        
        # 3. Similarity matching
        sim = similarity(image_name, pub['title'])
        if sim > 0.5 and sim > best_score:  # At least 50% similar
            best_score = sim
            best_match = pub
    
    return best_match, best_score

def update_publication_toc(title, image_path, js_content):
    """Update a publication's TOC image in the JavaScript file"""
    # Escape special characters
    title_escaped = re.escape(title)
    
    # Pattern to find and update the publication
    # Match publication with or without existing tocImage
    pattern = rf'(\{{\s*title:\s*"{title_escaped}",\s*authors:\s*"[^"]+",\s*journal:\s*"[^"]+",\s*year:\s*\d+,\s*citations:\s*\d+,\s*url:\s*"[^"]+")(?:,\s*tocImage:\s*"[^"]*")?(\s*\}})'
    
    def replace_func(match):
        pub_start = match.group(1)
        pub_end = match.group(2)
        return pub_start + f',\n        tocImage: "{image_path}"' + pub_end
    
    new_content = re.sub(pattern, replace_func, js_content, flags=re.IGNORECASE | re.DOTALL)
    return new_content

def main():
    print("\n" + "="*70)
    print("Auto-Match TOC Images by Paper Title")
    print("="*70)
    print("\nThis script automatically matches TOC images to publications")
    print("based on the image filename and paper title.\n")
    
    # Load data
    print("Loading publications...")
    publications, js_content = list_publications()
    print(f"Found {len(publications)} publications\n")
    
    print("Scanning for TOC images...")
    images = list_toc_images()
    print(f"Found {len(images)} TOC images\n")
    
    if not images:
        print("[WARNING] No images found in images/publications/")
        print("   Add your TOC images there, named with paper titles!\n")
        return
    
    # Find matches
    print("Matching images to publications...\n")
    matches = []
    unmatched_images = []
    
    for img in images:
        best_pub, score = find_best_match(img['name'], publications)
        
        if best_pub and score > 0.3:  # At least 30% match
            # Check if publication already has a TOC
            if best_pub['tocImage'] and best_pub['tocImage'].strip():
                print(f"[SKIP] {img['filename']}")
                print(f"   Matches: {best_pub['title'][:60]}...")
                print(f"   But this publication already has a TOC image!")
                print(f"   Skipping...\n")
            else:
                matches.append({
                    'image': img,
                    'publication': best_pub,
                    'score': score
                })
                print(f"[MATCH] {img['filename']}")
                print(f"  -> {best_pub['title'][:60]}...")
                print(f"  Match confidence: {score*100:.0f}%\n")
        else:
            unmatched_images.append(img)
            print(f"[NO MATCH] {img['filename']}")
            print(f"  No good match found (best score: {score*100:.0f}%)\n")
    
    if unmatched_images:
        print(f"\n[WARNING] {len(unmatched_images)} images couldn't be matched:")
        for img in unmatched_images:
            print(f"   - {img['filename']}")
        print("\n   Tip: Rename images to include more words from the paper title\n")
    
    if not matches:
        print("No matches found. Make sure image filenames contain words from paper titles.\n")
        return
    
    # Confirm before updating
    print(f"\n{'='*70}")
    print(f"Ready to update {len(matches)} publications")
    print(f"{'='*70}\n")
    
    for match in matches:
        print(f"  {match['image']['filename']}")
        print(f"    → {match['publication']['title'][:70]}...")
    
    confirm = input(f"\nUpdate these {len(matches)} publications? (y/n): ").strip().lower()
    
    if confirm != 'y':
        print("Cancelled.\n")
        return
    
    # Create backup
    print("\nCreating backup...")
    with open('publications-data.js.backup', 'w', encoding='utf-8') as f:
        with open('publications-data.js', 'r', encoding='utf-8') as orig:
            f.write(orig.read())
    print("[OK] Backup created: publications-data.js.backup\n")
    
    # Update publications
    print("Updating publications...")
    updated = 0
    for match in matches:
        js_content = update_publication_toc(
            match['publication']['title'],
            match['image']['path'],
            js_content
        )
        updated += 1
    
    # Save
    with open('publications-data.js', 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print(f"[OK] Updated {updated} publications!")
    print("\n✅ Done! Refresh your browser to see the TOC images.\n")

if __name__ == '__main__':
    main()
