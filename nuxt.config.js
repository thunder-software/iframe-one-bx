export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ONE SPORT',
    htmlAttrs: {
      lang: 'en',
      translate : 'no'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icon-lsm.ico' },
      // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ]
  },
  target: 'static',

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/custom.scss',
    '@/assets/css/main.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/numbers',
    '~/plugins/mixins/convertdate', 
    '~/plugins/mixins/validation', 
    '~/plugins/mixins/liveis',
    '~/plugins/mixins/language',  
    '~/plugins/mixins/fontsize',
    '~/plugins/vue-clipboard2', 
    '~/plugins/perfect-scrollbar',
    '~/plugins/substring.js',
    '~/plugins/transname',
    // '~/plugins/socket.io.js',
    // { src: '~/plugins/ws.js', mode: 'client' },
    // { src: '~/plugins/echo.js', mode: 'client' },
    { src: '~/plugins/pusher.js', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/tailwindcss',
    // ['@nuxtjs/laravel-echo', {
    //   broadcaster: 'pusher',
    //   authModule: true,
    //   connectOnLogin: true,
    //   authEndpoint: process.env.API_URL,
    //   key: process.env.PUSHER_APP_KEY,
    //   forceTLS: true,
    //   cluster: 'ap1',
    //   encrypted: true,
    //   disableStats: true,
    // }],
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'bootstrap-vue/nuxt',
    '@nuxtjs/auth-next', 
    'vue-sweetalert2/nuxt',
  ],
  
  bootstrapVue: {
    icons: true,
    bootstrapCSS: false, 
    bootstrapVueCSS: false
  },
  
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_URL || 'https://api.stg.lsmsportsbook.com/api/member',
    credentials: true    
  },

  router: {
    base: '/'
    // middleware: ['auth', 'clearValidationErrors']
  },

  auth: {
    plugins: ['~/plugins/axios','~/plugins/fix-laravel-echo'],
    redirect: {
      login: '/login',
      logout: '/login',
      callback: false,
      home: false
    },    
    strategies: {
      'laravelSanctum': {
        provider: 'laravel/sanctum',
        url: process.env.API_URL ||  'https://api.stg.lsmsportsbook.com'
      },
      sanctumToken: {
        provider: 'laravel/jwt',
        url: process.env.API_URL || 'https://api.stg.lsmsportsbook.com',
        token: {
          property: 'token',
          global: true,
          // required: true,
          // type: 'Bearer'
        },
        user: {
          // property: 'user',
          // autoFetch: true
        },
        endpoints: {
          login: { url: '/login', method: 'post' },
          logout: { url: '/logout', method: 'post' },
          user: { url: '/user', method: 'get' },
          refresh: false,
        }
      }
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    cssSourceMap: false,
    extractCSS: true,
    terser: {
      // https://github.com/terser/terser#compress-options
      terserOptions: {
        compress: {
          drop_console: true
        }
      }
    },
    babel: {
      plugins: [
        [
          'component', {
            libraryName: 'maz-ui',
            styleLibraryName: 'css'
          }
        ]
      ]
    }    
  },
  ssr: false,
}
