const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const DotEnv = require('dotenv-webpack')

const isDev = process.env.NODE_ENV !== 'production'
console.log(isDev)

module.exports = {
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'eval-cheap-module-source-map' : false,
  entry: './src/index.tsx',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
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
    new DotEnv(),
  ],
  devServer: {
    proxy: {
      '/api': {
        target: 'https://conduit.productionready.io',
      },
    },
  },
}
