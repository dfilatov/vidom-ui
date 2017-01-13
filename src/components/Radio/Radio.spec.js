import { mount, unmount } from 'vidom';
import Radio from '.';

describe('Radio', () => {
    const rootElem = document.getElementById('specs');

    afterEach(done => {
        unmount(rootElem, done);
    });

    it('should have an <input type="radio"/> inside', done => {
        mount(rootElem, <Radio/>, () => {
            expect(rootElem.getElementsByTagName('input')[0].type).to.be('radio');
            done();
        });
    });

    it('should have a <button/> inside if type=button is passed', done => {
        mount(rootElem, <Radio type="button"/>, () => {
            expect(rootElem.getElementsByTagName('button')).to.have.length(1);
            done();
        });
    });
});
