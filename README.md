# Harlow's Bar Website
Classic cocktail lounge website for Harlow's Bar, based in Valencia, Spain.

## Features
- Interactive menu with allergen indicators (egg, dairy, etc.), flavor profiles, sorting, and filtering
- Responsive design for mobile-first experience
- Fast loading and optimized for cell networks
- SEO-friendly markup and image handling
- Multilingual support (English, Spanish)

## Add New Images to Menu Items
- Crop source image to 1:1 ratio
- Resize to our img src set using the `img_optimize.ps1` script
> img_optimize requires [imagemagick](https://imagemagick.org/) to be installed
- Copy newly created directory into the `/public/cocktails` folder
- Add the folder name to the menu item in `menu.js`