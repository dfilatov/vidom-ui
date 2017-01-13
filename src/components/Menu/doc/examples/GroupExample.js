import { Menu, MenuItem, MenuItemGroup } from 'vidom-components';

export default function SimpleExample() {
    return (
        <Menu theme="islands" size="m">
            <MenuItemGroup title="group-1">
                <MenuItem>item-1</MenuItem>
                <MenuItem>item-2</MenuItem>
                <MenuItem disabled>item-3</MenuItem>
                <MenuItem>item-4</MenuItem>
                <MenuItem disabled>item-5</MenuItem>
            </MenuItemGroup>
            <MenuItemGroup title="group-2">
                <MenuItem>item-6</MenuItem>
                <MenuItem>item-7</MenuItem>
                <MenuItem disabled>item-8</MenuItem>
                <MenuItem>item-9</MenuItem>
                <MenuItem disabled>item-10</MenuItem>
            </MenuItemGroup>
        </Menu>
    );
}
