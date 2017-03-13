import { Component } from 'vidom';
import Focusable from '../Focusable';
import bem from '../../utils/bem';
import keyCodes from '../../utils/keyCodes';
import noOp from '../../utils/noOp';

const b = bem('Button'),
    textClass = b('text');

export default class Button extends Component {
    onInit() {
        this._enableClick = false;

        this._onFocus = this._onFocus.bind(this);
        this._onBlur = this._onBlur.bind(this);
        this._onMouseEnter = this._onMouseEnter.bind(this);
        this._onMouseLeave = this._onMouseLeave.bind(this);
        this._onMouseDown = this._onMouseDown.bind(this);
        this._onMouseUp = this._onMouseUp.bind(this);
        this._onMouseClick = this._onMouseClick.bind(this);
        this._onKeyDown = this._onKeyDown.bind(this);
        this._onKeyUp = this._onKeyUp.bind(this);

        this.setState({
            focused : this.attrs.focused? 'hard' : false,
            hovered : false,
            pressed : false
        });
    }

    onAttrsChange() {
        const { focused, disabled } = this.attrs;
        let newState;

        if(disabled) {
            (newState = {}).hovered = newState.pressed = false;
        }

        if(typeof focused !== 'undefined') {
            (newState || (newState = {})).focused = focused?
                this.state.focused || 'hard' :
                false;

            if(focused === false) {
                newState.pressed = false;
            }
        }

        if(newState) {
            this.setState(newState);
        }
    }

    onRender() {
        const {
                attrs : {
                    type,
                    theme,
                    size,
                    view,
                    text,
                    title,
                    beforeIcon,
                    afterIcon,
                    disabled,
                    togglable,
                    checked,
                    role,
                    url,
                    target,
                    mix
                },
                state : { focused, hovered, pressed }
            } = this,
            focusableAttrs = {},
            domAttrs = {
                role,
                'aria-disabled' : disabled,
                type : type === 'submit'? type : null,
                disabled : type === 'link'? false : disabled,
                title,
                className : b({
                    theme : theme || this.context.theme,
                    size,
                    view,
                    disabled,
                    focused,
                    hovered,
                    pressed,
                    checked
                })
            };

        if(mix) {
            domAttrs.className += ' ' + mix;
        }

        if(!disabled) {
            focusableAttrs.focused = focused;
            focusableAttrs.onFocus = this._onFocus;
            focusableAttrs.onBlur = this._onBlur;

            domAttrs.onMouseEnter = this._onMouseEnter;
            domAttrs.onMouseLeave = this._onMouseLeave;
            domAttrs.onMouseDown = this._onMouseDown;
            domAttrs.onMouseUp = this._onMouseUp;
            domAttrs.onClick = this._onMouseClick;
            domAttrs.onTouchStart = noOp;

            if(focused) {
                domAttrs.onKeyDown = this._onKeyDown;
                domAttrs.onKeyUp = this._onKeyUp;
            }
        }

        if(togglable) {
            domAttrs[`aria-${role === 'checkbox'? 'checked' : 'pressed'}`] = String(!!checked);
        }

        let Tag;

        if(type === 'link') {
            Tag = 'a';
            if(!disabled) {
                domAttrs.href = url;
            }
            domAttrs.target = target;
        }
        else {
            Tag = 'button';
        }

        return (
            <Focusable { ...focusableAttrs }>
                <Tag { ...domAttrs }>
                    { beforeIcon }
                    { text && <span class={ textClass }>{ text }</span> }
                    { afterIcon }
                </Tag>
            </Focusable>
        );
    }

    _onFocus() {
        this.attrs.onFocusChange(true);
        this.setState({ focused : this.state.pressed || 'hard' });
    }

    _onBlur() {
        this.attrs.onFocusChange(false);
        this.setState({ focused : false });
    }

    _onMouseEnter() {
        this.setState({ hovered : true });
    }

    _onMouseLeave() {
        this.setState({ hovered : false, pressed : false });
    }

    _onMouseDown({ nativeEvent }) {
        if(!nativeEvent.button) {
            this.setState({ pressed : true });
        }
    }

    _onMouseUp() {
        const { pressed, focused } = this.state;

        if(pressed) {
            if(!focused) { // normalize focus among the browsers
                this._onFocus();
            }

            this._enableClick = true;
            this.setState({ pressed : false });
        }
    }

    _onMouseClick(e) {
        if(!e.nativeEvent.button) {
            this._onClick(e);
        }
    }

    _onClick(e) {
        if(this._enableClick) {
            this._enableClick = false;

            const { onClick, togglable } = this.attrs;

            if(togglable) {
                this._onCheck();
            }

            onClick(e);
        }
    }

    _onKeyDown({ nativeEvent : { keyCode } }) {
        if((keyCode === keyCodes.SPACE || keyCode === keyCodes.ENTER) && !this.state.pressed) {
            this._enableClick = true;
            this.setState({ pressed : true });
        }
    }

    _onKeyUp(e) {
        if(this.state.pressed) {
            this.setState({ pressed : false });

            const { type, url } = this.attrs;

            if(type === 'link' && e.nativeEvent.keyCode === keyCodes.SPACE) {
                this._onClick(e);
                if(!e.isDefaultPrevented()) {
                    document.location = url;
                }
            }
        }
    }

    _onCheck() {
        const { togglable, checked, onCheckChange } = this.attrs;

        if(togglable) {
            if(togglable === 'radio') {
                if(!checked) {
                    onCheckChange(true);
                }
            }
            else {
                onCheckChange(!checked);
            }
        }
    }
}

Button.defaultAttrs = {
    onClick : noOp,
    onFocusChange : noOp,
    onCheckChange : noOp
};
