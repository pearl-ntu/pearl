# Quick script to update photos and push to GitHub
# Usage: .\update-photo.ps1 "Update Guanyu photo"

param(
    [string]$message = "Update website"
)

Write-Host "`n🔄 Updating GitHub..." -ForegroundColor Cyan

# Add all changes
git add .

# Commit
git commit -m $message

# Push (will prompt for credentials)
Write-Host "`n📤 Pushing to GitHub..." -ForegroundColor Yellow
Write-Host "When prompted, use your Personal Access Token as the password`n" -ForegroundColor Gray

git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Done! Changes pushed to GitHub" -ForegroundColor Green
    Write-Host "Website will update in 2-3 minutes at: https://pearl-ntu.github.io/pearl/`n" -ForegroundColor Cyan
} else {
    Write-Host "`n❌ Error pushing. Make sure you have a Personal Access Token ready.`n" -ForegroundColor Red
}

