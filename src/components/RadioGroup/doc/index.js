import { Component } from 'vidom';
import { DocComponent, DocTabs, DocTab, DocAttrs, DocAttr, DocExample, DocChildren, DocText, DocInlineCode } from '../../Doc';
import SimpleExample from './examples/SimpleExample';
import ButtonExample from './examples/ButtonExample';
import simpleExampleCode from '!raw!./examples/SimpleExample.js';
import buttonExampleCode from '!raw!./examples/ButtonExample.js';

export default function RadioGroupDoc({ tab, onTabChange }) {
    return (
        <DocComponent title="RadioGroup">
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
                        <DocAttr name="disabled" type="Boolean" def="false">
                            Disables all the items if set to <DocInlineCode>true</DocInlineCode>.
                        </DocAttr>
                        <DocAttr name="name" type="String">
                            Sets the same attribute for the child checkboxes.
                        </DocAttr>
                        <DocAttr name="onValueChange" type="Function">
                            The callback to handle value change event.
                        </DocAttr>
                        <DocAttr name="size" type="String" required>
                            Sets the size for the child checkboxes.
                            <br/>
                            Possible values are <DocInlineCode>s</DocInlineCode>, <DocInlineCode>m</DocInlineCode>, <DocInlineCode>l</DocInlineCode> or <DocInlineCode>xl</DocInlineCode> if <DocInlineCode>type</DocInlineCode> attribute is set to <DocInlineCode>button</DocInlineCode> and <DocInlineCode>m</DocInlineCode>, <DocInlineCode>l</DocInlineCode> for other ones.
                        </DocAttr>
                        <DocAttr name="theme" type="String" required>
                            Sets the theme for the child radios.
                        </DocAttr>
                        <DocAttr name="type" type="String">
                            Sets the same attribute for the child radios.
                            <br/>
                            The only supported value is <DocInlineCode>button</DocInlineCode>.
                        </DocAttr>
                        <DocAttr name="value" type="String">
                            Current value.
                        </DocAttr>
                    </DocAttrs>
                    <DocChildren>
                        <DocText>
                            Each child is expected to be a <DocInlineCode>&lt;Radio/&gt;</DocInlineCode>.
                            Following attributes of <DocInlineCode>&lt;Radio/&gt;</DocInlineCode> are filled automatically by <DocInlineCode>&lt;RadioGroup/&gt;</DocInlineCode>: <DocInlineCode>checked</DocInlineCode>, <DocInlineCode>name</DocInlineCode>, <DocInlineCode>size</DocInlineCode>, <DocInlineCode>theme</DocInlineCode>, <DocInlineCode>type</DocInlineCode>.
                        </DocText>
                    </DocChildren>
                </DocTab>
            </DocTabs>
        </DocComponent>
    );
}
