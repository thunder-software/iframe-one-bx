<template>
  <div class="module-border-wrap" style="border: 0px solid !important;">

    <!-- <small v-if="live">
      <div>
        <div v-if="showFavoriteButton" class="inline-block">
          <div @click="toggleFavorite(match.tournament[5]['id'], match.event_id)" class="inline-block pr-2">
            <b-icon :icon="$store.state.favorite.eventId.includes(match.event_id) ? 'star-fill' : 'star'"
              :variant="$store.state.favorite.eventId.includes(match.event_id) ? 'warning' : ''" />
          </div>
        </div>
        
        <small class="text-success font-semibold" style="font-size: 12px;">{{ match.live_home_score }} : {{
          match.live_away_score }}</small>
        <div class="flex">
          <div class="flex" v-show="match.channel_live" style="cursor: pointer;" v-if="match.channel_live != undefined"
            @click="test_tvpop(match.channel_live)">
            <b-img src="/icon/tv.gif" class="inline-block pl-2 " style="width: 20px; height: 13px;margin-top: 8px;" />
          </div>
          <div class="flex-1" v-if="match.period != 5">
            <div v-if="match.period_start_time">
              <small v-if="match.period_start_time.length > 2" class="text-danger font-semibold pl-1"
                style="font-size: 12px;">
                <div v-if="!extratime(match.period)" class="inline-block">
                    {{ startTime(match.period_start_time) }}
                </div>
                <div v-else class="inline-block">
                  <small class="text-danger font-semibold" style="font-size: 12px;">LIVE</small>
                </div>
              </small>
              <div v-else class="text-danger  pl-1">
                <small v-if="pathname == 'muaythai-path'" class="text-danger font-semibold"
                  style="font-size: 12px;">LIVE</small>
                <small v-else class="font-semibold" style="font-size: 12px;">
                  <div v-if="!extratime(match.period)" class="inline-block" style="white-space: nowrap;" @click="test_tvpop(match.channel_live)">
                    <span v-if="match.period.length != 0"> {{ match.period }} ' H {{ startTime(match.period_start_time) }} </span>
                    <span v-else class="text-danger font-semibold" style="font-size: 12px;">LIVE</span>
                  </div>
                  <div v-else class="inline-block">
                    <small class="text-danger font-semibold" style="font-size: 12px;">LIVE</small>
                  </div>
                </small>
              </div>
            </div>
          </div>
          <div class="flex-1" v-if="match.period == 5">
            <small class="text-primary  font-semibold " style="font-size: 12px;">{{ period(match.period) }}</small>
          </div>
        </div>
      </div>
    </small>
    <small v-else> -->
      <div>

      <small class="bg-dark">
        <!-- class="block font-semibold" v-if="match.event_date == toDay" -->
        <span class="block font-semibold" style="font-size: 12px;">
          <span v-if="match.is_live == 1" class="text-white" style="font-size: 14px;">
            กำลังชก
          </span>

          <!-- <div v-if="showFavoriteButton" @click="toggleFavorite(match.tournament[5]['id'], match.event_id)"
              class="inline-block pr-2">
              <b-icon :icon="$store.state.favorite.eventId.includes(match.event_id) ? 'star-fill' : 'star'"
                :variant="$store.state.favorite.eventId.includes(match.event_id) ? 'warning' : ''" />
            </div>
          <span class="text-danger">LIVE</span> -->

          <!-- <div v-show="match.channel_live" class="inline-block" style="cursor: pointer;"
                v-if="match.channel_live != undefined" @click="tvpop(match.channel_live)">
                <b-img src="/icon/tv.gif" class="inline-block pr-1" style="width: 17px; height: 13px;" />
              </div> -->
            <span class="text-white inline-block font-semibold " style="font-size: 14px; white-space: nowrap;">
              {{ kickofftdate(match.real_kickoff_time) }} {{ kickofftime(match.real_kickoff_time) }}
            </span>
            <!-- <div>
              <span class="inline-block font-semibold " v-if="match.event_date > toDay"
                style="font-size: 12px;">**:**</span>
            </div> -->

        </span>
        <div class="flex">
          <div class="flex-1" style="background: black; border-bottom-right-radius: 10px; border-bottom-left-radius: 10px;">
            <!-- <div v-if="showFavoriteButton && match.event_date != toDay" @click="toggleFavorite(match.tournament[5]['id'], match.event_id)"
                class="inline-block pr-2">
                <b-icon :icon="$store.state.favorite.eventId.includes(match.event_id) ? 'star-fill' : 'star'"
                  :variant="$store.state.favorite.eventId.includes(match.event_id) ? 'warning' : ''" />
              </div>
            <div v-show="match.channel_live" class="inline-block" style="cursor: pointer;"
                v-if="match.channel_live != undefined" @click="tvpop(match.channel_live)">
                <b-img src="/icon/tv.gif" class="inline-block pr-1" style="width: 17px; height: 13px;" />
              </div>
            <span class="text-white inline-block font-semibold " style="font-size: 12px; white-space: nowrap;">
              {{ kickofftdate(match.real_kickoff_time) }} {{ kickofftime(match.real_kickoff_time) }}
            </span>
            <div>
              <span class="inline-block font-semibold " v-if="match.event_date > toDay"
                style="font-size: 12px;">**:**</span>
            </div> -->
            <b-img src="/icon/liveitem.png" style="width: 77px; margin: 6px auto;"></b-img>
          </div>
        </div>
        
      </small>
    </div>
    <!-- </small> -->
    <b-modal :id="tv_channel" hide-footer size="lg">
      <div is="tv-iframe" :channel_id="tv_channel"></div>
    </b-modal>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import moment from "moment"

export default {
  props: ["status", "live", "time", "match"],
  data() {
    return {
      isFavorite: false,
      betType: '',
      pathname: null,
      tv_channel : null,
      toDay: moment(new Date()).subtract(11, 'hours').format("YYYY-MM-DD")
    }
  },
  computed: {
    showFavoriteButton() {
      return (this.isFavorite || (this.betType != 'mixparlay' && this.betType != 'step' && this.betType != 'early'))
    },
  },
  methods: {
    ...mapActions({
      insertFavorite: "favorite/insertFavorite",
      removeFavorite: "favorite/removeFavorite",
    }),
    toggleFavorite(sport, event) {
      const isFavorite = this.$store.state.favorite.eventId.includes(event)
      if (isFavorite) {
        this.removeFavorite({ sport, event })
      } else {
        this.insertFavorite({ sport, event })
      }
    },
    kickofftime(kickoff_time) {
      if (this.status == 'early') {
        return kickoff_time.substring(11, 16);
      } if (this.status == 'nonLive' && this.match.event_date == this.toDay) {
        return kickoff_time.substring(11, 16);
      }
      //  return kickoff_time.substring(11, 16) ;
    },
    kickofftdate(kickoff_time) {

      let fDate = moment(new Date(kickoff_time)).format('DD/MM')
      if (this.status == 'early') {
        return fDate;
      }
      if (this.status == 'nonLive' && this.match.event_date > this.toDay) {
        return fDate;
      }
      return null
    },
    startTime(period_start_time) {
      if (period_start_time.length > 2) {
        return "live";
      } else {
        return period_start_time;
      }
    },
    period(data) {
      if (data == '5') {
        return "HT"
      } else {
        return data
      }

    },
    async test_tvpop(channel){
          // window.open('/tvpopiframe?ch=' + channel, '_blank', 'width=768,height=512')
          let res = await this.$axios.get('/tvpopiframe?ch='+channel);
          let urls = res.data.H5LINKROW;
          console.log('urlsurls',urls);

          setTimeout(() => {
            window.open(urls, '_blank', 'width=768,height=512')
          }, 0);
    },
    async tvpop(channel) {
      // let res = await this.$axios.get('/tvpop?ch='+channel);
      // console.log('tvpop',res.data.H5LINKROW);
      // window.open(res.data.H5LINKROW,'','width=660,height=700,scrollbars=no,resizable=no,menubar=no,location=no,copyhistory=no,top=0,left=0');
        if(localStorage.getItem('iframe') == '1'){
          let res = await this.$axios.get('/tvpopiframe?ch='+channel);
          let urls = res.data.H5LINKROW;
          setTimeout(() => {
            window.open(urls, '_blank', 'width=768,height=512')
          }, 0);
        }else{
          window.open('/tvpop?ch=' + channel, '_blank', 'width=768,height=512')
        }


    },
    extratime(e){
      if(e == '0'){
        return true
      }else{
        return false
      }
      // let check = this.match.home_en.includes("(PEN)") ||this.match.home_en.includes("(ET)") || this.match.away_en.includes("(PEN)") ||this.match.away_en.includes("(ET)")
      // return check
    },
  },
  mounted() {
    this.isFavorite = this.$route.path.split('/')[1] == 'favorite'
    this.betType = this.$route.params.path
  },
  created() {
    this.pathname = this.$route.name
  },
};

</script>

<style scoped>
  .module-border-wrap {
      border-radius: 10px;
      position: relative;
      background: linear-gradient(90deg, #d2181e, #0533ae);
      padding: 3px;
  }
</style>
