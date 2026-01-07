<template>
  <div class="btn-menu p-0">
    <b-card class="mt-0 h-full" no-body style="border: 0px solid #3d94f6; border-top-left-radius: 6px !important; border-top-right-radius: 6px !important;">
      <template #header>
        <div
          class="card-header-menu"
          :style="visible ? '' : 'border-bottom-right-radius: 6px !important; border-bottom-left-radius: 6px !important;'"
          v-b-toggle="`collapse-1`"
          :aria-expanded="visible ? 'true' : 'false'"
        >
          <span class="ml-4">{{ trans("sidebar.sportsmenu") }}</span>
          <b-icon
            :icon="visible ? 'caret-up-fill' : 'caret-down-fill'"
            class="float-right mt-1 mr-2"
          ></b-icon>
        </div>
      </template>
      <b-collapse v-model="visible" id="collapse-1">
        <div class="bg-titel-card mt-1">
          <!-- {{ lang == 'th' ? 'ประเภทกีฬา' : 'Sports Type' }} -->
        </div>
        <b-card
          no-body
          class="m-0 p-0"
          style="border: 0px solid; background: none"
          v-for="(item, i) in menusporttype"
          :key="i"
          v-if="i == 0"
        >
          <b-card-header header-tag="header" class="px-2 py-0 paddingHead" role="tab" :class="path"
          style="border-bottom: 1px solid #c0c0c059;" 
          :style="link_type == item.name_en ? 'background: rgb(255, 202, 61)' : ''">
            <div style="">

              <b-row
                class="p-0 m-0 w-full cursor-pointer"
                @click="linkpath(item)"
              >
                <b-col cols="12" class="px-0 py-1">
                  <b-img :src="item.img" class="float-left pt-0 pr-1" style="width: 20px; margin-top: 2px;"></b-img>
                  <span class="block mt-0 text-left" :style="link_type == item.name_en ? 'color : black' : 'color : white'"
                    >
                    <div v-if="lang == 'th'">
                      {{ item.name }} <span style="">({{ item.qty_all }})</span>
                    </div>
                    <div v-else>
                      {{ item["name" + keyLang] }} ({{ item.qty_all }})
                    </div>
                  </span>
                  <span class="hidden">{{ active_menu(item.route) }}</span>
                </b-col>
              </b-row>
            </div>
          </b-card-header>
          <div
            is="sidebar-left-list-menu"
            :path="path"
            @linksport="linksport($event)"
            :i="i"
            :item="item"
            :lang="lang"
          ></div>
        </b-card>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
import Axios from "axios";
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["hidemenu", "pathEvent"],
  data() {
    return {
      // countDown: null,
      lang: this.$auth.$storage.getUniversal("language"),
      sporttype: [],
      sportpor: [],
      collapse_id: null,
      visible: true,
      path : "",
      link_type : ""
      // loading: false,
    };
  },
  computed: {
    ...mapGetters({
      langs: "language/langs",
      getbetlist:"fetchbet/getbetlist",
      getTabsport: 'clicksport/getTabsport',
      getbet : "tabbet/getbet",
      getMenu : "menu/getMenu"    
    }),
    menusporttype(){
      if(this.sportpor.length != 0 && this.sporttype.length != 0){
        console.log('this.sportporthis.sportporthis.sportpor',this.sportpor);
        
        this.sporttype.filter(f => {
          if(f.type == "soccer"){
            f.qty_live = this.sportpor.menu[1].live
            f.qty_today = this.sportpor.menu[1].non_live
            f.qty_step = this.sportpor.menu[1].step
            f.qty_mix = this.sportpor.menu[1].mix
            f.qty_early = this.sportpor.menu[1].early
            f.qty_all = this.sportpor.menu[1].live +  this.sportpor.menu[1].non_live + this.sportpor.menu[1].step + this.sportpor.menu[1].mix + this.sportpor.menu[1].early
          }
        })
        // const finda1 =  this.sporttyp.filter(a2 => a1.find(a1 => a1 === a2))
        return this.sporttype
      }
    }
  },
  methods: {
    // startAutoRefresh() {
    //   this.loading = true;
    //   this.timer = setInterval(() => {
    //   this.countDown--;
    //     if (this.countDown <= 0) {
    //       this.fetchMenu()
    //       this.countDown = 10;
    //     }
    //     this.loading = false;
    //   }, 1000);
    // },
    ...mapActions({
      setMenuData: 'favorite/setMenuData',
    }),
    active_menu(route) {
      //localStorage.removeItem('filterSport')
      let routepath = this.$route.path.toString();
      for (let i = 0; i < this.sporttype.length; i++) {
        if (this.sporttype[i].route) {
          if (this.sporttype[i].route == routepath) {
            return route.startsWith(routepath.toString());
          }
        }
      }
    },
    linksport(link){
      //  localStorage.removeItem('filterSport')
       this.path = link
    },
    linkpath(path, check) {
      //localStorage.removeItem('filterSport')
      this.link_type = path.name_en

      if(path == "cockfight"){
        this.path = "cockfight-path"
      }else if (path == "/cockfightsouth/all"){
        this.path = "cockfightsouth-path"
      }else if (path.type == "basketball"){
        this.path = "basketball-path"
      }else if (path.type == "snooker"){
        this.path = "snooker-path"
      }else if (path.type == "soccer"){
        this.path = "football-path"
      }else if (path.type == "Muay"){
        this.path = "muay-path"
      }else if (path.type == "cow"){
        this.path = "cow-path"
      }else if (path.type == "takraw"){
        this.path = "takraw-path"
      }

      this.$router.push({ path: path.route });
      if (check) {
        this.collapse_id = path;
        this.sporttype.filter(f => (f.visible = false));
        for (let i = 0; i < this.sporttype.length; i++) {
            let text = this.sporttype[i].route.substring(1, 11);
            let text1 = path.substring(1, 11);
            if (text == text1) {
              this.sporttype[i].visible = true;
            }
        }
      } else {
        if (path.route != this.collapse_id) {
          this.collapse_id = path.route;
          this.sporttype.filter(f => (f.visible = false));
          for (let i = 0; i < this.sporttype.length; i++) {
            if (this.sporttype[i].name_en == path.name_en) {
              this.sporttype[i].visible = true;
            }
          }
        }
      }
    },

  },
  watch: {
    langs(value) {
      this.lang = value;
    },
    hidemenu(value) {
      this.visible = value;
    },
    pathEvent(value) {
      this.linkpath(value, "start");
    },
    'getMenu' : {
      handler(val){
          setTimeout( async () => {
            let response1 = val.menu;
            for (const key in response1) {
              const item = response1[key];
              if (item.type === "cockfight South") {
                item.type = "cockfightsouth";
              }
              if (item.type === "TaKraw") {
                item.type = "takraw";
              }
            }       
            val.status = true
            this.sportpor = val;
          }, 0);
        },
        deep: true
    },
    'getbet' : {
        handler(val){
          this.visible = false
        },
        deep: true
      },
    'getbetlist' : {
        handler(val){
          this.visible = false
        },
        deep: true
      },
      getTabsport(value){
        this.visible = value
      }
  },
  async created() {
    this.path = this.$route.name.toString();
    setTimeout(() => {      
      if(this.path == 'football-path'){
        this.link_type = "Football"
      }else if(this.path == 'muaythai-path'){
       this.link_type = 'Muaythai' 
      }else if(this.path == 'cockfightsouth-path'){
        this.link_type = 'CockFightSouth' 
      }else if(this.path == 'cockfight-path'){
        this.link_type = 'CockFight' 
      }else if(this.path == 'bullfight-path'){
        this.link_type = 'BullFight' 
      }else if(this.path == 'basketball-path'){
        this.link_type = 'Basketball' 
      }else if(this.path == 'snooker-path'){
        this.link_type = 'Snooker' 
      }else if(this.path == 'takraw-path'){
        this.link_type = 'takraw' 
      }
    }, 800);

    // else if(this.path == 'cockfight/all'){
    // }
    // this.link_type = this.$route.name.toString();
    let response1 = await this.$axios.get("/event/sport/menu");
    for (const key in response1.data.menu) {
      const item = response1.data.menu[key];
      if (item.type === "cockfight South") {
        item.type = "cockfightsouth";
      }
      if (item.type === "TaKraw") {
        item.type = "takraw";
      }
    }   
    this.sportpor = response1.data;
    let response = await Axios.get("/api-new/sport-menu.json");
    this.sporttype = response.data;
    this.linkpath(this.$route.path, "start");
    this.setMenuData({ menu: this.sportpor.menu, json: this.sporttype })
    // this.startAutoRefresh();

  }
};
</script>

<style scoped>
.card-header {
  text-align: center;
  background: none;
  color: black;
  border-radius: 0px;
  border: 0px solid;
  padding: 0px 0px;
}

.paddingHead {
  padding-top: 0.3rem !important;
  padding-bottom: 0.3rem !important;
}

.card-header-menu {
  text-align: center;
  /* background: linear-gradient(to bottom, #3d94f6 5%, #1e62d0 100%); */
  background: #191919;
  border-top-left-radius: 6px !important;
  border-top-right-radius: 6px !important;
  color: #ffce0c;
  border-radius: 0px;
  padding: 7px 0px;
  font-weight: bold;
}

.card-meun .item-menu {
  border-bottom: 1px solid #c0c0c059;
  padding: 6px 3px;
}

.bg-titel-card {
  /* background: url(/banner/bg.png); */
  /* background: linear-gradient(89.89deg, rgb(0 92 177) -1.37%, rgb(0 89 166 / 28%) 89.33%); */
  background: #141414;
  border-radius: 0px;
  background-size: cover;
  padding: 5px;
  color: white;
}
</style>
