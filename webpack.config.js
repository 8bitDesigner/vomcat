require('dotenv').load()

const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const BUILD = path.resolve(__dirname, 'build')
const SRC = path.resolve(__dirname, 'src')
const NODE_MODULES = path.resolve(__dirname, 'node_modules')

const extractSass = new ExtractTextPlugin({filename: '[name]-[chunkhash].css'})

module.exports = {
  devtool: 'source-map',
  entry: [
    path.resolve(SRC, 'js', 'index.jsx'),
    path.resolve(SRC, 'css', 'app.scss')
  ],
  output: {
    path: BUILD,
    filename: '[name]-[chunkhash].js'
  },
  devServer: {
    port: 3001
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['react-app']
        }
      },
      {
        test: /\.scss$/,
        loader: extractSass.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                includePaths: [path.resolve(NODE_MODULES, 'bootstrap-sass/assets/stylesheets')],
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.ejs$/,
        loader: 'ejs-compiled-loader'
      }
    ]
  },
  plugins: [
    extractSass,
    new webpack.DefinePlugin({
      'process.env': {
        API: `'https://u4v2l5ctsd.execute-api.us-west-2.amazonaws.com/dev/voms'`
      }
    }),
    new HtmlWebpackPlugin({
      title: 'Vomcat',
      template: 'src/views/index.ejs'
    })
  ]
}
