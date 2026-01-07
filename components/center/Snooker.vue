<template>
  <div>
    <div class="px-3 py-2">
      <b-row>
        <b-col cols="3">
          <center-title type="snooker" :path="path"></center-title>
        </b-col>
        <b-col cols="9" class="text-right">
          <center-select-league-button></center-select-league-button>
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
      path: '',
    };
  },

  computed: {
    ...mapGetters({
      getselectleague: "selectleaguebutton/getselectleague",
    })
  },
  async created() {
    let route = this.$route.path.toString();
    this.path = route.substring(9, 20);
  },
  watch:{
    langs(value) {
      this.lang = value;
    },
  }
};
</script>
