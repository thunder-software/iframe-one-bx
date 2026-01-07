import Vue from 'vue'

const Lang = {
  install(Vue) {
    Vue.mixin({
      methods: {
        transname(th, en) {
          return th == '' ? en : th
        }
      }
    })
  }
}

Vue.use(Lang)