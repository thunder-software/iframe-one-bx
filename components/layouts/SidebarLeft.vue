<template>
  <div class="card-border-style">
    <!-- layouts > SidebarLeft -->
    <div :class="!loading ? '' : ''" class="box">




      <!-- <div
        class="" :style="iframe =='1' ? 'margin-top:1px':'margin-top:3px'"
        is="sidebar-left-favorite"
      ></div> -->
    </div>

    <!-- <div is="sidebar-left-betinfo-menu" @selectmenu="selectmenu($event)" /> -->
    <div is="sidebar-left-credit-information" v-if="menu" />
    <div v-if="banner1">
      <b-img src="/banner/sportLSM.gif" style="border-radius: 6px;"></b-img>
    </div>

    <div is="sidebar-left-sport-menu-item"
      class="mb-2 mt-2"
      :hidemenu="hidemenu"
      :pathEvent="pathEvent"
    />

    <div
        is="sidebar-left-betinfo-bet-type"
        @selecttabs="selecttabs($event)"
        :dataBet="dataBetList"
        :dataMix="getbet.type_bet == 'mixparlay' ? getmix.arrayParlay : getmix.arrayStep"
        :bettype="bettype"
      ></div>
      <div
        is="sidebar-left-sport-bet-single"
        @closebet="closebet()"
        :dataBet="dataBetList.dataBetSingle"
        :lang="lang"
        @getBet="getBetEvent"
        :hidemenu="hidemenu"
        :errMsg="errMsg"
        v-if="!bettype"
      ></div>

      <div
        is="sidebar-left-sport-bet-parlay"
        @closebet="closebet()"
        :dataMix="getbet.type_bet == 'mixparlay' ? getmix.arrayParlay : getmix.arrayStep"
        @getBet="getBetEvent"
        :lang="lang"
        :errMsg="errMsg"
        v-else
      />

    <div is="sidebar-left-bet-list"  :lang="lang" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["pathEvent"],
  data() {
    return {
      menu: false,
      bettype: false,
      loading: true,
      hidemenu: true,
      lang: this.$auth.$storage.getUniversal("language"),
      banner1: false,
      tabIndex: 0,
      all_event_id : [],
      dataBetChoice: [],
      dataBetList: {
        dataBetSingle: [],
        dataBetParlay: []
      },
      errMsg:null,
      iframe : null,
    };
  },

  computed: {
    ...mapGetters({
      getbet: "tabbet/getbet",
      getmix: "tabmix/getmix",
      langs: "language/langs",
      balance: "balance/balance",
    })
  },
  methods: {
    ...mapActions({
      fetchActionsTab: "tabbet/fetchActionsTab",
      pushBetList: "tabmix/pushBetList",
      fetchGetListBet: "listbet/fetchGetListBet",
      mockDataBet : "tabbet/mockDataBet",
      actionsQuickbet : "quickbet/actionsQuickbet",
      fetchBalance: "balance/fetchBalance",
      actionsTabsport: 'clicksport/actionsTabsport'
    }),
    selectmenu() {
      this.menu = !this.menu
      if(this.menu == false){
        this.actionsTabsport(this.menu)
      }
    },
    async getBetEvent(){
      await this.fetchGetListBet({lang:this.lang});

    },
    async getUserCredit() {
      this.loading = true;
      await this.fetchBalance();
      this.loading = false;
    },
    async sendBet() {
      if (
        this.getbet.dataBetSingle != false ||
        this.getbet.type_bet == "mixparlay" ||
        this.getbet.type_bet == "step"
      ) {
        var type;
        if (this.getbet.type_bet == "mixparlay") {
          type = "mix";
          this.actionsQuickbet(false)
        } else if (this.getbet.type_bet == "step") {
          type = "step";
          this.actionsQuickbet(false)
        } else {
          type = "sc";

        }
        var obj = type == "sc" ? this.getbet.dataBetSingle : this.getbet.dataBetParlay;

        if(this.$route.name == 'football-path'){
          obj.sport_type_id = '1'
        }else if(this.$route.name == 'muaythai-path'){
          obj.sport_type_id = '44'
        }else if(this.$route.name == 'snooker-path'){
          obj.sport_type_id = '6'
        }else if(this.$route.name == 'cockfight-path'){
          obj.sport_type_id = '35'
        }else if(this.$route.name == 'bullfight-path'){
          obj.sport_type_id = '10035'
        }else if(this.$route.name == 'basketball-path'){
          obj.sport_type_id = '2'
        }


        if(type == 'sc'){
          obj.odds_type = this.$auth.$storage.getUniversal('price')
        }else{
          obj.odds_type = 'EU'
        }
        var res;
        if (type != "sc") {
          if (obj.event_id) {
            // ถ้ามี event_id ซ้ำ ให้ลบตัวเก่าออกก่อน
            this.all_event_id = this.all_event_id.filter(id => id !== obj.event_id);
            // แล้วเพิ่ม event_id ใหม่เข้าไป
            obj.action = 'add'
            this.all_event_id.push(obj.event_id);
            obj.all_event_id = this.all_event_id.join(',');
          }
        }
        
        // setTimeout(async() => {
          try {
            res = await this.$axios.get(`/event/` +type + `/ticket`,
              {
                params: obj
              }
            );

            if (type == "sc") {
              if(res.data.status){
                this.errMsg = null
                this.mockDataBet(
                  {
                    'data' : res.data.data,
                    'type' : type
                  }
                )
                this.dataBetList.dataBetSingle = res.data.data;
              }else{
                this.dataBetList.dataBetSingle = []
                this.$swal.fire(this.trans(`ms_error.fail`), res.data.message , "warning");
                this.errMsg = res.data.message
              }

              this.bettype = false;
            } else {

              if(res.data.status){
                this.errMsg = null
                res.data.data.type = type
                this.pushBetList(res.data.data);
              }else{
                this.$swal.fire(this.trans(`ms_error.fail`), res.data.message , "warning");
                this.errMsg = res.data.message
              }

              this.bettype = true;
            }
            this.loading = false;
          } catch (error) {

            this.$swal.fire(this.trans(`ms_error.fail`), error.response.data , "warning");
            // this.loading = true;
          }
        // },0);
        setTimeout(() => {
          this.loading = false;
        }, 2000);
      }
    },
    closebet() {
      this.hidemenu = true;
      this.loading = true;
      this.dataBetList.dataBetSingle = [];
      this.dataBetList.dataBetParlay = [];
      this.getbet.dataBetParlay = [];
      this.getbet.dataBetSingle = [];
      this.fetchActionsTab(false);
    },
    selecttabs(event) {
      this.bettype = event;
    }
  },
  created() {
    this.getUserCredit();
    if(localStorage.getItem('iframe')){
      this.iframe = localStorage.getItem('iframe')
    }
    if(localStorage.getItem('banner1')){
      this.banner1 = true
    }
  },
  watch: {
    langs(value) {
      this.lang = value;
    },
    getbet: {
      handler() {
        this.sendBet();
        if(this.getbet.dataBetSingle == false){
          this.hidemenu = true;
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
          }, 2000);
          this.dataBetList.dataBetSingle = [];
          this.dataBetList.dataBetParlay = [];
        }
      },
      deep: true
    },
    getmix : {
      handler() {
        this.all_event_id = this.getmix.arrayStep.map(item => item.event_id)
      },
      deep: true
    }
  }
};
</script>

<style scoped>
.show-sy {
  animation: fadeIn 1s;
  -webkit-animation: fadeIn 1s;
  -moz-animation: fadeIn 1s;
  -o-animation: fadeIn 1s;
  -ms-animation: fadeIn 1s;
  height: 100%;
}

.credit-style {
  /* background: url(/banner/bg.png); */
  border-radius: 8px;
  background-size: cover;
  padding: 10px;
  background: #141414;
}

.hidden {
  opacity: 0;
  height: 0px;
  transition: height 200ms;
}


@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

@-moz-keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

@-webkit-keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

@-o-keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

@-ms-keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
</style>
