<template>
  <div>
    <div class="px-3 py-2">
      <b-row>
        <!-- <b-col cols="3">
          <center-title type="football"></center-title>
        </b-col>
        <b-col cols="9" class="text-right">
          <center-select-league-button></center-select-league-button>
        </b-col> -->
        <b-col cols="12 mt-3">
          <center-match-table-live
            v-if="dataLive.length != 0"
            :displaytable="getselectleague"
            :mockdata="dataLive"
            type="basketball"
            :live="true"
          ></center-match-table-live>

          <center-match-table-today
            v-if="dataToday.length != 0"
            :displaytable="getselectleague"
            :mockdata="dataToday"
            type="basketball"
            :live="false"
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
                  ><center-title type="basketball" :live="false" :path="path"></center-title
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
      live: false,
      loading: false,
      path :'',
      lang: this.$auth.$storage.getUniversal("language"),
    };
  },

  computed: {
    ...mapGetters({
      getselectleague: "selectleaguebutton/getselectleague",
      langs: "language/langs",
    })
  },
  async created() {
    this.loading = true;
    let route = this.$route.path.toString();
    this.path = route.substring(12, 99);
    if (this.path == "today") {
      this.dataToday = await this.$axios.get("/basketball.json");
      this.live = false;
    } else if (this.path == "live") {
      this.dataLive = await this.$axios.get("/basklive.json");
      this.live = true;
    } else if (this.path == "all") {
      this.dataToday = await this.$axios.get("/basketball.json");
      this.dataLive = await this.$axios.get("/basklive.json");
    }
    this.loading = false;
  },
  watch:{
    langs(value) {
      this.lang = value;
    },
  }
};
</script>
