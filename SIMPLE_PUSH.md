# Simple Push Instructions

## You have 2 commits ready to push:
1. "Your message" (includes Guanyu photo update)
2. "Add update scripts and guides"

## To Push:

### Step 1: Get Personal Access Token
1. Go to: https://github.com/settings/tokens
2. Generate new token (classic) with `repo` scope
3. Copy the token

### Step 2: Push
```powershell
git push origin main
```

### Step 3: Enter Credentials
When prompted:
- **Username:** `pearl-ntu` (or your GitHub username that has access)
- **Password:** Paste your Personal Access Token (NOT your password!)

---

## Alternative: If you want to use token in URL (temporary)

```powershell
# Replace YOUR_TOKEN with your actual token
git remote set-url origin https://YOUR_TOKEN@github.com/pearl-ntu/pearl.git
git push origin main

# IMPORTANT: Remove token after pushing for security
git remote set-url origin https://github.com/pearl-ntu/pearl.git
```

---

After pushing, your website will update in 2-3 minutes at:
**https://pearl-ntu.github.io/pearl/**

