<template>
  <div>
    <b-overlay :show="loadinginpage" rounded="sm">
      <menubar-results2-filter-result :loading="loadinginpage" :dataresults="oldsport" @FilterDate="FilterDate($event)"
        @FilterResult="Filtertable($event)" @filterType="filterType($event)"></menubar-results2-filter-result>
      <div class="sy-tab" v-if="!loadinginpage">
        <div v-if="getData.length == 0" class="text-center">
          {{ trans("content.notmatch") }}
        </div>
         <b-card class="mb-2 h-full" no-body style="border: 0px solid; background: none"> 
          <div>
            <b-table-simple small striped hover class="rounded table-results">
              <b-thead class="mb-2">
                <b-tr style="background: none !important; border-top: 0px solid;">
                  <b-th class="text-left pl-4" style="width: 200px;border-top: 0px solid;background: #cca50b;border-top-left-radius: 10px;"><small class="font-semibold">{{ trans('results.datetime') }}</small></b-th>
                  <b-th class="text-left pl-4" style="width: 400px;border-top: 0px solid; background: #cca50b;"><small class="font-semibold">{{ trans('results.event') }}</small></b-th>
                  <b-th class="text-center" style="width: 110px;border-top: 0px solid; background: #cca50b;"><small class="font-semibold">{{ trans('results.first_half_score')
                  }}</small></b-th>
                  <b-th class="text-center" style="width: 110px;border-top: 0px solid; background: #cca50b;"><small class="font-semibold">{{ trans('results.full_time_score')
                  }}</small></b-th>
                  <b-th class="text-center" style="width: 110px;border-top: 0px solid; background: #cca50b;border-top-right-radius: 10px;"><small class="font-semibold">{{ trans('results.status') }}</small></b-th>
                </b-tr>
              </b-thead>
              <b-tbody v-for="(datas, i) in getData" :key="i">
                <b-tr>
                  <b-th colspan="5" class="text-left" @click="toggleOpenTable(i)">
                    <b-icon :icon="opened.includes(i) ? 'caret-down-fill' : 'caret-up-fill'"></b-icon>
                    <small class="pl-3 font-semibold"> {{ datas.league['league_name' + _keyLang] ? datas.league['league_name' +  _keyLang] : datas.league['league_name_en'] }}</small>
                  </b-th>
                </b-tr>
                <b-tr v-if="opened.includes(i)" v-for="(item, d) in datas.datas" :key="d" >
                  <b-td>
                    {{ item.count_match }}
                    <small class="text-left ml-4 text-sm-center ml-sm-0">
                      {{ getSettleDate(convertdatetime(item.real_kickoff_time)) }}
                      &nbsp;
                      {{ getSettleTime(convertdatetime(item.real_kickoff_time)) }}
                    </small>
                  </b-td>
                  <b-td class="text-left pl-4">
                    <small class="text-left"> {{ sutstirngUnicode(item['home' + _keyLang] ? item['home' + _keyLang] : item['home_en'])  }}</small>
                    <small class="text-left"> -VS- </small>
                    <small class="text-left"> {{ sutstirngUnicode(item['away' + _keyLang] ? item['away' + _keyLang] : item['away_en'])
                    }}</small>
                  </b-td>
                  <b-td class="text-center">
                    <small class="align-top">{{ item.first_half_h_socre }} : {{ item.first_half_a_socre }} </small>
                    <br />
                    <small class="align-top text-danger font-semibold" v-if="item.first_half_a_socre_abandoned != '-'">[{{
                      checklang(item.first_half_a_socre_abandoned) }}] </small>
                  </b-td>
                  <b-td class="text-center">
                    <small class="align-top ">{{ item.full_time_h_socre }} : {{ item.full_time_a_socre }} </small>
                    <br />
                    <small class="align-top text-danger font-semibold">
                      <div v-if="item.full_time_a_socre_abandoned != '-'">
                        <span v-if="item.full_time_a_socre_abandoned != 'Abandoned'">
                          [{{ checklang(item.full_time_a_socre_abandoned) }}] 
                        </span>
                        <span v-else>
                          <span v-if="item.sport_id != 1">
                            <span v-if="item.sport_id == 2">
                              [ {{ checklang('Abandoned') }} ]
                            </span>
                            <span v-else>
                              [ {{ lang == 'th' ? 'โดนไล่ลง' : 'Got kicked down' }} ]
                            </span>
                          </span>
                          <span v-else>
                            <span v-if="item.full_time_a_socre_abandoned != '-'">  
                              [{{ checklang(item.full_time_a_socre_abandoned) }}] 
                            </span>
                          </span>
                          
                        </span>
                      </div>
                    </small>
                  </b-td>
                  <b-td class="text-center">
                    <small class="align-top">{{ tranTH(item.status) }}</small>
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </div>
        </b-card> 
      </div>
    </b-overlay>
  </div>
</template>


<script>
import moment from "moment";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      lang: this.$auth.$storage.getUniversal("language"),
      dataresults: [],
      dataFilterResult: [],
      checktype: null,
      getsport: { data: { data: {} } },
      oldsport: { data: { data: {} } },
      flavours: ["Orange", "Grape", "Apple", "Lime", "Very Berry"],
      selected: [],
      allSelected: false,
      indeterminate: false,
      sporttype: "basketball",
      opened: [],
      loadinginpage: true,
      striped: false,
      sport_type : 0,
    };
  },
  computed: {
    ...mapGetters({
      getresults: "results/getresults",
      langs: "language/langs",
    }),
    getData() {
      if (this.getsport.data.data.length == undefined) {
        return [];
      }
      const x = {}
      var sport1 = this.getsport.data.data.filter(f => {
        if(f.web_id == 1){
          return f.league_id = f.league_id+'1'
        }
       })
       var sport2 = this.getsport.data.data.filter(f => {
        if(f.web_id == 2){
          return f.league_id = f.league_id+'2'
        }
       })
       var sport3 = this.getsport.data.data.filter(f => {
        if(f.web_id == 3){
          return f.league_id = f.league_id+'3'
        }
       })
       var sport4 = this.getsport.data.data.filter(f => {
        if(f.web_id == 4){
          return f.league_id = f.league_id+'4'
        }
       })
       var sport5 = this.getsport.data.data.filter(f => {
        if(f.web_id == 5){
          return f.league_id = f.league_id+'5'
        }
       })
       var sport6 = this.getsport.data.data.filter(f => {
        if(f.web_id == 6){
          return f.league_id = f.league_id+'6'
        }
       })
       var sport10 = this.getsport.data.data.filter(f => {
        if(f.web_id == 10){
          return f.league_id = f.league_id+'10'
        }
       })

       var grop = []
       if(sport1.length != 0){
         grop.push(this.sortGropLeague(sport1))   
       }
       if(sport2.length != 0){
         grop.push(this.sortGropLeague(sport2))  
       }
       if(sport3.length != 0){
         grop.push(this.sortGropLeague(sport3))  
       }
       if(sport4.length != 0){
         grop.push(this.sortGropLeague(sport4))  
       }
       if(sport5.length != 0){
         grop.push(this.sortGropLeague(sport5))  
       }
       if(sport6.length != 0){
        grop.push(this.sortGropLeague(sport6)) 
       }
       if(sport10.length != 0){
        grop.push(this.sortGropLeague(sport10)) 
       }

       let merged = {...grop[0],...grop[1],...grop[2],...grop[3],...grop[4],...grop[5]}
       const data = Object.values(merged).sort((a,b) => a.league.sort_league.localeCompare(b.league.sort_league))
      .filter(item => {
          if(this.filtertext != null){
              const result = item.datas.filter(item => {
              const {away_en, away_th, home_en, home_th} = item
              return away_th.includes(this.filtertext) || away_en.includes(this.filtertext) || home_en.includes(this.filtertext) || home_th.includes(this.filtertext)
          })
              item.datas = result
          }
          if(item.league.league_name_en.substring(0, 2) == 'e-'){
            item.league.sort_league = [`${'Z'}`]+item.league.sort_league
          }
            return item
        })
    
      this.opened = Object.keys(data).map( i => parseInt(i))

      var array = data.sort(function(a, b) {
          var extractNumericPart = function(str) {
              var match = str.match(/^\d+(\.\d+)?/);
              return match ? parseFloat(match[0]) : null;
          };

          var numA = extractNumericPart(a.league.sort_league);
          var numB = extractNumericPart(b.league.sort_league);

          if (numA !== null && numB !== null) {
              return numA - numB;
          }

          if (numA !== null) return -1;
          if (numB !== null) return 1;

          return a.league.sort_league.localeCompare(b.league.sort_league);
      });
      return array
    },

  },
  methods: {
    ...mapActions({
      fetchResults: "results/fetchResults",
    }),
    sortGropLeague(value){
      const x = {}
      value.map(function (y, index) {
        if (x[y.league_id] == undefined) {
          x[y.league_id] = {
            league: {
              league_id: y.league_id,
              league_name_en: y.league_name_en,
              league_name_th: y.league_name_th,
              sort_league: y.sort_league
            },
            datas: []
          }
        }
        x[y.league_id].datas.push(y)
        x[y.league_id].datas.sort((a,b) => a.sort_order.localeCompare(b.sort_order))
      });
      return x
    },
    tranTH(item) {
      if (item == 'Completed' && this.lang == 'th') {
        return "จบ"
      }
      if (item == 'Running' && this.lang == 'th') {
        return "กำลังเเข่งขัน"
      }

    },
    checklang(item) {
      if (item == 'Abandoned' && this.lang == 'th') {
        return "แข่งไม่ครบ 90 นาที"
      }
      else {
        return item
      }

    },
    async filterType(event) {
      this.sport_type = event
      this.loadinginpage = true

      let finda1 = [];
      this.getsport = JSON.parse(JSON.stringify(this.oldsport));
      if (event != '0') {
        finda1 = await this.getsport.data.data.filter((a2) => event == a2.sport_id);
      } else {
        finda1 = await this.getsport.data.data;
      }

      this.getsport = { data: { data: finda1 } };
      this.loadinginpage = false
    },
    // toggleAll(checked) {
    //   this.selected = checked ? this.flavours.slice() : [];
    // },
    toggleOpenTable(id) {
      console.log('hihi', id)
      const index = this.opened.indexOf(id);
      if (index > -1) {
        console.log("111",this.opened.splice(index, 1));
        this.opened.splice(index, 1);
      } else { 
        console.log("222",this.opened.push(id));
        this.opened.push(id);
      }
    },
    FilterDate(datekick) {

      this.fetchgetsport({ date: datekick})
    },
    getSettleDate(string) {
      return string ? string.split(' ')[0] : ''
    },
    getSettleTime(string) {
      return string ? string.split(' ')[1] : ''
    },
    async Filtertable(e) {
      this.loadinginpage = true
      let finda1 = [];
      this.getsport = JSON.parse(JSON.stringify(this.oldsport));
      if (e.leagues.length > 0) {
        
        finda1 = await this.getsport.data.data.filter((a2) => e.leagues.find((a1) => a1 === a2.league_id));
      } else {
        if(this.sport_type != 0){
          
          finda1 = await this.getsport.data.data.filter(item => item.sport_id === parseInt(this.sport_type));
          
        }else{
          finda1 = await this.getsport.data.data;
        }
      }
      this.getsport = { data: { data: finda1 } };
      this.loadinginpage = false

    },
    async fetchgetsport(data = {}) {
      this.loadinginpage = true;
      this.getsport = { data: { data: [] } }
      let response = await this.$axios.get("/results", { params: data });
      this.getsport = response;
      this.oldsport = response;
      this.loadinginpage = false;
    },
    sutstirngUnicode(data){
     return data.replace(/\\u([\d\w]{4})/gi, '')
    }
  },
  created() {
     this.fetchgetsport({date: moment(new Date()).subtract(11,'hours').format("YYYY-MM-DD")});
  },
  watch:{
    langs(value) {
      this.lang = value;
    },
  }
};
</script>
<style scoped>
.sy-tab {
  border-radius: 6px;
  background: rgb(255, 255, 255);
  /* padding: 15px; */
  margin-bottom: 20px;
}

.card-header {
  /* background: #89b4ef; */
  color: rgb(0, 0, 0);
  border-radius: 0px;
  border: none;
  padding: 0px 0px;
}

.table-results {
  border-bottom: 1px solid #dde1ef;
  vertical-align: middle;
  padding: 0px;
  height: 40px;
}
.table-results thead tr {
  border-right: none;
  border-top: 1px solid #dde1ef;
  border-left: none;
  vertical-align: middle;
  padding: 0px;
  height: 40px;
  max-width: 30px;
  background: #cca50b;
}
.table-results tbody th {
  background: #cca50b;
}
.table-results td {
  border-right: none;
  border-top: 1px solid black;
  background: #2c2c2c;
  border-left: none;
  vertical-align: middle;
  color: white;
  padding: 0px;
  height: 40px;
  max-width: 30px;
  /* background: #fbfeff; */
}

.table-results tbody tr:nth-child(even):not(:first-child) {
  background: none;
}

.table-results tbody tr:nth-child(odd):not(:first-child) {
  background: rgb(234, 241, 255);
}
</style>
