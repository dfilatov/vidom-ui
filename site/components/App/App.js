import { Component } from 'vidom';
import router, { routes, onStateChange, getCurrentUrl, goTo } from '../router';
import Nav from '../Nav';
import Link from '../Link';
import bem from 'vidom-components/utils/bem';
import packageJsonCode from '!raw!../../../package.json';

const b = bem('App'),
    { version } = JSON.parse(packageJsonCode);

export default class App extends Component {
    onInit() {
        this._onTabChange = this._onTabChange.bind(this);

        this.setState({ route : findRoute() });
        onStateChange(() => {
            this.setState({ route : findRoute() });
        });
    }

    onRender() {
        const [route, { tab }] = this.state.route,
            RouteComponent = route.getData().Component,
            introUrl = routes.Intro.build();

        return (
            <div class={ b() }>
                <div class={ b('bar') }>
                    <div class={ b('header') }>
                        { getCurrentUrl() === introUrl?
                            'Vidom UI' :
                            <Link url={ introUrl }>Vidom UI</Link>
                        }
                        &#160;
                        <span class={ b('version') }>v{ version }</span>
                    </div>
                </div>
                <div class={ b('main') }>
                    <Nav/>
                    <div class={ b('content') }>
                        <RouteComponent tab={ tab } onTabChange={ this._onTabChange }/>
                    </div>
                </div>
                <div class={ b('footer') }>
                    <a href="https://github.com/dfilatov/vidom-ui" class={ b('github-link') }>
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" version="1.1" viewBox="0 0 16 16" width="16">
                            <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                        </svg>
                        &#160;
                        github
                    </a>
                </div>
            </div>
        );
    }

    _onTabChange(tab) {
        goTo(this.state.route[0].build({ tab }));
    }
}

function findRoute() {
    return router.findFirst(getCurrentUrl());
}
