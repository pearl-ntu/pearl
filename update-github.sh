#!/bin/bash

# PEARL Website - Quick Update Script for GitHub
# This script helps you quickly push changes to GitHub

echo "🚀 PEARL Website - GitHub Update Script"
echo "========================================"
echo ""

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ Error: Please run this script from the PEARL project directory"
    exit 1
fi

# Check git status
echo "📊 Checking git status..."
git status

echo ""
read -p "Do you want to proceed with updating GitHub? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Update cancelled."
    exit 1
fi

# Get commit message
echo ""
read -p "Enter commit message (or press Enter for default): " commit_msg

if [ -z "$commit_msg" ]; then
    commit_msg="Update website content"
fi

# Add all changes
echo ""
echo "📦 Adding all changes..."
git add .

# Commit
echo "💾 Committing changes..."
git commit -m "$commit_msg"

# Push to GitHub
echo "⬆️  Pushing to GitHub..."
git push origin main

# Check if push was successful
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo "🌐 Repository: https://github.com/abedisyedaliabbas/pearl"
    echo "📄 If GitHub Pages is enabled, changes will appear in 2-3 minutes"
else
    echo ""
    echo "❌ Error: Failed to push to GitHub"
    echo "💡 You may need to authenticate. Check GITHUB_SETUP.md for help"
    exit 1
fi

