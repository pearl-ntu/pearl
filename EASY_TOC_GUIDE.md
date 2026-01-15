# Easy Way to Add TOC Images

## Method 1: Using the Text File (Easiest!)

1. **Edit `toc_mappings.txt`**:
   ```
   Bright, Robust and Readily Accessible Fluorophore Family|images/publications/toc-2025-jacs-01.jpg
   PET-leveraged ALDH probe|images/publications/toc-2025-02.jpg
   ```

2. **Run the script**:
   ```bash
   python add_toc_images_simple.py --batch
   ```

3. **Done!** All TOC images are automatically added.

## Method 2: Interactive Mode

1. **Put your TOC images** in `images/publications/` folder

2. **Run**:
   ```bash
   python add_toc_images_simple.py
   ```

3. **Follow the prompts** - it will show you publications and images, you just match them by number

## Method 3: Quick Add (One at a time)

If you just want to add one quickly:

1. **Edit `toc_mappings.txt`** - add one line:
   ```
   Publication Title Here|images/publications/your-image.jpg
   ```

2. **Run**:
   ```bash
   python add_toc_images_simple.py --batch
   ```

## Tips

- You don't need the full publication title - just enough to identify it
- The script does fuzzy matching, so partial titles work
- Always creates a backup before updating
- Images can be JPG, PNG, GIF, or WebP

## Example toc_mappings.txt

```
# 2025 Publications
Bright, Robust and Readily Accessible|images/publications/toc-2025-jacs-01.jpg
PET-leveraged ALDH|images/publications/toc-2025-02.jpg
Bioorthogonal In Situ|images/publications/toc-2025-03.jpg
```

That's it! Much easier than editing the JavaScript file manually.
