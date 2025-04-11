/** @type {import('tailwindcss').Config} */
module.exports = {
  // eslint-disable-next-line node/no-path-concat
  content: [`${__dirname}/src/**/*.{js,ts,jsx,tsx}`],
  corePlugins: {
    preflight: true,
  },
  plugins: [],
}
