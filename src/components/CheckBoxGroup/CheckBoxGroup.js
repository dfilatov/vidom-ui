import { Component } from 'vidom';
import bem from '../../utils/bem';
import noOp from '../../utils/noOp';

const b = bem('CheckBoxGroup');

export default class CheckBoxGroup extends Component {
    onInit() {
        this._onCheckBoxChange = this._onCheckBoxChange.bind(this);
    }

    onRender() {
        const {
            attrs : { type, theme, size, name, value, disabled },
            children
        } = this;

        return (
            <span class={ b({ type, theme : theme || this.context.theme, size }) + ' ControlGroup' }>
                {
                    (Array.isArray(children)? children : [children]).map(child => {
                        const attrs = {
                            type,
                            theme,
                            size,
                            name,
                            checked : value.indexOf(child.attrs.value) > -1,
                            onCheckChange : this._onCheckBoxChange
                        };

                        if(disabled) {
                            attrs.disabled = disabled;
                        }

                        return child.clone().setAttrs(attrs);
                    })
                }
            </span>
        );
    }

    _onCheckBoxChange(checkBoxChecked, checkBoxValue) {
        const { value, onValueChange } = this.attrs;

        onValueChange(
            checkBoxChecked?
                value.concat(checkBoxValue) :
                value.filter(value => value !== checkBoxValue));
    }
}

CheckBoxGroup.defaultAttrs = {
    type : 'line',
    value : [],
    onValueChange : noOp
};
