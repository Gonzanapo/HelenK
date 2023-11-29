import withPWA from 'next-pwa'

const config = {
  ...withPWA({
    dest: 'public',
    register: true,
    scope: '/',
    sw: 'service-worker.js',
    skipWaiting: true,
  }),
  reactStrictMode: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
}

export default config
