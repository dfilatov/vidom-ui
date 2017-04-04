import { Component } from 'vidom';
import Focusable from '../Focusable';
import bem from '../../utils/bem';
import keyCodes from '../../utils/keyCodes';
import noOp from '../../utils/noOp';

const b = bem('Link');

export default class Link extends Component {
    onInit() {
        this._onFocus = this._onFocus.bind(this);
        this._onBlur = this._onBlur.bind(this);
        this._onMouseClick = this._onMouseClick.bind(this);
        this._onKeyDown = this._onKeyDown.bind(this);

        this.setState({ focused : this.attrs.focused });
    }

    onAttrsReceive() {
        const { focused } = this.attrs;

        if(typeof focused !== 'undefined' && focused !== this.state.focused) {
            this.setState({ focused });
        }
    }

    onRender() {
        const {
                attrs : {
                    theme,
                    size,
                    view,
                    title,
                    disabled,
                    url,
                    target,
                    mix
                },
                state : { focused }
            } = this,
            focusableAttrs = {},
            domAttrs = {
                role : 'link',
                'aria-disabled' : disabled,
                title,
                target,
                className : b({
                    theme : theme || this.context.theme,
                    size,
                    view,
                    disabled,
                    focused
                })
            };

        if(mix) {
            domAttrs.className += ' ' + mix;
        }

        if(!disabled) {
            focusableAttrs.focused = focused;
            focusableAttrs.onFocus = this._onFocus;
            focusableAttrs.onBlur = this._onBlur;

            domAttrs.href = url;
            domAttrs.onClick = this._onMouseClick;

            if(focused) {
                domAttrs.onKeyDown = this._onKeyDown;
            }
        }

        return (
            <Focusable { ...focusableAttrs }>
                <a { ...domAttrs }>
                    { this.children }
                </a>
            </Focusable>
        );
    }

    _onFocus() {
        this.attrs.onFocusChange(true);
        this.setState({ focused : true });
    }

    _onBlur() {
        this.attrs.onFocusChange(false);
        this.setState({ focused : false });
    }

    _onMouseClick(e) {
        if(!e.nativeEvent.button) {
            this._onClick(e);
        }
    }

    _onClick(e) {
        if(this.attrs.pseudo) {
            e.preventDefault();
        }

        this.attrs.onClick(e);
    }

    _onKeyDown(e) {
        if(e.nativeEvent.keyCode === keyCodes.SPACE) {
            const { onClick, pseudo, url } = this.attrs;

            onClick(e);

            if(!pseudo) {
                document.location = url;
            }
        }
    }
}

Link.defaultAttrs = {
    onClick : noOp,
    onFocusChange : noOp
};
