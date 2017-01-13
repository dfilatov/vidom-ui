import { Component } from 'vidom';
import { Popup, Button } from 'vidom-components';

export default class InsideScrollableExample extends Component {
    onInit() {
        this._buttonRef = null;
        this._scrollableRef = null;

        this.setState({ visible : false });
    }

    onRender() {
        const { visible } = this.state;

        return (
            <div
                style={ { height : '200px', width: '300px', overflow : 'scroll', border : '1px solid #000' } }
                ref={ ref => { this._scrollableRef = ref; } }
            >
                <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
                <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
                <Button
                    theme="islands"
                    size="m"
                    onClick={ () => { this.setState({ visible : !this.state.visible }); } }
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
                <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
                <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
            </div>
        );
    }

    onMount() {
         this._scrollableRef.scrollTop = 150;
    }
}
