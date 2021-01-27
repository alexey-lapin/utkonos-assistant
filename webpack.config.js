const path = require('path');
// import path from 'path';
const CopyPlugin = require('copy-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
// import ProgressBarPlugin from 'progress-bar-webpack-plugin';

module.exports = {
    devtool: 'eval-cheap-module-source-map',
    context: __dirname + '/src',
    entry: {
        'inject/index': './inject/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    plugins: [
        new ProgressBarPlugin(),
        new CopyPlugin({
            patterns: [{
                from: 'extension/manifest.json',
                to: 'manifest.json',
            }]
        }),
    ]
};