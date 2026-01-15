# TOC Images Guide

## What are TOC Images?

TOC (Table of Contents) figures are graphical abstracts or visual representations of scientific publications. They're commonly used in chemistry journals to provide a visual summary of the research.

## Current Implementation

✅ **TOC images are now supported!**

- Publications can have an optional `tocImage` field
- TOC images display on the right side of each publication entry
- Images are responsive and scale properly on mobile
- If no TOC image is provided, the publication displays normally (text only)

## How to Add TOC Images

### Method 1: Manual Editing

Edit `publications-data.js` and add `tocImage` field to publication objects:

```javascript
{
    title: "Your Publication Title",
    authors: "Author1, Author2, ...",
    journal: "Journal Name",
    year: 2025,
    citations: 10,
    url: "https://...",
    tocImage: "images/publications/toc-2025-01.jpg"  // Add this line
}
```

### Method 2: Using Images from Journal Websites

Many journals provide TOC graphics on their article pages. You can:
1. Find the TOC image URL from the journal website
2. Download it and save to `images/publications/` folder
3. Reference it in the `tocImage` field

### Method 3: Extract from Old Website

The old WordPress site may have TOC images. We can extract them from:
- `xiaogang_liu/public_html/wp-content/uploads/` folder
- Look for images associated with publications

## Image Recommendations

- **Format:** JPG or PNG
- **Size:** 200-400px width recommended
- **Aspect Ratio:** 4:3 or 16:9 works well
- **Location:** Save in `images/publications/` folder

## Example

```javascript
{
    title: "Bright, Robust and Readily Accessible Fluorophore Family",
    authors: "H Bian, D Ma, X Zhang, ...",
    journal: "Journal of the American Chemical Society",
    year: 2025,
    citations: 0,
    url: "https://pubs.acs.org/doi/10.1021/jacs.5c15490",
    tocImage: "images/publications/toc-jacs-2025-01.jpg"
}
```

## Display

- TOC images appear on the **right side** of each publication
- On mobile, they move below the publication text
- Images are clickable and can link to the full publication
- Hover effect for better interactivity
