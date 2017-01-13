import bem from '../../utils/bem';

const b = bem('DocHeader');

export default function DocHeader({ level = 1 }, children) {
    const Tag = 'h' + level;

    return (
        <Tag class={ b({ level }) }>
            { children }
        </Tag>
    );
}