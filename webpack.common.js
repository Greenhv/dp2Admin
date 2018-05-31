var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var path = require('path');
// var Dotenv = require('dotenv-webpack');
var pkgBower = require('./package.json');

var devMode = process.env.NODE_ENV === 'development';
var baseHref = devMode ? '/' : process.env.WP_BASE_HREF;

console.log(process.env.NODE_ENV);

module.exports = {
    entry: {
        app: './app/App.jsx',
    },

    resolve: {
        modules: [path.join(__dirname, ''), 'node_modules', 'bower_components'],
        extensions: ['.js', '.jsx'],
        alias: {
            moment$: 'moment/moment.js',
            d3$: 'd3/d3.min.js',
            Components: path.join(__dirname, 'app/Components/'),
            Pages: path.join(__dirname, 'app/Pages/'),
            Modules: path.join(__dirname, 'app/Modules/'),
            Utils: path.join(__dirname, 'app/Utils/'),
            Shared: path.join(__dirname, 'app/Shared/'),
            node_modules: path.join(__dirname, '/node_modules'),
        }
    },

    module: {
        rules: [{
            test: /jquery\.flot\.resize\.js$/,
            use: 'imports-loader?this=>window'
        }, {
            test: /\.js/,
            use: [
                // 'source-map-loader',
                'imports-loader?define=>false',
            ],
            enforce: 'pre',
        }, {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
            }
        }, {
            test: /\.css$/,
            exclude: path.join(process.cwd(), '/app'),
            use: [
                devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                        minimize: {
                            presets: 'default',
                        },
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: (loader) => [
                            require('autoprefixer'),
                        ],
                    },
                },
            ]
        }, {
            test: /\.css$/,
            include: path.join(process.cwd(), '/app'),
            use: 'raw-loader'
        }, {
            test: /\.woff|\.woff2|\.svg|.eot|\.ttf/,
            use: 'url-loader?prefix=font/&limit=10000'
        }, {
            test: /\.(png|jpg|gif)$/,
            use: 'url-loader?limit=10000'
        }, {
            test: /\.scss$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }, {
                loader: 'sass-loader',
                options: {
                    outputStyle: 'expanded'
                }
            }]
        }]
        // , noParse: [/\.min\.js/]
    },

    // resolveLoader: {
    //     alias: {
    //         'rtlcss-loader': path.join(__dirname, 'rtlcss-loader.js')
    //     }
    // },

    optimization: {
        splitChunks: {
            chunks: "async",
            cacheGroups: {
                commons: {
                    chunks: "initial",
                    minChunks: 2,
                },
                vendors: {
                    test: /node_modules/,
                    name: "vendor",
                    chunks: "initial",
                    minChunks: 3,
                    priority: 10,
                    enforce: true,
                },
            },
        },
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'app/index.html',
            baseUrl: process.env.WP_BASE_HREF
        }),
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        }),
        new CopyWebpackPlugin([{
            from: 'img',
            to: 'img',
            context: path.join(__dirname, 'app')
        }, {
            from: 'server',
            to: 'server',
            context: path.join(__dirname, 'app')
        }, {
            from: 'fonts',
            to: 'fonts',
            context: path.join(__dirname, 'app')
        }]),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.moment': 'moment',
            'moment': 'moment'
        }),
        // https://github.com/moment/moment/issues/2979#issuecomment-189899510
        new webpack.ContextReplacementPlugin(/\.\/locale$/, 'empty-module', false, /js$/),
        // new Dotenv(), // Disabled because Heroku doesn't let me use it
    ]
};
