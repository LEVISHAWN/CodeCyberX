module.exports = {
  plugins: {
    "tailwindcss/nesting": {},
    tailwindcss: {},
    autoprefixer: {},
  },
};

/*
  PostCSS configuration notes

  - Order is important: nesting -> tailwind -> autoprefixer.
  - `tailwindcss/nesting` enables modern CSS nesting syntax in component
    stylesheets.
  - `tailwindcss` runs the utility generation and extracts used classes during
    build time (based on `content` in `tailwind.config.js`).
  - `autoprefixer` adds vendor prefixes for better browser compatibility.
*/
