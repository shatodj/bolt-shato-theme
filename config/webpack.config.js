const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const GoogleFontsPlugin = require('google-fonts-plugin');

// your local website url, used by browser-sync as proxy
const PROXY_URL = 'http://shpr.local/';

// your template directory path, used by webpack as a root path when transform
// relative path to absolute path in css loader
const TEMPLATE_PATH = '/theme/shpr-bolt-theme/';

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
const config = (mode = 'production') => ({
  entry: {
    homepage: './src/js/homepage.js',
    record: './src/js/record.js',
    page: './src/js/record.js',
    entry: './src/js/entry.js',
    listing: './src/js/listing.js',
    minimal: './src/js/minimal.js',
    fontawesome: './src/js/fontawesome.js',
  },
  mode,
  devtool: mode === 'production' ? false : 'inline-source-map',
  output: {
    filename: `${OUTPUT_DIR.JS}[name]-bundle.js`,
    path: path.resolve(__dirname, '../dist'), // output directory name, relative to current webpack project directory
    publicPath: `${TEMPLATE_PATH}dist/`, // public output directory used to generate the directory in bundler
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
          { loader: 'css-loader', options: { sourceMap: mode !== 'production', importLoaders: 1 } },
          { loader: 'sass-loader', options: { sourceMap: mode !== 'production' } },
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
          inline: mode !== 'production',
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
        // (which should be serving on http://bolt3-webpack.com)
        // through BrowserSync
        proxy: PROXY_URL,
      },
      // plugin options
      {
        // BrowserSync reloading the page after compilation is finished
        reload: true,
      },
    ),
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
});

module.exports = config;