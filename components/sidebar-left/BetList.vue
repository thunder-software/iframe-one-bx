<template>
  <div class="p-0 mt-2">
    <!-- layouts > SidebarLeft > Banner -->
    <b-card
      class="mt-0 h-full"
      no-body
      style="background: #191919;"
    >
      <template #header>
        <div
          class="card-header-menu"
          :style="visible ? '' : 'border-bottom-right-radius: 6px !important; border-bottom-left-radius: 6px !important;'"
          v-b-toggle="`collapse-9`"
          :aria-expanded="visible ? 'true' : 'false'"
        >
          <span class="ml-4">{{ trans("header.mybets") }}</span>
          <b-icon
            :icon="visible ? 'caret-up-fill' : 'caret-down-fill'"
            class="float-right mt-1 mr-2"
          ></b-icon>
        </div>
      </template>
      <b-card-body class="py-0 px-2">
        <div style="background-color: rgb(25 25 25);">
          <b-collapse v-model="visible" id="collapse-9">
          <div style="background: black;" class="text-center">
            <span @click="manualLoadData()" class="cursor-pointer">
              <b-icon
                icon="arrow-repeat"
                :animation="loading == true ? 'spin' : ' '"
                style="color: #ffc107;"
              ></b-icon>
              <span class="font-st">{{ [countDown] }}</span>
            </span>
          </div>
          <div v-if="getlistbet" >
            <div  v-for="(item, i) in getData"  :key="i" :class="{'blink-bg' : item.ticket_status == 'waiting'}" :style="bgColor(item.ticket_status , item)"  class="p-1 text-white"   style="border-bottom : 2px solid silver;">

              <div class="flex" v-if="item.action_type == 'sc'">
                <div class="text-left flex-1 w-full">
                    <div class="flex-1">
                      <span class="">
                      <span v-if="item.choice[0].type == 1" class="align-middle inline-block font-bold" style="font-size: 13px; display: contents;line-height: 0;">{{ trans('header.football') }} - {{ typeBet(item.choice[0].market_type , item.choice[0]) }} </span>
                      <span v-if="item.choice[0].type == 44" class="align-middle inline-block font-bold" style="font-size: 13px; display: contents;line-height: 0;">{{ trans('header.muaythai') }} - {{ typeBet(item.choice[0].market_type , item.choice[0]) }} </span>
                      <span v-if="item.choice[0].type == 35" class="align-middle inline-block font-bold" style="font-size: 13px; display: contents;line-height: 0;">{{ trans('header.cockfight') }} - {{ typeBet(item.choice[0].market_type , item.choice[0]) }} </span>
                      <span v-if="item.choice[0].type == 10" class="align-middle inline-block font-bold" style="font-size: 13px; display: contents;line-height: 0;">{{ trans('header.bullfight') }} - {{ typeBet(item.choice[0].market_type , item.choice[0]) }} </span>
                      <span v-if="item.choice[0].type == 2" class="align-middle inline-block font-bold" style="font-size: 13px; display: contents;line-height: 0;">{{ trans('header.basketball') }} - {{ typeBet(item.choice[0].market_type , item.choice[0]) }} </span>
                      <span v-if="item.choice[0].type == 6" class="align-middle inline-block font-bold" style="font-size: 13px; display: contents;line-height: 0;">{{ trans('header.snooker') }} - {{ typeBet(item.choice[0].market_type , item.choice[0]) }} </span>
                      <span v-if="item.choice[0].type == 37" class="align-middle inline-block font-bold" style="font-size: 13px; display: contents;line-height: 0;">{{ trans('header.takraw') }} - {{ typeBet(item.choice[0].market_type , item.choice[0]) }} </span>  
                      </span>
                    </div>
                  </div>

              </div>
              <div class="flex" v-if="item.action_type != 'sc'">
                <div class="flex-1">
                  <small class=" font-semibold font-st">{{subaction(item.action_type)}}</small>
                </div>
                <b-button v-b-toggle="[`${item.id}`]" size="sm" class="p-0 m-0" style="height: 17px; background: #002e6c; margin-top: 4px !important;">
                <small class="when-open">
                  <b-icon icon="chevron-up" style="vertical-align: inherit;"></b-icon>
                </small>
                <small class="when-closed"><b-icon icon="chevron-down" style="vertical-align: super;"></b-icon></small>
              </b-button>
              </div>
  
              <!-- <div class="flex" id="item.id" v-b-toggle="[`${item.id}`]" @click="visibleBet(item)">
                <div class="flex-1 text-left">
                  <small class=" font-semibold font-st" >ID : {{ item.id }}</small> -->
                  <div :style="item.choice[0].is_live == '1' ? 'border-left : 3px solid #e65322' : 'border-left : 3px solid #5769bf'" class="pl-1">
                      <div v-if="item.action_type !='sc'">
                        {{ item.choice.length }} {{ lang == 'th' ? 'ตัวเลือก' : 'List' }}
                      </div>

                      <div class="flex">
                      <div class="flex-none ">

                          <small  class="font-semibold font-st" :style="canceltext(item.ticket_status)" v-if="item.action_type != 'sc'">
                          <div is="my-format-price" :value="item.odds"  :decimal="2"  ></div>
                        </small>
                        <small class="font-semibold font-st" :style="canceltext(item.ticket_status)" v-if="item.action_type != 'sc'">
                          {{item.odds_type}}
                        </small>
                        <div v-if="item.action_type == 'sc'">

                          <small class="block font-semibold font-st " v-if="item.choice[0].in_who == '1'|| item.choice[0].in_who =='2'" :class="colottext(item.choice[0])">
                            <div v-if="lang == 'th'">
                              <div v-if="item.choice[0].bet_choice_lang != 'สูง' && item.choice[0].bet_choice_lang != 'ต่ำ'">
                                {{ item.choice[0]['bet_choice' + _keyLang] ? item.choice[0]['bet_choice' + _keyLang] : item.choice[0]['bet_choice_lang'] }}
                              </div>
                              <div v-else>
                                {{ checkOverUnder(item.choice[0].bet_choice_lang , item.choice[0].type) }}
                              </div>
                            </div>
                            <div v-else>
                              {{  item.choice[0]['bet_choice'] }}
                            </div>
                        </small>

                        <!-- <small v-if="item.choice[0].market_type == 'FH_Handicap'||item.choice[0].market_type == 'FH_OverUnder'||item.choice[0].market_type == 'FH_1x2'||item.choice[0].market_type == 'FH_OE'" class="font-semibold font-st block" :class="colottext(item.choice[0])">(1st)</small> -->
                        <span v-if="item.choice[0].market_type != '1x2' && item.choice[0].market_type != 'FH_1x2' && item.choice[0].market_type != 'OE' && item.choice[0].type != 44" style="font-size: 14px;">
                          {{ item.choice[0].point }} <span v-if="item.choice[0].is_live == '1'">@</span> <span v-if="item.choice[0].is_live != 0">{{ item.choice[0].h_score}}:{{ item.choice[0].a_score}}</span> @
                        </span>  
                        <span style="font-size: 15px;">
                          <div
                          class="font-st font-bold"
                          is="my-format-price"
                          :value="item.choice[0].price"
                          :decimal="2"
                          ></div>
                        </span>
                        </div>
                      </div>
                      <div class="flex-1 w-64 text-right">
                        <div class="test-p" :style="item.action_type == 'sc' ? 'padding-top: 19px;' : ''">
                          <small class="font-semibold font-st" :style="canceltext(item.ticket_status)">
                          <small class="font-semibold font-st" style="border-radius: 15px;"><div is="my-format-price"  :value="item.stake" thb="thb"  :decimal="0"></div></small>
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-if="item.action_type == 'sc'">
                    <small class="block">
                      {{item.choice[0]['home'+_keyLang] ? item.choice[0]['home'+_keyLang] : item.choice[0]['home_en']}} vs {{ item.choice[0]['away'+_keyLang] ? item.choice[0]['away'+_keyLang] : item.choice[0]['away_en']}}
                    </small>
                    <small class="block">
                      {{ lang == 'th' ? item.choice[0].tournament.name_th : item.choice[0].tournament.name_en }}
                    </small>
                  </div>
               <div class="text-left" :style="bgColor(item.ticket_status)">
                <b-collapse :id="`${item.id}`" class="">
                <div  v-for="(data, i) in item.choice" class="py-1" :key="i" :class="{'border-st' : item.action_type !='sc'}" :style="data.is_live == '1' ? 'background : black' : 'background : black'">
                  <div class="text-left flex w-full">
                    <div class="flex-1 pl-2">
                      <span class="">
                      <span v-if="data.type == 1" class="align-middle inline-block font-bold" style="font-size: 13px; display: contents;line-height: 0;">{{ trans('header.football') }} - {{ typeBet(data.market_type , data) }} </span>
                      <span v-if="data.type == 44" class="align-middle inline-block font-bold" style="font-size: 13px; display: contents;line-height: 0;">{{ trans('header.muaythai') }} - {{ typeBet(data.market_type , data) }} </span>
                      <span v-if="data.type == 35" class="align-middle inline-block font-bold" style="font-size: 13px; display: contents;line-height: 0;">{{ trans('header.cockfight') }} - {{ typeBet(data.market_type , data) }} </span>
                      <span v-if="data.type == 10" class="align-middle inline-block font-bold" style="font-size: 13px; display: contents;line-height: 0;">{{ trans('header.bullfight') }} - {{ typeBet(data.market_type , data) }} </span>
                      <span v-if="data.type == 2" class="align-middle inline-block font-bold" style="font-size: 13px; display: contents;line-height: 0;">{{ trans('header.basketball') }} - {{ typeBet(data.market_type , data) }} </span>
                      <span v-if="data.type == 6" class="align-middle inline-block font-bold" style="font-size: 13px; display: contents;line-height: 0;">{{ trans('header.snooker') }} - {{ typeBet(data.market_type , data) }} </span>
                      </span>
                    </div>
                  </div>

                  <div :style="data.is_live == '1' ? 'border-left : 3px solid #e65322' : 'border-left : 3px solid #5769bf'" class="pl-1 ml-1">
                    <div v-if="data.market_type == 'OverUnder' && data.type == '44'">
                    <div class="text-left">
                      <small class="font-st font-semibold" :style="canceltext(item.ticket_status)">
                        {{ data['bet_choice'] == 'Under' ? trans("content.not_complete") : trans("content.complete") }}
                      <small v-if=" data.market_type != '1x2'" class="font-semibold font-st"> @</small> <small class="font-semibold font-st"><div is="my-format-price" :value="data.price" :decimal="2"></div></small>  <small class="font-semibold font-st">{{ data.odd_type }}</small>
                      <small class="font-st" :class="data.status == 'running'? ' text-white font-semibold':'text-danger  font-semibold '"> {{check(data.status)}} </small>
                      </small>
                      <small class="block"><small class=" font-semibold font-st" v-if="item.length == i" :style="canceltext(item.ticket_status)">{{data.league_name_en}}</small></small>
                    </div>
                    </div> 
                    <div v-else>
                        <small class="block font-semibold font-st " v-if="data.in_who == '1'|| data.in_who =='2'" :class="colottext(data)">
                            <div v-if="lang == 'th'">
                              <div v-if="data.bet_choice_lang != 'สูง' && data.bet_choice_lang != 'ต่ำ'">
                                {{ data['bet_choice' + _keyLang] ? data['bet_choice' + _keyLang] : data['bet_choice_lang'] }}
                              </div>
                              <div v-else>
                                {{ checkOverUnder(data.bet_choice_lang , data.type) }}
                              </div>
                            </div>
                            <div v-else>
                              {{  data['bet_choice'] }}
                            </div>
                        </small>

                        <!-- <small v-if="data.market_type == 'FH_Handicap'||data.market_type == 'FH_OverUnder'||data.market_type == 'FH_1x2'||data.market_type == 'FH_OE'" class="font-semibold font-st block" :class="colottext(data)">(1st)</small> -->
                        <span v-if="data.market_type != '1x2' && data.market_type != 'FH_1x2' && data.market_type != 'OE'" style="font-size: 15px;">
                          {{ data.point }} <span v-if="data.is_live == '1'">@</span> <span v-if="data.is_live != 0">{{ data.h_score}}:{{ data.a_score}}</span> @
                        </span>  
                        <span style="font-size: 15px;">
                          <div
                          class="font-st font-bold"
                          is="my-format-price"
                          :value="data.price"
                          :decimal="2"
                          ></div>
                        </span>
                        <small class="block" style="color: silver; line-height: 1;">{{ formatDate(item.trans_time ,'1') }}</small>
                      </div>
                    </div>


                  <small class="block pl-1">
                    {{data['home'+_keyLang] ? data['home'+_keyLang] : data['home_en']}} vs {{ data['away'+_keyLang] ? data['away'+_keyLang] : data['away_en']}}
                  </small>
                  <small class="block pl-1">
                    {{ lang == 'th' ? data.tournament.name_th : data.tournament.name_en }}
                  </small>

                </div>
              </b-collapse>
              </div>
              <div class="flex">
                <div class="flex-1">
                  <small class="font-st block" style="color: silver; line-height: 1.5;">ID:{{ item.id }}</small>
                  <small class="font-st block" style="color: silver; line-height: 1;">{{ formatDate(item.trans_time) }}</small>
                </div>
                <div class="flex text-right">
                  {{check(item.ticket_status)  }}
                </div>
              </div>
          </div>
          </div>

          <div class="mt-2 mb-2">
            <span style="font-size: 14px; color: white;">
              {{ trans("sidebar.seeviwe") }}
            </span>
          </div>
          </b-collapse>

          <div is="user-tabs" keyw="seeall"></div>
        </div>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import collect from "collect.js";
import moment from "moment"
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      timer: null,
      countDown: 0,
      lang: this.$auth.$storage.getUniversal("language"),
      refreshRate: 120,
      loading: false,
      visible : true
    };
  },
  computed: {
    ...mapGetters({
      getlistbet: "listbet/getlistbet",
      getticket:"listbet/getticket",
      getbetlist: 'fetchbet/getbetlist',
      langs: "language/langs",
      getbet : "tabbet/getbet"
    }),
    getData(){
      if (this.getlistbet.ticket != undefined) {
        const dataBet = this.getlistbet.ticket.map((element,index) => {
          element.sort = element.ticket_status+'id'+ element.id
           return element
          // console.log("element1",element);
        }).sort(function(a,b){
          let sorta = a.sort;
          let sortb = b.sort;
          if (sorta > sortb){
              return -1;
          }
          if (sorta < sortb){
              return 1;
          }
          return 0;
        });
        console.log("statusstatus", dataBet);

        return  dataBet
      }
      return []
    }
  },
  methods: {
    ...mapActions({
      fetchListBet: "listbet/fetchListBet",
      fetchGetListBet: "listbet/fetchGetListBet",
    }),
    checkOverUnder(e , type){
      if(this.lang == 'th'){
        if(type == 44){
          return e == 'สูง' ? 'ครบยก' : 'ไม่ครบยก'
        }else{
          return e == 'สูง' ? 'สูงกว่า' : 'ต่ำกว่า'
        }
      }else{
        if(type == 44){
          return 'not_complete'
        }else{
          return e
        }
      }
    },
    typeBet(e , data){      
      if(e == 'Handicap'){
        return this.lang == 'th' ? 'แฮนดีแคพ' : 'Handicap'
      }
      if(e == 'FH_Handicap'){
        return this.lang == 'th' ? 'แฮนดีแคพครึ่งแรก' : 'FH Handicap'
      }
      if(e == 'OverUnder'){
        if(data.type != 44){
          return this.lang == 'th' ? 'สูงกว่า ต่ำกว่า' : 'OverUnder'
        }else{
          return this.lang == 'th' ? 'ครบยก ไม่ครบยก' : 'Complete/Notcomplete'
        }
      }
      if(e == 'FH_OverUnder'){
        return this.lang == 'th' ? 'สูงกว่า ต่ำกว่าครึ่งแรก' : 'FH OverUnder'
      }
      if(e == '1x2'){
        return '1x2'
      }
      if(e == 'FH_1x2'){
        return this.lang == 'th' ? 'ครึ่งแรก 1x2' : 'FH 1x2'
      }
      if(e == 'OE'){
        return this.lang == 'th' ? 'คี่/คู่' : 'Odd/Even'
      }
    },
    formatDate(e , type){
      if(!type){
        return moment(e).format('MM/DD') + e.substring(10, 30);
      }else{
        return moment(e).format('MM/DD');
      }
    },
    bgColor(e , type){
      if (e == 'running') {
        if(type){
          if(type.action_type == 'sc'){
            if(type.choice[0].is_live == '1'){
              return 'background: back '
            }else{
              return 'background: back '
            }
          }
        }
        
        // return 'background: aliceblue '
      }if (e =='waitingRejected'|| e =='reject'|| e =='cancel' || e =='mcancel') {
          return 'background: back;'
      }
    },
    canceltext(item){
      if (item =='waitingRejected' || item =='reject'|| item =='cancel' || item =='mcancel') {
          return 'text-decoration: line-through;'
      }
    },
    colottext(data){
      if (data.in_who == '1' && data.option == 'h') {
          return "text-red-600"
      }
      if (data.in_who == '2' && data.option == 'a') {
          return "text-red-600"
      }
      if (data.in_who == '1' && data.option == 'a') {
          return  "text-primary"
      }
      if (data.in_who == '2' && data.option == 'h') {
          return  "text-primary"
      }
      if (data.in_who == '1' && data.option == 'x') {
          return  "text-white"
      }
      if (data.in_who == '2' && data.option == 'x') {
          return  "text-white"
      }
    },

   async startAutoRefresh() {
     this.loading = true;
      this.timer =  setInterval(async () => {
        this.countDown--;
        if (this.countDown <= 0) {
           await this.fetchGetListBet({lang:this.lang});
            const status = collect(this.getlistbet.ticket).pluck('ticket_status');
             if(typeof status.items != undefined && status.items.includes('waiting')){

              this.countDown = 6
             }else{

              this.countDown = 120
             }
        }
       }, 1000);
       this.loading = false;

    },
    async manualLoadData() {
             clearInterval(this.timer);
             await this.fetchGetListBet({lang:this.lang});
             const status = collect(this.getlistbet.ticket).pluck('ticket_status');
             if(typeof status.items != undefined && status.items.includes('waiting')){
              console.log(true)
              this.countDown = 6
             }else{
              console.log(false)
              this.countDown = 120
             }
             this.startAutoRefresh();

    },
    async first_set_countdown(){
        await this.fetchGetListBet({lang:this.lang});
        const status = collect(this.getlistbet.ticket).pluck('ticket_status');
        if(typeof status.items != undefined && status.items.includes('waiting')){
                console.log("first_set_countdown",true);
                this.countDown = 6
              }else{
                console.log("first_set_countdown",false);
                this.countDown = 120
            }

    },
    check(data){
      if(data == "running"){
        return "OK"
       }if(data == "waiting" && this.lang == "th" ){
        return "รอ ON"
       }if(data == "waitingRejected" && this.lang == "th" ){
        return "รอ ON ยกเลิก"
       }if(data == "reject" && this.lang == "th" ){
        return "ยกเลิก"
       }if(data == "cancel" && this.lang == "th" ){
        return "ยกเลิก"
       }if(data == "mcancel" && this.lang == "th" ){
        return "ยกเลิก"
       }else{
        return data
       }
    },
    subaction(data){
      if(data == 'sc' && this.lang == 'en'){
        return data.replace('sc','handicap')
      }
      if (data == 'sc' && this.lang == 'th') {
       return  "เดี่ยว"
      }
      if (data == 'step' && this.lang == 'th') {
       return  "สเต็ป"
      }
      else{
        return data
      }
    },
    inwhodata(item){

      if([44,35,10035].includes(item.type)){
          return '';
      }

      if (item.in_who == '1' && item.option == 'h' && this.lang == 'th') {
          return "ต่อ"
      }
      if (item.in_who == '2' && item.option == 'a' && this.lang == 'th') {
          return "ต่อ"
      }
      if (item.in_who == '1' && item.option == 'a' && this.lang == 'th') {
          return  "รอง"
      }
      if (item.in_who == '2' && item.option == 'h' && this.lang == 'th') {
          return  "รอง"
      }

      if (item.in_who == '1' && item.option == 'h' && this.lang == 'en') {
          return "T."
      }
      if (item.in_who == '2' && item.option == 'a' && this.lang == 'en') {
          return "T."
      }
      if (item.in_who == '1' && item.option == 'a' && this.lang == 'en') {
          return "R."
      }
      if (item.in_who == '2' && item.option == 'h' && this.lang == 'en') {
          return "R."
      }

      if (item.in_who == '1' && item.option == 'h' && this.lang != 'en' && this.lang != 'th') {
          return "T."
      }
      if (item.in_who == '2' && item.option == 'a' && this.lang != 'en' && this.lang != 'th') {
          return "T."
      }
      if (item.in_who == '1' && item.option == 'a' && this.lang != 'en' && this.lang != 'th') {
          return "R."
      }
      if (item.in_who == '2' && item.option == 'h' && this.lang != 'en' && this.lang != 'th') {
          return "R."
      }

    },
    submarket(item){
       if (item == 'OverUnder' && this.lang == 'th') {
         return "สูงต่ำ"
       }
       if (item == 'FH_Handicap' && this.lang == 'th') {
         return "แฮนดีแคพครึ่งแรก"
       }
       if (item == 'FH_OverUnder' && this.lang == 'th') {
         return "สูงต่ำครึ่งแรก"
       }
       if (item == 'Handicap' && this.lang == 'th') {
         return "แฮนดีแคฟ"
       }
       if (item == 'OE' && this.lang == 'th') {
         return "คี่คู่"
       }
       if (item == 'FH_1x2' && this.lang == 'th') {
        return "1x2ครึ่งแรก"
       }
       if (item == 'FH_Handicap' && this.lang == 'en') {
        return "Handicap (1st)"
       }
       if (item == 'FH_1x2' && this.lang == 'en') {
        return "1x2 (1st)"
       }
       if (item == 'FH_OverUnder' && this.lang == 'en') {
         return "OverUnder (1st)"
       }
       if (item == 'FH_Handicap' && this.lang != 'en' && this.lang != 'th') {
        return "Handicap (1st)"
       }
       if (item == 'FH_1x2' && this.lang != 'en' && this.lang != 'th') {
        return "1x2 (1st)"
       }
       if (item == 'FH_OverUnder' && this.lang != 'en' && this.lang != 'th') {
         return "OverUnder (1st)"
       }
       return item


    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
 async created() {
    await this.fetchGetListBet({lang:this.lang})
    await this.first_set_countdown()
    await this.startAutoRefresh();

  },
  watch : {
    lang(value) {
      this.fetchGetListBet({lang:value})
    },
    'getbet' : {
        handler(val){
          if(val.tab){
            this.visible = true
          }
        },
        deep: true
      },
    'getcredit' : {
        handler(val){
            this.fetchActionsCredit()
            this.relodeBalance()
        },
        deep: true
      },
      langs(value){
      this.lang = value
     },
    'getlistbet.ticket' (value) {
      if (value != 0) {
        const status = collect(value).pluck('ticket_status');
        if(typeof status.items != undefined && status.items.includes('waiting')){
                this.countDown = 6
              }else{
                this.countDown = 120
            }
      }

  }}
};
</script>
<style scoped>
.card-header-menu {
  text-align: center;
  border-top-left-radius: 6px !important; 
  border-top-right-radius: 6px !important;
  color: #ffc107;
  border-radius: 0px;
  padding: 0px 0px;
  font-weight: bold;
  background: #191919;
}

.collapsed > .when-open,
.not-collapsed > .when-closed {
  display: none;
}
.font-st{
  font-size: 12px !important;
  color: #e0e0e0;
}
.textoverflow-st{
  padding: 0;
  position: relative;
  display: inline-block;
  text-decoration: none;
  color: #000;
  vertical-align: sub;
  /* text-overflow: clip;
     white-space: nowrap;
     width: 160px;
     text-align: center;
     overflow: hidden; */
}
.border-st{
  border-bottom: 1px dashed #d6d8d9;
}
.card-header {
  text-align: center;
  /* background: #EFF8FF; */
  color: #ffc107;
  font-weight: bold;
  border-radius: 0px;
  padding: 6px 0px;
}
  .secondary-bg{
    background: #f0f0f0 !important;

  }
	.blink-bg{
		animation: blinkingBackground 2s infinite;

	}
	@keyframes blinkingBackground{
		0%, 49%		{ background-color: black;}
		50%, 100% { background-color: rgb(33 29 14);}
	}

</style>
