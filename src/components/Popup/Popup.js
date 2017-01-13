import { Component } from 'vidom';
import Overlay from '../Overlay';
import bem from '../../utils/bem';
import noOp from '../../utils/noOp';
import dom from '../../utils/dom';

const VIEWPORT_ACCURACY_FACTOR = .99,
    DEFAULT_DIRECTIONS = [
        'bottom-left', 'bottom-center', 'bottom-right',
        'top-left', 'top-center', 'top-right',
        'right-top', 'right-center', 'right-bottom',
        'left-top', 'left-center', 'left-bottom'
    ],
    b = bem('Popup');

export default class Popup extends Component {
    onInit() {
        this._popupDomNode = null;
        this._scrollableAnchorParentDomNodes = null;

        this._onPopupRef = this._onPopupRef.bind(this);
        this._onVisibilityConstraintsChange = this._onVisibilityConstraintsChange.bind(this);

        this.setState({
            direction : null,
            left : null,
            top : null,
            height : null,
            hidden : false
        });
    }

    onRender() {
        const {
                attrs : { theme, visible, autoclosable, zIndexLevel, onHide },
                state : { direction, left, top, height, hidden }
            } = this,
            domAttrs = {
                'class' : b({
                    visible : visible && !hidden,
                    direction : hidden? false : direction,
                    theme : theme || this.context.theme
                }),
                style : {
                    left : left === null? null : left + 'px',
                    top : top === null? null : top + 'px',
                    height : height? height + 'px' : null
                }
            };

        return (
            <Overlay { ...{ visible, autoclosable, zIndexLevel, onHide } }>
                <div { ...domAttrs } ref={ this._onPopupRef }>
                    <PopupContent visible={ visible && !hidden }>
                        { this.children }
                    </PopupContent>
                </div>
            </Overlay>
        );
    }

    onUpdate({ visible : prevVisible }) {
        const { visible } = this.attrs;

        if(visible !== prevVisible) {
            if(visible) {
                this._enableVisibilityConstraints();
                this._reposition();
            }
            else {
                this._disableVisibilityConstraints();
            }
        }
        else if(visible && !this.state.hidden && !dom.isVisible(this._getAnchor())) {
            this.setState({ hidden : true });
        }
    }

    onUnmount() {
        if(this.attrs.visible) {
            this._disableVisibilityConstraints();
        }
    }

    _enableVisibilityConstraints() {
        window.addEventListener('resize', this._onVisibilityConstraintsChange);

        const anchor = this._getAnchor();

        if(anchor instanceof Node){
            this._scrollableAnchorParentDomNodes = dom.findScrollableParents(anchor);

            let i = 0;

            while(i < this._scrollableAnchorParentDomNodes.length) {
                this._scrollableAnchorParentDomNodes[i++].addEventListener(
                    'scroll',
                    this._onVisibilityConstraintsChange);
            }
        }
    }

    _disableVisibilityConstraints() {
        window.removeEventListener('resize', this._onVisibilityConstraintsChange);

        if(this._scrollableAnchorParentDomNodes) {
            let i = 0;

            while(i < this._scrollableAnchorParentDomNodes.length) {
                this._scrollableAnchorParentDomNodes[i++].removeEventListener(
                    'scroll',
                    this._onVisibilityConstraintsChange);
            }

            this._scrollableAnchorParentDomNodes = null;
        }
    }

    _onPopupRef(domNode) {
        this._popupDomNode = domNode;
    }

    _onVisibilityConstraintsChange() {
        this._reposition();
    }

    _reposition() {
        const { direction, position, height } = this._calcBestLayoutParams(),
            curState = this.state,
            { hidden } = curState,
            nextState = {
                direction,
                left : position.left,
                top : position.top,
                height
            };

        if(nextState.left !== curState.left ||
                nextState.top !== curState.top ||
                nextState.direction !== curState.direction) {
            this.setState(nextState);
        }

        if(hidden === this._calcIsAnchorVisible()) {
            this.setState({ hidden : !hidden });
        }
    }

    _getAnchor() {
        const anchor = this.attrs.anchor();

        return ('left' in anchor && 'top' in anchor) || anchor instanceof Node?
            anchor :
            anchor.getDomNode();
    }

    _calcBestLayoutParams() {
        const viewport = this._calcViewportDimensions(),
            popup = this._calcPopupDimensions(),
            anchor = this._calcAnchorDimensions(),
            { directions, restrictHeight } = this.attrs,
            curDirection = this.state.direction;

        let i = 0,
            bestViewportFactor = 0,
            bestDirection,
            bestPosition,
            direction,
            position,
            viewportFactor,
            height;

        while(direction = directions[i++]) {
            position = this._calcPopupPosition(direction, anchor, popup);
            viewportFactor = this._calcViewportFactor(position, viewport, popup);

            if(i === 1 ||
                    viewportFactor > bestViewportFactor ||
                    (!bestViewportFactor && curDirection === direction)) {
                bestDirection = direction;
                bestViewportFactor = viewportFactor;
                bestPosition = position;
            }

            if(bestViewportFactor > VIEWPORT_ACCURACY_FACTOR) {
                break;
            }
        }

        if(restrictHeight && bestViewportFactor <= VIEWPORT_ACCURACY_FACTOR) {
            const { viewportOffset } = this.attrs;

            if(bestPosition.top + popup.height > viewport.bottom - viewportOffset) {
                height = viewport.bottom - viewportOffset - bestPosition.top;
            }
            else if(bestPosition.top < viewport.top + viewportOffset) {
                const top = bestPosition.top;

                bestPosition.top = viewport.top + viewportOffset;
                height = popup.height + top - bestPosition.top;
            }
        }

        return {
            direction : bestDirection,
            position : bestPosition,
            height : height || null
        };
    }

    _calcAnchorDimensions() {
        const anchor = this._getAnchor();

        if(!(anchor instanceof Node)) {
            return {
                left : anchor.left,
                top : anchor.top,
                width : 0,
                height : 0
            };
        }

        const anchorRect = anchor.getBoundingClientRect(),
            viewportRect = document.documentElement.getBoundingClientRect();

        return {
            left : anchorRect.left - viewportRect.left,
            top : anchorRect.top - viewportRect.top,
            width : anchorRect.width,
            height : anchorRect.height
        };
    }

    _calcViewportDimensions() {
        const { pageYOffset, pageXOffset, innerHeight, innerWidth } = window;

        return {
            left : pageXOffset,
            top : pageYOffset,
            right : pageXOffset + innerWidth,
            bottom : pageYOffset + innerHeight
        };
    }

    _calcViewportFactor(pos, viewport, popup) {
        const { viewportOffset } = this.attrs,
            intersectionLeft = Math.max(pos.left, viewport.left + viewportOffset),
            intersectionRight = Math.min(pos.left + popup.width, viewport.right - viewportOffset),
            intersectionTop = Math.max(pos.top, viewport.top + viewportOffset),
            intersectionBottom = Math.min(pos.top + popup.height, viewport.bottom - viewportOffset);

        return intersectionLeft < intersectionRight && intersectionTop < intersectionBottom?
            // has intersection
            (intersectionRight - intersectionLeft) * (intersectionBottom - intersectionTop) / popup.area :
            0;
    }

    _calcPopupDimensions() {
        const heightStyle = this._popupDomNode.style.height;

        this._popupDomNode.style.height = 'auto';

        const width = this._popupDomNode.offsetWidth,
            height = this._popupDomNode.offsetHeight;

        this._popupDomNode.style.height = heightStyle;

        return {
            width,
            height,
            area : width * height
        };
    }

    _calcPopupPosition(direction, anchor, popup) {
        const { mainOffset, secondaryOffset } = this.attrs;
        let left, top;

        if(checkMainDirection(direction, 'bottom')) {
            top = anchor.top + anchor.height + mainOffset;
        }
        else if(checkMainDirection(direction, 'top')) {
            top = anchor.top - popup.height - mainOffset;
        }
        else if(checkMainDirection(direction, 'left')) {
            left = anchor.left - popup.width - mainOffset;
        }
        else if(checkMainDirection(direction, 'right')) {
            left = anchor.left + anchor.width + mainOffset;
        }

        if(checkSecondaryDirection(direction, 'right')) {
            left = anchor.left + anchor.width - popup.width - secondaryOffset;
        }
        else if(checkSecondaryDirection(direction, 'left')) {
            left = anchor.left + secondaryOffset;
        }
        else if(checkSecondaryDirection(direction, 'bottom')) {
            top = anchor.top + anchor.height - popup.height - secondaryOffset;
        }
        else if(checkSecondaryDirection(direction, 'top')) {
            top = anchor.top + secondaryOffset;
        }
        else if(checkSecondaryDirection(direction, 'center')) {
            if(checkMainDirection(direction, 'top', 'bottom')) {
                left = anchor.left + anchor.width / 2 - popup.width / 2;
            }
            else if(checkMainDirection(direction, 'left', 'right')) {
                top = anchor.top + anchor.height / 2 - popup.height / 2;
            }
        }

        return {
            left,
            top,
            right : left + popup.width,
            bottom : top + popup.height
        };
    }

    _calcIsAnchorVisible() {
        const anchor = this._getAnchor();

        if(!(anchor instanceof Node)) {
            return true;
        }

        const len = this._scrollableAnchorParentDomNodes.length;

        if(len) {
            const { direction } = this.state,
                anchorDim = this._calcAnchorDimensions(),
                vertBorder = Math.floor(
                    checkMainDirection(direction, 'top') || checkSecondaryDirection(direction, 'top')?
                        anchorDim.top :
                        anchorDim.top + anchorDim.height),
                horizBorder = Math.floor(
                    checkMainDirection(direction, 'left') || checkSecondaryDirection(direction, 'left')?
                        anchorDim.left :
                        anchorDim.left + anchorDim.width),
                viewportRect = document.documentElement.getBoundingClientRect();
            let i = 0;

            while(i < len) {
                const scrollableRect = this._scrollableAnchorParentDomNodes[i++].getBoundingClientRect(),
                    left = Math.floor(scrollableRect.left - viewportRect.left),
                    top = Math.floor(scrollableRect.top - viewportRect.top),
                    { width, height } = scrollableRect;

                if(vertBorder < top || top + height < vertBorder || horizBorder < left || left + width < horizBorder) {
                    return false;
                }
            }
        }

        return true;
    }
}

Popup.defaultAttrs = {
    directions : DEFAULT_DIRECTIONS,
    mainOffset : 5,
    onHide : noOp,
    secondaryOffset : 0,
    viewportOffset : 10,
    visible : false,
    zIndexLevel : 0
};

class PopupContent extends Component {
    shouldUpdate(_, prevChildren) {
        return this.attrs.visible && this.children !== prevChildren;
    }

    onRender() {
        return <fragment>{ this.children }</fragment>;
    }
}

function checkMainDirection(direction, mainDirection1, mainDirection2) {
    return !direction.indexOf(mainDirection1) || (mainDirection2 && !direction.indexOf(mainDirection2));
}

function checkSecondaryDirection(direction, secondaryDirection) {
    return ~direction.indexOf('-' + secondaryDirection);
}
