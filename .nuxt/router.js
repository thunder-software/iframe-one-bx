import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _6741ae54 = () => interopDefault(import('../pages/autherror.vue' /* webpackChunkName: "pages/autherror" */))
const _18040547 = () => interopDefault(import('../pages/iperrorpopup.vue' /* webpackChunkName: "pages/iperrorpopup" */))
const _92b87c46 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _0f382cc0 = () => interopDefault(import('../pages/popup.vue' /* webpackChunkName: "pages/popup" */))
const _6e5858ea = () => interopDefault(import('../pages/results.vue' /* webpackChunkName: "pages/results" */))
const _bd10b72a = () => interopDefault(import('../pages/rules.vue' /* webpackChunkName: "pages/rules" */))
const _edb59c8a = () => interopDefault(import('../pages/sports.vue' /* webpackChunkName: "pages/sports" */))
const _1660cc03 = () => interopDefault(import('../pages/tvpop.vue' /* webpackChunkName: "pages/tvpop" */))
const _bd4b3f32 = () => interopDefault(import('../pages/tvpopiframe.vue' /* webpackChunkName: "pages/tvpopiframe" */))
const _676f2d0c = () => interopDefault(import('../pages/favorite/basketball.vue' /* webpackChunkName: "pages/favorite/basketball" */))
const _2d7ccce6 = () => interopDefault(import('../pages/favorite/bullfight.vue' /* webpackChunkName: "pages/favorite/bullfight" */))
const _84fb8d76 = () => interopDefault(import('../pages/favorite/cockfight.vue' /* webpackChunkName: "pages/favorite/cockfight" */))
const _5c6a6b58 = () => interopDefault(import('../pages/favorite/cockfightsouth.vue' /* webpackChunkName: "pages/favorite/cockfightsouth" */))
const _bc86d118 = () => interopDefault(import('../pages/favorite/football.vue' /* webpackChunkName: "pages/favorite/football" */))
const _e9110bfa = () => interopDefault(import('../pages/favorite/muaythai.vue' /* webpackChunkName: "pages/favorite/muaythai" */))
const _10ef7146 = () => interopDefault(import('../pages/favorite/snooker.vue' /* webpackChunkName: "pages/favorite/snooker" */))
const _b2a8ddde = () => interopDefault(import('../pages/favorite/takraw.vue' /* webpackChunkName: "pages/favorite/takraw" */))
const _2607c274 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _52df54f9 = () => interopDefault(import('../pages/basketball/_path/index.vue' /* webpackChunkName: "pages/basketball/_path/index" */))
const _66067f6e = () => interopDefault(import('../pages/bullfight/_path/index.vue' /* webpackChunkName: "pages/bullfight/_path/index" */))
const _46df9628 = () => interopDefault(import('../pages/cockfight/_path/index.vue' /* webpackChunkName: "pages/cockfight/_path/index" */))
const _82a48276 = () => interopDefault(import('../pages/cockfightsouth/_path/index.vue' /* webpackChunkName: "pages/cockfightsouth/_path/index" */))
const _ecc986be = () => interopDefault(import('../pages/football/_path/index.vue' /* webpackChunkName: "pages/football/_path/index" */))
const _d9787ea0 = () => interopDefault(import('../pages/muaythai/_path/index.vue' /* webpackChunkName: "pages/muaythai/_path/index" */))
const _6f4e592e = () => interopDefault(import('../pages/snooker/_path/index.vue' /* webpackChunkName: "pages/snooker/_path/index" */))
const _6c9fdbfe = () => interopDefault(import('../pages/takraw/_path/index.vue' /* webpackChunkName: "pages/takraw/_path/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/autherror",
    component: _6741ae54,
    name: "autherror"
  }, {
    path: "/iperrorpopup",
    component: _18040547,
    name: "iperrorpopup"
  }, {
    path: "/login",
    component: _92b87c46,
    name: "login"
  }, {
    path: "/popup",
    component: _0f382cc0,
    name: "popup"
  }, {
    path: "/results",
    component: _6e5858ea,
    name: "results"
  }, {
    path: "/rules",
    component: _bd10b72a,
    name: "rules"
  }, {
    path: "/sports",
    component: _edb59c8a,
    name: "sports"
  }, {
    path: "/tvpop",
    component: _1660cc03,
    name: "tvpop"
  }, {
    path: "/tvpopiframe",
    component: _bd4b3f32,
    name: "tvpopiframe"
  }, {
    path: "/favorite/basketball",
    component: _676f2d0c,
    name: "favorite-basketball"
  }, {
    path: "/favorite/bullfight",
    component: _2d7ccce6,
    name: "favorite-bullfight"
  }, {
    path: "/favorite/cockfight",
    component: _84fb8d76,
    name: "favorite-cockfight"
  }, {
    path: "/favorite/cockfightsouth",
    component: _5c6a6b58,
    name: "favorite-cockfightsouth"
  }, {
    path: "/favorite/football",
    component: _bc86d118,
    name: "favorite-football"
  }, {
    path: "/favorite/muaythai",
    component: _e9110bfa,
    name: "favorite-muaythai"
  }, {
    path: "/favorite/snooker",
    component: _10ef7146,
    name: "favorite-snooker"
  }, {
    path: "/favorite/takraw",
    component: _b2a8ddde,
    name: "favorite-takraw"
  }, {
    path: "/",
    component: _2607c274,
    name: "index"
  }, {
    path: "/basketball/:path",
    component: _52df54f9,
    name: "basketball-path"
  }, {
    path: "/bullfight/:path",
    component: _66067f6e,
    name: "bullfight-path"
  }, {
    path: "/cockfight/:path",
    component: _46df9628,
    name: "cockfight-path"
  }, {
    path: "/cockfightsouth/:path",
    component: _82a48276,
    name: "cockfightsouth-path"
  }, {
    path: "/football/:path",
    component: _ecc986be,
    name: "football-path"
  }, {
    path: "/muaythai/:path",
    component: _d9787ea0,
    name: "muaythai-path"
  }, {
    path: "/snooker/:path",
    component: _6f4e592e,
    name: "snooker-path"
  }, {
    path: "/takraw/:path",
    component: _6c9fdbfe,
    name: "takraw-path"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
