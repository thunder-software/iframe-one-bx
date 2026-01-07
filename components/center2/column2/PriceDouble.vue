<template>
    <div 
    class="test-st"
    :class="{'bg-color': active,'bg-green': (priceUpdating > 0 && !active),'bg-red': (priceUpdating < 0 && !active) , checkprice : blinkBg }"
    
    >
    <div style="">{{checkpriceUpdating(priceUpdating,active)}}</div>
        <div v-if="odd_online != 0" @click="Bet(priceGroups)"  :class="checkodds == true ? 'hidden' : ''">
            <small class="font-semibold" :style="price < 0 ? 'color:#ff0f11;' : 'color:white;' " v-if="price != 0">
                <my-format-price :value="price" :decimal="2" @change="updateBg" /> 
            </small>
            <b-icon icon="caret-up-fill" variant="success" style="position: absolute;margin-top: 6px;" font-scale="0.7" v-if="(priceUpdating > 0 && !active)"></b-icon>
            <b-icon icon="caret-down-fill" variant="danger" style="position: absolute;margin-top: 6px;" font-scale="0.7" v-if="(priceUpdating < 0 && !active)"></b-icon>
            <!-- {{ active }} -->
        </div>
        <div v-else>
            <small class="font-semibold" v-if="odd_online == 1 && type_online != 'type45' && price != 0" :style="price < 0 ? 'color:red;' : '' "> {{ price }}</small>
        </div>
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
    </div>
</template>

<script>
import { mapActions, mapGetters  } from "vuex";
export default {
    props: ['odds', 'priceGroups' , 'marketType', 'isonline' ,'type_online' , 'type' , 'index'],
    data() {
        return {
            blinkBg : false,
            change_active: false,
            old_data: null,
            id_odds: null,
            in_percent: null,
            odds_array : null,

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
            errMsg:null,
            checkblink : 'bg-blink'
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
        typebet(){
        if (this.$route.path.split('/')[1] == 'favorite') {
            this.path = 'all'
        } else {
            this.path = this.$route.params.path.toString()
        }
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
        Bet(data){
            // this.change_active = true
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

            var obj = {};
            var choice
            if(this.type == 'h'){
            choice = data.home_en
            }else if(this.type == 'a'){
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

             var value = this.odds.find(f=> f.market_type == this.marketType)
            
            obj = {
                'lang': langs,
                'league_name_en':data.name_en,
                'league_name_th':data.name_th,
                'market_type': this.marketType,
                'in_who': data.in_who,
                'point': value.point,
                'event_id': value.event_id,
                'id' : value.id,
                'odd_id': value.odds_id,
                'option': this.type,
                'type_bet': this.path,
                'open': true,
                'odd': this.price,
            }
            
            this.fetchbetlist(true)
            this.fetchActionsTab(obj);
            if(localStorage.getItem('quickbet') == 'true'){
            this.actionsQuickbet(true)
            }

        },
        updateBg(prices){
            let oldValue = (prices.oldValue < 0) ? -1/prices.oldValue : prices.oldValue;
            let newValue = (prices.newValue < 0) ? -1/prices.newValue : prices.newValue;
            this.priceUpdating = (newValue > oldValue) ? 1 : -1;
            setTimeout(() => {
            this.priceUpdating = 0;
            },3000)
        },
        set_percent(){
            const value =  this.odds.filter(d=> d.market_type === this.marketType).find(d => d);
            if(value){
                var price = null;
                switch (this.type) {
                    case 'a':
                        price = value.prices.filter(d => d.option === 'a').find(d => d);
                        break;
                    case 'h':
                        price = value.prices.filter(d => d.option === 'h').find(d => d);
                        break;
                    case 'x':
                        price = value.prices.filter(d => d.option === 'x').find(d => d);
                        break;
                    default: null;
                }
                const p = price ? parseInt((price.price * 100) * -1) : 0;
                this.old_data = p
                this.in_percent = p
                this.id_odds = value.id
                this.odds_array = value.online
            }
        }
    },
    computed: {
        ...mapGetters({
            getbet: "tabbet/getbet",
            mockbet : "tabbet/mockbet",
            getmix: "tabmix/getmix",
            getQuickbet : "quickbet/getQuickbet"
        }),
        checkodds(){
             const value = this.odds.filter(d=> d.market_type === this.marketType).find(d => d);
             if(value){
                 if(value.l_percent == null){
                     console.log('value',value);
                     return true
                 }else{
                     return false
                 }
             }
             
         },
        odd_online(){
            const value = this.odds.filter(d=> d.market_type === this.marketType).find(d => d);
            if(value){
                return value.online == 1 && value.status != 'end' ? 1 : 0;
            }
            return 0
        },
        price() {
            const value = this.odds.filter(d => d.market_type === this.marketType).find(d => d);
            if (value) {
                if (this.isonline == 1){
                    var price = null;
                    switch (this.type) {
                        case 'a':
                            price = value.prices.filter(d => d.option === 'a').find(d => d);
                            break;
                        case 'h':
                            price = value.prices.filter(d => d.option === 'h').find(d => d);
                            break;
                        case 'x':
                            price = value.prices.filter(d => d.option === 'x').find(d => d);
                            break;
                        default: null;
                    }
                    const p = price
                    return p.price;
                }
            }
            return null;
        },
        active() {
            
            if(this.path != 'step' && this.path != 'mixparlay'){
            var value = this.odds.find(f=> f.market_type == this.marketType)
            if(value){
                return this.type == this.getbet.dataBetSingle.option && value.id == this.getbet.dataBetSingle.id;
            }
        }else{
            var value = this.odds.find(f=> f.market_type == this.marketType)
                if(value){
                this.type == this.getbet.dataBetParlay.option && value.id == this.getbet.dataBetParlay.id
                if(this.getmix.arrayParlay.length != 0){
                for (let i = 0; i < this.getmix.arrayParlay.length; i++) {
                    if(this.getmix.arrayParlay[i].odd_id == value.odds_id){
                        return this.type == this.getmix.arrayParlay[i].option;
                    }
                }
                }
                if(this.getmix.arrayStep.length != 0){
                for (let i = 0; i < this.getmix.arrayStep.length; i++) {
                    if(this.getmix.arrayStep[i].odd_id == value.odds_id){
                        return this.type == this.getmix.arrayStep[i].option;
                    }
                }
                }
            }
        }
        }
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
        odds: {
            handler(newValue, oldValue){
                const valueOld = oldValue.filter(d=> d.market_type === this.marketType).find(d => d)
                const valueNew = newValue.filter(d=> d.market_type === this.marketType).find(d => d)

                if (valueOld != undefined && valueNew != undefined){
                    // console.log("poppp old", valueNew.id, valueOld.in_percent , valueOld.percent , valueOld.in_percent + valueOld.percent)
                    // console.log("poppp new", valueNew.id, valueNew.in_percent , valueNew.percent ,valueNew.in_percent + valueNew.percent)
                    var priceOld = null;
                    switch (this.type) {
                        case 'a':
                        priceOld = valueOld.prices.filter(d => d.option === 'a').find(d => d);
                            break;
                        case 'h':
                        priceOld = valueOld.prices.filter(d => d.option === 'h').find(d => d);
                            break;
                        case 'x':
                        priceOld = valueOld.prices.filter(d => d.option === 'x').find(d => d);
                            break;
                        default: null;
                    }
                    const pOld = priceOld ? parseInt((priceOld.price * 100) * -1) : 0;

                    var priceNew = null;
                    switch (this.type) {
                        case 'a':
                        priceNew = valueNew.prices.filter(d => d.option === 'a').find(d => d);
                            break;
                        case 'h':
                        priceNew = valueNew.prices.filter(d => d.option === 'h').find(d => d);
                            break;
                        case 'x':
                        priceNew = valueNew.prices.filter(d => d.option === 'x').find(d => d);
                            break;
                        default: null;
                    }
                    const pNew = priceNew ? parseInt((priceNew.price * 100) * -1) : 0;

                    this.id_odds = valueNew.id
                    this.old_data = pNew;
                    this.change_active = pOld != pNew ? true : false
                    this.in_percent = pNew;
                }

            },
            deep: true,
        }
    },
    created(){
        this.typebet()
        this.set_percent()
    }
}
</script>

<style scoped>
    .input-change-work {
        color: #ff2424;
        background-color: #ffff3b;
    }

    .blink-bg {
    /* color: #ff2424; */
    animation: 1s blinkBackground 6;
    }

    @keyframes blinkBackground {
    0% {
        background-color: #ffff3b;
    }

    50% {
        background-color: none;
    }
    }

    .bg-color {
  background: firebrick;
  color: white;
}

.bg-blink {
  -webkit-animation: NAME-YOUR-BLINK 1s infinite;  /* Safari 4+ */
  -moz-animation: NAME-YOUR-BLINK 1s infinite;  /* Fx 5+ */
  -o-animation: NAME-YOUR-BLINK 1s infinite;  /* Opera 12+ */
  animation: NAME-YOUR-BLINK 1s infinite;  /* IE 10+, Fx 29+ */
}
@-webkit-keyframes NAME-YOUR-BLINK {
  0%, 49% {
    background-color: rgba(147, 175, 147, 0);
  }
  50%, 100% {
    background-color: rgba(255, 255, 61, 0.76);
  }
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
  cursor: pointer;

}
.tooltip_test .tooltiptext {
  visibility: visible;
}

</style>