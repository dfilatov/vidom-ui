import { Component } from 'vidom';
import { Menu, MenuItem } from 'vidom-components';

export default class RadioModeExample extends Component {
    onInit() {
        this.setState({ value : '2' });
    }

    onRender() {
        return (
            <Menu
                theme="islands"
                size="m"
                mode="radio"
                value={ this.state.value }
                onValueChange={ value => { this.setState({ value }) } }
            >
                <MenuItem value="1">item-1</MenuItem>
                <MenuItem value="2">item-2</MenuItem>
                <MenuItem value="3">item-3</MenuItem>
                <MenuItem value="4">item-4</MenuItem>
            </Menu>
        );
    }
}
