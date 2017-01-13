import { Component } from 'vidom';
import DocCode from './DocCode';
import bem from '../../utils/bem';

const b = bem('DocExample');

export default class DocExample extends Component {
    onInit() {
        this._onCodeToggleClick = this._onCodeToggleClick.bind(this);

        this.setState({ codeShown : false });
    }

    onRender() {
        const { title, code } = this.attrs,
            { codeShown } = this.state;

        return (
            <div class={ b() }>
                <h3 class={ b('title') }>
                    { title }
                    <span
                        class={ b('code-toggle') }
                        onClick={ this._onCodeToggleClick }
                        title={ (codeShown? 'hide' : 'show') + ' code' }
                    >
                        &lt;/&gt;
                    </span>
                </h3>
                <div class={ b('code', { shown : codeShown }) }>
                    { codeShown? <DocCode lang="jsx">{ code }</DocCode> : null  }
                </div>
                <div class={ b('content') }>{ this.children }</div>
            </div>
        );
    }

    _onCodeToggleClick() {
        this.setState({ codeShown : !this.state.codeShown });
    }
}
