import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-jsx';
import bem from '../../utils/bem';

const b = bem('DocCode');

export default function DocCode({ lang }, children) {
    return lang === 'jsx'?
        <pre class={ b() + ' language-jsx' }>
            <code html={ highlight(children, languages.jsx) }/>
        </pre> :
        <pre class={ b({ simple : true }) }>
            <code>{ children }</code>
        </pre>;
}
