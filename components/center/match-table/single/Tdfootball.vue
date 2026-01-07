<template>
  <div>
    <b-card-body class="p-0 mb-4">
      <b-table-simple
        small
        striped
        hover
        bordered
        v-for="(groupleague, i) in setData"
        :key="i"
        class="text-center rounded m-0"
        style="border: 0px"
        :class="live ? 'table-live' : 'table-notlive'"
      >
        <b-thead :class="i == 0 ? '' : 'hidden'">
          <b-tr>
            <b-th rowspan="2" class="align-middle w-12">
              <small class="font-semibold">{{trans("content.time")}}</small>
            </b-th>
            <b-th rowspan="2" class="align-middle">
              <small class="font-semibold">{{trans("content.event")}}</small>
            </b-th>
            <b-th colspan="6" class="none-border">
              <small class="font-semibold">{{trans("content.fulltimeonly")}}</small>
            </b-th>

            <b-th colspan="6" style="border: 0px"> <small class="font-semibold">{{trans("content.halftimeonly")}}</small></b-th> 
          </b-tr>
          <b-tr>
            <b-th class="w-10"><small class="font-semibold">HDP</small></b-th>
            <b-th class="w-10">
              <div>
                <small class="font-semibold">{{trans("content.home")}}</small>
              </div>
            </b-th>
            <b-th class="w-10"><small class="font-semibold">{{lang == "th" ? "ทีมเยือน" : "Away"}}</small></b-th>
            <b-th class="w-10"><small class="font-semibold">{{lang == "th" ? "บอล" : "Goal"}}</small></b-th>
            <b-th class="w-10"><small class="font-semibold">{{lang == "th" ? "สูง" : "Over"}}</small></b-th>
            <b-th class="w-10"><small class="font-semibold">{{lang == "th" ? "ต่ำ" : "Under"}}</small></b-th>

            <b-th class="w-10"><small class="font-semibold"> {{lang == "th" ? "ราคา" : "Price"}}</small></b-th>
            <b-th class="w-10"><small class="font-semibold">{{lang == "th" ? "เจ้าบ้าน" : "Home"}}</small></b-th>
            <b-th class="w-10"><small class="font-semibold">{{lang == "th" ? "ทีมเยือน" : "Away"}}</small></b-th>
            <b-th class="w-10"><small class="font-semibold">{{lang == "th" ? "บอล" : "Goal"}}</small></b-th>
            <b-th class="w-10"><small class="font-semibold">{{lang == "th" ? "สูง" : "Over"}}</small></b-th>
            <b-th class="w-10"><small class="font-semibold">{{lang == "th" ? "ต่ำ" : "Under"}}</small></b-th>
          </b-tr>
        </b-thead>


        

        <b-tbody v-for="(league, order) in groupleague.m" :key="order" :class="fontsize(displaytable.fontSize)">
          <b-tr v-if="order == 0" v-b-toggle="`collapse-${groupleague.k}`">
            <b-td
              colspan="14"
              class="text-left"
              style="height: 27px;"
              :class="live ? 'td-live' : 'td-notlive'"
            >
              <div class="flex">
                <div class="flex-1">
                  <span class="pl-2">{{lang == 'th' ? groupleague.nn.th : groupleague.nn.en }} </span>
                  <b-badge variant="light">{{ groupleague.m.length }}</b-badge>
                </div>
                <div class="flex text-right pr-2">
                  <span class="pt-1">
                    <b-icon
                      icon="arrow-repeat"
                      style="color: blue"
                    ></b-icon>
                  </span>
                </div>
              </div>
            </b-td>
          </b-tr>
          <b-tr
            v-for="(score, index) in league[liveIs]"
            :key="index"
            style="border-top: 0px"
          >
            <b-td class="align-top w-12" style="height: 40px;">
              <center-match-table-column-time
                :live="live"
                v-if="order == index"
              ></center-match-table-column-time>
            </b-td>
            <b-td class="align-top text-left pl-2 w-60">
              <center-match-table-column-name
                :displaytable="displaytable"
                v-if="order == index"
                :league="league"
                :lang="lang"
              ></center-match-table-column-name>
            </b-td>
            <b-td class="text-primary w-10"
              ><center-match-table-column-score
                :score="score.ah.a"
              ></center-match-table-column-score
            ></b-td>
            <b-td class="w-10">
              <center-match-table-column-price
                :score="score.ah.ap"
                :data="league"
                :namematch="groupleague.nn"
                type="football"
              ></center-match-table-column-price>
            </b-td>
            <b-td class="w-10">
              <center-match-table-column-price
                :score="score.ah.ap"
                :data="league"
                :namematch="groupleague.nn"
                type="football"
              ></center-match-table-column-price>
            </b-td>
            <b-td class="text-primary w-10"
              ><center-match-table-column-score
                :score="score.ah.a"
              ></center-match-table-column-score
            ></b-td>
            <b-td class="w-10">
              <center-match-table-column-price
                :score="score.ah.ap"
                :data="league"
                :namematch="groupleague.nn"
                type="football"
              ></center-match-table-column-price>
            </b-td>
            <b-td class="w-10">
              <center-match-table-column-price
                :score="score.ah.ap"
                :data="league"
                :namematch="groupleague.nn"
                type="football"
              ></center-match-table-column-price>
            </b-td>
            <b-td class="text-primary w-10"
              ><center-match-table-column-score
                :score="score.ah.a"
              ></center-match-table-column-score
            ></b-td>
            <b-td class="w-10">
              <center-match-table-column-price
                :score="score.ah.ap"
                :data="league"
                :namematch="groupleague.nn"
                type="football"
              ></center-match-table-column-price>
            </b-td>
            <b-td class="w-10">
              <center-match-table-column-price
                :score="score.ah.ap"
                :data="league"
                :namematch="groupleague.nn"
                type="football"
              ></center-match-table-column-price>
            </b-td>
            <b-td class="text-primary w-10"
              ><center-match-table-column-score
                :score="score.ah.a"
              ></center-match-table-column-score
            ></b-td>
            <b-td class="w-10">
              <center-match-table-column-price
                :score="score.ah.ap"
                :data="league"
                :namematch="groupleague.nn"
                type="football"
              ></center-match-table-column-price>
            </b-td>
            <b-td class="w-10">
              <center-match-table-column-price
                :score="score.ah.ap"
                :data="league"
                :namematch="groupleague.nn"
                type="football"
              ></center-match-table-column-price>
            </b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
    </b-card-body>
  </div>
</template>

<script>
export default {
  props: ["mockdata", "type", "live", "displaytable","lang"],
  computed: {
    setData() {
      return this.mockdata;
    }
  },
  watch: {
    displaytable(value){
      console.log('value-----------------',value);
    }
  }
};
</script>

<style scoped></style>
