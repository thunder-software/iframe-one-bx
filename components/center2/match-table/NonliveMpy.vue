<template>
  <div>
    <div is="center2-match-table-fulltime-tables-muay" type_nonlive="nonlive" :muaythai="muaythai" :loading="loading" :setData="setData" :status="status" @fetch="$emit('fetch')" :displaytable="displaytable"></div>
  </div>
</template>

<script>
export default {
  data() {
      return {
          muaythai : false
      }
  },
  props : ["loading" , "setData" , "status" , "displaytable"],
  created() {
      if(this.$route.name == 'muaythai-path'){
      this.muaythai = true
  }
  },
};
</script>