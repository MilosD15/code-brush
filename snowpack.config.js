// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  root: 'src/app',
  // mount: {
  //   public: {
  //     url: "/",
  //     // static: true
  //   },
  //   src: "/"
  // },
  plugins: [
    "@snowpack/plugin-sass",
  ],
  packageOptions: {
    /* ... */
  },
  devOptions: {
    // openUrl: 'src/app/'
  },
  buildOptions: {
    out: "dist"
  },
  optimize: {
    bundle: true,
    minify: false,
    target: 'es2017',
  },
};
