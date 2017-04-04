import { Component } from 'vidom';
import Focusable from '../Focusable';
import bem from '../../utils/bem';
import noOp from '../../utils/noOp';

const b = bem('TextInput');

export default class TextInput extends Component {
    onInit() {
        this._onFocus = this._onFocus.bind(this);
        this._onBlur = this._onBlur.bind(this);
        this._onValueChange = this._onValueChange.bind(this);
        this._onClearClick = this._onClearClick.bind(this);

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
                attrs : { type, theme, size, disabled, name, value, maxLength, placeholder, hasClear, width },
                state : { focused }
            } = this,
            mods = {
                theme : theme || this.context.theme,
                size,
                name,
                focused,
                disabled,
                hasClear,
                width
            },
            focusableAttrs = {};

        if(!disabled) {
            focusableAttrs.focused = focused;
            focusableAttrs.onFocus = this._onFocus;
            focusableAttrs.onBlur = this._onBlur;
        }

        return (
            <span class={ b(mods) }>
                <span class={ b('box') }>
                    <Focusable { ...focusableAttrs }>
                        <input
                            class={ b('control') }
                            type={ type }
                            name={ name }
                            value={ value }
                            maxlength={ maxLength }
                            placeholder={ placeholder }
                            disabled={ disabled }
                            onChange={ this._onValueChange }
                        />
                    </Focusable>
                    {
                        hasClear?
                            <span
                                class={ b('clear', { visible : !!value }) }
                                onClick={ this._onClearClick }
                            /> :
                            null
                    }
                </span>
            </span>
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
        this.attrs.onValueChange(target.value);
    }

    _onClearClick() {
        this.attrs.onValueChange('');
        this._onFocus();
    }
}

TextInput.defaultAttrs = {
    onFocusChange : noOp,
    onValueChange : noOp
};
