import DocHeader from './DocHeader';
import bem from '../../utils/bem';

const b = bem('DocAttrs'),
    thClass = b('th');

export default function DocAttrs(_, children) {
    return (
        <fragment>
            <DocHeader level="4">Attributes</DocHeader>
            <table class={ b() }>
                <thead>
                    <th class={ thClass }>Name</th>
                    <th class={ thClass }>Type</th>
                    <th class={ thClass }>Required</th>
                    <th class={ thClass }>Default</th>
                    <th class={ thClass }>Description</th>
                </thead>
                <tbody>{ children }</tbody>
            </table>
        </fragment>
    );
}
