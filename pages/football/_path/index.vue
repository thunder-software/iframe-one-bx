<template>
  <div>
    <!-- <layouts-ads style="margin-bottom: 0;" /> -->
    <!-- <ul>
      <li v-for="(company, index) in companiesLoaded" :key="index">
        {{ company }}
      </li>
    </ul>
    <button @click="loadMore">Load</button> -->
    <!-- <div is="center2-football"></div> -->
    <!-- <div is="center2-football"></div> -->

    <div is="center2-football2" v-if="selectRoute == '/football/today' || selectRoute == '/football/live' || selectRoute == '/football/all' || selectRoute == '/football/early'"></div>
    <div is="center2-football" v-if="selectRoute != '/football/today' && selectRoute != '/football/live' && selectRoute != '/football/all' && selectRoute != '/football/early'"></div>

    <!-- <div is="center2-football2" v-if="selectRoute != '/football/early'"></div>
    <div is="center2-football" v-if="selectRoute == '/football/early'"></div> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      companiesdb: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      length: 5,
    };
  },
  methods: {
    loadMore() {
      if (this.length > this.companiesdb.length) return;
      this.length = this.length + 3;
    },
  },
  computed: {
    selectRoute(){
      return this.$route.path.toString();
    },
    companiesLoaded() {
      return this.companiesdb.slice(0, this.length);
    },
  },
};
</script>