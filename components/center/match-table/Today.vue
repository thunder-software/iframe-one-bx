<template>
  <div>
    <center-match-table-single-line v-if="displaytable.lineType == 'SingleLine'" @refresh="$emit('refresh')" @filterleague="$emit('filterleague' , $event)"  :type="type" :mockdata="mockdata" :displaytable="displaytable"  :live="live" :lang="lang"></center-match-table-single-line>
    <center-match-table-fulltime-only v-if="displaytable.lineType == 'FulltimeOnly'" @refresh="$emit('refresh')" @filterleague="$emit('filterleague' , $event)"  :type="type" :mockdata="mockdata" :displaytable="displaytable"  :live="live" :lang="lang"></center-match-table-fulltime-only>
    <center-match-table-halftime-only v-if="displaytable.lineType == 'HalftimeOnly'" @refresh="$emit('refresh')" @filterleague="$emit('filterleague' , $event)"  :type="type" :mockdata="mockdata" :displaytable="displaytable"  :live="live" :lang="lang"></center-match-table-halftime-only>
    <center-match-table-double-line v-if="displaytable.lineType == 'DoubleLine'" @refresh="$emit('refresh')" @filterleague="$emit('filterleague' , $event)"  :type="type" :mockdata="mockdata" :displaytable="displaytable"  :live="live" :lang="lang"></center-match-table-double-line>
  </div>
</template>

<script>
export default {
    props: ["displaytable", "live", "mockdata" ,"type" , "displaytable","lang"],
  data() {
    return {
      arrayFailed: [],
    };
  },
  computed : {
  },
  watch: {
    displaytable: {
      handler() {
      },
      deep: true
    },
    mockdata: {
      handler() {
      },
      deep: true
    },
  },
};
</script>

<style scoped>
.none-border {
  border-right: 0px solid;
  border-top: 0px solid;
  border-bottom: 0px solid;
  border-left: 1px solid #dde1ef;
}
</style>
