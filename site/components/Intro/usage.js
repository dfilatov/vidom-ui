import { Button } from 'vidom-ui';
import { Component, mount } from 'vidom';

class App extends Component {
    onRender() {
        return (
            <div class="App">
                <Button
                    theme="islands"
                    size="m"
                    text="click me!"
                />
            </div>
        );
    }
}

mount(document.body, <App/>);

