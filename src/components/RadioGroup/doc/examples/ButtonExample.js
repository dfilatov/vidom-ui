import { Component } from 'vidom';
import { RadioGroup, Radio } from 'vidom-components';

export default class SimpleExample extends Component {
    onInit() {
        this.setState({ value : 1 });
    }

    onRender() {
        const { value } = this.state;

        return (
            <RadioGroup
                type="button"
                theme="islands"
                size="m"
                value={ value }
                onValueChange={ value => this.setState({ value }) }
            >
                <Radio text="item-1" value={ 1 }/>
                <Radio text="item-2" value={ 2 }/>
                <Radio text="item-3" value={ 3 }/>
                <Radio text="item-4" value={ 4 } disabled/>
            </RadioGroup>
        );
    }
}
