<template>
  <td >

    <small v-if="live">
      <div>
        <small class="text-success font-semibold" style="font-size: 12px;">{{ match.live_home_score }} : {{ match.live_away_score }}</small>
        <div class="flex">
          <div class="flex-1" v-if="match.period != 5">
            <small v-if="match.period_start_time.length >2" class="text-danger font-semibold pl-1" style="font-size: 12px;">
              {{startTime(match.period_start_time)}}
            </small>
            <div v-else class="text-danger pl-1" >
              <small v-if="pathname == 'muaythai-path'" class="text-danger font-semibold" style="font-size: 12px;">LIVE</small>
              <small v-else class="font-semibold" style="font-size: 12px;">{{ match.period }}' H {{startTime(match.period_start_time)}}</small>
            </div>
          </div>
          <!-- <div class="flex-1" v-else>
            <small class="text-danger font-semibold pl-1" >{{ match.period }}' H {{startTime(match.period_start_time)}}</small>
          </div> -->
          <div class="flex-1" v-if="match.period == 5">
            <small class="text-primary  font-semibold pl-2" style="font-size: 12px;" >{{ period(match.period) }}</small>
          </div>

          <div class="flex" v-show="match.channel_live" style="cursor: pointer;" v-if="match.channel_live != undefined" @click="tvpop(match.channel_live)">
            <!-- <b-img src="/icon/tv.gif" class="inline-block pl-1 pr-1" style="width: 20px; height: 13px;margin-top: 5px;" /> -->
            <b-img src="/icon/layer1.jpg" class="inline-block pr-1 pl-1 blink-image" style="margin-top: 1px;" />
          </div>
        </div>
      </div>
    </small>
    <small v-else>
      <small>
        <span class="block font-semibold text-danger" v-if="match.event_date == toDay" style="font-size: 12px;">LIVE</span>
        <div class="flex">
          <div class="flex-1">
        <span class="text-white block font-semibold " style="font-size: 12px; white-space: nowrap;">
         {{kickofftdate(match.real_kickoff_time)}} {{ kickofftime(match.real_kickoff_time) }}
        </span>
        <span class="block font-semibold " v-if="match.event_date > toDay" style="font-size: 12px;">**:**</span>

      </div>
        <div v-show="match.channel_live" style="cursor: pointer;" v-if="match.channel_live != undefined" @click="tvpop(match.channel_live)">
            <!-- <b-img src="/icon/tv.gif" class="inline-block pr-1" style="width: 17px; height: 13px; padding-bottom: 2.5px;" /> -->
            <b-img src="/icon/layer1.jpg" class="inline-block pr-1 blink-image" style="margin-top: 1px;" />
        </div>
      </div>
        <!-- {{ kickofftime(match.real_kickoff_time) }} -->
      </small>
    </small>
  </td>

</template>
<script>
import moment from "moment"

export default {
  props: ["status","live", "time" , "match"],
  data() {
    return {
      pathname : null,
      toDay : moment(new Date()).subtract(11,'hours').format("YYYY-MM-DD")
    }
  },
  methods: {
    kickofftime(kickoff_time){
        if(this.status == 'early'){
          return kickoff_time.substring(11, 16);
        }  if(this.status == 'nonLive' && this.match.event_date == this.toDay){
          return kickoff_time.substring(11, 16) ;
        }
          //  return kickoff_time.substring(11, 16) ;
    },
    kickofftdate(kickoff_time){

      let fDate = moment(new Date(kickoff_time)).format('DD/MM')
      if(this.status == 'early'){
        return fDate;
      }
      if(this.status == 'nonLive' && this.match.event_date > this.toDay){
        return fDate;
      }
      return null
    },
    startTime(period_start_time){
      if (period_start_time.length >2) {
        return "live";
      }else{
        return period_start_time;
      }
    },
    period(data){
       if (data == '5') {
        return "HT"
       }else{
        return data
       }

    },
    async tvpop(channel){
        // let res = await this.$axios.get('/tvpop?ch='+channel);
        // console.log('tvpop',res.data.H5LINKROW);
        // window.open(res.data.H5LINKROW,'','width=660,height=700,scrollbars=no,resizable=no,menubar=no,location=no,copyhistory=no,top=0,left=0');
        // if(localStorage.getItem('iframe') == '1'){
          let res = await axios.get('https://99lsm.com/tvpopiframe?ch='+channel);
          let urls = res.data.H5LINKROW;
          setTimeout(() => {
            window.open(urls, '_blank', 'width=768,height=512')
          }, 0);
        // }else{
        //   window.open('/tvpop?ch=' + channel, '_blank', 'width=768,height=512')
        // }
    }
  },
  created() {
    this.pathname = this.$route.name
  },
};

</script>
