# bolt-shato-theme
The boilerplate theme for Bolt 4 CMS.

The theme is desigen to provide easy way to extend core elements in the template. Custom content types in theme enhances user experience to put custom reusable Section Blocks.
## Features
- Customize colors appereance
- Extends themes blocks usingt twig
- Lazy loading for images and section backgounds
- Responsive design
- dev and production build
- NO JQUERY as you don't need it!
- EcmaScript6 syntax

# Techstack
- Webpack
    - compile+minify scss from /src/scss to /dist/css
    - compile+uglify js from /src/js to /dist/js
    - optimizing images from /src/images to /dist/images
    - exporting fonts from /src/fonts to /dist/fonts
    - exporting google fonts to /dist/css/woff.css
- Bulma.io
- Font Awesome
- FsLightbox
- eslint

## How to run on your develeper machine

1. Clone this project to Bolt's theme directory, ***OR*** use composer

    ```
    composer install shatodj/bolt-shato-theme

    bin/console bolt:copy-theme shatodj/bolt-shato-theme
    ```

1. Install project dependencies

    ```
    npm install 
    ```

1. Run prepare script, that will:
    - generate environment variables and config files neeed before `build` script
    - add theme's custom Content Types and Taxonomies to Bolt's config files

    ```
    npm run prepare
    ```

1. Build theme

    ```
    # build for development
    npm run dev

    # ..or build for production
    npm run build
    ```

# TODO:
[ ] deploy/archive script
[ ] Progressive images loading (Currently possible only for section backgrouds)
[ ] Fill demo content script by the theme prefference
[ ] Section Blocks docu