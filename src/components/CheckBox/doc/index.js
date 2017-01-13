import { Component } from 'vidom';
import { DocComponent, DocTabs, DocTab, DocAttrs, DocAttr, DocExample, DocChildren, DocText, DocInlineCode } from '../../Doc';
import SimpleExample from './examples/SimpleExample';
import ButtonExample from './examples/ButtonExample';
import simpleExampleCode from '!raw!./examples/SimpleExample.js';
import buttonExampleCode from '!raw!./examples/ButtonExample.js';

export default function CheckBoxDoc({ tab, onTabChange }) {
    return (
        <DocComponent title="CheckBox">
            <DocTabs value={ tab } onTabChange={ onTabChange }>
                <DocTab title="Examples" value="Examples">
                    <DocExample title="Simple" code={ simpleExampleCode }>
                        <SimpleExample/>
                    </DocExample>
                    <DocExample title="Button" code={ buttonExampleCode }>
                        <ButtonExample/>
                    </DocExample>
                </DocTab>
                <DocTab title="API" value="api">
                    <DocAttrs>
                        <DocAttr name="checked" type="Boolean" def="false">
                            Checks the checkbox if set to <DocInlineCode>true</DocInlineCode>.
                        </DocAttr>
                        <DocAttr name="disabled" type="Boolean" def="false">
                            Disables the checkbox if set to <DocInlineCode>true</DocInlineCode>.
                        </DocAttr>
                        <DocAttr name="focused" type="Boolean" def="false">
                            Focuses the checkbox if set to <DocInlineCode>true</DocInlineCode>.
                        </DocAttr>
                        <DocAttr name="name" type="String">
                            Sets the same html attribute of the checkbox.
                        </DocAttr>
                        <DocAttr name="onCheckChange" type="Function">
                            The callback to handle checked change event.
                        </DocAttr>
                        <DocAttr name="onFocusChange" type="Function">
                            The callback to handle focus and blur events.
                        </DocAttr>
                        <DocAttr name="size" type="String" required>
                            Sets the checkbox size.
                            <br/>
                            Possible values are <DocInlineCode>s</DocInlineCode>, <DocInlineCode>m</DocInlineCode>, <DocInlineCode>l</DocInlineCode> or <DocInlineCode>xl</DocInlineCode> if <DocInlineCode>type</DocInlineCode> attribute is set to <DocInlineCode>button</DocInlineCode> and <DocInlineCode>m</DocInlineCode>, <DocInlineCode>l</DocInlineCode> for other ones.
                        </DocAttr>
                        <DocAttr name="text" type="String">
                            The text to display for the checkbox.
                        </DocAttr>
                        <DocAttr name="theme" type="String" required>
                            Sets the checkbox theme.
                        </DocAttr>
                        <DocAttr name="title" type="String">
                            The title displayed as a tooltip.
                        </DocAttr>
                        <DocAttr name="type" type="String">
                            Enables additional behaviour if passed.
                            <br/>
                            The only supported value is <DocInlineCode>button</DocInlineCode>.
                        </DocAttr>
                        <DocAttr name="value" type="String">
                            The value of the checkbox.
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
