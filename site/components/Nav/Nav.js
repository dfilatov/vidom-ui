import { Component } from 'vidom';
import bem from 'vidom-components/utils/bem';
import { routes, getCurrentUrl } from '../router';
import Link from '../Link';

const b = bem('Nav'),
    names = Object.keys(routes)
        .filter(name => name !== 'Intro')
        .sort();

export default class Nav extends Component {
    onInit() {
        this._onToggleClick = this._onToggleClick.bind(this);
        this.setState({
            visibleOnSmallScreen : false
        });
    }

    onRender() {
        return (
            <nav class={ b({ visibleOnSmallScreen : this.state.visibleOnSmallScreen }) } onClick={ this._onToggleClick }>
                <span class={ b('toggle') }></span>
                <ul class={ b('list') }>
                    {
                        names.map(name => {
                            const route = routes[name],
                                selected = !!route.match(getCurrentUrl());

                            return (
                                <li class={ b('item', { selected }) }>
                                    {
                                        selected?
                                            name :
                                            <Link url={ route.build() }>
                                                { name }
                                            </Link>
                                    }
                                </li>
                            );
                        })
                    }
                </ul>
            </nav>
        );
    }

    _onToggleClick() {
        this.setState({ visibleOnSmallScreen : !this.state.visibleOnSmallScreen });
    }
}
