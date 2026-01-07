<template>
  <div>
    <!-- <b-form-select-option value="snooker">{{ trans("header.snooker") }}</b-form-select-option>
                <b-form-select-option value="muaythai">{{ trans("header.muaythai") }}</b-form-select-option> -->
    <h5 class="inline-block pr-1 mb-0">{{ trans("header.results") }}</h5>
    <div class="fillter-sy">
      <b-row class="pl-5">
        <b-col cols="2" class="p-2">
          <div class="flex-1">
            <small>{{ trans("results.type") }}</small>
            <b-form-select v-model="selected_type" size="sm">
              <b-form-select-option value="football">{{
                trans("header.football")
              }}</b-form-select-option>
              <b-form-select-option value="basketball">{{
                trans("header.basketball")
              }}</b-form-select-option>
               <b-form-select-option value="muaythai">{{
                trans("header.muaythai")
              }}</b-form-select-option>
                <b-form-select-option value="cockfight">{{
                trans("header.cockfight")
              }}</b-form-select-option>
               <b-form-select-option value="bullfight">{{
                trans("header.bullfight")
              }}</b-form-select-option>
            </b-form-select>
          </div>
        </b-col>
        <b-col cols="3" class="p-2 pl-5">
          <div class="flex-1">
            <small>{{ trans("results.daterange") }}</small>
            <b-form-select v-model="selected_date" size="sm">
              <b-form-select-option value="Today">{{
                trans("sidebar.today")
              }}</b-form-select-option>
              <b-form-select-option value="Yesterday">{{
                trans("sidebar.yesterday")
              }}</b-form-select-option>
              <b-form-select-option
                value="SelectDate"
                @click="FilterResult('SelectDate')"
                >{{ trans("results.selectdate") }}</b-form-select-option
              >
            </b-form-select>
          </div>
        </b-col>
        <b-col
          cols="2"
          class="p-2 pl-1 mt-6"
          v-if="selected_date == 'SelectDate'"
        >
          <b-form-datepicker
            size="sm"
            v-model="selectTime"
            :date-format-options="{
              year: 'numeric',
              month: 'numeric',
              day: 'numeric'
            }"
          ></b-form-datepicker>
        </b-col>
        <b-col cols="2" class="p-2 pl-2">
          <div class="flex-1">
            <!-- <div
              size="sm"
              variant="link"
              class="m-0 p-0"
              v-b-modal.modal-Leagues
              style="width: 100px"
            >
              <div>
                <span class="style-options text-left">{{ trans("results.selectleagues") }}</span>
              </div>
              <span class="style-options text-left"
                >( {{leaguesSelected.length}} / {{dataresults.length}} )<b-icon icon="caret-down-fill"></b-icon
              ></span>
            </div> -->






            <menubar-results-filter-select-league
              :getlive="dataresults"
              :getnotlive="[]"
              :loading="loading"
              :sporttype="sporttype"
              @filternonlive="$emit('filternonlive', $event)"
              @filterlive="$emit('FilterResult', $event)"
              @SelectedItem="Filtertable($event)"
            ></menubar-results-filter-select-league>






            <!-- <b-modal
              id="modal-Leagues"
              size="lg"
              hide-footer
              no-close-on-backdrop
            >
              <div class="modal-header">
                <h5 class="modal-title pt-2 pl-4">{{ trans("results.selectleagues") }}</h5>
              </div>
              <div class="modal-body">
                  <menubar-results-filter-select-league :lang="lang" :dataresults="dataresults" @SelectedItem="SelectedItem($event)"></menubar-results-filter-select-league>
              </div>
            </b-modal> -->
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
import moment from "moment";
export default {
  props: ["dataresults", "lang", "loading","sporttype"],
  // props : {
  //     dataresults : {
  //       type: [Object,Array],
  //       default: { data: { result: {} } },
  //     } ,
  //     lang : {
  //       type: String,
  //       default: '',
  //     },
  //     loading : {
  //       type: Boolean,
  //       default: false,
  //     },
  // },
  data() {
    return {
      selected_type: "football",
      selected_date: "Today",

      display: {
        typesport: this.lang == "th" ? "กีฬาทั้งหมด" : "AllSport",
        dateRenge: this.lang == "th" ? "วันนี้" : "Today"
      },
      datepicker: false,
      selectTime: moment(new Date()).format("YYYY-MM-DD"),

      optionsdate: [
        { value: "Today", text: "วันนี้", text_en: "Today" },
        { value: "Yesterday", text: "เมื่อวาน", text_en: "Yesterday" },
        { value: "SelectDate", text: "เลือกวันที่", text_en: "SelectDate" }
      ],
      leaguesSelected: []
    };
  },
  methods: {
    FilterResult(item, type) {
      if (type == "SelectDate") {
        this.display.typesport = this.lang == "th" ? item.text : item.text_en;
      } else {
        this.display.dateRenge = this.lang == "th" ? item.text : item.text_en;
      }
      this.searchApply();
    },
    SelectedItem(val) {
      this.leaguesSelected = val;
      this.searchApply();
    },
    searchApply() {
      var searchData = {
        type: this.display.typesport,
        dateRage: this.display.dateRenge,
        leagues: this.leaguesSelected
      };
      this.$emit("FilterResult", searchData);
    }
  },
  async created() {
    this.leaguesSelected = this.dataresults;
  //  this.leaguesSelected = !this.dataresults ? [] : this.dataresults;
  },
  watch: {
    selected_type(type) {
      // this.dataresults = [];
      this.$emit("filterType", type);
    },
    selected_date(value) {
      if (value == "Today") {
        var date = moment(new Date()).format("YYYY-MM-DD");
        this.$emit("FilterDate", date);
      } else if (value == "Yesterday") {
        var date = new Date();
        date.setDate(date.getDate() - 1);
        this.$emit("FilterDate", moment(new Date(date)).format("YYYY-MM-DD"));
      }

      // date.setDate(date.getDate() - 1);

      // date ;
    },
    selectTime(value) {
      this.$emit("FilterDate", value);
    },
    loading: {
      handler() {
        console.log("loading--------------", this.loading);
        // console.log('this.displaytable',this.displaytable);
      },
      deep: true
    }
  }
};
</script>
<style scoped>
.fillter-sy {
  margin: 20px 14px 0px 14px;
  background: rgb(203, 225, 255);
  color: rgb(31, 37, 50);
  border-radius: 6px;
  flex-direction: row;
}
.modal-body {
  position: relative;
  flex: 1 1 auto;
  padding: 1rem;
  background: #ffffff;
}
.modal-header {
  background: white;
  border-bottom: none;
}
.modal-content {
  background: white;
}
</style>
