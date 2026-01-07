<template>
  <div>
    <div class="px-3 py-2">
      <b-row>
        <b-col cols="12 mt-3">
          <center-match-table-live
            v-if="dataLive.length != 0"
            :displaytable="getselectleague"
            :mockdata="dataLive"
            type="muaythai"
            @refresh="getData()"
            :live="true"
            :lang="lang"
          ></center-match-table-live>
          <center-match-table-today
            v-if="dataToday.length != 0"
            :displaytable="getselectleague"
            :mockdata="dataToday"
            @refresh="getData()"
            type="muaythai"
            :live="false"
            :lang="lang"
          ></center-match-table-today>

          <div v-if="loading">
            <!-- <div class="text-center">
              <b-spinner variant="primary" label=""></b-spinner>
              <span class="block mt-2 text-primary">l o a d i n g ...</span>
            </div> -->
          </div>
          <div v-else>
            <div v-if="dataLive.length == 0 && dataToday.length == 0">
              <b-row>
                <b-col
                  ><center-title
                    type="muaythai"
                    :live="false"
                    :path="path"
                  ></center-title
                ></b-col>
                <b-col class="text-right">
                  <center-select-league-button
                    notlive="notlive"
                  ></center-select-league-button>
                </b-col>
                <b-col cols="12" class="text-secondary">
                  <!-- {{lang == "th" ? "ไม่มีกิจกรรมสำหรับตัวเลือกนี้" : "There are no events for this option."}}  -->
                  <h4 class="mt-8">{{trans('content.therearenoevents')}}</h4>
                  <!-- {{lang == "th" ? "แล้วกลับมาใหม่, กิจกรรมใกล้มาเเล้ว !" : "Then come back,Activities are coming soon!"}} -->
                  <h5 class="mt-4">{{trans('content.thencomebackActivities')}}</h5>
                </b-col>
              </b-row>
            </div>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      arrayFailed: [],
      dataToday: [],
      dataLive: [],
      loading: false,
      path: "",
      lang: this.$auth.$storage.getUniversal("language"),
    };
  },
  computed: {
    ...mapGetters({
      getselectleague: "selectleaguebutton/getselectleague",
      langs: "language/langs",
    }),
  },
  methods: {
    async getData() {
      this.loading = true;
      let route = this.$route.path.toString();
      this.path = route.substring(10, 20);
      if (this.path == "today") {
        this.dataToday = await this.$axios.get("/mpy@zoo.json");
      } else if (this.path == "live") {
        this.dataLive = [];
      } else if (this.path == "all") {
        this.dataToday = await this.$axios.get("/mpy@zoo.json");
        this.dataLive = [];
      }
      if (this.dataToday.length != 0) {
        this.dataToday.data.result =  this.dataToday.data.result.filter((f) => 
          f.boxing_cat_name_th.includes("มวยไทย") ||  f.boxing_cat_name_en.includes("Muaythai")
        );
      }
      this.loading = false;
    },
  },
  async created() {
    await this.getData();
  },
  watch:{
    langs(value) {
      this.lang = value;
    },
  }
};
</script>

<style scoped></style>
