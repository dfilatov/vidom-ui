import { Component } from 'vidom';
import { Select, SelectOption } from 'vidom-components';

export default class RadioModeExample extends Component {
    onInit() {
        this.setState({ value : '2' });
    }

    onRender() {
        return (
            <Select
                theme="islands"
                size="m"
                value={ this.state.value }
                onValueChange={ value => { this.setState({ value }) } }
            >
                <SelectOption value="1">option-1</SelectOption>
                <SelectOption value="2">option-2</SelectOption>
                <SelectOption value="3">option-3</SelectOption>
                <SelectOption value="4">option-4</SelectOption>
            </Select>
        );
    }
}
