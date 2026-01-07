<template>
  <div>
    <table
      small
      striped
      hover
      bordered
      class="text-center rounded m-0 "
      style="border: 0px; width: 100%;"
      :class="tableClass(status)"
    >
      <b-thead>
        <b-tr>
          <b-th rowspan="2" class="align-middle" style="width: 67px !important;">
            <small class="font-semibold">
              {{ trans("content.time") }}
            </small>
          </b-th>
          <b-th rowspan="2" class="align-middle">
            <small class="font-semibold">
              {{ trans("content.event") }}
            </small>
          </b-th>
          <b-th colspan="6" class="none-border">
            <small class="font-semibold">
              {{ trans("content.fulltime") }}
            </small>
          </b-th>

          <b-th colspan="6" style="border: 0px">
            <small class="font-semibold">
              {{ trans("content.halftime") }}
            </small></b-th
          >
        </b-tr>
        <b-tr>
          <b-th class="w-12"
            ><small class="font-semibold">
              HDP
            </small></b-th
          >
          <b-th class="w-14">
            <div>
              <small class="font-semibold">
                {{ trans("content.home") }}
              </small>
            </div>
          </b-th>
          <b-th class="w-16"
            ><small class="font-semibold">{{
              trans("content.away")
            }}</small></b-th
          >
          <b-th class="w-12"
            ><small class="font-semibold">{{
              trans("content.goal")
            }}</small></b-th
          >
          <b-th class="w-12"
            ><small class="font-semibold">
              {{ trans("content.over") }}
            </small></b-th
          >
          <b-th class="w-12"
            ><small class="font-semibold">
              {{ trans("content.under") }}
            </small></b-th
          >

          <b-th class="w-12"
            ><small class="font-semibold">
              HDP
            </small></b-th
          >
          <b-th class="w-14">
            <div>
              <small class="font-semibold">
                {{ trans("content.home") }}
              </small>
            </div>
          </b-th>
          <b-th class="w-16"
            ><small class="font-semibold">{{
              trans("content.away")
            }}</small></b-th
          >
          <b-th class="w-12"
            ><small class="font-semibold">{{
              trans("content.goal")
            }}</small></b-th
          >
          <b-th class="w-12"
            ><small class="font-semibold">
              {{ trans("content.over") }}
            </small></b-th
          >
          <b-th class="w-12"
            ><small class="font-semibold">
              {{ trans("content.under") }}
            </small></b-th
          >
        </b-tr>
      </b-thead>

      <b-tbody v-if="matches.length == 0">
        <b-tr>
          <b-td colspan="14" class="text-center p-2" style="height: 27px">
            <small class="font-semibold">{{ trans("content.notmatch") }}</small>
          </b-td>
        </b-tr>
      </b-tbody>

      <b-tbody
        v-for="(match, i) in matches"
        :key="i"
        :class="fontSize(displaytable.fontSize)"
      >
        <b-tr v-if="match.newLeague"
        >
          <b-td
            colspan="14"
            class="text-left "
            :class="tdClass(status)"
            style="height: 27px;"
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
        <b-td class="align-top" style="height: 40px; width: 67px !important;">
            <center2-column-time
              :status="status"
              :match="match"
              v-if="index == 0"
              :live="status == 'live' ? true : false"
            ></center2-column-time>
          </b-td>
          <b-td>
            <div class="text-left pl-2">
              <small class="block font-semibold text-white" :class="namepath == 'muaythai-path' ? 'text-danger' : 'text-white'">  {{ match['home'+_keyLang] ? match['home'+_keyLang] : match['home_en'] }}  <b-img  v-for="(card, i) in match.home_red_cards" :key="i"  src="/icon/redcard.gif" class="inline-block" /></small>
              <small class="block font-semibold text-white"> {{ match['away'+_keyLang] ? match['away'+_keyLang] : match['away_en'] }}  <b-img  v-for="(card, i) in match.away_red_cards" :key="i" src="/icon/redcard.gif" class="inline-block" /></small>
            </div>
          </b-td>
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
          <b-td></b-td>
          <b-td></b-td>
        </b-tr>

        <b-tr
          v-for="index in match.priceRow"
          :key="index"
          style="border-top: 0px"
          :class="match.count_match % 2 == 0 ? 'odd' : null"

        >
          <b-td class="align-top" style="height: 40px; width: 67px !important;" v-if="index == 1">
            <center2-column-time
              :status="status"
              :match="match"
              :live="status == 'live' ? true : false"
            ></center2-column-time>
          </b-td>
          <b-td v-else style="height: 40px" colspan="2">
            <div class="flex">
              <div class="flex" style="width: 67px;"></div>
              <div class="flex-1">
                <div class="text-left pl-2">
                  <small class="block font-semibold" :class="stypType(match , index) == '1' ? 'text-danger' : 'text-white'">  {{ match['home'+_keyLang] ? match['home'+_keyLang] : match['home_en'] }}  <b-img  v-for="(card, i) in match.home_red_cards" :key="i" src="/icon/redcard.gif" class="inline-block" /></small>
                  <small class="block font-semibold" :class="stypType(match , index) == '2' ? 'text-danger' : 'text-white'">  {{ match['away'+_keyLang] ? match['away'+_keyLang] : match['away_en'] }}  <b-img  v-for="(card, i) in match.away_red_cards" :key="i" src="/icon/redcard.gif" class="inline-block" /></small>
                </div>
              </div>
            </div>
          </b-td>
          <b-td v-if="index == 1">
            <div class="text-left pl-2">
              <small class="block font-semibold" :class="stypType(match , index) == '1' ? 'text-danger' : 'text-white'"> {{ match['home'+_keyLang] ? match['home'+_keyLang] : match['home_en'] }}  <b-img  v-for="(card, i) in match.home_red_cards" :key="i" src="/icon/redcard.gif" class="inline-block" /></small>
              <small class="block font-semibold" :class="stypType(match , index) == '2' ? 'text-danger' : 'text-white'"> {{ match['away'+_keyLang] ? match['away'+_keyLang] : match['away_en'] }}  <b-img  v-for="(card, i) in match.away_red_cards" :key="i" src="/icon/redcard.gif" class="inline-block" /></small>
            </div>
          </b-td>
          <b-td class="w-12">
            <center2-column-point
              :priceGroups="match"
              market_type="Handicap"
              :index="index"
            ></center2-column-point>
          </b-td>
          <b-td class="w-12">
              <!-- :price="match.priceGroups['Handicap'][index-1].prices.find( (price) => price.option == 'h')" -->
            <center2-column-price
              :priceGroups="match"
              :index="index"
              price_type="h"
              market_type="Handicap"
            ></center2-column-price>
          </b-td>
          <b-td class="w-12">
            <center2-column-price
              :priceGroups="match"
              :index="index"
              price_type="a"
              market_type="Handicap"
            ></center2-column-price>
          </b-td>

          <b-td class="w-12">
            <center2-column-point
              :priceGroups="match"
              market_type="OverUnder"
              :index="index"
            ></center2-column-point>
          </b-td>
          <b-td class="w-12">
            <center2-column-price
              :priceGroups="match"
              :index="index"
              price_type="h"
              market_type="OverUnder"
            ></center2-column-price>
          </b-td>
          <b-td class="w-12">
            <center2-column-price
              :priceGroups="match"
              :index="index"
              price_type="a"
              market_type="OverUnder"
            ></center2-column-price>
          </b-td>

          <b-td class="w-12">
            <center2-column-point
              :priceGroups="match"
              market_type="FH_Handicap"
              :index="index"
            ></center2-column-point>
          </b-td>
          <b-td class="w-12">
            <center2-column-price
              :priceGroups="match"
              :index="index"
              price_type="h"
              market_type="FH_Handicap"
            ></center2-column-price>
          </b-td>
          <b-td class="w-12">
            <center2-column-price
              :priceGroups="match"
              :index="index"
              price_type="a"
              market_type="FH_Handicap"
            ></center2-column-price>
          </b-td>

          <b-td class="w-12">
            <center2-column-point
              :priceGroups="match"
              market_type="FH_OverUnder"
              :index="index"
            ></center2-column-point>
          </b-td>

          <b-td class="w-12">
            <center2-column-price
              :priceGroups="match"
              :index="index"
              price_type="h"
              market_type="FH_OverUnder"
            ></center2-column-price>
          </b-td>
          <b-td class="w-12">
            <center2-column-price
              :priceGroups="match"
              :index="index"
              price_type="a"
              market_type="FH_OverUnder"
            ></center2-column-price>
          </b-td>
        </b-tr>
        <b-tr v-if="match.moreBet != null">
          <b-td  colspan="2" rowspan="3"></b-td>
          <b-th colspan="3"><small class="font-semibold">1X2 </small></b-th>
          <b-th colspan="3"><small class="font-semibold">{{ trans("content.halftime") }} 1X2</small></b-th>
          <b-th colspan="2"><small class="font-semibold">{{ trans("content.odd") }}/{{ trans("content.even") }}</small></b-th>
          <b-td  colspan="4" rowspan="3"></b-td>
        </b-tr>
        <b-tr v-if="match.moreBet != null">
          <b-th class="w-14"><small class="font-semibold">{{ trans("content.home") }} </small></b-th>
          <b-th class="w-16"><small class="font-semibold">{{ trans("content.away") }}</small></b-th>
          <b-th><small class="font-semibold">{{ trans("content.draw") }}</small></b-th>
          <b-th class="w-14"><small class="font-semibold">{{ trans("content.home") }} </small></b-th>
          <b-th class="w-16"><small class="font-semibold">{{ trans("content.away")  }}</small></b-th>
          <b-th><small class="font-semibold">{{ trans("content.draw") }}</small></b-th>
          <b-th><small class="font-semibold">{{ trans("content.odd") }} </small></b-th>
          <b-th><small class="font-semibold">{{ trans("content.even") }} </small></b-th>
        </b-tr>
        <b-tr style="height: 40px" v-if="match.moreBet != null">
          <b-td>
                <center2-column-price
                  v-if="match.priceGroups['1x2']"
                  :priceGroups="match"
                  :index="1"
                  price_type="h"
                  market_type="1x2"
                ></center2-column-price>
          </b-td>
          <b-td>
                <center2-column-price
                  v-if="match.priceGroups['1x2']"
                  :priceGroups="match"
                  :index="1"
                  price_type="a"
                  market_type="1x2"
                ></center2-column-price>
          </b-td>
          <b-td>
                 <center2-column-price
                  v-if="match.priceGroups['1x2']"
                  :priceGroups="match"
                  :index="1"
                  price_type="x"
                  market_type="1x2"
                ></center2-column-price>
          </b-td>
          <b-td>
                <center2-column-price
                  v-if="match.priceGroups['1x2']"
                  :priceGroups="match"
                  :index="1"
                  price_type="h"
                  market_type="FH_1x2"
                ></center2-column-price>
          </b-td>
          <b-td>
                <center2-column-price
                  v-if="match.priceGroups['FH_1x2']"
                  :priceGroups="match"
                  :index="1"
                  price_type="a"
                  market_type="FH_1x2"
                ></center2-column-price>
          </b-td>
          <b-td>
                 <center2-column-price
                  v-if="match.priceGroups['FH_1x2']"
                  :priceGroups="match"
                  :index="1"
                  price_type="x"
                  market_type="FH_1x2"
                ></center2-column-price>
          </b-td>
          <b-td>
                 <center2-column-price
                  v-if="match.priceGroups['OE']"
                  :priceGroups="match"
                  :index="1"
                  price_type="h"
                  market_type="OE"
                ></center2-column-price>
          </b-td>
                <b-td>
                 <center2-column-price
                  v-if="match.priceGroups['OE']"
                  :priceGroups="match"
                  :index="1"
                  price_type="a"
                  market_type="OE"
                ></center2-column-price>
          </b-td>
          <b-td  colspan="4"></b-td>
        </b-tr>

        <b-tr style="height: 35px ;" v-if="match.priceGroups['1x2']">
          <b-td colspan="2"></b-td>
          <b-td colspan="12">
            <small class="cursor-pointer text-primary" @click="$emit('MoreBet' ,match)">{{ trans("content.morebet") }}</small>
          </b-td>
        </b-tr>
      </b-tbody>
    </table>
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
    },
  },
  data() {
    return {
        lang: this.$auth.$storage.getUniversal("language"),
        numbertpye : null,
        namepath : null,
        isFavorite: null,
        pathName: '',
    }
  },
  computed: {
    ...mapGetters({
      eventId: "favorite/eventId"
    }),
    setDataTable(){
      // var item = this.setData.filter(f=> f.odds.find((data , i) => data.length != 0))
      // var item = this.setData.filter(f=> f.setting_w_b_l[0][2] != 0)
      // if(item){
      // }
        return this.setData
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
    stypType(m , index){
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
    checkw_b_l(type){
      var item = type.filter(f => f[this.numbertpye] == 1)
      return item.length == 0 ? true  : false
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

<style scoped>
.text-color:focus {
  background: antiquewhite;
}
.text-color:hover {
  background: antiquewhite;
}
</style>
