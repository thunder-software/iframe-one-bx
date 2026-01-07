import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const VUEX_PROPERTIES = ['state', 'getters', 'actions', 'mutations']

let store = {};

(function updateModules () {
  store = normalizeRoot(require('../store/index.js'), 'store/index.js')

  // If store is an exported method = classic mode (deprecated)

  if (typeof store === 'function') {
    return console.warn('Classic mode for store/ is deprecated and will be removed in Nuxt 3.')
  }

  // Enforce store modules
  store.modules = store.modules || {}

  resolveStoreModules(require('../store/ads.js'), 'ads.js')
  resolveStoreModules(require('../store/announce.js'), 'announce.js')
  resolveStoreModules(require('../store/balance.js'), 'balance.js')
  resolveStoreModules(require('../store/betinfo.js'), 'betinfo.js')
  resolveStoreModules(require('../store/clicksport.js'), 'clicksport.js')
  resolveStoreModules(require('../store/closebet.js'), 'closebet.js')
  resolveStoreModules(require('../store/closebetlist.js'), 'closebetlist.js')
  resolveStoreModules(require('../store/collapseAll.js'), 'collapseAll.js')
  resolveStoreModules(require('../store/favorite.js'), 'favorite.js')
  resolveStoreModules(require('../store/fetchbet.js'), 'fetchbet.js')
  resolveStoreModules(require('../store/football-live.js'), 'football-live.js')
  resolveStoreModules(require('../store/football-notlive.js'), 'football-notlive.js')
  resolveStoreModules(require('../store/footballlive.js'), 'footballlive.js')
  resolveStoreModules(require('../store/footballnotlive.js'), 'footballnotlive.js')
  resolveStoreModules(require('../store/history.js'), 'history.js')
  resolveStoreModules(require('../store/iframe.js'), 'iframe.js')
  resolveStoreModules(require('../store/language.js'), 'language.js')
  resolveStoreModules(require('../store/listbet.js'), 'listbet.js')
  resolveStoreModules(require('../store/menu.js'), 'menu.js')
  resolveStoreModules(require('../store/mpy@zoo.js'), 'mpy@zoo.js')
  resolveStoreModules(require('../store/offersale.js'), 'offersale.js')
  resolveStoreModules(require('../store/quickbet.js'), 'quickbet.js')
  resolveStoreModules(require('../store/results.js'), 'results.js')
  resolveStoreModules(require('../store/selectleaguebutton.js'), 'selectleaguebutton.js')
  resolveStoreModules(require('../store/tabbet.js'), 'tabbet.js')
  resolveStoreModules(require('../store/tabmix.js'), 'tabmix.js')
  resolveStoreModules(require('../store/tvpop.js'), 'tvpop.js')
  resolveStoreModules(require('../store/user.js'), 'user.js')
  resolveStoreModules(require('../store/validation.js'), 'validation.js')
  resolveStoreModules(require('../store/visible.js'), 'visible.js')

  // If the environment supports hot reloading...

  if (process.client && module.hot) {
    // Whenever any Vuex module is updated...
    module.hot.accept([
      '../store/ads.js',
      '../store/announce.js',
      '../store/balance.js',
      '../store/betinfo.js',
      '../store/clicksport.js',
      '../store/closebet.js',
      '../store/closebetlist.js',
      '../store/collapseAll.js',
      '../store/favorite.js',
      '../store/fetchbet.js',
      '../store/football-live.js',
      '../store/football-notlive.js',
      '../store/footballlive.js',
      '../store/footballnotlive.js',
      '../store/history.js',
      '../store/iframe.js',
      '../store/index.js',
      '../store/language.js',
      '../store/listbet.js',
      '../store/menu.js',
      '../store/mpy@zoo.js',
      '../store/offersale.js',
      '../store/quickbet.js',
      '../store/results.js',
      '../store/selectleaguebutton.js',
      '../store/tabbet.js',
      '../store/tabmix.js',
      '../store/tvpop.js',
      '../store/user.js',
      '../store/validation.js',
      '../store/visible.js',
    ], () => {
      // Update `root.modules` with the latest definitions.
      updateModules()
      // Trigger a hot update in the store.
      window.$nuxt.$store.hotUpdate(store)
    })
  }
})()

// createStore
export const createStore = store instanceof Function ? store : () => {
  return new Vuex.Store(Object.assign({
    strict: (process.env.NODE_ENV !== 'production')
  }, store))
}

function normalizeRoot (moduleData, filePath) {
  moduleData = moduleData.default || moduleData

  if (moduleData.commit) {
    throw new Error(`[nuxt] ${filePath} should export a method that returns a Vuex instance.`)
  }

  if (typeof moduleData !== 'function') {
    // Avoid TypeError: setting a property that has only a getter when overwriting top level keys
    moduleData = Object.assign({}, moduleData)
  }
  return normalizeModule(moduleData, filePath)
}

function normalizeModule (moduleData, filePath) {
  if (moduleData.state && typeof moduleData.state !== 'function') {
    console.warn(`'state' should be a method that returns an object in ${filePath}`)

    const state = Object.assign({}, moduleData.state)
    // Avoid TypeError: setting a property that has only a getter when overwriting top level keys
    moduleData = Object.assign({}, moduleData, { state: () => state })
  }
  return moduleData
}

function resolveStoreModules (moduleData, filename) {
  moduleData = moduleData.default || moduleData
  // Remove store src + extension (./foo/index.js -> foo/index)
  const namespace = filename.replace(/\.(js|mjs)$/, '')
  const namespaces = namespace.split('/')
  let moduleName = namespaces[namespaces.length - 1]
  const filePath = `store/${filename}`

  moduleData = moduleName === 'state'
    ? normalizeState(moduleData, filePath)
    : normalizeModule(moduleData, filePath)

  // If src is a known Vuex property
  if (VUEX_PROPERTIES.includes(moduleName)) {
    const property = moduleName
    const propertyStoreModule = getStoreModule(store, namespaces, { isProperty: true })

    // Replace state since it's a function
    mergeProperty(propertyStoreModule, moduleData, property)
    return
  }

  // If file is foo/index.js, it should be saved as foo
  const isIndexModule = (moduleName === 'index')
  if (isIndexModule) {
    namespaces.pop()
    moduleName = namespaces[namespaces.length - 1]
  }

  const storeModule = getStoreModule(store, namespaces)

  for (const property of VUEX_PROPERTIES) {
    mergeProperty(storeModule, moduleData[property], property)
  }

  if (moduleData.namespaced === false) {
    delete storeModule.namespaced
  }
}

function normalizeState (moduleData, filePath) {
  if (typeof moduleData !== 'function') {
    console.warn(`${filePath} should export a method that returns an object`)
    const state = Object.assign({}, moduleData)
    return () => state
  }
  return normalizeModule(moduleData, filePath)
}

function getStoreModule (storeModule, namespaces, { isProperty = false } = {}) {
  // If ./mutations.js
  if (!namespaces.length || (isProperty && namespaces.length === 1)) {
    return storeModule
  }

  const namespace = namespaces.shift()

  storeModule.modules[namespace] = storeModule.modules[namespace] || {}
  storeModule.modules[namespace].namespaced = true
  storeModule.modules[namespace].modules = storeModule.modules[namespace].modules || {}

  return getStoreModule(storeModule.modules[namespace], namespaces, { isProperty })
}

function mergeProperty (storeModule, moduleData, property) {
  if (!moduleData) {
    return
  }

  if (property === 'state') {
    storeModule.state = moduleData || storeModule.state
  } else {
    storeModule[property] = Object.assign({}, storeModule[property], moduleData)
  }
}
