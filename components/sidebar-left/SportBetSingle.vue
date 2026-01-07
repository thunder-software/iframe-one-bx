<template>
  <div>
    <b-card
      class="mt-0 h-full bg-white"
      v-if="dataBet.length != 0 && dataBet != false"
      no-body
      style="border: 0px solid #3d94f6; background: none"
    >
      <template #header>

          <!-- <div class="flex">
            <div class="flex w-80" style="padding-left: 90px;">
              <span>{{ trans("sidebar.ticket") }} </span>
            </div>
            <div class="flex w-16 cursor-pointer pt-1" @click="closebet()">
              <b-icon icon="x-square" scale="1" variant="white"></b-icon>
            </div>
          </div> -->
      </template>
      <b-card-body class="py-0 px-2">
        <div v-if="is_price_change" class="mt-1 py-1 text-left pl-2 text-white"
          style="background: rgb(33 29 14); border: 0px solid ;font-size: 11px;color: red;">
          <small class="font-semibold font-st" style="color: #ff0f11;">  <b-icon icon="exclamation-circle-fill" variant="danger"></b-icon> {{ trans('content.odds_changed') }} </small>
        </div>
        <div
            class="mt-1 pl-2 text-center text-white"
            :style="dataBet.is_live == '1' ? 'background: black' : 'background: black'"
            style="border-radius: 4px;"
          >
        <div class="text-left flex w-full">
          <div class="flex-1">
            <span class="">
              <span class="oddsDataStates" style="display: inline-block;">
                 <span  class="oddsDataStates_light"></span>
               </span>
            <span v-if="dataBet.type == 1" class="align-middle inline-block font-bold" style="font-size: 13px; display: contents;line-height: 0;">{{ trans('header.football') }} - {{ typeBet(dataBet.market_type , dataBet) }} </span>
            <span v-if="dataBet.type == 44" class="align-middle inline-block font-bold" style="font-size: 13px; display: contents;line-height: 0;">{{ trans('header.muaythai') }} - {{ typeBet(dataBet.market_type , dataBet) }} </span>
            <span v-if="dataBet.type == 35" class="align-middle inline-block font-bold" style="font-size: 13px; display: contents;line-height: 0;">{{ trans('header.cockfight') }} - {{ typeBet(dataBet.market_type , dataBet) }} </span>
            <span v-if="dataBet.type == 10" class="align-middle inline-block font-bold" style="font-size: 13px; display: contents;line-height: 0;">{{ trans('header.bullfight') }} - {{ typeBet(dataBet.market_type , dataBet) }} </span>
            <span v-if="dataBet.type == 2" class="align-middle inline-block font-bold" style="font-size: 13px; display: contents;line-height: 0;">{{ trans('header.basketball') }} - {{ typeBet(dataBet.market_type , dataBet) }} </span>
            <span v-if="dataBet.type == 6" class="align-middle inline-block font-bold" style="font-size: 13px; display: contents;line-height: 0;">{{ trans('header.snooker') }} - {{ typeBet(dataBet.market_type , dataBet) }} </span>
            </span>
          </div>
          <div class="flex float-right text-right">
            <div class="cursor-pointer pt-1 pr-2 float-right text-right" @click="closebet()">
              <b-icon icon="x-square" scale="1" ></b-icon>
            </div>
          </div>
        </div>
        <div class="text-left">
          
          <div
            class="text-left"
            style=""
          >
          <div class="block" style="line-height: 1.5;">
            <div v-if="!getdatatab" :style="dataBet.is_live == '1' ? 'border-left : 4px solid #e65322' : 'border-left : 4px solid #5769bf'" class="pl-2">
            <!-- <small class="font-semibold font-st" v-if="dataBet.market_type == 'FH_1x2'" :class="colottext(dataBet)">{{ inwhodata(dataBet) }}</small> -->
            <small class="block font-semibold font-st " v-if="dataBet.in_who == '1'|| dataBet.in_who =='2'" :class="colottext(dataBet)">
                <div v-if="lang == 'th'">
                  <div v-if="dataBet.bet_choice_lang != 'สูง' && dataBet.bet_choice_lang != 'ต่ำ'">
                    {{ dataBet['bet_choice' + _keyLang] ? dataBet['bet_choice' + _keyLang] : dataBet['bet_choice_lang'] }}
                  </div>
                  <div v-else>
                    {{ checkOverUnder(dataBet.bet_choice_lang) }}
                  </div>
                </div>
                <div v-else>
                  {{  dataBet['bet_choice'] }}
                </div>
            </small>

            <!-- <small v-if="dataBet.market_type == 'FH_Handicap'||dataBet.market_type == 'FH_OverUnder'||dataBet.market_type == 'FH_1x2'||dataBet.market_type == 'FH_OE'" class="font-semibold font-st block" :class="colottext(dataBet)">(1st)</small> -->
            <span v-if="dataBet.market_type != '1x2' && dataBet.market_type != 'FH_1x2' && dataBet.market_type != 'OE'" style="font-size: 15px;">
              <span v-if="dataBet.type != 44">{{ dataBet.point }} </span><span v-if="dataBet.is_live == '1'">@</span> <span v-if="dataBet.is_live != 0">{{ dataBet.h_score}}:{{ dataBet.a_score}}</span> @
            </span>  
            <span v-if="!is_price_change" style="font-size: 15px;">
              <div
              class="font-st font-bold"
              is="my-format-price"
              :value="dataBet.price"
              :decimal="2"
              ></div>
            </span>
            <span v-else style="font-size: 15px;">
                <span style="background: #ffc107; text-decoration: line-through;">
                <div
                  class="font-st font-bold"
                  is="my-format-price"
                  :value="dataBet.price_before"
                  :decimal="2"
                  ></div>
                </span>
                <span class="text-danger"><div is="my-format-price" :value="dataBet.price" :decimal="2"/></span>
                <span>
                  <b-icon icon="caret-up-fill" variant="success" style="position: absolute;margin-top: 6px;" font-scale="0.7" v-if="(dataBet.price > dataBet.price_before)"></b-icon>
                  <b-icon icon="caret-down-fill" variant="danger" style="position: absolute;margin-top: 6px;" font-scale="0.7" v-if="(dataBet.price < dataBet.price_before)"></b-icon>
                </span>
            </span>
          </div>

          <b-collapse id="collapse-4" v-model="visible">
            <div>
              <small class="font-st" style="line-height: 1.5;">
                  <span v-if="lang == 'th'" style="display: inline-block !important; vertical-align: middle;" :class="colorteam(dataBet,'h')">
                    {{ dataBet['home' + _keyLang] ? dataBet['home' + _keyLang] : dataBet['home_en'] }}
                  </span>
                  <div v-else style="line-height: 0; display: inline-block;" :class="colorteam(dataBet,'h')">
                    {{  dataBet['home_en'] }}
                  </div>
                  <div style="line-height: 0; display: inline-block;">
                    {{ '-vs-' }}
                  </div>
                  <span v-if="lang == 'th'" style="display: inline-block !important; vertical-align: middle;" :class="colorteam(dataBet,'a')">
                    {{ dataBet['away' + _keyLang] ? dataBet['away' + _keyLang] : dataBet['away_en'] }}
                  </span>
                  <div v-else style="line-height: 0; display: inline-block;" :class="colorteam(dataBet,'a')">
                    {{  dataBet['away_en'] }}
                  </div>
              </small>
              <span class=" text-drak font-st text-overflow text-left" style="line-height: 1.5;">
              {{ dataBet['league_name'+_keyLang] ? dataBet['league_name'+_keyLang]  : dataBet['league_name_en'] }}
              </span>
            </div>
            </b-collapse>

          </div>
          </div>
          </div>
        </div>

        <!-- <div v-if="is_price_change"
            class="mt-1 py-1 text-center"
            style="background: rgb(255 254 213);border: 2px solid rgb(234 196 34); border: 2px solid #fdb8a7;font-size: 11px;color: red;"
          >
          <small class="font-semibold font-st"><div is="my-format-price" :value="dataBet.price_before" :decimal="2" /></small> <small class="font-semibold font-st">{{ trans('content.odds_changed') }}</small> <span class="" style="font-size: 13px;font-weight: 600;"><div is="my-format-price" :value="dataBet.price" :decimal="2"/></span>
        </div> -->

        <b-form @submit.prevent="betsport()">
        <div class="my-2">
          <!-- prepend="THB" -->
          <b-input-group size="sm">
            <b-form-input
             type="tel"
             ref="inputbet"
             min="0"
             class="text-right"
             required
             max="1000000"
             :formatter="textUpperCase" 
             oninput="validity.valid||(value='');"
            size="sm"
            :placeholder="placeholder_max_min"
            style="font-size: 0.8rem; font-weight: 600; background: black; border: 1px solid #8989; border-right: 0; color: white;"
            v-model="inputbet"
            ></b-form-input>
            <template #append>
              <span class="hidden">{{ placeholder_max }}</span>
              <b-input-group-text @click="removeInput()" style="cursor: pointer; border: 1px solid #8989; border-left: 0px solid black !important; background: black !important;"><strong class="text-danger">
                <b-icon icon="x-circle-fill" variant="secondary"></b-icon>
              </strong></b-input-group-text>
            </template>
          </b-input-group>
          <!-- <div class="py-1">
              <b-form-checkbox
                v-model="accepted"
                class="pt-0"
              >
              <small class="block" style="display: contents;font-size: 12px;">{{ trans('sidebar.acceptanybetterodds') }}</small>
              </b-form-checkbox>
          </div> -->

          <div class="flex">
              <div class="flex text-left h-5 mt-1">
                <small class="font-semibold font-st text-white">{{ trans("sidebar.maxpayout") }}</small>
              </div>
              <div class="flex-1 text-right h-5 mt-1">
                <small class="font-semibold font-st text-white">
                <div
                is="my-format-price"
                :value="highest_pay = null ? 0 : highest_pay"
                :decimal="2"
                class="font-st"
                ></div>
                </small>
                <small> </small>
              </div>
            </div>

            <div class="flex mt-2  text-center">
              <div class="flex w-full ml-0">
                <div class="flex-1 mr-2">
                  <button class="font-st w-full font-medium" type="button" style="background: #ffc107; color: black !important; height: 27px; border-radius: 3px; border: 0px solid silver;" size="sm" @click="setprice(dataBet.min_bet , 'min')">{{ langs == 'th' ? 'ต่ำสุด' : 'Min' }}</button>
                </div>
                <div class="flex-1 w-full" v-for="(item,i) in options" :key="i" :class="options.length == i ? '' : 'mr-2'">
                  <button class="font-st w-full font-medium" type="button" :class="i == 0 ? '' : 'mr-2'" style="background: #ffc107; color: black !important; height: 27px; border-radius: 3px; border: 0px solid silver;" size="sm" @click="setprice(item.value)">{{item.text}}</button>
                </div>
                <div class="flex-1">
                  <button class="font-st w-full font-medium" type="button" style="background: #ffc107; color : black !important; height: 27px; border-radius: 3px; border: 0px solid silver;" size="sm" @click="setprice(dataBet.max_bet , 'max')">{{ trans('sidebar.maxbet_bet') }}</button>
                </div>
              </div>
            </div>
          </div>

          <div class="my-2">
            <div class="flex">
              <!-- <div class="flex-1">
                <button
                  type="button"
                  class="w-full btn-close font-st btn-sm"
                  :disabled="lodeing"
                  @click="closebet()"
                  >{{ trans("sidebar.cancel") }}</button
                >
              </div> -->
              <div class="flex-1" >
                <b-overlay :show="mockloadingbet" rounded="sm" spinner-variant="primary" spinner-small>
                <button
                  class="w-full text-white btn-bet font-st btn-sm"
                  :disabled="inputbet == 0 || inputbet == null ? true : false || lodeing"
                  type="submit"
                  >
                  <b-icon v-if="lodeing" icon="circle-fill" animation="throb"></b-icon>
                  <span style="vertical-align: middle;font-size: 13px;">{{ trans("sidebar.bet") }}</span>
                  </button
                >
              </b-overlay>
              </div>
            </div>
          </div>
        </b-form>

      </b-card-body>
    </b-card>
    <div v-else>
      <b-card
        class="mt-0 h-full bg-white"
        no-body
        v-if="setImage"
        style="
        border: 0px solid #3d94f6; background: none;
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
        "
      >
        <template #header>
          <!-- <div>
            <span>{{ trans("sidebar.ticket") }} </span>
          </div> -->
        </template>
        <b-card-body class="p-2">
          <b-img src="/UFO.gif" style="width: 150px; margin: auto; padding: 8px 0px;"></b-img>
          <span class="" style="font-size: 15px; color: white;" v-if="!fast"> &nbsp;&nbsp; {{ trans("header.slipbetsingle") }}</span>
          <span class="" style="font-size: 15px; color: white;" v-else> {{ trans("content.loading_data") }}</span>
        </b-card-body>
      </b-card>

    </div>
  </div>
</template>

<script>
import { mapActions , mapGetters } from "vuex";
export default {
  props: ["dataBet", "errMsg","hidemenu","fast","overunder"],
  data() {
    return {
      highest_pay:0,
      inputbet: null,
      price : null,
      action_type:"sc",
      lang: this.$auth.$storage.getUniversal("language"),
      lodeing : false,
      accepted : true,
      is_price_change:false,
      placeholder_max_min : "",
      visible : true,
      windowWidth : window.innerWidth,
      setImage : false,
      options:[
          // {value:50,text:'50'},
          // {value:100,text:'100'},
          {value:500,text:'500'},
          {value:1000,text:'1,000'},
          {value:10000,text:'10,000'},
        ],

    };
  },
  mounted(){
    this.accepted = this.mockcheckbox;
  },
  computed:{
    ...mapGetters({
      getuser : "user/getuser",
      getQuickbet : "quickbet/getQuickbet",
      mockcheckbox : "tabbet/mockcheckbox",
      mockprice : "tabbet/mockprice",
      mockpricechange : "tabbet/mockpricechange",
      mockloadingbet : "tabbet/mockloadingbet",
      mockplaceholder : "tabbet/mockplaceholder",
      langs: "language/langs",
      getdatatab : "tabbet/getdatatab",
      getVisible : "visible/getVisible",
      getClosetabs : 'closebet/getClosetabs'
    }),
    placeholder_max(){
      if(this.dataBet){
          this.placeholder_max_min = this.max_min(this.dataBet.min_bet, this.dataBet.max_bet)
          return this.max_min(this.dataBet.min_bet, this.dataBet.max_bet)
      }
    }
  },
  methods: {
    ...mapActions({
      fetchListBet: "listbet/fetchListBet",
      confirmBet: "listbet/confirmBet",
      fetchbetlist : "fetchbet/fetchbetlist",
      removeAll: "tabmix/removeAll",
      fetchGetListBet: "listbet/fetchGetListBet",
      fetchBalance : "balance/fetchBalance",
      actionsQuickbet:"quickbet/actionsQuickbet",
      setPrice : "tabbet/setPrice",
      setPlaceholder : "tabbet/setPlaceholder",
      setCheckbox : "tabbet/setCheckbox",
      setPriceChange : "tabbet/setPriceChange",
      setLoadingbet : "tabbet/setLoadingbet",
      actionsVisible : "visible/actionsVisible",
      closeTabsbet : 'closebet/closeTabsbet'

    }),
    checkOverUnder(e){
      if(this.$route.name == 'muaythai-path'){
        if(this.lang == 'th'){
          return e == 'สูง' ? 'ครบยก' : 'ไม่ครบยก'
        }else{
          return e
        }
      }else{
        if(this.lang == 'th'){
          return e == 'สูง' ? 'สูงกว่า' : 'ต่ำกว่า'
        }else{
          return e
        }
      }
      
    },
    colorteam(obj , type){    
      if(obj.bet_choice != "Over" && obj.bet_choice != "Under" && obj.bet_choice != "Draw"){
        if(type == 'a'){
            if (obj.in_who === '2' && obj.option === 'a') {
              return 'text-red-600';
            }else{
              if(obj.in_who != '1'){
                return 'text-red-600';
              }
              return 'text-primary';
            }
        }else{
            if (obj.in_who === '1' && obj.option === 'h') {
              return 'text-red-600';
            }else{
              if(obj.in_who != '2'){
                return 'text-red-600';
              }
              return 'text-primary';
            }
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
        if(data.type_sport_id != 44){
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
    textUpperCase(e) {
     let value = e+''
     return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
     },
    setprice(price , type){
      if(type != 'min'){
        if (this.inputbet == null) {
          this.inputbet = 0
          this.inputbet = parseInt(price)
          if(this.windowWidth > 850){
            this.$nextTick(() => {
              this.$refs.inputbet.focus()
            })
          }
        }else{
          if(!this.inputbet){
            this.inputbet = 0
          }
          if(type == 'max'){
            this.inputbet  = parseInt(this.dataBet.max_bet)
          }else{
            var check = typeof this.inputbet
            var str
            if(check == 'string'){
              str = this.inputbet.replaceAll(',', '');
            }else{
              str = this.inputbet
            }
            if(parseInt(str) >= parseInt(this.dataBet.max_bet)){
              this.inputbet = parseInt(this.dataBet.max_bet)
            }else if(type == 'min'){
              this.inputbet  = parseInt(this.dataBet.min_bet)
            }else{
              this.inputbet = parseInt(price) + parseInt(str)
            }
          }
          if(this.windowWidth > 850){
            this.$nextTick(() => {
              this.$refs.inputbet.focus()
            })
          }
        }
      }else{
        this.inputbet  = parseInt(this.dataBet.min_bet)
      }
      },
    closebet(){
      this.setImage = true
      this.closeTabsbet(true)
      setTimeout(() => {
        this.setImage = false
      }, 6000);
      this.$emit('closebet')
      this.removeAll()
    },
    async betsport() {
      this.price = this.$auth.$storage.getUniversal('price')
      this.lodeing = true
      this.setLoadingbet(true)
      if(this.inputbet == 0 || this.inputbet == null){
         return this.$swal.fire(this.trans(`ms_error.fail`), this.trans(`ms_error.please_price`)+'!', "warning");
      }

      var inputbet = null
      if(typeof this.inputbet == 'string'){
         inputbet = this.inputbet.replace(",","");
      }else{
        inputbet = this.inputbet;
      }

      var langs 
      if(this.lang == 'th'){
        langs = 'th'
      }else if(this.lang != 'en'){
        langs = 'en'
      }else{
        langs = 'en'
      }
      var value_stake
      if(inputbet.length == 8){
          value_stake = parseFloat(inputbet.replace(/,/g, ''));
      }else{
        value_stake = inputbet
      }
        var obj = {
         'lang':langs,
         'stake' : value_stake.toString(),
         'action_type' : this.action_type,
         'accept_good_odd' : true,
         'sport_type' : this.dataBet.sport_type,
         'sport_id' : this.dataBet.type,
         'select_table' : this.$auth.$storage.getUniversal("lineType"),
         'device': 'pc',
         'ticket' : {
                'odds_type' : this.price,
                'odds_total' : this.dataBet.price,
                'item' : [
                    {
                      'event_id' : this.dataBet.event_id,
                      'odd_id' : this.dataBet.odd_id,
                      'option' : this.dataBet.option,
                      'point' : this.dataBet.point,
                      'price' : this.dataBet.price,
                      'choose' : this.dataBet.bet_choice == " "? this.dataBet.bet_choice_lang : this.dataBet.bet_choice,
                      'market_type' : this.dataBet.market_type,
                      'in_who' :  this.dataBet.in_who,
                      'h_score' : this.dataBet.h_score,
                      'a_score' : this.dataBet.a_score,
                      'is_live' : this.dataBet.is_live,
                    }
                ]
            }
      }
      
      if(this.fast == 'fast'){
        obj.mainbet = '1'
      }

      try {
      let response = await this.$axios.post("/ticket/bet/confirm" , obj);
      if(response.data.status){
        this.$bvToast.toast(this.trans(`ms_error.succeed`) +'!', {
          title: this.trans(`ms_error.bet`)+this.trans(`ms_error.succeed`),
          toaster: "b-toaster-bottom-right",
          solid: true,
          appendToast: true,
          autoHideDelay: 1000,
          variant: "success",
        });

          this.fetchBalance();
          this.fetchGetListBet({lang: langs});
          this.lodeing = false
          this.setLoadingbet(false)
          this.$emit("closebet");
      }else{
        if(response.data.message['type_error'] == 'point' || response.data.message['type_error'] == 'price'){
          if(response.data.message['type_error'] == 'point'){
            this.dataBet.point = response.data.message['point_new'];
          }
          this.dataBet.price_before = response.data.message['price_old'];
          this.dataBet.price = response.data.message['price_new'];
          this.is_price_change = true;
          this.setPriceChange(true)
          setTimeout(() => {
            this.setPriceChange(false)
            this.is_price_change = false
          }, 4000);
        }else{
          this.$swal.fire(response.data.message ,{
              icon: 'warning',
              title: this.trans(`ms_error.fail`),
            });
        }
        this.lodeing = false
        this.setLoadingbet(false)
      }
      } catch (error) {
        this.lodeing = false
        this.setLoadingbet(false)
        if(error.response.data.message){
            this.$swal.fire(error.response.data.message ,{
              icon: 'warning',
              title: this.trans(`ms_error.fail`),
            });
        }
        this.$emit("closebet");

    }
  },
  inwhodata(item){

      if([44,35,10035].includes(item.type_sport_id)){
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
  max_min(min,max){
    if(min != null){
      this.placeholder_max_min = this.textUpperCase(parseInt(min)) + '-' + this.textUpperCase(parseInt(max))
      return this.textUpperCase(parseInt(min)) + '-' + this.textUpperCase(parseInt(max))
    }else{
      this.placeholder_max_min = ""
      return ""
    }
  },
  removeInput(){
    this.inputbet = null
    this.max_min(null)
    this.setPlaceholder(true)

  },
  toggleVisible(){
      this.visible = ! this.visible
      if(this.visible){
        this.actionsVisible(null)
        localStorage.removeItem('visible')
      }else{
        this.actionsVisible(true)
        localStorage.setItem('visible',1)
      }
  }
  },
  created() {
    setTimeout(() => {
      this.setImage = false
    }, 6000);
    if(localStorage.getItem('visible') == '1'){
      this.actionsVisible(true)
      this.visible = false
    }
   this.setPlaceholder(false)
   this.placeholder_max_min = ""
   this.price = this.$auth.$storage.getUniversal('price')
  },
  watch: {
    inputbet(new_val, old_val) {
       this.setPrice(new_val)
       if (new_val > 0 || new_val != null) {
        var inputbet = null
        if(typeof new_val == 'string'){
          inputbet = new_val.replace(",","");
        }else{
          inputbet = new_val
        }
			 	if(inputbet != '' &&  this.dataBet.price > 0){
          if(typeof this.inputbet != 'string'){
            this.highest_pay = parseInt(inputbet) *  this.dataBet.price
          }else{
            this.highest_pay = parseInt(inputbet.replace(",","")) *  this.dataBet.price
          }
          
			 	}if(0 >  this.dataBet.price){
			 		this.highest_pay = parseInt(inputbet) > 0 ? parseFloat(inputbet) : 0
			 	}
         }
         else{
         this.highest_pay = 0;
       }
    },
    mockprice(value){
      this.inputbet = value
    },
    mockloadingbet(value){
      this.lodeing = value
    },
    mockpricechange(value){
      this.is_price_change = value
    },
    mockplaceholder(value){
      if(value){
        this.placeholder_max_min = ''
      }
    },
    mockcheckbox(value){
      this.accepted = value
    },
    accepted(value){
      this.setCheckbox(value)
    },
     mocclose(value){

     },
     langs(value){
      this.lang = value
     },
     getVisible(value){
       if(value){
         this.visible = false
       }else{
        this.visible = true
       }
     },
     getClosetabs(value){
      if(value){
        this.setImage = true
        setTimeout(() => {
          this.closeTabsbet(false)
          this.setImage = false
        }, 6000);
      }
     },
    dataBet(value){
      if(window.innerWidth > 850){
        this.$nextTick(() => {
          value.length != 0 ? this.$refs.inputbet.focus() : []
        })
      }
      if (this.inputbet = null) {
				if(this.inputbet != '' &&  this.dataBet.price > 0){
					this.highest_pay = this.inputbet *  this.dataBet.price
				}if(0 >  this.dataBet.price){
					this.highest_pay = this.inputbet > 0 ? parseFloat(this.inputbet) : 0
				}
        }
        else{
        this.highest_pay = 0;
      }

      if(this.getQuickbet){
         if(value.length == 0){
          // this.setImage = true
          // setTimeout(() => {
          //   this.setImage = false
          // }, 6000);
           this.actionsQuickbet(false)
         }else{
           this.actionsQuickbet(true)
         }
      }

      if(value.price_before != value.price){
        this.is_price_change = true;
        this.setPriceChange(true)
        setTimeout(() => {
          this.setPriceChange(false)
          this.is_price_change = false;
        }, 4000);
      }else{
        this.is_price_change = false
        this.setPriceChange(false)
      }

    },
  }
};
</script>
<style>
.input-group-text {
  font-size: 11px !important;
  background: none !important;
}
</style>

<style scoped>
.btn-sm, .btn-group-sm > .btn {
    border-radius: 0.5rem;
}
.card-header {
  text-align: center;
  /* background: linear-gradient(to bottom, #3d94f6 5%, #1e62d0 100%); */
  background: black;
  color: white;
  border-radius: 0px;
  padding: 0px 0px;
}

.font-st{
font-size: 13px !important;
}
.btn-close {
  /* background: linear-gradient(to bottom, #fc8d83 5%, #e4685d 100%); */
  background: white;
  border: 1px solid #FF4757;
  color: #FF4757;
}
.btn-close:hover {
  /* background: linear-gradient(to bottom, #fc8d83 5%, #e4685d 100%); */
  background: #FF4757;
  border: 1px solid rgba(255, 71, 87, 1);
  color: white
}
.btn-close:not(:disabled):not(.disabled):active, .btn-close:not(:disabled):not(.disabled).active, .show > .btn-close.dropdown-toggle {
    color: #fff;
    background-color: #fb3141;
    border-color: #fb3141;
}
/* .textoverflow-st{
    width: 195px;
    padding: 0;
    overflow: hidden;
    position: relative;
    display: inline-block;
    text-align: left;
    text-decoration: none;
    text-overflow: clip;
    white-space: nowrap;
    color: #000;
} */

.text-overflow{
  white-space: nowrap;
  width: 182px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
}
.btn-bet {
    background-color: #ffce46;
    border: 1px solid #ffce46;
    color: black !important;
    font-weight: 700;
}
.btn-bet:hover {
  background-color: #ffce46;
    border: 1px solid #ffce46;
    color: black !important;
    font-weight: 700;
}
.btn-bet:not(:disabled):not(.disabled):active, .btn-bet:not(:disabled):not(.disabled).active, .show > .btn-bet.dropdown-toggle {
  background-color: #ffce46;
    border: 1px solid #ffce46;
    color: black !important;
    font-weight: 700;
}

.oddsDataStates .oddsDataStates_light {
    display: block;
    width: 8px;
    height: 8px;
    background-color: #1becdb;
    border-radius: 50%;
    box-shadow: 0 0 5px #09ffea;
    -webkit-animation-name: breathingLight;
    animation-name: breathingLight;
    -webkit-animation-duration: 2s;
    animation-duration: 2s;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    -webkit-animation-timing-function: ease;
    animation-timing-function: ease;
}
@keyframes breathingLight {
  50% {
    opacity: .2;
  }
  100% {
    opacity: 1;
  }
}
</style>