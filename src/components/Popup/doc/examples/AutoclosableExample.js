import { Component } from 'vidom';
import { Popup, Button } from 'vidom-components';

export default function AutoclosableExample() {
    return (
        <AutoclosablePopup>
            <AutoclosablePopup>
                <AutoclosablePopup>popup content</AutoclosablePopup>
            </AutoclosablePopup>
        </AutoclosablePopup>
    );
}

class AutoclosablePopup extends Component {
    onInit() {
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
                    autoclosable
                    onHide={ () => { this.setState({ visible : false }); } }
                >
                    <div style={ { padding : '50px' } }>
                        { this.children }
                    </div>
                </Popup>
            </fragment>
        );
    }
}
