var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var path = require('path');

module.exports = webpackMerge(commonConfig, {
    devtool: 'source-map',

    mode: "production",
    output: {
        path: path.join(process.cwd(), '/dist'),
        // publicPath: '/',
        filename: '[name].[hash].js'
    },

    plugins: [
        new OptimizeCssAssetsPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                safe: true,
                discardUnused: false, // no remove @font-face
                reduceIdents: false, // no change on @keyframes names
                zindex: false // no change z-index
            },
            canPrint: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production'),
                API_BASE_URL: JSON.stringify(process.env.API_BASE_URL || 'https://200.16.7.150:8083/api/v1'),
                WP_BASE_HREF: JSON.stringify(process.env.WP_BASE_HREF || '/dist')
            }
        }),
    ],
});
