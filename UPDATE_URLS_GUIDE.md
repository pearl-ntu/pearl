# Publication URL Updater Guide

This guide explains how to update publication hyperlinks on your website.

## What Changed

1. **Publication titles are now clickable** - The titles on your publications page now link to the URLs stored in `publications-data.js`

2. **URL Update Script** - A Python script (`update_publication_urls.py`) helps you update URLs in batches

## How to Update URLs

### Method 1: Interactive Mode (Recommended)

Run the script interactively to update URLs one by one or in batches:

```bash
python update_publication_urls.py
```

This will:
- Show you publications in batches of 10 (default)
- Display each publication's title, journal, and current URL
- Let you enter a new URL or skip to the next one
- Save all changes when you're done

**Commands:**
- Enter a URL to update the current publication
- Press Enter to skip (keep current URL)
- Type `q` to quit and save changes
- Type `skip` to skip remaining publications in the current batch

### Method 2: Custom Batch Size

If you want to process more or fewer publications at a time:

```bash
python update_publication_urls.py --batch-size 5
```

This will show 5 publications at a time instead of 10.

## Example Session

```
======================================================================
Publication URL Updater
======================================================================
Total publications: 1339
Batch size: 10

Commands:
  - Enter URL to update
  - Press Enter to skip (keep current URL)
  - Type 'q' to quit and save
  - Type 'skip' to skip remaining in batch
======================================================================

--- Batch 1: Publications 1-10 of 1339 ---

[1/1339] 2025
Title: Bright, Robust and Readily Accessible Fluorophore Family for NIR-II...
Journal: Journal of the American Chemical Society
Current URL: https://scholar.google.com/citations?user=giWn_7cAAAAJ&hl=en

Enter new URL (or Enter to skip, 'q' to quit, 'skip' for batch): 
https://pubs.acs.org/doi/10.1021/jacs.5c00001

✓ URL updated!

[2/1339] 2025
Title: PET-leveraged ALDH probe toward cancer stem cells
...
```

## Notes

- The script automatically backs up your changes by preserving the file structure
- URLs should be complete (include `https://` or `http://`)
- You can stop at any time with `q` and your changes will be saved
- The script updates `publications-data.js` directly

## Tips

1. **Start small** - Try updating 10-20 URLs at a time to get familiar with the process
2. **Copy-paste URLs** - You can copy URLs from browser address bars and paste them into the script
3. **Use 'skip'** - If you want to update specific publications in a batch, you can skip the ones you don't want to change

## After Updating

After running the script:
1. Review the changes by checking `publications-data.js`
2. Test your website to make sure the links work
3. Commit your changes to git if you're using version control

