const nodeExternals = require('webpack-node-externals');
const isCoverage = process.env.NODE_ENV === 'coverage';
const path = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader')

module.exports = {
    resolve: {
        modules: [path.resolve('./src'), "node_modules"],
        extensions: ['.ts', '.js'],
    },
    output: {
        // use absolute paths in sourcemaps (important for debugging via IDE)
        devtoolModuleFilenameTemplate: '[absolute-resource-path]',
        devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
    },
    module: {
        rules: [].concat(
            isCoverage ? {
                test: /\.(js|ts)/,
                include: path.resolve('src'), // instrument only testing sources with Istanbul, after ts-loader runs
                loader: 'istanbul-instrumenter-loader'
            }: [],
            {
                test: /\.ts$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'awesome-typescript-loader?sourceMap=true&declaration=false',
            }
        )
    },
    plugins: [ new CheckerPlugin() ],
    target: 'node',  // webpack should compile node compatible code
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    devtool: "#inline-cheap-module-source-map"
};