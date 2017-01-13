import { Component } from 'vidom';
import { DocComponent, DocTabs, DocTab, DocAttrs, DocAttr, DocExample, DocChildren, DocText, DocInlineCode } from '../../Doc';
import SimpleExample from './examples/SimpleExample';
import DisabledExample from './examples/DisabledExample';
import WidthAvailableExample from './examples/WidthAvailableExample';
import simpleExampleCode from '!raw!./examples/SimpleExample.js';
import disabledExampleCode from '!raw!./examples/DisabledExample.js';
import widthAvailableExampleCode from '!raw!./examples/WidthAvailableExample.js';

export default function TextInputDoc({ tab, onTabChange }) {
    return (
        <DocComponent title="TextInput">
            <DocTabs value={ tab } onTabChange={ onTabChange }>
                <DocTab title="Examples" value="Examples">
                    <DocExample title="Simple" code={ simpleExampleCode }>
                        <SimpleExample/>
                    </DocExample>
                    <DocExample title="Disabled" code={ disabledExampleCode }>
                        <DisabledExample/>
                    </DocExample>
                    <DocExample title="WidthAvailable" code={ widthAvailableExampleCode }>
                        <WidthAvailableExample/>
                    </DocExample>
                </DocTab>
                <DocTab title="API" value="api">
                    <DocAttrs>
                        <DocAttr name="disabled" type="Boolean" def="false">
                            Disables the input if set to <DocInlineCode>true</DocInlineCode>.
                        </DocAttr>
                        <DocAttr name="focused" type="Boolean" def="false">
                            Focuses the input if set to <DocInlineCode>true</DocInlineCode>.
                        </DocAttr>
                        <DocAttr name="hasClear" type="Boolean" def="false">
                            Adds the clear button if set to <DocInlineCode>true</DocInlineCode>.
                        </DocAttr>
                        <DocAttr name="maxLength" type="Number">
                            Limits the maximum length of the value.
                        </DocAttr>
                        <DocAttr name="name" type="String">
                            Sets the same html attribute of the input.
                        </DocAttr>
                        <DocAttr name="onFocusChange" type="Function">
                            The callback to handle focus and blur events.
                        </DocAttr>
                        <DocAttr name="onValueChange" type="Function">
                            The callback to handle value change event.
                        </DocAttr>
                        <DocAttr name="placeholder" type="String">
                            The placeholder displayed if the <DocInlineCode>value</DocInlineCode> is empty.
                        </DocAttr>
                        <DocAttr name="size" type="String" required>
                            Sets the input size.
                            <br/>
                            Possible values are <DocInlineCode>s</DocInlineCode>, <DocInlineCode>m</DocInlineCode>, <DocInlineCode>l</DocInlineCode> or <DocInlineCode>xl</DocInlineCode>.
                        </DocAttr>
                        <DocAttr name="theme" type="String" required>
                            Sets the input theme.
                        </DocAttr>
                        <DocAttr name="type" type="String">
                            Enables additional behaviour according to the passed value.
                            <br/>
                            Possible values are <DocInlineCode>password</DocInlineCode> or <DocInlineCode>search</DocInlineCode>.
                        </DocAttr>
                        <DocAttr name="value" type="String">
                            Current value.
                        </DocAttr>
                        <DocAttr name="width" type="String">
                            Fits the input width to its container if set to <DocInlineCode>available</DocInlineCode>.
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
