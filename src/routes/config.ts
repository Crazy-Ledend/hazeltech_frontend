export const ROUTES = {
  HOME:     '/',
  PRODUCTS: '/products',
  SERVICES: '/services',
  ABOUT:    '/about',
  CONTACT:  '/contact',
  APPLY:    '/apply',
} as const;

export const NAV_LINKS = [
  { label: 'Home',     path: ROUTES.HOME },
  { label: 'Products', path: ROUTES.PRODUCTS },
  { label: 'Services', path: ROUTES.SERVICES },
  { label: 'About',    path: ROUTES.ABOUT },
  { label: 'Request',  path: ROUTES.CONTACT },
];

export const DISCORD_URL = 'https://discord.gg/uA9hUpAQfn';
