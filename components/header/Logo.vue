<template>
  <div>
    <!-- layouts > Header > Logo -->
    <div>
      <!-- <b-img class="logo-img" src="/icon-lsm.png"></b-img>
      <h5 class="pt-3 mt-1" style="margin-left: 70px;">
        LSM99-SPORT
      </h5> -->
      <b-img class="logo-img" src="/One_All_Sports.png" v-if="!whitelabel"></b-img>
      <b-img class="logo-img" :src="'/'+whitelabel+'.png'" v-if="whitelabel"></b-img>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      whitelabel : localStorage.getItem('Whitelabel')
    }
  },
}
</script>

<style scoped>
.logo-img {
  display: block;
  width: 209px;
  height: auto;
  margin: auto;
}

.logo-ta {
  width: 84%;
  margin: auto;
  text-align: center;
}
</style>
