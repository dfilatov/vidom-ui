import { Component } from 'vidom';
import Portal from '../Portal';
import keyCodes from '../../utils/keyCodes';
import noOp from '../../utils/noOp';

const Z_INDEX_FACTOR = 1000,
    instanceZIndexes = {},
    visibleInstances = [];

export default class Overlay extends Component {
    onInit() {
        this._popupDomNode = null;
        this._isClickOutsidePrevented = false;
        this._childOverlays = null;

        this._preventClickOutside = this._preventClickOutside.bind(this);
        this._onDocumentClick = this._onDocumentClick.bind(this);
        this._onDocumentKeyDown = this._onDocumentKeyDown.bind(this);
        this._onOverlayClick = this._onOverlayClick.bind(this);
        this._registerChildOverlay = this._registerChildOverlay.bind(this);
        this._unregisterChildOverlay = this._unregisterChildOverlay.bind(this);

        this.setState({
            wasVisible : false,
            zIndex : null
        });
    }

    onChildContextRequest() {
        return {
            zIndexLevel : this._calcZIndexLevel(),
            preventParentOverlayClickOutside : this._preventClickOutside,
            registerChildOverlay : this._registerChildOverlay,
            unregisterChildOverlay : this._unregisterChildOverlay
        };
    }

    onRender() {
        const {
            attrs : { visible },
            state : { zIndex, wasVisible },
            children
        } = this;

        if(visible || wasVisible) {
            const childAttrs = children.attrs;

            return (
                <Portal>
                    {
                        children.clone().setAttrs({
                            style : childAttrs && childAttrs.style?
                                { ...childAttrs.style, zIndex } :
                                { zIndex },
                            onClick : this._onOverlayClick
                        })
                    }
                </Portal>
            );
        }

        return null;
    }

    onMount() {
        if(this.context.registerChildOverlay) {
            this.context.registerChildOverlay(this);
        }

        if(this.attrs.visible) {
            this.update();
        }
    }

    onUpdate({ visible : prevVisible, autoclosable : prevAutoclosable }) {
        const {
            attrs : { visible, autoclosable },
            state : { zIndex }
        } = this;

        if(!visible) {
            if(prevVisible) {
                visibleInstances.splice(visibleInstances.indexOf(this), 1);

                if(prevAutoclosable) {
                    document.removeEventListener('click', this._onDocumentClick);
                    document.removeEventListener('keydown', this._onDocumentKeyDown);
                }

                this._releaseZIndex(zIndex);

                if(this._childOverlays) {
                    this._childOverlays.forEach(childOverlay => {
                        childOverlay.attrs.onHide({ reason : 'parent' });
                    });
                }
            }
            return;
        }

        if(!prevVisible) {
            visibleInstances.unshift(this);

            if(autoclosable) {
                document.addEventListener('click', this._onDocumentClick);
                document.addEventListener('keydown', this._onDocumentKeyDown);
            }

            this.setState({
                zIndex : this._acquireZIndex(),
                wasVisible : true
            });
        }
    }

    onUnmount() {
        if(this.attrs.visible) {
            this._releaseZIndex(this.state.zIndex);
        }

        if(this.context.unregisterChildOverlay) {
            this.context.unregisterChildOverlay(this);
        }
    }

    _preventClickOutside() {
        this._isClickOutsidePrevented = true;

        const { preventParentOverlayClickOutside } = this.context;

        if(preventParentOverlayClickOutside) {
            preventParentOverlayClickOutside();
        }
    }

    _onOverlayClick(e) {
        this._preventClickOutside();
        this.attrs.onClick(e);
    }

    _onDocumentClick() {
        if(this._isClickOutsidePrevented) {
            this._isClickOutsidePrevented = false;
        }
        else {
            this.attrs.onHide({ reason : 'outside-click' });
        }
    }

    _onDocumentKeyDown(e) {
        if(e.keyCode === keyCodes.ESC && visibleInstances[0] === this) {
            e.preventDefault(); // to prevent desktop Safari from exiting the full screen mode
            this.attrs.onHide({ reason : 'escape' });
        }
    }

    _acquireZIndex() {
        const zIndexLevel = this._calcZIndexLevel(),
            levelZIndexes = instanceZIndexes[zIndexLevel];

        let res;

        if(levelZIndexes) {
            levelZIndexes.push(res = levelZIndexes[levelZIndexes.length - 1] + 1);
        }
        else {
            instanceZIndexes[zIndexLevel] = [res = zIndexLevel * Z_INDEX_FACTOR + 1];
        }

        return res;
    }

    _releaseZIndex(zIndex) {
        const zIndexLevel = this._calcZIndexLevel(),
            levelZIndexes = instanceZIndexes[zIndexLevel];

        levelZIndexes.splice(levelZIndexes.indexOf(zIndex), 1);

        if(!levelZIndexes.length) {
            delete instanceZIndexes[zIndexLevel];
        }
    }

    _calcZIndexLevel() {
        return (this.context.zIndexLevel || 0) + this.attrs.zIndexLevel;
    }

    _registerChildOverlay(childOverlay) {
        (this._childOverlays || (this._childOverlays = [])).push(childOverlay);
    }

    _unregisterChildOverlay(childOverlay) {
        this._childOverlays.splice(this._childOverlays.indexOf(childOverlay), 1);
    }
}

Overlay.defaultAttrs = {
    zIndexLevel : 0,
    visible : false,
    onClick : noOp,
    onHide : noOp
};
