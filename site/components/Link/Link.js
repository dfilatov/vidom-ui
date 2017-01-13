import { goTo } from '../router';
import { Component } from 'vidom';
import { DocLink } from 'vidom-components/components/Doc';

export default class Link extends Component {
    onInit() {
        this._onClick = this._onClick.bind(this);
    }

    onRender() {
        return (
            <DocLink url={ this.attrs.url } onClick={ this._onClick }>
                { this.children }
            </DocLink>
        );
    }

    _onClick(e) {
        if(!e.nativeEvent.button) {
            const { url } = this.attrs;

            if(url[0] === '/') {
                e.preventDefault();
                goTo(url);
            }
        }
    }
}
