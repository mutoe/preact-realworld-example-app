const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: "development",
  entry: './src/index.tsx',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'cheap-module-eval-source-map',
  resolve: {
    extensions: [ '.ts', '.tsx', '.js' ],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: 'public/index.html',
    }),
  ],
}
