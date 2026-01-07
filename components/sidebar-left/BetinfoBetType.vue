<template>
  <div class="mt-2" style="border-top-left-radius: 6px; border-top-right-radius: 6px; border-bottom-left-radius: 6px; border-bottom-right-radius: 6px;">
    <!-- layouts > SidebarLeft > SportBet -->
    <div class="flex text-center">
      <div class="flex-1">
        <button
          class="w-full btn-sm"
          :class="menu == false ? 'btn-at' : 'btn-menu'"
          style="border-top-right-radius: 0px; border-top-left-radius: 6px; padding: 7px 0px; font-weight: bold;"
          :style="!checkBorder ? 'border-bottom-left-radius: 6px;' : ''"
          @click="selectmenu(false)"
          >{{trans('header.single')}}</button>
      </div>
      <!-- <div class="flex-1">
        <button
          class="w-full btn-sm"
          :class="menu == true ? 'btn-at' : 'btn-menu'"
          style="border-top-right-radius: 6px; border-top-left-radius: 0px; padding: 7px 0px font-weight: bold;"
          :style="!checkBorder ? 'border-bottom-left-radius: 6px;' : ''"
          @click="selectmenu(true)"
          ><span>{{ type == 'mixparlay' ? trans('header.parlay') : trans("header.step") }}</span>  <span :class="menu ? '' : 'text-secondary'">({{dataMix.length}})</span> </button>
      </div> -->
    </div>
    <div class="hidden">{{ active_tab }}</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props : ['dataBet' , 'bettype' , 'dataMix'],
  data() {
    return {
      menu: false,
      type : 'mixparlay',
      checkBorder : false
    };
  },
  methods: {
    selectmenu(type) {
      this.menu = type;
      this.$emit("selecttabs", type);
    }
  },
  created() {
    if(this.$route.params.path == 'step'){
      this.type = 'step'
    }
    if(this.$route.params.path == 'mixparlay'){
      this.type = 'mixparlay'
    }
  },
  computed : {
    ...mapGetters({
      getInfo : "betinfo/getInfo",
      getbet : "tabbet/getbet",
      getmix : "tabmix/getmix"
    }),
    active_tab(){
        this.menu = this.bettype
        return this.bettype
    }
  },
  watch: {
    getInfo(value){
      console.log('valuevalue',value);
      this.type = value
    },
    getbet : {
      handler() {
      if(this.getbet.tab){
        this.checkBorder = true
      }else{
        this.checkBorder = false
      }
      },
      deep: true
      
    },
    getmix : {
      handler() {
        if(this.getmix.arrayParlay.length != 0 || this.getmix.arrayStep.length != 0){
         this.checkBorder = true
       }else{
         this.checkBorder = false
       }
      },
      deep: true
    }
  }
};
</script>

<style scoped>
.btn-menu {
    background: black;
    display: inline-block;
    color: rgba(194, 194, 194, 1);
    font-size: 14px;
    border: 0px solid;
    height: 100%;
    border-top-right-radius: 6px;
}

.btn-at {
    display: inline-block;
    background : #191919;
    color : #ffc107 ;
    font-size: 14px;
    border: 0px solid;
    border-top-left-radius: 6px !important;
    height: 35px;
}
</style>
