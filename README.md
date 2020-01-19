# bolt-boilerplate-shato-theme
Boilerplate theme for Bolt CMS, built with webpack

## Features
- compile+minify scss from /src/scss to /dist/css
- compile+uglify js from /src/js to /dist/js
- optimize image from /src/images to /dist/images
- exporting fonts from /src/fonts to /dist/fonts
- exporting google fonts to /dist/css/woff.css
- responsive designt using Bulma.io
- using font awesome for icons
- lazy loading for images and section backgounds
- dev and production build
- source maps

## Used Technologies and Frameworks
- Webpack
- Bulma.io
- Font Awesome
- magnific-popup
- Slicex
- jQuery

## How to run

1. Clone this project to your theme directory

1. Modify `build/webpack.config.js` to suit your need 

    ```js
    // your local website url, used by browser-sync as proxy
    const PROXY_URL = 'http://bolt3-webpack.com/';  

    // your template directory path, used by webpack as a root path when transform relative path to absolute path in css loader
    const TEMPLATE_PATH = '/theme/bolt-boilerplate-shato-theme/'; 
    ```

1. Modify `src/scss/partials/functions.scss` to suit your need

    ```scss
    // your template directory path, used as variable when you need to produce absolute path of your assets
    $TEMPLATE_URL : '/theme/bolt-boilerplate-shato-theme/';
    ```

1. Install project dependencies and build theme

    ```
    # install project dependencies
    npm install 

    # build for development
    npm run dev

    # ..or build for production
    npm run build
    ```

1. Prepate Theme content types and taxonomies

    Theme is using own content types to distribute content between pages / tamplates. 'Sections' are used in stead of 'Blocks'. They can have more kinds of content fields and can be mapped to different 'pages' or tamplates. For this 'sectiongroup' taxonomies are used.

    Section Content type:

    ```yml
    # 'Sections' Content Type
    # Sections are bigger blocks added on one or more pages / templates mostly under the main content
    # They can have any information about a particular page eg, listings of content, galleries...
    # Unlike blocks, sections are related to pages or content type templates (eg. recors, entries...)
    # so each section can be added to more places with no need to specifying in template (only this particular)
    #
    # Since we cannot define own content types within theme, we must specify own content tyoe explicitely.
    sections:
        name: Sections
        singular_name: Section
        fields:
            title:
                type: text
                class: large
                group: "Block"
            slug:
                type: slug
                uses: [ title ]
            content:
                type: html
                height: 150px
            image:
                type: image
                attrib: title
                extensions: [ gif, jpg, png ]
            gallery:
                imagelist:
                type: imagelist
                extensions: [ gif, jpg, png ]
                upload: gallery
            icon:
                type: faiconpicker
                placement: inline
            contentlink:
                group: contentBlock
                type: text
                label: Link
                placeholder: 'contenttype/slug or http://example.org/'
                postfix: "Use this to add a link for this Block. This could either be an 'internal' link like <tt>page/about</tt>, if you use a contenttype/slug combination. Otherwise use a proper URL, like `http://example.org`."
            contentlimit:
                group: contentBlock
                type: integer
            contenttemplate:
                group: contentBlock
                type: templateselect
                filter: twig/contentblock/*.twig
            links:
                type: repeater 
                group: Links
                postfix: "Additional links for the section"
                fields:
                    title:
                        type: html
                        height: 50px
                    contentlink:
                        type: text
                        placeholder: 'contenttype/slug'
                        postfix: "Slug or http://"
        relations:
            pages:
                multiple: true
                label: "Related pages"
                format: "{{ item.title|escape }} (№ {{ item.id }})"
                postfix: "By selecting a Content Block, you're creating a bi-directional relationship to that Content Block."
        taxonomy: [ sectiongroups ]
        show_on_dashboard: true
        viewless: true
        default_status: published
        searchable: false
        icon_many: "fa:puzzle-piece"
        icon_one: "fa:puzzle-piece"
    ```

    Taxonomies:

    ```yml
    sectiongroups:
        name: Section Groups
        slug: sectiongroups
        singular_name: Section Group
        singular_slug: sectiongroup
        behaves_like: categories
        multiple: true
        options: [ homepage, record, entry, search, footer ]
    ```

## ToDos

[ ] Replace Slicex with native CSS slider 
[ ] Get rid of jQuery
