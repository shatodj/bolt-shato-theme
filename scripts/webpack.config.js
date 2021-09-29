const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const GoogleFontsPlugin = require('google-fonts-plugin');
const jsonImporter = require('node-sass-json-importer');

const env = require("../config/env.json")

const OUTPUT_DIR = {
  JS: 'js/',
  CSS: 'css/',
  IMAGE: 'images/',
  FONT: 'fonts/',
  TWIG: '../twig/',
};

/**
 *
 * @param {'production' | 'development'} mode
 */
const config = (mode = 'production', watch = true) => ({
  entry: {
    homepage: './src/js/homepage.js',
    record: './src/js/record.js',
    page: './src/js/record.js',
    entry: './src/js/entry.js',
    listing: './src/js/listing.js',
    products: './src/js/products.js',
    fontawesome: './src/js/fontawesome.js',
  },
  watch,
  mode,
  devtool: mode === 'production' ? false : 'inline-source-map',
  output: {
    filename: `${OUTPUT_DIR.JS}[name]-bundle.js`,
    path: path.resolve(__dirname, '../dist'), // output directory name, relative to current webpack project directory
    publicPath: path.join(env.template_path.replace("'", ""), "dist"), // public output directory used to generate the directory in bundler
  },
  stats: {
    colors: true,
  },
  optimization: {
    minimize: true,
    splitChunks: {
      minChunks: 1,
    },
  },
  module: {
    rules: [
      {
        test: /\.s[a|c]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
              sourceMap: mode !== 'production',
            },
          },
          { loader: 'css-loader', options: { sourceMap: mode !== 'production', importLoaders: 1, } },
          { loader: 'sass-loader', options: { sourceMap: mode !== 'production', } },
        ],
      },
      {
        test: /\.html$/i,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: `${OUTPUT_DIR.IMAGE}[name].[ext]`,
            },
          },
        ],
      },
      {
        test: /\.(woff|ttf|eot|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: `${OUTPUT_DIR.FONT}[name].[ext]`,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${OUTPUT_DIR.CSS}[name]-bundle.css`,
      chunkFilename: '[id].css',
    }),
    // compress extracted css
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {
        discardComments: { removeAll: true },
        map: {
          inline: true,
        },
      },
      canPrint: true,

    }),
    new CopyWebpackPlugin([
      {
        from: 'src/fonts/**',
        to: `${OUTPUT_DIR.FONT}/[name].[ext]`,
      },
    ]),
    new CopyWebpackPlugin([
      {
        from: 'src/images/**',
        to: `${OUTPUT_DIR.IMAGE}/[name].[ext]`,
      },
    ]),
    new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),
    new GoogleFontsPlugin('config/google-fonts-config.json'),
    new BrowserSyncPlugin(
      {
        files: [
          '**/*.twig', // watch .twig files also
          '**/*.yml', // watch .yml files also
        ],
        // browse to http://localhost:3000/ during development
        host: 'localhost',
        port: 3000,
        // proxy the Webpack Dev Server endpoint
        // through BrowserSync
        proxy: env.proxy_url.replace("'", ""),
      },
      // plugin options
      {
        // BrowserSync reloading the page after compilation is finished
        reload: true,
      },
    ),
  ],
});

module.exports = config;
