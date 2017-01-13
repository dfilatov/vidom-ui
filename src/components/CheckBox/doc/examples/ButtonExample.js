import { Component } from 'vidom';
import { CheckBox } from 'vidom-components';

export default class SimpleExample extends Component {
    onInit() {
        this.setState({ checked : false });
    }

    onRender() {
        const { checked } = this.state;

        return (
            <CheckBox
                type="button"
                theme="islands"
                size="m"
                checked={ checked }
                onCheckChange={ checked => this.setState({ checked }) }
                text="check me"
            />
        );
    }
}
