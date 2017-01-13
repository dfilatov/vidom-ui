import { Component } from 'vidom';
import { DocComponent, DocTabs, DocTab, DocAttrs, DocAttr, DocExample, DocChildren, DocText, DocInlineCode } from '../../Doc';
import SimpleExample from './examples/SimpleExample';
import PseudoExample from './examples/PseudoExample';
import ExternalExample from './examples/ExternalExample';
import DisabledExample from './examples/DisabledExample';
import simpleExampleCode from '!raw!./examples/SimpleExample.js';
import externalExampleCode from '!raw!./examples/ExternalExample.js';
import pseudoExampleCode from '!raw!./examples/PseudoExample.js';
import disabledExampleCode from '!raw!./examples/DisabledExample.js';

export default function LinkDoc({ tab, onTabChange }) {
    return (
        <DocComponent title="Link">
            <DocTabs value={ tab } onTabChange={ onTabChange }>
                <DocTab title="Examples" value="Examples">
                    <DocExample title="Simple" code={ simpleExampleCode }>
                        <SimpleExample/>
                    </DocExample>
                    <DocExample title="External" code={ externalExampleCode }>
                        <ExternalExample/>
                    </DocExample>
                    <DocExample title="Pseudo" code={ pseudoExampleCode }>
                        <PseudoExample/>
                    </DocExample>
                    <DocExample title="Disabled" code={ disabledExampleCode }>
                        <DisabledExample/>
                    </DocExample>
                </DocTab>
                <DocTab title="API" value="api">
                    <DocAttrs>
                        <DocAttr name="disabled" type="Boolean" def="false">
                            Disables the link if set to true.
                        </DocAttr>
                        <DocAttr name="focused" type="Boolean" def="false">
                            Focuses the link if set to true.
                        </DocAttr>
                        <DocAttr name="mix" type="String">
                            Additional css class.
                        </DocAttr>
                        <DocAttr name="onClick" type="Function">
                            The callback to handle click event.
                        </DocAttr>
                        <DocAttr name="onFocusChange" type="Function">
                            The callback to handle focus and blur events.
                        </DocAttr>
                        <DocAttr name="size" type="String" required>
                            Sets the link size.
                            <br/>
                            Possible values are <DocInlineCode>s</DocInlineCode>, <DocInlineCode>m</DocInlineCode>, <DocInlineCode>l</DocInlineCode> or <DocInlineCode>xl</DocInlineCode>.
                        </DocAttr>
                        <DocAttr name="target" type="String">
                            Sets the link target.
                        </DocAttr>
                        <DocAttr name="theme" type="String" required>
                            Sets the link theme.
                        </DocAttr>
                        <DocAttr name="title" type="String">
                            The title displayed as a tooltip.
                        </DocAttr>
                        <DocAttr name="view" type="String">
                            Enables additional appearance to the link.
                            <br/>
                            Possible values are <DocInlineCode>action</DocInlineCode> or <DocInlineCode>plain</DocInlineCode>.
                        </DocAttr>
                        <DocAttr name="url" type="String">
                            The URL to link to when the link is clicked.
                        </DocAttr>
                    </DocAttrs>
                    <DocChildren>
                        <DocText>
                            Children with any valid type are allowed.
                        </DocText>
                    </DocChildren>
                </DocTab>
            </DocTabs>
        </DocComponent>
    );
}
