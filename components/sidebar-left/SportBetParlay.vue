<template>
  <div>
    <div class="p-0 mt-0" v-if="dataMix.length != 0">
      <b-card class="mt-0 h-full bg-white" no-body style="border: 0px solid #3d94f6; background: none">
        <template #header>
          <!-- <div>
            <span>{{ trans("sidebar.ticket") }} </span>
          </div> -->
        </template>
        <b-card-body class="py-0 px-2">
          <div v-if="is_price_change" class="mt-1 py-1 text-left pl-2 text-white"
              style="background: rgb(33 29 14); border: 0px solid ;font-size: 11px;color: red;">
              <small class="font-semibold font-st" style="color: #ff0f11;">  <b-icon icon="exclamation-circle-fill" variant="danger"></b-icon> {{ trans('content.odds_changed') }} </small>
            </div>

          <div class="text-left" v-for="(items, i) in dataMix" :key="i">


            <div
                class="mt-1 pl-2 text-center text-white"
                :style="items.is_live == '1' ? 'background: black' : 'background: black'"
                style="border-radius: 4px;"
              >
                <div class="text-left flex w-full">
                  <div class="flex-1">
                    <span class="">
                      <span class="oddsDataStates" style="display: inline-block;">
                        <span  class="oddsDataStates_light"></span>
                      </span>
                    <span v-if="items.type_sport_id == 1" class="align-middle inline-block font-bold" style="font-size: 13px; display: contents;line-height: 0;">{{ trans('header.football') }} - {{ typeBet(items.market_type) }} </span>
                    <span v-if="items.type_sport_id == 44" class="align-middle inline-block font-bold" style="font-size: 13px; display: contents;line-height: 0;">{{ trans('header.muaythai') }} - {{ typeBet(items.market_type) }} </span>
                    <span v-if="items.type_sport_id == 35" class="align-middle inline-block font-bold" style="font-size: 13px; display: contents;line-height: 0;">{{ trans('header.cockfight') }} - {{ typeBet(items.market_type) }} </span>
                    <span v-if="items.type_sport_id == 10" class="align-middle inline-block font-bold" style="font-size: 13px; display: contents;line-height: 0;">{{ trans('header.bullfight') }} - {{ typeBet(items.market_type) }} </span>
                    <span v-if="items.type_sport_id == 2" class="align-middle inline-block font-bold" style="font-size: 13px; display: contents;line-height: 0;">{{ trans('header.basketball') }} - {{ typeBet(items.market_type) }} </span>
                    <span v-if="items.type_sport_id == 6" class="align-middle inline-block font-bold" style="font-size: 13px; display: contents;line-height: 0;">{{ trans('header.snooker') }} - {{ typeBet(items.market_type) }} </span>
                    </span>
                  </div>
                  <div class="flex float-right text-right">
                    <div class="cursor-pointer pt-1 pr-2 float-right text-right" @click="deleteBet(items)">
                      <b-icon icon="x-square" scale="1" ></b-icon>
                    </div>
                  </div>
                </div>

                <div class="text-left">
                  <div class="text-left">
                    <div class="block" style="line-height: 1.5;">
                      <div :style="items.is_live == '1' ? 'border-left : 4px solid #e65322' : 'border-left : 4px solid #5769bf'" class="pl-2">
                        <small class="block font-semibold font-st " v-if="items.in_who == '1'|| items.in_who =='2'" :class="colottext(items)">
                            <div v-if="lang == 'th'">
                              <div v-if="items.bet_choice_lang != 'สูง' && items.bet_choice_lang != 'ต่ำ'">
                                {{ items['bet_choice' + _keyLang] ? items['bet_choice' + _keyLang] : items['bet_choice_lang'] }}
                              </div>
                              <div v-else>
                                {{ checkOverUnder(items.bet_choice_lang) }}
                              </div>
                            </div>
                            <div v-else>
                              {{  items['bet_choice'] }}
                            </div>
                        </small>

                        <!-- <small v-if="items.market_type == 'FH_Handicap'||items.market_type == 'FH_OverUnder'||items.market_type == 'FH_1x2'||items.market_type == 'FH_OE'" class="font-semibold font-st block" :class="colottext(items)">(1st)</small> -->
                        <span v-if="items.market_type != '1x2' && items.market_type != 'FH_1x2' && items.market_type != 'OE'" style="font-size: 15px;">
                          {{ items.point }} <span v-if="items.is_live == '1'">@</span> <span v-if="items.is_live != 0">{{ items.h_score}}:{{ items.a_score}}</span> @
                        </span>  
                        <span v-if="!items.is_change && !items.is_has_change" style="font-size: 15px;">
                          <div
                          class="font-st font-bold"
                          is="my-format-price"
                          :value="items.price"
                          :decimal="2"
                          ></div>
                        </span>
                        <span v-else style="font-size: 15px;">
                            <span style="background: rgb(204 165 11); text-decoration: line-through;">
                            <div
                              class="font-st font-bold"
                              is="my-format-price"
                              :value="items.price_before"
                              :decimal="2"
                              ></div>
                            </span>
                            <span class="text-danger"><div is="my-format-price" :value="items.price" :decimal="2"/></span>
                            <span>
                              <b-icon icon="caret-up-fill" variant="success" style="position: absolute;margin-top: 6px;" font-scale="0.7" v-if="(items.price > items.price_before)"></b-icon>
                              <b-icon icon="caret-down-fill" variant="danger" style="position: absolute;margin-top: 6px;" font-scale="0.7" v-if="(items.price < items.price_before)"></b-icon>
                            </span>
                        </span>

                      </div>

                          <div>
                            <small class="font-st" style="line-height: 1.5; display: block;">
                                <div v-if="lang == 'th'" style="line-height: 0; display: inline-block;">
                                  {{ items['home' + _keyLang] ? items['home' + _keyLang] : items['home_en'] }}
                                </div>
                                <div v-else style="line-height: 0; display: inline-block;">
                                  {{  items['home_en'] }}
                                </div>
                                <div style="line-height: 0; display: inline-block;">
                                  {{ '-vs-' }}
                                </div>
                                <div v-if="lang == 'th'" style="line-height: 0; display: inline-block;">
                                  {{ items['away' + _keyLang] ? items['away' + _keyLang] : items['away_en'] }}
                                </div>
                                <div v-else style="line-height: 0; display: inline-block;">
                                  {{  items['away_en'] }}
                                </div>
                            </small>
                            <span class=" text-drak font-st text-overflow text-left" style="line-height: 1.5;">
                            {{ items['league_name'+_keyLang] ? items['league_name'+_keyLang]  : items['league_name_en'] }}
                            </span>

                          </div>


                    </div>
                  </div>
                </div>

            </div>

            <!-- <div class="flex">
              <small class="text-right circle-icon flex">
                <b-icon icon="x-circle-fill" variant="danger" style="position: absolute; right: 5px;" @click="deleteBet(items)"></b-icon>
              </small>
            </div> -->


            <!-- <span>
              <small :class="items.in_who == '1' ? 'text-danger' : 'text-primary'">
                <small class="font-st">
                  <small v-if="lang == 'th'" style="font-size: 13px;">
                  {{ items['home' + _keyLang] ? items['home' + _keyLang] : items['home_en'] }}
                  </small>
                  <small v-else  style="font-size: 13px;">
                    {{  items['home_en'] }}
                  </small>
                </small>
              </small>
              <small>vs</small>
              <small class="" :class="items.in_who == '2' ? 'text-danger' : 'text-primary'">
                <small class="font-st">
                  <small v-if="lang == 'th'" style="font-size: 13px;">
                  {{ items['away' + _keyLang] ? items['away' + _keyLang] : items['away_en'] }}
                  </small>
                  <small v-else  style="font-size: 13px;">
                    {{  items['away_en'] }}
                  </small>
                </small>
              </small>
            </span> -->

            <!-- <div class="mt-1 py-1 text-left" style="background: rgba(241, 241, 241, 1); border-radius: 4px;">
                <small class="block font-semibold font-st text-left">
                  {{ submarket(items.market_type) }} : {{ items.point }}
                </small>
              <small class="inline-block font-semibold font-st"
                v-if="items.market_type == 'Handicap' || items.market_type == 'FH_1x2' || items.market_type == 'FH_Handicap'"
                :class="colottext(items)">{{ inwhodata(items) }}</small>
              <small class="inline-block font-semibold font-st" v-if="items.in_who == '1' || items.in_who == '2'"
                :class="colottext(items)">
                <div v-if="lang == 'th'">
                  {{ items['bet_choice' + _keyLang] ? items['bet_choice' + _keyLang] : items['bet_choice_lang'] }}
                </div>
                <div v-else>
                  {{  items['bet_choice'] }}
                </div>
              </small>
              <small
                v-if="items.market_type == 'OverUnder' || items.market_type == 'FH_OverUnder' || items.market_type == 'OE'"
                class="inline-block font-semibold font-st" :class="colottext(items)">
                <div v-if="lang == 'th'">
                  {{ items['home' + _keyLang] ? items['home' + _keyLang] : items['home_en'] }}
                  </div>
                  <div v-else>
                    {{  items['home_en'] }}
                  </div>
                  </small>
                  <small class="font-st font-semibold">{{ items.h_score }} : {{ items.a_score }}</small>
              <small
                v-if="items.market_type == 'FH_Handicap' || items.market_type == 'FH_OverUnder' || items.market_type == 'FH_1x2' || items.market_type == 'FH_OE'"
                class="font-semibold inline-block" :class="items.option == 'h' ? 'text-red-600' : 'text-primary'">(1st)</small>
              <small class="inline-block font-semibold font-st">@
                <span v-if="!items.is_has_change && !items.is_change">
                  <div is="my-format-price" :value="items.price" :decimal="2"></div>
                </span>
                <span v-if="items.is_has_change || items.is_change">
                  <span style="background: #ffff86; text-decoration: line-through;">
                <div
                  class="font-st font-bold"
                  is="my-format-price"
                  :value="items.price_before"
                  :decimal="2"
                  ></div>
                </span>
                <span class="text-danger"><div is="my-format-price" :value="items.price" :decimal="2"/></span>
                <span>
                  <b-icon icon="caret-up-fill" variant="success" style="position: absolute;margin-top: 6px;" font-scale="0.7" v-if="(items.price > items.price_before)"></b-icon>
                  <b-icon icon="caret-down-fill" variant="danger" style="position: absolute;margin-top: 6px;" font-scale="0.7" v-if="(items.price < items.price_before)"></b-icon>
                </span>
                </span>
              </small>
            </div> -->

            <!-- <div v-if="items.is_change" class="mt-2 py-1 text-center"
              style="background: rgb(255 254 213);border: 2px solid rgb(234 196 34); border: 2px solid #fdb8a7;font-size: 11px;color: red;">
              <small class="font-semibold font-st">
                <div is="my-format-price" :value="items.price_before" :decimal="2"></div> {{
                  trans('content.odds_changed') }} <div is="my-format-price" :value="items.price" :decimal="2"></div>
              </small>
            </div>
            <div v-if="items.is_has_change" class="mt-2 py-1 text-center"
              style="background: rgb(255 254 213);border: 2px solid rgb(234 196 34); border: 2px solid #fdb8a7;font-size: 11px;color: red;">
              <small class="font-semibold font-st">
                <div is="my-format-price" :value="items.price_before" :decimal="2"></div> {{
                  trans('content.odds_changed') }} <div is="my-format-price" :value="items.price" :decimal="2"></div>
              </small>
            </div> -->


            <div v-if="items.is_errMsg" class="mt-2 py-1 text-center"
              style="background: #000;border: 2px solid rgb(204 165 11); border: 2px solid #fdb8a7;font-size: 11px;color: red;">
              <small class="font-semibold font-st">{{ errMsg }}</small>
            </div>


          </div>
          <b-form @submit.prevent="betsport()">
            <div class="my-2">
              <div class="my-2" v-if="sumprice != 0">
                <small class="font-semibold font-st text-white"> {{ stustType(dataMix[0].type) }} @ {{ sumprice }}</small>
              </div>
              <!-- prepend="THB" -->
              <b-input-group size="sm">
              <b-form-input type="tel" min="0" max="1000000" ref="inputbet3" required class="text-right" :formatter="textUpperCase" 
                oninput="validity.valid||(value='');" size="sm" :placeholder="placeholder_max_min"
                style="font-size: 0.8rem; border: 1px solid #8989; border-right: 0px !important; background: black; color: white;" v-model="inputbet"></b-form-input>
                <template #append>
                  <span class="hidden">{{ placeholder_max }}</span>
                  <b-input-group-text @click="removeInput()" style="cursor: pointer; border-left: 0px solid; border: 1px solid #8989; background: black !important;"><strong class="text-danger mt-1">
                    <b-icon icon="x-circle-fill" variant="secondary"></b-icon>
                  </strong></b-input-group-text>
                </template>
              </b-input-group>

              <div class="py-0">
                    <!-- <b-form-checkbox
                      v-model="accepted"
                      class="pt-0"
                    >
                    <small class="block" style="display: contents; font-size: 12px;">{{ trans('sidebar.acceptanybetterodds') }}</small>
                    </b-form-checkbox> -->
                </div>
                
              <!-- <div class="my-2 text-center" style="background: #ff6; border: 1px solid orange"
                v-if="dataMix.length < checkMinmatch(dataMix[0])">
                <small class="font-semibold font-st"> {{ stustType(dataMix[0].type) }} {{ trans('content.minimum') }} {{
                  checkMinmatch(dataMix[0]) }} </small>
              </div> -->

              <div class="my-2 text-center" v-if="dataMix.length > parseInt(dataMix[0].maxmatch)"
                style="background: #ffc107; border: 1px solid orange;">
                <small class="font-semibold font-st" style="color: #000 !important;"> {{ trans('sidebar.maxbet_bet') }} {{ parseInt(dataMix[0].maxmatch) }} {{ trans('results.pair') }} </small>
              </div>

              <div class="flex mt-2">
                <div class="flex text-left">
                  <small class="font-semibold font-st">{{ trans("sidebar.maxpayout") }}</small>
                </div>
                <div class="flex-1 text-right">
                  <small class="font-semibold font-st">
                    <div is="my-format-price" :value="highest_pay = null ? 0 : highest_pay" :decimal="2"></div>
                  </small>
                  <small></small>
                </div>
              </div>

              <div class="flex mt-1  text-center">
              <div class="flex w-full ml-0">
                <div class="flex-1 mr-2">
                  <button class="font-st w-full font-medium" type="button" style="background: #ffffff00; height: 27px; border-radius: 3px; border: 1px solid silver; color: silver;" size="sm" @click="setprice(dataMix[0].min_bet , 'min')">{{ langs == 'th' ? 'ต่ำสุด' : 'Min' }}</button>
                </div>
                <div class="flex-1 w-full" v-for="(item,i) in options" :key="i" :class="options.length == i ? '' : 'mr-2'">
                  <button class="font-st w-full font-medium" type="button" :class="i == 0 ? '' : 'mr-2'" style="background: #ffffff00; height: 27px; border-radius: 3px; border: 1px solid silver; color: silver;" size="sm" @click="setprice(item.value)">{{item.text}}</button>
                </div>
                <div class="flex-1">
                  <button class="font-st w-full font-medium" type="button" style="background: #ffffff00; height: 27px; border-radius: 3px; border: 1px solid silver; color: silver;" size="sm" @click="setprice(dataMix[0].max_bet , 'max')">{{ trans('sidebar.maxbet_bet') }}</button>
                </div>
              </div>
            </div>

            <!-- <div class="flex mt-1">
                <div class="flex-1 text-left">
                  <small class="font-semibold font-st">{{ trans("sidebar.min-max") }}</small>
                </div>
                <div class="flex text-right"><small class="font-semibold font-st"> {{ dataMix[0].min_bet | currency }} -
                  </small> <small class="font-semibold font-st"><div is="my-format-price" :value="checkpricemax()"
                      :decimal="0"></div></small></div>
              </div> -->
            </div>

            <div class="my-2">
              <div class="flex">
                <!-- <div class="flex-1">
                  <button type="button" class="w-full btn-close font-st btn-sm" @click="closebet()">{{
                    trans("sidebar.cancel") }}</button>
                </div> -->
                <div class="flex-1">
                  <div v-if="dataMix.length < checkMinmatch(dataMix[0])">
                    <b-button class="w-full text-white btn-bet font-st btn-sm" disabled>{{ trans("sidebar.bet") }}</b-button>
                  </div>
                  <div v-else>
                    <button class="w-full text-white btn-bet font-st btn-sm" 
                      :disabled="inputbet == 0 || inputbet == null && dataMix.length < parseInt(dataMix[0].minmatch) ? true : false || lodeing || dataMix.length > parseInt(dataMix[0].maxmatch)"
                      type="submit">
  
                      <b-icon v-if="lodeing" icon="circle-fill" animation="throb"></b-icon>
                      <span style="vertical-align: middle; font-size: 13px;">{{ trans("sidebar.bet") }}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </b-form>
        </b-card-body>
      </b-card>
    </div>
    <div v-else>
      <b-card class="mt-0 h-full bg-white" no-body v-if="setImage" style="
        border: 0px solid #3d94f6; background: none;
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
      ">
        <template #header>
          <!-- <div>
            <span>{{ trans("sidebar.ticket") }} </span>
          </div> -->
        </template>
        <b-card-body class="p-2">
          <b-img src="/UFO.gif" style="width: 150px; margin: auto; padding: 8px 0px;"></b-img>
          <span class="" style="font-size: 15px ; color: white;">
            &nbsp;&nbsp; {{ trans("header.slipbetparlay") }}</span>
        </b-card-body>
      </b-card>
    </div>


    <b-modal id="bv-modal-example" hide-footer v-if="errMsgshow">
      <div class="mt-2 text-center">
        <h5 class="text-red-600">
          {{ errMsgshow.message }}
        </h5>
      </div>
      <div class="mt-2 py-1 text-center"
        style="background: rgb(255 254 213);border: 2px solid rgb(234 196 34); border: 2px solid #fdb8a7;font-size: 11px;color: red;">
        <div class="inline-block" :class="closePrice(errMsgshow.event_id).in_who == '1' ? 'text-danger' : 'text-primary'">
          <span class=" font-semibold">
            {{ closePrice(errMsgshow.event_id)['home' + _keyLang] ? closePrice(errMsgshow.event_id)['home' + _keyLang] : closePrice(errMsgshow.event_id)['home_en'] }}
          </span>
        </div>
        <span>vs</span>
        <div class="inline-block" :class="closePrice(errMsgshow.event_id).in_who == '2' ? 'text-danger' : 'text-primary'">
          <span class="font-semibold">
            {{ closePrice(errMsgshow.event_id)['away' + _keyLang] ? closePrice(errMsgshow.event_id)['away' + _keyLang] : closePrice(errMsgshow.event_id)['away_en'] }}
          </span>
        </div>
      </div>
    </b-modal>

  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["dataMix"],
  data() {
    return {
      highest_pay: 0,
      inputbet: null,
      arrayList: [],
      price: null,
      lang: this.$auth.$storage.getUniversal("language"),
      sumprice: null,
      is_price_change: false,
      lodeing: false,
      accepted : true,
      errMsg: null,
      errMsgshow: null,
      all_event_id : [],
      windowWidth: window.innerWidth,
      placeholder_max_min : "",
      setImage : true,
      options:[
          {value:500,text:'500'},
          {value:1000,text:'1000'},
          {value:10000,text:'10,000'},
        ],
    };
  },
  computed: {
    ...mapGetters({
      getmix: "tabmix/getmix",
      langs: "language/langs",
      mockplaceholder : "tabbet/mockplaceholder",
    }),
    placeholder_max(){
      if(this.dataMix){
        if(!this.mockplaceholder){ 
          this.placeholder_max_min = this.max_min(this.dataMix[0].min_bet,this.dataMix[0].max_bet)
          return this.max_min(this.dataMix[0].min_bet, this.dataMix[0].max_bet)
        }
      }
    }
  },

  methods: {
    ...mapActions({
      removeBet: "tabmix/removeBet",
      removeAll: "tabmix/removeAll",
      pushBetList: "tabmix/pushBetList",
      fetchbetlist: "fetchbet/fetchbetlist",
      fetchGetListBet: "listbet/fetchGetListBet",
      fetchBalance: "balance/fetchBalance",
      setPlaceholder : "tabbet/setPlaceholder",
    }),
    checkOverUnder(e){
      if(this.lang == 'th'){
        return e == 'สูง' ? 'สูงกว่า' : 'ต่ำกว่า'
      }else{
        return e
      }
    },
    typeBet(e){
      if(e == 'Handicap'){
        return this.lang == 'th' ? 'แฮนดีแคพ' : 'Handicap'
      }
      if(e == 'FH_Handicap'){
        return this.lang == 'th' ? 'แฮนดีแคพครึ่งแรก' : 'FH Handicap'
      }
      if(e == 'OverUnder'){
        return this.lang == 'th' ? 'สูงกว่า ต่ำกว่า' : 'OverUnder'
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
    max_min(min,max){
      if(min == null){
        this.placeholder_max_min = ''
        return ''
      }else{
        return this.textUpperCase(parseInt(min)) + '-' + this.textUpperCase(this.checkpricemax())
      }
    },
    setprice(price , type){
      if(type != 'min'){
        if (this.inputbet == null) {
          if(type == 'max'){
            this.inputbet  = this.textUpperCase(this.checkpricemax())
          }else{
            this.inputbet = 0
            this.inputbet = parseInt(price)
          }
        }else{
          if(!this.inputbet){
            this.inputbet = 0
          }
          if(type == 'max'){
            this.inputbet  = this.textUpperCase(this.checkpricemax())
          }else{
            var check = typeof this.inputbet
            var str
            if(check == 'string'){
              str = this.inputbet.replaceAll(',', '');
            }else{
              str = this.inputbet
            }
            var value = this.textUpperCase(this.checkpricemax())
            var max_value = value.replaceAll(',', '')
            if(parseInt(str) >= parseInt(max_value)){
              this.inputbet = parseInt(max_value)
            }else if(type == 'min'){
                this.inputbet  = parseInt(this.dataMix[0].min_bet)
            }else{
              this.inputbet = parseInt(price) + parseInt(str)
            }
          }
        }
      }else{
        this.inputbet  = parseInt(this.dataMix[0].min_bet)
      }
      },
    closePrice(e){
      return this.dataMix.find(f => f.event_id == e)
    },
    textUpperCase(e) {
      let value = e+''
      return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
     },
    checkpricemax() {
      let min_bill = Math.min(...this.dataMix.map(item => item.max_pay_bill_sport))
      let min_max_bet = Math.min(...this.dataMix.map(item => item.max_bet))
      let value_price = parseInt(min_bill) / this.sumprice
      let price
      if (parseInt(min_max_bet) > parseInt(value_price)) {
        price = parseInt(value_price)
      } else {
        price = parseInt(min_max_bet)
      }
      return price
    },
    checkMinmatch(item) {
      if (item.is_live == 1) {
        return parseInt(item.minmatch) < 3 ? 3 : parseInt(item.minmatch)
      } else {
        return parseInt(item.minmatch)
      }
    },
    inwhodata(item) {
      if ([44, 35, 10035].includes(item.type_sport_id)) {
        return '';
      }

      if (item.in_who == '1' && item.option == 'h' && this.lang == 'th') {
        return "ต่อ"
      }
      if (item.in_who == '2' && item.option == 'a' && this.lang == 'th') {
        return "ต่อ"
      }
      if (item.in_who == '1' && item.option == 'a' && this.lang == 'th') {
        return "รอง"
      }
      if (item.in_who == '2' && item.option == 'h' && this.lang == 'th') {
        return "รอง"
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
    submarket(item) {
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
    colottext(data) {
      if (data.in_who == '1' && data.option == 'h') {
        return "text-red-600"
      }
      if (data.in_who == '2' && data.option == 'a') {
        return "text-red-600"
      }
      if (data.in_who == '1' && data.option == 'a') {
        return "text-primary"
      }
      if (data.in_who == '2' && data.option == 'h') {
        return "text-primary"
      }
      if (data.in_who == '1' && data.option == 'x') {
        return "text-white"
      }
      if (data.in_who == '2' && data.option == 'x') {
        return "text-white"
      }
    },
    stustType(type) {
      if (type == 'mix' && this.lang == 'th') {
        return 'มิกซ์พาร์เลย์  '
      }
      if (type == 'mix' && this.lang == 'en') {
        return 'mixparlay'
      }
      if (type == 'step' && this.lang == 'th')
        return 'สเต็ป'
      else if (type == 'step' && this.lang == 'en')
        return 'step'
    },
    sumPrice() {
      let strToNum = 1
      for (let i = 0; i < this.dataMix.length; i++) {
        strToNum = strToNum * parseFloat(this.dataMix[i].price);
      }
      let rounded = Math.floor(strToNum * 100) / 100;
      this.sumprice = rounded
    },
    async deleteBet(match) {
      this.errMsgshow = null
      this.removeBet(match);
      this.all_event_id = this.getmix.arrayStep.map(item => item.event_id)
        match.action = 'del'
        match.all_event_id = this.all_event_id.join(',');
        var res;
          try {
            res = await this.$axios.get(`/event/` +match.type + `/ticket`,
              {
                params: match
              }
            );

              if(res.data.status){
                this.errMsgshow = null
                res.data.data.type = match.type
              }else{
                this.$swal.fire(this.trans(`ms_error.fail`), res.data.message , "warning");
                this.errMsgshow = res.data.message
              }
          } catch (error) {
            this.$swal.fire(this.trans(`ms_error.fail`), error.response.data , "warning");
          }
    },
    closebet() {
      this.$emit('closebet')
      this.removeAll()
    },
    async betsport() {
      this.errMsgshow = null
      this.price = this.$auth.$storage.getUniversal('price')
      this.lodeing = true
      // this.fetchbetlist(false);

      if (this.dataMix.length > parseInt(this.dataMix[0].maxmatch)) {
        this.lodeing = false
        return this.$swal.fire(this.trans(`ms_error.fail`), this.trans(`ms_error.the_maximum`)+'!', "warning");
      }
      if (this.inputbet == '0' || this.inputbet == null) {
        this.lodeing = false
        return this.$swal.fire(this.trans(`ms_error.fail`), this.trans(`ms_error.please_price`)+'!', "warning");
      }
      // if(this.dataMix.length > parseInt(this.dataMix[0].maxmatch)){
      //   this.lodeing = false
      //   return  this.$swal.fire("ไม่สำเร็จ", this.dataMix[0].type + this.trans('content.minimum') + parseInt(this.dataMix[0].minmatch), "warning");
      // }
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
      var obj = {
        'lang': langs,
        'stake': inputbet.toString(),
        'action_type': this.dataMix[0].type,
        'accept_good_odd' : true,
        'sport_type': this.dataMix[0].sport_type,
        'sport_id': this.dataMix[0].type,
        'device': 'pc',
        'select_table' : this.$auth.$storage.getUniversal("lineType"),
        'ticket': {
          'odds_type': 'EU',
          'odds_total': this.sumprice,
          'item': []
        },
        'all_event_id': this.dataMix.map(item => item.event_id)
      }
      for (let i = 0; i < this.dataMix.length; i++) {
        obj.ticket.item.push({
          'event_id': this.dataMix[i].event_id,
          'odd_id': this.dataMix[i].odd_id,
          'option': this.dataMix[i].option,
          'point': this.dataMix[i].point,
          'price': this.dataMix[i].price,
          'choose': this.dataMix[i].bet_choice == " " ? this.dataMix[i].bet_choice_lang : this.dataMix[i].bet_choice,
          'market_type': this.dataMix[i].market_type,
          'in_who': this.dataMix[i].in_who,
          'h_score': this.dataMix[i].h_score,
          'a_score': this.dataMix[i].a_score,
          'is_live': this.dataMix[i].is_live
        })
      }

      try {
        let response = await this.$axios.post("/ticket/bet/confirm", obj);
        if (response.data.status) {
          this.$emit("closebet");
          this.$bvToast.toast(this.trans(`ms_error.succeed`) +'!', {
            title: this.trans(`ms_error.bet`)+this.trans(`ms_error.succeed`),
            toaster: "b-toaster-top-center",
            solid: true,
            appendToast: true,
            autoHideDelay: 500,
            variant: "success",
          });
          this.removeAll();
          this.fetchBalance();
          this.fetchGetListBet({ lang: langs });

          this.lodeing = false
        } else {
          if (response.data.type_error == 'all_price') {
            this.dataMix.forEach(element => {
              if (response.data.message[element.odd_id]) {
                element.is_change = false
                if (element.odd_id == response.data.message[element.odd_id]['odd_id']) {
                  if (response.data.message[element.odd_id]['type_error'] == 'point') {
                    element.point = response.data.message[element.odd_id]['point_new'];
                  }
                  element.price = response.data.message[element.odd_id]['price_new'];
                  element.price_before = response.data.message[element.odd_id]['price_old'];
                  element.is_has_change = true;
                  this.is_price_change = true;
                } else {
                  element.is_has_change = false;
                }
              }
            });
          }
          else if (response.data.message['type_error'] == 'point' || response.data.message['type_error'] == 'price') {
            this.dataMix.forEach(element => {
              element.is_change = false
              if (element.odd_id == response.data.message['odd_id']) {
                if (response.data.message['type_error'] == 'point') {
                  element.point = response.data.message['point_new'];
                }
                element.price = response.data.message['price_new'];
                element.price_before = response.data.message['price_old'];
                element.is_has_change = true;
                setTimeout(() => {
                  this.is_price_change = false
                }, 4000);
              } else {
                element.is_has_change = false;
              }
            });
            this.is_error = false;
          } else if (response.data.message['event_id']) {
            this.dataMix.forEach(element => {
              element.is_change = false
              element.is_has_change = false;
              if (element.event_id == response.data.message['event_id']) {
                this.errMsg = response.data.message['message']
                this.errMsgshow = response.data.message
                setTimeout(() => {
                  this.$bvModal.show('bv-modal-example')
                },0)

  
                element.is_errMsg = true;
              }
            });
            this.is_error = false;
          }
          else {
            this.$swal.fire(response.data.message, {
              icon: 'warning',
              title: this.trans(`ms_error.fail`),
            });
          }
          this.lodeing = false
        }
        setTimeout(() => {
          this.is_price_change = false
        }, 4000);
      } catch (error) {
        this.lodeing = false
        console.log("error---------", error);
        if (error.response.data.message) {
          this.$swal.fire(error.response.data.message, {
            icon: 'warning',
            title: this.trans(`ms_error.fail`),
          });
        }
        this.removeAll();
        this.$emit("closebet");
      }
      setTimeout(() => {
        this.setImage = false
      }, 500);
    },
    removeInput(){
      this.inputbet = null
      this.max_min(null)
      this.setPlaceholder(true)
    }
  },
  created() {
    // this.setPlaceholder(false)
    setTimeout(() => {
      this.setImage = false
    }, 6000);
    this.sumprice = 0
    this.price = this.$auth.$storage.getUniversal('price')
    this.sumPrice();
  },
  watch: {
    inputbet(value) {
      if (value > 0 || value != null) {
        var inputbet = null
        if(typeof value == 'string'){
          inputbet = value.replace(",","");
        }else{
          inputbet = value
        }
        if (inputbet != '' && this.sumprice > 0) {
          this.highest_pay =  parseInt(inputbet) * this.sumprice
        } if (0 > this.sumprice) {
          this.highest_pay = parseInt(inputbet) > 0 ? parseFloat(inputbet) : 0
        }
      }
      else {
        this.highest_pay = 0;
      }
    },
    langs(value){
      this.lang = value
     },
    dataMix() {
      // if (window.innerWidth > 1400) {
      //   this.$nextTick(() => {
      //     this.dataMix.length != 0 ? this.$refs.inputbet3.focus() : []
      //   })
      // }
      if (this.inputbet = null) {
        this.dataMix.forEach(element => {
          element.is_has_change = false;
          if (element.price_before != element.price) {
            element.is_change = true;
          } else {
            element.is_change = false;
          }
        });
      }
      this.sumPrice()
      if(this.dataMix.length == 0){
        this.setImage = true
          setTimeout(() => {
            this.setImage = false
          }, 6000);
      }
    }
  },
};
</script>
<style>
.input-group-text {
  font-size: 10px !important;
}
</style>

<style scoped>
.btn-sm, .btn-group-sm > .btn {
    border-radius: 0.5rem;
}
.card-header {
  text-align: center;
  background: linear-gradient(to bottom, #3d94f6 5%, #1e62d0 100%);
  color: white;
  border-radius: 0px;
  padding: 0px 0px;
}

.btn-bet {
  /* background: linear-gradient(to bottom, #89c403 5%, #77a809 100%); */
    background-color: #ffce46;
    border: 1px solid #ffce46;
    color: black !important;
    font-weight: 700;
}

.btn-close {
  /* background: linear-gradient(to bottom, #fc8d83 5%, #e4685d 100%); */
  background: white;
  border: 1px solid rgba(255, 71, 87, 1);
  color: rgba(255, 71, 87, 1);
}
.font-st{
font-size: 13px !important;
color: white;
}
.circle-icon {
  cursor: pointer;
  padding-top: 4px;
}
</style>

<style scoped>
.oddsDataStates .oddsDataStates_light {
    display: block;
    width: 8px;
    height: 8px;
    background-color: #00ffea;
    border-radius: 50%;
    box-shadow: 0 0 5px #00ffea;
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