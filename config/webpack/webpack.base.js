const fs = require('fs')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const PnpWebpackPlugin = require('pnp-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const pathsConfig = require('../paths.config.js')

const useTypeScript = fs.existsSync(pathsConfig.appTsConfig)

module.exports = {
  entry: pathsConfig.entries,
  output: {
    filename: `${pathsConfig.buildAssets}/js/[name].js`,
    path: pathsConfig.appBuild,
    publicPath: './',
  },
  module: {
    rules: [
      {
        test: /\.js(x?)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules|\.d\.ts$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-inline-loader',
          },
        ],
      },
      {
        test: /\.(jpg|png|gif|webp)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              outputPath: `${pathsConfig.buildAssets}/images`,
              limit: false,
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          outputPath: `${pathsConfig.buildAssets}/fonts`,
          name: '[name].[ext]',
        },
      },
      {
        test: /\.(mp4|webm)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
      },
    ],
  },
  resolve: {
    modules: ['node_modules', pathsConfig.app],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.module.scss', '.css', '.module.css'],
    plugins: [PnpWebpackPlugin],
  },
  resolveLoader: {
    plugins: [PnpWebpackPlugin.moduleLoader(module)],
  },
  plugins: [
    new CopyPlugin({ patterns: [{ from: pathsConfig.appPublic, to: pathsConfig.appBuild }] }),
    useTypeScript && new ForkTsCheckerWebpackPlugin(),
  ],
  target: 'web',
}
