<template>
  <div>
    <div class="inline-block px-0">
      <b-button variant="warning" size="sm" @click="switchVersion()"
      style="border-radius: 20px; background:linear-gradient(to bottom, #ffec64 5%, #ffab23 100%);"
      > <b-img src="/icon/mobile.png" width="15" height="15" class="inline-block"></b-img> Mobile</b-button>
      <b-dropdown
        size="sm"
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
            <b-icon icon="caret-down-fill" style="vertical-align: middle;"></b-icon>
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
      </b-dropdown>
    </div>

    <div class="box-credit-2 text-secondary px-2">
      <!-- layouts > Header > UserCredit -->

      <b-overlay :show="loading" rounded="sm" spinner-variant="secondary " spinner-type="grow" spinner-small>
      <div class="inline-block" >
          <span
            class="style-options cursor-pointer"
            style="padding-top: 8px; font-size: 12px; color: #ffc107; font-weight: 700; ">
            <b-img src="/icon/user.png" style="width: 20px; display: inline-block;"></b-img>
            &nbsp;  {{balance.username}} <span class="text-white" style="font-weight: 200;">{{ $auth.user.currency }}</span>
          </span>
        </div>
      
      </b-overlay>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      loading : false,
      checklang: "th",
      lang: ["th", "en" ,'my','vn','cn','cnsp','lao','khmer', 'jp', 'kr', 'phil'],
    }
  },
  computed:{
    ...mapGetters({
      getuser : "user/getuser",
      balance: "balance/balance",
      getbetlist:"fetchbet/getbetlist",
    })
  },
  methods: {
    ...mapActions({
      fetchuser : "user/fetchuser",
      fetchBalance : "balance/fetchBalance",
      fetchLanguage: "language/fetchLanguage",
    }),
    async switchVersion() {
      try {
        return (window.location.href =
          "https://mobile.one-allsports.com/login?userToken=" +
          localStorage.getItem("pack"));
      } catch (error) {
        alert("wrong something");
      }
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
        return 'TH'
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
      }else if(text == 'jp'){
        return '日本'
      }else if(text == 'kr'){
        return '한국인'
      }else if(text == 'phil'){
        return 'Philippine'
      }else{
        return 'ប្រទេសកម្ពុជា'
      }
    },
  },
  async created (){
    // this.fetchBalance()
    this.getUserCredit() 
    setTimeout(() => {
        this.checklang = this.$auth.$storage.getUniversal("language");
      }, 300);
  },
  watch:{
    'getbetlist' : {
        handler(val){
            this.getUserCredit()
        },
        deep: true
    },
    checklang(val){
      this.ChangeLang(val)
    }
  }
}
</script>
<style scoped>
.list-sy{
  padding-top: 8px; 
  font-size: 14px;
  cursor :pointer;
  color : white;
}

.box-credit-2 {
    border: 0.5px solid #e2e8f254;
    border-radius: 8px;
    width: auto;
    height: 29px;
    text-align: center;
    display: inline-block;
    padding-top: 0px;
    margin-top: 12px;
}

.menu-language {
  font-size: 14px;
  display: block;
  color: white;
  padding: 2px 8px;
  border: 1px solid #e2e8f254;
  border-radius: 8px;
}
/* .list-sy :hover{
  padding-top: 8px; 
  font-size: 14px;
  cursor :pointer;
  color: #fcbf3e
} */
</style>
