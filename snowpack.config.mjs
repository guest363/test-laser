/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  mount: {
    public: { url: "/", static: true },
    src: { url: "/" },
  },
  extends: "@snowpack/app-scripts-svelte",
  plugins: ["@snowpack/plugin-svelte", "@snowpack/plugin-typescript"],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    manifest: true,
    splitting: true,
    treeshake: true,
    minify: true,
    bundle: true,
    target: "es2018",
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
};
