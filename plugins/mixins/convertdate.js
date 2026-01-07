import Vue from 'vue';
import moment from "moment";
const Convertdate = {
    install(Vue, options) {
        Vue.mixin({
            methods: {
                convertdatetime(data) {
                  return moment(new Date(data)).format("YYYY-MM-DD HH:mm:ss");
                },
              },
        })
    }
}

Vue.use(Convertdate);