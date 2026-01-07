<template>
  <div>
    <center-match-table-single-tdfootball v-if="type == 'football' || type == 'basketball'" :mockdata="mockdata" :type="type" :live="live" :displaytable="displaytable" :lang="lang"></center-match-table-single-tdfootball>

    <center-match-table-tdmpyzoo v-if="type == 'muaythai' || type == 'cockfight' || type == 'bullfight'" :mockdata="mockdata" :type="type" :live="live" :displaytable="displaytable" :lang="lang"></center-match-table-tdmpyzoo>

  </div>
</template>

<script>
export default {
  props: ["displaytable", "live", "mockdata", "type","lang"],
  data() {
    return {
      arrayFailed: []
    };
  },
  methods: {
    checkRelode(){
      this.$emit('refresh')
      this.arrayFailed = this.mockdata
    }
  },
  created() {
    this.arrayFailed = this.mockdata
  }
};
</script>

<style scoped>
.card-header {
  padding: 0px;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  border: 0px;
}
.none-border {
  border-right: 0px solid;
  border-top: 0px solid;
  border-bottom: 0px solid;
  border-left: 1px solid #dde1ef;
}
</style>
