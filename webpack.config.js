import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import SveltePreprocess from "svelte-preprocess";

const mode = process.env.NODE_ENV ?? "development";
const isProduction = mode === "production";
const isDevelopment = !isProduction;
const __dirname = path.resolve();
const config = {
  entry: {
    bundle: ["./src/frontend/index.ts"],
  },
  resolve: {
    alias: {
      // Note: Later in this config file, we'll automatically add paths from `tsconfig.compilerOptions.paths`
      svelte: path.resolve("node_modules", "svelte"),
    },
    extensions: [".mjs", ".js", ".ts", ".svelte"],
    mainFields: ["svelte", "browser", "module", "main"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
  },
  module: {
    rules: [
      // Rule: Svelte
      {
        test: /\.svelte$/,
        exclude: /node_modules/,
        use: {
          loader: "svelte-loader",
          options: {
            compilerOptions: {
              // Dev mode must be enabled for HMR to work!
              dev: isDevelopment,
            },
            emitCss: isProduction,
            hotReload: isDevelopment,
            hotOptions: {
              // List of options and defaults: https://www.npmjs.com/package/svelte-loader-hot#usage
              noPreserveState: false,
              optimistic: true,
            },
            preprocess: SveltePreprocess({
              scss: true,
              sass: true,
            }),
          },
        },
      },

      // Required to prevent errors from Svelte on Webpack 5+, omit on Webpack 4
      // See: https://github.com/sveltejs/svelte-loader#usage
      {
        test: /node_modules\/svelte\/.*\.mjs$/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.css$/,
        use: [
          /**
           * MiniCssExtractPlugin doesn't support HMR.
           * For developing, use 'style-loader' instead.
           * */
          isProduction ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
        ],
      },
      // Rule: TypeScript
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  mode,
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/frontend/index.html",
      inject: true,
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "/build/frontend"),
    port: 8080,
    host: "127.0.0.1",
    open: true,
    inline: true,
    hot: true,
    noInfo: false,
    quiet: false,
    stats: "errors-only",
  },
  devtool: isProduction ? false : "source-map",
};

export default config;
