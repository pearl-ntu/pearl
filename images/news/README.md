# News Images

This folder contains images for news items.

## How to Add Images

1. Place your image file in this folder
2. Name it according to the news item's `slug` (e.g., `prof-liu-joins-ntu.jpg`)
3. Update the `image` field in `news-data.js` to point to the image:
   ```javascript
   image: "images/news/your-image-name.jpg"
   ```

## Image Guidelines

- Recommended size: 600-800px width
- Format: JPG or PNG
- Keep file sizes reasonable (< 500KB)
- Images will be displayed on the right side of news items (on desktop)
- On mobile, images appear above the content
