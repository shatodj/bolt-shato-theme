# bolt-webpack-boilerplate-theme
Bolt boilerplate theme for bolt, built with webpack

## Features
- compile+minify scss from /src/scss to /dist/css
- compile+uglify js from /src/js to /dist/js
- optimize image from /src/images to /dist/images
- exporting fonts from /src/fonts to /dist/fonts
- exporting google fonts to /dist/css/woff.css
- using font awesome for icons
- lazy loading for images and backgounds
- dev and production build
- source maps

## How to run

1. Clone this project to your theme directory

2. Modify `build/webpack.config.js` to suit your need 
```js
// your local website url, used by browser-sync as proxy
const PROXY_URL = 'http://bolt3-webpack.com/';  

// your template directory path, used by webpack as a root path when transform relative path to absolute path in css loader
const TEMPLATE_PATH = '/theme/bolt-webpack-boilerplate-theme/'; 
```

3. Modify `src/scss/partials/functions.scss` to suit your need
```scss
// your template directory path, used as variable when you need to produce absolute path of your assets
$TEMPLATE_URL : '/theme/bolt-webpack-boilerplate-theme/';
```

3. Install project dependency
```
# install project dependencies
npm install 

# build for development
npm run dev

# ..or build for production
npm run build

```

