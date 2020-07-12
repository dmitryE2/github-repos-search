const fs = require('fs')
const appDirectory = fs.realpathSync(process.cwd())

const babelOptions = require(`${appDirectory}/config/babel/babel.config.js`)

module.exports = require('babel-jest').createTransformer(babelOptions)
