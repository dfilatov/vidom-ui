import { Component } from 'vidom';
import { DocComponent, DocTabs, DocTab, DocAttrs, DocAttr, DocExample, DocChildren, DocText, DocInlineCode } from '../../Doc';
import SimpleExample from './examples/SimpleExample';
import SizeExample from './examples/SizeExample';
import simpleExampleCode from '!raw!./examples/SimpleExample.js';
import sizeExampleCode from '!raw!./examples/SizeExample.js';

export default function SpinnerDoc({ tab, onTabChange }) {
    return (
        <DocComponent title="Spinner">
            <DocTabs value={ tab } onTabChange={ onTabChange }>
                <DocTab title="Examples" value="Examples">
                    <DocExample title="Simple" code={ simpleExampleCode }>
                        <SimpleExample/>
                    </DocExample>
                    <DocExample title="Size" code={ sizeExampleCode }>
                        <SizeExample/>
                    </DocExample>
                </DocTab>
                <DocTab title="API" value="api">
                    <DocAttrs>
                        <DocAttr name="mix" type="String">
                            Additional css class.
                        </DocAttr>
                        <DocAttr name="size" type="String" required>
                            Sets the spinner size.
                            <br/>
                            Possible values are <DocInlineCode>xs</DocInlineCode>, <DocInlineCode>s</DocInlineCode>, <DocInlineCode>m</DocInlineCode>, <DocInlineCode>l</DocInlineCode> or <DocInlineCode>xl</DocInlineCode>.
                        </DocAttr>
                        <DocAttr name="theme" type="String" required>
                            Sets the spinner theme.
                        </DocAttr>
                    </DocAttrs>
                    <DocChildren>
                        <DocText>
                            Children are not allowed and ignored.
                        </DocText>
                    </DocChildren>
                </DocTab>
            </DocTabs>
        </DocComponent>
    );
}
