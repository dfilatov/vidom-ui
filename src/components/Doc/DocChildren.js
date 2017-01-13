import DocHeader from './DocHeader';

export default function DocChildren(_, children) {
    return (
        <fragment>
            <DocHeader level="4">Children</DocHeader>
            { children }
        </fragment>
    );
}
