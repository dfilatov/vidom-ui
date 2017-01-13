import { Component } from 'vidom';
import { Button, Icon } from 'vidom-components';

export default class IconExample extends Component {
    onInit() {
        this.setState({ text : 'Click me' });
    }

    onRender() {
        const { text } = this.state,
            icon = (
                <Icon>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                        <path d="M1 13v2h14v-2H1zm13-7h-3V1H5v5.03L2 6l6 6 6-6z"/>
                    </svg>
                </Icon>
            );

        return (
            <Button
                theme="islands"
                size="m"
                onClick={ () => this.setState({ text : 'I\'m clicked' }) }
                beforeIcon={ icon }
                text={ text }
            />
        );
    }
}
