import bem from '../../utils/bem';

const b = bem('DocList');

export default function DocList(_, children) {
    return (
        <ul class={ b() }>
            { children }
        </ul>
    );
}
