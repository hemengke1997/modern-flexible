module.exports = {
  plugins: {
    'tailwindcss/nesting': {},
    'tailwindcss': {
      config: `${__dirname}/tailwind.config.cjs`,
    },
  },
}
