const fs = require('fs')
const appDirectory = fs.realpathSync(process.cwd())

module.exports = {
  rootDir: appDirectory,
  collectCoverageFrom: [
    'app/**/*.{js,jsx}',
    '!app/**/*.test.{js,jsx}',
    '!app/*/*/Loadable.{js,jsx}',
  ],
  coverageThreshold: {
    global: {
      statements: 98,
      branches: 91,
      functions: 98,
      lines: 98,
    },
  },
  verbose: true,
  transform: {
    '^.+\\.(js|jsx)$': '<rootDir>/config/jest/babelTransform.js'
  },
  moduleDirectories: ['node_modules', 'app'],
  moduleNameMapper: {
    '.*\\.(css|less|styl|scss|sass)$': '<rootDir>/config/jest/styleMock.js',
    '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/config/jest/fileMock.js',
  },
  testRegex: 'tests/.*\\.test\\.js$',
  snapshotSerializers: [],
}
