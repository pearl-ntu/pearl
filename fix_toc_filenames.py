#!/usr/bin/env python3
"""
Rename TOC image files to replace smart quotes with regular quotes
"""

import os
import shutil

def fix_filenames():
    """Rename files with smart quotes to use regular quotes"""
    dir_path = 'images/publications'
    
    if not os.path.exists(dir_path):
        print(f"Directory not found: {dir_path}")
        return
    
    # Find files with smart quotes
    files_to_rename = []
    for filename in os.listdir(dir_path):
        # Check for smart quotes (Unicode 8220 and 8221)
        if '\u201c' in filename or '\u201d' in filename:
            files_to_rename.append(filename)
    
    print(f"Found {len(files_to_rename)} files with smart quotes:")
    for f in files_to_rename:
        print(f"  - {f}")
    
    if not files_to_rename:
        print("No files need renaming.")
        return
    
    # Rename files
    for old_name in files_to_rename:
        old_path = os.path.join(dir_path, old_name)
        # Remove smart quotes entirely (Windows doesn't allow quotes in filenames)
        new_name = old_name.replace('\u201c', '').replace('\u201d', '').replace('"', '').replace("'", '')
        new_path = os.path.join(dir_path, new_name)
        
        if old_name != new_name:
            try:
                os.rename(old_path, new_path)
                print(f"Renamed: {old_name}")
                print(f"      -> {new_name}")
            except Exception as e:
                print(f"Error renaming {old_name}: {e}")
        else:
            print(f"No change needed: {old_name}")

if __name__ == '__main__':
    fix_filenames()
