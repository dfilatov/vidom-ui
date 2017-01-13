import DocHeader from './DocHeader';
import bem from '../../utils/bem';

const b = bem('DocComponent');

export default function DocComponent({ title }, children) {
    return (
        <div class={ b() }>
            <DocHeader level="2">{ title }</DocHeader>
            { children }
        </div>
    );
}