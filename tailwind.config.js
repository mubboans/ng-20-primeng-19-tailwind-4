/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/primeng/**/*.{html,ts}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // This is important to prevent conflicts with PrimeNG
  corePlugins: {
    preflight: false,
  }
}
