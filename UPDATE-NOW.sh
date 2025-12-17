#!/bin/bash

# SUPER SIMPLE UPDATE SCRIPT
# Just double-click this file or run: ./UPDATE-NOW.sh

cd "$(dirname "$0")"

echo "🔄 Updating GitHub..."
git add .
git commit -m "Update website" 2>/dev/null || echo "No changes to commit"
git push origin main

echo ""
echo "✅ Done! If viewing online, wait 2-3 minutes for GitHub Pages to update."
echo "💡 Try hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)"

