import { Component } from 'vidom';
import { Popup, Button } from 'vidom-components';

export default class SimpleExample extends Component {
    onInit() {
        this._buttonRef = null;

        this.setState({ visible : false });
    }

    onRender() {
        const { visible } = this.state;

        return (
            <fragment>
                <Button
                    theme="islands"
                    size="m"
                    onClick={ () => { this.setState({ visible : !visible }); } }
                    ref={ ref => { this._buttonRef = ref; } }
                    text={ (visible? 'Close' : 'Open') + ' popup' }
                />
                <Popup
                    theme="islands"
                    anchor={ () => this._buttonRef }
                    visible={ visible }
                >
                    <div style={ { padding : '50px' } }>
                        Popup content
                    </div>
                </Popup>
            </fragment>
        );
    }
}
