<template>
  <div>
    <div class="px-3 py-2">
      <b-row class="" v-if="setDataLive != undefined || setDataNotLive != undefined">
        <b-col cols="3">
          <center-title type="football" :live="path == 'live' ? true : false" :path="path"></center-title>
        </b-col>
        <b-col cols="9" class="text-right">
          <center-select-league-button
            @refresh="checkRelode()"
            @filterleague="$emit('filterleague', $event)"
            :getlive="setDataLive"
            :getnotlive="setDataNotLive"
            type="football"
            :live="true"
            :displaytable="getselectleague"
            :lang="lang"
          ></center-select-league-button>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="12">
          <center-match-table-live
            v-if="setDataLive"
            :displaytable="getselectleague"
            :mockdata="setDataLive"
            @refresh="getData()"
            @filterleague="filterleague($event)"
            type="football"
            :live="true"
            :lang="lang"
          ></center-match-table-live>

          <center-match-table-today
            v-if="setDataNotLive"
            :displaytable="getselectleague"
            @refresh="getData()"
            @filterleague="filterleague($event)"
            :mockdata="setDataNotLive"
            type="football"
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
            <div v-if="!setDataLive && !setDataNotLive">
              <b-row>
                <b-col
                  ><center-title
                    type="football"
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
                  <h4 class="mt-8">ไม่มีกิจกรรมสำหรับตัวเลือกนี้</h4>
                  <h5 class="mt-4">แล้วกลับมาใหม่, กิจกรรมใกล้มาเเล้ว !</h5>
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
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      loading: false,
      path: "",
      lang: this.$auth.$storage.getUniversal("language"),
    };
  },

  computed: {
    ...mapGetters({
      getselectleague: "selectleaguebutton/getselectleague",
      langs: "language/langs",
      getlive: "footballlive/getlive",
      getnotlive: "footballnotlive/getnotlive"
    }),
    setDataLive() {
      if (this.getlive.data != null) {
        return [];
      }
      return this.getlive.result;
    },
    setDataNotLive() {
      if (this.getnotlive.data != null) {
        return [];
      }
      return this.getnotlive.result;
    }
  },
  methods: {
    ...mapActions({
      fetchFootballLive: "footballlive/fetchFootballLive",
      fetchFootballNotLive: "footballnotlive/fetchFootballNotLive",
      updateFootballLive: "footballlive/updateFootballLive",
      updateFootballNotLive: "footballnotlive/updateFootballNotLive"
    }),
    async filterleague(event, type) {
      setTimeout(() => {
        this.$bvModal.show("modal-Leagues");
      }, 500);
    },
    async getData() {
      this.loading = true;
      let route = this.$route.path.toString();
      this.path = route.substring(10, 20);
      if (this.path == "today") {
        await this.fetchFootballNotLive();
      } else if (this.path == "live") {
        await this.fetchFootballLive();
      } else if (this.path == "all") {
        await this.fetchFootballLive();
        await this.fetchFootballNotLive();
      }
      this.oldlive = JSON.parse(JSON.stringify(this.getlive));
      this.oldnotlive = JSON.parse(JSON.stringify(this.getnotlive));
      this.loading = false;
    }
  },
  async created() {
    this.updateFootballLive();
    this.updateFootballNotLive();
    await this.getData();
  },
  watch: {
    langs(value) {
      this.lang = value;
    }
  }
};
</script>
