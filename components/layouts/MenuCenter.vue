<template>
  <div class="card-border-style menu-top" :class="checkBetAll ? 'bet-close-table' : ''">
    <div class="flex">
        <div class="flex">
            <div style="text-align: left;">    
              <nuxt-link :to="{ path: '/football/today', query: {s: 'top-menu',t:'today'} }" class="nuxt-link">{{ trans("header.today") }}</nuxt-link>
              <nuxt-link :to="{ path: '/football/step', query: {s: 'top-menu'} }" class="nuxt-link"><span @click="linkmenu('step')">{{ trans("header.step") }}</span></nuxt-link>
              <nuxt-link :to="{ path: '/football/mixparlay', query: {s: 'top-menu'} }" class="nuxt-link"><span @click="linkmenu('mixparlay')">{{ trans("header.mixparlay") }}</span></nuxt-link>
              <nuxt-link :to="{ path: '/muaythai/all', query: {s: 'top-menu',t:'muaythai'} }" class="nuxt-link">{{ trans("header.muaythai") }}</nuxt-link>
            </div>
        </div>
        <div class="flex-1">
            <div style="text-align : right">   
              <div is="header-menu-right" class="inline-block" iframe="1"></div>
              <button class="btn-sm btn-menu-style" v-b-modal.menubar-announce-table>{{ trans("header.announcement") }}</button>
              <button class="btn-sm btn-menu-style" @click="linkresults()">{{ trans("header.results") }}</button>
              <button class="btn-sm btn-menu-style" v-b-modal.rules>{{ trans("header.rules") }}</button>
              <span class="checkbox-menu-style">
                <b-form-checkbox v-model="checked" name="check-button" size="sm" variant="warning" switch>
                  <span class="text-white">{{ trans("header.quickbet") }}</span>
                  </b-form-checkbox>
              </span>
            </div>
        </div>
    </div>
    <b-icon icon="caret-right-square-fill" title="เปิดการเดิมพันโดยรวม" class="open-ball" v-if="checkBetAll"  style="position: absolute; right: -36px; top: 9px;" @click="OpenAllbet(false)"></b-icon>
    <b-modal
      id="menubar-announce-table"
      size="xl"
      hide-footer
      no-close-on-backdrop
    >
      <div class="modal-header">
        <b-img src="/icon/3d-speaker.png" style="width: 25px; height: 25px; " class="inline-block mr-2"></b-img>
        <span style="font-size: 20px;"> {{ trans("header.announcement") }}  </span>
      </div>
      <div class="modal-body">
        <div is="menubar-announce-table"></div>
        
      </div>
    </b-modal>

    <b-modal id="rules" hide-footer  size="xl">
      <div class="modal-header1">
        <span style="font-size: 20px;"> {{ trans("header.rules") }}  </span>
      </div>
      <div is="header-rules"></div>
    </b-modal>

  </div>
</template>

<script>
import { mapActions,mapGetters } from "vuex";
export default {
    data() {
        return {
            checked: false,
            checkBetAll : false
        }
    },
    computed: {
      ...mapGetters({
        getclosebetlist: "closebetlist/getclosebetlist",
      })
    },
    methods: {
        ...mapActions({
        actionsQuickbet: "quickbet/actionsQuickbet",
        actionsclosebetlist: "closebetlist/actionsclosebetlist",
        setBetinfo : "betinfo/setBetinfo"
        }),
        linkresults() {
          this.$bvModal.show('results')
      },
      linkmenu(type){
        this.setBetinfo(type)
      },
      OpenAllbet(value){
        this.checkBetAll = true
        localStorage.removeItem('closeBetAll')
        this.actionsclosebetlist(value)
      }
    },
    watch: {
    checked(value) {
      localStorage.setItem("quickbet", value);
      if (
        this.$route.params.path != "step" &&
        this.$route.params.path != "mixparlay"
      ) {
        this.actionsQuickbet(value);
      }
    },
    getclosebetlist(valuse){
      this.checkBetAll = valuse
    }
  },
  created() {
    if(localStorage.getItem('closeBetAll') == '1'){
      this.checkBetAll = true
    }
    if (localStorage.getItem("quickbet") == "false") {
      this.checked = false;
      this.actionsQuickbet(false);
    } else {
      this.checked = true;
      this.actionsQuickbet(true);
    }
  }
}
</script>

<style scoped>
.card-img-style {
  background: url('/banner/Frame33.png');
  background-size: cover;
  height: 66px;
  padding-top: 15px;
  font-weight: 700;
}
.bet-close-table {
  width: 1078px !important;
}
.btn-menu-style {
  border: 1px solid #f5f5f587;
  border-radius: 6px;
  color: #f5f5f5cc;
  background: #ffffff26;
  padding: 2px 6px;
}
.menu-top {
    margin: 0 7px;
    border-radius: 8px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    border: 0 solid;
    z-index: 2;
    width: 1079px;
    /* background: linear-gradient(101deg, rgb(77 108 144), rgb(77 108 144)) !important; */
    background: #141414;
    position: fixed;
}

.btn-active {
    border: 0px;
    border-bottom: 2px solid white;
    border-radius: 0px;
    color: white;
}

.btn-none-active {
    color: rgb(158 172 176);
    border: 0px;
}

.open-ball {
    width: 34px;
    height: 22px;
    cursor: pointer;
    color: whitesmoke;
}

.menu-language {
  font-size: 14px;
  margin: -3px 0 0 -9px;
  display: block;
  color: white;
}
.modal-body {
  position: relative;
  flex: 1 1 auto;
  padding: 1rem;
  color: white;
  background: black;
}
.modal-header {
  border-bottom: 1px solid #dee2e6;
  background: url('/banner/Frame33.png');
  background-size: cover;
  border-radius: 10px;
  text-align: center;
  display: block;
  color: #FFFFFF;
  padding: 25px;
  
}
.modal-header1{
  border-bottom: 1px solid #dee2e6;
  background: url('/banner/Frame34.png');
  background-size: cover;
  border-radius: 10px;
  text-align: center;
  display: block;
  color: #FFFFFF;
  padding: 25px;
}
.modal-content {
  background: white;
}
.button-st{
  text-align: center;
  border: 1.5px double #ffffff;
  background: none;
  height: 27px;
  margin-top: 2px;
  border-radius: 5px;

}

a.nuxt-link {
  background: none;
  display: inline-block;
  font-size: 14px;
  padding: 2px 7px;;
  border-radius: 0px;
  margin-right: 0px;
  border: 0px solid;
  color: #f5f5f5cc;
}
a.nuxt-link:hover {
  text-decoration: none;
}
/* a.nuxt-link-active {
  font-weight: bold;
} */
a.nuxt-link-exact-active {
  color: white;
  border-bottom : 2px solid white;
}

.checkbox-menu-style {
  vertical-align: initial ;
   width: 125px; 
   display: inline-block;
}

@media screen and (max-width: 1400px) {
  .bet-close-table {
    width: 949px !important;
  }
  .menu-top {
      width: 796px;
  }
  .checkbox-menu-style {
  width: 111px;
}
}

@media screen and (max-width: 850px) {
  .menu-top {
    position: static;
}
}
</style>