import { Component } from 'vidom';
import { Modal, Button } from 'vidom-components';

export default class SimpleExample extends Component {
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
                    onClick={ () => { this.setState({ visible : true }); } }
                    text={ (visible? 'Close' : 'Open') + ' modal' }
                />
                <Modal
                    theme="islands"
                    visible={ visible }
                    autoclosable
                    onHide={ () => { this.setState({ visible : false }) } }
                >
                    <div style={ { padding : '50px' } }>
                        <div style={ { width : '200px', marginBottom : '10px' } }>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </div>
                        <Button
                            theme="islands"
                            size="m"
                            onClick={ () => { this.setState({ visible : false }); } }
                            text="Close me"
                        />
                    </div>
                </Modal>
            </fragment>
        );
    }
}
