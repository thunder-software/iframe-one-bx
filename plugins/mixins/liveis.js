import Vue from 'vue';

const LiveIs = {
    install(Vue, options) {
        Vue.mixin({
            computed: {
                liveIs(){
                  return this.live ? 'bpl' : 'bp'
                }
              },
        })
    }
}

Vue.use(LiveIs);