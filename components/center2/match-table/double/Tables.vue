<template>
  <div>
    <b-table-simple
      small
      bordered
      class="text-center rounded m-0"
      style="border: 0px; width: 100%;"
      :class="tableClass(status)"
    >
      <b-thead>
        <b-tr>
          <b-th rowspan="2" class="align-middle w-20">
            <small class="font-semibold">
              {{ trans("content.time") }}
            </small>
          </b-th>
          <b-th rowspan="2" class="align-middle" style="width: 28rem">
            <small class="font-semibold">
              {{ trans("content.event") }}
            </small>
          </b-th>
          <b-th colspan="6" class="none-border">
            <small class="font-semibold">
              {{ trans("content.fulltime") }}
            </small>
          </b-th>

          <b-th colspan="5" style="border: 0px">
            <small class="font-semibold">
              {{ trans("content.halftime") }}
            </small></b-th
          >
        </b-tr>
        <b-tr>
          <b-th class="w-20" colspan="2">
            <small class="font-semibold">
              {{ trans("content.fulltime") }}
            </small></b-th
          >
          <b-th class="w-18" colspan="2">
            <div>
              <small class="font-semibold"
                >{{ trans("content.over") }} /
                {{ trans("content.under") }}</small
              >
            </div>
          </b-th>

          <b-th class="w-18" colspan="1">
            <small class="font-semibold">1X2</small>
          </b-th>

          <b-th class="w-18" colspan="1">
            <small class="font-semibold"
              >{{ trans("content.odd") }}/{{ trans("content.even") }}</small
            >
          </b-th>

          <b-th class="w-18" colspan="2"
            ><small class="font-semibold">
              {{ trans("content.halftime") }}
            </small></b-th
          >
          <b-th class="w-18" colspan="2"
            ><small class="font-semibold"
              >{{ trans("content.over") }} / {{ trans("content.under") }}</small
            ></b-th
          >

          <b-th class="w-18" colspan="1">
            <small class="font-semibold">1X2</small>
          </b-th>
        </b-tr>
      </b-thead>
      <b-tbody v-if="matches.length == 0">
        <b-tr>
          <b-td colspan="14" class="text-center p-2" style="height: 27px " >
            <small class="text-white">{{ trans("content.notmatch") }}</small>
          </b-td>
        </b-tr>
      </b-tbody>
      <b-tbody
        v-for="(match, i) in matches"
        :key="i"
        :class="fontSize(displaytable.fontSize)"
      >
        <b-tr v-if="match.newLeague">
          <b-td
            colspan="14"
            class="text-left p-0"
            :class="tdClass(status)"
            style="height: 27px"
          >
            <div class="flex">
              <div class="flex-1">
                <small class="pl-2 font-semibold">
                  {{ match.tournament['name'+_keyLang] ? match.tournament['name'+_keyLang]  : match.tournament['name_en'] }}
                </small>
              </div>
              <div class="flex text-right pr-2">
                <span class="pt-1 cursor-pointer" @click="fetchGetData">
                  <b-icon
                    icon="arrow-repeat"
                    :animation="loading ? 'spin' : ''"
                  ></b-icon>
                </span>
              </div>
            </div>
          </b-td>
        </b-tr>

        <b-tr
          v-if="match.priceRow == 0 && match.setting_w_b_l[index][numbertpye] != 0"
          v-for="(item , index) in match.setting_w_b_l"
          :key="index"
          style="border-top: 0px"
          :class="match.count_match % 2 == 0 ? 'odd' : null"
        >
        <b-td class="align-top w-12" style="height: 40px">
            <center2-column-time
              :status="status"
              :match="match"
              v-if="index == 0"
              :live="status == 'live' ? true : false"
            ></center2-column-time>
          </b-td>
          <b-td class="align-top p-0" >
            <!-- </div> -->

            <div class="grid grid-row-2 text-center pl-2">
              <div>
                <small class="inline-block font-semibold" :class="namepath == 'muaythai-path' ? 'text-danger' : ''">  {{ match['home'+_keyLang] ? match['home'+_keyLang] : match['home_en'] }}  <b-img  v-for="(card, i) in match.home_red_cards" :key="i"  src="/icon/redcard.gif" class="inline-block" /></small>
              </div>
              <div>
                <small class="inline-block font-semibold"> {{ match['away'+_keyLang] ? match['away'+_keyLang] : match['away_en'] }}  <b-img  v-for="(card, i) in match.away_red_cards" :key="i" src="/icon/redcard.gif" class="inline-block" /></small>
              </div>
              <div>
                <small class="text-secondary font-semibold">{{ trans("content.draw") }}</small>
              </div>
            </div>


          </b-td>
          <b-td class="bg"></b-td>
          <b-td></b-td>
          <b-td></b-td>
          <b-td></b-td>
          <b-td></b-td>
          <b-td></b-td>
          <b-td></b-td>
          <b-td></b-td>
          <b-td></b-td>
          <b-td></b-td>
          <b-td></b-td>
        </b-tr>

        <b-tr
          v-for="index in match.priceRow"
          :key="index"
          style="border-top: 0px"
          :class="match.count_match % 2 == 0 ? 'odd' : null"
        >
          <b-td class="align-top w-16" style="height: 40px">
            <center2-column-time
              :status="status"
              :match="match"
              v-if="index == 1"
              :live="status == 'live' ? true : false"
            ></center2-column-time>
          </b-td>
          <b-td class="align-top p-0">
            <div class="grid grid-row-2 text-center pl-2">
              <div>
                 <small class="font-semibold" :class="checkType(match , index) == '1' ? 'text-danger' : ''">{{ match['home'+_keyLang] ? match['home'+_keyLang]  : match['home_en'] }} <b-img  v-for="(card, i) in match.home_red_cards" :key="i" src="/icon/redcard.gif" class="inline-block" /></small>
              </div>
              <div>
                 <small class="font-semibold" :class="checkType(match , index) == '2' ? 'text-danger' : ''">{{ match['away'+_keyLang] ? match['away'+_keyLang]  : match['away_en'] }} <b-img  v-for="(card, i) in match.away_red_cards" :key="i" src="/icon/redcard.gif" class="inline-block" /></small>
              </div>
              <div>
                <small class="text-secondary font-semibold">{{ trans("content.draw") }}</small>
              </div>
            </div>
          </b-td>
          <b-td class="w-16 align-top bg">
            <div class="grid grid-row-2">
              <div class="h-5">
                <center2-column-point
                  v-if="stypType(match)[0].in_who == '1'"
                  :priceGroups="match"
                  market_type="Handicap"
                  :index="index"
                ></center2-column-point>
              </div>
              <div class="text-white">
              <div class="h-5">
                <center2-column-point
                  v-if="stypType(match)[0].in_who == '2'"
                  :priceGroups="match"
                  market_type="Handicap"
                  :index="index"
                ></center2-column-point>
              </div>
              </div>
            </div>
          </b-td>
          <b-td class="w-16 align-top">
            <div class="grid grid-row-2" v-if="match.priceGroups['Handicap']">
              <div class="flex">
                <center2-column-price
                  :priceGroups="match"
                  :index="index"
                  class="flex-1"
                  price_type="h"
                  market_type="Handicap"
                ></center2-column-price>
              </div>
              <div class="flex">
                <center2-column-price
                  :priceGroups="match"
                  :index="index"
                  class="flex-1"
                  price_type="a"
                  market_type="Handicap"
                ></center2-column-price>
              </div>
            </div>
          </b-td>
          <b-td class="w-16 align-top">
            <div class="grid grid-row-2">
              <div class="h-5">
                <center2-column-point
                  :priceGroups="match"
                  market_type="OverUnder"
                  :index="index"
                ></center2-column-point>
              </div>
              <div class="text-white">
              <div class="h-5">
                <!-- <center2-column-point
                  v-if="stypType(match)[0].in_who == '2'"
                  :priceGroups="match"
                  market_type="OverUnder"
                  :index="index"
                ></center2-column-point> -->
              </div>
              </div>
            </div>
          </b-td>
          <b-td class="w-16 align-top">
            <div class="grid grid-row-2" v-if="match.priceGroups['OverUnder']">
              <div class="flex">
                <small class="text-secondary font-semibold flex pl-1">O</small>
                <center2-column-price
                  :priceGroups="match"
                  :index="index"
                  class="flex-1"
                  price_type="h"
                  market_type="OverUnder"
                ></center2-column-price>
              </div>
              <div class="flex">
                <small class="text-secondary font-semibold flex pl-1">U</small>
                <center2-column-price
                  :priceGroups="match"
                  :index="index"
                  class="flex-1"
                  price_type="a"
                  market_type="OverUnder"
                ></center2-column-price>
              </div>
            </div>
          </b-td>

          <b-td class="w-16 align-top">
            <center2-column-price
              :priceGroups="match"
              :index="index"
              class="flex-1"
              price_type="h"
              market_type="1x2"
            ></center2-column-price>
            <center2-column-price
              :priceGroups="match"
              :index="index"
              price_type="a"
              market_type="1x2"
            ></center2-column-price>
            <center2-column-price
              :priceGroups="match"
              :index="index"
              price_type="x"
              market_type="1x2"
            ></center2-column-price>
          </b-td>

          <b-td class="w-16 align-top">
            <center2-column-price
              v-if="index == 1"
              :priceGroups="match"
              :index="1"
              price_type="h"
              market_type="OE"
            ></center2-column-price>
            <center2-column-price
              v-if="index == 1"
              :priceGroups="match"
              :index="1"
              price_type="a"
              market_type="OE"
            ></center2-column-price>
          </b-td>

          <b-td class="w-16 align-top">
            <div class="grid grid-row-2">
              <div class="h-5">
                <center2-column-point
                  v-if="stypType(match)[0].in_who == '1'"
                  :priceGroups="match"
                  market_type="FH_Handicap"
                  :index="index"
                ></center2-column-point>
              </div>
              <div class="text-white">
              <div class="h-5">
                <center2-column-point
                  v-if="stypType(match)[0].in_who == '2'"
                  :priceGroups="match"
                  market_type="FH_Handicap"
                  :index="index"
                ></center2-column-point>
              </div>
              </div>
            </div>
          </b-td>
          <b-td class="w-16 align-top">
            <div
              class="grid grid-row-2"
              v-if="match.priceGroups['FH_Handicap']"
            >
              <div class="flex">
                <center2-column-price
                  :priceGroups="match"
                  class="flex-1"
                  :index="index"
                  price_type="h"
                  market_type="FH_Handicap"
                ></center2-column-price>
              </div>
              <div class="flex">
                <center2-column-price
                  :priceGroups="match"
                  class="flex-1"
                  :index="index"
                  price_type="a"
                  market_type="FH_Handicap"
                ></center2-column-price>
              </div>
            </div>
          </b-td>
          <b-td class="w-16 align-top bg">
          <div class="grid grid-row-2">
              <div class="h-5">
                <center2-column-point
                  :priceGroups="match"
                  market_type="FH_OverUnder"
                  :index="index"
                ></center2-column-point>
              </div>
              <div class="text-white">
              <div class="h-5">
                <!-- <center2-column-point
                  v-if="stypType(match)[0].in_who == '2'"
                  :priceGroups="match"
                  market_type="FH_OverUnder"
                  :index="index"
                ></center2-column-point> -->
              </div>
              </div>
            </div>
          </b-td>
          <b-td class="w-16 align-top">
            <div
              class="grid grid-row-2"
              v-if="match.priceGroups['FH_OverUnder']"
            >
              <div class="flex">
                <small class="text-secondary font-semibold flex pl-1"> O</small>
                <center2-column-price
                  :priceGroups="match"
                  class="flex-1"
                  :index="index"
                  price_type="h"
                  market_type="FH_OverUnder"
                ></center2-column-price>
              </div>
              <div class="flex">
                <small class="text-secondary font-semibold flex pl-1">U</small>
                <center2-column-price
                  :priceGroups="match"
                  class="flex-1"
                  :index="index"
                  price_type="a"
                  market_type="FH_OverUnder"
                ></center2-column-price>
              </div>
            </div>
          </b-td>
          <b-td class="w-16 align-top">
            <center2-column-price
              :priceGroups="match"
              :index="index"
              price_type="h"
              market_type="FH_1x2"
            ></center2-column-price>
            <center2-column-price
              :priceGroups="match"
              :index="index"
              price_type="a"
              market_type="FH_1x2"
            ></center2-column-price>
            <center2-column-price
              :priceGroups="match"
              :index="index"
              price_type="x"
              market_type="FH_1x2"
            ></center2-column-price>
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
    <div v-if="loading">
      <!-- <div class="text-center">
        <b-spinner variant="primary" label=""></b-spinner>
        <span class="block mt-2 text-primary">l o a d i n g ...</span>
      </div> -->
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters  } from "vuex";
import collect from "collect.js";
import moment from "moment";
export default {
  props: {
    setData: {
      type: Array,
      default: []
    },
    status: {
      type: String,
      default: "live"
    },
    loading: {
      type: Boolean,
      default: false
    },
    displaytable: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      numbertpye : null,
      namepath : null,
      isFavorite: false,
      pathName: ''
    }
  },
  computed: {
    ...mapGetters({
      eventId: "favorite/eventId"
    }),
    showFavoriteButton () {
      return (this.isFavorite || (this.pathName != 'mixparlay' && this.pathName != 'step' && this.pathName != 'early'))
    },
    sortBySbo() {
        const collection = collect(this.setDataTable).sortBy('sort_order')
        return collection.all()
      },
      sortByTime() {
        const collection = collect(this.setDataTable).sortBy((match) => {
          return moment(match.real_kickoff_time).format('X')
        })
        collection.all().filter(f => f.newLeague = true)
        for (let i = 0; i < collection.all().length; i++) {
            if (i === 0) {
                continue;
            }
            for (let j = 0; j < i; j++) {
                if (collection.all()[i].tournament.tournament_id == collection.all()[j].tournament.tournament_id && collection.all()[i].real_kickoff_time == collection.all()[j].real_kickoff_time) {
                    collection.all()[i].newLeague = false;
                }
            }
        }
        return collection.all()
      },
      matches() {
        // return this.setDataTable
            return this.displaytable.sortBy == 'SortByNormal' ? this.setData : this.sortByTime

      },
  },
  methods: {
    ...mapActions({
      insertFavorite: "favorite/insertFavorite",
      removeFavorite: "favorite/removeFavorite",
      initializeFavorites: "favorite/initializeFavorites",
    }),
    stypType(m){
      if(m.priceGroups['Handicap'] != undefined){
        return m.priceGroups['Handicap']
      }else if(m.priceGroups['OverUnder'] != undefined){
        return m.priceGroups['OverUnder']
      }else if(m.priceGroups['FH_Handicap'] != undefined){
        return m.priceGroups['FH_Handicap']
      }else if(m.priceGroups['FH_OverUnder'] != undefined){
        return m.priceGroups['FH_OverUnder']
      }
    },
    checkType(m , index){
      if(m.priceGroups['Handicap'] != undefined){
          if(m.priceGroups['Handicap'][index-1] != undefined){
            return m.priceGroups['Handicap'][index-1][15]
          }else{
            return '1'
          }
        }else if(m.priceGroups['OverUnder'] != undefined){
          if(m.priceGroups['OverUnder'][index-1] != undefined){
            return m.priceGroups['OverUnder'][index-1][15]
          }else{
            return '1'
          }
        }else if(m.priceGroups['FH_Handicap'] != undefined){
          if(m.priceGroups['FH_Handicap'][index-1] != undefined){
            return m.priceGroups['FH_Handicap'][index-1][15]
          }else{
            return '1'
          }
        }else if(m.priceGroups['FH_OverUnder'] != undefined){
          if(m.priceGroups['FH_OverUnder'][index-1] != undefined){
            return m.priceGroups['FH_OverUnder'][index-1][15]
          }else{
            return '1'
          }
        }
    },
    fetchGetData() {
      this.$emit("fetch");
    },
        tableClass(status){
          if(status == 'live'){
            return "table-live"
          }else if(status == "nonLive"){
            return "table-notlive"
          }else if(status == "early"){
            return "table-early"
          }
        },
        tdClass(status){
          if(status == 'live'){
            return "td-live"
          }else if(status == "nonLive"){
            return "td-notlive"
          }else if(status == "early"){
            return "td-early"
         }
        },
    toggleFavorite(sport, event) {
      const isFavorite = this.$store.state.favorite.eventId.includes(event)
      if (isFavorite) {
        this.removeFavorite({sport, event})
      } else {
        this.insertFavorite({sport, event})
      }
    },
  },
  mounted() {
    this.initializeFavorites()

    this.isFavorite = this.$route.path.split('/')[1] == 'favorite'
    this.pathName = this.$route.params.path
  },
  created() {
    this.namepath = this.$route.name
      if(this.$route.params.path == 'step'){
        this.numbertpye = 5
      }else if(this.$route.params.path == 'mixparlay'){
        this.numbertpye = 8
      }else{
        this.numbertpye = 2
      }
  },
};
</script>

<style></style>
