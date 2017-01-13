const path = require('path'),
    { rollup } = require('rollup'),
    babel = require('rollup-plugin-babel'),
    commonJs = require('rollup-plugin-commonjs'),
    nodeResolve = require('rollup-plugin-node-resolve'),
    replace = require('rollup-plugin-replace'),
    postcss = require('rollup-plugin-postcss'),
    postcssRebem = require('rebem-css'),
    postcssNested = require('postcss-nested'),
    postcssEach = require('postcss-each'),
    autoprefixer = require('autoprefixer');

rollup({
    entry : __dirname + '/../src/index.spec.js',
    plugins : [
        nodeResolve(),
        commonJs(),
        postcss({
            plugins : [postcssEach, postcssRebem, postcssNested, autoprefixer]
        }),
        babel({
            babelrc : false,
            presets : ['es2015-loose-rollup'],
            plugins : ['transform-object-rest-spread', 'vidom-jsx']
        }),
        replace({
            'process.env.NODE_ENV': '\'development\''
        })
    ]
}).then(bundle => bundle.write({
    format : 'iife',
    moduleName : 'vidom-components',
    dest : __dirname + '/_specs.js',
    useStrict : false
})).catch(e => {
    console.error(e);
});
