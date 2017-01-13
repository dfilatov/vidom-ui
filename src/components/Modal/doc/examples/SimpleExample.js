import { Component } from 'vidom';
import { Modal, Button } from 'vidom-components';
// import Button from '../../../Button';
// import Select from '../../Select';

// <Select
//     size="m"
//     mode="radio"
//     options={ [1, 2, 3, 4].map(i => ({ value : i, content : 'item-' + i })) }
//     value={ 2 }
// />

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
                    onClick={ () => { this.setState({ visible : !this.state.visible }); } }
                    text={ (visible? 'Close' : 'Open') + ' modal' }
                />
                <Modal
                    theme="islands"
                    visible={ visible }
                    autoclosable
                    onHide={ () => { this.setState({ visible : false }) } }
                >
                    <div style={ { padding : '50px' } }>
                        <Button theme="islands" size="m" text="test1"/>
                        <Button theme="islands" size="m" text="test2"/>
                        <Button theme="islands" size="m" text="test3"/>
                    </div>
                </Modal>
            </fragment>
        );
    }
}
