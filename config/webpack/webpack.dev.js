const webpack = require('webpack')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const baseConfig = require('./webpack.base.js')
const pathsConfig = require('../paths.config.js')

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: pathsConfig.appPublic,
    host: '192.168.0.101',
    port: 8030,
    publicPath: '/',
    historyApiFallback: true,
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.module\.(sa|sc|c)ss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 3,
              sourceMap: true,
              modules: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              sourceMap: true,
              config: { path: `${pathsConfig.appConfig}/postcss/postcss.config.js` },
            },
          },
          { loader: 'sass-loader', options: { sourceMap: true } },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                `${pathsConfig.appAssets}/styles/utils/variables.scss`,
                `${pathsConfig.appAssets}/styles/utils/mixins.scss`,
              ],
            },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /\.module.(sa|sc|c)ss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { importLoaders: 3, sourceMap: true } },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: { path: `${pathsConfig.appConfig}/postcss/postcss.config.js` },
            },
          },
          { loader: 'sass-loader', options: { sourceMap: true } },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                `${pathsConfig.appAssets}/styles/utils/variables.scss`,
                `${pathsConfig.appAssets}/styles/utils/mixins.scss`,
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
    }),
    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/,
      failOnError: false,
    }),
    ...pathsConfig.pages.map(
      page =>
        new HtmlWebpackPlugin({
          inject: true,
          template: page.path,
          filename: `${page.folder ? page.folder + '/' : ''}${page.name}.html`,
          chanks: `${page.name}.js`,
        }),
    ),
    new webpack.HotModuleReplacementPlugin(),
  ],
})
