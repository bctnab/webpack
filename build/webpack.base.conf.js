"use strict";

const path = require("path");
const glob = require('glob');
const webpack = require("webpack");
const prodConfig = require("../config/config").build;

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin");

function resolve(track) {
  return path.join(__dirname, track);
}
function assetsPath(track) {
  return path.join(prodConfig.staticPath, track);
}

const buildEntriesAndHTML = () => {
  const result = glob.sync(path.join(__dirname, '../src/pages/*'));

  const config = {
    hash: true,
    inject: 'body',
    minify: {
      removeComments: true,
      collapseWhitespace: true
    }
  };
  const entries = {};
  const htmls = [];

  result.forEach(item => {
    const one = path.parse(item);
    const outputfile = one.name;

    entries[outputfile] = [`${ one.dir}/${ outputfile}/index.js`];

    htmls.push(
      new HtmlWebpackPlugin({
        ...config,
        template: `${ one.dir}/${ outputfile}/index.html`,
        filename: `${ outputfile}.html`,
        chunks: [ outputfile ],
      })
    );
  });
  return {
    entries,
    htmls
  };
};
const final = buildEntriesAndHTML();

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: final.entries,
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        include: resolve("../src"),
        loader: 'babel-loader'
      }, {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          }, "css-loader", "postcss-loader"
        ]
      }, {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        include: resolve("../static"),
        use: [{
            loader: 'url-loader',
            options: {
              limit: 8192,
              esModule: false,
              name: assetsPath('image/[name].[hash:7].[ext]')
            }
        }]
      }
    ]
  },
  plugins: [
    new OptimizeCSSPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css'
    }),
    new webpack.ProvidePlugin({
      _: 'lodash'
    }),
    ...final.htmls
  ]
};
