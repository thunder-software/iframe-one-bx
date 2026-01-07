<template>
    <div>
      <table
        small
        striped
        hover
        bordered
        class="text-center rounded m-0 "
        style="border: 0px; width: 100%;border-collapse: separate; border-spacing: 0px;"
        :class="tableClass(status)"
      >
        <tbody
          v-for="(match, i) in matches"
          :key="i"
          :class="fontSize(displaytable.fontSize)"
          style="border: 0px solid !important;"
        >
          <tr v-if="match.newLeague" style="border: 0px solid !important;">
          <td style="width: 110px; border: 0px solid;" class="module-border-wrap">
            <img src="/banner/boxing1.png" alt="" style="width: 113px; background: black; border-radius: 8px;">
          </td>
          <td class="module-border-wrap text-white" style="border-radius: 0px !important; border: 0px solid;" colspan="3">
            {{ match.tournament['name'+_keyLang] ? match.tournament['name'+_keyLang]  : match.tournament['name_en'] }}
          </td>
          <td class="text-white" style="background: #ff1e1e; width: 65px;">{{ trans("content.red") }}</td>
          <td class="text-white" style="background: blue; width: 65px;">{{ trans("content.blue") }}</td>
          <td style="width: 70px;">{{ trans("content.complete") }}</td>
          <td style="width: 70px;">{{ trans("content.not_complete") }}</td>
            <!-- <tr v-if="match.newLeague">
            <th colspan="4" :class="tdClass(status)" class="align-middle" style="width: 50px !important;"></th>
            <th :class="tdClass(status)" class="w-14 align-middle">
              <div>
                <small v-if="i != 0" class="font-semibold" style="font-size: 11px;">
                  {{ trans("content.red") }}
                </small>
              </div>
            </th>
            <th :class="tdClass(status)" class="w-16 align-middle"
              ><small v-if="i != 0" class="font-semibold" style="font-size: 11px;">{{
                trans("content.blue")
              }}</small></th
            >
            <th :class="tdClass(status)" class="w-12 align-middle"
              ><small v-if="i != 0" class="font-semibold" style="font-size: 11px;">
                {{ trans("content.complete") }}
              </small></th
            >
            <th :class="tdClass(status)" class="w-12 align-middle"
              ><small v-if="i != 0" class="font-semibold" style="font-size: 10px;">
                {{ trans("content.not_complete") }}
              </small></th
            >
            </tr> -->
          </tr>
  

          <tr
            v-if="match.priceRow == 0 && match.setting_w_b_l[index][numbertpye] != 0"
            v-for="(item , index) in match.setting_w_b_l"
            :key="index"
            style="border-top: 0px"
            :class="match.count_match % 2 == 0 ? 'odd' : null"
  
          >
          <td class="align-center w-12" style="height: 40px">
            <div is="center2-column-time-muay"
                :status="status"
                :match="match"
                v-if="index == 0"
                :live="status == 'live' ? true : false">
  
            </div>
            </td>
            <td class="align-center" >
              <div class="text-center">
                <small class="inline-block font-semibold" :class="namepath == 'muaythai-path' ? 'text-danger' : ''">  {{ match['home'+_keyLang] ? match['home'+_keyLang] : match['home_en'] }}  <img  v-for="(card, i) in match.home_red_cards" :key="i"  src="/icon/redcard.gif" class="inline-block" /></small>
                <!-- <div class="inline-block">
                  <small class="inline-block font-semibold" :class="namepath == 'muaythai-path' ? 'text-danger' : ''">  {{ match['home'+_keyLang] ? match['home'+_keyLang] : match['home_en'] }}  <img  v-for="(card, i) in match.home_red_cards" :key="i"  src="/icon/redcard.gif" class="inline-block" /></small>
                  <small class="inline-block">
                    <div class="flex">
                      <div class="flex-1">
                        <div v-if="showFavoriteButton" @click="toggleFavorite(match.tournament[5]['id'], match.event_id)"
                          class="inline-block pr-2">
                          <b-icon :icon="$store.state.favorite.eventId.includes(match.event_id) ? 'star-fill' : 'star'"
                            :variant="$store.state.favorite.eventId.includes(match.event_id) ? 'warning' : ''" />
                        </div>
                      </div>
                      <img src="/banner/vs5.png" class="flex-1" alt="" style="width: 62px;">
                    </div>
                  </small> 
                  <small class="inline-block font-semibold"> {{ match['away'+_keyLang] ? match['away'+_keyLang] : match['away_en'] }}  <img  v-for="(card, i) in match.away_red_cards" :key="i" src="/icon/redcard.gif" class="inline-block" /></small>
                </div> -->
              </div>
            </td>

              <td>
                <div v-if="showFavoriteButton" @click="toggleFavorite(match.tournament[5]['id'], match.event_id)"
                          class="inline-block" style="vertical-align: super;">
                          <b-icon :icon="$store.state.favorite.eventId.includes(match.event_id) ? 'star-fill' : 'star'"
                            :variant="$store.state.favorite.eventId.includes(match.event_id) ? 'warning' : ''" class="block" />
                            <div  class="block" style="cursor: pointer;"
                               @click="tvpop(match.channel_live)">
                              <b-img src="/icon/tv2.png" class="inline-block pr-0" style="width: 30px;" />
                            </div> 

                </div>
                <img src="/banner/vs5.png" style="width: 62px; vertical-align: bottom;" class="inline-block mx-2" alt="">
                <div class="inline-block" style="vertical-align: super;">
                    <div  class="block" style="cursor: pointer;">
                      <b-img src="/icon/spreadsheet-app.png" class="inline-block pr-0" style="width: 20px;" />
                    </div> 
                    <div  class="block" style="cursor: pointer;">
                      <b-img src="/icon/frame1.png" class="inline-block pr-0 mt-2" style="width: 20px;" />
                    </div> 
                </div>
            </td>
            <td>
              <small class="inline-block font-semibold"> {{ match['away'+_keyLang] ? match['away'+_keyLang] : match['away_en'] }}  <img  v-for="(card, i) in match.away_red_cards" :key="i" src="/icon/redcard.gif" class="inline-block" /></small>
            </td>
            <td></td>
            <td></td>
            <td style="border-left: 2px solid silver !important"></td>
            <td></td>
          </tr>
          <!-- class="bg" style="border-left: 2px solid silver !important" -->

          <tr
            v-for="index in match.priceRow"
            :key="index"
            style="border-top: 0px; border: 0px solid !important;"
            :class="match.count_match % 2 == 0 ? 'odd' : null"
            
            
            >
            <td class="align-center w-12" style="height: 40px;border: 0px solid !important;">
              <div is="center2-column-time-muay"
                :status="status"
                :match="match"
                v-if="index == 1"
                :live="status == 'live' ? true : false"
              ></div>
            </td>
            <td class="align-center" >
              <div>
                    <small class="font-semibold" :class="stypType(match , index) == '1' ? 'text-danger' : ''"> {{ match['home'+_keyLang] ? match['home'+_keyLang]  : match['home_en'] }}  <img   v-for="(card, i) in match.home_red_cards" :key="i" src="/icon/redcard.gif" class="inline-block" /></small> 
              </div>
            </td>

            <td>
                <div v-if="showFavoriteButton" @click="toggleFavorite(match.tournament[5]['id'], match.event_id)"
                          class="inline-block" style="vertical-align: super;">
                          <b-icon :icon="$store.state.favorite.eventId.includes(match.event_id) ? 'star-fill' : 'star'"
                            :variant="$store.state.favorite.eventId.includes(match.event_id) ? 'warning' : ''" class="block" />
                            <div  class="block" style="cursor: pointer;"
                               @click="tvpop(match.channel_live)">
                              <b-img src="/icon/tv2.png" class="inline-block pr-0" style="width: 30px;" />
                            </div> 

                </div>
                <img src="/banner/vs5.png" style="width: 62px; vertical-align: bottom;" class="inline-block mx-2" alt="">
                <div class="inline-block" style="vertical-align: super;">
                    <div  class="block" style="cursor: pointer;">
                      <b-img src="/icon/spreadsheet-app.png" class="inline-block pr-0" style="width: 20px;" />
                    </div> 
                    <div  class="block" style="cursor: pointer;">
                      <b-img src="/icon/frame1.png" class="inline-block pr-0 mt-2" style="width: 20px;" />
                    </div> 
                </div>
            </td>
            <td>
              <small class="font-semibold" :class="stypType(match , index) == '2' ? 'text-danger' : ''"> {{ match['away'+_keyLang] ? match['away'+_keyLang]  : match['away_en'] }}  <img   v-for="(card, i) in match.away_red_cards" :key="i" src="/icon/redcard.gif" class="inline-block" /></small>
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
            <td class="w-12 align-center" is="center2-column2-price" style="border-left: 2px solid silver !important"
                :priceGroups="match"
                :index="index"
                price_type="h"
                market_type="OverUnder"
                overunder="complete"
                >
            </td>
            <td class="w-12 align-center" is="center2-column2-price"         :priceGroups="match"
                :index="index"
                price_type="a"
                market_type="OverUnder"
                overunder="not_complete">
            </td>
          </tr>
        </tbody>
      </table>
      <!-- <div v-if="loading" style="position: absolute; width: 100%;">
        <div class="text-center">
          <b-spinner variant="primary" label=""></b-spinner>
          <span class="block mt-2 text-primary">l o a d i n g ...</span>
        </div>
      </div> -->
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
        isFavorite: false,
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
      showFavoriteButton() {
        return (this.isFavorite || (this.betType != 'mixparlay' && this.betType != 'step' && this.betType != 'early'))
      },
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
      }),
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
      this.isFavorite = this.$route.path.split('/')[1] == 'favorite'
      this.betType = this.$route.params.path
  
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
  ::v-deep td, th {
    padding: 0px; /* กำหนดระยะห่างภายในเซลล์ของตาราง */
  }
  
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

  .module-border-wrap {
      border-radius: 10px;
      position: relative;
      background: linear-gradient(90deg, #d2181e, #0533ae);
      padding: 3px;
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
  