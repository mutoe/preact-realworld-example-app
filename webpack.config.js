const path = require("path")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const DotEnv = require("dotenv-webpack")

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [ ".ts", ".tsx", ".js" ],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "public/index.html",
    }),
    new DotEnv(),
  ],
  devtool: "cheap-module-eval-source-map",
  devServer: {
    proxy: {
      "/api": {
        target: "https://conduit.productionready.io",
      },
    },
  },
}
