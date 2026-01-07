<template>
  <div>
    <!-- <h5 class="inline-block pr-1 mb-0">{{ trans("header.results") }}</h5> -->
    <div class="fillter-sy">
      <b-row class="mx-3" style="height: 48px;">
        <b-col cols="1" sm="1" class="px-1" style="line-height: 3rem;">
          <button class="btn w-full btn-sm mb-1" :class="checkAtivct == 'Today' ? 'btn btn-warning' : 'btn btn-outline-light'" style="border: 1px solid #c0c0c0c7; border-radius: 4px;" @click="FilterDate('Today')">{{ trans("sidebar.today") }}</button>
        </b-col>
        <b-col cols="1" sm="1" class="px-1" style="line-height: 3rem;">
          <button class="btn w-full btn-sm mb-1" :class="checkAtivct == 'Yesterday' ? 'btn btn-warning' : 'btn btn-outline-light'" style="border: 1px solid #c0c0c0c7; border-radius: 4px;" @click="FilterDate('Yesterday')">{{trans("sidebar.yesterday")}}</button>
        </b-col>
        <b-col cols="3" sm="3" class="px-1 pt-2" style="line-height: 3rem;">
          <b-form-datepicker  v-model="selectTime"   :date-format-options="{  year: 'numeric', month: 'numeric',  day: 'numeric'  }" size="sm"></b-form-datepicker>
        </b-col>
      </b-row>
      <b-row class="mx-3">
        <b-col cols="3" sm="3" class="px-1">
          <div class="flex-1">
            <span class="text-white">{{ trans("results.type") }}</span>
            <b-form-select v-model="selected_type" size="sm">
              <b-form-select-option value="0">{{ trans("header.all") }}</b-form-select-option>
              <b-form-select-option value="1">{{ trans("header.football") }}</b-form-select-option>
              <b-form-select-option value="2">{{ trans("header.basketball") }}</b-form-select-option>
              <b-form-select-option value="44">{{ trans("header.muaythai") }}</b-form-select-option>
              <b-form-select-option value="35">{{ trans("header.cockfight") }}</b-form-select-option>
              <b-form-select-option value="10035">{{ trans("header.bullfight") }}</b-form-select-option>
              <b-form-select-option value="6">{{ trans("header.snooker") }}</b-form-select-option>
              <b-form-select-option value="37">{{ trans("header.takraw") }}</b-form-select-option>
            </b-form-select>
          </div>
        </b-col>
        <b-col cols="2" sm="2" class="px-1">
          <span class="text-white">{{ trans("content.selectleague") }}</span>
          <menubar-results2-filter-select-league
              :sporttype="selected_type"
              :lang="lang"
              :getlive="dataresults"
              :getnotlive="[]"
              :loading="loading"
              @filternonlive="$emit('filternonlive', $event)"
              @selectedValue="SelectedItem($event)"
              @filterlive="$emit('FilterResult', $event)"
              @SelectedItem="SelectedItem($event)"
            ></menubar-results2-filter-select-league>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: ["dataresults", "lang", "loading"],
  data() {
    return {
      selected_type: "0",
      selected_date: "Today",
      selected_dateY:"Yesterday",
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
      leaguesSelected: [],
      checkAtivct : 'Today'
    };
  },
  methods: {
    FilterDate(item) {
      this.selected_type = '0'
      this.checkAtivct = item
        if (item == "Today") {
        var date = moment(new Date()).subtract(11,'hours').format("YYYY-MM-DD");
        this.$emit("FilterDate", date);
      }
      if (item == "Yesterday") {
        var date = new Date();
          date.setDate(date.getDate() - 1);
          this.selectTime = moment(new Date(date)).subtract(11,'hours').format("YYYY-MM-DD")
          this.$emit("FilterDate", moment(new Date(date)).subtract(11,'hours').format("YYYY-MM-DD"));
      }
      //  if (type == "SelectDate") {
      //    this.display.typesport = this.lang == "th" ? item : item;
      //  } else {
      //    this.display.dateRenge = this.lang == "th" ? item : item;
      //  }
      this.searchApply();
    },
    SelectedItem(val) {
      var check = val == null ? [] : [`${val}`]
      this.leaguesSelected = check;
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
    // this.leaguesSelected = this.dataresults;
  },
  watch: {
    selected_type(type) {
      this.$emit("filterType", type);
    },
    selected_date(value) {
      console.log("selected_date",value);
      if (value == "Today") {
        var date = moment(new Date()).subtract(11,'hours').format("YYYY-MM-DD");
        this.$emit("FilterDate", date);
      }
        else if (value == "Yesterday") {
          var date = new Date();
          date.setDate(date.getDate() - 1);
          this.$emit("FilterDate", moment(new Date(date)).subtract(11,'hours').format("YYYY-MM-DD"));
        }
    },
      // selected_dateY(value){
      //   console.log("selected_dateY",value);
      //   if (value == "Yesterday") {
      //     var date = new Date();
      //     date.setDate(date.getDate() - 1);
      //     this.$emit("FilterDate", moment(new Date(date)).subtract(11,'hours').format("YYYY-MM-DD"));
      //   }

      // },
    selectTime(value) {
      this.checkAtivct = null
      this.$emit("FilterDate", value);
    }
  }
};
</script>
<style scoped>
.fillter-sy {
  margin: 20px 0px;
  /* background: rgb(203, 225, 255); */
  color: #003B6D;
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
