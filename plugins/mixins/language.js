import Vue from "vue";
import _ from 'lodash';

import { mapGetters } from "vuex";

const Language = {
  install(Vue, options) {
    Vue.mixin({
      computed: {
        ...mapGetters("language", ["dictionary", "langs"]),
        keyLang(){
          console.log('this.langs',this.langs);
          if(this.langs == 'th'){
            return ''
          }else{
            return '_'+this.langs
          }
            // return this.langs != "th" ? '_en' : '';
        },
        _keyLang(){
          // return this.langs != "th" ? '_en' : '_th';
          return '_'+this.langs
      }
      },
      methods: {
        trans(key) {
          return _.get(this.dictionary, key, key);
        },
      },
    });
  },
};

Vue.use(Language);
