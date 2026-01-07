<template>
  <div>

    <small v-if="live">
      <div>
        <div v-if="showFavoriteButton" class="inline-block">
          <div class="inline-block pr-2" @click="toggleFavorite(match.sport_type.id, match.event_id)">
            <b-icon :icon="$store.state.favorite.eventId.includes(match.event_id) ? 'star-fill' : 'star'"
              :variant="$store.state.favorite.eventId.includes(match.event_id) ? 'warning' : 'white'" />
          </div>
        </div>
        
        <small class="text-success font-semibold text-white" style="font-size: 12px;">{{ match.live_home_score }} : {{
          match.live_away_score }}</small>
        <div class="flex">
          <div class="flex" v-show="match.channel_live" style="cursor: pointer; height: 13px;" v-if="match.channel_live != undefined"
            @click="test_tvpop(match.channel_live)">
            <b-img src="/icon/layer1.jpg" class="inline-block pl-1 blink-image" style="margin-top: -4px;" />
          </div>
          <div class="flex-1" v-if="match.period != 5" style="height: 16px;">
            <div v-if="match.period_start_time" class="text-white">
              <small v-if="match.period_start_time.length > 2" class="text-danger font-semibold pl-1"
                style="font-size: 12px;">
                <div v-if="!extratime(match.period)" class="inline-block text-white" style="white-space: nowrap;">
                    {{ startTime(match.period_start_time) }}
                </div>
                <div v-else class="inline-block">
                  <small class="text-danger font-semibold" style="font-size: 12px;">LIVE</small>
                </div>
              </small>
              <div v-else class="text-danger  pl-1">
                <small v-if="pathname == 'muaythai-path'" class="text-danger font-semibold"
                  style="font-size: 12px;">LIVE</small>
                <small v-else class="font-semibold" style="font-size: 12px; display: block; margin-top: -4px;">
                  <div v-if="!extratime(match.period)" class="inline-block" style="white-space: nowrap;" @click="test_tvpop(match.channel_live)">
                    <span v-if="match.period.length != 0" class="text-white"> {{ match.period }} ' H {{ startTime(match.period_start_time) }} </span>
                    <span v-else class="text-danger font-semibold" style="font-size: 12px;">LIVE</span>
                  </div>
                  <div v-else class="inline-block">
                    <small class="text-danger font-semibold" style="font-size: 12px;">LIVE</small>
                  </div>
                </small>
              </div>
            </div>
          </div>
          <div class="flex-1" v-if="match.period == 5" style="height: 16px;">
            <small class="text-primary  font-semibold " style="font-size: 12px; display: block; margin-top: -5px;">{{ period(match.period) }}</small>
          </div>
        </div>
      </div>
    </small>
    <small v-else>
      <small>
        <span class="block font-semibold" v-if="match.event_date == toDay" style="font-size: 12px;">
          <div v-if="showFavoriteButton"  @click="toggleFavorite(match.sport_type.id, match.event_id)"
              class="inline-block pr-2">
              <b-icon :icon="$store.state.favorite.eventId.includes(match.event_id) ? 'star-fill' : 'star'"
                :variant="$store.state.favorite.eventId.includes(match.event_id) ? 'warning' : ''" />
            </div>
          <span class="text-danger">LIVE</span>
        </span>
        <div class="flex">
          <div class="flex-1">
            <div v-if="showFavoriteButton && match.event_date != toDay" @click="toggleFavorite(match.sport_type.id, match.event_id)"
                class="inline-block pr-2">
                <b-icon :icon="$store.state.favorite.eventId.includes(match.event_id) ? 'star-fill' : 'star'"
                  :variant="$store.state.favorite.eventId.includes(match.event_id) ? 'warning' : ''" />
              </div>
            <div v-show="match.channel_live" class="inline-block" style="cursor: pointer;"
                v-if="match.channel_live != undefined" @click="tvpop(match.channel_live)">
                <b-img src="/icon/layer1.jpg" class="inline-block pr-1 blink-image" />
              </div>
            <span class="text-white inline-block font-semibold " style="font-size: 12px; white-space: nowrap;">
              {{ kickofftdate(match.real_kickoff_time) }} {{ kickofftime(match.real_kickoff_time) }}
            </span>
            <div>
              <span class="inline-block font-semibold text-white" v-if="match.event_date > toDay"
                style="font-size: 12px;">**:**</span>
            </div>
          </div>
        </div>
      </small>
    </small>
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
      actionsTV : "tvpop/actionsTV"
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
      if(period_start_time.length != 0){
        if (period_start_time.length > 2) {
          return "live";
        } else {
          return period_start_time;
        }
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
          // console.log('urlsurls',urls);

          // this.actionsTV(urls);

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
          // this.actionsTV(urls);
          setTimeout(() => {
            window.open(urls, '_blank', 'width=768,height=512')
          }, 0);
        }else{
          window.open('/tvpop?ch=' + channel, '_blank', 'width=768,height=512')
          // let res = await this.$axios.get('/tvpopiframe?ch='+channel);
          // var urls = res.data.H5LINKROW;
          // this.actionsTV(urls);
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
