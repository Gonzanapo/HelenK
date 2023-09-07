// Mantener la extensión .mjs
// Importar los tipos usando import() en los comentarios JSDoc
/**
 * @typedef {import("next").NextConfig} NextConfig
 * @typedef {import("next-pwa").PWAConfig} PWAConfig
 */

// Importar el paquete @types/node para tener el tipo de process
import process from "process";

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

// Usar el tipo NextConfig para la variable config usando JSDoc
/** @type {NextConfig} */
const config = {
  reactStrictMode: true,

  /**
   * If you have `experimental: { appDir: true }` set, then you must comment the below `i18n` config
   * out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};

const withPWA = require("next-pwa");

// Usar el tipo PWAConfig para el objeto que se le pasa a withPWA usando JSDoc
// Mover la propiedad pwa fuera del objeto
/** @type {PWAConfig} */
const pwaConfig = {
  // next.js config
  dest: "public",
  register: true,
  skipWaiting: true,
};

module.exports = withPWA(pwaConfig);

export default config;
