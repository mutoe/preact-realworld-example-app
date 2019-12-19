const path = require("path")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const DotEnv = require("dotenv-webpack")
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")

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
    new BundleAnalyzerPlugin({
      openAnalyzer: false
    }),
  ],
  devtool: "eval-cheap-module-source-map",
  devServer: {
    proxy: {
      "/api": {
        target: "https://conduit.productionready.io",
      },
    },
  },
}
