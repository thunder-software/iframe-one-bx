<template>
  <div>

    <div>
      <div style="width: 16%; padding-top: 7px; display: inline-block; vertical-align: top; text-align: center; padding-left: 7px;">

        <b-overlay :show="loading" rounded="sm" spinner-variant="secondary " spinner-type="grow" spinner-small class="inline-block">
            <div class="inline-block ">
              <span class="list-sy text-white" style="font-size: 12px; font-weight: 700;">
                &nbsp; <my-format-price v-if="balance.balance" style="color: white;"  :value="balance.balance" :decimal="2"></my-format-price>
                <span style="font-size: 17px !important;">
                  <b-icon
                    @click="getUserCredit()" 
                    :animation="loading ? 'spin' : ''"
                    icon="arrow-repeat"
                    style="margin-top: 3px;"
                  ></b-icon>
                </span>
              </span>
            </div>
          </b-overlay>
      </div>
      <div style="width: 37%; padding-top: 5px; display: inline-block; vertical-align: top;">
        <div class="flex" style="padding-left: 27px;">
          <div class="flex mr-1">
            <button
              class="pr-2 cursor-pointer button-st btn-sm"
              style="padding-top: 1px;"
              v-b-modal.menubar-announce-table
            >
              <b-icon icon="card-list" class="mr-1">&nbsp;</b-icon>
            <span>{{ trans("header.announcement") }}</span>
            </button>
            </div>
            <div class="flex">
              <button
                class="pr-2 cursor-pointer button-st btn-sm"
                style="padding-top: 1px;"
                @click="linkresults()"
              >
                <b-icon icon="markdown" class="mr-1">&nbsp;</b-icon>
                <span>{{ trans("header.results") }}</span>
              </button>
            </div>
            <div class="flex pl-2">
              <span style="vertical-align: initial ; display: inline-block; padding-top: 4px;">
                <b-form-checkbox v-model="checked" name="check-button" size="sm" variant="warning" switch>
                  {{ trans("header.quickbet") }}
                </b-form-checkbox>
              </span>
            </div>
          </div>
        </div>
      <div style="width: 44%;padding-top: 6px;display: inline-block;vertical-align: text-bottom; text-align: right;">
        <span class="text-sm">
          <nuxt-link :to="{ path: '/football/today', query: {s: 'top-menu',t:'today'} }" class="nuxt-link">{{ trans("header.today") }}</nuxt-link>
          <nuxt-link :to="{ path: '/football/step', query: {s: 'top-menu'} }" class="nuxt-link"><span @click="linkmenu('step')">{{ trans("header.step") }}</span></nuxt-link>
          <nuxt-link :to="{ path: '/football/mixparlay', query: {s: 'top-menu'} }" class="nuxt-link"><span @click="linkmenu('mixparlay')">{{ trans("header.mixparlay") }}</span></nuxt-link>
          <nuxt-link :to="{ path: '/muaythai/all', query: {s: 'top-menu',t:'muaythai'} }" class="nuxt-link">{{ trans("header.muaythai") }}</nuxt-link>
        </span>
        <span class=" text-white">|</span>
        <div is="header-menu-right" class="inline-block" iframe="1"></div>



        <!-- <b-dropdown
          size="lg"
          variant="link"
          class="p-0"
          toggle-class="text-decoration-none"
          no-caret
        >
          <template #button-content>
            <span class="menu-language">
              <b-img
                :src="flagimg(checklang)"
                class="inline-block"
                style="width: 23px"
              />
              {{ UpperCase(checklang) }}

              <b-icon icon="caret-down-fill"></b-icon>
            </span>
          </template>
          <b-dropdown-item
            @click="ChangeLang(items)"
            v-for="items in lang"
            :key="items"
          >
            <div>
              <b-img
                :src="flagimg(items)"
                class="inline-block"
                style="width: 23px"
              />
              {{ UpperCase(items) }}
            </div>
          </b-dropdown-item>
        </b-dropdown> -->
      </div>
    </div>

    <b-modal
      id="menubar-announce-table"
      size="lg"
      hide-footer
      no-close-on-backdrop
    >
      <div class="modal-header">
        <h5 class="modal-title p-3">
          {{ trans("header.announcement") }}
        </h5>
      </div>
      <div class="modal-body">
        <div is="menubar-announce-table"></div>
      </div>
    </b-modal>

    <b-modal id="results" hide-footer size="xl">
      <div is="menubar-results2-table"></div>
    </b-modal>
</div>
</template>
<script>
import moment from "moment";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      localTime: " ",
      checked : false,
      checklang: "th",
      lang: ["th", "en" ,'my','vn','cn','cnsp','lao','khmer'],
      path: this.$route.path,
      loading : false
    }
  },
  computed:{
    ...mapGetters({
      getuser : "user/getuser",
      balance: "balance/balance",
      getbetlist:"fetchbet/getbetlist",
    })
  },

  mounted() {
    this.showLocaleTime();
  },
  methods: {
    ...mapActions({
      actionsQuickbet : "quickbet/actionsQuickbet",
      fetchLanguage: "language/fetchLanguage",
      fetchuser : "user/fetchuser",
      fetchBalance : "balance/fetchBalance",
      setBetinfo : "betinfo/setBetinfo"
    }),
    linkmenu(type){
      this.setBetinfo(type)
    },
    linkpath(path) {
        this.$router.push({ path: path })
        this.path = path
        setTimeout(() => {
          this.$emit('activePath', path)
        }, 500);
      },
      async getUserCredit(){
      this.loading = true
       await this.fetchBalance();
      this.loading = false
    },
    flagimg(item){
      return '/icon/'+item+'.png'
    },
    async ChangeLang(lang) {
      if (this.checklang != lang) {
        this.checklang = lang;
         await this.$axios.post('change-language',{lang: this.checklang});
         this.$auth.$storage.setUniversal("language", this.checklang);
         await this.fetchLanguage(this.checklang);
      }
    },
    UpperCase(text) {
      if(text == 'th'){
        return 'ไทย'
      }else if(text == 'en'){
        return 'English'
      }else if(text == 'my'){
        return 'မြန်မာ'
      }else if(text == 'vn'){
        return 'Tiếng Việt'
      }else if(text == 'cn'){
        return '繁體中文'
      }else if(text == 'cnsp'){
        return '简体中文'
      }else if(text == 'lao'){
        return 'ລາວ'
      }else{
        return 'ប្រទេសកម្ពុជា'
      }
    },
    linkresults() {
      if(localStorage.getItem('iframe') == '1'){
        this.$bvModal.show('results')
      }else{
        window.open('/results', '_blank', 'width=768,height=1024')
      }
    },
    showLocaleTime() {
      var time = this;
      setInterval(() => {
        time.localTime = moment().format('Y-MM-DD HH:mm:ss')
        // var date = new Date();
          // date.getFullYear() +
          // "-" +
          // (date.getMonth() + 1) +
          // "-" +
          // date.getDate() +
          // " " +
          // date.getHours() +
          // ":" +
          // date.getMinutes() +
          // ":" +
          // date.getSeconds();
      }, 1000);
    }
  },
  watch : {
    checked(value){
      localStorage.setItem('quickbet' , value)
      this.$auth.$storage.setUniversal("quickbet",value)
      if(this.$route.params.path != 'step' && this.$route.params.path != 'mixparlay'){
        this.actionsQuickbet(value)
      }
    },
    checklang(val){
        this.ChangeLang(val)
    },
    'getbetlist' : {
      handler(val){
          this.getUserCredit()
      },
      deep: true
    },
  },
  created() {
    this.getUserCredit() 
    setTimeout(() => {
        this.checklang = this.$auth.$storage.getUniversal("language");
      }, 300);
     if(localStorage.getItem('quickbet') == 'false'){
       this.checked = false
       this.actionsQuickbet(false)
     }else{
       this.checked = true
       this.actionsQuickbet(true)
     }
  },
};
</script>

<style>
.custom-control-input:checked ~ .custom-control-label::before {
    color: #fff !important;
    border-color: #ffc107 !important;
    background: linear-gradient(180deg,#ffec64 5%,#ffab23) !important;
}
</style>
<style scoped>
.menu-language {
  font-size: 14px;
  margin: -3px 0 0 -9px;
  display: block;
  color: white;
}
.modal-body {
  position: relative;
  flex: 1 1 auto;
  padding: 1rem;
  background: #ffffff;
}
.modal-header {
  background: white;
  border-bottom: 1px solid #dee2e6;
}
.modal-content {
  background: white;
}
.button-st{
  text-align: center;
  border: 1.5px double #ffffff;
  background: none;
  height: 27px;
  margin-top: 2px;
  border-radius: 5px;

}
a.nuxt-link {
  background: linear-gradient(to bottom, #f9f9f9 5%, #e9e9e9 100%);
  display: inline-block;
  color: black;
  font-size: 14px;
  padding: 2px 7px;;
  border-radius: 5px;
  margin-right: 0px;
  border: 0.1px solid slategray;
}
a.nuxt-link:hover {
  text-decoration: none;
}
/* a.nuxt-link-active {
  font-weight: bold;
} */
a.nuxt-link-exact-active {
  color: black;
  border: 1.5px double black;
  background: linear-gradient(to bottom, #ffec64 5%, #ffab23 100%);
}
</style>
