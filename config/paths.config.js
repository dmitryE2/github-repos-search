const { statSync, readdirSync, realpathSync } = require('fs')
const path = require('path')

const appDirectory = realpathSync(process.cwd())
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)

const getFileInfo = (dir, file) => {
  const fileParts = file.split('.')
  return {
    name: fileParts[0],
    ext: fileParts[1],
    path: path.resolve(dir, file),
  }
}

const getEntries = (dir, entryDir) => {
  const files = readdirSync(dir)
  const entries = {}
  files.forEach((item) => {
    const fileInfo = getFileInfo(dir, item)
    if (statSync(fileInfo.path).isDirectory()) {
      getEntries(fileInfo.path, entryDir)
    } else {
      entries[fileInfo.name] = fileInfo.path
    }
  })
  return entries
}

const pages = []

const getPages = (dir, entryDir, folder) => {
  const files = readdirSync(dir)
  files.forEach((item) => {
    const fileInfo = getFileInfo(dir, item)
    if (statSync(fileInfo.path).isDirectory()) {
      getPages(fileInfo.path, entryDir, fileInfo.name)
      return false
    } else {
      pages.push({
        name: fileInfo.name,
        path: fileInfo.path,
        ext: fileInfo.ext,
        folder: folder ? folder : false,
      })
    }
  })
  return pages
}

const appPaths = {
  app: resolveApp('./app'),
  appBuild: resolveApp('build'),
  buildAssets: 'assets',
  pages: getPages(resolveApp('./app/pages')),
  entries: getEntries(resolveApp('./app/packs')),
  appPublic: resolveApp('./public'),
  appConfig: resolveApp('./config'),
  appAssets: resolveApp('./app/assets'),
  static: resolveApp('./app/assets/static'),
  components: resolveApp('./app/components'),
  containers: resolveApp('./app/containers'),
  appTsConfig: resolveApp('tsconfig.json'),
  appJsConfig: resolveApp('jsconfig.json'),
}

module.exports = appPaths
