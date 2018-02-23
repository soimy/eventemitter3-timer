'use strict';

// `CheckerPlugin` is optional. Use it if you want async error reporting.
// We need this plugin to detect a `--watch` mode. It may be removed later
// after https://github.com/webpack/webpack/issues/3460 will be resolved.
const { CheckerPlugin } = require('awesome-typescript-loader')
const webpack = require('webpack');
const path = require('path');

const PLUGIN_NAME = require('./package.json').name;
const ENTRY = ['./src/index.ts'];
const EXTERNALS = {};

module.exports = {
	devtool: 'inline-source-map',
	entry: ENTRY,
	output: {
        filename: 'build/' + PLUGIN_NAME + '.js',
        library: 'EE3Timer'
    },
    resolve: {
        extensions: [".js", ".ts"]
    },
    stats: "verbose",
	module: {
		loaders: [{
            test: /\.tsx?$/,
            loader: 'awesome-typescript-loader',
            exclude: /node_modules/
        }]
    },
    plugins: [
        new CheckerPlugin()
    ]
};