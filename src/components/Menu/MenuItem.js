import { Component } from 'vidom';
import bem from '../../utils/bem';
import noOp from '../../utils/noOp';

const b = bem('MenuItem');

export default class MenuItem extends Component {
    onInit() {
        this._onClick = this._onClick.bind(this);
        this._onMouseEnter = this._onMouseEnter.bind(this);
        this._onMouseLeave = this._onMouseLeave.bind(this);
    }

    onRender() {
        const { type, theme, size, hovered, disabled, checked } = this.attrs,
            domAttrs = { className : b({ type, theme, size, hovered, disabled, checked }) };

        if(!disabled) {
            domAttrs.onMouseEnter = this._onMouseEnter;
            domAttrs.onMouseLeave = this._onMouseLeave;
            domAttrs.onClick = this._onClick;
        }

        return (
            <div { ...domAttrs }>
                { this.children }
            </div>
        );
    }

    _onMouseEnter() {
        const { onHoverChange, idx } = this.attrs;

        onHoverChange(true, idx);
    }

    _onMouseLeave() {
        const { onHoverChange, idx } = this.attrs;

        onHoverChange(false, idx);
    }

    _onClick() {
        const { onClick, value } = this.attrs;

        onClick(value);
    }
}

MenuItem.defaultAttrs = {
    onHoverChange : noOp,
    onClick : noOp
};
