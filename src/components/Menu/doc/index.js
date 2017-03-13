import { Component } from 'vidom';
import { DocComponent, DocTabs, DocTab, DocAttrs, DocAttr, DocExample, DocChildren, DocText, DocInlineCode } from '../../Doc';
import SimpleExample from './examples/SimpleExample';
import GroupExample from './examples/GroupExample';
import RadioModeExample from './examples/RadioModeExample';
import CheckModeExample from './examples/CheckModeExample';
import RadioCheckModeExample from './examples/RadioCheckModeExample';
import simpleExampleCode from '!raw!./examples/SimpleExample.js';
import groupExampleCode from '!raw!./examples/GroupExample.js';
import radioModeExampleCode from '!raw!./examples/RadioModeExample.js';
import checkModeExampleCode from '!raw!./examples/CheckModeExample.js';
import radioCheckModeExampleCode from '!raw!./examples/RadioCheckModeExample.js';

export default function MenuDoc({ tab, onTabChange }) {
    return (
        <DocComponent title="Menu">
            <DocTabs value={ tab } onTabChange={ onTabChange }>
                <DocTab title="Examples" value="Examples">
                    <DocExample title="Simple" code={ simpleExampleCode }>
                        <SimpleExample/>
                    </DocExample>
                    <DocExample title="Group" code={ groupExampleCode }>
                        <GroupExample/>
                    </DocExample>
                    <DocExample title="RadioMode" code={ radioModeExampleCode }>
                        <RadioModeExample/>
                    </DocExample>
                    <DocExample title="CheckMode" code={ checkModeExampleCode }>
                        <CheckModeExample/>
                    </DocExample>
                    <DocExample title="RadioCheckMode" code={ radioCheckModeExampleCode }>
                        <RadioCheckModeExample/>
                    </DocExample>
                </DocTab>
                <DocTab title="API" value="api">
                    <DocAttrs>
                        <DocAttr name="disabled" type="Boolean" def="false">
                            Disables all the menu items if set to <DocInlineCode>true</DocInlineCode>.
                        </DocAttr>
                        <DocAttr name="mode" type="String">
                            Enables the menu to have a value and menu items to be selected.
                            <br/>
                            Possible values are <DocInlineCode>radio</DocInlineCode>, <DocInlineCode>radioCheck</DocInlineCode> or <DocInlineCode>check</DocInlineCode>.
                        </DocAttr>
                        <DocAttr name="onFocusChange" type="Function">
                            The callback to handle focus and blur events.
                        </DocAttr>
                        <DocAttr name="onItemClick" type="Function">
                            The callback to handle click event.
                        </DocAttr>
                        <DocAttr name="onValueChange" type="Function">
                            The callback to handle value change event.
                        </DocAttr>
                        <DocAttr name="size" type="String" required>
                            Sets the menu size.
                            <br/>
                            Possible values are <DocInlineCode>xs</DocInlineCode>, <DocInlineCode>s</DocInlineCode>, <DocInlineCode>m</DocInlineCode>, <DocInlineCode>l</DocInlineCode> or <DocInlineCode>xl</DocInlineCode>.
                        </DocAttr>
                        <DocAttr name="theme" type="String" required>
                            Sets the menu theme.
                        </DocAttr>
                        <DocAttr name="value" type="String">
                            Current value. Makes sense with specified <DocInlineCode>mode</DocInlineCode> attribute.
                        </DocAttr>
                    </DocAttrs>
                    <DocChildren>
                        <DocText>
                            Each child is expected to be either a <DocInlineCode>&lt;MenuItem/&gt;</DocInlineCode> or a <DocInlineCode>&lt;MenuItemGroup/&gt;</DocInlineCode>.
                        </DocText>
                    </DocChildren>
                </DocTab>
            </DocTabs>
        </DocComponent>
    );
}
