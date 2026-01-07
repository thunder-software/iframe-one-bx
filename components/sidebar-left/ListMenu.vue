<template>
  <b-collapse
    :id="`collapse-${item.name}`"
    accordion="my-accordion"
    role="tabpanel"
    :visible="item.visible"
  >
    <b-card-body class="py-0 px-2">
      <!-- :class=" index > 3 && !checkpath(path) ? 'hidden' : ''" -->
      <div
        class="flex py-1 px-2 cursor-pointer list-menu"
        v-for="(type, index) in listmenu"
        @click="linkpath(type , index)"
        :key="index"
      >
        <div class="flex-1" style="color: #898989;">
          <span class="">{{   listmenu[index]['name'+keyLang] }}</span>
        </div>
        <div class="flex-1 text-right">
          <span class="" 
          style="padding: 3px 3px 3px 3px;
          background-color: #0000000A;
          color: #ffc107;
          border-radius: 3px;"
          > {{ qtyAmount(index) }} </span>
        </div>
      </div>
    </b-card-body>
  </b-collapse>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["lang", "item", "i" , "path"],
  data() {
    return {
      listmenu : [
        {
          name : 'ไลฟ์สด',
          name_en : 'live',
          name_my : 'နေထိုင်ပါ။',
          name_vn : 'Sống',
          name_tv : 'Sống',
          name_cn : '居住',
          name_cnsp : '居住',
          name_lao : 'ດໍາລົງຊີວິດ',
          name_khmer : 'រស់នៅ',
          name_kr : '생방송',
          name_jp : '新鮮な',
          name_phil : 'live',
        },
        {
          name : 'วันนี้',
          name_en : 'today',
          name_my : 'ဒီနေ့',
          name_vn : 'Hôm nay',
          name_tv : 'Hôm nay',
          name_cn : '今天',
          name_cnsp : '今天',
          name_lao : 'ມື້​ນີ້',
          name_khmer : 'ថ្ងៃនេះ',
          name_kr : '오늘',
          name_jp : '今日',
          name_phil : 'Ngayon',
        },
        {
          name : 'สเต็ป',
          name_en : 'step',
          name_my : 'အဆင့်',
          name_vn : 'bước chân',
          name_tv : 'bước chân',
          name_cn : '步',
          name_cnsp : '步',
          name_lao : 'step',
          name_khmer : 'step',
          name_kr : '단계',
          name_jp : 'ステップ',
          name_phil : 'Hakbang',
        },
        {
          name : 'มิกซ์พาร์เลย์',
          name_en : 'mixparlay',
          name_my : 'နန်းတော်ရောထွေး',
          name_vn : 'hỗn hợp',
          name_tv : 'hỗn hợp',
          name_cn : '混合過關',
          name_cnsp : '混合过关',
          name_lao : 'ປະສົມ parlay',
          name_khmer : 'លាយ parlay',
          name_kr : '믹스팔레이',
          name_jp : 'ミックスパーレー',
          name_phil : 'Mix Parlay',
        },
        {
          name : 'ล่วงหน้า',
          name_en : 'early',
          name_my : 'စောစော',
          name_vn : 'sớm',
          name_tv : 'sớm',
          name_cn : '早期的',
          name_cnsp : '早期的',
          name_lao : 'ຕົ້ນ',
          name_khmer : 'ដើម',
          name_kr : '미리',
          name_jp : 'あらかじめ',
          name_phil : 'Maaga',
        },
        ]
    }
  },
  methods: {
    ...mapActions({
      setBetinfo : "betinfo/setBetinfo"
    }),
    checkpath(link){
      if(link == 'basketball-path' || link == 'snooker-path'){
        return false
      }else{
        return true
      }
    },
    linkpath(type , index) {
      if(type.name_en == "step"){
        this.setBetinfo("step")
      }
      if(type.name_en == "mixparlay"){
        this.setBetinfo("mixparlay")
      }
      var football = this.item.route == '/football/all'  ? '/football/' + type.name_en : this.item.route
      var muaythai = this.item.route == '/muaythai/all'  ? '/muaythai/' + type.name_en : this.item.route
      var cockfight = this.item.route == '/cockfight/all'  ? '/cockfight/' + type.name_en : this.item.route
      var cockfightsouth = this.item.route == '/cockfightsouth/all'  ? '/cockfightsouth/' + type.name_en : this.item.route
      var bullfight = this.item.route == '/bullfight/all'  ? '/bullfight/' + type.name_en : this.item.route
      var basketball = this.item.route == '/basketball/all'  ? '/basketball/' + type.name_en : this.item.route
      var snooker = this.item.route == '/snooker/all'  ? '/snooker/' + type.name_en : this.item.route
      var takraw = this.item.route == '/takraw/all'  ? '/takraw/' + type.name_en : this.item.route
      if(this.item.route == '/football/all'){
        this.$emit('linksport' , 'football-path')
        this.$router.push({ path: football, query: {s: 'side-menu'} });
      }else if(this.item.route == '/muaythai/all'){
        this.$emit('linksport' , 'muaythai-path')
        this.$router.push({ path: muaythai, });
      }else if(this.item.route == '/cockfightsouth/all'){
        this.$emit('linksport' , 'cockfightsouth-path')
        this.$router.push({ path: cockfightsouth, });
      }else if(this.item.route == '/cockfight/all'){
        this.$emit('linksport' , 'cockfight-path')
        this.$router.push({ path: cockfight, });
      }else if(this.item.route == '/bullfight/all'){
        this.$emit('linksport' , 'bullfight-path')
        this.$router.push({ path: bullfight, });
      }else if(this.item.route == '/basketball/all'){
        this.$emit('linksport' , 'basketball-path')
        this.$router.push({ path: basketball, query: {s: 'side-menu'} });
      }else if(this.item.route == '/snooker/all'){
        this.$emit('linksport' , 'snooker-path')
        this.$router.push({ path: snooker, query: {s: 'side-menu'} });
      }else if(this.item.route == '/takraw/all'){
        this.$emit('linksport' , 'takraw-path')
        this.$router.push({ path: takraw, });
      }

    },
     qtyAmount(i){
      if(i == 0){
         return this.item.qty_live
      }else if(i == 1){
        return this.item.qty_today 
      }else if(i == 2){
        return this.item.qty_step
      }else if(i == 3){
        return this.item.qty_mix
      }else if(i == 4){
        return this.item.qty_early
      }
     }
  }
};
</script>

<style scoped>
.flex.py-1.px-2.cursor-pointer.list-menu:hover {
    background: #000000;
    border-radius: 6px;
}
.bg-at {
  background: linear-gradient(to bottom, #89c403 5%, #77a809 100%);
}

.list-menu {
  background: #00000005;
}
</style>
