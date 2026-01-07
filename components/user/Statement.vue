<template>
  <div>
    <div class="bg-black px-10 py-0 rounded">
      <div class="fillter-sy">
        <b-row>
         <b-col cols="4"  class="p-3 text-left" v-if="betlist">
              <span class="cursor-pointer"  @click="back()">
                <b-icon icon="arrow-left-circle-fill"   scale="1.5" variant="warning" class="cursor-pointer" @click="back()"></b-icon>  
            </span>
          </b-col>
          <b-col cols="6" class="p-2 text-left" v-if="!betlist">
            <b-dropdown   variant="link"   toggle-class="text-decoration-none"  no-caret  style="width: 180px ; border: 1px solid #e0e0e0 ; border-radius: 10px;"  >
                <template #button-content >
                  <div class="text-left ">
                    <span class="style-options text-white" >{{trans("header.period")}}</span> <br />
                    <span class="style-options text-left text-white"
                      >{{ dateTime }} {{ datemoment }} <b-icon icon="caret-down-fill"></b-icon
                    ></span>
                  </div>
                </template>
                <b-dropdown-item
                  v-for="(option, i) in selected_date"
                  :key="i"
                  @click="selectDate(option)"><span>{{ option['text'+keyLang] }} </span></b-dropdown-item>
              </b-dropdown>
          </b-col>
          <b-col cols="4" class="p-3 text-center"  v-if="betlist">
            <span style="color: #fc1;font-weight: 700;font-size: 16px;" >{{trans("header.settled")}}</span> 
          </b-col>
          <b-col cols="4" class="p-3 text-center"  v-if="betlist">
            <div class="text-right inline-block">
              <b-button  @click="reFresh()" size="sm" style="border: 1px solid #6c757d;background: #fc1;color: #383838;border-radius: 10px;">
                <b-icon icon="arrow-repeat" :animation="loading == true ? 'spin' : ' '"></b-icon>
                <span> {{trans("header.refresh")}}</span>
              </b-button>
            </div>
          </b-col>
          <b-col cols="6" class="p-3 text-center" v-if="!betlist"  style="color: #6cb6f7" >
            <b-button  @click="reFresh()" size="sm" style="border: 1px solid #6c757d;background: #fc1;color: #383838;border-radius: 10px;">
            <b-icon icon="arrow-repeat" :animation="loading == true ? 'spin' : ' '"></b-icon>
            <span> {{trans("header.refresh")}}</span>
          </b-button>  
          </b-col>
        </b-row>
      </div>
    </div>
    <b-overlay :show="loading" rounded="sm" style="color: #c0c0c0" v-if="!betlist">
    <div class="bg-black px-3 py-2 mt-4 rounded">
      <div>
        <b-table-simple  id="table-user" small  striped  v-if="!betlist"  borderless  responsive class="w-full table-live"  style="border: 0px solid; border-radius: 0px !important;">
          <b-thead>
            <b-tr style="font-size: 13px; color: white;">
              <b-th> {{ trans("sidebar.date") }} </b-th>
              <b-th>{{ trans("sidebar.stake") }} </b-th>
              <b-th>{{ trans("sidebar.winloss") }} </b-th>
              <b-th v-if="$auth.user.is_commission == 1">{{ trans("sidebar.commission") }} </b-th>
              <b-th v-if="$auth.user.is_commission == 1">{{ trans("sidebar.sum") }} </b-th>
              <b-th></b-th>
            </b-tr>
          </b-thead>
          
          <b-tbody v-if="datalist.data" style="color: white;">
            <b-tr class="text-center" v-if="datalist.data.length == 0">
              <b-td :colspan="$auth.user.is_commission == 1 ? 6 : 4">
                <span class="text-white"> {{trans('header.playlist_not_found')}}</span> 
              </b-td>
            </b-tr>
            <b-tr  v-for="(item, i) in datalist.data" :key="i" style="font-size: 14.5px;" >
              <b-td class="p-1">
                <div @click="detailBet(item)">
                  <small :class="item.product_name == 'Opening Balance' ? '' : 'text-primary cursor-pointer text-type' ">
                  {{item.date }}</small>
                </div>
              </b-td>
              <b-td class="p-1">
                <small><my-format-price :value="item.stake" :decimal="2"/></small>
              </b-td>
              <b-td class="p-1">
                <small><my-format-price  :value="item.winloss"  :decimal="2" /></small>
              </b-td>
              <b-td class="p-1" v-if="$auth.user.is_commission == 1">
                <small v-if="item.comm != 0"><my-format-price  :value="item.comm"  :decimal="2" /></small>
                <small v-else>0.00</small>
              </b-td>
              <b-td class="p-1" v-if="$auth.user.is_commission == 1">
                <small v-if="$auth.user.winloss != 0">
                    <span v-if="item.winloss+item.comm == 0">0.00</span>
                    <span v-else>
                      <my-format-price  :value="item.winloss+item.comm"  :decimal="2" />
                    </span>
                </small>
                <small v-else>0.00</small>
              </b-td>
              <b-td class="p-1" >
                <button v-if="item.product_name != 'Opening Balance'" class="p-0 btn-sm btn btn-warning px-2" style="border: 1px solid #e0e0e0; border-radius: 10px ;"  @click="detailBet(item)"><small>View</small></button>
              </b-td>
            </b-tr>
          </b-tbody>

        </b-table-simple>

      </div>
    </div>
    </b-overlay>

     <div class="bg-black px-3 py-3 mt-4 rounded" v-if="betlist">
         <perfect-scrollbar>
            <b-table-simple small striped  responsive id="table-user" class=" text-center w-full table-live" style="border: 0px solid; border-radius: 0px !important;">
              <b-thead >
                <b-tr style="font-size: 13px;">
                  <b-th> No </b-th>
                  <b-th> BetId/{{trans('sidebar.bettime') }}</b-th>
                  <b-th style="width: 450px;">  {{trans('sidebar.listbet') }}</b-th>
                  <b-th>{{trans('sidebar.price')}}</b-th>
                  <b-th> {{trans('sidebar.stake')}}</b-th>
                  <b-th> {{trans('sidebar.winloss')}}</b-th>
                  <b-th v-if="$auth.user.is_commission == 1">{{ trans("sidebar.commission") }} </b-th>
                  <b-th v-if="$auth.user.is_commission == 1">{{ trans("sidebar.sum") }} </b-th>
                  <b-th> {{trans('sidebar.status')}}</b-th>
                </b-tr>
              </b-thead>
              <b-tbody  style="font-size: 14.5px; color: white;">

              <b-tr v-for="(item, i) in getdatasettled" :key="i" >
                <b-td class="align-top" :class="item.ticket_status == 'reject'||item.ticket_status == 'waitingRejected' ? 'secondary-bg' : ''"><small>{{frompagesettled + i}}</small></b-td>
                <b-td class="align-top" :class="item.ticket_status == 'reject'||item.ticket_status == 'waitingRejected' ? 'secondary-bg' : ''">
                     <div><small> BetId : {{ item.id }}</small></div>
                     <div><small> RefId : {{ item.refid }}</small></div>
                     <div><small>{{item.trans_time}}</small></div>
                     <div><small>{{subaction(item.action_type)}}</small></div>
                </b-td>
                    <b-td class="p-1 pb-1 align-top" :class="item.ticket_status == 'reject'||item.ticket_status == 'waitingRejected' ? 'secondary-bg' : ''">
                    <div v-for="(data, i) in item.choice" :key="i"  :class="item.action_type == 'single' || (i+1) == item.choice.length  ? '':'border-bt'" >
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
                    <!-- <div class="text-right">
                      <small >{{ data.point }} @ </small> <small class="text-danger" v-if="data.is_live == '1'">[{{ data.h_score }}-{{ data.a_score }}]</small> <small><my-format-price :value="data.price" :decimal="2" /></small>
                    </div> -->

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
                    <small :class="data.in_who == '2' ?'text-danger':'text-primary'">{{ data['away'+_keyLang] ? data['away'+_keyLang] : data['away_en']}} </small>
                    <small :class="data.in_who == '2' ?'text-danger':'text-primary'" v-if="data.market_type == 'FH_Handicap'||data.market_type == 'FH_OverUnder'||data.market_type == 'FH_1x2'||data.market_type == 'FH_OE'">(1st)</small>

                    </div>
                    <div class="text-right">
                    <small class="font-black" > {{ data.tournament['name' + _keyLang] ?  data.tournament['name' + _keyLang] : data.tournament['name_en']}}  </small>  <br/>
                    <div v-if="data.results" >
                      <small class="font-black" style="color: #03C04A;">{{ trans('header.results') }} </small> &nbsp;  <b-badge class="badge-sy"  :style="item.ticket_status == 'reject'||item.ticket_status == 'waitingRejected' ? 'text-decoration: line-through;':''">
                        <small class=" font-black" >HT</small> <small class="" v-if="data.results.first_half_h_socre = '' ? '-':  data.results.first_half_h_socre ">{{ data.results.first_half_h_socre }} : </small> <small class="" v-if="data.results.first_half_a_socre = '' ? '-':  data.results.first_half_a_socre ">{{ data.results.first_half_a_socre }}</small> </b-badge>
                      <b-badge class="badge-sy"  variant="light" :style="item.ticket_status == 'reject'||item.ticket_status == 'waitingRejected' ? 'text-decoration: line-through;':''">
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
                      <small v-if="parseInt(item.winlose_amount) != 0" class="text-danger font-black">
                        <my-format-price :value="item.winlose_amount" :decimal="2" />
                      </small>
                      <small v-else class="text-success font-black">
                        0.00
                      </small>
                    </b-td>
                    <b-td class="p-1 align-top" :class="item.ticket_status == 'reject'||item.ticket_status == 'waitingRejected' ? 'secondary-bg' : ''" v-if="$auth.user.is_commission == 1">
                      <small v-if="item.comm_amount != 0" class="text-danger font-black">
                        <my-format-price :value="item.comm_amount" :decimal="2" />
                      </small>
                      <small v-else class="text-success font-black">
                        0.00
                      </small>


                    </b-td>
                    <b-td class="p-1 align-top" :class="item.ticket_status == 'reject'||item.ticket_status == 'waitingRejected' ? 'secondary-bg' : ''" v-if="$auth.user.is_commission == 1">
                      <small v-if="parseInt(item.winlose_amount) != 0" class="text-danger font-black">
                        <my-format-price :value=" showPrice(item)" :decimal="2" />
                      </small>
                      <small v-else class="text-success font-black">
                        0.00
                      </small>

                    </b-td>
                    <b-td class="p-1 align-top" :class="item.ticket_status == 'reject'||item.ticket_status == 'waitingRejected' ? 'secondary-bg' : ''">
                    <div >
                    <div class="text-center">

                     <small :class="styleStatus(item)" class="font-bold">{{ convert(item , lang == 'th'? item.ticket_status: item.ticket_status) }}</small>

                    </div>
                    </div>
                    </b-td>
                    </b-tr>
                    <b-tr>
                    <b-td colspan="4" class="text-right pr-2"><small class="font-bold">{{ trans('sidebar.total') }}</small></b-td>
                    <b-td><small class="font-bold"><my-format-price :value="sumstakeSettled" :decimal="2"></my-format-price></small></b-td>
                    <b-td><small class="font-bold"><my-format-price :value="sumwinloss" :decimal="2"></my-format-price></small></b-td>
                    <b-td v-if="$auth.user.is_commission == 1"><small v-if="sumCom != 0" class="font-bold"><my-format-price :value="sumCom" :decimal="2"></my-format-price></small><small class="font-bold" v-else>0.00</small></b-td>
                    <b-td v-if="$auth.user.is_commission == 1"><small class="font-bold"><my-format-price :value="sumMarize()" :decimal="2"></my-format-price></small></b-td>
                    <b-td><small></small></b-td>
                  </b-tr>
              </b-tbody>

            </b-table-simple>
            <b-pagination
              pills
             @input="gatSettled()"
              v-model="curPagesettled"
              :total-rows="totalAllsettled"
              :per-page="perPagesettled"
              :first-text="trans('paginate.first')"
              :prev-text="trans('paginate.prev')"
              :next-text="trans('paginate.next')"
              :last-text="trans('paginate.last')"
              size="sm"
              align="right"
              >
      </b-pagination>
          </perfect-scrollbar>
    </div>
    

  </div>
</template>
<script>
import moment from "moment";
import collect from "collect.js";
export default {
  props: ["keyw", "lang" , "tabs"],
  data() {
    return {
      loading: false,
      datemoment: moment(new Date()).format("YYYY-MM-DD"),
      dateTime: "",
      dateText : 'today',
      betlist : false,
      type: "detail",
      datalist: [{ data: {} }],
      oldslist:[],
      databet: {data : {}},
      dataSettled:[],
      datafilter:[],//{data : {}},
      curPage: 1,
      frompage:1,
      perPage: 1,
      totalAll: 1,
      frompagesettled:1,
      curPagesettled:1,
      perPagesettled: 1,
      totalAllsettled: 1,
      selected_date: [
        { 
          value: "today", 
          text: "วันนี้",
          text_en : "Today", 
          text_my : "ဒီနေ့", 
          text_vn : "Hôm nay", 
          text_tv : "Hôm nay", 
          text_cn : "今天", 
          text_cnsp : "今天", 
          text_lao : "ມື້​ນີ້", 
          text_khmer : "ថ្ងៃនេះ", 
        }, //เอาvalueไปแมทกับคีย์ที่ส่งมา คือ Date ในเมททอด selectDate//
        { 
          value: "yesterday", 
          text_en : "Yesterday", 
          text: "เมื่อวาน",
          text_my : "မနေ့က", 
          text_vn : "Hôm qua", 
          text_tv : "Hôm qua", 
          text_cn : "昨天", 
          text_cnsp : "昨天", 
          text_lao : "ມື້ວານນີ້", 
          text_khmer : "ម្សិលមិញ",

        },
        { 
          value: "this week", 
          text_en : "This Week", 
          text: "สัปดาห์นี้",
          text_my : "ဒီတစ်ပတ်",  
          text_vn : "Tuần này", 
          text_tv : "Tuần này", 
          text_cn : "本星期", 
          text_cnsp : "本星期", 
          text_lao : "ອາ​ທິດ​ນີ້", 
          text_khmer : "ស​ប្តា​ហ៍​នេះ",
        },
        { 
          value: "last week", 
          text_en : "Last Week", 
          text: "สัปดาห์ที่แล้ว",
          text_my : "ပြီးခဲ့သောအပတ်က",   
          text_vn : "Tuần trước", 
          text_tv : "Tuần trước", 
          text_cn : "上星期", 
          text_cnsp : "上星期", 
          text_lao : "ອາ​ທິດ​ທີ່​ແລ້ວ", 
          text_khmer : "សប្ដាហ៍​មុន",
        },
        { 
          value: "this month", 
          text_en : "This Month", 
          text: "เดือนนี้",
          text_my : "ဤလတွင်",  
          text_vn : "Tháng này", 
          text_tv : "Tháng này", 
          text_cn : "這個月", 
          text_cnsp : "这个月", 
          text_lao : "ເດືອນ​ນີ້", 
          text_khmer : "ខែ​នេះ",
        },
        { 
          value: "last month", 
          text_en : "Last Month", 
          text: "เดือนที่เเล้ว",
          text_my : "ပြီးခဲ့သည့်လ", 
          text_vn : "Tháng trước", 
          text_tv : "Tháng trước", 
          text_cn : "上個月", 
          text_cnsp : "上个月", 
          text_lao : "ເດືອນທີ່ຜ່ານມາ", 
          text_khmer : "ខែមុន",
        },
      ],
      
    };
  },
  computed:{
    getdatasettled(){
       return this.datafilter
     },
     sumwinloss() {
      let sum = 0;
       var total =  collect(this.datafilter).sum('winlose_amount')
       return sum = total;
    },
    sumCom(){
      let sum = 0;
       var total =  collect(this.datafilter).sum('comm_amount')
       return sum = total;
    },
   
    sumstakeSettled() {
      let sum = 0;
      this.datafilter.filter(f => {
        if (f.ticket_status != 'cancelm' && f.ticket_status != 'reject') {
           sum += parseFloat(f.stake);
        }
      }
    )
    return sum 
    },
  },
  methods: {
    back(){
      this.type = 'detail'
      this.betlist = false
    },
    sumMarize(){
       this.sumwinloss + this.sumCom
      return this.sumwinloss + this.sumCom
    },
    showPrice(value){
      var numStr1 = parseFloat(value.comm_amount).toFixed(2);
      var num1 = Number(numStr1);
      var numStr = parseFloat(value.winlose_amount).toFixed(2);
      var num2 = Number(numStr);
      return (num2) + num1
    },
    sumAmout(value){
      console.log("valuevalue",value);
      let sum = 0;
       this.databet.data.forEach((data) => {
         sum += parseFloat(data[value]);
       });
      return sum;
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
    formatDate(date) {
      return moment(date).format("DD/MM/YYYY");
    },
    selectDate(item) {
      if (item.value == 'today') {
          var date = moment(new Date()).format("YYYY-MM-DD");
          this.dateText = item.value 
          this.datemoment = date
      }else if (item.value == 'yesterday') {
          var date = new Date();
          date.setDate(date.getDate() - 1);
          var date =  moment(new Date(date)).format("YYYY-MM-DD");
          this.dateText = item.value 
          this.datemoment = date
      }else if (item.value == 'this week') {
          this.dateText = item.value 
          this.datemoment = ""    
      }else if (item.value == 'last week') {
          this.dateText = item.value 
          this.datemoment = ""    
      }else if (item.value == 'this month') {
          this.dateText = item.value 
          this.datemoment = ""    
      }else if (item.value == 'last month') {
          this.dateText = item.value 
          this.datemoment = ""    
      }
      this.dateTime = item['text'+this.keyLang]
      this.getStatement()
     
     },
     checkColor(data) {
       console.log("dadadadadadadad", data);
       let text = data.toString();
       let result = text.substring(0, 1);
       if (result == "-") {
         return true;
       } else {
         return false;
       }
     },
     reFresh() {
       this.loading = true;
        this.getStatement()
        setTimeout(() => {
         this.loading = false;
         this.datalist;
       }, 2000);

     },
     async detailBet(data, settled){
        // let param = {
        //   date : data.date,
        //   tab : 'My Bets',
        // }
        // this.$emit('emitTabActive',param)
        if(data.remark != 'Opening Balance'){
          this.betlist = true
          await this.gatSettled(data.date)
          // var obj = this.dataSettled.ticket.data.filter(f=> f.report_date == data.date)
          // console.log(obj)
          return  this.datafilter = this.dataSettled.ticket.data
        }
      },
      async getStatement(dateselect = null){
        this.loading = true;

             let response = await this.$axios.get("event/ticket/statement",{
                              params :{dateText : this.dateText}
                            });
             this.datalist = response.data.ticket
             this.oldslist = response.data.ticket;
             this.loading = false;


      },
      async gatSettled(date = null){
      let data = {
              page: this.curPagesettled,
              date : date ? date : null,
              lang:this.lang  }
      let response =  await this.$axios.get("/event/ticket/settled",{ params: data});
      this.dataSettled = response.data
      this.datafilter = response.data.ticket.data
      
      this.frompagesettled = response.data.ticket.meta.from
      this.curPagesettled = response.data.ticket.meta.current_page
      this.perPagesettled = response.data.ticket.meta.per_page
      this.totalAllsettled = response.data.ticket.meta.total

      },

    },
  async created() {
     this.dateTime = this.selected_date[0]['text'+this.keyLang];
     this.datemoment ;
     this.getStatement()

  },
  watch : {
    tabs(value){
      if(value == 1 && this.betlist == true){
      return  this.betlist = false
      }
    },

  }
};
</script>

<style scoped>
.table-responsive {
  margin-bottom: 1rem;
  border-radius: 1em;
  border: 1px solid #E0E0E0;
 
}
.badge-sy{
  background: #FFFF;
  border: 1px solid #E0E0E0;
  border-radius:10px ;
  padding:  5px 11px 5px 11px;
  color: #000000;

}
.active{
  text-decoration: underline;
}
.text-type:hover {
  text-decoration: underline;
}
.border-sy {
  border-right: 1px solid silver;
}
.spinner-sy {
  position: absolute;
  z-index: 2px;
}
@media screen and (max-width: 1200px) {
  .border-sy {
    border-right: 0px solid silver;
  }
}
</style>
