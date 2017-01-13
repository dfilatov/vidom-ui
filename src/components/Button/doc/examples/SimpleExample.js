import { Component } from 'vidom';
import { Button } from 'vidom-components';

export default class SimpleExample extends Component {
    onInit() {
        this.setState({ text : 'Click me' });
    }

    onRender() {
        const { text } = this.state;

        return (
            <Button
                theme="islands"
                size="m"
                onClick={ () => this.setState({ text : 'I\'m clicked' }) }
                text={ text }
            />
        );
    }
}
