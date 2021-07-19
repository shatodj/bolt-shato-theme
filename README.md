# bolt-boilerplate-shato-theme
The boilerplate theme for Bolt CMS, built with Webpack

## Features
- compile+minify scss from /src/scss to /dist/css
- compile+uglify js from /src/js to /dist/js
- optimizing images from /src/images to /dist/images
- exporting fonts from /src/fonts to /dist/fonts
- exporting google fonts to /dist/css/woff.css
- responsive design using Bulma.io
- using Font Awesome
- lazy loading for images and section backgounds
- dev and production build
- source maps
- eslint

## Used Technologies and Frameworks
- Webpack
- Bulma.io
- Font Awesome
- FsLightbox

## How to run

1. Clone this project to Bolt's theme directory

1. Install project dependencies

    ```
    # install project dependencies
    npm install 
    ```

1. Run prepare script, that will:
    - generate environment variables and config files neeed before `build`
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
