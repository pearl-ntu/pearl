#!/usr/bin/env python3
"""Fix duplicate tocImage field for Hetero-Hydrazone"""

import re

with open('publications-data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Find and fix the duplicate tocImage
# Pattern: find the Hetero-Hydrazone entry and remove the second tocImage
pattern = r'(tocImage: "images/publications/Hetero-Hydrazone Photoswitches\.webp",)\s*\n\s*tocImage: "images/publications/[^"]+"'

fixed_content = re.sub(pattern, r'\1', content)

with open('publications-data.js', 'w', encoding='utf-8') as f:
    f.write(fixed_content)

print("Fixed duplicate tocImage field")
