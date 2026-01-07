<template>
  <div>
    <div v-if="keyw == 'seeall'">
      <button @click="showModal(keyw + 'idmodal', 'My Bets')" class="w-full mb-2 btn-sm btn-redW credit-style" style="color: black !important;">
       {{ trans("sidebar.seeall")  }}
      </button>
    </div>

    <div v-if="keyw == 'menuright'">
      <!-- <button class="btn-sm" :class="iframe == '1' ? 'button-iframe' : 'button-st'" style="margin-right: 5px , padding : 2px 4px " @click="showModal(keyw + 'idmodal', 'Statement Sport')" v-if="!whitelabel">
        <span>
          {{  trans("header.statement")  }}
        </span>
      </button> -->
      <button class="btn-sm" :class="iframe == '1' ? 'button-iframe' : 'button-st'" style="margin-right: 5px; padding : 2px 4px ;" @click="showpopup()" v-if="whitelabel">
        <span>
          {{  trans("header.statement")  }}
        </span>
      </button>
      <button class="btn-sm" :class="iframe == '1' ? 'button-iframe' : 'button-st'" style="padding: 2px 4px;" @click="showModal(keyw + 'idmodal', 'My Bets')">
        <span>
          {{  trans("header.mybets")  }}
        </span>
      </button>
      <!-- <span class="cursor-pointer">
        {{  trans("header.deposit")  }} / {{  trans("header.withdraw")  }}
      </span> -->
    </div>
    <b-modal :id="keyw + 'idmodal'" size="xl" hide-footer  no-close-on-backdrop body-bg-variant="light">
      <div is="user-account"></div>
      <b-tabs pills   v-model="tabs"  justified>
        <b-tab  v-for="(title, i) in tab" :key="i" :active="title.name_en == tabActiveKey"  @click="linkClass(i,whitelabel)" >
          <template #title >
            <div  v-if="!whitelabel" > {{ title['name'+keyLang] }}</div>
            <div  v-if="whitelabel && title.name_en != 'Statement Sport'" > {{ title['name'+keyLang] }}</div>
          </template>
          <!-- <b-card-text v-if="title.name_en == 'AccountInfo / Balance'">
            <user-account ></user-account>
          </b-card-text> -->
          <b-card-text v-if="title.name_en == 'Statement Sport'">
            <user-statement  :tabs="tabs" :lang="lang" @emitTabActive="setTab($event)" ></user-statement>
          </b-card-text>
          <b-card-text v-if="title.name_en == 'My Bets'">
            <user-my-bet :tabs="tabs" :lang="lang" :search="search" ></user-my-bet>
          </b-card-text>
        </b-tab>
      </b-tabs>
    </b-modal>
  </div>
</template>
<script>
import {mapActions, mapGetters } from "vuex";
export default {
  props: ["keyw","iframe"],
  data() {
    return {
      whitelabel : localStorage.getItem('Whitelabel'),
      lang: this.$auth.$storage.getUniversal("language"),
      tabs: null,
      tab: [
        // { 
        //   name: "บัญชีของฉัน / ยอดคงเหลือ",
        //   name_en: "AccountInfo / Balance",
        //   name_my: "အကောင့်အချက်အလက် / လက်ကျန်ငွေ",
        //   name_vn: "Thông tin tài khoản / Số dư",
        //   name_tv: "Thông tin tài khoản / Số dư",
        //   name_cn: "賬戶信息/餘額",
        //   name_cnsp: "账户信息/余额",
        //   name_lao: "ຂໍ້ມູນບັນຊີ / ຍອດເງິນ",
        //   name_khmer: "ព័ត៌មានគណនី / សមតុល្យ",
        // },
        // { name: "ยอดคงเหลือ", name_en: "Balance" },
        { 
          name: "รายการบัญชีกีฬา",
          name_en: "Statement Sport",
          name_my: "ထုတ်ပြန်ချက်",
          name_vn: "Tuyên bố",
          name_tv: "Tuyên bố",
          name_cn: "陳述",
          name_cnsp: "陈述",
          name_lao: "ຖະແຫຼງການ",
          name_khmer: "សេចក្តីថ្លែងការណ៍",
        },
        { 
          name: "รายการเล่น", 
          name_en: "My Bets",
          name_my: "ငါ့အလောင်းအစား",
          name_vn: "cá cược của tôi",
          name_tv: "cá cược của tôi",
          name_cn: "我的賭注",
          name_cnsp: "我的赌注",
          name_lao: "ການເດີມພັນຂອງຂ້ອຍ",
          name_khmer: "ការភ្នាល់របស់ខ្ញុំ", 
        },
      ],
      tabActiveKey: null,
      search : {}
    };
  },
  computed: {
    ...mapGetters({
      langs: "language/langs",

    }),
  },
  methods: {
    async showpopup(){
      try {
        let response = await this.$axios.get("/statementAZ755?whitelabel="+this.whitelabel);
        setTimeout(() => {
            window.open(response.data.url,'_blank')
          }, 0);
        // window.open(response.data.url ,'_blank',);
      } catch (error) {
        alert('wrong something');
      }
    },
    showModal(id, tabActiveKey) {
      console.log('idid',id);
      
      this.$bvModal.show(id)
      this.tabActiveKey = tabActiveKey;
      this.search = null
    },
    setTab(event){
      this.tabActiveKey = event.tab;
      this.search = {
        date : event.date,
        type : 'settled'
      }
    },
  async  linkClass(i,datawhite){
   
      if (!datawhite) {
        //   if (i == '0') {
        //   this.tabActiveKey = 'AccountInfo / Balance'
        // }
        if (i == '0') {
          this.tabActiveKey = 'Statement Sport'
        }
        if (i == '1') {
          this.tabActiveKey = 'My Bets'
        }
      }
     
      // this.search = null
    }
  },
  created(){
    this.tabActiveKey
    this.linkClass()
  },

  watch: {
    langs(value) {
      this.lang = value;
    },
   

  },
};
</script>
<style scoped>

.credit-style {
  /* background: url(/banner/bg.png); */
  border-radius: 8px;
  background-size: cover;
  padding: 7px 0px;
  color: #000;
  background: #ffc107;
  
}
.modal-body {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  pointer-events: auto;
  background-color: #dee0ea;
  background-clip: padding-box;
  border: 0px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.3rem;
  outline: 0;
}
.button-st{
  text-align: center;
  border: 1.5px solid #868686;
  background: #ffffff;
  border-radius: 5px;
  padding: 3px;
  color: #686868;
  padding-bottom:2px;
}
.button-iframe {
  border: 1px solid #f5f5f587;
  border-radius: 6px;
  color: #f5f5f5cc;
  background: #ffffff26;
  padding: 2px 6px;
}
.btn-redW {
    /* background-color: #FF4757;
    border: 1px solid #FF4757; */
    border-radius: 6px;
    color: white;
}
.btn-redW:hover {
    /* background-color: #fa1e30;
    border: 1px solid #fa1e30; */
    border-radius: 6px;
    color: white;
}
.btn-redW:not(:disabled):not(.disabled):active, .btn-redW:not(:disabled):not(.disabled).active, .show > .btn-redW.dropdown-toggle {
    color: #fff;
    /* background-color: #fb3141;
    border-color: #fb3141; */
}
</style>

