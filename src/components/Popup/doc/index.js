import { Component } from 'vidom';
import { DocComponent, DocTabs, DocTab, DocAttrs, DocAttr, DocExample, DocChildren, DocText, DocInlineCode } from '../../Doc';
import SimpleExample from './examples/SimpleExample';
import NestedExample from './examples/NestedExample';
import AutoclosableExample from './examples/AutoclosableExample';
import InsideScrollableExample from './examples/InsideScrollableExample';
import simpleExampleCode from '!raw!./examples/SimpleExample.js';
import nestedExampleCode from '!raw!./examples/NestedExample.js';
import autoclosableExampleCode from '!raw!./examples/AutoclosableExample.js';
import insideScrollableExampleCode from '!raw!./examples/InsideScrollableExample.js';

export default function PopupDoc({ tab, onTabChange }) {
    return (
        <DocComponent title="Popup">
            <DocTabs value={ tab } onTabChange={ onTabChange }>
                <DocTab title="Examples" value="Examples">
                    <DocExample title="Simple" code={ simpleExampleCode }>
                        <SimpleExample/>
                    </DocExample>
                    <DocExample title="Nested" code={ nestedExampleCode }>
                        <NestedExample/>
                    </DocExample>
                    <DocExample title="Autoclosable" code={ autoclosableExampleCode }>
                        <AutoclosableExample/>
                    </DocExample>
                    <DocExample title="InsideScrollable" code={ insideScrollableExampleCode }>
                        <InsideScrollableExample/>
                    </DocExample>
                </DocTab>
                <DocTab title="API" value="api">
                    <DocAttrs>
                        <DocAttr name="anchor" type="Function" required>
                            Sets the anchor for the popup.
                            <br/>This function must return the value with one of the following types:
                            <br/>
                            <DocInlineCode>Component</DocInlineCode>, <DocInlineCode>DomNode</DocInlineCode> or <DocInlineCode>Object{'{left, top}'}</DocInlineCode>.
                        </DocAttr>
                        <DocAttr name="autoclosable" type="Boolean" def="false">
                            Enables the popup to be hidden on pressing "Esc" or clicking somewhere outside its content.
                        </DocAttr>
                        <DocAttr name="directions" type="String[ ]">
                            Sets allowed directions to open popup.
                            <br/>
                            Possible options are: <DocInlineCode>bottom-left</DocInlineCode>, <DocInlineCode>bottom-center</DocInlineCode>, <DocInlineCode>bottom-right</DocInlineCode>, <DocInlineCode>top-left</DocInlineCode>, <DocInlineCode>top-center</DocInlineCode>, <DocInlineCode>top-right</DocInlineCode>, <DocInlineCode>right-top</DocInlineCode>, <DocInlineCode>right-center</DocInlineCode>, <DocInlineCode>right-bottom</DocInlineCode>, <DocInlineCode>left-top</DocInlineCode>, <DocInlineCode>left-center</DocInlineCode>, <DocInlineCode>left-bottom</DocInlineCode>.
                            <br/>
                            By default any directions are allowed.
                        </DocAttr>
                        <DocAttr name="mainOffset" type="Number" def="5">
                            Sets the offset to the main axis.
                        </DocAttr>
                        <DocAttr name="onHide" type="Function">
                            The callback to handle hide event.
                        </DocAttr>
                        <DocAttr name="secondaryOffset" type="Number" def="0">
                            Sets the offset to the secondary axis.
                        </DocAttr>
                        <DocAttr name="theme" type="String" required>
                            Sets the popup theme.
                        </DocAttr>
                        <DocAttr name="viewportOffset" type="Number" def="10">
                            Sets the offset to the viewport.
                        </DocAttr>
                        <DocAttr name="visible" type="Boolean" def="false">
                            Sets the visibility of the popup.
                        </DocAttr>
                        <DocAttr name="zIndexLevel" type="Number" def="0">
                            Sets the level of zIndex group.
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
