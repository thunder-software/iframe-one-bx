<template>
  <div>
    <div class=" px-10 py-0 rounded">
        <div class="col text-center" style="line-height: 26.27px;">
          <span style="color: #FCBA2B;font-weight: 700;font-size: 16px;">{{ trans('header.running') }}</span>        
        <div class="d-inline-block" style="position: absolute;right: 10px; " @click="reFresh()">
          <b-button size="sm" style="border: 1px solid #6c757d;background: #fc1 ;color: #383838;border-radius: 10px;">
            <b-icon icon="arrow-repeat" :animation="loading == true ? 'spin' : ' '"></b-icon>
            <span> {{trans("header.refresh")}}</span>
          </b-button>  
        </div>
        </div>
        <!-- <b-row>
          <b-col cols="6" sm="6" class="p-4 text-center" >
            <span  :class="type == 'running' ? 'active ' :''" style="cursor:pointer;font-size: 14px;">  {{trans("header.running")}}</span>
          </b-col>
          <b-col cols="6"  sm="6" class="p-4 cursor-pointer text-center" style="color: #6cb6f7;font-size: 14px;" @click="reFresh()" >
            <b-icon icon="arrow-repeat" :animation="loading == true ? 'spin' : ' '"></b-icon>
            <span> {{trans("header.refresh")}}</span>
          </b-col>
        </b-row> --> 
    </div>
    <b-overlay :show="loading" rounded="sm" style="color: #c0c0c0">
     
      <div class="bg-black px-3 py-3 mt-2" v-if="type == 'running'">
        <perfect-scrollbar>
            <b-table-simple small striped responsive id="table-user" class="text-center w-full table-live" style="border: 0px solid; border-radius: 0px !important;">
              <b-thead >
                <b-tr class="text-white">
                  <b-th> No </b-th>
                  <b-th>  BetId/{{trans('sidebar.bettime') }}</b-th>
                  <b-th style="width: 380px;"> {{trans('sidebar.listbet') }}</b-th>
                  <b-th >{{trans('sidebar.price')}}</b-th>
                  <b-th >{{trans('sidebar.stake')}}</b-th>
                  <b-th >{{trans('sidebar.status')}}</b-th>
                  <b-th class=""> IP </b-th>
                </b-tr>
              </b-thead>
              <b-tbody v-if="getdatarunning" style="font-size: 14.5px; color: white;">
                <b-tr v-if="getdatarunning.data.length == 0">
                  <b-td colspan="7">{{ trans('header.playlist_not_found') }} </b-td>
                </b-tr>
                <b-tr v-for="(item, i) in getdatarunning.data" :key="i" >
                  <b-td class="p-1 align-top" :class="item.ticket_status == 'waiting' ? 'blink-bg ' : ''" :style="item.ticket_status == 'reject'||item.ticket_status == 'waitingRejected' ? 'text-decoration: line-through;background: #000 !important;' : ''"><small>{{frompage+i}}</small> </b-td>
                  <b-td class="p-1 align-top" :class="item.ticket_status == 'waiting' ? 'blink-bg ' : ''" :style="item.ticket_status == 'reject'||item.ticket_status == 'waitingRejected' ? 'text-decoration: line-through;background: #000 !important;' : ''">
                     <div><small> BetId : {{ item.id }}</small></div>
                     <div><small> RefId : {{ item.refid }}</small></div>
                     <div><small>{{item.trans_time}}</small></div>
                     <div><small>{{subaction(item.action_type)}}</small></div>
                  </b-td>
                  <b-td class=" p-1 align-top" :class="item.ticket_status == 'waiting' ? 'blink-bg ' : ''" :style="item.ticket_status == 'reject'||item.ticket_status == 'waitingRejected' ? 'text-decoration: line-through;background: #000 !important;' : ''">
                    <div v-for="(data, i) in item.choice" :key="i" class="mb-1" :class="item.action_type == 'single' || (i+1) == item.choice.length  ? '':'border-bt'" >
                    <div class="text-right">
                      <div v-if="data.market_type == 'OverUnder'|| data.market_type == 'FH_OverUnder' || data.market_type == 'OE'">
                        <div v-if="data.market_type == 'OverUnder' && data.type == '44'">
                          <div class="text-right">
                              <small :class="colottext(data)">{{ data['home'+_keyLang] ? data['home'+_keyLang] : data['home_en']}}</small> &nbsp;
                              <small class="text-danger" v-if="data.market_type == 'FH_Handicap'||data.market_type == 'FH_OverUnder'||data.market_type == 'FH_1x2'||data.market_type == 'FH_OE'">(1st)</small>
                              [<small class="font-black">{{ data['bet_choice'] == 'Under' ? trans("content.not_complete") : trans("content.complete") }}</small>]
                          </div>
                        </div>
                        <div v-else>
                          <small class="inline-block " v-if="data.in_who == '1' ||data.in_who == '2'" :class="colottext(data)">
                            <div v-if="lang == 'th'">
                              {{ data['bet_choice' + _keyLang] ? data['bet_choice' + _keyLang] : data['bet_choice_lang'] }}
                            </div>
                            <div v-else>
                              {{  data['bet_choice'] }}
                            </div>

                          </small>
                          <small :class="colottext(data)">{{ data['home'+_keyLang] ? data['home'+_keyLang] : data['home_en']}}</small> &nbsp;
                          <small class="text-danger" v-if="data.market_type == 'FH_Handicap'||data.market_type == 'FH_OverUnder'||data.market_type == 'FH_1x2'||data.market_type == 'FH_OE'">(1st)</small>
                          [<small class="font-black">{{submarket(data.market_type)}}</small>]
                        </div>
                      </div>
                      <div v-else>
                        <small v-if="data.market_type == 'Handicap' || data.market_type == 'FH_1x2' || data.market_type == 'FH_Handicap' " :class="colottext(data)">{{ inwhodata(data) }}</small>
                        <small class="inline-block " :class="colottext(data)"  >
                          <div v-if="lang == 'th'">
                            {{ data['bet_choice' + _keyLang] ? data['bet_choice' + _keyLang] : data['bet_choice_lang'] }}
                          </div>
                          <div v-else>
                            {{  data['bet_choice'] }}
                          </div>
                        </small>
                        <small :class="colottext(data)" v-if="data.market_type == 'FH_Handicap'||data.market_type == 'FH_OverUnder'||data.market_type == 'FH_1x2'||data.market_type == 'FH_OE'">(1st)</small>
                        [<small class="font-black">{{submarket(data.market_type)}}</small>]
                      </div>
                    </div>

                    <div class="text-right">
                      <div v-if="data.market_type == 'OverUnder' && data.type == '44'">
                        <small >@</small> <small class="text-danger" v-if="data.is_live == '1'">[{{ data.h_score }}-{{ data.a_score }}]</small> <small><my-format-price :value="data.price" :decimal="2" /></small>
                      </div>
                      <div v-else>
                        <small >{{ data.point }} @</small> <small class="text-danger" v-if="data.is_live == '1'">[{{ data.h_score }}-{{ data.a_score }}]</small> <small><my-format-price :value="data.price" :decimal="2" /></small>
                      </div>
                    </div>
                    <div class="text-right">
                    <small :class="data.in_who == '1' ?'text-danger':'text-primary'">{{ data['home'+_keyLang] ? data['home'+_keyLang] : data['home_en']}}</small>
                    <small :class="data.in_who == '1' ?'text-danger':'text-primary'" v-if="data.market_type == 'FH_Handicap'||data.market_type == 'FH_OverUnder'||data.market_type == 'FH_1x2'||data.market_type == 'FH_OE'">(1st)</small>
                    <img src="/icon/versus.png" class="inline-block" alt="" style="width: 18px;height: 18px;"> 
                    <small :class="data.in_who == '2' ?'text-danger':'text-primary'">{{ data['away'+_keyLang] ? data['away'+_keyLang] : data['away_en']}}</small>
                    <small :class="data.in_who == '2' ?'text-danger':'text-primary'" v-if="data.market_type == 'FH_Handicap'||data.market_type == 'FH_OverUnder'||data.market_type == 'FH_1x2'||data.market_type == 'FH_OE'">(1st)</small>

                    </div>
                    <div class="text-right">
                    <small class="font-black"> {{ data.tournament['name' + _keyLang] ?  data.tournament['name' + _keyLang] : data.tournament['name_en']}} </small> <br/>
                    <small class="font-black text-danger" v-if="data.status != 'running' && item.action_type != 'single'"> {{check(data.status) }} </small>

                    </div>
                    </div>
                    </b-td>
                    <b-td class="p-1 align-top" :class="item.ticket_status == 'waiting' ? 'blink-bg ' : ''" :style="item.ticket_status == 'reject'||item.ticket_status == 'waitingRejected' ? 'text-decoration: line-through;background: #000 !important;' : ''">
                    <div>
                    <small><my-format-price :value="item.odds" :decimal="2" /></small>
                    </div>
                    <div>
                    <small>{{item.odds_type}}</small>
                    </div>
                    </b-td>
                  <b-td class="p-1 pl-4 align-top " :class="item.ticket_status == 'waiting' ? 'blink-bg ' : ''" :style="item.ticket_status == 'reject'||item.ticket_status == 'waitingRejected' ? 'text-decoration: line-through;background: #000 !important;' : ''"><small><my-format-price :value="item.stake" :decimal="2" /></small></b-td>
                  <b-td class="p-1 align-top " :class="item.ticket_status == 'waiting' ? 'blink-bg ' : ''" :style="item.ticket_status == 'reject'||item.ticket_status == 'waitingRejected' ? 'text-decoration: line-through;background: #000 !important;' : ''">
                    <small>{{ item.status }} <br/>({{check(item.ticket_status)}})  </small>
                  </b-td>
                  <b-td class="p-1 align-top" :class="item.ticket_status == 'waiting' ? 'blink-bg ' : ''" :style="item.ticket_status == 'reject'||item.ticket_status == 'waitingRejected' ? 'text-decoration: line-through;background: #000 !important;' : ''"><small>{{ item.ip }}</small></b-td>
                </b-tr>
                <b-tr>
                    <b-td colspan="4" class="text-right pr-2"><small>{{trans('sidebar.total')}}</small></b-td>
                    <b-td><small><my-format-price :value="sumstake" :decimal="2"></my-format-price></small></b-td>
                    <b-td colspan="2"><small></small>
                    </b-td>
                  </b-tr>
              </b-tbody>
            </b-table-simple>
            
              <b-pagination
                @input="getRunning()"
                pills
                v-model="curPage"
                :total-rows="totalAll"
                :per-page="perPage"
                :first-text="trans('paginate.first')"
                :prev-text="trans('paginate.prev')"
                :next-text="trans('paginate.next')"
                :last-text="trans('paginate.last')"
                size="sm" align="right">
              </b-pagination>
           
       
          </perfect-scrollbar>
      </div>


      <!-- <div class="bg-white px-3 py-2 mt-4 rounded" v-else >
         <perfect-scrollbar>
            <b-table-simple small striped  responsive id="table-user" class="pt-4 text-center w-full">
              <b-thead >
                <b-tr style="font-size: 13px;">
                  <b-th> No </b-th>
                  <b-th> BetId/{{trans('sidebar.bettime') }}</b-th>
                  <b-th style="width: 450px;">  {{trans('sidebar.listbet') }}</b-th>
                  <b-th>{{trans('sidebar.price')}}</b-th>
                  <b-th> {{trans('sidebar.stake')}}</b-th>
                  <b-th> {{trans('sidebar.winloss')}}</b-th>
                  <b-th> {{trans('sidebar.status')}}</b-th>
                </b-tr>
              </b-thead>
              <b-tbody v-if="getdatasettled"   style="font-size: 14.5px;">

              <b-tr v-for="(item, i) in getdatasettled.data" :key="i" >
                <b-td class="align-top" :class="item.ticket_status == 'reject'||item.ticket_status == 'waitingRejected' ? 'secondary-bg' : ''"><small>{{frompagesettled + i}}</small></b-td>
                <b-td class="align-top" :class="item.ticket_status == 'reject'||item.ticket_status == 'waitingRejected' ? 'secondary-bg' : ''">
                     <div><small> BetId : {{ item.id }}</small></div>
                     <div><small>{{item.trans_time}}</small></div>
                     <div><small>{{subaction(item.action_type)}}</small></div>
                </b-td>
                    <b-td class="p-1 pb-1 align-top" :class="item.ticket_status == 'reject'||item.ticket_status == 'waitingRejected' ? 'secondary-bg' : ''">
                    <div v-for="(data, i) in item.choice" :key="i"  :class="item.action_type == 'single' || (i+1) == item.choice.length  ? '':'border-bt'" >
                      <div class="text-right">
                      <div v-if="data.market_type == 'OverUnder'|| data.market_type == 'FH_OverUnder' || data.market_type == 'OE'">
                        <small class="inline-block " v-if="data.in_who == '1' ||data.in_who == '2'" :class="colottext(data)">
                         
                          <div v-if="lang == 'th'">
                            {{ data['bet_choice' + _keyLang] ? data['bet_choice' + _keyLang] : data['bet_choice_lang'] }}
                          </div>
                          <div v-else>
                            {{  data['bet_choice'] }}
                          </div>
                        </small>
                        <small :class="colottext(data)">{{ data['home'+_keyLang] ? data['home'+_keyLang] : data['home_en']}}</small> &nbsp;
                        <small class="text-danger" v-if="data.market_type == 'FH_Handicap'||data.market_type == 'FH_OverUnder'||data.market_type == 'FH_1x2'||data.market_type == 'FH_OE'">(1st)</small>
                        [<small class="font-black">{{submarket(data.market_type)}}</small>]
                      </div>
                      <div v-else>
                        <small v-if="data.market_type == 'Handicap' || data.market_type == 'FH_1x2' || data.market_type == 'FH_Handicap' " :class="colottext(data)">{{ inwhodata(data) }}</small>
                        <small class="inline-block " :class="colottext(data)"  >
                          
                          <div v-if="lang == 'th'">
                            {{ data['bet_choice' + _keyLang] ? data['bet_choice' + _keyLang] : data['bet_choice_lang'] }}
                          </div>
                          <div v-else>
                            {{  data['bet_choice'] }}
                          </div>
                        </small>
                        <small :class="colottext(data)" v-if="data.market_type == 'FH_Handicap'||data.market_type == 'FH_OverUnder'||data.market_type == 'FH_1x2'||data.market_type == 'FH_OE'">(1st)</small>
                        [<small class="font-black">{{submarket(data.market_type)}}</small>]
                      </div>
                    </div>
                    <div class="text-right">
                    <small >{{ data.point }} @ </small> <small class="text-danger" v-if="data.is_live == '1'">[{{ data.h_score }}-{{ data.a_score }}]</small> <small><my-format-price :value="data.price" :decimal="2" /></small>
                    </div>
                    <div class="text-right">
                    <small :class="data.in_who == '1' ?'text-danger':'text-primary'">{{ data['home'+_keyLang] ? data['home'+_keyLang] : data['home_en']}}</small>
                    <small :class="data.in_who == '1' ?'text-danger':'text-primary'" v-if="data.market_type == 'FH_Handicap'||data.market_type == 'FH_OverUnder'||data.market_type == 'FH_1x2'||data.market_type == 'FH_OE'">(1st)</small>
                    <small class="text-secondary">-vs-</small>
                    <small :class="data.in_who == '2' ?'text-danger':'text-primary'">{{ data['away'+_keyLang] ? data['away'+_keyLang] : data['away_en']}} </small>
                    <small :class="data.in_who == '2' ?'text-danger':'text-primary'" v-if="data.market_type == 'FH_Handicap'||data.market_type == 'FH_OverUnder'||data.market_type == 'FH_1x2'||data.market_type == 'FH_OE'">(1st)</small>

                    </div>
                    <div class="text-right">
                    <small class="font-black" > {{ data.tournament['name' + _keyLang] ?  data.tournament['name' + _keyLang] : data.tournament['name_en']}}  </small>  <br/>
                    <div v-if="data.results" >
                      <small class="font-black" style="color: #03C04A;">{{ trans('header.results') }} </small> &nbsp;  <b-badge class="badge-sy" :style="item.ticket_status == 'reject'||item.ticket_status == 'waitingRejected' ? 'text-decoration: line-through;':''">
                        <small class=" font-black" >HT</small> <small class="" v-if="data.results.first_half_h_socre = '' ? '-':  data.results.first_half_h_socre ">{{ data.results.first_half_h_socre }} : </small> <small class="" v-if="data.results.first_half_a_socre = '' ? '-':  data.results.first_half_a_socre ">{{ data.results.first_half_a_socre }}</small> </b-badge>
                      <b-badge class="badge-sy" :style="item.ticket_status == 'reject'||item.ticket_status == 'waitingRejected' ? 'text-decoration: line-through;':''">
                         <small class=" font-black">FT</small> <small class="" v-if="data.results.full_time_h_socre =''? '-' : data.results.full_time_h_socre ">{{ data.results.full_time_h_socre  }} : </small> <small class="" v-if="data.results.full_time_a_socre = '' ? '-': data.results.full_time_a_socre">{{ data.results.full_time_a_socre }}</small> </b-badge> &nbsp;
                         <small  v-if="item.action_type != 'sc' && data.status == 'running' && item.ticket_status != 'waitingRejected'">(x <my-format-price :value="data.price_multiple" :decimal="2"/>)</small>
                    </div>
                    <small class="font-black text-danger" v-if="data.status != 'running' && item.action_type != 'sc'"> {{check(data.status) }} </small>
                    </div>
                    </div>
                    </b-td>
                     <b-td class="p-1 align-top" :class="item.ticket_status == 'reject'||item.ticket_status == 'waitingRejected' ? 'secondary-bg' : ''">
                    <div >
                    <div>
                    <small class="font-black"><my-format-price :value="item.odds" :decimal="2" /></small>
                    </div>
                    <div>
                    <small>{{item.odds_type}}</small>
                    </div>
                    </div>
                    </b-td>
                    <b-td class="p-1  align-top" :class="item.ticket_status == 'reject'||item.ticket_status == 'waitingRejected' ? 'secondary-bg' : ''">

                    <small class="font-black"><my-format-price :value="item.stake" :decimal="2" /></small>

                    </b-td>
                    <b-td class="p-1 ml-4 align-top" :class="item.ticket_status == 'reject'||item.ticket_status == 'waitingRejected' ? 'secondary-bg' : ''">
                      <small><my-format-price :value="item.winlose_amount" :decimal="2" /></small>
                    </b-td>
                    <b-td class="p-1 align-top" :class="item.ticket_status == 'reject'||item.ticket_status == 'waitingRejected' ? 'secondary-bg' : ''">
                    <div >
                    <div class="text-center">

                     <small :class="styleStatus(item)">{{ convert(item , lang == 'th'? item.ticket_status: item.ticket_status) }}</small>

                    </div>
                    </div>
                    </b-td>
                    </b-tr>
                    <b-tr>
                    <b-td colspan="4" class="text-right pr-2"><small>{{ trans('sidebar.total') }}</small></b-td>
                    <b-td><small><my-format-price :value="sumstakeSettled" :decimal="2"></my-format-price></small></b-td>
                    <b-td><small><my-format-price :value="sumwinloss" :decimal="2"></my-format-price></small></b-td>
                    <b-td colspan="1"><small></small>
                    </b-td>
                  </b-tr>
              </b-tbody>

            </b-table-simple>
            <b-pagination
             @input="gatSettled()"
              v-model="curPagesettled"
              :total-rows="totalAllsettled"
              :per-page="perPagesettled"
              :first-text="trans('paginate.first')"
              :prev-text="trans('paginate.prev')"
              :next-text="trans('paginate.next')"
              :last-text="trans('paginate.last')"
              size="sm"
              >
      </b-pagination>
          </perfect-scrollbar>
      </div> -->

    </b-overlay>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["keyw", "tabs" ,'search'],
  data() {
    return {
      lang: this.$auth.$storage.getUniversal("language"),
      type:"running",
      curPage: 1,
      frompage:1,
      perPage: 1,
      totalAll: 1,
      loading: false,
      oldslist:[{ data: { data : []} }],
      product: this.$auth.$storage.getUniversal("language") == "th" ? "กีฬา" : "Sportbook",
      optionspruduct: [
        { value: "Sportbook", text: "กีฬา" }
        // { value: "single", text: "ฟุตบอล" },
        // { value: "step", text: "บอลสเต๊ป" },
        // { value: "mixParlay", text: "มิกซ์พาเลซ์" },
        // { value: "muaystep", text: "มวยสเต๊ป" },

      ],
      paramsettle : this.search,
      listbet: [],
      dataSettled:[],
      dataRunning:[],
      keyTab :"Statement",
    };
  },
  computed: {
    ...mapGetters({
      getlistbet: "listbet/getlistbet",
      langs: "language/langs"
    }),
    getdatarunning(){
      return this.dataRunning.ticket;

     },
    //  getdatasettled(){
    //   return this.dataSettled.ticket
    //  },
    sumbet() {
      let sum = 0;
      this.listbet.forEach(async (data) => {
        sum += parseFloat(data.bet);
      });
      return sum;
    },
    // sumwinloss() {
    //   let sum = 0;
    //   this.dataSettled.ticket.data.forEach(async (data) => {
    //     sum += parseFloat(data.winlose_amount);
    //   });
    //   return sum;
    // },
    // sumcommission() {
    //   let sum = 0;
    //   this.dataSettled.ticket.data.forEach(async (data) => {
    //     sum += parseFloat(data.comm);
    //   });
    //   return sum;
    // },
    // sumstakeSettled() {
    //   let sum = 0;
    //   this.dataSettled.ticket.data.forEach(async (data) => {
    //     sum += parseFloat(data.stake);
    //   });
    //   return sum;
    // },
    sumstake(){
      let sum = 0;
       this.dataRunning.ticket.data.forEach(async(data)=>{
         sum += parseFloat(data.stake)
       })
       return sum;

    },

  },
  methods: {
    ...mapActions({
      fetchListBet: "listbet/fetchListBet",
    }),
   
    STtext(item){
      if(item == 'h'){
        return "text-dander"
      }
      if(item == 'a'){
        return "text-primary"
      }
      if(item == 'x'){
        return "text-white"
      }

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
    convert(item , text){
      if (text == 'lose' && this.lang == 'th') {
        return 'แพ้'
      }
      if (text == 'won' && this.lang == 'th') {
        return 'ชนะ'
      }
      if (text == 'draw' && this.lang == 'th') {
        return 'เสมอ'
      }
      if (text == 'waitingRejected' && this.lang == 'th') {
        return 'รอ ON ยกเลิก'
      }
      if (text == 'reject' && this.lang == 'th') {
        return 'ยกเลิก'
      }
      if (text == 'haftwon' && this.lang == 'th') {
        return 'ได้ครึ่ง'
      }
      if (text == 'haftlose' && this.lang == 'th') {
        return 'เสียครึ่ง'
      }
      if (item.ticket_status == 'cancelm' && this.lang == 'th') {
          return  "ยกเลิกการแข่งขัน"
      }
      if (item.ticket_status == 'cancelm' ) {
          return  text.replace('cancelm', 'cancelmatch');
      }
      return text
    },
    styleStatus(item){
      if(item.ticket_status == 'won'){return "text-success"}
      if(item.ticket_status == 'lose'){return "text-danger"}
      if(item.ticket_status == 'haftlose'){return "text-danger"}
      if(item.ticket_status == 'draw'){return "text-white"}
      if(item.ticket_status == 'haftwon'){return "text-success"}
      if(item.ticket_status == 'reject'){return "text-secondary"}
      if(item.ticket_status == 'waitingRejected'){return "text-secondary"}
      if(item.ticket_status == 'cancelm'){return "text-danger"}
      return null
    },
    async  openTab(data){
      if (data =='running') {
        this.loading = true;
        this.type = data
        await  this.getRunning();
        this.loading = false;
      }
      // if (data =='settled') {
      //   this.loading = true;
      //   this.type = data
      //   await  this.gatSettled();
      //   this.loading = false;
      //   ;
      // }
    },
    filterBet(item) {
       this.dataRunning.data == this.oldslist
       this.product = this.lang == "th" ? item.text : item.value;
       if (this.product == "Sportbook" || this.product == "Sportbook" ) {
       }
      //  if (this.product == "ฟุตบอล" || this.product == "single" ) {
      //   this.dataRunning.data.data = this.dataRunning.data.data.filter((f) =>f.action_type == this.product )
      //  }
      //  if (this.product == "บอลสเต๊ป" || this.product == "step" ) {
      //   this.dataRunning.data.data = this.dataRunning.data.data.filter((f) =>f.action_type == this.product )
      //  }
      //  if (this.product == "มิกซ์พาเลซ์" || this.product == "MixParlay" ) {
      //   this.dataRunning.data.data = this.dataRunning.data.data.filter((f) =>f.action_type == this.product )
      //  }
      //  if (this.product == "มวยสเต๊ป" || this.product == "muaystep" ) {
      //   this.dataRunning.data.data = this.dataRunning.data.data.filter((f) =>f.action_type == this.product )
      //  }
      return  this.dataRunning.data
    },
    reFresh() {
      this.loading = true
      setTimeout(() => {  
        this.getRunning();
        this.loading = false
      }, 500);
  },

  // async gatSettled(){
  //     let data = {
  //             page: this.curPagesettled,
  //             date : this.search ? this.search.date : null,
  //             lang:this.lang  }
  //     let response =  await this.$axios.get("/event/ticket/settled",{ params: data});
  //     this.dataSettled = response.data
  //     this.frompagesettled = response.data.ticket.meta.from
  //     this.curPagesettled = response.data.ticket.meta.current_page
  //     this.perPagesettled = response.data.ticket.meta.per_page
  //     this.totalAllsettled = response.data.ticket.meta.total

  //     },
    async getRunning(){
       let response =  await this.$axios.get("/event/ticket/running",{ params: {page: this.curPage,lang:this.lang}});
       this.dataRunning = response.data
       this.frompage = response.data.ticket.meta.from
       this.curPage = response.data.ticket.meta.current_page
       this.perPage = response.data.ticket.meta.per_page
       this.totalAll = response.data.ticket.meta.total
       this.oldslist = JSON.parse(JSON.stringify(this.dataRunning));
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

  },
  async created() {
    this.loading = true;
    this.getRunning()
    setTimeout(() => {
      this.loading = false;
    }, 500);
  },

  watch: {
    listbet(value) {
      if (value.length != 0) {
        this.listbet;
      }
    },
    tabs(value,newvalue){
      if(value == 3){
        this.type = "running"
      }
    },
    langs(value){
      this.lang = value
    },
    search(value){  
      if(this.search != value.type){
        this.openTab('settled')
      }
    }
  },
};
</script>

<style scoped>
.table-responsive {
  margin-bottom: 1rem;
  border-radius: 1em;
  border: 1px solid #E0E0E0;
 
}
.text-red{
  color: red;
}
.text-primary{
  color: #037bff;
}
  .secondary-bg{
    background: #000 !important;
    text-decoration: line-through;
  }
.active{
  text-decoration: underline;
}
.active:hover {
  text-decoration: underline;
}
.border-sy {
  border-right: 1px solid silver !important;
  /* margin: 0px 10px; */

}
.border-bt{
  border-bottom: 1px solid silver;
}
.spinner-sy {
  position: absolute;
  z-index: 2px;
}
.badge-sy{
  background: #C0EDD0;
  font-size: 14px;
  color: #235d3a;
  padding: 3px;

}
.blink-bg{
		animation: blinkingBackground 2s infinite;

	}
  @keyframes blinkingBackground{
		0%, 49%		{ background-color: black;}
		50%, 100% { background-color: rgb(33 29 14);}
	}
@media screen and (max-width: 1200px) {
  .border-sy {
    border-right: 0px solid silver;
  }
}

</style>
