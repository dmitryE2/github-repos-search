const babelOptions = function () {
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            ie: '10',
          },
          useBuiltIns: 'usage',
          modules: false,
          corejs: 3,
        },
      ],
    ],
    plugins: [
      ['@babel/plugin-transform-runtime', { proposal: true, corejs: 3 }],
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-syntax-dynamic-import',
    ],
    env: {
      test: {
        plugins: ['@babel/plugin-transform-modules-commonjs', 'dynamic-import-node'],
      },
    },
  }
}

module.exports = babelOptions
