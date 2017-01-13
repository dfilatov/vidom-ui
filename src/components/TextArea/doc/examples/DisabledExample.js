import { Component } from 'vidom';
import { TextArea } from 'vidom-components';

export default class DisabledExample extends Component {
    onRender() {
        return (
            <TextArea
                theme="islands"
                size="m"
                disabled
                value="I'm disabled"
            />
        );
    }
}
