<template>
  <table
    small
    striped
    hover
    bordered
    class="text-center rounded m-0"
    style="border: 0px; width: 100%"
    :class="tableClass('live')"
  >
    <div is="center2-match-table2-headtable"></div>
    <div
      is="center2-match-table-live2"
      v-for="(groupleague, order) in setDataLive3"
      :key="order"
      status="live"
      :displaytable="getselectleague"
      :groupleague="groupleague.data"
      @fetch="fetchGetData"
    ></div>
  </table>
</template>

<script>
export default {
  props: ["setDataLive3"],
  data() {
    return {};
  },
  methods: {
    tableClass(status) {
      if (status == "live") {
        return "table-live";
      } else if (status == "nonLive") {
        return "table-notlive";
      } else if (status == "early") {
        return "table-early";
      }
    },
  },
};
</script>

<style>
</style>