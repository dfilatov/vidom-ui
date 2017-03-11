NODE_ENV=production webpack --config site/webpack.config.js --optimize-minimize
git clone -b gh-pages git@github.com:dfilatov/vidom-ui.git gh-pages
cp -r site/index.html site/build gh-pages
cd gh-pages
git add -A
git commit -m "gh-pages updated"
git push origin gh-pages
cd ..
rm -rf gh-pages site/build
