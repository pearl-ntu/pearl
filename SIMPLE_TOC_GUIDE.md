# Super Simple TOC Image Guide

## The Easiest Way: Just Name Images with Paper Titles!

### Step 1: Name Your Images
Put TOC images in `images/publications/` folder and name them with the paper title (or part of it):

**Examples:**
- `Bright Robust Readily Accessible Fluorophore.jpg`
- `PET-leveraged ALDH probe.jpg`
- `Bioorthogonal In Situ Formation.jpg`

You don't need the full title - just enough words to identify it!

### Step 2: Run the Script
```bash
python auto_match_toc.py
```

### Step 3: Done!
The script will:
- ✅ Automatically match images to publications by title
- ✅ Show you what it's matching
- ✅ Ask for confirmation
- ✅ Update everything automatically
- ✅ Create a backup first

## Example

**Your images:**
```
images/publications/
  ├── Bright Robust Fluorophore.jpg
  ├── PET ALDH probe.jpg
  └── Bioorthogonal In Situ.jpg
```

**Run:**
```bash
python auto_match_toc.py
```

**Output:**
```
✓ Bright Robust Fluorophore.jpg
  → Bright, Robust and Readily Accessible Fluorophore Family...
  Match confidence: 85%

✓ PET ALDH probe.jpg
  → PET-leveraged ALDH probe toward cancer stem cells
  Match confidence: 90%
```

**Confirm with 'y' and you're done!**

## Tips

- **Use key words** from the title (3-5 words is usually enough)
- **Don't worry about exact match** - the script is smart and does fuzzy matching
- **Remove special characters** from filenames (or use underscores)
- **The script shows match confidence** - if it's low, add more words to the filename

## That's It!

No manual editing, no complex formats - just name images with paper titles and run one command!
