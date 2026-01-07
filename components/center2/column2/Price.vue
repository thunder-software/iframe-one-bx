<template>
  <td
    v-if="hasData"
    class="test-st"
    :class="{'bg-color': active,'bg-green': (priceUpdating > 0 && !active),'bg-red': (priceUpdating < 0 && !active) , checkprice : blinkBg }"
    >
          <div style="">{{checkpriceUpdating(priceUpdating,active)}}</div>
          <small @click="Bet(priceGroups , index)" class="cursor-pointer sy-price" :class="{'hidden' : checkZeroStep(priceGroups.priceGroups[market_type][index - 1].prices[
                  indexPrice(priceGroups.priceGroups[market_type][index - 1].prices)
                ].price , market_type) == true}" style="font-weight: 600;" v-if="priceGroups.priceGroups[market_type][index - 1].prices">
            <div v-if="priceGroups.priceGroups[market_type][index - 1].prices[0].price != 0 && priceGroups.priceGroups[market_type][index - 1].prices[1].price != 0" style="display: inline-block;">
            <div is="my-format-price" @change="updateBg"
              :value="
                !priceGroups.priceGroups[market_type][index - 1].prices[
                  indexPrice(priceGroups.priceGroups[market_type][index - 1].prices)
                ].price ? 0 : priceGroups.priceGroups[market_type][index - 1].prices[
                  indexPrice(priceGroups.priceGroups[market_type][index - 1].prices)
                ].price
              "
              :active="active"
              :decimal="2"
            ></div>
            </div>
          </small>
          <b-icon icon="caret-up-fill" variant="success" style="position: absolute;margin-top: 6px;" font-scale="0.7" v-if="(priceUpdating > 0 && !active)"></b-icon>
          <b-icon icon="caret-down-fill" variant="danger" style="position: absolute;margin-top: 6px;" font-scale="0.7" v-if="(priceUpdating < 0 && !active)"></b-icon>
            <div class="tooltip_test" v-if="active && getQuickbet">
              <span class="tooltiptext">
                <div
                  is="sidebar-left-sport-bet-single"
                  fast="fast"
                  :overunder="overunder"
                  @closebet="closebet()"
                  :dataBet="mockbet.mockBetSingle"
                  :lang="lang"
                  :errMsg="errMsg"
                  v-if="!bettype"
                />
              </span>
            </div>
          </td>
          <td v-else>
          </td>
</template>

<script>
import { mapActions, mapGetters  } from "vuex";
export default {
  props: ["priceGroups", "market_type", "index", "price_type", "status", "overunder"],
  data() {
    return {
      blinkBg: false,
      path : '',
      priceUpdating: 0,
      typetable : '',
      show: false,
      tooltip_id : null,
      menu: false,
      bettype: false,
      loading: true,
      hidemenu: true,
      checkprice : 'bg-blink',
      lang: this.$auth.$storage.getUniversal("language"),
      tabIndex: 0,
      dataBetChoice: [],
      dataBetList: {
        dataBetSingle: [],
        dataBetParlay: []
      },
      errMsg:null
    }
  },
  computed: {
    ...mapGetters({
      getbet: "tabbet/getbet",
      mockbet : "tabbet/mockbet",
      getmix: "tabmix/getmix",
      getQuickbet : "quickbet/getQuickbet",
    }),
    hasData(){
      return   this.priceGroups.priceGroups[this.market_type] != undefined &&
      this.priceGroups.priceGroups[this.market_type][this.index - 1] != undefined && this.priceGroups.priceGroups[this.market_type][this.index - 1].l_percent != null && this.priceGroups.priceGroups[this.market_type][this.index - 1].in_percent != null 
      && this.priceGroups.priceGroups[this.market_type][this.index - 1].prices[this.indexPrice(this.priceGroups.priceGroups[this.market_type][this.index - 1].prices)].price != 0
    },
    active() {
      if(this.path != 'step' && this.path != 'mixparlay'){
        return this.price_type == this.getbet.dataBetSingle.option && this.priceGroups.priceGroups[this.market_type][this.index - 1].id == this.getbet.dataBetSingle.id;
      }else{
        this.price_type == this.getbet.dataBetParlay.option && this.priceGroups.priceGroups[this.market_type][this.index - 1].id == this.getbet.dataBetParlay.id
        if(this.getmix.arrayParlay.length != 0){
          for (let i = 0; i < this.getmix.arrayParlay.length; i++) {
            if(this.getmix.arrayParlay[i].odd_id == this.priceGroups.priceGroups[this.market_type][this.index - 1].odds_id){
                return this.price_type == this.getmix.arrayParlay[i].option;
              }
          }
        }
        if(this.getmix.arrayStep.length != 0){
          for (let i = 0; i < this.getmix.arrayStep.length; i++) {
            if(this.getmix.arrayStep[i].odd_id == this.priceGroups.priceGroups[this.market_type][this.index - 1].odds_id){
                return this.price_type == this.getmix.arrayStep[i].option;
              }
          }
        }
      }
    }
  },
  methods: {
    ...mapActions({
      pushBetList: "tabmix/pushBetList",
      fetchGetListBet: "listbet/fetchGetListBet",
      fetchActionsTab: "tabbet/fetchActionsTab",
      setOUtab : "tabbet/setOUtab",
      fetchbetlist : "fetchbet/fetchbetlist",
      actionsQuickbet:"quickbet/actionsQuickbet",
      actionsTabsport: 'clicksport/actionsTabsport'
    }),
    checkpriceUpdating(priceUpdating , active){
        if(priceUpdating > 0 && !active){
            this.checkprice = 'bg-green'
        }
        if(priceUpdating < 0 && !active){
            this.checkprice = 'bg-red'
        }
    },
    checkZeroStep(e , type){
      if(this.$route.params.path == 'step'){
        if(type == '1x2'){
          return e < 1;
        }
      }
    },
    indexPrice(prices) {
        let price = prices.findIndex((rank) => rank.option === this.price_type);
        return price;
    },
  updateBg(prices){
    let oldValue = (prices.oldValue < 0) ? -1/prices.oldValue : prices.oldValue;
    let newValue = (prices.newValue < 0) ? -1/prices.newValue : prices.newValue;
    this.priceUpdating = (newValue > oldValue) ? 1 : -1;
    setTimeout(() => {
      this.priceUpdating = 0;
    },3000)
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
      this.actionsTabsport(false)
      this.hidemenu = true;
      this.loading = true;
      this.dataBetList.dataBetSingle = [];
      this.dataBetList.dataBetParlay = [];
      this.getbet.dataBetParlay = [];
      this.getbet.dataBetSingle = [];
      this.fetchActionsTab(false);
      this.overunder = undefined
      this.setOUtab(this.overunder)
      // this.show = false
      // this.tooltip_id = null

      // setTimeout(() => {
      //   this.tooltip_id = this.numberIndex(data , index)
      //   this.show = true
      // }, 500);

      // console.log('tooltip_id',this.tooltip_id);


        //this.$nuxt.$loading.start();
        var obj = {};
        var choice
        if(this.price_type == 'h'){
          choice = data.home_en
        }else if(this.price_type == 'a'){
          choice = data.away_en
        }else{
          choice = "Draw"
        }

        var langs 
        if(this.lang == 'th'){
          langs = 'th'
        }else if(this.lang != 'en'){
          langs = 'en'
        }else{
          langs = 'en'
        }

        obj = {
          'lang': langs,
          'league_name_en':data.tournament.name_en,
          'league_name_th':data.tournament.name_th,
          'market_type': this.market_type,
          'in_who':this.priceGroups.priceGroups[this.market_type][this.index - 1].in_who,
          'point':this.priceGroups.priceGroups[this.market_type][this.index - 1].point,
          'event_id': data.event_id,
          'id' : data.priceGroups[this.market_type][this.index - 1].id,
          'odd_id': data.priceGroups[this.market_type][this.index - 1].odds_id,
          'option': this.price_type,
          'type_bet': this.path,
          'open': true,
          'odd': this.priceGroups.priceGroups[this.market_type][this.index - 1].prices[
              this.indexPrice(
                this.priceGroups.priceGroups[this.market_type][this.index - 1]
                  .prices
              )
            ].price,
        }
        // if(this.path != 'all' || this.path != 'live' || this.path != 'today'){
          this.fetchbetlist(true)
          this.fetchActionsTab(obj);
          if(localStorage.getItem('quickbet') == 'true'){
          this.actionsQuickbet(true)
          }

    },
    typebet(){
      if (this.$route.path.split('/')[1] == 'favorite') {
        this.path = 'all'
      } else {
        this.path = this.$route.params.path.toString()
      }
    },
    selectmenu(event) {
      this.menu = event;
    },
    closebet() {
      this.hidemenu = true;
      this.loading = true;
      this.dataBetList.dataBetSingle = [];
      this.dataBetList.dataBetParlay = [];
      this.getbet.dataBetParlay = [];
      this.getbet.dataBetSingle = [];
      this.fetchActionsTab(false);

    },
  },
  created(){
    this.typebet()
    this.actionsQuickbet()
  },
  watch: {
    hasData : {
      handler(newValue, oldValue) {
        if(newValue == true && oldValue == false){
          this.blinkBg = true
          setTimeout(() => {
            this.blinkBg = false;
          },3000)
        }
      },
      deep: true
    },
    langs(value) {
      this.lang = value;
    },
    getQuickbet(value){
      if(value == undefined){
        if(localStorage.getItem('quickbet') == 'true'){
          if(this.$route.params.path != 'step' && this.$route.params.path != 'mixparlay'){
            this.actionsQuickbet(true)
          }
        }
      }

    }
  }
};
</script>

<style scoped>
.bg-color {
  background: #cca50b;
  color: white;
}
/* .sy-price:hover {
  background: antiquewhite;
} */
/* .bg-red {
  background: rgb(255 121 121 / 42%);
  background-position: right 5px;
  background-repeat: no-repeat;
  color: black;
} */

.bg-blink {
  -webkit-animation: NAME-YOUR-RED 1s infinite;  /* Safari 4+ */
  -moz-animation: NAME-YOUR-RED 1s infinite;  /* Fx 5+ */
  -o-animation: NAME-YOUR-RED 1s infinite;  /* Opera 12+ */
  animation: NAME-YOUR-RED 1s infinite;  /* IE 10+, Fx 29+ */
}

@-webkit-keyframes NAME-YOUR-RED {
  0%, 49% {
    background-color: #76120c;
  }
  50%, 100% {
    background-color: #a52922;
  }
}


.bg-red {
  -webkit-animation: NAME-YOUR-RED 1s infinite;  /* Safari 4+ */
  -moz-animation: NAME-YOUR-RED 1s infinite;  /* Fx 5+ */
  -o-animation: NAME-YOUR-RED 1s infinite;  /* Opera 12+ */
  animation: NAME-YOUR-RED 1s infinite;  /* IE 10+, Fx 29+ */
}

@-webkit-keyframes NAME-YOUR-RED {
  0%, 49% {
    background-color: #76120c;
  }
  50%, 100% {
    background-color: #76120c;
  }
}

/* .bg-green {
  background: rgb(113 255 113 / 45%);
  background-position: right 5px;
  background-repeat: no-repeat;
  color: black;
} */

.bg-green {
  -webkit-animation: NAME-YOUR-ANIMATION 1s infinite;  /* Safari 4+ */
  -moz-animation: NAME-YOUR-ANIMATION 1s infinite;  /* Fx 5+ */
  -o-animation: NAME-YOUR-ANIMATION 1s infinite;  /* Opera 12+ */
  animation: NAME-YOUR-ANIMATION 1s infinite;  /* IE 10+, Fx 29+ */
}

@-webkit-keyframes NAME-YOUR-ANIMATION {
  0%, 49% {
     background-color: #2a6141; 
  } 
  50%, 100% { 
    background-color: #2a6141; 
  }
}

.tooltip_test {
  color: black;
  position: relative;
  /* display: inline-block;
  border-bottom: 1px dotted black; */
}

.tooltip_test .tooltiptext {
  visibility: hidden;
  width: 253px;
  text-align: center;
  border-radius: 6px;
  right: 0px;
  padding: 5px 5px;

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
