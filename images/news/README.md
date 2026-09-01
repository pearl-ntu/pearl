# News Images

This folder contains all images for the unified News list.

## How to Add Images

1. Place the image directly in this folder.
2. Use lowercase letters and hyphens in the filename.
3. Update the `image` field for one image, or the `images` array for multiple images, in `news-data.js`:
   ```javascript
   image: "images/news/your-image-name.jpg"
   // or
   images: ["images/news/first.jpg", "images/news/second.jpg"]
   ```

## Image Guidelines

- Recommended size: 600–1200px width
- Format: JPG, PNG, or GIF
- Keep file sizes reasonable (< 500KB when practical)
- Images are displayed beside the news content on desktop and above it on mobile
