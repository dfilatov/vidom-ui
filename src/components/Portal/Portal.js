import { Component, mountSync, unmountSync } from 'vidom';

export default class Portal extends Component {
    onInit() {
        this._rootNode = null;
    }

    onMount() {
        document.body.appendChild(this._rootNode = document.createElement('div'));
        mountSync(this._rootNode, this.children, this.context);
    }

    onUpdate() {
        mountSync(this._rootNode, this.children, this.context);
    }

    onUnmount() {
        unmountSync(this._rootNode);
        document.body.removeChild(this._rootNode);
    }
}
