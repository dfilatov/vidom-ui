import { Component } from 'vidom';
import { Button } from 'vidom-components';

export default class DisabledExample extends Component {
    onRender() {
        return (
            <Button
                theme="islands"
                size="m"
                disabled
                text="I'm disabled"
            />
        );
    }
}
