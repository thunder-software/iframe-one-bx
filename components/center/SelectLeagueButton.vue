<template>
  <div>
    <!-- layouts > Center > Home > SelectLeagueButton -->
    <div class="flex" v-if="!notlive">
      <div class="flex-1 mr-2">
        <b-form-select
          v-model="display.fontSize"
          :options="fontSizeOptions"
          @change="updateDisplay"
          size="sm"
        ></b-form-select>
      </div>
      <div class="flex-1 mr-2">
        <b-form-select
          v-model="display.sortBy"
          @change="updateDisplay"
          :options="sortByOptions"
          size="sm"
        ></b-form-select>
      </div>
      <div class="flex-1 mr-2">
        <b-form-select
          v-model="display.sortTime"
          @change="updateDisplay"
          :options="sortTimeOptions"
          size="sm"
        > </b-form-select>
      </div>
      <div class="flex-1 mr-2"  >
        <b-form-select
          v-model="display.lineType"
          @change="updateDisplay()"
          size="sm"
          :options="lineTypeOptions"
        ></b-form-select>
      </div>
      <div class="flex mr-2">
        <!-- <b-button size="sm" variant="outline-primary">
          <b-icon icon="arrow-counterclockwise" style="color: blue"></b-icon>
          <span>[20]</span>
        </b-button> -->

        <center-refresh-button
          :refreshRate="30"
          @input="updateDisplay()"
          :loading="loading"
        ></center-refresh-button>
      </div>
      <div class="flex">


      <filter-select-league
        :getlive="getlive"
        :getnotlive="getnotlive"
        @SelectedItem="Filtertable($event)"
        :live="live"
        :lang="lang"
        v-if="type == 'football'"
      ></filter-select-league>

      <filter-select-league-mpy
        :getlive="getlive"
        :getnotlive="getnotlive"
        @SelectedItem="Filtertable($event)"
        :live="live"
        :lang="lang"
        v-if="type == 'cockfight'"
      ></filter-select-league-mpy>

      </div>
    </div>
    <div class="text-right" v-else>
      <div class="flex">
        <div class="flex-1 pr-4">
          <!-- <b-button size="sm" variant="outline-primary">
            <b-icon icon="arrow-counterclockwise" style="color: blue;"></b-icon>
            <span>[20]</span>
          </b-button> -->

          <center-refresh-button
            :refreshRate="30"
            @input="updateDisplay()"
            :loading="loading"
          ></center-refresh-button>
        </div>
        <div class="flex">
          <button size="sm" variant="warning" style="border: 1px solid silver !important;">
            <b-icon icon="receipt" style="vertical-align: sub"></b-icon>
            {{ trans("content.rules") }}</button
          >
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["notlive","getlive","getnotlive","type","live","displaytable","lang"],
  data() {
    return {
      
      loading: false,
      display: {
        fontSize: "A",
        sortBy: this.lang == "th" ? "เรียงตามปกติ":"SortByNormal" ,
        sortTime: this.lang == "th"? "ทุกคู่แข่งขัน" : "Allmatch",
        lineType: this.lang == "th" ? "แถวเดียว" : "SingleLine",
      },
      fontSizeOptions: [
        { value: "A", text: "A" },
        { value: "-A", text: "-A" },
        { value: "+A", text: "+A" },
      ],
      sortByOptions: [
        { value: "SortByNormal", text:this.lang == "th" ? "เรียงตามปกติ" : "SortByNormal"},
        { value: "SortByTime", text:this.lang == "th" ?  "เรียงตามเวลา" : "SortByTime"},
      ],
      sortTimeOptions: [
        { value: "Allmatch", text: this.lang=="th"? "ทุกคู่แข่งขัน":"Allmatch" },
        { value: "11:00-19:59", text: "11:00-19:59" },
        { value: "20:00-23:59", text: "20:00-23:59" },
        { value: "00:00-10:59", text: "00:00-10:59" },
      ],
      lineTypeOptions: [
        { value: "SingleLine", text: this.lang == "th" ?"แถวเดียว" :"SingleLine"},
        { value: "DoubleLine", text: this.lang == "th" ? "แบบคู่" : "DoubleLine"},
        { value: "FulltimeOnly", text: this.lang == "th" ? "เต็มเวลา":"FulltimeOnly" },
        { value: "HalftimeOnly", text:this.lang == "th"? "ครึ่งแรก" : "HalftimeOnly"},
      ],
    };
  },

  computed: {
    ...mapGetters({
      getselectleague: "selectleaguebutton/getselectleague",
      
    }),
  },
  methods: {
    ...mapActions({
      fetchSelectLeagueButton: "selectleaguebutton/fetchSelectLeagueButton",
    }),
    openFilter(){
      this.$emit('filterleague' , this.mockdata)
    },
    async updateDisplay() {
       await this.fetchSelectLeagueButton(this.display);
      // this.$emit('refresh')
    },
  },
  async created() {
    var data = await this.getselectleague;
    this.display = {
      fontSize: data.fontSize,
      sortBy: data.sortBy,
      sortTime: data.sortTime,
      lineType: data.lineType,
    };
  },
  watch:{
    lang(value){
      this.lang == value
      this.fontSizeOptions = [
        { value: "A", text: "A" },
        { value: "-A", text: "-A" },
        { value: "+A", text: "+A" },
      ]
      this.sortByOptions = [
        { value: "SortByNormal", text:this.lang == "th" ? "เรียงตามปกติ" : "SortByNormal"},
        { value: "SortByTime", text:this.lang == "th" ?  "เรียงตามเวลา" : "SortByTime"},
      ]
      this.sortTimeOptions = [
        { value: "Allmatch", text: this.lang=="th"? "ทุกคู่แข่งขัน":"Allmatch" },
        { value: "11:00-19:59", text: "11:00-19:59" },
        { value: "20:00-23:59", text: "20:00-23:59" },
        { value: "00:00-10:59", text: "00:00-10:59" },
      ]
      this.lineTypeOptions = [
        { value: "SingleLine", text: this.lang == "th" ?"แถวเดียว" :"SingleLine"},
        { value: "DoubleLine", text: this.lang == "th" ? "แบบคู่" : "DoubleLine"},
        { value: "FulltimeOnly", text: this.lang == "th" ? "เต็มเวลา":"FulltimeOnly" },
        { value: "HalftimeOnly", text:this.lang == "th"? "ครึ่งแรก" : "HalftimeOnly"},
      ]
    }
  }
};
</script>

<style></style>
