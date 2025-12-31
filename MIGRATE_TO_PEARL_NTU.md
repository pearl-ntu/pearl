# Migrate Website to pearl-ntu GitHub Account

This guide will help you move your PEARL website to the new GitHub account/organization: **pearl-ntu**

## Step 1: Create New Repository on pearl-ntu

1. **Go to the new GitHub account:**
   - Visit: https://github.com/pearl-ntu
   - Make sure you're logged in with an account that has access to this organization

2. **Create a new repository:**
   - Click the **"+"** icon in the top right → **"New repository"**
   - **Repository name**: `pearl` (or `website`, your choice)
   - **Description**: "Photon Emission and Reactivity Laboratory Website"
   - **Visibility**: Choose Public (required for free GitHub Pages)
   - **DO NOT** check "Add a README file", "Add .gitignore", or "Choose a license"
   - Click **"Create repository"**

## Step 2: Update Remote and Push to New Repository

After creating the repository, run these commands in your terminal:

```bash
# Update the remote URL to point to the new repository
git remote set-url origin https://github.com/pearl-ntu/pearl.git

# Push all code to the new repository
git push -u origin main
```

## Step 3: Enable GitHub Pages

1. **Go to your new repository:** https://github.com/pearl-ntu/pearl
2. Click **"Settings"** (top menu bar)
3. Click **"Pages"** in the left sidebar
4. Under **"Source"**:
   - Select: **"Deploy from a branch"**
   - Branch: **`main`**
   - Folder: **`/ (root)`**
5. Click **"Save"**
6. Wait 2-3 minutes for GitHub to build your site
7. Your website will be live at:
   **`https://pearl-ntu.github.io/pearl/`** 🎉

## Step 4: Update Documentation (Optional)

Update any documentation files that reference the old repository URL.

## Notes

- The old repository at `abedisyedaliabbas/pearl` will still exist (you can delete it later if desired)
- All your code history will be preserved in the new repository
- The website URL will change to `pearl-ntu.github.io/pearl/`
- Make sure you have access/permissions to the `pearl-ntu` GitHub account/organization

