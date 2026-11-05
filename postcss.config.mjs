// Tailwind CSS v4 through PostCSS: works with both Turbopack (`next dev` / `next build`) and
// Webpack (`next build --webpack`, for hosts without Next's native compiler).
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
