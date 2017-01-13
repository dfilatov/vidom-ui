import { Component } from 'vidom';
import Button from '../Button';
import Popup from '../Popup';
import Menu, { MenuItemGroup } from '../Menu';
import Icon from '../Icon';
import bem from '../../utils/bem';
import keyCodes from '../../utils/keyCodes';
import noOp from '../../utils/noOp';

const b = bem('Select'),
    POPUP_DIRECTIONS = ['bottom-left', 'top-left'];

export default class Select extends Component {
    onInit() {
        this._buttonRef = null;

        this._onKeyDown = this._onKeyDown.bind(this);
        this._onButtonRef = this._onButtonRef.bind(this);
        this._onButtonClick = this._onButtonClick.bind(this);
        this._onButtonFocusChange = this._onButtonFocusChange.bind(this);
        this._onPopupHide = this._onPopupHide.bind(this);
        this._onMenuValueChange = this._onMenuValueChange.bind(this);
        this._onMenuItemClick = this._onMenuItemClick.bind(this);

        this.setState({
            buttonFocused : !!this.attrs.focused,
            menuFocused : false,
            opened : false
        });
    }

    onAttrsChange() {
        const {
            attrs : { focused, disabled },
            state : { buttonFocused, menuFocused, opened }
        } = this;

        if(typeof focused !== 'undefined') {
            if(focused) {
                if(!buttonFocused && !menuFocused) {
                    this.setState({ buttonFocused : true });
                }
            }
            else if(buttonFocused) {
                this.setState({ buttonFocused : false });
            }
            else if(menuFocused) {
                this.setState({ menuFocused : false });
            }
        }

        if(disabled && opened) {
            this.setState({ opened : false, menuFocused : false });
        }
    }

    onRender() {
        const {
                attrs : { theme, size, mode, disabled, width, value, renderText, placeholder },
                state : { menuFocused, buttonFocused, opened }
            } = this,
            resTheme = theme || this.context.theme,
            domAttrs = {
                className : b({ theme : resTheme, mode, size, opened, disabled, width })
            };

        if(buttonFocused) {
            domAttrs.onKeyDown = this._onKeyDown;
        }

        return (
            <div { ...domAttrs }>
                <Button
                    theme={ theme }
                    size={ size }
                    text={ renderText(this._getCheckedItem(), placeholder) }
                    afterIcon={ <Icon mix={ b('tick') }/> }
                    focused={ buttonFocused }
                    disabled={ disabled }
                    width={ width }
                    mix={ b('button') }
                    ref={ this._onButtonRef }
                    onClick={ this._onButtonClick }
                    onFocusChange={ this._onButtonFocusChange }
                />
                <Popup
                    theme={ theme }
                    visible={ opened }
                    autoclosable
                    onHide={ this._onPopupHide }
                    anchor={ () => this._buttonRef }
                    directions={ POPUP_DIRECTIONS  }
                    restrictHeight
                >
                    <Menu
                        mode={ mode }
                        theme={ theme }
                        size={ size }
                        mix={ b('menu') }
                        focused={ menuFocused }
                        disabled={ disabled }
                        value={ value }
                        onValueChange={ this._onMenuValueChange }
                        onItemClick={ this._onMenuItemClick }
                        onKeyDown={ this._onMenuKeyDown }
                    >
                        { this.children }
                    </Menu>
                </Popup>
            </div>
        );
    }

    onUpdate(prevAttrs, prevChildren, prevState) {
        const { opened, buttonFocused, menuFocused } = this.state;

        if(opened && !prevState.opened) {
            if(buttonFocused || !menuFocused) {
                this.setState({ buttonFocused : false, menuFocused : true });
            }
        }
    }

    _onButtonRef(ref) {
        this._buttonRef = ref;
    }

    _onKeyDown({ nativeEvent : { keyCode } }) {
        if(keyCode === keyCodes.UP || keyCode === keyCodes.DOWN) {
            this.setState({ opened : true });
        }
    }

    _onButtonClick() {
        this.setState({ opened : !this.state.opened });
    }

    _onButtonFocusChange(buttonFocused) {
        this.setState({ buttonFocused });
    }

    _onPopupHide({ reason }) {
        this.setState({
            opened : false,
            buttonFocused : reason !== 'outside-click',
            menuFocused : false
        });
    }

    _onMenuValueChange(value) {
        this.attrs.onValueChange(value);
    }

    _onMenuItemClick() {
        this.setState({
            opened : false,
            buttonFocused : true,
            menuFocused : false
        });
    }

    _onMenuKeyDown(e) {
        if(e.nativeEvent.keyCode === keyCodes.TAB) {
            e.preventDefault();
            e.stopPropagation();
        }
    }

    _getCheckedItem() {
        const {
                attrs : { value },
                children
            } = this,
            options = childrenToOptions(children);

        for(let i = 0, option; i < options.length; i++) {
            option = options[i];
            if(option._component === MenuItemGroup) {
                for(let j = 0, groupOptions = childrenToOptions(option.children); j < groupOptions.length; j++) {
                    if(groupOptions[j].attrs.value === value) {
                        return groupOptions[j];
                    }
                }
            }
            else if(option.attrs.value === value) {
                return option;
            }
        }

        return null;
    }
}

function childrenToOptions(children) {
    return children?
        Array.isArray(children)?
            children :
            [children] :
        [];
}

Select.defaultAttrs = {
    mode : 'radio',
    onFocusChange : noOp,
    onValueChange : noOp,
    placeholder : '—',
    renderText(item, placeholder) {
        return item? item.children : placeholder;
    }
};

