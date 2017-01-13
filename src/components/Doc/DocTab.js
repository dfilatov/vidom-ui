import bem from '../../utils/bem';

const b = bem('DocTab');

export default function DocTab({ selected }, children) {
    return <div class={ b({ selected }) }>{ children }</div>
}