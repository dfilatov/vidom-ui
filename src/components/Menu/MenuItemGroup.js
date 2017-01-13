import bem from '../../utils/bem';

const b = bem('MenuItemGroup');

export default function MenuItemGroup(attrs, children) {
    return (
        <div class={ b() } role="group">
            <div class={ b('title') } role="presentation">
                { attrs.title }
            </div>
            { children }
        </div>
    );
}
