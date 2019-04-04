const CleanWebpackPlugin = require('clean-webpack-plugin'); // 清理dist文件夹
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //提取样式
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const base = require('./webpack.base.config');

const config = {
    ...base
};

base.module.rules[1].use.unshift(MiniCssExtractPlugin.loader);
base.plugins.push(
    new CleanWebpackPlugin(['dist']),
    new UglifyJSPlugin({
        extractComments: true,
        uglifyOptions: {
            compress: false
        }
    }),
    new MiniCssExtractPlugin({
        filename: './css/' + '[name].min.css'
    }),
    //压缩css
    new OptimizeCSSPlugin({
        cssProcessorOptions: {
            safe: true
        }
    })
);

module.exports = config;