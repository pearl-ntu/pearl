# Fix: Old Photo Still Showing (Browser Cache Issue)

## The Problem:
You updated the photo and pushed it to GitHub, but you still see the old photo. This is almost always a **browser cache** issue.

## Solutions:

### Solution 1: Hard Refresh (Easiest)

**Windows:**
- Press `Ctrl + Shift + R`
- Or `Ctrl + F5`

**Mac:**
- Press `Cmd + Shift + R`

This forces your browser to reload the page and images without using cached versions.

### Solution 2: Clear Browser Cache

**Chrome/Edge:**
1. Press `Ctrl + Shift + Delete` (Windows) or `Cmd + Shift + Delete` (Mac)
2. Select "Cached images and files"
3. Click "Clear data"

**Firefox:**
1. Press `Ctrl + Shift + Delete`
2. Select "Cache"
3. Click "Clear Now"

### Solution 3: Open in Incognito/Private Window

1. Open a new Incognito/Private window
2. Go to: https://pearl-ntu.github.io/pearl/people.html
3. The new photo should appear (no cache in private mode)

### Solution 4: Add Cache-Busting Parameter

If the above doesn't work, we can add a version parameter to force reload. But try the hard refresh first!

## Verify the File is Updated on GitHub:

1. Go to: https://github.com/pearl-ntu/pearl/blob/main/images/people/guanyu-jiang.jpg
2. Check if the photo looks correct
3. If it's the old photo, the file wasn't actually updated

## If File Wasn't Updated:

1. Make sure you replaced the file: `images/people/guanyu-jiang.jpg`
2. Check the file size/date to confirm it changed
3. Add and commit again:
   ```powershell
   git add images/people/guanyu-jiang.jpg
   git commit -m "Update Guanyu photo"
   git push origin main
   ```

## Most Likely Solution:

**Just do a hard refresh: `Ctrl + Shift + R`** - This fixes it 99% of the time!

