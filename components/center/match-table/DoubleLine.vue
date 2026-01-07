<template>
  <div>
    <center-match-table-double-tdfootball v-if="type == 'football' || type == 'basketball'" :mockdata="mockdata" :type="type" :live="live" :displaytable="displaytable" :lang="lang"></center-match-table-double-tdfootball>

    <center-match-table-tdmpyzoo v-if="type == 'muaythai' || type == 'cockfight' || type == 'bullfight'" :mockdata="mockdata" :type="type" :live="live" :displaytable="displaytable" :lang="lang"></center-match-table-tdmpyzoo>


    <!-- <div v-for="(groupleague, i) in mockdata.data.result" :key="i">
      <b-row v-if="i == 0">
        <b-col cols="3" class="mb-3">
          <center-title :type="type" :live="live"></center-title>
        </b-col>
        <b-col cols="9" class="text-right">
          <center-select-league-button></center-select-league-button>
        </b-col>
      </b-row>
      <b-card
        class="mt-0 mb-3 h-full"
        no-body
        style="border: 0px solid; background: none"
      >
        <template #header>
          <center-match-table-header
            :groupleague="groupleague"
            :type="type"
            :live="live"
          ></center-match-table-header>
        </template>

        <center-match-table-double-tdfootball
          v-if="type == 'football' || type == 'basketball'"
          :groupleague="groupleague"
          :type="type"
          :live="live"
          :displaytable="displaytable"
        ></center-match-table-double-tdfootball>
        <center-match-table-tdmpyzoo
          v-if="
            type == 'muaythai' || type == 'cockfight' || type == 'bullfight'
          "
          :groupleague="groupleague"
          :type="type"
          :live="live"
          :displaytable="displaytable"
        ></center-match-table-tdmpyzoo>
      </b-card>
    </div> -->
  </div>
</template>

<script>

export default {
  props: ["displaytable", "live", "mockdata", "type" ,"lang"]
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
