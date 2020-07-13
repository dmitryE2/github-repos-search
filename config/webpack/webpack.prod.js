/* eslint-disable sonarjs/no-duplicate-string */
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const OfflinePlugin = require('offline-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const baseConfig = require('./webpack.base.js')
const pathsConfig = require('../paths.config.js')

module.exports = merge(baseConfig, {
  mode: 'production',
  output: {
    filename: `${pathsConfig.buildAssets}/js/[name].js`,
    chunkFilename: `${pathsConfig.buildAssets}/js/[name].chunk.js`,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          warnings: false,
          compress: {
            comparisons: false,
            drop_console: true,
          },
          parse: {},
          mangle: true,
          output: {
            comments: false,
            ascii_only: true,
          },
        },
        parallel: true,
        cache: true,
        sourceMap: true,
      }),
    ],
    nodeEnv: 'production',
    sideEffects: true,
    concatenateModules: true,
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}`,
    },
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: 10,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
            return `npm.${packageName.replace('@', '')}`
          },
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: false, modules: false } },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: false,
              config: { path: `${pathsConfig.appConfig}/postcss/postcss.config.js` },
            },
          },
        ],
      },
      {
        test: /\.module\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
              modules: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: false,
              config: { path: `${pathsConfig.appConfig}/postcss/postcss.config.js` },
            },
          },
          { loader: 'sass-loader', options: { sourceMap: false } },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /\.module.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: false } },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: false,
              config: { path: `${pathsConfig.appConfig}/postcss/postcss.config.js` },
            },
          },
          { loader: 'sass-loader', options: { sourceMap: false } },
          {
            loader: 'sass-resources-loader',
            options: {
              sourceMap: true,
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
    ...pathsConfig.pages.map(
      (page) =>
        new HtmlWebpackPlugin({
          hash: false,
          template: page.path,
          filename: `${page.folder ? page.folder + '/' : ''}${page.name}.html`,
          chanks: `${page.name}.js`,
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          },
          inject: true,
        }),
    ),
    new MiniCssExtractPlugin({
      filename: `${pathsConfig.buildAssets}/styles/[name].css`,
      chunkFilename: `${pathsConfig.buildAssets}/styles/[name].chunk.css`,
      ignoreOrder: false,
    }),

    new OfflinePlugin({
      relativePaths: false,
      publicPath: '/',
      appShell: '/',
      excludes: ['.htaccess'],
      caches: {
        main: [':rest:'],
        additional: ['*.chunk.js'],
      },
      safeToUseOptionalCaches: true,
    }),

    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),

    new WebpackPwaManifest({
      name: 'github-repos-search',
      short_name: 'github-repos-search',
      description: 'github repositories search',
      background_color: '#18191a',
      theme_color: '#18191a',
      inject: true,
      ios: true,
      icons: [
        {
          src: `${pathsConfig.appAssets}/images/favicon-512.png`,
          sizes: [72, 96, 128, 144, 192, 384, 512],
        },
        {
          src: `${pathsConfig.appAssets}/images/favicon-512.png`,
          sizes: [120, 152, 167, 180],
          ios: true,
        },
      ],
    }),
  ],
})
