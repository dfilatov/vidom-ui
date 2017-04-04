import { Component } from 'vidom';
import Focusable from '../Focusable';
import Button from '../Button';
import bem from '../../utils/bem';
import noOp from '../../utils/noOp';

const b = bem('CheckBox');

export default class CheckBox extends Component {
    onInit() {
        this._onFocus = this._onFocus.bind(this);
        this._onBlur = this._onBlur.bind(this);
        this._onChange = this._onChange.bind(this);
        this._onButtonFocusChange = this._onButtonFocusChange.bind(this);
        this._onButtonCheckChange = this._onButtonCheckChange.bind(this);

        this.setState({ focused : this.attrs.focused });
    }

    onAttrsReceive() {
        const { focused } = this.attrs;

        if(typeof focused !== 'undefined' && focused !== this.state.focused) {
            this.setState({ focused });
        }
    }

    onRender() {
        return this.attrs.type === 'button'?
            this._renderAsButton() :
            this._renderAsInput();
    }

    _renderAsInput() {
        const {
                attrs : { type, theme, size, checked, disabled, name, value, text, title },
                state : { focused }
            } = this,
            mods = {
                type,
                theme : theme || this.context.theme,
                size,
                name,
                checked,
                focused,
                disabled
            },
            focusableAttrs = {};

        if(!disabled) {
            focusableAttrs.focused = focused;
            focusableAttrs.onFocus = this._onFocus;
            focusableAttrs.onBlur = this._onBlur;
        }

        return (
            <label class={ b(mods) } title={ title }>
                <span class={ b('box') }>
                    <Focusable { ...focusableAttrs }>
                        <input
                            name={ name }
                            type="checkbox"
                            autoComplete="off"
                            class={ b('control') }
                            checked={ checked }
                            disabled={ disabled }
                            value={ value }
                            onChange={ this._onChange }
                        />
                    </Focusable>
                </span>
                <span class={ b('text') } role="presentation">{ text }</span>
            </label>
        );
    }

    _renderAsButton() {
        const { theme, size, checked, disabled, name, value, text, title } = this.attrs;

        return (
            <label class={ b({ checked, disabled }) }>
                { checked? <input key="input" type="hidden" name={ name } value={ value }/> : null }
                <Button
                    key="button"
                    theme={ theme }
                    size={ size }
                    togglable="check"
                    checked={ checked }
                    disabled={ disabled }
                    focused={ this.state.focused }
                    onFocusChange={ this._onButtonFocusChange }
                    onCheckChange={ this._onButtonCheckChange }
                    text={ text }
                    title={ title }
                />
            </label>
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

    _onChange({ target }) {
        const { onCheckChange, value } = this.attrs;

        onCheckChange(target.checked, value);
    }

    _onButtonFocusChange(focused) {
        if(focused) {
            this._onFocus();
        }
        else {
            this._onBlur();
        }
    }

    _onButtonCheckChange(checked) {
        const { onCheckChange, value } = this.attrs;

        onCheckChange(checked, value);
    }
}

CheckBox.defaultAttrs = {
    onFocusChange : noOp,
    onCheckChange : noOp
};
