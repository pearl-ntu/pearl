# Quick Guide: Updating GitHub

## 🚀 Two Easy Ways to Update GitHub

### Method 1: Interactive Script (Recommended for beginners)

```bash
cd /Users/abedi_dr/Desktop/PEARL
./update-github.sh
```

This script will:
- Show you what changed
- Ask for confirmation
- Let you enter a commit message
- Push everything to GitHub

### Method 2: Quick One-Liner (Fastest)

```bash
cd /Users/abedi_dr/Desktop/PEARL
./quick-update.sh "Added photos for team members"
```

Or with default message:
```bash
./quick-update.sh
```

### Method 3: Manual Commands (If you prefer)

```bash
cd /Users/abedi_dr/Desktop/PEARL
git add .
git commit -m "Your commit message here"
git push origin main
```

## 📸 Example: Adding Photos

1. **Add photos to** `images/people/` folder
2. **Run update script:**
   ```bash
   cd /Users/abedi_dr/Desktop/PEARL
   ./quick-update.sh "Added team member photos"
   ```

## ✅ After Pushing

- Changes appear on GitHub immediately
- If GitHub Pages is enabled, website updates in 2-3 minutes
- View your repository: https://github.com/abedisyedaliabbas/pearl

## 💡 Tips

- **Always run from the PEARL directory**: `cd /Users/abedi_dr/Desktop/PEARL` first
- **Use descriptive commit messages**: "Added photos", "Updated research page", etc.
- **Check status first**: `git status` to see what changed

## 🆘 Troubleshooting

**"Permission denied" error:**
```bash
chmod +x update-github.sh
chmod +x quick-update.sh
```

**"Authentication failed":**
- Check `GITHUB_SETUP.md` for authentication help
- You may need a Personal Access Token

**"Not a git repository":**
- Make sure you're in `/Users/abedi_dr/Desktop/PEARL` directory

