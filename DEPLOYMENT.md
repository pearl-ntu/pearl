# GitHub Deployment Guide for PEARL Website

## Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and log in
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Fill in the details:
   - **Repository name**: `PEARL` (or any name you prefer)
   - **Description**: "Photon Emission and Reactivity Laboratory Website"
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click **"Create repository"**

## Step 2: Connect Your Local Repository to GitHub

After creating the repository, GitHub will show you commands. Use these commands in your terminal:

```bash
cd /Users/abedi_dr/Desktop/PEARL
git remote add origin https://github.com/YOUR_USERNAME/PEARL.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Step 3: Enable GitHub Pages (Free Hosting!)

Once your code is on GitHub:

1. Go to your repository on GitHub
2. Click on **"Settings"** (top menu)
3. Scroll down to **"Pages"** in the left sidebar
4. Under **"Source"**, select **"Deploy from a branch"**
5. Choose branch: **"main"** and folder: **"/ (root)"**
6. Click **"Save"**
7. Wait a few minutes, then your site will be live at:
   - `https://YOUR_USERNAME.github.io/PEARL/`

## Quick Commands Summary

```bash
# Navigate to your project
cd /Users/abedi_dr/Desktop/PEARL

# Add GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/PEARL.git

# Push to GitHub
git push -u origin main

# For future updates, just use:
git add .
git commit -m "Your commit message"
git push
```

## Troubleshooting

- **Authentication Issues**: You may need to use a Personal Access Token instead of password
  - Go to GitHub Settings → Developer settings → Personal access tokens → Generate new token
  - Use the token as your password when pushing

- **Repository already exists**: If you need to change the remote URL:
  ```bash
  git remote set-url origin https://github.com/YOUR_USERNAME/PEARL.git
  ```

## Notes

- The website will be publicly accessible if you choose a public repository
- GitHub Pages is free for public repositories
- Your site will automatically update when you push new changes

