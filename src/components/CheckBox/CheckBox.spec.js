import { mount, unmount } from 'vidom';
import CheckBox from '.';

describe('CheckBox', () => {
    const rootElem = document.getElementById('specs');

    afterEach(done => {
        unmount(rootElem, done);
    });

    it('should have an <input type="checkbox"/> inside', done => {
        mount(rootElem, <CheckBox/>, () => {
            expect(rootElem.getElementsByTagName('input')[0].type).to.be('checkbox');
            done();
        });
    });

    it('should have a <button/> inside if type=button is passed', done => {
        mount(rootElem, <CheckBox type="button"/>, () => {
            expect(rootElem.getElementsByTagName('button')).to.have.length(1);
            done();
        });
    });
});
