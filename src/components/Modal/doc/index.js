import { Component } from 'vidom';
import { DocComponent, DocTabs, DocTab, DocAttrs, DocAttr, DocExample, DocChildren, DocText, DocInlineCode } from '../../Doc';
import SimpleExample from './examples/SimpleExample';
import simpleExampleCode from '!raw!./examples/SimpleExample.js';

export default function ModalDoc({ tab, onTabChange }) {
    return (
        <DocComponent title="Modal">
            <DocTabs value={ tab } onTabChange={ onTabChange }>
                <DocTab title="Examples" value="Examples">
                    <DocExample title="Simple" code={ simpleExampleCode }>
                        <SimpleExample/>
                    </DocExample>
                </DocTab>
                <DocTab title="API" value="api">
                    <DocAttrs>
                        <DocAttr name="autoclosable" type="Boolean" def="false">
                            Enables the modal to be hidden on pressing "Esc" or clicking somewhere outside its content.
                        </DocAttr>
                        <DocAttr name="onHide" type="Function">
                            The callback to handle hide event.
                        </DocAttr>
                        <DocAttr name="theme" type="String" required>
                            Sets the modal theme.
                        </DocAttr>
                        <DocAttr name="visible" type="Boolean" def="false">
                            Sets the visibility of the modal.
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
