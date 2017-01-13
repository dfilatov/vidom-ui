import { Component } from 'vidom';
import Overlay from '../Overlay';
import dom from '../../utils/dom';
import keyCodes from '../../utils/keyCodes';
import bem from '../../utils/bem';
import noOp from '../../utils/noOp';

const Z_INDEX_LEVEL = 10,
    b = bem('Modal');

export default class Modal extends Component {
    onInit() {
        this._contentDomNode = null;
        this._domNodeToFocusAfterClosing = null;
        this._focusedDomNode = null;

        this._onContentRef = this._onContentRef.bind(this);
        this._onFocus = this._onFocus.bind(this);
        this._onKeyDown = this._onKeyDown.bind(this);
        this._onOverlayClick = this._onOverlayClick.bind(this);
    }

    onRender() {
        const { theme, visible, autoclosable, onHide } = this.attrs,
            overlayAttrs = {
                visible,
                autoclosable,
                zIndexLevel : Z_INDEX_LEVEL,
                onHide
            },
            domAttrs = {
                'class' : b({ visible, theme : theme || this.context.theme }),
                role : 'dialog',
                'aria-hidden' : !visible
            };

        if(visible) {
            if(autoclosable) {
                overlayAttrs.onClick = this._onOverlayClick;
            }

            domAttrs.onFocus = this._onFocus;
            domAttrs.onKeyDown = this._onKeyDown;
        }

        return (
            <Overlay { ...overlayAttrs }>
                <div { ...domAttrs }>
                    <div class={ b('table') }>
                        <div class={ b('cell') }>
                            <ModalContent visible={ visible } ref={ this._onContentRef }>
                                { this.children }
                            </ModalContent>
                        </div>
                    </div>
                </div>
            </Overlay>
        );
    }

    onUpdate({ visible : prevVisible }) {
        const { visible } = this.attrs;

        if(visible !== prevVisible) {
            if(visible) {
                this._domNodeToFocusAfterClosing = document.activeElement;
                this._contentDomNode.focus();
            }
            else {
                this._domNodeToFocusAfterClosing.focus();
            }
        }
    }

    _onContentRef(ref) {
        this._contentDomNode = ref && ref.getDomNode();
    }

    _onFocus({ target }) {
        this._focusedDomNode = target;
    }

    _onKeyDown(e) {
        const { keyCode, shiftKey } = e.nativeEvent;

        if(keyCode === keyCodes.TAB) {
            const dir = shiftKey? 'backward' : 'forward',
                contentDomNode = this._contentDomNode;

            if(this._focusedDomNode !== contentDomNode) {
                if(!dom.findFocusableChild(contentDomNode, dir, this._focusedDomNode)) {
                    e.preventDefault();
                    dom.findFocusableChild(contentDomNode, dir).focus();
                }
            }
            else if(!dom.findFocusableChild(contentDomNode, dir)) { // no focusable child at all
                e.preventDefault();
            }
        }
    }

    _onOverlayClick({ target }) {
        if(!this._contentDomNode.contains(target)) {
            this.attrs.onHide({ reason : 'outside-click' });
        }
    }
}

Modal.defaultAttrs = {
    visible : false,
    autoclosable : false,
    onHide : noOp
};

class ModalContent extends Component {
    shouldUpdate(_, prevChildren) {
        return this.attrs.visible && this.children !== prevChildren;
    }

    onRender() {
        return (
            <div class={ b('content') } tabIndex="-1">
                { this.children }
            </div>
        );
    }
}
