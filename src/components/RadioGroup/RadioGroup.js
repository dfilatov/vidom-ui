import { Component } from 'vidom';
import Radio from '../Radio';
import bem from '../../utils/bem';
import noOp from '../../utils/noOp';

const b = bem('RadioGroup');

export default class RadioGroup extends Component {
    onInit() {
        this._onRadioChange = this._onRadioChange.bind(this);
    }

    onRender() {
        const {
            attrs : { mode, type, theme, size, name, value, disabled },
            children
        } = this;

        return (
            <span class={ b({ type, theme : theme || this.context.theme, size }) + ' ControlGroup' }>
                {
                    (Array.isArray(children)? children : [children]).map(child => {
                        const attrs = {
                            type,
                            mode,
                            theme,
                            size,
                            name,
                            checked : value === child.attrs.value,
                            onCheckChange : this._onRadioChange
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

    _onRadioChange(radioChecked, radioValue) {
        this.attrs.onValueChange(radioChecked? radioValue : null);
    }
}

RadioGroup.defaultAttrs = {
    type : 'line',
    onValueChange : noOp
};
