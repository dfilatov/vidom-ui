import bem from '../../utils/bem';

const b = bem('DocTabs');

export default function DocTabs({ value, onTabChange }, children) {
    const tabs = [],
        sheets = [];

    children.forEach(tab => {
        const tabValue = tab.attrs.value,
            selected = value === tabValue;

        tabs.push(
            <h3
                class={ b('tab', { selected }) }
                onClick={ selected? null : () => { onTabChange(tabValue); } }
            >
                { tab.attrs.title }
            </h3>
        );

        sheets.push(tab.clone().setAttrs({ selected }));
    });

    return (
        <div class={ b() }>
            <div class={ b('tabs') }>{ tabs }</div>
            <div class={ b('sheets') }>{ sheets }</div>
        </div>
    );
}
