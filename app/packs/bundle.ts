// global
import 'assets/styles/global.scss'

// components
import 'components/header/js/'
import 'components/container/js/'
import 'components/formField/js/'
import 'components/textInput/js/'
import 'components/select/js/'
import 'components/repoItem/js/'
import 'components/preloader/js/'

// containers
import 'containers/siteHeader/js/'
import 'containers/searchSection/js/'
import 'containers/resultSection/js/'

// install offline-plugin
if (process.env.NODE_ENV !== 'development') {
  require('offline-plugin/runtime').install()
}
