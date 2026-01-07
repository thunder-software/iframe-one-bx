<template>
  <table
    small
    striped
    hover
    bordered
    class="text-center rounded m-0"
    style="border: 0px; width: 100%"
    :class="tableClass(status)"
  >
    <div is="center2-match-table2-headtable" :status="status"></div>
    <div
      :is="tableStatus(status)" 
      v-for="(groupleague, order) in setData"
      :key="order"
      :status="status"
      :displaytable="getselectleague"
      :groupleague="groupleague.data"
      @fetch="$emit('fetchGetData')"
      @CollapseBet="$emit('CollapseBet')"
    ></div>
  </table>
</template>

<script>
export default {
    props : ['setData','getselectleague','status'],
    methods: {
        tableClass(status){
        if(status == 'live'){
          return "table-live"
        }else if(status == "nonLive"){
          return "table-notlive"
        }else if(status == "early"){
          return "table-early"
        }
      },
      tableStatus(status){
        if(status == 'live'){
          return "center2-match-table2-fulltime-live"
        }else if(status == "nonLive"){
          return "center2-match-table2-fulltime-nonlive"
        }else if(status == "early"){
          return "center2-match-table2-fulltime-early"
        }
      },
    },
};
</script>

<style>
</style>