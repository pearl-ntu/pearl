# Move Website to pearl-ntu - Complete Guide

## ✅ What I've Already Done:
1. ✅ Updated your git remote URL to point to: `https://github.com/pearl-ntu/pearl.git`

## 📋 What You Need to Do Next:

### Step 1: Create the Repository on GitHub (Do This First!)

**Option A: If pearl-ntu is an Organization:**
1. Go to: https://github.com/organizations/pearl-ntu/repositories/new
2. Or go to: https://github.com/new
3. In the "Owner" dropdown, select **pearl-ntu**

**Option B: If pearl-ntu is a User Account:**
1. Go to: https://github.com/new
2. Make sure you're logged into the pearl-ntu account

**Repository Settings:**
- **Repository name:** `pearl`
- **Description:** "Photon Emission and Reactivity Laboratory Website"
- **Visibility:** ✅ **Public** (must be public for free GitHub Pages)
- **DO NOT check:**
  - ❌ Add a README file
  - ❌ Add .gitignore
  - ❌ Choose a license
- Click **"Create repository"**

### Step 2: Push Your Code (After Repository is Created)

Once the repository exists, run this command:

```bash
git push -u origin main
```

This will upload all your website files to the new repository.

### Step 3: Enable GitHub Pages

1. Go to: https://github.com/pearl-ntu/pearl/settings/pages
2. Under **"Source"**:
   - Select: **"Deploy from a branch"**
   - Branch: **`main`**
   - Folder: **`/ (root)`**
3. Click **"Save"**
4. Wait 2-3 minutes
5. Your website will be live at: **https://pearl-ntu.github.io/pearl/**

---

## 🆘 Need Help?

**If you get "repository not found":**
- Make sure you created the repository first (Step 1)
- Make sure you have access to the pearl-ntu account

**If you get authentication errors:**
- You may need to use a Personal Access Token
- Go to: https://github.com/settings/tokens
- Generate a new token with `repo` permissions
- Use the token as your password when pushing

---

## Current Status:

- ✅ Local code ready
- ✅ Remote URL updated to: `https://github.com/pearl-ntu/pearl.git`
- ⏳ Waiting for repository creation on GitHub
- ⏳ Ready to push once repository exists

