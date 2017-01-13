import bem from '../../utils/bem';

const b = bem('DocLink');

export default function DocLink({ url, onClick }, children) {
    return (
       <a class={ b() } href={ url } onClick={ onClick }>
            { children }
        </a>
    );
}
