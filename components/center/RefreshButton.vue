<template>
  <button
    :disabled="loading"
    style="width: 50px; border: 1px solid silver !important; height: 31px;"
    @click.prevent="manualLoadData('start')"
    class="refresh p-1 btn btn-outline-warning btn-sm"
  >
    <!-- <b-icon icon="arrow-repeat" v-if="loading" animation="spin"></b-icon> -->
    <span style="vertical-align: middle;" class="block">
    <b-icon icon="arrow-repeat" font-scale="0.9" :animation="isloading == true ? 'spin' : ' '" style="color: #ffc107; vertical-align: middle;"></b-icon> {{ countDown }}</span></button>

</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["value", "loading", "refreshRate"],
  data() {
    return {
      timer: null,
      countDown: null,
      isloading: JSON.parse(this.loading),
    };
  },
  methods: {
    ...mapActions({
      fetchMenu: 'menu/fetchMenu'
    }),
    startAutoRefresh() {
      this.isloading = true;
      this.timer = setInterval(() => {
      this.countDown--;
        if (this.countDown <= 0) {
          this.$emit("input");
          this.countDown = this.refreshRate; 
          this.fetchMenu()
        }  
        this.isloading = false;
      }, 1000);  
    },
    manualLoadData(e) {
      clearInterval(this.timer);
      this.$emit("input" ,e); 
      this.fetchMenu()
      this.countDown = this.refreshRate;
      this.startAutoRefresh(); 
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  created() {
    this.countDown = this.refreshRate;
    this.startAutoRefresh();
  },
  watch : {
    loading(value){
      this.isloading = value
    }
  }
};
</script>
