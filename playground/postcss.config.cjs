module.exports = {
  plugins: {
    'tailwindcss/nesting': {},
    'tailwindcss': {
      // eslint-disable-next-line node/no-path-concat
      config: `${__dirname}/tailwind.config.cjs`,
    },
  },
}
