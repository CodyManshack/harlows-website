# Harlow's Bar Website
Classic cocktail lounge website for Harlow's Bar, based in Valencia, Spain.

## Features
- Interactive menu with allergen indicators (egg, dairy, etc.), flavor profiles, sorting, and filtering
- Responsive design for mobile-first experience
- Fast loading and optimized for cell networks
- SEO-friendly markup and image handling
- Multilingual support (English, Spanish)

## Deployment (DigitalOcean App Platform)

This is a Single Page Application (SPA) using Vue Router with history mode. To ensure proper routing and SEO indexing, the DigitalOcean App Platform configuration **must** include the `catchall_document` setting.

### Required App Spec Configuration

```yaml
static_sites:
- build_command: npm run build
  environment_slug: node-js
  error_document: index.html
  catchall_document: index.html  # ← CRITICAL for SPA routing & SEO
  github:
    branch: master
    deploy_on_push: true
    repo: CodyManshack/harlows-website
  index_document: index.html
  name: harlows-website
  output_dir: dist/spa
  source_dir: /
```

### Why `catchall_document` is Required

- **Without it**: Deep links like `/en/menu` return HTTP 404, breaking SEO and Google indexing
- **With it**: All SPA routes return HTTP 200 with `index.html`, allowing:
  - Vue Router to handle client-side navigation
  - Google to properly crawl and index all pages
  - Direct links to work correctly

### Updating the Configuration

**Via DigitalOcean Control Panel:**
1. Go to Apps → Your App → Settings tab
2. Click on the `harlows-website` static site component
3. Scroll to "Custom Pages" section
4. Set **Catchall** to `index.html`
5. Click Save

**Via App Spec (recommended):**
1. Include the `catchall_document: index.html` line in your app spec YAML
2. Update via doctl CLI or API, or commit the spec file to your repo

### Verifying Deployment

After deployment, verify the catchall is working:

```bash
curl -I https://harlows.bar/en/menu
```

Should return:
```
HTTP/2 200 OK
```

If you see `404 Not Found`, the catchall document is not configured correctly.

## Add New Images to Menu Items
- Crop source image to 1:1 ratio
- Resize to our img src set using the `img_optimize.ps1` script `img_optimize.ps1 "~/Downloads/Aviation.png" aviation
> img_optimize requires [imagemagick](https://imagemagick.org/) to be installed
- Copy newly created directory into the `/public/cocktails` folder
- Add the folder name to the menu item in `menu.js`