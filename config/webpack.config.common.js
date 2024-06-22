import { resolve, join } from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import CopyWebpackPlugin from 'copy-webpack-plugin';

// eslint-disable-next-line
import env from './env.json' with { type: "json" };

const DIST_DIR = resolve('./dist')
const SRC_DIR = resolve('./src')

const OUTPUT_DIR = {
  JS: 'js',
  CSS: 'css',
  IMAGE: 'images',
  FONT: 'fonts',
  TWIG: '../twig',
};

// const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';

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
//   mode,
//   devtool: mode === 'production' ? false : 'inline-source-map',
  output: {
    filename: `${OUTPUT_DIR.JS}/[name]-bundle.js`,
    path: DIST_DIR, // output directory name, relative to current webpack project directory
    publicPath: join(env.template_path, 'dist')+"/", // public output directory used to generate the directory in bundler
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
        test: /.(svg)$/,
        type: 'asset/inline'
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: `${OUTPUT_DIR.IMAGE}/[name][ext]`,
            },
          },
        ],
        type: 'asset/resource',
        generator: {
          filename: `${OUTPUT_DIR.IMAGE}/[name][ext][query]`
        }
      },
      {
        test: /\.(woff|ttf|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: `${OUTPUT_DIR.FONT}/[name][ext]`,
            },
          },
        ],
        type: 'asset/resource',
        generator: {
          filename: `${OUTPUT_DIR.FONT}/[name][ext][query]`
        }
      },
    ],
  },
  optimization: {
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
        { from: `${SRC_DIR}/images/**`, to: `${OUTPUT_DIR.IMAGE}/[name][ext]` },
      ],
    }),
  ],
};

export default config;
