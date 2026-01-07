<template>
  <div>
    <!-- layouts > SidebarRight -->
    <div is="sidebar-right-lastBet" v-if="statusLastBet" @closeBetAll="statusLastBet = false" />

    <!-- <b-icon v-else icon="caret-right-square-fill" title="เปิดการเดิมพันโดยรวม" class="open-ball"   @click="OpenAllbet()"></b-icon> -->
  </div>
</template>

<script>
import { mapActions,mapGetters } from "vuex";
export default {
  data() {
    return {
      statusLastBet : true
    }
  },
  computed: {
    ...mapGetters({
      getclosebetlist: "closebetlist/getclosebetlist",
    }),
  },
  created() {
    let check = localStorage.getItem('closeBetAll')
    if(check){
      this.statusLastBet = false
    }
  },
  methods: {
    ...mapActions({
      actionsclosebetlist: "closebetlist/actionsclosebetlist",
    }),
    OpenAllbet(){
      localStorage.removeItem('closeBetAll')
      this.statusLastBet = true
    }
  },
    watch:{
    getclosebetlist(value){
      if(value == false){
        this.statusLastBet = true
      }
    }
  }
}
</script>

<style scoped>
.open-ball {
    position: fixed;
    top: 25px;
    width: 20px;
    height: 100px;
    cursor: pointer;
    color: whitesmoke;
}
</style>
