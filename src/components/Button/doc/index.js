import { Component } from 'vidom';
import { DocComponent, DocTabs, DocTab, DocAttrs, DocAttr, DocExample, DocChildren, DocText, DocInlineCode } from '../../Doc';
import SimpleExample from './examples/SimpleExample';
import ActionExample from './examples/ActionExample';
import IconExample from './examples/IconExample';
import LinkExample from './examples/LinkExample';
import DisabledExample from './examples/DisabledExample';
import simpleExampleCode from '!raw!./examples/SimpleExample.js';
import actionExampleCode from '!raw!./examples/ActionExample.js';
import iconExampleCode from '!raw!./examples/IconExample.js';
import linkExampleCode from '!raw!./examples/LinkExample.js';
import disabledExampleCode from '!raw!./examples/DisabledExample.js';

export default function ButtonDoc({ tab, onTabChange }) {
    return (
        <DocComponent title="Button">
            <DocTabs value={ tab } onTabChange={ onTabChange }>
                <DocTab title="Examples" value="Examples">
                    <DocExample title="Simple" code={ simpleExampleCode }>
                        <SimpleExample/>
                    </DocExample>
                    <DocExample title="Action" code={ actionExampleCode }>
                        <ActionExample/>
                    </DocExample>
                    <DocExample title="Icon" code={ iconExampleCode }>
                        <IconExample/>
                    </DocExample>
                    <DocExample title="Link" code={ linkExampleCode }>
                        <LinkExample/>
                    </DocExample>
                    <DocExample title="Disabled" code={ disabledExampleCode }>
                        <DisabledExample/>
                    </DocExample>
                </DocTab>
                <DocTab title="API" value="api">
                    <DocAttrs>
                        <DocAttr name="beforeIcon" type="VNode">
                            Adds the icon before the text.
                        </DocAttr>
                        <DocAttr name="disabled" type="Boolean" def="false">
                            Disables the button if set to true.
                        </DocAttr>
                        <DocAttr name="focused" type="Boolean" def="false">
                            Focuses the button if set to true.
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
                            Sets the button size.
                            <br/>
                            Possible values are <DocInlineCode>s</DocInlineCode>, <DocInlineCode>m</DocInlineCode>, <DocInlineCode>l</DocInlineCode> or <DocInlineCode>xl</DocInlineCode>.
                        </DocAttr>
                        <DocAttr name="target" type="String">
                            Sets the link target.
                            <br/>
                            It is used only if the <DocInlineCode>type</DocInlineCode> attribute is set to <DocInlineCode>link</DocInlineCode>.
                        </DocAttr>
                        <DocAttr name="text" type="String">
                            The text to display inside the button.
                        </DocAttr>
                        <DocAttr name="theme" type="String" required>
                            Sets the button theme.
                        </DocAttr>
                        <DocAttr name="title" type="String">
                            The title displayed as a tooltip.
                        </DocAttr>
                        <DocAttr name="type" type="String">
                            Enables additional behaviour according to the passed value.
                            <br/>
                            Possible values are <DocInlineCode>submit</DocInlineCode> or <DocInlineCode>link</DocInlineCode>.
                        </DocAttr>
                        <DocAttr name="view" type="String">
                            Enables additional appearance to the button.
                            <br/>
                            Possible values are <DocInlineCode>action</DocInlineCode> or <DocInlineCode>plain</DocInlineCode>.
                        </DocAttr>
                        <DocAttr name="url" type="String">
                            The URL to link to when the button is clicked.
                            <br/>
                            It is used only if the <DocInlineCode>type</DocInlineCode> attribute is set to <DocInlineCode>link</DocInlineCode>.
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
