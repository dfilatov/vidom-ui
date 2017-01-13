import { Component } from 'vidom';
import { TextInput } from 'vidom-components';

export default class DisabledExample extends Component {
    onRender() {
        return (
            <TextInput
                theme="islands"
                size="m"
                value="I'm disabled"
                disabled
            />
        );
    }
}
