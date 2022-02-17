module.exports = {
  images: {
    domains: ['bruerlaw.com', 'localhost'],
  },
  reactStrictMode: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  publicRuntimeConfig: {
    APP_NAME: 'BRUERLAW',
    API_DEVELOPMENT: 'http://localhost:8000/api',
    API_PRODUCTION: 'http://localhost:8000/api',
    PRODUCTION: false,
    DOMAIN_DEVELOPMENT: 'http://localhost:3000',
    DOMAIN_PRODUCTION: '',
  },
};
