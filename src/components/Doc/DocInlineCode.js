import bem from '../../utils/bem';

const b = bem('DocInlineCode');

export default function DocInlineCode(_, children) {
    return <code class={ b() }>{ children }</code>;
}