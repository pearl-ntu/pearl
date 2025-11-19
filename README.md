# Photon Emission and Reactivity Laboratory (PEARL) Website

A modern, professional website for the Photon Emission and Reactivity Laboratory at Nanyang Technological University.

## Features

- **Modern Design**: Clean, professional layout with beautiful typography and color scheme
- **Responsive**: Fully responsive design that works on desktop, tablet, and mobile devices
- **Multiple Pages**: Complete website with all necessary pages:
  - Home
  - Research
  - Publications
  - People
  - News
  - Events
  - Join Us
  - Contact Us

## File Structure

```
PEARL/
├── index.html          # Home page
├── research.html       # Research page
├── publications.html   # Publications page
├── people.html         # People/Team page
├── news.html           # News page
├── events.html         # Events page
├── join-us.html        # Join Us page
├── contact.html        # Contact page
├── styles.css          # Main stylesheet
├── script.js           # JavaScript for interactivity
└── README.md           # This file
```

## Getting Started

1. Open `index.html` in a web browser to view the website
2. All pages are linked and ready to use
3. Customize the content by editing the HTML files
4. Modify the styling by editing `styles.css`
5. Add functionality by editing `script.js`

## Customization

### Adding Images

Replace the placeholder SVG images with actual photos:
- Group photo: Update the `.group-photo-placeholder` section in `index.html`
- Professor photo: Update the `.professor-image` section in `index.html` and `people.html`
- Research images: Update the `.research-image-placeholder` sections in `research.html`

### Adding Content

- **Publications**: Add publication entries in `publications.html`
- **News**: Add news items in `news.html`
- **People**: Add team member profiles in `people.html`
- **Events**: Add event listings in `events.html`

### Styling

The website uses CSS custom properties (variables) defined in `:root` in `styles.css`. You can easily change:
- Primary color: `--primary-color`
- Secondary color: `--secondary-color`
- Text colors, backgrounds, shadows, etc.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- The contact form currently shows an alert. To make it functional, you'll need to add server-side processing or use a service like Formspree.
- Language switcher (中文/English) is currently a placeholder - implement actual language switching as needed.
- All placeholder images can be replaced with actual photos.

## License

This website template is created for the Photon Emission and Reactivity Laboratory at NTU.

