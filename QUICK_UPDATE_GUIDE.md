# Quick Update Guide - How to Update Photos/Content

## ⚠️ Important: You Need to Update Locally

**Yes, you need to update files locally and then push to GitHub.** GitHub Pages doesn't have a built-in file editor for images, so you need to:

1. **Update the file locally** (replace the photo in `images/people/guanyu-jiang.jpg`)
2. **Push to GitHub** (using git commands)

## Quick Steps to Update a Photo:

### Method 1: Using PowerShell Script (Easiest)

1. **Replace the photo file:**
   - Put the new photo in: `images/people/guanyu-jiang.jpg`
   - Make sure it has the same filename!

2. **Run the update script:**
   ```powershell
   .\update-photo.ps1 "Update Guanyu photo"
   ```

3. **When prompted for credentials:**
   - Username: `pearl-ntu` (or your GitHub username)
   - Password: **Your Personal Access Token** (not your password!)

### Method 2: Manual Commands

```powershell
# 1. Add the changed file
git add images/people/guanyu-jiang.jpg

# 2. Commit
git commit -m "Update Guanyu photo"

# 3. Push (will prompt for credentials)
git push origin main
```

When prompted:
- **Username:** `pearl-ntu` or your GitHub username
- **Password:** Your Personal Access Token

## Need a Personal Access Token?

1. Go to: https://github.com/settings/tokens
2. Generate new token (classic)
3. Select scope: `repo`
4. Copy the token and use it as your password

## After Pushing:

- Changes appear on GitHub immediately
- Website updates in **2-3 minutes** at: https://pearl-ntu.github.io/pearl/
- You may need to do a hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

## Why Can't I Edit Online?

GitHub Pages is a static site hosting service. It serves files directly from your repository. To update content, you need to:
- Update files locally
- Commit the changes
- Push to GitHub

GitHub will automatically rebuild and deploy your site within 2-3 minutes.

