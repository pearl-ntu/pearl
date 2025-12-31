# Fix Authentication for pearl-ntu Repository

## Problem
Your git is using credentials from your personal account (`abedisyedaliabbas`), but you need to push to the `pearl-ntu` organization.

## Solution Options

### Option 1: Use Personal Access Token (Recommended)

1. **Generate a Personal Access Token for pearl-ntu:**
   - Go to: https://github.com/settings/tokens (while logged into the account that has access to pearl-ntu)
   - Click **"Generate new token"** → **"Generate new token (classic)"**
   - Name: `PEARL Website`
   - Expiration: Choose your preference (90 days, 1 year, or no expiration)
   - Scopes: Check **`repo`** (full control of private repositories)
   - Click **"Generate token"**
   - **COPY THE TOKEN** (you won't see it again!)

2. **Update remote URL to use token:**
   ```bash
   git remote set-url origin https://YOUR_TOKEN@github.com/pearl-ntu/pearl.git
   ```
   
   Or push with token in the URL (one-time):
   ```bash
   git push -u origin main
   ```
   When prompted:
   - Username: `pearl-ntu` (or the username that has access)
   - Password: Paste your Personal Access Token (NOT your password)

### Option 2: Use GitHub CLI (Alternative)

If you have GitHub CLI installed:
```bash
gh auth login
# Select GitHub.com
# Select HTTPS
# Authenticate with browser or token
# Select the account that has access to pearl-ntu

git push -u origin main
```

### Option 3: Update Remote URL (No username stored)

Remove the stored username for this specific repository:
```bash
git config --local --unset credential.https://github.com.username
git remote set-url origin https://github.com/pearl-ntu/pearl.git
```

Then when you push, you'll be prompted for credentials:
- Username: `pearl-ntu` (or the account with access)
- Password: Use your Personal Access Token

