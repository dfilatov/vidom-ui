import bem from '../../utils/bem';

const b = bem('Spinner');

export default function Spinner({ theme, size, mix }) {
    let className = b({
        theme : theme || this.context.theme,
        size
    });

    if(mix) {
        className += ' ' + mix;
    }

    return <span class={ className}/>;
}
