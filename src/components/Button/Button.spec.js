import simulate from 'simulate';
import { mount, unmount } from 'vidom';
import Button from '.';
import keyCodes from '../../utils/keyCodes';

describe('Button', () => {
    const rootElem = document.getElementById('specs');

    afterEach(done => {
        unmount(rootElem, done);
    });

    it('should be a <button/> by default', done => {
        mount(rootElem, <Button/>, () => {
            expect(rootElem.firstChild.tagName.toLowerCase()).to.be('button');
            done();
        });
    });

    it('should be an <a/> if type=link is passed', done => {
        mount(rootElem, <Button type="link"/>, () => {
            expect(rootElem.firstChild.tagName.toLowerCase()).to.be('a');
            done();
        });
    });

    it('should have href if url is passed', done => {
        mount(rootElem, <Button type="link" url="https://ya.ru/"/>, () => {
            expect(rootElem.firstChild.href).to.be('https://ya.ru/');
            done();
        });
    });

    it('should not have href if button with passed url is disabled', done => {
        mount(rootElem, <Button type="link" url="https://ya.ru/" disabled/>, () => {
            expect(rootElem.firstChild.hasAttribute('href')).not.to.be.ok();
            done();
        });
    });

    it('should be hovered after mouseenter, unhovered after mouseleave', done => {
        mount(rootElem, <Button/>, () => {
            const buttonElem = rootElem.firstChild;

            simulate.mouseenter(buttonElem);

            afterUpdate(() => {
                expect(buttonElem.classList.contains('Button_hovered')).to.be.ok();

                simulate.mouseleave(buttonElem);

                afterUpdate(() => {
                    expect(buttonElem.classList.contains('Button_hovered')).not.to.be.ok();
                    done();
                });
            });
        });
    });

    it('should be pressed after mousedown, released after mouseup', done => {
        mount(rootElem, <Button/>, () => {
            const buttonElem = rootElem.firstChild;

            simulate.mousedown(buttonElem);

            afterUpdate(() => {
                expect(buttonElem.classList.contains('Button_pressed')).to.be.ok();

                simulate.mouseup(buttonElem);

                afterUpdate(() => {
                    expect(buttonElem.classList.contains('Button_pressed')).not.to.be.ok();
                    done();
                });
            });
        });
    });

    it('should not be pressed after mouseleave', done => {
        mount(rootElem, <Button/>, () => {
            const buttonElem = rootElem.firstChild;

            simulate.mousedown(buttonElem);

            afterUpdate(() => {
                simulate.mouseleave(buttonElem);

                afterUpdate(() => {
                    expect(buttonElem.classList.contains('Button_pressed')).not.to.be.ok();
                    done();
                });
            });
        });
    });

    it('should be focused in accordance with focused attr', done => {
        mount(rootElem, <Button focused/>, () => {
            const buttonElem = rootElem.firstChild;

            expect(document.activeElement).to.be(buttonElem);
            expect(buttonElem.classList.contains('Button_focused_hard')).to.be.ok();

            mount(rootElem, <Button focused={ false }/>, () => {
                expect(document.activeElement).not.to.be(buttonElem);
                expect(buttonElem.classList.contains('Button_focused_hard')).not.to.be.ok();
                done();
            });
        });
    });

    it('should be focused in accordance with user focus', done => {
        mount(rootElem, <Button/>, () => {
            const buttonElem = rootElem.firstChild;

            simulate.focus(buttonElem);

            afterUpdate(() => {
                expect(document.activeElement).to.be(buttonElem);
                expect(buttonElem.classList.contains('Button_focused_hard')).to.be.ok();

                simulate.blur(buttonElem);

                afterUpdate(() => {
                    expect(document.activeElement).not.to.be(buttonElem);
                    expect(buttonElem.classList.contains('Button_focused_hard')).not.to.be.ok();
                    done();
                });
            });
        });
    });

    it('should be focused after click', done => {
        mount(rootElem, <Button/>, () => {
            const buttonElem = rootElem.firstChild;

            clickOnButton(buttonElem);

            afterUpdate(() => {
                expect(document.activeElement).to.be(buttonElem);
                expect(buttonElem.classList.contains('Button_focused'));
                done();
            });
        });
    });

    it('should call onClick callback after click', done => {
        mount(rootElem, <Button onClick={ () => { done(); } }/>, () => {
            clickOnButton(rootElem.firstChild);
        });
    });

    it('should call onClick callback after space is pressed on focused link', done => {
        const onClick = e => {
            e.preventDefault();
            done();
        };

        mount(rootElem, <Button type="link" focused onClick={ onClick }/>, () => {
            keyOnButton(rootElem.firstChild, keyCodes.SPACE);
        });
    });
});

function afterUpdate(fn) {
    setTimeout(fn, 20);
}

function clickOnButton(buttonElem) {
    simulate.mousedown(buttonElem);
    simulate.mouseup(buttonElem);
    simulate.click(buttonElem);
}

function keyOnButton(buttonElem, charCode) {
    const chr = String.fromCharCode(charCode);

    simulate.keydown(buttonElem, chr);
    simulate.keypress(buttonElem, chr);
    simulate.keyup(buttonElem, chr);
}
