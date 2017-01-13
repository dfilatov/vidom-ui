import { Component } from 'vidom';
import { TextArea } from 'vidom-components';

export default class SimpleExample extends Component {
    onInit() {
        this.setState({ value : '' });
    }

    onRender() {
        const { value } = this.state;

        return (
            <TextArea
                theme="islands"
                size="m"
                value={ value }
                onChange={ value => this.setState({ value }) }
                placeholder="Fill me"
            />
        );
    }
}
