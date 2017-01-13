import bem from '../../utils/bem';

const b = bem('Icon'),
    iconClass = b();

export default function Icon({ mix }, children) {
    let className = iconClass;

    if(mix) {
        className += ' ' + mix;
    }

    return (
        <span class={ className }>
            { children }
        </span>
    );
}
