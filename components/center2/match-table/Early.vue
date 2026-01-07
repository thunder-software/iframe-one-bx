<template>
  <div>
    <div is="center2-match-table-newline-tables" v-if="displaytable.lineType == 'SingleLine' || displaytable.lineType == 'DoubleLine'" type_nonlive="nonlive" :loading="loading" :setData="setData" :status="status" @fetch="$emit('fetch')" :displaytable="displaytable" @MoreBet="$emit('MoreBet', $event)" @CollapseBet="$emit('MoreCollapse', $event)"></div>
    <div is="center2-match-table-fulltime-tables" v-if="displaytable.lineType == 'FulltimeOnly'" :loading="loading" :setData="setData" type_nonlive="nonlive" :status="status" @fetch="$emit('fetch')" :displaytable="displaytable" @CollapseBet="$emit('MoreCollapse', $event)"></div>
    <div is="center2-match-table-halftime-tables" v-if="displaytable.lineType == 'HalftimeOnly'" :loading="loading" :setData="setData" type_nonlive="nonlive" :status="status" @fetch="$emit('fetch')" :displaytable="displaytable" @CollapseBet="$emit('MoreCollapse', $event)"></div>
    <!-- <center2-match-table-single-tables v-if="displaytable.lineType == 'SingleLine'" :loading="loading" :setData="setData" :status="status" @fetch="$emit('fetch')" :displaytable="displaytable" @MoreBet="$emit('MoreBet', $event)"></center2-match-table-single-tables>
    <center2-match-table-double-tables v-if="displaytable.lineType == 'DoubleLine'" :loading="loading" :setData="setData" :status="status" @fetch="$emit('fetch')" :displaytable="displaytable"></center2-match-table-double-tables>
    <center2-match-table-fulltime-tables v-if="displaytable.lineType == 'FulltimeOnly'" :loading="loading" :setData="setData" :status="status" @fetch="$emit('fetch')" :displaytable="displaytable"></center2-match-table-fulltime-tables>
    <center2-match-table-halftime-tables v-if="displaytable.lineType == 'HalftimeOnly'" :loading="loading" :setData="setData" :status="status" @fetch="$emit('fetch')" :displaytable="displaytable"></center2-match-table-halftime-tables> -->
  </div>
</template>

<script>
export default {
    props : ["loading" , "setData" , "status" , "displaytable"],
};
</script>