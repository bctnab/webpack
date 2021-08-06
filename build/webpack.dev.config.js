"use strict";

const path = require("path");
const webpack = require("webpack");
const devConfig = require("../config/config").dev;
const baseConf = require("./webpack.base.conf");
const { merge } = require('webpack-merge');

const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const notifier = require("node-notifier");

const devConf = merge(baseConf, {
  output: {
    filename: "./js/[name].js"
  },
  devtool: devConfig.devtoolType,
  devServer: {
    clientLogLevel: "warning",
    hot: true,
    inline: true,
    open: true,
    historyApiFallback: true,
    host: devConfig.host,
    port: devConfig.port,
    proxy: devConfig.proxyTable,
    compress: true,
    overlay: {
      errors: true,
      warnings: false
    },
    quiet: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new FriendlyErrorsPlugin({
      //编译成功提示！
      compilationSuccessInfo: {
        messages: [
          `Your application is running here: http://${devConfig.host}:${devConfig.port}`
        ]
      },
      //编译出错！
      onErrors: function(severity, errors) {
        if (severity !== "error") {
          return;
        }
        const error = errors[0];
        const filename = error.file.split("!").pop();
        //编译出错时,右下角弹出错误提示！
        notifier.notify({
          title: "xc-cli",
          message: severity + ": " + error.name,
          subtitle: filename || "",
          icon: path.join(__dirname, "xc-cli.png")
        });
      }
    })
  ]
});
module.exports = devConf;
