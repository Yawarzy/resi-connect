export interface NavItem {
  label: string;
  path: string;
  icon?: string;
}

export const NAV_ITEMS: NavItem[] = [
  {label: 'Home', path: '/'},
  {label: 'Properties', path: '/properties'},
  {label: 'Enquiry', path: '/enquiry'},
  {label: 'Contact', path: '/contact'},
];
