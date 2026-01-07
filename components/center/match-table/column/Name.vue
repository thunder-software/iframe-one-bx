<template>
  <div>
    <div v-if="displaytable.lineType == 'SingleLine' || displaytable.lineType == 'DoubleLine' ">
     
      <span class="block text-danger">{{lang == "th" ? league.n.th.a : league.n.en.a}}</span>
      <span class="block">{{lang == "th" ? league.n.th.h : league.n.en.h}}</span>
    </div>
        <div v-if="displaytable.lineType == 'FulltimeOnly' || displaytable.lineType == 'HalftimeOnly'">
      <span class="text-danger"> {{lang == "th" ? league.n.th.a : league.n.en.a}}</span>
      <span class="px-2">vs</span>
      <span class="">{{lang == "th" ? league.n.th.h: league.n.en.h}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["league", "displaytable","lang"],
  created() {
   
    
  },
};

</script>