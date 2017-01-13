import { Component } from 'vidom';
import { CheckBoxGroup, CheckBox } from 'vidom-components';

export default class SimpleExample extends Component {
    onInit() {
        this.setState({ value : [1, 3] });
    }

    onRender() {
        const { value } = this.state;

        return (
            <CheckBoxGroup
                type="button"
                theme="islands"
                size="m"
                value={ value }
                onValueChange={ value => this.setState({ value }) }
            >
                <CheckBox text="item-1" value={ 1 }/>
                <CheckBox text="item-2" value={ 2 }/>
                <CheckBox text="item-3" value={ 3 }/>
                <CheckBox text="item-4" value={ 4 } disabled/>
            </CheckBoxGroup>
        );
    }
}
