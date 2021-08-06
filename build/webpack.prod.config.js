"use strict";

const path = require("path");
const webpack = require("webpack");
const { merge } = require('webpack-merge');
const prodConfig = require("../config/config").build;
const baseConf = require("./webpack.base.conf");

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");

function resolve(track) {
  return path.join(__dirname, track);
}

const prodConf = merge(baseConf, {
  output: {
    path: resolve('../dist'),
    publicPath: prodConfig.publicPath,
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[name].[chunkhash].js'
  },
  devtool: prodConfig.devtoolType,
  optimization: {
    minimizer: [ new UglifyJsPlugin() ],
  },
  plugins: [
    new webpack.BannerPlugin("顶部添加测试数据"),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, "../static"),
      to: prodConfig.staticPath,
      ignore: [".*"]
    }]),

    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
});
module.exports = prodConf;
