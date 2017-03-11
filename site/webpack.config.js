var postcssRebem = require('rebem-css'),
    postcssNested = require('postcss-nested'),
    postcssEach = require('postcss-each'),
    autoprefixer = require('autoprefixer');

module.exports = {
    entry : __dirname + '/index.js',
    output : {
        path : __dirname + '/build',
        filename : 'bundle.js',
        publicPath : '/build'
    },
    module : {
        loaders: [
            { test : /\.js$/, loader : 'babel' },
            { test : /\.css$/, loaders : ['style', 'css?importLoaders=1!postcss'] },
            { test : /\.svg/, loader : 'svg-url-loader'}
        ]
    },
    resolve : {
        alias : {
            'vidom-components' : __dirname + '/../src'
        }
    },
    postcss : function() {
        return [postcssEach, postcssRebem, postcssNested, autoprefixer];
    },
    devServer : {
        contentBase : 'site',
        historyApiFallback : true
    }
};
