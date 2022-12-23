const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const CopyPlugin = require("copy-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

module.exports = (env) => ({
  target: "node",
  externals: [nodeExternals()],
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "./package.json" }],
    }),
    new Dotenv({
      path: `./.env${
        env.ENV !== "production" && env.ENV !== undefined ? `.${env.ENV}` : ""
      }`,
    }),
  ],
  output: {
    path: path.join(__dirname, "build"),
    filename: "server.js",
    publicPath: "/",
    libraryTarget: "commonjs2",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    plugins: [new TsconfigPathsPlugin()],
  },
});
