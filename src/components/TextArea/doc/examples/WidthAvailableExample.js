import { Component } from 'vidom';
import { TextArea } from 'vidom-components';

export default class WidthAvailableExample extends Component {
    onInit() {
        this.setState({ value : '' });
    }

    onRender() {
        const { value } = this.state;

        return (
            <TextArea
                theme="islands"
                size="m"
                width="available"
                value={ value }
                onValueChange={ value => this.setState({ value }) }
                placeholder="Fill me"
            />
        );
    }
}
