import { Component } from 'vidom';
import Focusable from '../Focusable';
import bem from '../../utils/bem';
import noOp from '../../utils/noOp';

const b = bem('TextArea');

export default class TextArea extends Component {
    onInit() {
        const { focused } = this.attrs;

        this._onFocus = this._onFocus.bind(this);
        this._onBlur = this._onBlur.bind(this);
        this._onValueChange = this._onValueChange.bind(this);

        this.setState({ focused });
    }

    onAttrsChange() {
        const { focused } = this.attrs;

        if(typeof focused !== 'undefined' && focused !== this.state.focused) {
            this.setState({ focused });
        }
    }

    onRender() {
        const {
                attrs : { theme, size, disabled, name, value, placeholder, width },
                state : { focused }
            } = this,
            mods = {
                theme : theme || this.context.theme,
                size,
                name,
                focused,
                disabled,
                width
            },
            focusableAttrs = {};

        if(!disabled) {
            focusableAttrs.focused = focused;
            focusableAttrs.onFocus = this._onFocus;
            focusableAttrs.onBlur = this._onBlur;
        }

        return (
            <Focusable { ...focusableAttrs }>
                <textarea
                    class={ b(mods) }
                    name={ name }
                    value={ value }
                    placeholder={ placeholder }
                    disabled={ disabled }
                    onChange={ this._onValueChange }
                />
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

    _onValueChange({ target }) {
        this.getAttrs().onValueChange(target.value);
    }
}

TextArea.defaultAttrs = {
    onFocusChange : noOp,
    onValueChange : noOp
};
