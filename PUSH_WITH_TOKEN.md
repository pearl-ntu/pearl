# How to Push with Personal Access Token

## The Problem:
Git is trying to use your personal account credentials, but you need to authenticate with the pearl-ntu organization.

## Solution: Use Personal Access Token

### Step 1: Get a Personal Access Token

1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Name: `PEARL Website Updates`
4. Expiration: Choose your preference
5. Scopes: Check **`repo`**
6. Click **"Generate token"**
7. **COPY THE TOKEN** (you won't see it again!)

### Step 2: Push Using the Token

**Option A: Push and enter token when prompted**

```powershell
git push origin main
```

When prompted:
- **Username:** `pearl-ntu` (or the GitHub username that has access to pearl-ntu)
- **Password:** Paste your Personal Access Token (NOT your GitHub password!)

**Option B: Use token in URL (one-time, then remove it)**

```powershell
# Replace YOUR_TOKEN with your actual token
git remote set-url origin https://YOUR_TOKEN@github.com/pearl-ntu/pearl.git
git push origin main

# IMPORTANT: Remove token from URL after pushing
git remote set-url origin https://github.com/pearl-ntu/pearl.git
```

### Step 3: Clear Stored Credentials (if needed)

If git keeps using old credentials:

```powershell
# Clear Windows Credential Manager
cmdkey /list | Select-String "github"
# Then delete the GitHub entry:
cmdkey /delete:git:https://github.com
```

Then try pushing again - it will prompt for new credentials.

