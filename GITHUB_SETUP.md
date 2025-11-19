# GitHub Authentication & Deployment Guide

## ✅ Current Status
- ✅ Repository created: https://github.com/abedisyedaliabbas/pearl
- ✅ Files uploaded to GitHub
- ✅ Local git repository connected
- ⏳ Need to authenticate to push changes
- ⏳ Need to enable GitHub Pages

## Step 1: Authenticate with GitHub

You need to authenticate to push code. Choose one method:

### Option A: Personal Access Token (Recommended)

1. **Create a Personal Access Token:**
   - Go to: https://github.com/settings/tokens
   - Click **"Generate new token"** → **"Generate new token (classic)"**
   - Name it: `PEARL Website`
   - Select scopes: Check **`repo`** (full control of private repositories)
   - Click **"Generate token"**
   - **COPY THE TOKEN** (you won't see it again!)

2. **Push using the token:**
   ```bash
   cd /Users/abedi_dr/Desktop/PEARL
   git push -u origin main
   ```
   - When prompted for **Username**: Enter `abedisyedaliabbas`
   - When prompted for **Password**: Paste your Personal Access Token (not your GitHub password!)

### Option B: Use GitHub CLI (Alternative)

```bash
# Install GitHub CLI (if not installed)
brew install gh

# Authenticate
gh auth login

# Push
git push -u origin main
```

## Step 2: Enable GitHub Pages (Free Hosting!)

Once you've successfully pushed, enable GitHub Pages:

1. **Go to your repository:** https://github.com/abedisyedaliabbas/pearl
2. Click **"Settings"** (top menu bar)
3. Click **"Pages"** in the left sidebar
4. Under **"Source"**:
   - Select: **"Deploy from a branch"**
   - Branch: **`main`**
   - Folder: **`/ (root)`**
5. Click **"Save"**
6. Wait 2-3 minutes for GitHub to build your site
7. Your website will be live at:
   **`https://abedisyedaliabbas.github.io/pearl/`** 🎉

## Step 3: Future Updates

Whenever you make changes to your website:

```bash
cd /Users/abedi_dr/Desktop/PEARL
git add .
git commit -m "Your commit message"
git push
```

Changes will automatically appear on your GitHub Pages site within 2-3 minutes!

## Troubleshooting

### "Permission denied" error
- Make sure you're using a Personal Access Token, not your password
- Check that the token has `repo` scope selected

### Website not loading
- Wait a few minutes after enabling Pages
- Check Settings → Pages for any build errors
- Make sure `index.html` is in the root folder (✅ it is!)

### Need to update remote URL
```bash
git remote set-url origin https://github.com/abedisyedaliabbas/pearl.git
```

## Quick Reference

**Repository:** https://github.com/abedisyedaliabbas/pearl  
**Website URL:** https://abedisyedaliabbas.github.io/pearl/ (after enabling Pages)

