import bem from '../../utils/bem';

const b = bem('DocPage');

export default function DocPage(_, children) {
    return (
        <div class={ b() }>
            <div class={ b('content') }>
                { children }
            </div>
        </div>
    );
}
