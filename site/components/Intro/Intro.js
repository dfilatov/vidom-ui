import { DocPage, DocHeader, DocText, DocCode, DocList, DocListItem } from 'vidom-components/components/Doc';
import Link from '../Link';
import { routes } from '../router';
import usageCode from '!raw!./usage.js';

export default function Intro() {
    return (
        <DocPage>
            <DocHeader level="2">What is it?</DocHeader>
                <DocText>A set of basic visual components are built with <Link url="https://github.com/dfilatov/vidom">Vidom</Link>.</DocText>
            <DocHeader level="2">Which components are included?</DocHeader>
            <DocList>
            {
                Object.keys(routes)
                    .filter(name => name !== 'Intro')
                    .sort()
                    .map(name =>
                        <DocListItem>
                            <Link url={ routes[name].build() }>{ name }</Link>
                        </DocListItem>
                    )
            }
            </DocList>
            <DocHeader level="2">How to install it?</DocHeader>
            <DocText>Use npm:</DocText>
            <DocCode>npm install --save vidom-ui</DocCode>
            <DocHeader level="2">How to use it?</DocHeader>
            <DocCode lang="jsx">
                { usageCode }
            </DocCode>
            <DocText>Also basic css should be included in your runtime:</DocText>
            <DocCode>@import 'vidom-ui/index.css';</DocCode>
            <DocText>Vidom UI is bundled with <Link url="https://www.yandex.com/">Yandex</Link>'s islands theme. To use it just include additional css:</DocText>
            <DocCode>@import 'vidom-ui/islands.css';</DocCode>
        </DocPage>
    );
}
