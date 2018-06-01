var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var path = require('path');
var Dotenv = require('dotenv-webpack');

module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-source-map',

    mode: "development",
    output: {
        path: path.join(process.cwd(), '/dist'),
        publicPath: 'http://localhost:3000/',
        filename: '[name].js'
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new ExtractTextPlugin({
            filename: '[name].css', 
            disable: process.env.NODE_ENV !== 'production',
        }),
        new Dotenv(),
    ],

    devServer: {
        historyApiFallback: true,
        stats: 'minimal',
        inline: true,
        hot: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,OPTIONS,HEAD,PUT,POST,DELETE,PATCH',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization, X-Request-With',
            'Access-Control-Allow-Credentials': 'true',
        },
        watchOptions: {
            ignored: /node_modules/,
        },
    }
});