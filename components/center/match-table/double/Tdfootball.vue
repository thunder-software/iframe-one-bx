<template>
  <div>
    <b-card-body class="p-0 mb-4" >
      <b-table-simple
        small
        striped
        hover
        bordered
        v-for="(groupleague, i) in mockdata"
        :key="i"
        class="text-center rounded m-0"
        :class="live ? 'table-live' : 'table-notlive'"
      >
        <b-thead :class="i == 0 ? '' : 'hidden'">
          <b-tr>
            <b-th rowspan="2" class="align-middle w-18">
              <small class="font-semibold">{{trans("content.time")}}</small>
            </b-th>
            <b-th rowspan="2" class="align-middle" style="width: 28rem;">
              <small class="font-semibold">{{ trans("content.event")}}</small>
            </b-th>
            <b-th colspan="4" class="none-border">
              <small class="font-semibold">{{ trans("content.fulltimeonly")}}</small>
            </b-th>

            <b-th colspan="4" style="border: 0px">
              <small class="font-semibold">{{ trans("content.halftimeonly")}}</small></b-th
            >
          </b-tr>
          <b-tr>
            <b-th class="w-18" colspan="2"
              ><small class="font-semibold">{{ trans("content.fulltimeonly")}}</small></b-th
            >
            <b-th class="w-14" colspan="2">
              <div>
                <small class="font-semibold">{{ trans("content.over") }}/{{ trans("content.under")}}</small>
              </div>
            </b-th>

            <b-th class="w-14" colspan="2"
              ><small class="font-semibold">{{ trans("content.fulltimeonly")}}</small></b-th
            >
            <b-th class="w-14" colspan="2"
              ><small class="font-semibold">{{ trans("content.over") }}/{{ trans("content.under")}}</small></b-th
            >
          </b-tr>
        </b-thead>

        <b-tbody v-for="(league, order) in groupleague.m" :key="order" :class="fontsize(displaytable.fontSize)">
          <b-tr v-if="order == 0" v-b-toggle="`collapse-${groupleague.k}`">
            <b-td
              colspan="14"
              class="text-left"
              :class="live ? 'td-live' : 'td-notlive'"
              style="height: 27px;"
            >
              <div class="flex">
                <div class="flex-1">
                  <span class="pl-2">{{lang == "th" ?  groupleague.nn.th : groupleague.nn.en}}</span>
                  <b-badge variant="light">{{ groupleague.m.length }}</b-badge>
                </div>
                <div class="flex text-right pr-2">
                  <span>
                    <b-icon
                      icon="arrow-counterclockwise"
                      style="color: blue;"
                    ></b-icon>
                  </span>
                </div>
              </div>
            </b-td>
          </b-tr>

          <b-tr style="border: 0px">
            <b-td colspan="14" style="border: 0px">
              <b-collapse
                visible
                :id="`collapse-${groupleague.k}`"
                class="w-full"
              >
                <b-table-simple
                  small
                  striped
                  hover
                  bordered
                  v-for="(score, index) in league[liveIs]"
                  :key="index"
                  style="border: 0px"
                  class="m-0"
                  :class="live ? 'table-live' : 'table-notlive'"
                >
                  <b-tbody>
                    <b-tr>
                      <b-td class="align-top w-14" style="height: 40px;" rowspan="2">
                        <center-match-table-column-time
                          :live="true"
                        ></center-match-table-column-time>
                      </b-td>
                      <b-td class="align-top text-left pl-2" rowspan="2">
                        <center-match-table-column-name
                          :displaytable="displaytable"
                          :league="league"
                          :lang="lang"
                        ></center-match-table-column-name>
                      </b-td>
                      
                      <b-td class="text-primary w-14">
                        <center-match-table-column-score
                          :score="score.ah.a"
                        ></center-match-table-column-score>
                      </b-td>
                      <b-td class="w-14">
                        <center-match-table-column-price
                          :score="score.ah.ap"
                          :data="league"
                          :namematch="groupleague.nn"
                          type="football"
                        ></center-match-table-column-price>
                      </b-td>
                      <b-td class="text-primary w-14">
                        <center-match-table-column-score
                          :score="score.ah.a"
                        ></center-match-table-column-score>
                      </b-td>
                      <b-td class="w-14">
                        <center-match-table-column-price
                          :score="score.ah.ap"
                          :data="league"
                          :namematch="groupleague.nn"
                          type="football"
                        ></center-match-table-column-price>
                      </b-td>
                      <b-td class="text-primary w-14">
                        <center-match-table-column-score
                          :score="score.ah.a"
                        ></center-match-table-column-score>
                      </b-td>
                      <b-td class="w-14">
                        <center-match-table-column-price
                          :score="score.ah.ap"
                          :data="league"
                          :namematch="groupleague.nn"
                          type="football"
                        ></center-match-table-column-price>
                      </b-td>
                      <b-td class="text-primary w-14">
                        <center-match-table-column-score
                          :score="score.ah.a"
                        ></center-match-table-column-score>
                      </b-td>
                      <b-td class="w-14">
                        <center-match-table-column-price
                          :score="score.ah.ap"
                          :data="league"
                          :namematch="groupleague.nn"
                          type="football"
                        ></center-match-table-column-price>
                       
                      </b-td>
                    </b-tr>
                    <b-tr>
                      <b-td class="text-primary w-14">
                        <center-match-table-column-score
                          :score="score.ah.a"
                        ></center-match-table-column-score>
                      </b-td>
                      <b-td class="w-14">
                        <center-match-table-column-price
                          :score="score.ah.ap"
                          :data="league"
                          :namematch="groupleague.nn"
                          type="football"
                        ></center-match-table-column-price>
                      </b-td>
                      <b-td class="text-primary w-14">
                        <center-match-table-column-score
                          :score="score.ah.a"
                        ></center-match-table-column-score>
                      </b-td>
                      <b-td class="w-14">
                        <center-match-table-column-price
                          :score="score.ah.ap"
                          :data="league"
                          :namematch="groupleague.nn"
                          type="football"
                        ></center-match-table-column-price>
                      </b-td>
                      <b-td class="text-primary w-14">
                        <center-match-table-column-score
                          :score="score.ah.a"
                        ></center-match-table-column-score>
                      </b-td>
                      <b-td class="w-14">
                        <center-match-table-column-price
                          :score="score.ah.ap"
                          :data="league"
                          :namematch="groupleague.nn"
                          type="football"
                        ></center-match-table-column-price>
                      </b-td>
                      <b-td class="text-primary w-14">
                        <center-match-table-column-score
                          :score="score.ah.a"
                        ></center-match-table-column-score>
                      </b-td>
                      <b-td class="w-14">
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
              </b-collapse>
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

 created(){
    
  }
};
</script>

<style></style>
