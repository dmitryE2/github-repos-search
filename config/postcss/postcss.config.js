module.exports = {
  plugins: [
    require('cssnano')({
      preset: ['default', { discardComments: { removeAll: true } }],
    }),
    require('autoprefixer')({ grid: true }),
    require('postcss-flexbugs-fixes'),
    require('postcss-preset-env')({
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
    }),
  ],
}
