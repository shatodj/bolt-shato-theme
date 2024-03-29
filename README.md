# bolt-shato-theme
The boilerplate theme for Bolt 4 CMS.

The theme is designed to provide an easy way to extend core elements in the template. Custom content types in theme enhance user experience to put custom reusable Section Blocks.

## Features
- Customize colors appearance
- Extends themes blocks using twig
- Lazy loading for images and section backgrounds
- Responsive design
- dev and production build
- NO JQUERY as you don't need it!
- EcmaScript6 syntax

## Techstack
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

### Requirements
- Node.js v6 and above

### Step by step

1. GIT Clone this project to Bolt's theme directory ***OR*** use composer install:

    ```
    composer install shatodj/bolt-shato-theme

    bin/console bolt:copy-theme shatodj/bolt-shato-theme
    ```

1. Install project dependencies in the theme's directory:

    ```
    cd <bolt_directory>/public/theme/bolt-shato-theme
    npm install 
    ```

1. Run prepare script, that will:
    - generate environment variables and config files needed for `build`
    - add theme's custom Content Types and Taxonomies to Bolt's config files (make sure script will have permissions to write)

    ```
    npm run prepare
    ```

1. Build theme

    ```
    # build for development
    npm run build:dev

    # ..or build for production
    npm run build
    ```

 1. Don't forget to change the default theme property in Bolt's `config/bolt/config.yaml`

    ```
    theme: bolt-shato-theme
    ```

# TODO:
- [x] Get rid of JQuery
- [ ] Maintenance twig fix
- [ ] deploy/archive script
- [ ] Progressive images loading (Currently possible only for section backgrounds)
- [ ] Fill demo content script by the theme preference
- [ ] Section Blocks docu