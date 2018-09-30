const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');

let config = {
    entry: {
        app: ['./src/app.tsx', './src/main.scss']
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },

    module: {
        rules: [{
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        plugins: () => [require('autoprefixer')]
                    }
                }
            ]
        }, {
            test: /\.(sass|scss)$/,
            include: [
                path.resolve(__dirname, 'node_modules'),
                path.resolve(__dirname, 'src/')
            ],
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        options: {
                            plugins: function() {
                                return [
                                    require('precss'),
                                    require('autoprefixer')
                                ];
                            }
                        }
                    }
                },
                'sass-loader'
            ]
        }, {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            loader: 'ts-loader'
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "bundle.css"
        })
    ]
};

module.exports = config;