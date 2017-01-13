import { Menu, MenuItem } from 'vidom-components';

export default function SimpleExample() {
    return (
        <Menu theme="islands" size="m">
            <MenuItem>item-1</MenuItem>
            <MenuItem>item-2</MenuItem>
            <MenuItem disabled>item-3</MenuItem>
            <MenuItem>item-4</MenuItem>
            <MenuItem disabled>item-5</MenuItem>
        </Menu>
    );
}
