const withPWA = require("next-pwa")({
  dest: "public",
  // disable: process.env.NODE_ENV === 'development',
  // register: true,
  // scope: '/app',
  // sw: 'service-worker.js',
  //...
});
module.exports = withPWA({
  //   // next.js config
  reactStrictMode: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  // next-pwa config
  pwa: {
    dest: "public",
    register: true,
    scope: "/",
    sw: "service-worker.js",
    skipWaiting: true,
  },
});