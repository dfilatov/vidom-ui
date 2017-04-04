import { Component } from 'vidom';
import MenuItemGroup from './MenuItemGroup';
import Focusable from '../Focusable';
import keyCodes from '../../utils/keyCodes';
import bem from '../../utils/bem';
import noOp from '../../utils/noOp';

const b = bem('Menu');

export default class Menu extends Component {
    onInit() {
        this._menuDomNode = null;
        this._hoveredItemInstance = null;
        this._scrollToHoveredItem = false;

        this._onMenuRef = this._onMenuRef.bind(this);
        this._onHoveredItemRef = this._onHoveredItemRef.bind(this);
        this._onItemHoverChange = this._onItemHoverChange.bind(this);
        this._onItemClick = this._onItemClick.bind(this);
        this._onFocus = this._onFocus.bind(this);
        this._onBlur = this._onBlur.bind(this);
        this._onKeyDown = this._onKeyDown.bind(this);

        const { focused } = this.attrs;

        this.setState({
            focused,
            hoveredIdx : focused? 0 : null,
            lastHoveredIdx : null
        });
    }

    onAttrsReceive() {
        const { focused } = this.attrs;

        if(typeof focused !== 'undefined' && focused !== this.state.focused) {
            if(focused) {
                this._hoverItemOnFocus();
            }

            this.setState({ focused });
        }
    }

    onRender() {
        const { theme, size, mix, mode, disabled } = this.attrs,
            resTheme = theme || this.context.theme,
            { focused } = this.state,
            domAttrs = { className : b({ theme : resTheme, mode, size, focused, disabled }) },
            focusableAttrs = {};

        if(mix) {
            domAttrs.className += ' ' + mix;
        }

        if(disabled) {
            domAttrs['aria-disabled'] = 'true';
        }
        else {
            domAttrs.tabIndex = 0;
            focusableAttrs.focused = focused;
            focusableAttrs.onFocus = this._onFocus;
            focusableAttrs.onBlur = this._onBlur;

            if(focused) {
                domAttrs.onKeyDown = this._onKeyDown;
            }
        }

        let idx = 0;

        return (
            <Focusable { ...focusableAttrs }>
                <div
                    { ...domAttrs }
                    ref={ this._onMenuRef }
                >
                    {
                        childrenToItems(this.children).map(child => {
                            let res;

                            if(isItemGroup(child)) {
                                res = this._renderGroup(child, idx, resTheme);
                                idx += childrenToItems(child.children).length;
                            }
                            else {
                                res = this._renderItem(child, idx++, resTheme);
                            }

                            return res;
                        })
                    }
                </div>
            </Focusable>
        );
    }

    onUpdate() {
        if(this._scrollToHoveredItem) {
            this._scrollToHoveredItem = false;

            const menuRect = this._menuDomNode.getBoundingClientRect(),
                hoveredItemRect = this._hoveredItemInstance.getDomNode().getBoundingClientRect();

            if(hoveredItemRect.top < menuRect.top) {
                this._menuDomNode.scrollTop += hoveredItemRect.top - menuRect.top;
            }
            else if(hoveredItemRect.bottom > menuRect.bottom) {
                this._menuDomNode.scrollTop += hoveredItemRect.bottom - menuRect.bottom;
            }
        }
    }

    _renderGroup(group, idx, theme) {
        return group
            .clone()
            .setChildren(childrenToItems(group.children).map(item => this._renderItem(item, idx++, theme)));
    }

    _renderItem(item, idx, theme) {
        const { size, mode, disabled } = this.attrs,
            { hoveredIdx } = this.state,
            hovered = hoveredIdx === idx,
            itemAttrs = {
                theme,
                size,
                hovered,
                idx,
                onHoverChange : this._onItemHoverChange,
                onClick : this._onItemClick
            };

        if(mode) {
            itemAttrs.checked = this._isItemChecked(item);
        }

        if(disabled) {
            itemAttrs.disabled = true;
        }

        return item
            .clone()
            .setAttrs(itemAttrs)
            .setRef(hovered? this._onHoveredItemRef : null);
    }

    _onMenuRef(domNode) {
        this._menuDomNode = domNode;
    }

    _onHoveredItemRef(item) {
        if(item) {
            this._hoveredItemInstance = item;
        }
    }

    _onItemHoverChange(hovered, idx) {
        this.setState({ hoveredIdx : hovered? idx : null })
    }

    _onItemClick(itemValue) {
        const { onItemClick, onValueChange, mode, value } = this.attrs;

        switch(mode) {
            case 'radio':
                if(value !== itemValue) {
                    onValueChange(itemValue);
                }
                break;

            case 'radioCheck':
                onValueChange(value === itemValue? null : itemValue);
                break;

            case 'check':
                onValueChange(value.indexOf(itemValue) > -1?
                    value.filter(value => value !== itemValue) :
                    value.concat(itemValue));
                break;
        }

        onItemClick(itemValue);
    }

    _onFocus() {
        this.attrs.onFocusChange(true);
        this._hoverItemOnFocus();
        this.setState({ focused : true });
    }

    _onBlur() {
        this.attrs.onFocusChange(false);
        this.setState({
            focused : false,
            hoveredIdx : null,
            lastHoveredIdx : this.state.hoveredIdx
        });
    }

    _onKeyDown(e) {
        const { hoveredIdx } = this.state;

        switch(e.nativeEvent.keyCode) {
            case keyCodes.UP:
                e.preventDefault();
                if(hoveredIdx !== null) {
                    this._hoverNextItem(-1);
                }
                break;

            case keyCodes.DOWN:
                e.preventDefault();
                if(hoveredIdx !== null) {
                    this._hoverNextItem(1);
                }
                break;

            case keyCodes.SPACE:
            case keyCodes.ENTER:
                e.preventDefault();
                if(hoveredIdx !== null) {
                    this._onItemClick(this._getChildByIdx(hoveredIdx).attrs.value);
                }
                break;
        }

        this.attrs.onKeyDown(e);
    }

    _getChildByIdx(idx) {
        const items = childrenToItems(this.children);

        for(let i = 0, childIdx = 0, item; i < items.length; i++) {
            item = items[i];
            if(isItemGroup(item)) {
                const groupItems = childrenToItems(item.children);

                if(idx < childIdx + groupItems.length) {
                    return groupItems[idx - childIdx];
                }

                childIdx += groupItems.length;
            }
            else if(idx === childIdx++) {
                return item;
            }
        }
    }

    _hoverNextItem(dir) {
        const { hoveredIdx } = this.state,
            itemsLen = this._calcItemsLen(),
            nextHoveredIdx = hoveredIdx === null?
                dir > 0? 0 : itemsLen - 1 :
                hoveredIdx + dir >= 0 && hoveredIdx + dir < itemsLen?
                    hoveredIdx + dir :
                    hoveredIdx;

        if(nextHoveredIdx !== hoveredIdx) {
            const childAttrs = this._getChildByIdx(nextHoveredIdx).attrs;

            if(childAttrs && childAttrs.disabled) {
                this._hoverNextItem(dir > 0? dir + 1 : dir - 1);
            }
            else {
                this._scrollToHoveredItem = true;
                this.setState({ hoveredIdx : nextHoveredIdx });
            }
        }
    }

    _hoverItemOnFocus() {
        const { hoveredIdx, lastHoveredIdx } = this.state;

        this._scrollToHoveredItem = true;

        if(hoveredIdx === null) {
            this.setState({
                hoveredIdx : lastHoveredIdx === null?
                    this.attrs.mode && this._calcFirstCheckedItemIdx() || 0 :
                    lastHoveredIdx
            });
        }
    }

    _calcItemsLen() {
        return childrenToItems(this.children).reduce(
            (res, child) => res + (isItemGroup(child)? childrenToItems(child.children).length : 1),
            0);
    }

    _calcFirstCheckedItemIdx() {
        const items = childrenToItems(this.children);

        for(let i = 0, childIdx = 0, item; i < items.length; i++) {
            item = items[i];
            if(isItemGroup(item)) {
                const groupItems = childrenToItems(item.children);

                for(let j = 0; j < groupItems.length; j++) {
                    if(this._isItemChecked(groupItems[j])) {
                        return childIdx + j;
                    }
                }

                childIdx += groupItems.length;
            }
            else {
                if(this._isItemChecked(item)) {
                    return childIdx;
                }

                childIdx++;
            }
        }

        return null;
    }

    _isItemChecked(item) {
        const { mode, value } = this.attrs,
            itemValue = item.attrs.value;

        return mode === 'check'?
            value.indexOf(itemValue) > -1 :
            value === itemValue;
    }
}

function isItemGroup(item) {
    return item._component === MenuItemGroup;
}

function childrenToItems(children) {
    return children?
        Array.isArray(children)?
            children :
            [children] :
        [];
}

Menu.defaultAttrs = {
    onItemClick : noOp,
    onValueChange : noOp,
    onFocusChange : noOp,
    onKeyDown : noOp
};
