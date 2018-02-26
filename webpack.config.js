'use strict';

// `CheckerPlugin` is optional. Use it if you want async error reporting.
// We need this plugin to detect a `--watch` mode. It may be removed later
// after https://github.com/webpack/webpack/issues/3460 will be resolved.
const { CheckerPlugin } = require('awesome-typescript-loader')
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

const PLUGIN_NAME = require('./package.json').name;
const DIST_PATH = path.join(__dirname, 'dist');
const ENTRY = {};
ENTRY[PLUGIN_NAME] = path.join(__dirname, 'src', 'index.ts');
ENTRY[PLUGIN_NAME + '.min'] = path.join(__dirname, 'src', 'index.ts');
const EXTERNALS = {};

module.exports = [{
    devtool: 'source-map',
    entry: path.join(__dirname, 'src', 'index.ts'),
    output: {
        path: DIST_PATH,
        filename: PLUGIN_NAME + '.js',
        library: 'EE3Timer',
        libraryTarget: 'umd'
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
        new CheckerPlugin(),
        new DtsBundlePlugin()
    ],
    externals: [nodeExternals()]
}, {
    devtool: 'source-map',
    entry: path.join(__dirname, 'src', 'index.ts'),
    output: {
        path: DIST_PATH,
        filename: PLUGIN_NAME + '.min.js',
        library: 'EE3Timer',
        libraryTarget: 'umd'
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
        new CheckerPlugin(),
        new webpack.optimize.UglifyJsPlugin({ minimize: true })
    ]
}];

function DtsBundlePlugin() {}
DtsBundlePlugin.prototype.apply = function(compiler) {
    compiler.plugin('done', function() {
        var dts = require('dts-bundle');

        dts.bundle({
            name: PLUGIN_NAME,
            main: path.join(DIST_PATH, 'index.d.ts'),
            out: PLUGIN_NAME + '.d.ts',
            removeSource: true,
            outputAsModuleFolder: true, // to use npm in-package typings
            verbose: true
        });
    });
};