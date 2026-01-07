<template>
  <div class="" style="text-align: right; float: right;">
    <!-- layouts > Center > Home > SelectLeagueButton -->
    <div class="flex" v-if="!notlive">
      <div class="flex mr-1">
        <b-form-select   
          v-if="path=='early'"     
          v-model="display.date"
          :options="Eventdate"
          @change="updateDisplay('date')"
          size="sm"
          style="width: 88px;"
        ></b-form-select>
      </div>
      <div class="flex mr-1">
        <b-form-select
          style="width: 57px;"
          v-model="display.fontSize"
          :options="fontSizeOptions"
          @change="updateDisplay('fontSize')"
          size="sm"
        ></b-form-select>
      </div>
      <div class="flex mr-1">
        <b-form-select
          v-model="display.sortBy"
          size="sm"
          @change="updateDisplay('sortBy')"
        >
          <b-form-select-option value="SortByNormal">{{  trans("content.sortbynormal")  }}</b-form-select-option>
          <b-form-select-option value="SortByTime">{{  trans("content.sortbytime") }}</b-form-select-option>
        </b-form-select>
      </div>
      <div class="flex mr-1">
        <b-form-select
          v-model="display.sortTime"
          size="sm"
          @change="updateDisplay('sortTime')"
        >
          <b-form-select-option value="Allmatch">{{trans("content.allmatch")}}</b-form-select-option>
          <b-form-select-option value="06:00-23:00">{{trans("content.before")}} 23:00</b-form-select-option>
          <b-form-select-option value="23:00-11:00">{{trans("content.after")}} 23:00</b-form-select-option>

          <!-- <b-form-select-option value="20:00-23:59"
            >20:00-23:59</b-form-select-option
          >
          <b-form-select-option value="00:00-10:59"
            >00:00-10:59</b-form-select-option
          > -->
        </b-form-select>
      </div>
      <div class="flex mr-1">
        <b-form-select
          v-model="display.lineType"
          size="sm"
          @change="updateDisplay('lineType')"
        >
          <b-form-select-option value="SingleLine">
            {{  trans("content.singleline") }}
          </b-form-select-option>
          <b-form-select-option value="DoubleLine">
            {{  trans("content.doubleline") }}
          </b-form-select-option>
          <b-form-select-option value="FulltimeOnly">
            {{  trans("content.fulltimeonly") }}
          </b-form-select-option>
          <b-form-select-option value="HalftimeOnly">
            {{  trans("content.halftimeonly") }}
          </b-form-select-option>
        </b-form-select>
      </div>
      <div class="flex mr-1">
        <b-form-select
          style="width: 58px;"
          v-model="display.price"
          :options="priceOptions"
          @change="updateDisplay('price')"
          size="sm"
        ></b-form-select>
      </div>
      <div class="flex mr-1">
        <div
          is="filter-select-league"
          :getlive="getlive"
          :getearly="getearly"
          :getnotlive="getnotlive"
          :oldlive="oldlive"
          :oldnotlive="oldnotlive"    
          :oldearly="oldearly"      
          :loading="loading"
          @filternonlive="$emit('filternonlive',$event)"
          @filterlive="$emit('filterlive',$event)"
          @filtersport="$emit('filtersport',$event)"
          @filterearly="$emit('filterearly',$event)"
          @SelectedItem="Filtertable($event)"
          :live="live"
        ></div>
      </div>
      <div class="flex">
        <div
          is="center-refresh-button"
          :refreshRate="timeRefresh"
          @input="updateRefresh($event)"
          :loading="loading"
        ></div>
      </div>
    </div>

    <div class="text-right" v-else>
      <div class="flex">
        <div class="flex-1 pr-4">
          <div
            is="center-refresh-button"
            :refreshRate="timeRefresh"
            @input="updateRefresh($event)"
            :loading="loading"
          ></div>
        </div>
        <div class="flex">
          <button size="sm" variant="warning" style="border: 1px solid silver !important;">
            <b-icon icon="receipt" style="vertical-align: sub"></b-icon>
            {{ trans("content.rules") }}
          </button>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import moment from "moment"
import { mapGetters, mapActions } from "vuex";

export default {
  props: [
    "path",
    "notlive",
    "getlive",
    "getnotlive",
    "getearly",
    "oldlive",
    "oldnotlive",
    "oldearly",
    "type",
    "live",
    "displaytable",
    "loading"
  ],
  data() {
    return {
      timeRefresh : 20,
      setFull_lode : 2,
      display: {
        price : 'MY',
        fontSize: "A",
        sortBy: "SortByNormal",
        sortTime: "Allmatch",
        lineType: "FulltimeOnly",
        date: moment(new Date()).subtract(11,'hours').add(1, 'day').format('DD/MM/YYYY'),
      },
      priceOptions : [
        { value: "MY", text: "MY" },
        { value: "HK", text: "HK" },
        { value: "EU", text: "EU" },
      ],
      fontSizeOptions: [
        { value: "A", text: "A" },
        { value: "-A", text: "-A" },
        { value: "+A", text: "+A" }
      ],

    };
  },
  computed: {
    ...mapGetters({
      getselectleague: "selectleaguebutton/getselectleague"
    }),
    Eventdate(){
      const list = []
      let fDate = moment(new Date()).subtract(11,'hours').add(1, 'day')
      let tDate = moment(new Date()).subtract(11,'hours').add(8, 'days')
      

       while (tDate.isAfter(fDate)) {
        list.push({
          text: fDate.format('DD/MM/YYYY'),
          value: fDate.format('DD/MM/YYYY')
        })
        fDate = fDate.add(1, 'day')
      }
      list.push({
        text: this.trans('content.allearly'),
        value: 'Allearly'
      })
      return list  

    },

  },
  methods: {
    ...mapActions({
      fetchSelectLeagueButton: "selectleaguebutton/fetchSelectLeagueButton"
    }),
    openFilter() {
      // this.$emit("filterleague", this.mockdata);
    },
    async updateDisplay(type) {
        if(type == 'price' || type == 'date'){
          // type == 'price' && sessionStorage.setItem('price', this.display.price)
          await this.fetchSelectLeagueButton(this.display);
          this.$emit('refresh',this.display)
        }else{
          //  if (type == 'fontSize') {sessionStorage.setItem('fontSize', this.display.fontSize)}
          //  if (type == 'lineType') {sessionStorage.setItem('lineType', this.display.lineType)}
          await this.fetchSelectLeagueButton(this.display);
        }
          // this.$emit('refresh',this.display)
    },
    updateRefresh(e){
      if(this.setFull_lode != 0){
        this.setFull_lode = this.setFull_lode - 1
      }
      if(this.setFull_lode == 0){
        this.setFull_lode = 2
        e = 'start'
      }
      this.$emit('refresh' ,e)
    },
    isTimeBetween() {
        const currentTime = moment();
        const start = moment().hour(23).minute(0).second(0);
        const end = moment().add(1, 'days').hour(11).minute(0).second(0);
        var data = this.getselectleague;
        if (currentTime.isBetween(start, end, undefined, '[]')) {
          this.display = {
                 sortTime: 'Allmatch',
                 price: data.price,
                  fontSize: data.fontSize,
                  sortBy: data.sortBy,
                  lineType: data.lineType,
                  date:data.date
               };
          return true;
        } else {
               this.display = {
                  sortTime: '06:00-23:00',
                  price: data.price,
                  fontSize: data.fontSize,
                  sortBy: data.sortBy,
                  lineType: data.lineType,
                  date:data.date
               };
          return false;
        }
      }
  },
  async created() {
      if(this.$auth.$storage.getUniversal('sortTime')){
        const setPrice = this.$auth.$storage.getUniversal('price')
        const setlineType = this.$auth.$storage.getUniversal('lineType')
        const setsortBy = this.$auth.$storage.getUniversal('sortBy')
        const setsortTime = this.$auth.$storage.getUniversal('sortTime')
        const setfontSize = this.$auth.$storage.getUniversal('fontSize')        
        this.display.price = setPrice
        this.display.lineType = setlineType
        this.display.sortBy = setsortBy
        this.display.sortTime = setsortTime
        this.display.fontSize = setfontSize
  
        this.fetchSelectLeagueButton(this.display);
      }
      if(this.$route.fullPath == "/muaythai/early" || this.$route.fullPath == '/cockfight/early' || this.$route.fullPath == '/bullfight/early' || this.$route.fullPath == '/basketball/early?s=side-menu' || this.$route.fullPath == '/snooker/early?s=side-menu'){
        setTimeout(() => {
          this.display.date = 'Allearly'
          this.updateDisplay('date')
        }, 0);
      }

    //   const date = new Date();
    //   date.setHours(date.getHours() - 11);

    //   console.log('select_league',date);

    //  let weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()]
    //  if(weekday == 'Sun' || weekday == 'Sat'){
    //    this.isTimeBetween()
    //  }



      //  var data = await this.getselectleague;
      //  this.display = {
      //    price: data.price,
      //    fontSize: data.fontSize,
      //    sortBy: data.sortBy,
      //    sortTime: data.sortTime,
      //    lineType: data.lineType,
      //    date:data.date
      //  };
  },
  watch:{
    loading(value){
      if(value == false){
        if(this.$route.name == 'muaythai-path'){
        if(localStorage.getItem('setTime')){
          this.timeRefresh = 5
        }else{
          this.timeRefresh = 10
        }
      }
      }
    }
  }
};
</script>

<style></style>
