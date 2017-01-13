import bem from '../../utils/bem';

const b = bem('DocListItem');

export default function DocList(_, children) {
    return (
        <li class={ b() }>
            { children }
        </li>
    );
}
