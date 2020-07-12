// global
import 'assets/styles/global.scss'

// components


// containers

// install offline-plugin
if (process.env.NODE_ENV !== 'development') {
  require('offline-plugin/runtime').install()
}
