import { mount, unmount } from 'vidom';
import Link from '.';

describe('Link', () => {
    const rootElem = document.getElementById('specs');

    afterEach(done => {
        unmount(rootElem, done);
    });

    it('should be an <a/>', done => {
        mount(rootElem, <Link/>, () => {
            expect(rootElem.firstChild.tagName.toLowerCase()).to.be('a');
            done();
        });
    });

    it('should have href if url is passed', done => {
        mount(rootElem, <Link url="https://ya.ru/"/>, () => {
            expect(rootElem.firstChild.href).to.be('https://ya.ru/');
            done();
        });
    });

    it('should not have href if disabled', done => {
        mount(rootElem, <Link url="https://ya.ru/" disabled/>, () => {
            expect(rootElem.firstChild.hasAttribute('href')).not.to.be.ok();
            done();
        });
    });
});
