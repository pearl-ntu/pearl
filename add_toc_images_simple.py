#!/usr/bin/env python3
"""
Simple TOC Image Manager - Easy way to add TOC images to publications
"""

import os
import re
import json
import glob

def list_publications():
    """List all publications with their current TOC image status"""
    with open('publications-data.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all publications
    pub_pattern = r'\{\s*title:\s*"([^"]+)",\s*authors:\s*"[^"]+",\s*journal:\s*"([^"]+)",\s*year:\s*(\d+),\s*citations:\s*(\d+),\s*url:\s*"([^"]+)"(?:,\s*tocImage:\s*"([^"]*)")?\s*\}'
    
    publications = []
    for match in re.finditer(pub_pattern, content, re.DOTALL):
        title = match.group(1)
        journal = match.group(2)
        year = match.group(3)
        citations = match.group(4)
        url = match.group(5)
        toc_image = match.group(6) if match.group(6) else ""
        
        publications.append({
            'title': title,
            'journal': journal,
            'year': year,
            'citations': citations,
            'url': url,
            'tocImage': toc_image,
            'hasTOC': bool(toc_image and toc_image.strip())
        })
    
    return publications, content

def list_available_images():
    """List all TOC images in the publications folder"""
    image_dir = 'images/publications'
    if not os.path.exists(image_dir):
        return []
    
    images = []
    for ext in ['*.jpg', '*.jpeg', '*.png', '*.gif', '*.webp']:
        images.extend(glob.glob(os.path.join(image_dir, ext)))
        images.extend(glob.glob(os.path.join(image_dir, ext.upper())))
    
    # Return relative paths
    return [img.replace('\\', '/') for img in images]

def update_publication_toc(title_search, image_path, js_content):
    """Update a publication's TOC image"""
    # Escape special characters for regex
    title_escaped = re.escape(title_search)
    
    # Pattern to find the publication and update/add tocImage
    # Match the publication object
    pattern = rf'(\{{\s*title:\s*"[^"]*{title_escaped}[^"]*",\s*authors:\s*"[^"]+",\s*journal:\s*"[^"]+",\s*year:\s*\d+,\s*citations:\s*\d+,\s*url:\s*"[^"]+")(?:,\s*tocImage:\s*"[^"]*")?(\s*\}})'
    
    def replace_func(match):
        pub_start = match.group(1)
        pub_end = match.group(2)
        # Add or replace tocImage
        return pub_start + f',\n        tocImage: "{image_path}"' + pub_end
    
    new_content = re.sub(pattern, replace_func, js_content, flags=re.IGNORECASE | re.DOTALL)
    return new_content

def interactive_mode():
    """Interactive mode to add TOC images"""
    print("\n" + "="*70)
    print("Simple TOC Image Manager")
    print("="*70)
    
    # Load publications
    publications, js_content = list_publications()
    images = list_available_images()
    
    print(f"\nFound {len(publications)} publications")
    print(f"Found {len(images)} TOC images in images/publications/\n")
    
    if not images:
        print("⚠️  No images found in images/publications/")
        print("   Please add TOC images to that folder first!\n")
        return
    
    # Show publications without TOC
    pubs_without_toc = [p for p in publications if not p['hasTOC']]
    
    if not pubs_without_toc:
        print("✅ All publications already have TOC images!\n")
        return
    
    print(f"Publications without TOC images: {len(pubs_without_toc)}\n")
    
    # Show available images
    print("Available TOC images:")
    for i, img in enumerate(images, 1):
        print(f"  {i}. {img}")
    print()
    
    # Simple matching: ask user to match
    print("Quick Match Mode:")
    print("Enter publication number and image number to match them")
    print("Format: pub_number,image_number (e.g., 1,1)")
    print("Or press Enter to skip and do manual matching\n")
    
    matches = []
    for i, pub in enumerate(pubs_without_toc[:10], 1):  # Show first 10
        print(f"\n[{i}] {pub['year']} - {pub['title'][:60]}...")
        print(f"    Journal: {pub['journal'][:50]}")
        
        if images:
            print(f"    Available images: {', '.join([str(j+1) for j in range(min(5, len(images)))])}")
            match = input(f"    Match to image (number) or Enter to skip: ").strip()
            
            if match.isdigit():
                img_idx = int(match) - 1
                if 0 <= img_idx < len(images):
                    matches.append({
                        'title': pub['title'],
                        'image': images[img_idx]
                    })
                    print(f"    ✓ Matched to {images[img_idx]}")
                else:
                    print(f"    ✗ Invalid image number")
        else:
            print("    (No images available)")
    
    if matches:
        print(f"\n\nUpdating {len(matches)} publications...")
        for match in matches:
            js_content = update_publication_toc(match['title'], match['image'], js_content)
        
        # Backup original
        with open('publications-data.js.backup', 'w', encoding='utf-8') as f:
            with open('publications-data.js', 'r', encoding='utf-8') as orig:
                f.write(orig.read())
        
        # Save updated
        with open('publications-data.js', 'w', encoding='utf-8') as f:
            f.write(js_content)
        
        print(f"✅ Updated {len(matches)} publications!")
        print("   Backup saved to: publications-data.js.backup\n")
    else:
        print("\nNo matches made.\n")

def batch_mode():
    """Batch mode using a simple text file"""
    print("\n" + "="*70)
    print("Batch TOC Image Assignment")
    print("="*70)
    
    print("\nCreate a file called 'toc_mappings.txt' with this format:")
    print("  publication_title|image_path")
    print("\nExample:")
    print("  Bright, Robust and Readily Accessible Fluorophore Family|images/publications/toc-2025-jacs-01.jpg")
    print("  PET-leveraged ALDH probe|images/publications/toc-2025-02.jpg")
    print("\nThen run: python add_toc_images_simple.py --batch\n")
    
    mapping_file = 'toc_mappings.txt'
    if not os.path.exists(mapping_file):
        # Create example file
        with open(mapping_file, 'w', encoding='utf-8') as f:
            f.write("# TOC Image Mappings\n")
            f.write("# Format: publication_title|image_path\n")
            f.write("# Example:\n")
            f.write("# Bright, Robust and Readily Accessible Fluorophore Family|images/publications/toc-2025-jacs-01.jpg\n")
        print(f"✅ Created example file: {mapping_file}")
        print("   Edit it and run again with --batch flag\n")
        return
    
    # Read mappings
    mappings = []
    with open(mapping_file, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith('#'):
                if '|' in line:
                    title, image = line.split('|', 1)
                    mappings.append({'title': title.strip(), 'image': image.strip()})
    
    if not mappings:
        print("No mappings found in toc_mappings.txt\n")
        return
    
    print(f"Found {len(mappings)} mappings\n")
    
    # Load and update
    publications, js_content = list_publications()
    
    updated = 0
    for mapping in mappings:
        # Find matching publication (fuzzy match)
        title_lower = mapping['title'].lower()
        matched = False
        
        for pub in publications:
            if title_lower in pub['title'].lower() or pub['title'].lower() in title_lower:
                js_content = update_publication_toc(pub['title'], mapping['image'], js_content)
                print(f"✓ Matched: {pub['title'][:50]}... → {mapping['image']}")
                updated += 1
                matched = True
                break
        
        if not matched:
            print(f"✗ No match found for: {mapping['title'][:50]}...")
    
    if updated > 0:
        # Backup
        with open('publications-data.js.backup', 'w', encoding='utf-8') as f:
            with open('publications-data.js', 'r', encoding='utf-8') as orig:
                f.write(orig.read())
        
        # Save
        with open('publications-data.js', 'w', encoding='utf-8') as f:
            f.write(js_content)
        
        print(f"\n✅ Updated {updated} publications!")
        print("   Backup saved to: publications-data.js.backup\n")
    else:
        print("\nNo publications were updated.\n")

def main():
    import sys
    
    if len(sys.argv) > 1 and sys.argv[1] == '--batch':
        batch_mode()
    else:
        interactive_mode()

if __name__ == '__main__':
    main()
