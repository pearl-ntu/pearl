#!/bin/bash

# Quick Update - One command to push everything
# Usage: ./quick-update.sh "Your commit message"

COMMIT_MSG=${1:-"Update website"}

cd "$(dirname "$0")"

echo "🚀 Quick update to GitHub..."
git add .
git commit -m "$COMMIT_MSG"
git push origin main

if [ $? -eq 0 ]; then
    echo "✅ Done! Changes pushed to GitHub"
else
    echo "❌ Error pushing to GitHub"
fi

