import { resolve, join } from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
// import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
// import BrowserSyncPlugin from 'browser-sync-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
// import ImageminPlugin from 'imagemin-webpack-plugin';

import env from '../config/env.json' with { type: "json" };

// import googleFonts from '../config/google-fonts-config.json' with { type: "json" }

const DIST_DIR = resolve('./dist')
const SRC_DIR = resolve('./src')

const OUTPUT_DIR = {
  JS: 'js',
  CSS: 'css',
  IMAGE: 'images',
  FONT: 'fonts',
  TWIG: '../twig',
};

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';


let config = {
  entry: {
    minimal: `${SRC_DIR}/js/minimal.js`,
    homepage: `${SRC_DIR}/js/homepage.js`,
    record: `${SRC_DIR}/js/record.js`,
    page: `${SRC_DIR}/js/record.js`,
    entry: `${SRC_DIR}/js/entry.js`,
    listing: `${SRC_DIR}/js/listing.js`,
    product: `${SRC_DIR}/js/product.js`,
    products: `${SRC_DIR}/js/products.js`,
    service: `${SRC_DIR}/js/service.js`,
    services: `${SRC_DIR}/js/services.js`,
    search: `${SRC_DIR}/js/search.js`,
    fontawesome: `${SRC_DIR}/js/fontawesome.js`,
  },
  mode,
  devtool: mode === 'production' ? false : 'inline-source-map',
  output: {
    filename: `${OUTPUT_DIR.JS}/[name]-bundle.js`,
    path: DIST_DIR, // output directory name, relative to current webpack project directory
    publicPath: join(env.template_path, 'dist'), // public output directory used to generate the directory in bundler
    hashFunction: 'sha256',
  },
  experiments: {
    futureDefaults: true,
  },
  stats: {
    colors: true,
  },
  module: {
    rules: [
      {
        test: /\.s[a|c]ss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          // { loader: 'style-loader'},
          { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } },
          // { loader: 'resolve-url-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
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
              name: `${OUTPUT_DIR.IMAGE}[name][ext]`,
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
              name: `${OUTPUT_DIR.FONT}[name][ext]`,
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    splitChunks: {
      minChunks: 1,
    },
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      // `...`,
      new CssMinimizerPlugin({
        parallel: true,
      }),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${OUTPUT_DIR.CSS}/[name]-bundle.css`,
      chunkFilename: '[id].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: `${SRC_DIR}/fonts/**`, to: `${OUTPUT_DIR.FONT}/[name][ext]` },
        { from: `${SRC_DIR}/images/**`, to: `${OUTPUT_DIR.IMAGE}/[name][ext]` },
      ],
    }),
    // new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),
    // new BrowserSyncPlugin(
    //   {
    //     files: [
    //       '**/*.twig', // watch .twig files also
    //       '**/*.yml', // watch .yml files also
    //     ],
    //     // browse to http://localhost:3000/ during development
    //     host: 'localhost',
    //     port: 3000,
    //     // proxy the Webpack Dev Server endpoint
    //     // through BrowserSync
    //     proxy: proxy_url.replace("'", ''),
    //   },
    //   // plugin options
    //   {
    //     // BrowserSync reloading the page after compilation is finished
    //     reload: true,
    //   },
    // ),
  ],
};

export default config;
