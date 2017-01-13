import { Component } from 'vidom';
import { DocComponent, DocTabs, DocTab, DocAttrs, DocAttr, DocExample, DocChildren, DocText, DocInlineCode } from '../../Doc';
import RadioModeExample from './examples/RadioModeExample';
import RadioCheckModeExample from './examples/RadioCheckModeExample';
import GroupExample from './examples/GroupExample';
import DisabledExample from './examples/DisabledExample';
import radioModeExampleCode from '!raw!./examples/RadioModeExample.js';
import radioCheckModeExampleCode from '!raw!./examples/radioCheckModeExample.js';
import groupExampleCode from '!raw!./examples/GroupExample.js';
import disabledExampleCode from '!raw!./examples/DisabledExample.js';

export default function SelectDoc({ tab, onTabChange }) {
    return (
        <DocComponent title="Select">
            <DocTabs value={ tab } onTabChange={ onTabChange }>
                <DocTab title="Examples" value="Examples">
                    <DocExample title="RadioMode" code={ radioModeExampleCode }>
                        <RadioModeExample/>
                    </DocExample>
                    <DocExample title="RadioCheckMode" code={ radioCheckModeExampleCode }>
                        <RadioCheckModeExample/>
                    </DocExample>
                    <DocExample title="Group" code={ groupExampleCode }>
                        <GroupExample/>
                    </DocExample>
                    <DocExample title="Disabled" code={ disabledExampleCode }>
                        <DisabledExample/>
                    </DocExample>
                </DocTab>
                <DocTab title="API" value="api">
                    <DocAttrs>
                        <DocAttr name="disabled" type="Boolean" def="false">
                            Disables all the select options if set to <DocInlineCode>true</DocInlineCode>.
                        </DocAttr>
                        <DocAttr name="focused" type="Boolean" def="false">
                            Focuses the select if set to <DocInlineCode>true</DocInlineCode>.
                        </DocAttr>
                        <DocAttr name="mode" type="String" def="radio">
                            Possible values are <DocInlineCode>radio</DocInlineCode>, <DocInlineCode>radioCheck</DocInlineCode>.
                        </DocAttr>
                        <DocAttr name="onFocusChange" type="Function">
                            The callback to handle focus and blur events.
                        </DocAttr>
                        <DocAttr name="onValueChange" type="Function">
                            The callback to handle value change event.
                        </DocAttr>
                        <DocAttr name="placeholder" type="String" def="—">
                            The displayed text if no any option is selected.
                        </DocAttr>
                        <DocAttr name="renderText" type="Function">
                            The callback to render text for inner button.
                            <br/>
                            By default the children of the selected option or <DocInlineCode>placeholder</DocInlineCode> (if there is no selected option) is rendered
                        </DocAttr>
                        <DocAttr name="size" type="String" required>
                            Sets the select size.
                            <br/>
                            Possible values are <DocInlineCode>s</DocInlineCode>, <DocInlineCode>m</DocInlineCode>, <DocInlineCode>l</DocInlineCode> or <DocInlineCode>xl</DocInlineCode>.
                        </DocAttr>
                        <DocAttr name="theme" type="String" required>
                            Sets the select theme.
                        </DocAttr>
                        <DocAttr name="value" type="String">
                            Current value.
                        </DocAttr>
                    </DocAttrs>
                    <DocChildren>
                        <DocText>
                            Each child is expected to be either a <DocInlineCode>&lt;SelectOption/&gt;</DocInlineCode> or a <DocInlineCode>&lt;SelectOptionGroup/&gt;</DocInlineCode>.
                        </DocText>
                    </DocChildren>
                </DocTab>
            </DocTabs>
        </DocComponent>
    );
}
