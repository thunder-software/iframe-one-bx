<template>
  <!-- layouts > Header > SelectOption -->
  <div class="flex w-full">
    <!-- <div class="flex-1">
      <b-dropdown
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
      </b-dropdown>
    </div> -->
    <div class="flex">
      <span class="box-style-menu cursor-pointer text-white" style="display: flex; font-size: 13px;" @click="linkreR()">
        <b-icon icon="filter-circle-fill" style="margin-top: 3px"></b-icon>
        &nbsp; {{trans('header.rules')}}
      </span>
    </div>
    <!-- <div class="flex" v-if="!whitelabel">
      <b-button variant="" size="sm" class="style-buttom-1 mr-1" @click="switchVersion()" style="margin-top: 6px;margin-left: 10px; height: 28px;">
          <b-icon icon="phone" style="margin-top: 3px"></b-icon>
          <span style="vertical-align: top;">
            {{trans('header.mobileversion')}}
          </span>
        </b-button>
    </div>
    <div class="flex" v-if="!whitelabel">
      <b-button size="sm" @click="OpenTabSportV1()" class="pc mr-2" style="background: none;
        border-radius: 6px;
        padding: 0px 6px;
        height: 28px;
        margin-top: 6px;"><img src="/icon/football_none.png" class="mr-2 inline-block" style="width: 18px;"><span class="text-hot" style="vertical-align: middle;">{{ langs == 'th' ? 'เปิดหน้าต่างเวอร์ชั่นเก่า' : 'New Windows Old Version' }}</span></b-button>
    </div> -->
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      checklang: "th",
      lang: ["th", "en" ,'my','vn','cn','cnsp','lao','khmer'],
      whitelabel : localStorage.getItem('Whitelabel')
    };
  },
  methods: {
    ...mapActions({
      fetchLanguage: "language/fetchLanguage",
    }),
    async OpenTabSportV1(){
      let res = await this.$axios.get('/switchOldAndNew?new=f&device=1&lang='+this.checklang);
      console.log('resresresres',res.data.datas);
      // window.location.assign("https://newm.99lsm.com/launchsportold?cate=sport&keyProd=newsportbook&page=football")
      window.location.assign(res.data.datas.url)
    },
    async switchVersion() {

      // let res = await this.$axios.get('/switchOldAndNew?new=1&device=2&lang='+this.checklang);
      // console.log('resresresres',res.data.datas);
      // window.location.assign(res.data.datas.url)

       try {
         return (window.location.href =
           "https://mobile.one-allsports.com/login?userToken=" +
           localStorage.getItem("pack"));
       } catch (error) {
         alert("wrong something");
       }
    },
    linkreR() {
      window.open('/rules', '_blank', 'width=768,height=1024')
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
      // return text.toUpperCase();
    },
  },
  created() {
    // if (this.$auth.$storage.getUniversal("language") != null) {
    //   this.checklang = this.$auth.$storage.getUniversal("language");
    // }


    // if (this.$auth.$storage.getUniversal("language") == null) {
    //    this.fetchLanguage(this.checklang);
    //    this.$auth.$storage.setUniversal("language", "th");
    // } else {
      setTimeout(() => {
        this.checklang = this.$auth.$storage.getUniversal("language");
      }, 300);
    //  this.fetchLanguage(this.checklang);
    // }
  },
  watch:{
    checklang(val){
        this.ChangeLang(val)
      }
  }
};
</script>

<style scoped>
.menu-language {
  font-size: 14px;
  margin: -3px 0 0 -9px;
  display: block;
  color: #000000a6;
}

.box-style-menu {
    border: 0.5px solid #e2e8f254;
    border-radius: 8px;
    width: auto;
    height: 29px;
    text-align: center;
    display: inline-block;
    margin-top: 6px;
    padding: 4px 7px;
}

.style-buttom-1 {
  box-shadow: inset 0px 1px 0px 0px #f9eca0;
  background: linear-gradient(to bottom, #f0c911 5%, #f2ab1e 100%);
  background-color: #f0c911;
  border-radius: 6px;
  border: 0.5px solid #373737;
  display: inline-block;
  color: #373737;
  font-size: 15px;
  vertical-align: baseline;
  margin: 0px;
  padding: 1px 6px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #ded17c;
}
</style>
