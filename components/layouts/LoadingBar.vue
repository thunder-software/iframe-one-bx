<template>
  <div v-if="loading" class="loading-page">
    <p style="display: flex; align-items: center; justify-content: center">
      <img class="image" src="/icon/loading.gif" alt="" width="250" height="250" />
      <!-- <img src="~/assets/img/logo.png" style="position: absolute;" alt="" width="50"> -->
    </p>
    &nbsp;&nbsp;&nbsp;<span> l o a d i n g ...</span>

    <!-- <div class="spinner-grow text-primary"></div>
    <div class="spinner-grow text-success"></div>
    <div class="spinner-grow text-danger"></div>
    <div class="spinner-grow text-warning"></div>
    <div class="spinner-grow text-info"></div>
    <div class="spinner-grow text-light"></div> -->
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
  }),
  methods: {
    start() {
      this.loading = true;
    },
    finish() {
        this.loading = false;
    },
  },
};
</script>

<style scoped>
.loading-page {
  position: fixed;
  /* top: 0px;
  left: 0;
  width: 100%;
  background: hsla(0, 0%, 100%, 0.8);
  text-align: center;
  padding-top: 424px;
  padding-bottom: 16rem; */
  z-index: 99;
  /* font-size: 30px; */
}

</style>