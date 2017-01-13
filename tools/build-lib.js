const { rollup } = require('rollup'),
    babel = require('rollup-plugin-babel'),
    nodeResolve = require('rollup-plugin-node-resolve'),
    postcssExport = require('rollup-plugin-postcss-export'),
    postcssImport = require('postcss-import'),
    postcssRebem = require('rebem-css'),
    postcssNested = require('postcss-nested'),
    postcssEach = require('postcss-each'),
    postcssUrl = require('postcss-url'),
    autoprefixer = require('autoprefixer');

const SRC_DIR ='src',
    LIB_DIR = '.';

rollup({
    entry : `${SRC_DIR}/index.js`,
    external : 'vidom',
    plugins : [
        nodeResolve(),
        postcssExport({
            plugins : [postcssEach, postcssRebem, postcssNested, autoprefixer],
            output : `${LIB_DIR}/index.css`
        }),
        babel({
            babelrc : false,
            presets : ['es2015-loose-rollup'],
            plugins : ['transform-object-rest-spread', 'vidom-jsx']
        })
    ]
}).then(bundle =>
    bundle.write({
        format : 'cjs',
        dest : `${LIB_DIR}/index.js`
    }).then(() =>
        rollup({
            entry : `${SRC_DIR}/islands.post.css`,
            plugins : [
                postcssExport({
                    plugins : [
                        postcssImport,
                        postcssEach,
                        postcssRebem,
                        postcssNested,
                        postcssUrl({ url : 'inline' }),
                        autoprefixer
                    ],
                    output : `${LIB_DIR}/islands.css`
                })
            ]
        }).then(bundle => {
            bundle.generate({ format : 'cjs' });
        })));

