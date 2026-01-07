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
      <thead>
        <tr>
          <th rowspan="2" class="w-2">
            <span>
              <b-icon
              @click="collapseData('all')"
              style="cursor:pointer;"
              :icon="collapse_All  ? 'chevron-down' : 'chevron-up'"
              class=""
              ></b-icon>
            </span>
          </th>
          <th rowspan="2" class="align-middle" style="width: 72px !important;">
            <small class="font-semibold">
              {{ trans("content.time") }}
            </small>
          </th>
          <th rowspan="2" class="align-middle">
            <small class="font-semibold">
              {{ trans("content.event") }}
            </small>
          </th>
          <th colspan="6" class="none-border">
            <small class="font-semibold">
              {{ trans("content.fulltime") }}
            </small>
          </th>
        </tr>
        <tr>
          <th class="align-middle" style="width: 50px !important;"
            ><small class="font-semibold">
              HDP
            </small></th
          >
          <th class="w-14 align-middle">
            <div>
              <small class="font-semibold">
                {{ trans("content.home") }}
              </small>
            </div>
          </th>
          <th class="w-16 align-middle"
            ><small class="font-semibold">{{
              trans("content.away")
            }}</small></th
          >
          <th class="w-12 align-middle"
            ><small class="font-semibold">{{
              trans("content.goal")
            }}</small></th
          >
          <th class="w-12 align-middle"
            ><small class="font-semibold">
              {{ trans("content.over") }}
            </small></th
          >
          <th class="w-12 align-middle"
            ><small class="font-semibold">
              {{ trans("content.under") }}
            </small></th
          >
          <!-- <th class="w-12  align-middle"
            ><small class="font-semibold">
              1
            </small></th
          >
          <th class="w-12  align-middle"
            ><small class="font-semibold">
              X
            </small></th
          >
          <th class="w-12  align-middle"
            ><small class="font-semibold">
              2
            </small></th
          >
          <th class="w-12 align-middle"
            ><small class="font-semibold"
              >{{ trans("content.odd") }}</small
            ></th>
            <th class="w-12 align-middle"
            ><small class="font-semibold"
              >{{ trans("content.even") }}</small
            ></th> -->
        </tr>
      </thead>
      <tbody v-if="matches.length == 0">
        <tr>
          <td class="w-2"></td>
          <td colspan="16" class="text-center p-2" style="height: 27px">
            <small class="text-white">{{ trans("content.notmatch") }}</small>
          </td>
        </tr>
      </tbody>
      <tbody
        v-for="(match, i) in matches"
        :key="i"
        :class="fontSize(displaytable.fontSize)"
      >
        <tr v-if="match.newLeague">
          <td class="w-2 cursor-pointer" :class="tdClass(status)">
            <b-icon
              @click="$emit('CollapseBet', match)"
              style="cursor:pointer;"
              :icon="match.collapse != 'open'  ? 'chevron-up' : 'chevron-down'"
              class=""
              ></b-icon> 
          </td>
          <td
            colspan="8"
            class="text-left align-center cursor-pointer"
            :class="tdClass(status)"
            @click="openTable(match.priceRow)"
            style="height: 27px ;"
          >
            <div class="flex">
              <div class="flex-1">
                <div class="inline-block pl-2 favorite-head">
                  <small @click="toggleFavoriteLeague(match.tournament[0])" class="inline-block cursor-default">
                    <b-icon :icon="$store.state.favorite.leagues.includes(match.tournament[0]) ? 'star-fill' : 'star'" :variant="$store.state.favorite.leagues.includes(match.tournament[0]) ? 'warning' : ''" />
                  </small>
                </div>
                <div class="inline-block">
                  <small class="font-semibold">
                    {{ match.tournament['name'+_keyLang] ? match.tournament['name'+_keyLang]  : match.tournament['name_en'] }} 
                    <!-- {{ match.tournament }} -->
                  </small>
                </div>
              </div>
              <div class="flex text-right  pr-1">
                <span class="pt-0 cursor-pointer" @click="fetchGetData">
                  <b-icon
                    icon="arrow-repeat"
                    :animation="loading ? 'spin' : ''"
                  ></b-icon>
                </span>
              </div>
            </div>
          </td>
          <tr v-if="match.newLeague && match.collapse != 'open'">
          <th colspan="3" :class="tdClass(status)" class="align-middle" style="width: 50px !important;"></th>
          <th :class="tdClass(status)" class="align-middle" style="width: 50px !important;"
            ><small v-if="i != 0" class="font-semibold">
              HDP
            </small></th
          >
          <th :class="tdClass(status)" class="w-14 align-middle">
            <div>
              <small v-if="i != 0" class="font-semibold">
                {{ trans("content.home") }}
              </small>
            </div>
          </th>
          <th :class="tdClass(status)" class="w-16 align-middle"
            ><small v-if="i != 0" class="font-semibold">{{
              trans("content.away")
            }}</small></th
          >
          <th :class="tdClass(status)" class="w-12 align-middle"
            ><small v-if="i != 0" class="font-semibold">{{
              trans("content.goal")
            }}</small></th
          >
          <th :class="tdClass(status)" class="w-12 align-middle"
            ><small v-if="i != 0" class="font-semibold">
              {{ trans("content.over") }}
            </small></th
          >
          <th :class="tdClass(status)" class="w-12 align-middle"
            ><small v-if="i != 0" class="font-semibold">
              {{ trans("content.under") }}
            </small></th
          >
          </tr>
        </tr>
        <tr
          v-if="match.priceRow == 0 && match.setting_w_b_l[index][numbertpye] != 0 && match.collapse != 'open'"
          v-for="(item , index) in match.setting_w_b_l"
          :key="index"
          style="border-top: 0px"
          :class="{'odd' :match.count_match % 2 == 0 , 'hidden' : index != 0}"

        >

        <td class="align-center w-12" colspan="2" style="height: 40px">

          <div is="center2-column-time"
              :status="status"
              :match="match"
              v-if="index == 0"
              :live="status == 'live' ? true : false">

          </div>
          </td>
          <td class="align-center" >
            <div class="text-center">
              <div class="inline-block">
                <small class="inline-block font-semibold" :class="namepath == 'muaythai-path' ? 'text-danger' : 'text-white'">  {{ match['home'+_keyLang] ? match['home'+_keyLang] : match['home_en'] }}  <img  v-for="(card, i) in match.home_red_cards" :key="i"  src="/icon/redcard.gif" class="inline-block" /></small>
                <small class="inline-block text-white">vs</small> 
                <small class="inline-block font-semibold text-white"> {{ match['away'+_keyLang] ? match['away'+_keyLang] : match['away_en'] }}  <img  v-for="(card, i) in match.away_red_cards" :key="i" src="/icon/redcard.gif" class="inline-block" /></small>
              </div>
            </div>
          </td>
          <td class="bg"></td>
          <td></td>
          <td></td>
          <td class="bg"></td>
          <td></td>
          <td></td>
          <!-- <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td> -->
        </tr>

        <tr
          v-for="index in match.priceRow"
          :key="index"
          style="border-top: 0px"
          :class="{'odd' : match.count_match % 2 == 0}"
          v-if="match.collapse != 'open'"
          >
          <!-- v-if="match.collapse != 'open'" -->
          <td class="align-center w-12" colspan="2" style="height: 40px">
            <!-- <div v-if="index==1 && showFavoriteButton" class="d-inline">
              <div @click="toggleFavorite(match.tournament[5]['id'], match.event_id)" class="d-inline">
                <b-icon :icon="$store.state.favorite.eventId.includes(match.event_id) ? 'star-fill' : 'star'" :variant="$store.state.favorite.eventId.includes(match.event_id) ? 'warning' : ''" />
              </div>
            </div> -->
            <div is="center2-column-time"
              :status="status"
              :match="match"
              v-if="index == 1"
              :live="status == 'live' ? true : false"
            ></div>
          </td>
          <td class="align-center" >
            <div>
              <div class="text-center">
                <div class="inline-block">
                  <small class="font-semibold" :class="stypType(match , index) == '1' ? 'text-danger' : 'text-white'"> {{ match['home'+_keyLang] ? match['home'+_keyLang]  : match['home_en'] }}  <img   v-for="(card, i) in match.home_red_cards" :key="i" src="/icon/redcard.gif" class="inline-block" /></small> <small class="text-white">vs</small>  <small class="font-semibold" :class="stypType(match , index) == '2' ? 'text-danger' : 'text-white'"> {{ match['away'+_keyLang] ? match['away'+_keyLang]  : match['away_en'] }}  <img   v-for="(card, i) in match.away_red_cards" :key="i" src="/icon/redcard.gif" class="inline-block" /></small>
                </div>
              </div>
            </div>
          </td>
          <td class="w-12 align-center bg" is="center2-column2-point" :priceGroups="match"
              market_type="Handicap"
              :index="index">
          </td>
          <td class="w-12 align-center" is="center2-column2-price"
             :priceGroups="match"
              :index="index"
              price_type="h"
              market_type="Handicap">
          </td>
          <td class="w-12 align-center" is="center2-column2-price"        :priceGroups="match"
              :index="index"
              price_type="a"
              market_type="Handicap">
          </td>

          <td class="w-12 align-center bg" is="center2-column2-point"
              :priceGroups="match"
              market_type="OverUnder"
              :index="index">
          </td>
          <td class="w-12 align-center" is="center2-column2-price"
              :priceGroups="match"
              :index="index"
              price_type="h"
              market_type="OverUnder">
          </td>
          <td class="w-12 align-center" is="center2-column2-price"         :priceGroups="match"
              :index="index"
              price_type="a"
              market_type="OverUnder">
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <button class="btn btn-primaly btn-sm" @click="loadMore('mb')" v-if="btnmores && type_nonlive == 'nonlive'" style="width: 100%; background: azure; margin-top: 10px; height: 60px; font-size: 21px;">
      <span v-if="!loadmoreshow">โหลดเพิ่ม +</span>
      <span v-else>
        <b-spinner variant="primary" label="" small class="inline-block"></b-spinner>
        กำลังโหลด....
      </span>
    </button> -->
    <div v-if="loading" style="position: absolute; width: 100%;">
      <!-- <div class="text-center">
        <b-spinner variant="primary" label=""></b-spinner>
        <span class="block mt-2 text-primary">l o a d i n g ...</span>
      </div> -->
    </div>
  </div>
</template>

<script>
import collect from "collect.js";
import { mapActions, mapGetters } from "vuex";
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
    type_nonlive :{
      type: String,
      default: ""
    }
  },
  data() {
    return {
      numbertpye : null,
      namepath : null,
      path : '',
      priceUpdating: 0,
      typetable : '',
      show: false,
      tooltip_id : null,
      menu: false,
      bettype: false,
      hidemenu: true,
      lang: this.$auth.$storage.getUniversal("language"),
      tabIndex: 0,
      dataBetChoice: [],
      dataBetList: {
        dataBetSingle: [],
        dataBetParlay: []
      },
      isFavorite: false,
      pathName: '',
      errMsg:null,
      scY: 0,
      scTimer: 0,
      loadmoreshow : false,
      btnmores : false,
      length_load: 15,
      collapse_All : false,
    }
  },
  computed: {
    ...mapGetters({
      getbet: "tabbet/getbet",
      mockbet : "tabbet/mockbet",
      getmix: "tabmix/getmix",
      getQuickbet : "quickbet/getQuickbet",
      favEvents: "favorite/events",
      allEvents: "favorite/allEvents"
    }),
    favEventsId() {
      return this.favEvents.map(data => data.event)
    },
    // showFavoriteButton () {
    //   return (this.isFavorite || (this.pathName != 'mixparlay' && this.pathName != 'step' && this.pathName != 'early'))
    // },
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
      setDataTable(){
         return this.setData
      },
      matches() {
        if(this.type_nonlive == 'nonlive'){
          if(this.setData){
            if(this.$route.name.split('-')[0] == 'football'){
              // if(this.setData.length == 0){
                // if(window.innerWidth >= 1200){
                //   this.btnmores = false
                // }
              // }
              return this.displaytable.sortBy == 'SortByNormal' ? this.setData.slice(0, this.length_load) : this.sortByTime.slice(0, this.length_load);
            }else{
              return this.displaytable.sortBy == 'SortByNormal' ? this.setData : this.sortByTime
            }
          }
        }else{
          return this.displaytable.sortBy == 'SortByNormal' ? this.setData : this.sortByTime
        }
      },
  },
  methods: {
    ...mapActions({
      pushBetList: "tabmix/pushBetList",
      fetchGetListBet: "listbet/fetchGetListBet",
      fetchActionsTab: "tabbet/fetchActionsTab",
      fetchbetlist : "fetchbet/fetchbetlist",
      actionsQuickbet: "quickbet/actionsQuickbet",
      insertFavorite: "favorite/insertFavorite",
      removeFavorite: "favorite/removeFavorite",
      insertFavoriteLeague: "favorite/insertFavoriteLeague",
      removeFavoriteLeague: "favorite/removeFavoriteLeague",
      initializeFavorites: "favorite/initializeFavorites",
      setCollapse : 'collapseAll/setCollapse'
    }),
    collapseData(){
      this.collapse_All = !this.collapse_All
      var data = {
        'collapse' : this.collapse_All,
        'type' : this.type_nonlive == 'nonlive' ? 'nonlive' : 'live'
      }
      this.setCollapse(data)
    },
    loadMore(type) {
      this.loadmoreshow = true
      if(type == 'mb'){
        if (this.length_load > this.setData.length) return;
        this.length_load = this.length_load + 20;
      }else{
        if (this.length_load > this.setData.length) return;
        this.length_load = this.length_load + 10;
      }

      // if(this.length_load >= this.setData.length){
      //   this.btnmores = false
      // }
      setTimeout(() => {
        this.loadmoreshow = false
      }, 500);
    },
    active(items) {
      if(this.path != 'step' && this.path != 'mixparlay'){
        return items.price_type == this.getbet.dataBetSingle.option && items.match.priceGroups[items.market_type][items.index - 1].id == this.getbet.dataBetSingle.id;
      }else{
        items.price_type == this.getbet.dataBetParlay.option && items.match.priceGroups[items.market_type][items.index - 1].id == this.getbet.dataBetParlay.id
        if(this.getmix.arrayParlay.length != 0){
          for (let i = 0; i < this.getmix.arrayParlay.length; i++) {
            if(this.getmix.arrayParlay[i].odd_id == items.match.priceGroups[items.market_type][items.index - 1].odds_id){
                return items.price_type == this.getmix.arrayParlay[i].option;
              }
          }
        }
        if(this.getmix.arrayStep.length != 0){
          for (let i = 0; i < this.getmix.arrayStep.length; i++) {
            if(this.getmix.arrayStep[i].odd_id == items.match.priceGroups[items.market_type][items.index - 1].odds_id){
                return items.price_type == this.getmix.arrayStep[i].option;
              }
          }
        }
      }
    },
    openTable(value){
      console.log('value' , value);
    },
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
        indexPrice(prices , price_type) {
        let price = prices.findIndex((rank) => rank.option === price_type);
        return price;
    },
  updateBg(prices){
    let oldValue = (prices.oldValue < 0) ? -1/prices.oldValue : prices.oldValue;
    let newValue = (prices.newValue < 0) ? -1/prices.newValue : prices.newValue;
    this.priceUpdating = (newValue > oldValue) ? 1 : -1;
    setTimeout(() => {
      this.priceUpdating = 0;
    },1500)
  },
  numberIndex(data , index){
    var text = !data.priceGroups[this.market_type][index - 1].prices[
                  this.indexPrice(data.priceGroups[this.market_type][index - 1].prices)
                ].price ? 0 : data.priceGroups[this.market_type][index - 1].prices[
                  this.indexPrice(data.priceGroups[this.market_type][index - 1].prices)
                ].price
      var text2 = text.toString();
      var number = text2.slice(-2);
      var array = number + data.priceGroups[this.market_type][index - 1].id
      return array
  },
    Bet(data , index) {
      this.hidemenu = true;
      // this.loading = true;
      this.dataBetList.dataBetSingle = [];
      this.dataBetList.dataBetParlay = [];
      this.getbet.dataBetParlay = [];
      this.getbet.dataBetSingle = [];
      this.fetchActionsTab(false);
      // this.show = false
      // this.tooltip_id = null

      // setTimeout(() => {
      //   this.tooltip_id = this.numberIndex(data , index)
      //   this.show = true
      // }, 500);

      // console.log('tooltip_id',this.tooltip_id);


        this.$nuxt.$loading.start();
        var obj = {};
        var choice
        if(data.price_type == 'h'){
          choice = data.match.home_en
        }else if(data.price_type == 'a'){
          choice = data.match.away_en
        }else{
          choice = "Draw"
        }

         obj = {
          'market_type': this.market_type,
          'in_who':this.priceGroups.priceGroups[this.market_type][this.index - 1].in_who,
          'point':this.priceGroups.priceGroups[this.market_type][this.index - 1].point,
           'lang':this.lang,
           'event_id': data.match.event_id,
           'id' : data.match.priceGroups[data.market_type][data.index - 1].id,
           'odd_id': data.match.priceGroups[data.market_type][data.index - 1].odds_id,
           'option': data.price_type,
           'type_bet': this.path,
           'open': true,
           'odd': data.match.priceGroups[data.market_type][data.index - 1].prices[
               this.indexPrice(
                 data.match.priceGroups[data.market_type][data.index - 1]
                   .prices , data.price_type
               )
             ].price,
         }
         this.fetchbetlist(true)
         this.fetchActionsTab(obj);
         if(localStorage.getItem('quickbet') == 'true'){
         this.actionsQuickbet(true)
         }

    },
    typebet(){
      var route = this.$route.params.path.toString();
      this.path = route;

    },
    selectmenu(event) {
      this.menu = event;
    },
    closebet() {
      this.hidemenu = true;
      // this.loading = true;
      this.dataBetList.dataBetSingle = [];
      this.dataBetList.dataBetParlay = [];
      this.getbet.dataBetParlay = [];
      this.getbet.dataBetSingle = [];
      this.fetchActionsTab(false);

    },
    toggleFavoriteLeague(league) {
      const filtered = this.allEvents.filter(match => match.tournament[0] === league)
      const isFavorite = this.$store.state.favorite.leagues.includes(league)

      filtered.forEach(match => {
        const sport = match.tournament[5]['id']
        const event = match.event_id
        this.toggleFavorite(sport, event, isFavorite)
      })

      if (isFavorite) {
        this.removeFavoriteLeague(league)
      } else {
        this.insertFavoriteLeague(league)
      }
    },
    toggleFavorite(sport, event, isFavorite) {
      const isEventFavorite = this.$store.state.favorite.eventId.includes(event)

      if (isEventFavorite !== isFavorite) {
        return
      }

      if (isEventFavorite) {
        this.removeFavorite({ sport, event })
      } else {
        this.insertFavorite({ sport, event })
      }
    },
      handleScroll() {
          if((window.innerHeight + window.scrollY + 500) >= document.body.offsetHeight){
            // if(window.innerWidth >= 600){
              this.loadMore()
            // }
          }
      },
  },
  mounted() {
    this.initializeFavorites()

    // this.isFavorite = this.$route.path.split('/')[1] == 'favorite'
    // this.pathName = this.$route.params.path

    window.addEventListener("scroll", this.handleScroll);
  },
  created() {

    // if(window.innerWidth <= 1200){
    //   if(this.$route.name.split('-')[0] == 'football'){
    //     this.btnmores = true
    //   }
    // }
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

.bg-color {
  background: #cca50b;
  color: white;
}
/* .sy-price:hover {
  background: antiquewhite;
} */
.bg-red {
  background: rgb(255 121 121 / 42%);
  background-position: right 5px;
  background-repeat: no-repeat;
  color: black;
}

.bg-green {
  background: rgb(113 255 113 / 45%);
  background-position: right 5px;
  background-repeat: no-repeat;
  color: black;
}

.tooltip_test {
  color: black;
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
}

.tooltip_test .tooltiptext {
  visibility: hidden;
  width: 211px;
  text-align: center;
  border-radius: 6px;
  right: 0px;
  padding: 5px 0;
  top: 2px;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
}
.test-st:hover{
  background: #FCC787 !important;

}
.tooltip_test .tooltiptext {
  visibility: visible;
}
</style>
