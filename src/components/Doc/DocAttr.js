import DocText from './DocText';
import DocInlineCode from './DocInlineCode';
import bem from '../../utils/bem';

const b = bem('DocAttr'),
    nmClass = b('cell', { type : 'name' }),
    typeClass = b('cell', { type : 'type' }),
    requiredClass = b('cell', { type : 'required' }),
    defClass = b('cell', { type : 'def' }),
    descClass = b('cell', { type : 'desc' });

export default function DocAttr({ name, type, required, def  }, children) {
    return (
        <tr class={ b() }>
            <td class={ nmClass }>{ name }</td>
            <td class={ typeClass }>{ type }</td>
            <td class={ requiredClass }>{ required? '✓' : null }</td>
            <td class={ defClass }>{ def && <DocInlineCode>{ def }</DocInlineCode> }</td>
            <td class={ descClass }>{ children && <DocText>{ children }</DocText> }</td>
        </tr>
    );
}
