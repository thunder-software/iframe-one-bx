<template>
  <div>
    <b-card-body class="p-0 mb-4">
      <b-table-simple
        small
        striped
        hover
        v-for="(groupleague, i) in mockdata"
        :key="i"
        bordered
        class="text-center rounded m-0"
        style="border-top: 0px;"
        :class="live ? 'table-live' : 'table-notlive'"
      >
        <b-thead :class="i == 0 ? '' : 'hidden'">
          <b-tr>
            <b-th class="align-middle w-10">
              <small class="font-semibold">{{ trans("content.time") }}</small>
            </b-th>
            <b-th class="align-middle w-60">
              <small class="font-semibold">{{ trans("content.event") }}</small>
            </b-th>
            <b-th class="none-border w-10">
              <small class="font-semibold">ML</small>
            </b-th>
            <b-th style="border: 0px" class="w-10">
              <small class="font-semibold">{{ trans("content.hdp") }}</small>
            </b-th>
            <b-th class="none-border w-10">
              <small class="font-semibold">{{ trans("content.over") }}/{{ trans("content.under")}}</small>
            </b-th>
            <b-th class="none-border w-10">
              <small class="font-semibold">{{ trans("content.odd") }}/{{ trans("content.even")}}</small>
            </b-th>
          </b-tr>
        </b-thead>

        <b-tbody v-for="(league, order) in groupleague.list_all" :key="order" :class="fontsize(displaytable.fontSize)">
          <b-tr v-if="order == 0" v-b-toggle="`collapse-${groupleague.boxing_cat_id}`">
            <b-td
              colspan="14"
              class="text-left"
              :class="live ? 'td-live' : 'td-notlive'"
              style="height: 27px;"
            >
              <div class="flex">
                <div class="flex-1">
                  <span class="pl-2">{{lang == "th" ?  groupleague.sbo_tournament_th : groupleague.sbo_tournament_en}}</span>
                  <b-badge variant="light">{{
                    groupleague.list_all.length
                  }}</b-badge>
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

          <b-tr style="border-top: 0px;">
            <b-td colspan="6" style="border: 0px">
              <b-collapse
                visible
                :id="`collapse-${groupleague.boxing_cat_id}`"
                class="w-full"
              >
                <b-table-simple
                  small
                  striped
                  hover
                  bordered
                  style="border: 0px"
                  class="m-0"
                  :class="live ? 'table-live' : 'table-notlive'"
                >
                  <b-tbody>
                    <b-tr>
                      <b-td class="align-top w-10">
                        <center-match-table-column-time
                          :live="live"
                        ></center-match-table-column-time>
                      </b-td>
                      <b-td class="text-left pl-2 w-60">
                        <span class="block text-primary">
                          {{lang == "th"? league.team_blue_show.boxer_name_th : league.team_blue_show.boxer_name_en }}
                        </span>
                        <span class="block text-danger">
                          {{lang == "th" ? league.team_red_show.boxer_name_th :league.team_red_show.boxer_name_en}}
                        </span>
                      </b-td>
                      <b-td class="w-10"> </b-td>
                      <b-td class="w-10">
                        <div class="flex text-center">
                          <!-- <div
                            class="flex-1"
                            v-if="displaytable.lineType == 'DoubleLine'"
                          >
                            <span class="text-primary">
                              0
                            </span>
                          </div> -->
                          <div class="flex-1">
                            <span class="block">
                              <center-match-table-column-price
                                :data="league"
                                type="mpy"
                                :score="league.team_blue_price_single"
                                :namematch="groupleague.sbo_tournament_th"
                              ></center-match-table-column-price>
                            </span>
                            <span class="block">
                              <center-match-table-column-price
                                :data="league"
                                type="mpy"
                                :score="league.team_red_price_single"
                                :namematch="groupleague.sbo_tournament_th"
                              ></center-match-table-column-price>
                            </span>
                          </div>
                        </div>
                      </b-td>
                      <b-td class="w-10"> </b-td>
                      <b-td class="w-10"> </b-td>
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
};
</script>

<style></style>
