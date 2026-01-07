<template>
  <div>
    <div is="center2-match-table-newline-tables" type_nonlive="nonlive" v-if="displaytable.lineType == 'SingleLine' || displaytable.lineType == 'DoubleLine'"  :loading="loading" :setData="setData" :status="status" @fetch="$emit('fetch')" :displaytable="displaytable" @MoreBet="$emit('MoreBet', $event)" @CollapseBet="$emit('MoreCollapse', $event)"></div>
    <div is="center2-match-table-fulltime-tables" type_nonlive="nonlive" v-if="displaytable.lineType == 'FulltimeOnly'" :loading="loading" :setData="setData" :status="status" @fetch="$emit('fetch')" :displaytable="displaytable" @CollapseBet="$emit('MoreCollapse', $event)"></div>
    <div is="center2-match-table-halftime-tables" type_nonlive="nonlive" v-if="displaytable.lineType == 'HalftimeOnly'" :loading="loading" :setData="setData" :status="status" @fetch="$emit('fetch')" :displaytable="displaytable" @CollapseBet="$emit('MoreCollapse', $event)"></div>

  </div>
</template>

<script>
export default {
    props : ["loading" , "setData" , "status" , "displaytable"],
};
</script>