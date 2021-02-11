const HtmlWebpackPlugin = require('html-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, 'src', 'main.js')
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].[hash:8].js'
    },
    module: {
        rules: [
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html')
        }),
        new AssetsPlugin(),
        new BundleAnalyzerPlugin()
    ],
};
