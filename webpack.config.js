require('dotenv').load()

const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const BUILD = path.resolve(__dirname, 'build')
const SRC = path.resolve(__dirname, 'src')
const NODE_MODULES = path.resolve(__dirname, 'node_modules')

const extractSass = new ExtractTextPlugin({filename: '[name].css'})

module.exports = {
  devtool: 'source-map',
  entry: [
    path.resolve(SRC, 'js', 'index.jsx'),
    path.resolve(SRC, 'css', 'app.scss')
  ],
  output: {
    path: BUILD,
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'react']
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
      }
    ]
  },
  plugins: [
    extractSass,
    new webpack.DefinePlugin({
      'process.env': {
        DYNAMODB_TABLE: `'${process.env.DYNAMODB_TABLE}'`,
        AWS_ACCESS_KEY_ID: `'${process.env.AWS_ACCESS_KEY_ID}'`,
        AWS_SECRET_ACCESS_KEY: `'${process.env.AWS_SECRET_ACCESS_KEY}'`,
        AWS_REGION: `'${process.env.AWS_REGION}'`
      }
    })
  ]
}
