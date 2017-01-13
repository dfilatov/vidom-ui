import { Component } from 'vidom';
import { Select, SelectOptionGroup, SelectOption } from 'vidom-components';

export default class GroupExample extends Component {
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
                <SelectOptionGroup title="group-1">
                    <SelectOption value="1">option-1</SelectOption>
                    <SelectOption value="2">option-2</SelectOption>
                    <SelectOption value="3">option-3</SelectOption>
                    <SelectOption value="4">option-4</SelectOption>
                </SelectOptionGroup>
                <SelectOptionGroup title="group-2">
                    <SelectOption value="5">option-5</SelectOption>
                    <SelectOption value="6">option-6</SelectOption>
                    <SelectOption value="7">option-7</SelectOption>
                    <SelectOption value="8">option-8</SelectOption>
                </SelectOptionGroup>
            </Select>
        );
    }
}
