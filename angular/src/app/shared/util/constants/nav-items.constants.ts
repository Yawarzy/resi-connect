export interface NavItem {
  label: string;
  path: string;
}

export const NAV_ITEMS: NavItem[] = [
  {label: 'Home', path: '/'},
  {label: 'Properties', path: '/properties'},
  {label: 'Contact', path: '/contact'},
];
