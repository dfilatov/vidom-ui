import bem from '../../utils/bem';

const b = bem('DocText');

export default function DocText(_, children) {
    return (
        <p class={ b() }>
            { children }
        </p>
    );
}