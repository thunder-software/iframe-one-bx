<template>
  <div>
  <div class="card-border-style right-bet-all" style="position: fixed;
    width: 220px;
    height: 88vh;" :style="iframe == '2' ? 'top : 0px' : 'top: 50px;'">
    <div class="text-center"><b-img src="/icon/online-poker.png" class="inline-block mr-2 mb-2" style="width: 25px;"></b-img><span class="text-white font-bold" style="font-size: 14px; vertical-align: top;">
      <!-- {{trans('header.lastbet')}} -->
      {{ lang == 'th' ? "รายการเดิมพันโดยรวม" : "Recent bets" }}
    </span>
      <b-icon icon="caret-left-square-fill" title="ปิดการเดิมพันโดยรวม" class="close-ball" @click="closeAllbet()"></b-icon>
    </div>
    <div>
      <perfect-scrollbar>
        <div style="height: 79vh;">
        <div v-for="(item,i) in array_bet" :key="i" class="flex">
          <div class="flex"><small style="color : #f5f5f5cc">{{ item.username }}</small></div>
          <div class="flex ml-2">
            <div is="sidebar-right-last-bet-text" :choice="item"></div>

            <!-- <div :style="item.in_who == '1' ? 'color : #F1DE4D;' : 'color : #F25A5A;'" >
              <div style="font-size: 14px;" v-if="item.bet_choice == 'Over' || item.bet_choice == 'Under'" class="text-over">
                {{ lang == 'th' ? item.away_th : item.away_en }}
              </div>
              <div v-else style="font-size: 14px;" class="text-over">
                {{ item.bet_choice }}
              </div>
            </div> -->


            <!-- <small :style="item.in_who == '1' ? 'color : #F1DE4D;' : 'color : #F25A5A;'">...</small> -->
          </div>
          <div class="flex-1 text-right">
            <small class="text-bet px-1">
            <div is="my-format-price"
                  :value="item.amount"
                  :decimal="0"
                  class="text-white"
                ></div>
            <small class="text-white">{{ item.currency }}</small>
            </small>
          </div>
        </div>
        </div>
      </perfect-scrollbar>
    </div>
  </div>
</div>
</template>
<script>
import Axios from "axios";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      banner: { data: {} },
      lang: this.$auth.$storage.getUniversal("language"),
      url_add: process.env.API_URL.replace("/api", ""),
      loading: false,
      array_bet : [],
      iframe : false,
    };
  },
  computed: {
    ...mapGetters({
      balance: "balance/balance",
    }),
    imgbanner() {
      return this.banner.data;
    },
  },
  methods: {
    ...mapActions({
      fetchBalance: "balance/fetchBalance",
      actionsclosebetlist: "closebetlist/actionsclosebetlist",
    }),
    async getUserCredit() {
      this.loading = true;
      await this.fetchBalance();
      this.loading = false;
    },
    closeAllbet(){
      this.actionsclosebetlist(true)
      localStorage.setItem('closeBetAll' , 1)
      this.$emit('closeBetAll')
    },

  },
  mounted() {
    this.$connectToPusher();

    const channel =  window.Pusher.subscribe('ticket-channel')
    channel.bind('ticket-change', data => {
       this.array_bet.unshift(data)
       setTimeout(() => {
       var array =  this.array_bet.slice(0, 100)
       this.array_bet = array
       }, 0);
    })
  },
  beforeDestroy() {
      window.Pusher.disconnect();
  },
  async created() {
    if(localStorage.getItem('iframe-one')){
      this.iframe = localStorage.getItem('iframe-one')
    }
    this.getUserCredit();
    this.banner = await Axios.get("/api-new/banner.json");
  },
  watch: {
    langs(value) {
      this.lang = value;
    },
  },
};
</script>
<style scoped>
.close-ball {
  position: absolute;
  top: -18px;
  width: 20px;
  height: 100px;
  right: -14px;
  cursor: pointer;
  color: whitesmoke;
}
.right-bet-all {
  top: 50px;
}
.text-bet {
  background: #ffffff14;
  border-radius: 20px;
  border: 0.5px solid #F2EFFA4D;
  text-align: center;
  font-weight: 700;
  font-size: 11px;
}
.text-over {
  /* white-space: nowrap;
  width: 62px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block; */

  white-space: nowrap; 
  width: 72px; 
  overflow: hidden;
  text-overflow: ellipsis; 
}
.credit-style {
  /* background: url(/banner/bg.png); */
  border-radius: 8px;
  background-size: cover;
  padding: 10px;
  background: #141414;
}
.blink-text {
  color: #000;
  font-weight: bold;
  font-size: 1.1rem;
  animation: blinkingText 1s infinite;
  background: #00000036;
  border-radius: 8px;
  padding: 2px 12px;
}
@keyframes blinkingText {
  0% {
    color: #ef0a1a;
  }
  100% {
    color: #face31;
  }
}

.zoom-in-zoom-out {
  animation: zoom-in-zoom-out 0.5s ease-out infinite;
  transform: rotate(357deg);
  position: absolute;
  margin-top: -97px;
  margin-left: 8px;
  width: 34px;
}

@keyframes zoom-in-zoom-out {
  0% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1.1, 1.1);
  }
  100% {
    transform: scale(1, 1);
  }
}

@media screen and (max-width: 1400px) {
  .zoom-in-zoom-out {
    margin-top: -116px;
  }
}
</style>
