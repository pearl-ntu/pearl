# Push to pearl-ntu Repository

## Quick Steps:

1. **Generate Personal Access Token:**
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Select scope: `repo`
   - Copy the token

2. **Push the code:**
   ```bash
   git push -u origin main
   ```
   
   When prompted:
   - **Username:** Enter `pearl-ntu` (or the GitHub username that has access to pearl-ntu)
   - **Password:** Paste your Personal Access Token (NOT your GitHub password!)

## Alternative: Use Token in URL (One-time)

If you want to embed the token in the URL for this push:

```bash
git remote set-url origin https://YOUR_TOKEN@github.com/pearl-ntu/pearl.git
git push -u origin main
```

(Replace `YOUR_TOKEN` with your actual token)

⚠️ **Note:** If you use the token in the URL, remove it after pushing for security.

