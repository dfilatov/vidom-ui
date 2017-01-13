import { Component } from 'vidom';

export default class Focusable extends Component {
    onInit() {
        this._onFocus = this._onFocus.bind(this);
        this._onBlur = this._onBlur.bind(this);
    }

    onRender() {
        return this.children
            .clone()
            .setAttrs({ onFocus : this._onFocus, onBlur : this._onBlur });
    }

    onMount() {
        this._updateFocus(this.attrs.focused);
    }

    onUpdate({ focused : prevFocused }) {
        const { focused } = this.attrs;

        if(focused !== prevFocused) {
            this._updateFocus(focused);
        }
    }

    _updateFocus(focused) {
        if(focused) {
            this._focus();
        }
        else {
            this._blur();
        }
    }

    _focus() {
        const domNode = this.getDomNode();

        if(document.activeElement !== domNode) {
            domNode.focus();
        }
    }

    _blur() {
        const domNode = this.getDomNode();

        if(document.activeElement === domNode) {
            domNode.blur();
        }
    }

    _onFocus(e) {
        const { focused, onFocus } = this.attrs;

        if(!focused) {
            onFocus(e);
        }
    }

    _onBlur(e) {
        const { focused, onBlur } = this.attrs;

        if(focused) {
            onBlur(e);
        }
    }
}
