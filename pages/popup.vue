<template>
  <div>
    <b-container>
    <b-overlay :show="loading" rounded="sm" style="color: #c0c0c0;" class="mt-1">
      <div class="bg-white px-3 py-3 mt-2 rounded">

            <b-table-simple small striped borderless  id="table-user" class=" text-center">
              <b-thead >
                <b-tr>
                  <b-th> BetId/Time</b-th>
                  <b-th> ListBet</b-th>
                </b-tr>
              </b-thead>
              <b-tbody v-if="item" style="font-size: 14.5px;">
                <b-tr>
                  <b-td class="p-1 align-top" :class="item.ticket_status == 'waiting' ? 'blink-bg ' : ''" :style="item.ticket_status == 'reject'||item.ticket_status == 'waitingRejected' ? 'text-decoration: line-through;background: #000 !important;' : ''">
                     <div><span class="text-base"> BetId : {{ item.id }}</span></div>
                     <div><span class="text-base">{{item.trans_time}}</span></div>
                     <div><span class="text-base">{{subaction(item.action_type)}}</span></div>
                  </b-td>
                  <b-td class=" p-1 align-top text-right" :class="item.ticket_status == 'waiting' ? 'blink-bg ' : ''" :style="item.ticket_status == 'reject'||item.ticket_status == 'waitingRejected' ? 'text-decoration: line-through;background: #000 !important;' : ''">
                    <div v-for="(data, i) in item.choice" :key="i" class="mb-1" :class="item.action_type == 'single' || (i+1) == item.choice.length  ? '':'border-bt'" >
                    <div class="text-right">
                      <div v-if="data.market_type == 'OverUnder'|| data.market_type == 'FH_OverUnder' || data.market_type == 'OE'">
                        <div v-if="data.market_type == 'OverUnder' && data.type == '44'">
                          <div class="text-right">
                              <span :class="colottext(data)">{{ data['home'+_keyLang] ? data['home'+_keyLang] : data['home_en']}}</span> &nbsp;
                              <span class="text-danger" v-if="data.market_type == 'FH_Handicap'||data.market_type == 'FH_OverUnder'||data.market_type == 'FH_1x2'||data.market_type == 'FH_OE'">(1st)</span>
                              [<span class="font-black">{{ data['bet_choice'] == 'Under' ? trans("content.not_complete") : trans("content.complete") }}</span>]
                          </div>
                        </div>
                        <div v-else>
                          <span class="inline-block " v-if="data.in_who == '1' ||data.in_who == '2'" :class="colottext(data)">
                            <div v-if="lang == 'th'">
                              {{ data['bet_choice' + _keyLang] ? data['bet_choice' + _keyLang] : data['bet_choice_lang'] }}
                            </div>
                            <div v-else>
                              {{  data['bet_choice'] }}
                            </div>

                          </span>
                          <span :class="colottext(data)">{{ data['home'+_keyLang] ? data['home'+_keyLang] : data['home_en']}}</span> &nbsp;
                          <span class="text-danger" v-if="data.market_type == 'FH_Handicap'||data.market_type == 'FH_OverUnder'||data.market_type == 'FH_1x2'||data.market_type == 'FH_OE'">(1st)</span>
                          [<span class="font-black">{{submarket(data.market_type)}}</span>]
                        </div>
                      </div>
                      <div v-else>
                        <span v-if="data.market_type == 'Handicap' || data.market_type == 'FH_1x2' || data.market_type == 'FH_Handicap' " :class="colottext(data)">{{ inwhodata(data) }}</span>
                        <span class="inline-block " :class="colottext(data)"  >
                          <div v-if="lang == 'th'">
                            {{ data['bet_choice' + _keyLang] ? data['bet_choice' + _keyLang] : data['bet_choice_lang'] }}
                          </div>
                          <div v-else>
                            {{  data['bet_choice'] }}
                          </div>
                        </span>
                        <span :class="colottext(data)" v-if="data.market_type == 'FH_Handicap'||data.market_type == 'FH_OverUnder'||data.market_type == 'FH_1x2'||data.market_type == 'FH_OE'">(1st)</span>
                        [<span class="font-black">{{submarket(data.market_type)}}</span>]
                      </div>
                    </div>

                    <div class="text-right">
                      <div v-if="data.market_type == 'OverUnder' && data.type == '44'">
                        <span >@</span> <span class="text-danger" v-if="data.is_live == '1'">[{{ data.h_score }}-{{ data.a_score }}]</span> <span><my-format-price :value="data.price" :decimal="2" /></span>
                      </div>
                      <div v-else>
                        <span >{{ data.point }} @</span> <span class="text-danger" v-if="data.is_live == '1'">[{{ data.h_score }}-{{ data.a_score }}]</span> <span><my-format-price :value="data.price" :decimal="2" /></span>
                      </div>
                    </div>
                    <div class="text-right">
                    <span :class="data.in_who == '1' ?'text-danger':'text-primary'">{{ data['home'+_keyLang] ? data['home'+_keyLang] : data['home_en']}}</span>
                    <span :class="data.in_who == '1' ?'text-danger':'text-primary'" v-if="data.market_type == 'FH_Handicap'||data.market_type == 'FH_OverUnder'||data.market_type == 'FH_1x2'||data.market_type == 'FH_OE'">(1st)</span>
                    <img src="/icon/versus.png" class="inline-block" alt="" style="width: 18px;height: 18px;"> 
                    <span :class="data.in_who == '2' ?'text-danger':'text-primary'">{{ data['away'+_keyLang] ? data['away'+_keyLang] : data['away_en']}}</span>
                    <span :class="data.in_who == '2' ?'text-danger':'text-primary'" v-if="data.market_type == 'FH_Handicap'||data.market_type == 'FH_OverUnder'||data.market_type == 'FH_1x2'||data.market_type == 'FH_OE'">(1st)</span>

                    </div>
                    <div class="text-right">
                    <span class="font-black"> {{ data.tournament['name' + _keyLang] ?  data.tournament['name' + _keyLang] : data.tournament['name_en']}} </span> <br/>
                    <span class="font-black text-danger" v-if="data.status != 'running' && item.action_type != 'single'"> {{check(data.status) }} </span>

                    </div>
                    </div>
                </b-td>
                </b-tr>

                <b-tr>
                  <b-th> Price</b-th>
                  <b-td  class="text-center">
                    <div class="p-1 align-top" :class="item.ticket_status == 'waiting' ? 'blink-bg ' : ''" :style="item.ticket_status == 'reject'||item.ticket_status == 'waitingRejected' ? 'text-decoration: line-through;background: #000 !important;' : ''">
                    <div>
                    <span> <b> <my-format-price :value="item.odds" :decimal="2" /> {{item.odds_type}} </b></span>
                    </div>
                    </div>
                  </b-td>
                </b-tr>

                <b-tr>
                  <b-th> Stake</b-th>
                  <b-td  class="text-center">
                    <div class="p-1 pl-4 align-top " :class="item.ticket_status == 'waiting' ? 'blink-bg ' : ''" :style="item.ticket_status == 'reject'||item.ticket_status == 'waitingRejected' ? 'text-decoration: line-through;background: #000 !important;' : ''"><b><span> <my-format-price :value="item.stake" :decimal="2" /></span></b> </div>
                  </b-td>
                </b-tr>

                <b-tr>
                    <b-th> Status</b-th>
                    <b-td>
                        <div class="p-1 align-top " :class="item.ticket_status == 'waiting' ? 'blink-bg ' : ''" :style="item.ticket_status == 'reject'||item.ticket_status == 'waitingRejected' ? 'text-decoration: line-through;background: #000 !important;' : ''">
                            <span>{{ item.status }} ({{check(item.ticket_status)}})  </span>
                        </div>
                    </b-td>
                </b-tr>

                <b-tr>
                    <b-th> IP</b-th>
                    <b-td>
                        <div class="p-1 align-top" :class="item.ticket_status == 'waiting' ? 'blink-bg ' : ''" :style="item.ticket_status == 'reject'||item.ticket_status == 'waitingRejected' ? 'text-decoration: line-through;background: #000 !important;' : ''"><span class="text-base">{{ item.ip }}</span ></div>
                    </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
            
      </div>
    </b-overlay>
   </b-container>
  </div>
</template>

<script>
import Axios from 'axios';
import { mapGetters } from "vuex";
export default {
   layout: 'tv',
   data() {
    return {
        lang: this.$auth.$storage.getUniversal("language"),
        type:"running",
        curPage: 1,
        frompage:1,
        perPage: 1,
        totalAll: 1,
        loading: false,
        dataRunning:[],
    }
   },
   computed: {
    ...mapGetters({
      langs: "language/langs"
    }),
    item(){
        if(this.dataRunning.length != 0){
            return this.dataRunning.ticket.data[0];
        }
     },
    },
   created() {
     this.getdata()
   },
   methods: {
    async getdata(){
        let response =  await Axios.get("/datapopup.json");
        console.log('responseresponse',response);
        this.dataRunning = response.data
        
    },
    check(data){
      if(data == "running"){
        return "OK"
       }if(data == "waiting" && this.lang == "th" ){
        return "รอ ON"
       }if(data == "reject" && this.lang == "th" ){
        return "ยกเลิก"
       }if(data == "waitingRejected" && this.lang == "th" ){
        return "รอ ON ยกเลิก"
       }else{
        return data
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
         return "แฮนดีแคพ"
       }
       if (item == 'OE' && this.lang == 'th') {
         return "คี่คู่"
       }
       if (item == 'FH_1x2' && this.lang == 'th') {
        return "1x2ครึ่งแรก"
       }
       if (item == 'FH_OE' && this.lang == 'th') {
        return "คี่คู่ครึ่งแรก"
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
   },
   
}
</script>

<style>
    body {
        width: auto !important;
    }
    .border-bt {
        border-bottom: 1px solid silver;
    }
    .container {
        max-width: 700px;
    }
    @media screen and (max-width: 600px) {
        #table-user {
            width: 100% !important;
        }
    }
</style>