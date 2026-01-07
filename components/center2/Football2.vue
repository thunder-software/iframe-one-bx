<template>
  <div>
    <div class="px-2 py-0">
      <div class="card-center bg-black">
      <b-row class="mb-2 style-menu pr-0" :class="{'top-menu': (scY > 0),'bet-close-table' : (checkBetAll)}" :style="isAdsHidden ? '' : ''" v-if="iframe != '1'">
        <b-col   :cols=" path == 'early' ? '2' : '3'">
          <div
            is="center2-title"
            type="football"
            :live="path == 'live' ? true : false"
            :path="path"
          ></div>
        </b-col>
        <b-col :cols=" path == 'early' ? '10' : '9'"  class="text-right pr-1">
          <div
            is="center2-select-league-button"
            :displaytable="getselectleague"
            @filterlive="filterlive($event)"
            :loading="loading"
            @refresh="fetchGetData($event)"
            @filternonlive="filternonlive($event)"
            @filterearly="filterearly($event)"
            :oldlive="oldlive"
            :oldnotlive="oldnotlive"
            :oldearly="oldearly"
            :getlive="setDataLive"
            :getnotlive="setDataNonLive"
            :getearly="setDataEarly"
            :path="path"

          ></div>
        </b-col>
      </b-row>

      <b-row class="mb-0 mr-0 style-menu-iframe" :class="scY > 0 ? 'top-menu' : ''" v-else style="margin-top: 75px;">
        <b-col   :cols=" path == 'early' ? '2' : '3'">
          <div
            is="center2-title"
            type="football"
            :live="path == 'live' ? true : false"
            :path="path"
          ></div>
        </b-col>
        <b-col :cols=" path == 'early' ? '10' : '9'"  class="text-right">
          <div
            is="center2-select-league-button"
            :displaytable="getselectleague"
            @filterlive="filterlive($event)"
            :loading="loading"
            @refresh="fetchGetData($event)"
            @filternonlive="filternonlive($event)"
            @filterearly="filterearly($event)"
            :oldlive="oldlive"
            :oldnotlive="oldnotlive"
            :oldearly="oldearly"
            :getlive="setDataLive"
            :getnotlive="setDataNonLive"
            :getearly="setDataEarly"
            :path="path"

          ></div>
        </b-col>
      </b-row>


      <div class="class-tv-box" v-if="getDataTV">
        <div is="center2-iframebox" :urls="getDataTV"></div>
      </div>
 
      <b-row :class="{'row-style-menu': !getDataTV, 'tv-style-menu': getDataTV , 'box-banner' : banners.length != 0, 'style-banner': isAdsHidden}"></b-row>
        <b-col cols="12" v-if="getselectleague.lineType == 'SingleLine'">
          <div is=center2-match-table2-singleline v-if="setDataLive3.length != 0" :setData="setDataLive3" status="live" :getselectleague="getselectleague" @fetchGetData="fetchGetData" @MoreBet="MoreBet($event, 'live')"></div>
          <div is=center2-match-table2-singleline v-if="setDataNonLive3.length != 0" :setData="setDataNonLive3" status="nonLive" :getselectleague="getselectleague" @fetchGetData="fetchGetData" @MoreBet="MoreBet($event, 'nonLive')"></div>
          <div is=center2-match-table2-singleline v-if="setDataEarly3.length != 0" :setData="setDataEarly3" status="early" :getselectleague="getselectleague" @fetchGetData="fetchGetData" @MoreBet="MoreBet($event, 'nonLive')"></div>
        </b-col>
        <b-col cols="12" v-if="getselectleague.lineType == 'DoubleLine'">
          <div is=center2-match-table2-double v-if="setDataLive3.length != 0" :setData="setDataLive3" status="live" :getselectleague="getselectleague" @fetchGetData="fetchGetData"></div>
          <div is=center2-match-table2-double v-if="setDataNonLive3.length != 0" :setData="setDataNonLive3" status="nonLive" :getselectleague="getselectleague" @fetchGetData="fetchGetData"></div>
          <div is=center2-match-table2-double v-if="setDataEarly3.length != 0" :setData="setDataEarly3" status="early" :getselectleague="getselectleague" @fetchGetData="fetchGetData"></div>
        </b-col>
        <b-col cols="12" v-if="getselectleague.lineType == 'HalftimeOnly'">
          <div is=center2-match-table2-halftime v-if="setDataLive3.length != 0" :setData="setDataLive3" status="live" :getselectleague="getselectleague" @fetchGetData="fetchGetData"></div>
          <div is=center2-match-table2-halftime v-if="setDataNonLive3.length != 0" :setData="setDataNonLive3" status="nonLive" :getselectleague="getselectleague" @fetchGetData="fetchGetData"></div>
          <div is=center2-match-table2-halftime v-if="setDataEarly3.length != 0" :setData="setDataEarly3" status="early" :getselectleague="getselectleague" @fetchGetData="fetchGetData"></div>
        </b-col>
        <b-col cols="12" v-if="getselectleague.lineType == 'FulltimeOnly'">
          <div is=center2-match-table2-fulltime v-if="setDataLive3.length != 0" :setData="setDataLive3" status="live" :getselectleague="getselectleague" @fetchGetData="fetchGetData"></div>
          <div is=center2-match-table2-fulltime v-if="setDataNonLive3.length != 0" :setData="setDataNonLive3" status="nonLive" :getselectleague="getselectleague" @fetchGetData="fetchGetData"></div>
          <div is=center2-match-table2-fulltime v-if="setDataEarly3.length != 0" :setData="setDataEarly3" status="early" :getselectleague="getselectleague" @fetchGetData="fetchGetData"></div>
          <!-- <table
            small
            striped
            hover
            bordered
            class="text-center rounded m-0 "
            style="border: 0px; width: 100%;"
            :class="tableClass('live')"
          >
          <tbody
            v-for="(item, index) in setDataLive3"
            :key="index"
            :class="'text-sm'"
          >
          <tr>
            <th></th>
            <th colspan="9">
              {{ item.tournament_th }}
            </th>
          </tr>
          <tr v-for="(match, i) in trdatarow(item.data)"
          :key="i">
          <td></td>
          <td></td>
          <td>
            <div class="inline-block">
                <small class="font-semibold">
                  test
                </small>
              </div>
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        
          </tr>

        </tbody>

        
          </table> -->


          <!-- <div
            is="center2-match-table-live"
            v-if="path != 'early' && setDataLive.length != 0"
            status="live"
            @MoreBet="MoreBet($event, 'live')"
            @MoreCollapse="MoreCollapse($event , 'live')"
            :setData="setDataLive"
            :displaytable="getselectleague"
            :loading="loading"
            @fetch="fetchGetData"
            class="mb-3"
          ></div> -->



          <!-- <div
           is="center2-match-table-nonlive"
            v-if="path != 'early' && path != 'live' && setDataNonLive.length != 0"
            status="nonLive"
            @MoreBet="MoreBet($event, 'nonLive')"
            @MoreCollapse="MoreCollapse($event , 'nonLive')"
            :setData="setDataNonLive"
            :displaytable="getselectleague"
            :loading="loading"
            @fetch="fetchGetData"
          ></div>
          <div
           is="center2-match-table-early"
            v-if="path == 'early'"
            status="early"
            @MoreBet="MoreBet($event, 'early')"
            @MoreCollapse="MoreCollapse($event , 'early')"
            :setData="setDataEarly"
            :displaytable="getselectleague"
            :loading="loading"
            @fetch="fetchGetData"
          ></div> -->
        </b-col>
      </b-row>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from "moment";
  import collect from "collect.js";
  import { mapActions, mapGetters } from "vuex";
  export default {
    data() {
      return {
        loading: false,
        start_load : false,
        path: "",
        liveData: { data: { data: [] } },
        nonLiveData: { data: { data: [] } },
        earlyData: { data: { data: [] } },
        oldearly: [],
        oldearly2: [],
        oldlive: [],
        oldlive2: [],
        oldnotlive: [],
        oldnotlive2 : [],
        oldObj : [],
        moreTrue : [],
        navSide: '',
        navpart:'',
        data_change_id : null,
        data_change_id_non : null,
        numbertpye : 2,
        oldPriceLive : null,
        oldPriceNonLive : null,
        MoreBetID : null,
        collapse_ID : [],
        collapse_All_Live : null,
        collapse_All_Non : null,
        collapse_All_Early : null,
        scY: 0,
        scTimer: 0,
        length_load: 15,
        iframe : null,
        checkBetAll : false,
        date : moment(new Date()).format("YYYY-MM-DD")
  
      };
    },
    computed: {
      ...mapGetters({
        getselectleague: "selectleaguebutton/getselectleague",
        getclosebetlist: "closebetlist/getclosebetlist",
        getCollapse : 'collapseAll/getCollapse',
        getDataTV : 'tvpop/getDataTV',
        isAdsHidden : 'ads/isAdsHidden',
        banners : 'ads/banners'
      }),
      setDataLive2() {
          if (this.liveData.data.data.length == 0) {
            return [];
          }
          let arrayData = [];
          var live = this.liveData.data.data
          live.forEach(item => {
            if (item.odds.some(odd => odd[10] === 'FH_Handicap')) {
              item.status = true;
            }
          });
          var array = []
          if(this.getselectleague.lineType == 'HalftimeOnly'){
            array = live.filter(f=> {
              if(f.period != '5'){
                if(f.period != '2'){
                    return f
                  }
                }
              })
              live = array
            }          
            var obj = []
            if(this.getselectleague.lineType == 'HalftimeOnly'){
              for (let i = 0; i < live.length; i++) {
                if(live[i].period_start_time < 40){                  
                    if(live[i].odds[0]){
                      if(live[i].odds[0].length > 0){
                          obj.push(live[i]) 
                      }
                    }
                }
              }
            }else{
              obj = live
            }
            if(this.getselectleague.lineType == 'HalftimeOnly'){
              if(this.$route.params.path == 'step' || this.$route.params.path == 'mixparlay'){
                obj = []
              }
            }
            var backup = obj
            var array2 = obj;
              
            backup.forEach(item => {
            item.tournament[1] = item.tournament[1].toUpperCase();
          });
          
          backup.map(item => {
              if (item.tournament[1].includes("BOOKING")) {
                  item.math = true;
                  return item;
              }
          });
  
          var array1 = backup.filter(item => item.math == true);
          
  
          for (var i = 0; i < array1.length; i++) {
              if (array1[i].tournament[1].charAt(0) === '*') {
                  array1[i].tournament[1] = array1[i].tournament[1].replace(/^\*/, '');
              }
          }

          for (let index = 0; index < backup.length; index++) {
          // for (let i = 0; i < backup[index].data.length; i++) {
            let item = backup[index];
            if(item.setting_w_b_l[0]){
              if (item.setting_w_b_l[0][5] != 1 && item.setting_w_b_l[0][5] != 0) {
                arrayData.push(item);
              }
            }
            if (this.numbertpye != 5 && this.numbertpye != 8) {
              if (item.some_other_value != 0 ) { 
                if(item.setting_w_b_l[0]){
                  if(item.setting_w_b_l[0][2] != 0){
                    arrayData.push(item);
                  }
                }
              }
            } else {
              if (item.setting_w_b_l[0] && item.setting_w_b_l[0][5] != 0) {
                arrayData.push(item);
              }
            }
          // }
        }
  
  
          // array1.forEach(item1 => {
          //   if (match) {
          //     if(match.web_id != item1.web_id){
          //       item1.pair_league[3] = match.pair_league[3];
          //     }
          //   }
          // });
  
  
          for (let i = 0; i < arrayData.length; i++) {
            if(arrayData[i].tournament[3]){
              let currentTournament = arrayData[i].tournament[3];
              if (!currentTournament.includes(' - ลูกเตะมุม') || !currentTournament.includes(' - ใบเหลือง-แดง')) {
                 arrayData[i].sortmain = true;
              }
              if (currentTournament.includes(' - ลูกเตะมุม')) {              
                let cleanName = currentTournament.replace(' - ลูกเตะมุม', '');
                for (let j = 0; j < arrayData.length; j++) {
                  if (arrayData[j].tournament[3] === cleanName && arrayData[j].sortmain === true){
                    arrayData[i].sortleague = arrayData[j].pair_league[3].slice(0, -2) + 'BB';
                    arrayData[i].sortleague = arrayData[j].sortleague.slice(0, -2) + 'BB';
                    break;
                  }
                }
              }

              if (currentTournament.includes(' - ใบเหลือง-แดง')) {
                let cleanName = currentTournament.replace(' - ใบเหลือง-แดง', '');
                for (let j = 0; j < arrayData.length; j++) {
                  if (arrayData[j].tournament[3] === cleanName && arrayData[j].sortmain === true){                    
                    arrayData[i].sortleague = arrayData[j].pair_league[3].slice(0, -2) + 'CC';
                    arrayData[i].sortleague = arrayData[j].sortleague.slice(0, -2) + 'CC';
                    break;
                  }
                }
              }
            }
          }

          // for (let i = 0; i < arrayData.length; i++) {
          //   if(arrayData[i].tournament[1] == 'PORTUGAL LIGA 2 - CORNERS'){              
          //     arrayData[i].sortleague = '1.0039-E05132503080' + 'BB';
          //     arrayData[i].sortleague = '1.0039-E05132503080' + 'BB';
          //   }
          // }
  
  
        //   for (let i = 0; i < backup.length; i++) {
        //     if(backup[i].tournament[3]){
        //       if (backup[i].tournament[3].includes('- (ทีมใดจะได้ผ่านเข้าสู่รอบต่อไป)')) {
        //         for (let j = 0; j < backup.length; j++) {
        //           if (backup[i].tournament[3].replace(' - (ทีมใดจะได้ผ่านเข้าสู่รอบต่อไป)', '') === backup[j].tournament[3]) {
        //             console.log('backup[j].pair_league[3]',backup[i].tournament[3]);
        //             if(backup[j].pair_league[3].substring(0, 2) == '1.'){
        //               backup[i].pair_league[3] = backup[j].pair_league[3].slice(0, 19)+'9';
        //             }
        //           }
        //         }
        //       }
        //     }
        //   }
        
          if(this.getselectleague.sortBy != 'SortByTime'){
            return arrayData.reduce((group, match) => {
              var sport_type_id 
              sport_type_id = match.tournament[0];
              group[sport_type_id] = group[sport_type_id] ?? [];
              group[sport_type_id].push(match);
              return group;
            }, {});
          }else{
            return arrayData.reduce((group, match) => {
              var sport_type_id 
              sport_type_id = match.source_event_id;
              group[sport_type_id] = group[sport_type_id] ?? [];
              group[sport_type_id].push(match);
              return group;
            }, {});
          }
        },
        setDataLive3(){
          let array = []
          
          for (const array2 in this.setDataLive2) {
  
            let data = this.setDataLive2[array2].sort((a, b) => b.real_kickoff_time.localeCompare(a.real_kickoff_time));
            let date = moment(new Date(data[0].real_kickoff_time)).format("YYYY-MM-DD") > moment(new Date(data[data.length-1].real_kickoff_time)).format("YYYY-MM-DD") ? data[0].real_kickoff_time : data[data.length-1].real_kickoff_time
            array.push({
              id: array2,
              data: data,
              index: array.length,
              status : true,
              tournament_th : data[0].tournament.name_th,
              tournament_en : data[0].tournament.name_en,
              sortleague : data[0].pair_league[0] ==  true ? data[0].pair_league[3] : data[0].sortleague,
              sport_type : data[0].pair_league[4],
              real_kickoff_time : date
            });
            }
  
            var newNumber = '1'
            array.forEach((item) => {
                if(item.data[0].tournament[1].substring(0, 2) == 'E-'){
                  item.sortleague = [`${'ZZ'}`]+item.sortleague
                }else if(item.sport_type == 3){
                  // item.sortleague = [`${'ASBO'}`]+item.sortleague
                }else if(item.sport_type == 10){
                  // item.sortleague = [`${'BIBC'}`]+item.sortleague
                }else if(item.sport_type == 2){
                  item.sortleague = [`${'CAPI'}`]+item.sortleague
                }else{
                item.sortleague = newNumber + item.sortleague.slice(1);
                }
            });



            var arrayfilter = []
            if (localStorage.getItem('filterSport')) {
              let obj = localStorage.getItem('filterSport').split(",");
              arrayfilter = array.filter(a2 => obj.find(a1 => a1 == a2.id))
            }else{
              arrayfilter = array
            }
            
             arrayfilter.sort((a, b) => {
               let an = a.sortleague 
               let bn = b.sortleague 
  
                 if (an > bn) {
                   return 1;
                 }
                 if (an < bn) {
                   return -1;
                 }
                 return 0;
               });

               var arraycollapseTable = []
               if(this.collapse_All_Live == false){
                 arraycollapseTable = arrayfilter.map(({collapse, ...rest}) => rest);
                      this.collapse_ID = []
                      this.collapse_All_Live = null
                }else{
                  arraycollapseTable = this.collapseTable(arrayfilter ,this.collapse_ID ,this.collapse_All_Live)
                }
                
               if(this.getselectleague.sortBy == 'SortByTime'){
                 const collection = collect(arraycollapseTable).sortBy((match) => {
                    return moment(match.real_kickoff_time).format('X')
                  })                
                  return collection.all()
               }else{
                  return arraycollapseTable
               }
  
        },
      setDataLive() {
        let array = []
        let array2 = []
        let arrayData = []
        if (this.liveData.data.data.length == 0) {
  
          return [];
        }else{
          for (let index = 0; index < this.setDataLive3.length; index++) {
          for (let i = 0; i < this.setDataLive3[index].data.length; i++) {
            let item = this.setDataLive3[index].data[i];
            if(item.setting_w_b_l[0]){
              if (item.setting_w_b_l[0][5] != 1 && item.setting_w_b_l[0][5] != 0) {
                arrayData.push(item);
              }
            }
            if (this.numbertpye != 5 && this.numbertpye != 8) {
              if (item.some_other_value != 0 ) {
                if(item.setting_w_b_l[0]){
                  if(item.setting_w_b_l[0][2] != 0){
                    arrayData.push(item);
                  }
                }
              }
            } else {
              if (item.setting_w_b_l[0] && item.setting_w_b_l[0][5] != 0) {
                arrayData.push(item);
              }
            }
          }
        }
            if (localStorage.getItem('filterSport')) {
              let obj = localStorage.getItem('filterSport').split(",");
              let live = { data: { data: [] } }
              live.data.data = arrayData.filter(a2 => obj.find(a1 => a1 == a2.tournament[0]))
  
              var wbl_a = { data: { data: [] } }
               wbl_a.data.data = live.data.data.filter(f => {
                if(f.setting_w_b_l[0]) {
                  if(f.setting_w_b_l[0][this.numbertpye] == 1){
                   return f.setting_w_b_l[0][this.numbertpye]
                  }
                }
               })
  
              array = this.sortData(this.mapData(wbl_a), 'live').reduce((group, match) => {
                const sport_type_id = match.tournament.tournament_id+[`${match.web_id}`];
                group[sport_type_id] = group[sport_type_id] ?? [];
                group[sport_type_id].push(match);
                return group;
              }, {});
  
              for (const data in array) {
                array[data][0].showTable = 'true'
                array[data][0].newLeague = true
                for (let i = 0; i < array[data].length; i++) {
                  array2.push(array[data][i])
                }
              }
              var newNumber = '1'
                  array2.forEach((item) => {
                       if(item.tournament[1].substring(0, 2) == 'E-'){
                        item.pair_league[3] = [`${'99'}`]+item.pair_league[3]
                         item.sort_order = [`${'99'}`]+item.sort_order
                       }else{
                         item.sort_order = newNumber + item.sort_order.slice(1);
                       }
                  });
                  array2.sort((a, b) => {
                      if (a.sort_order < b.sort_order) {
                          return -1;
                      }
                      if (a.sort_order > b.sort_order) {
                          return 1;
                      }
                      return 0;
                  });
              if(this.MoreBetID){
  
              array2.filter(f=> {
                if(f.event_id == this.MoreBetID){
                  f.moreBet = 'open'
                }
              } )
              }
              if(this.collapse_All_Live == false){
                    array2 = array2.map(({collapse, ...rest}) => rest);
                    this.collapse_ID = []
                    this.collapse_All_Live = null
              }else{
                array2 = this.collapseTable(array2 ,this.collapse_ID ,this.collapse_All_Live)
              }
              let macth = 0
              let count = 0
              array2.map(item =>{
  
                if (macth != item.event_id) {
                    macth = item.event_id
                    count++
                }
                item.count_match = count
                return item
              })
              return array2
            }else{
  
              var wbl_a = { data: { data: [] } }
                  wbl_a.data.data = arrayData.filter(f => {
                    if(f.setting_w_b_l[0]){
                      if(f.setting_w_b_l[0][this.numbertpye] == 1){
                        return f.setting_w_b_l[0][this.numbertpye]
                      }
                    }
                  })
                  array = this.sortData(this.mapData(wbl_a)).reduce((acc, item) => {
                  var key
                  if(item.pair_league[0] == true){
                    key = item.pair_league[1];
                  }else{
                    key = item.tournament.tournament_id+[`${item.web_id}`];
                  }
                  if (!acc[key]) {
                    acc[key] = [];
                  }
                  acc[key].push(item);
                  return acc;
                }, {});
                var sort_data  = []
                for (const data in array) {
                  sort_data =  array[data].sort((a, b) => {
                    // if(a.tournament[1].includes('BOOKING') || a.tournament[1].includes('CORNERS')){         
                    //   if (a.sortleague < b.sortleague) {
                    //       return -1;
                    //   }
                    //   if (a.sortleague > b.sortleague) {
                    //       return 1;
                    //   }
                    //   return 0;
                    // }else{
                      if (a.pair_league[3] < b.pair_league[3]) {
                          return -1;
                      }
                      if (a.pair_league[3] > b.pair_league[3]) {
                          return 1;
                      }
                      return 0;
                    // }
                  });                
                  sort_data[0].showTable = 'false'
                  sort_data[0].newLeague = true
                  for (let i = 0; i < sort_data.length; i++) {
                    array2.push(sort_data[i])
                  }
                }
                  //  var newNumber = '1'
                  //  array2.forEach((item) => {
                  //     if(item.tournament[1].substring(0, 2) == 'E-'){
                  //       item.pair_league[3] =  [`${'ZZ'}`]+item.pair_league[3]
                  //     }
                  //  });
  
                  var ball_game = array2.filter(f => f.tournament[1].substring(0, 2) != 'E-')
                  var ball_e = array2.filter(f => f.tournament[1].substring(0, 2) == 'E-')
                  
                  ball_game.sort((a, b) => {
                      if (a.pair_league[3] < b.pair_league[3]) {
                             return -1;
                            }
                            if (a.pair_league[3] > b.pair_league[3]) {
                              return 1;
                            }
                            return 0;
                    });
                    ball_e.sort((a, b) => {                    
                       if (a.pair_league[3] < b.pair_league[3]) {
                              return -1;
                             }
                             if (a.pair_league[3] > b.pair_league[3]) {
                               return 1;
                             }
                             return 0;
                     });
                    for (let i = 0; i < ball_e.length; i++) {
                      ball_game.push(ball_e[i])
                    }
                    if(this.MoreBetID){
  
                      ball_game.filter(f=> {
                        if(f.event_id == this.MoreBetID){
                          f.moreBet = 'open'
                        }
                      } )
                    }
                    if(this.collapse_All_Live == false){
                      ball_game = ball_game.map(({collapse, ...rest}) => rest);
                      this.collapse_ID = []
                      this.collapse_All_Live = null
                    }else{
                      ball_game = this.collapseTable(ball_game ,this.collapse_ID ,this.collapse_All_Live)
                    }
                    let macth = 0
                    let count = 0
                    ball_game.map(item =>{
  
                      if (macth != item.event_id) {
                          macth = item.event_id
                          count++
                      }
                      item.count_match = count
                      return item
                    })
              this.sortPriceGroups(ball_game);
              // ball_game.forEach(obj => {
              //     obj.odds.sort((a, b) => a.sort_row - b.sort_row);
              // });
              return ball_game
          }
        }
      },
      setDataNonLive3(){
          let array = []
          
          for (const array2 in this.setDataNonLive2) {
  
            let data = this.setDataNonLive2[array2].sort((a, b) => b.real_kickoff_time.localeCompare(a.real_kickoff_time));
            let date = moment(new Date(data[0].real_kickoff_time)).format("YYYY-MM-DD") > moment(new Date(data[data.length-1].real_kickoff_time)).format("YYYY-MM-DD") ? data[0].real_kickoff_time : data[data.length-1].real_kickoff_time
            array.push({
              id: array2,
              data: data,
              index: array.length,
              status : true,
              tournament_th : data[0].tournament.name_th,
              tournament_en : data[0].tournament.name_en,
              sortleague : data[0].pair_league[0] ==  true ? data[0].pair_league[3] : data[0].sortleague,
              sport_type : data[0].pair_league[4],
              real_kickoff_time : date
            });
            }
  
            var newNumber = '1'
            array.forEach((item) => {
                item.moreBet = 'open'
                item.data[0].newLeague = true
                if(item.data[0].tournament[1].substring(0, 2) == 'E-'){
                  item.sortleague = [`${'ZZ'}`]+item.sortleague
                }else if(item.sport_type == 3){
                  // item.sortleague = [`${'ASBO'}`]+item.sortleague
                }else if(item.sport_type == 10){
                  // item.sortleague = [`${'BIBC'}`]+item.sortleague
                }else if(item.sport_type == 2){
                  item.sortleague = [`${'CAPI'}`]+item.sortleague
                }else{
                item.sortleague = newNumber + item.sortleague.slice(1);
                }
            });


            if(this.MoreBetID){
              
              
              array.filter(f=> {
                console.log('this.MoreBetID',this.MoreBetID);
                if(f.event_id == this.MoreBetID){                  
                  f.moreBet = 'open'
                }
              } )
            }

            var arrayfilter = []
            if (localStorage.getItem('filterSport')) {
              let obj = localStorage.getItem('filterSport').split(",");
              arrayfilter = array.filter(a2 => obj.find(a1 => a1 == a2.id))
            }else{
              arrayfilter = array
            }
  
             arrayfilter.sort((a, b) => {
               let an = a.sortleague 
               let bn = b.sortleague 
  
                 if (an > bn) {
                   return 1;
                 }
                 if (an < bn) {
                   return -1;
                 }
                 return 0;
               });

               if(this.getselectleague.sortBy == 'SortByTime'){
                 const collection = collect(arrayfilter).sortBy((match) => {
                    return moment(match.real_kickoff_time).format('X')
                  })          
                  var newgroupArray =  collection.all() 
                  return newgroupArray.slice(0, this.length_load)
               }else{
                  return arrayfilter.slice(0, this.length_load)
               }
  
        },
        setDataNonLive2() {
          if (this.nonLiveData.data.data.length == 0) {
            return [];
          }
          let arrayData = []
          var live = this.nonLiveData.data.data
          live.forEach(item => {
            if (item.odds.some(odd => odd[10] === 'FH_Handicap')) {
              item.status = true;
            }
          });
          var array = []
          if(this.getselectleague.lineType == 'HalftimeOnly'){
            array = live.filter(f=> {
              if(f.period != '5'){
                if(f.period != '2'){
                    return f
                  }
                }
              })
              live = array
            }          
            var obj = []
            if(this.getselectleague.lineType == 'HalftimeOnly'){
              for (let i = 0; i < live.length; i++) {
                if(live[i].period_start_time < 40){                  
                    if(live[i].odds[0]){
                      if(live[i].odds[0].length > 0){
                          obj.push(live[i]) 
                      }
                    }
                }
              }
            }else{
              obj = live
            }
            if(this.getselectleague.lineType == 'HalftimeOnly'){
              if(this.$route.params.path == 'step' || this.$route.params.path == 'mixparlay'){
                obj = []
              }
            }
            var backup = this.oldnotlive.data.data;
            var array2 = obj;
              
            backup.forEach(item => {
            item.tournament[1] = item.tournament[1].toUpperCase();
          });
          
          backup.map(item => {
              if (item.tournament[1].includes("BOOKING")) {
                  item.math = true;
                  return item;
              }
          });
  
          var array1 = backup.filter(item => item.math == true);
          
  
          for (var i = 0; i < array1.length; i++) {
              if (array1[i].tournament[1].charAt(0) === '*') {
                  array1[i].tournament[1] = array1[i].tournament[1].replace(/^\*/, '');
              }
          }

  
          // array1.forEach(item1 => {
          //   if (match) {
          //     if(match.web_id != item1.web_id){
          //       item1.pair_league[3] = match.pair_league[3];
          //     }
          //   }
          // });

          // for (let i = 0; i < backup.length; i++) {
          //   let currentTournament = backup[i].tournament[3];
          //   if (!currentTournament.includes(' - ลูกเตะมุม')) {
          //     backup[i].sortmain = true;
          //     }
          // }



        for (let index = 0; index < backup.length; index++) {
          // for (let i = 0; i < backup[index].data.length; i++) {
            let item = backup[index];
            if(item.setting_w_b_l[0]){
              if (item.setting_w_b_l[0][5] != 1 && item.setting_w_b_l[0][5] != 0) {
                arrayData.push(item);
              }
            }
            if (this.numbertpye != 5 && this.numbertpye != 8) {
              if (item.some_other_value != 0 ) { 
                if(item.setting_w_b_l[0]){
                  if(item.setting_w_b_l[0][2] != 0){
                    arrayData.push(item);
                  }
                }
              }
            } else {
              if (item.setting_w_b_l[0] && item.setting_w_b_l[0][5] != 0) {
                arrayData.push(item);
              }
            }
          // }
        }

          for (let i = 0; i < arrayData.length; i++) {
            if(arrayData[i].tournament[3]){
              let currentTournament = arrayData[i].tournament[3];
              if (!currentTournament.includes(' - ลูกเตะมุม') || !currentTournament.includes(' - ใบเหลือง-แดง')) {
                 arrayData[i].sortmain = true;
              }
              if (currentTournament.includes(' - ลูกเตะมุม')) {
                let cleanName = currentTournament.replace(' - ลูกเตะมุม', '');
                for (let j = 0; j < arrayData.length; j++) {
                  if (arrayData[j].tournament[3] === cleanName && arrayData[j].sortmain === true){
                    arrayData[i].sortleague = arrayData[j].pair_league[3].slice(0, -2) + 'BB';
                    arrayData[i].sortleague = arrayData[j].sortleague.slice(0, -2) + 'BB';
                    break;
                  }
                }
              }

              if (currentTournament.includes(' - ใบเหลือง-แดง')) {
                let cleanName = currentTournament.replace(' - ใบเหลือง-แดง', '');
                for (let j = 0; j < arrayData.length; j++) {
                  if (arrayData[j].tournament[3] === cleanName && arrayData[j].sortmain === true){                    
                    arrayData[i].sortleague = arrayData[j].pair_league[3].slice(0, -2) + 'CC';
                    arrayData[i].sortleague = arrayData[j].sortleague.slice(0, -2) + 'CC';
                    break;
                  }
                }
              }
            }
          }

          if(this.getselectleague.sortBy != 'SortByTime'){
            return arrayData.reduce((group, match) => {
              var sport_type_id 
              sport_type_id = match.tournament[0];
              group[sport_type_id] = group[sport_type_id] ?? [];
              group[sport_type_id].push(match);
              return group;
            }, {});
          }else{
            return arrayData.reduce((group, match) => {
              var sport_type_id 
              sport_type_id = match.source_event_id;
              group[sport_type_id] = group[sport_type_id] ?? [];
              group[sport_type_id].push(match);
              return group;
            }, {});
          }
            // return arrayData.reduce((group, match) => {
            //     var sport_type_id 
            //     sport_type_id = match.tournament[0];
            //     group[sport_type_id] = group[sport_type_id] ?? [];
            //     group[sport_type_id].push(match);
            //     return group;
            // }, {});
        },
      setDataNonLive() {
        let array = []
        let array2 = []
        let arrayData = []
        if (this.nonLiveData.data.data.length == 0) {
          return [];
        }else{
  
          for (let index = 0; index < this.setDataNonLive3.length; index++) {
          for (let i = 0; i < this.setDataNonLive3[index].data.length; i++) {
            let item = this.setDataNonLive3[index].data[i];
            if(item.setting_w_b_l[0]){
              if (item.setting_w_b_l[0][5] != 1 && item.setting_w_b_l[0][5] != 0) {
                arrayData.push(item);
              }
            }
            if (this.numbertpye != 5 && this.numbertpye != 8) {
              if (item.some_other_value != 0 ) { 
                if(item.setting_w_b_l[0]){
                  if(item.setting_w_b_l[0][2] != 0){
                    arrayData.push(item);
                  }
                }
              }
            } else {
              if (item.setting_w_b_l[0] && item.setting_w_b_l[0][5] != 0) {
                arrayData.push(item);
              }
            }
          }
        }
  
          if (localStorage.getItem('filterSport')) {
              let obj = localStorage.getItem('filterSport').split(",");
              let live = { data: { data: [] } }
              live.data.data = this.nonLiveData.data.data.filter(a2 => obj.find(a1 => a1 == a2.tournament[0]))
              var wbl_a = { data: { data: [] } }
               wbl_a.data.data = live.data.data.filter(f => {
                if(f.setting_w_b_l[0]) {
                  if(f.setting_w_b_l[0][this.numbertpye] == 1){
                   return f.setting_w_b_l[0][this.numbertpye]
                  }
                }
               })
  
              array = this.sortData(this.mapData(wbl_a)).reduce((acc, item) => {
                const key = item.tournament.tournament_id+[`${item.web_id}`];
                if (!acc[key]) {
                  acc[key] = [];
                }
                acc[key].push(item);
                return acc;
              }, {});
              for (const data in array) {
                  array[data][0].newLeague = true
                  array[data][0].showTable = 'false'
  
                  for (let i = 0; i < array[data].length; i++) {
                    array2.push(array[data][i])
                  }
                }
  
                // var newNumber = '1'
                var newNumber = '1'
                array2.forEach((item) => {
                    if(item.tournament[1].substring(0, 2) == 'E-'){
                      item.sort_order = [`${'XX'}`]+item.sort_order
                    }else if(item.tournament.sport_type.id == 6){
                      item.sort_order = [`${'YY'}`]+item.sort_order
                    }else{
                      item.sort_order = newNumber + item.sort_order.slice(1);
                    }
                });
                  array2.sort((a, b) => {
                      if (a.sort_order < b.sort_order) {
                          return -1;
                      }
                      if (a.sort_order > b.sort_order) {
                          return 1;
                      }
                      return 0;
                  });
                if(this.MoreBetID){
                array2.filter(f=> {
                  if(f.event_id == this.MoreBetID){
                    f.moreBet = 'open'
                  }
                } )
                }
                if(this.collapse_All_Non == false){
                      array2 = array2.map(({collapse, ...rest}) => rest);
                      this.collapse_ID = []
                      this.collapse_All_Non = null
                }else{
                  array2 = this.collapseTable(array2 ,this.collapse_ID ,this.collapse_All_Non)
                }
                let macth = 0
                let count = 0
                array2.map(item =>{
  
                  if (macth != item.event_id) {
                      macth = item.event_id
                      count++
                  }
                  item.count_match = count
                  return item
                })
                return array2
            }else{
                  // this.nonLiveData.data.data.sort((a, b) => {
                  //       if (a.sort_order < b.sort_order) {
                  //           return -1;
                  //       }
                  //       if (a.sort_order > b.sort_order) {
                  //           return 1;
                  //       }
                  //       return 0;
                  //   });
                  var wbl_a = { data: { data: [] } }
                  wbl_a.data.data = arrayData.filter(f => {
                    if(f.setting_w_b_l[0]){
                      if(f.setting_w_b_l[0][this.numbertpye] == 1){
                        return f.setting_w_b_l[0][this.numbertpye]
                      }
                    }
                  })
                  array = this.sortData(this.mapData(wbl_a)).reduce((acc, item) => {
                  var key
                   if(item.pair_league[0] == true){
                     key = item.pair_league[1];
                   }else{
                     key = item.tournament.tournament_id+[`${item.web_id}`];
                   }
                  if (!acc[key]) {
                    acc[key] = [];
                  }
                  acc[key].push(item);
                  return acc;
                }, {});
                var sort_data  = []
                for (const data in array) {                
                  sort_data = array[data].sort((a, b) => {
                    // if(a.tournament[1].includes('BOOKING') || a.tournament[1].includes('CORNERS')){         
                    //   if (a.sortleague < b.sortleague) {
                    //       return -1;
                    //   }
                    //   if (a.sortleague > b.sortleague) {
                    //       return 1;
                    //   }
                    //   return 0;
                    // }else{
                      if (a.pair_league[3] < b.pair_league[3]) {
                          return -1;
                      }
                      if (a.pair_league[3] > b.pair_league[3]) {
                          return 1;
                      }
                      return 0;
                    // }
                  });                
                  sort_data[0].showTable = 'false'
                  sort_data[0].newLeague = true
                  for (let i = 0; i < sort_data.length; i++) {
                    array2.push(sort_data[i])
                  }
                }
                   var newNumber = '1'
                   array2.forEach((item) => {
                      if(item.tournament[1].substring(0, 2) == 'E-'){
                        item.pair_league[3] = [`${'XX'}`]+item.pair_league[3]
                      }
                      if(item.tournament.sport_type.id == 2){
                        item.pair_league[3] = [`${'YY'}`]+item.pair_league[3]
                      }
                      if(item.tournament.sport_type.id == 6){
                        item.pair_league[3] = [`${'ZZ'}`]+item.pair_league[3]
                      }
                   });                             
                      array2.sort((a, b) => {
                        if(a.web_id == 5){
                          if (a.pair_league[2]+[`${a.web_id}`] < b.pair_league[2]+[`${b.web_id}`]) {
                              return -1;
                          }
                          if (a.pair_league[2]+[`${a.web_id}`] > b.pair_league[2]+[`${b.web_id}`]) {
                              return 1;
                          }
                          return 0;
                        }else{
                          if (a.pair_league[3]+[`${a.web_id}`] < b.pair_league[3]+[`${b.web_id}`]) {
                              return -1;
                          }
                          if (a.pair_league[3]+[`${a.web_id}`] > b.pair_league[3]+[`${b.web_id}`]) {
                              return 1;
                          }
                          return 0;
                        }
                      });
                    if(this.MoreBetID){
  
                      array2.filter(f=> {
                        if(f.event_id == this.MoreBetID){
                          f.moreBet = 'open'
                        }
                      } )
                    }
                    if(this.collapse_All_Non == false){
                          array2 = array2.map(({collapse, ...rest}) => rest);
                          this.collapse_ID = []
                          this.collapse_All_Non = null
                    }else{
                      array2 = this.collapseTable(array2 ,this.collapse_ID ,this.collapse_All_Non)
                    }
                    let macth = 0
                    let count = 0
                    array2.map(item =>{
  
                      if (macth != item.event_id) {
                          macth = item.event_id
                          count++
                      }
                      item.count_match = count
                      return item
                    })
              this.sortPriceGroups(array2);
              // array2.forEach(obj => {
              //     obj.odds.sort((a, b) => a.sort_row - b.sort_row);
              // });
              return array2
          }
        }
      },
      setDataEarly2() {
          if (this.earlyData.data.data.length == 0) {
            return [];
          }
          let arrayData = []
          var live = this.earlyData.data.data
            var backup = this.oldearly.data.data;
            // var array2 = live;
              
          //   backup.forEach(item => {
          //   item.tournament[1] = item.tournament[1].toUpperCase();
          // });
          
          backup.map(item => {
              if (item.tournament[1].includes("BOOKING")) {
                  item.math = true;
                  return item;
              }
          });
  
          var array1 = backup.filter(item => item.math == true);
          
  
          for (var i = 0; i < array1.length; i++) {
              if (array1[i].tournament[1].charAt(0) === '*') {
                  array1[i].tournament[1] = array1[i].tournament[1].replace(/^\*/, '');
              }
          }


        for (let index = 0; index < backup.length; index++) {
            let item = backup[index];
            if(item.setting_w_b_l[0]){
              if (item.setting_w_b_l[0][5] != 1 && item.setting_w_b_l[0][5] != 0) {
                arrayData.push(item);
              }
            }
            if (this.numbertpye != 5 && this.numbertpye != 8) {
              if (item.some_other_value != 0 ) { 
                if(item.setting_w_b_l[0]){
                  if(item.setting_w_b_l[0][2] != 0){
                    arrayData.push(item);
                  }
                }
              }
            } else {
              if (item.setting_w_b_l[0] && item.setting_w_b_l[0][5] != 0) {
                arrayData.push(item);
              }
            }
        }

          for (let i = 0; i < arrayData.length; i++) {
            if(arrayData[i].tournament[3]){
              let currentTournament = arrayData[i].tournament[3];
              if (currentTournament.includes(' - ลูกเตะมุม')) {
                 arrayData[i].sortleague = arrayData[i].sortleague.slice(0, -2) + 'BB';
              }
            }
          }
  
            return arrayData.reduce((group, match) => {
                var sport_type_id 
                sport_type_id = match.tournament[0];
                group[sport_type_id] = group[sport_type_id] ?? [];
                group[sport_type_id].push(match);
                return group;
            }, {});
            // }
        },

        setDataEarly3(){
          let array = []
          
          for (const array2 in this.setDataEarly2) {
  
            let data = this.setDataEarly2[array2].sort((a, b) => b.real_kickoff_time.localeCompare(a.real_kickoff_time));
            let date = moment(new Date(data[0].real_kickoff_time)).format("YYYY-MM-DD") > moment(new Date(data[data.length-1].real_kickoff_time)).format("YYYY-MM-DD") ? data[0].real_kickoff_time : data[data.length-1].real_kickoff_time
            array.push({
              id: array2,
              data: data,
              index: array.length,
              status : true,
              tournament_th : data[0].tournament.name_th,
              tournament_en : data[0].tournament.name_en,
              sortleague : data[0].pair_league[0] ==  true ? data[0].pair_league[3] : data[0].sortleague,
              sport_type : data[0].pair_league[4],
              real_kickoff_time : date
            });
            }
  
            var newNumber = '1'
            array.forEach((item) => {
                item.moreBet = 'open'
                item.data[0].newLeague = true
                if(item.data[0].tournament[1].substring(0, 2) == 'E-'){
                  item.sortleague = [`${'ZZ'}`]+item.sortleague
                }else if(item.sport_type == 3){
                  item.sortleague = [`${'ASBO'}`]+item.sortleague
                }else if(item.sport_type == 10){
                  item.sortleague = [`${'BIBC'}`]+item.sortleague
                }else if(item.sport_type == 2){
                  item.sortleague = [`${'CAPI'}`]+item.sortleague
                }else{
                item.sortleague = newNumber + item.sortleague.slice(1);
                }
            });


            var arrayfilter = []
            if (localStorage.getItem('filterSport')) {
              let obj = localStorage.getItem('filterSport').split(",");
              arrayfilter = array.filter(a2 => obj.find(a1 => a1 == a2.id))
            }else{
              arrayfilter = array
            }
  
             arrayfilter.sort((a, b) => {
               let an = a.sortleague 
               let bn = b.sortleague 
  
                 if (an > bn) {
                   return 1;
                 }
                 if (an < bn) {
                   return -1;
                 }
                 return 0;
               });

               if(this.getselectleague.sortBy == 'SortByTime'){
                 const collection = collect(arrayfilter).sortBy((match) => {
                    return moment(match.real_kickoff_time).format('X')
                  })          
                  var newgroupArray =  collection.all() 
                  return newgroupArray.slice(0, this.length_load)
               }else{
                  return arrayfilter.slice(0, this.length_load)
               }
  
        },

      setDataEarly() {
        let array = []
        let array2 = []
        if (this.earlyData.data.data.length == 0) {
          return [];
        }else{
              if (localStorage.getItem('filterSport')) {
                  let obj = localStorage.getItem('filterSport').split(",");
                  let early = { data: { data: [] } }
                  early.data.data = this.earlyData.data.data.filter(a2 => obj.find(a1 => a1 == a2.tournament[0]))
                  var wbl_a = { data: { data: [] } }
                  wbl_a.data.data = early.data.data.filter(f => {
                    if(f.setting_w_b_l[0]) {
                      if(f.setting_w_b_l[0][this.numbertpye] == 1){
                      return f.setting_w_b_l[0][this.numbertpye]
                      }
                    }
                  })
                  array = this.sortData(this.mapData(wbl_a)).reduce((group, match) => {
                    const sport_type_id = match.tournament.tournament_id+[`${match.web_id}`];
                    group[sport_type_id] = group[sport_type_id] ?? [];
                    group[sport_type_id].push(match);
                    return group;
                  }, {});
                  for (const data in array) {
                      array[data][0].newLeague = true
                      array[data][0].showTable = 'false'
  
                      for (let i = 0; i < array[data].length; i++) {
                        array2.push(array[data][i])
                      }
                    }
                    var newNumber = '1'
                    array2.forEach((item) => {
                        item.sortleague = newNumber + item.sortleague.slice(1);
                    });
                    array2.sort((a, b) => {
                        if (a.sortleague < b.sortleague) {
                            return -1;
                        }
                        if (a.sortleague > b.sortleague) {
                            return 1;
                        }
                        return 0;
                    });
                    if(this.collapse_All_Early == false){
                      array2 = array2.map(({collapse, ...rest}) => rest);
                      this.collapse_ID = []
                      this.collapse_All_Early = null
                    }else{
                      array2 = this.collapseTable(array2 ,this.collapse_ID ,this.collapse_All_Early)
                    }
                    let macth = 0
                    let count = 0
                    array2.map(item =>{
  
                      if (macth != item.event_id) {
                          macth = item.event_id
                          count++
                      }
                      item.count_match = count
                      return item
                    })
                    return array2
                }else{
  
                  this.earlyData.data.data.sort((a, b) => {
                    if (a.sort_order < b.sort_order) {
                      return -1;
                    }
                    if (a.sort_order > b.sort_order) {
                      return 1;
                      }
                    return 0;
                  });
                    var wbl_a = { data: { data: [] } }
                    wbl_a.data.data = this.earlyData.data.data.filter(f => {
                      if(f.setting_w_b_l[0][this.numbertpye]){
                        if(f.setting_w_b_l[0][this.numbertpye] == 1){
                          return f.setting_w_b_l[0][this.numbertpye]
                        }
                      }
                    })
                    array = this.sortData(this.mapData(wbl_a), 'early').reduce((group, match) => {
                    const sport_type_id = match.tournament.tournament_id+[`${match.web_id}`];
                    group[sport_type_id] = group[sport_type_id] ?? [];
                    group[sport_type_id].push(match);
                    return group;
                  }, {});
                  for (const data in array) {
                    array[data][0].showTable = 'false'
                    array[data][0].newLeague = true
                    for (let i = 0; i < array[data].length; i++) {
                      array2.push(array[data][i])
                    }
                  }
                  var newNumber = '1'
                    array2.forEach((item) => {
                        item.sortleague = newNumber + item.sortleague.slice(1);
                    });
                  array2.sort((a, b) => {
  
                          if (a.sortleague < b.sortleague) {
                              return -1;
                          }
                          if (a.sortleague > b.sortleague) {
                              return 1;
                          }
                          return 0;
                  });
  
                    if(this.collapse_All_Early == false){
                      array2 = array2.map(({collapse, ...rest}) => rest);
                      this.collapse_ID = []
                      this.collapse_All_Early = null
                    }else{
                      array2 = this.collapseTable(array2 ,this.collapse_ID ,this.collapse_All_Early)
                    }
                        let macth = 0
                        let count = 0
                        array2.map(item =>{
  
                          if (macth != item.event_id) {
                              macth = item.event_id
                              count++
                          }
                          item.count_match = count
                          return item
  
                        })
                  this.sortPriceGroups(array2);
                  return array2
            }
        }
      },
    },
    methods: {
      ...mapActions({
        setAllEventsToState: "favorite/setAllEventsToState",
        insertFavorite: "favorite/insertFavorite",
        hideAds : "ads/hideAds"
      }),
      trdatarow(item){
        return item
      },
      checksetting_w_b_l(setData){
        let arrayData = []
        for (let index = 0; index < setData.length; index++) {
            let item = setData[index];
            if(item.setting_w_b_l[0]){
              if (item.setting_w_b_l[0][5] != 1 && item.setting_w_b_l[0][5] != 0) {
                arrayData.push(item);
              }
            }
            if (this.numbertpye != 5 && this.numbertpye != 8) {
              if (item.some_other_value != 0 ) { 
                if(item.setting_w_b_l[0]){
                  if(item.setting_w_b_l[0][2] != 0){
                    arrayData.push(item);
                  }
                }
              }
            } else {
              if (item.setting_w_b_l[0] && item.setting_w_b_l[0][5] != 0) {
                arrayData.push(item);
              }
            }
          // }
        }

        if(arrayData.length != 0){
          return setData
        }
      },
      tableClass(status){
        if(status == 'live'){
          return "table-live"
        }else if(status == "nonLive"){
          return "table-notlive"
        }else if(status == "early"){
          return "table-early"
        }
      },
      sortArrayByPosition3(array) {
        return array.sort((a, b) => a[7] - b[7]);
      },
      sortArrayRow(array) {
        return array.sort((a, b) => a.sort_row - b.sort_row);
      },
      sortPriceGroups(dataArray) {
      const sortedData = dataArray.map(item => {
          const sortedPriceGroups = {};
          Object.keys(item.priceGroups).forEach(group => {
              sortedPriceGroups[group] = this.sortArrayByPosition3(item.priceGroups[group]);
              sortedPriceGroups[group] = this.sortArrayRow(item.priceGroups[group])
          });
          return { ...item, priceGroups: sortedPriceGroups };
      });
      return sortedData;
      },
      async getPusher(data){
        var front = this.getselectleague.sortTime.substring(0, 2);
        let getSortTime = front == '23' ? 'after' : front == '06' ? 'before' : 'all';
  
         var live2 = await this.$axios.get(
           "/event/sc/nokey/get-live-odds_nonfullload",
           {
             params: {'sport_type_id' : '1' , 'odds_type' : 'MY', nav: "side-menu" , 'event_id' : data.toString(), 'sortTime':getSortTime}
           }
         );
        const array = this.newData(live2)
        const obj = { data: { data: [] } }
        obj.data.data = this.liveData.data.data
         array.data.data.forEach(element => {
           var itemIndex = obj.data.data.findIndex(item => item.event_id == element.event_id)
           var item = obj.data.data[itemIndex]
           item = element
           obj.data.data[itemIndex] = item
  
         });
        this.liveData = obj
      },
      MoreBet(event, type = 'nonLive'){
          console.log('event',event);
          var obj = this[type+'Data'].data.data;
          
          this.moreTrue = obj.filter(f => f.moreBet == 'open' )
          if(this.moreTrue.length == 0){
            obj.filter(f => { f.moreBet = f.event_id === event.event_id ? 'open' : null});
            this[type+'Data'] = { data: { data: obj } };
          }else{
            obj.filter(f => { f.moreBet = f.event_id === event.event_id ? f.moreBet == 'open' ? null : 'open' : null});
            this[type+'Data'] = { data: { data: obj } };
          }
  
      },
      MoreCollapse(event ,type){    
         var obj = this[type+'Data'].data.data;
         if(this.collapse_ID.length == 0){
           obj.filter(f => { f.collapse = f.tournament.tournament_id === event.tournament.tournament_id ? 'open' : null});
           this[type+'Data'] = { data: { data: obj } };
           this.collapse_ID.push(event.tournament.tournament_id)
         }else{
          var isMatchingEventId = this.collapse_ID.includes(event.tournament.tournament_id);
          if(isMatchingEventId == false){
            this.collapse_ID.push(event.tournament.tournament_id)
            var updatedData2 = obj.map(item => {
              if (this.collapse_ID.includes(item.tournament.tournament_id)) {
                return { ...item, collapse: 'open' };
              }
              return item;
            });          
            this[type+'Data'] = { data: { data: updatedData2 } };
          }else{
            var updatedData2 = obj.map(item => {
              if (item.tournament.tournament_id === event.tournament.tournament_id) {
                const { collapse, ...rest } = item;
                return rest;
              }
              return item;
            });
            this[type+'Data'] = { data: { data: updatedData2 } };
            this.collapse_ID = this.collapse_ID.filter(item => item !== event.tournament.tournament_id);
          }
        }
      },
      sortData(mapData ,type) {
        if (this.getselectleague.sortBy == "SortByTime") {
          return mapData.sort((a, b) => {
            return new Date(b.show_time) - new Date(a.show_time);
          });
        }
        if (this.getselectleague.sortTime != "Allmatch") {
          var front = this.getselectleague.sortTime.substring(0, 2);
          var back = this.getselectleague.sortTime.substring(6, 8);
          return mapData;
          if(type != 'live'){
              if(type == 'early'){
                var dates = this.$auth.$storage.getUniversal('date')
                var newdate = dates.split("/").reverse().join("-");
                const last2 = newdate.slice(-2)
                var sub = newdate.substring(0, 8)
                var pushs = parseInt(last2) + 1
  
                if(front == '23'){
                  var datasort1 = mapData.filter(f => {
                    if(f.real_kickoff_time.substring(0, 10) == sub+pushs){
                      var today = moment(new Date(f.real_kickoff_time)).format(
                        "YYYY-MM-DD"
                        );
                      return (
                          new Date(f.real_kickoff_time) < new Date(today + "T" + '10' + ":59:59")
                      );
                    }
                  });
  
                  var datasort2 = mapData.filter(f => {
                    if(f.real_kickoff_time.substring(0, 10) == newdate){
                      var today = moment(new Date(f.real_kickoff_time)).format(
                        "YYYY-MM-DD"
                        );
                      return (
                          new Date(f.real_kickoff_time) >= new Date(today + "T" + '23' + ":00:00")
                      );
                    }
                  });
  
                  var newEarly = datasort1.concat(datasort2);
                  return newEarly == [] ? [] : newEarly;
                }else{
                      var datasort = mapData.filter(f => {
                        if(f.real_kickoff_time.substring(0, 10) == newdate){
                          var today = moment(new Date(f.real_kickoff_time)).format(
                            "YYYY-MM-DD"
                            );
                          return (
                              new Date(f.real_kickoff_time) >= new Date(today + "T" + '11' + ":00:00") && new Date(f.real_kickoff_time) <= new Date(today + "T" + '23' + ":00:00")
                          );
                        }
                      });
                      return datasort == [] ? [] : datasort;
                }
            }else{
              if(front == '23'){
              var datasort = mapData.filter(f => {
                var today = moment(new Date(f.real_kickoff_time)).format(
                  "YYYY-MM-DD"
                );
                return (
                    new Date(f.real_kickoff_time) < new Date(today + "T" + back + ":59:59") || new Date(f.real_kickoff_time) >= new Date(today + "T" + front + ":00:00")
                );
              });
              return datasort == [] ? [] : datasort;
  
              }else{
                var datasort = mapData.filter(f => {
                var today = moment(new Date(f.real_kickoff_time)).format(
                  "YYYY-MM-DD"
                );
  
                return (
                  new Date(f.real_kickoff_time) >= new Date(today + "T" + front + ":00:00") && new Date(f.real_kickoff_time) <= new Date(today + "T" + back + ":00:00")
                );
              });
              return datasort == [] ? [] : datasort;
              }
            }
          }else{
              return mapData
          }
  
        } else {
          if(this.oldObj.length != 0){
              mapData.filter(a2 =>
                this.oldObj.find(a1 => {
                  if(a1.event_id === a2.event_id) {
                    a2.moreBet = true
                  }
                })
              );
          }
          return mapData;
        }
      },
      priceGroups(odds) {
        return odds.reduce((group, match) => {
          group[match.market_type] = group[match.market_type] ?? [];
          group[match.market_type].push(match);
          return group;
        }, Object.create(null));
      },
      mapData(dataType) {
          return dataType.data.data.map((match, index) => {
  
          // match.newLeague = index == 0 ||dataType.data.data[index - 1].tournament.tournament_id != match.tournament.tournament_id;
          match.newLeague = false
          match.priceGroups = this.priceGroups(match.odds);
          match.priceRow = Math.max(
            match.priceGroups.Handicap == undefined  ? 0 : match.priceGroups.Handicap.length,
            match.priceGroups.OverUnder == undefined   ? 0  : match.priceGroups.OverUnder.length,
            match.priceGroups.FH_Handicap == undefined  ? 0  : match.priceGroups.FH_Handicap.length,
            match.priceGroups.FH_OverUnder == undefined  ? 0  : match.priceGroups.FH_OverUnder.length
          );
  
          return match;
        });
      },
      async fetchgetnonLive(type , start) {
  
        var front = this.getselectleague.sortTime.substring(0, 2);
        let getSortTime = front == '23' ? 'after' : front == '06' ? 'before' : 'all';
        // Allmatch ,  หลัง => 23 ,  ก่อน => 06
        var price = this.$auth.$storage.getUniversal('price')
        if(this.oldPriceNonLive == null){
          this.oldPriceNonLive = price
        }else{
          if(this.oldPriceNonLive != price){
            this.oldPriceNonLive = price
            let sport_type_id = this.navSide == 'top-menu' && this.navpart != 'today' ? null : '1'
            var setData 
            if(this.$route.params.path != 'step' && this.$route.params.path != 'mixparlay'){
              setData = {'sport_type_id' : sport_type_id , 'odds_type' : type != 'sc' ? 'EU' : price, nav: this.navSide , 'sortTime':getSortTime}
            }else{
              setData = {'sport_type_id' : sport_type_id , 'odds_type' : type != 'sc' ? 'EU' : price, nav: this.navSide , 'sortTime':getSortTime , 'date' : this.date}
            }
            var nonlivedata = await this.$axios.get(
              "/event/"+type+"/nokey/get-nonlive-odds" ,
              {
                params: setData
              }
            );
            this.data_change_id_non  = nonlivedata.data.change_id
            var newArray = this.newData(nonlivedata)
            this.nonLiveData = newArray
            this.oldnotlive = newArray
            return
          }
        }
        var route_path
        if(this.$route.params.path == 'step'){
           route_path = 'step'
        }else if(this.$route.params.path == 'mixparlay'){
           route_path = 'mix'
        }else{
          route_path = 'sc'
        }
        if(start == 'start'){
          this.loading = true
          let sport_type_id = this.navSide == 'top-menu' && this.navpart != 'today' ? null : '1'
          if(this.$route.params.path != 'step' && this.$route.params.path != 'mixparlay'){
              setData = {'sport_type_id' : sport_type_id , 'odds_type' : type != 'sc' ? 'EU' : price, nav: this.navSide ,'sortTime':getSortTime}
            }else{
              setData = {'sport_type_id' : sport_type_id , 'odds_type' : type != 'sc' ? 'EU' : price, nav: this.navSide ,'sortTime':getSortTime , 'date' : this.date}
            }
          var nonlivedata = await this.$axios.get(
            "/event/"+type+"/nokey/get-nonlive-odds" ,
            {
              params: setData
            }
          );
          this.data_change_id_non  = nonlivedata.data.change_id
          var newArray = this.newData(nonlivedata)
          this.nonLiveData = newArray
          this.oldnotlive = newArray
          this.oldnotlive2 = newArray
          this.loading = false
        }else{
          if(this.data_change_id_non){
            if(route_path == 'step' || route_path == 'mix'){
              price = 'EU'
            }
          let response = await this.$axios.get("event/"+route_path+"/nokey/get-nonlive-odds_nonfullload?sport_type_id=1&odds_type="+price+"&change_id=" + this.data_change_id_non + "&sortTime="+getSortTime);
             this.data_change_id_non = response.data.change_id
             const teamleague = { data: { data: [] } }
             var array = this.nonLiveData.data.data
             var anotherOne = response.data.data
             var close_league_not = []
             close_league_not = response.data.event_close_id   
              anotherOne.forEach(element => {
                var findIndex = array.findIndex((el) => {
                   return el.event_id == element[0]
                })
                if(findIndex === -1){
                  array.push(this.addKeyArray(element))
                 }else{
                 array[findIndex] = this.addKeyArray(element)
                }
                });
              if(close_league_not.length != 0){
                // array = array.filter(ar => !close_league_not.find(rm => (rm === ar.event_id) ))
                // array = array.filter(item => {
                //   return !close_league_not.includes(item.event_id)
                // });
                if(Array.isArray(close_league_not)){
                  array = array.filter(item => {
                     return !close_league_not.includes(item.event_id)
                   });
                }else{
                  var newObj = Object.values(close_league_not)
                  array = array.filter(item => {
                     return !newObj.includes(item.event_id)
                   });
                }
              }
          if (this.liveData.data.data.length != 0) {
            array = array.filter(ar => !this.liveData.data.data.find(rm => (rm.event_id === ar.event_id) ))
          }
             teamleague.data.data = array
              this.nonLiveData = teamleague;
              this.oldnotlive = teamleague;
          }else{
            let sport_type_id = this.navSide == 'top-menu' && this.navpart != 'today' ? null : '1'
            var nonlivedata = await this.$axios.get(
            "/event/"+type+"/nokey/get-nonlive-odds" ,
            {
              params: {'sport_type_id' : sport_type_id , 'odds_type' : type != 'sc' ? 'EU' : price, nav: this.navSide ,'sortTime':getSortTime}
            }
          );
          this.data_change_id_non  = nonlivedata.data.change_id
          var newArray = this.newData(nonlivedata)
          this.nonLiveData = newArray
          this.oldnotlive = newArray
          }
        }
      },
      async fetchgetLive(type , start) {
        var front = this.getselectleague.sortTime.substring(0, 2);
        let getSortTime = front == '23' ? 'after' : front == '06' ? 'before' : 'all';
  
        var price = this.$auth.$storage.getUniversal('price')
        if(this.oldPriceLive == null){
          this.oldPriceLive = price
        }else{
          if(this.oldPriceLive != price){
            this.oldPriceLive = price
            let sport_type_id = this.navSide == 'top-menu' && this.navpart != 'today' ? null : '1'
            var setData 
            if(this.$route.params.path != 'step' && this.$route.params.path != 'mixparlay'){
              setData = {'sport_type_id' : sport_type_id , 'odds_type' : type != 'sc' ? 'EU' : price, nav: this.navSide, 'sortTime':getSortTime}
            }else{
              setData = {'sport_type_id' : sport_type_id , 'odds_type' : type != 'sc' ? 'EU' : price, nav: this.navSide, 'sortTime':getSortTime , 'date' : this.date}
            }
            var live = await this.$axios.get(
            "/event/"+type+"/nokey/get-live-odds" ,
            {
              params: setData
            }
          );
                this.data_change_id  = live.data.change_id
                var newArray = this.newData(live)
                this.liveData = newArray
                this.oldlive = newArray
            return
          }
        }
        var route_path
        if(this.$route.params.path == 'step'){
           route_path = 'step'
        }else if(this.$route.params.path == 'mixparlay'){
           route_path = 'mix'
        }else{
          route_path = 'sc'
        }
        if(start == 'start' ){
          this.loading = true
          let sport_type_id = this.navSide == 'top-menu' && this.navpart != 'today' ? null : '1'
          var setData 
          if(this.$route.params.path != 'step' && this.$route.params.path != 'mixparlay'){
            setData = {'sport_type_id' : sport_type_id , 'odds_type' : type != 'sc' ? 'EU' : price, nav: this.navSide, 'sortTime':getSortTime}
          }else{
            setData = {'sport_type_id' : sport_type_id , 'odds_type' : type != 'sc' ? 'EU' : price, nav: this.navSide, 'sortTime':getSortTime , 'date' : this.date}
          }
          var live = await this.$axios.get(
            "/event/"+type+"/nokey/get-live-odds" ,
            {
              params: setData
            }
          );
                this.data_change_id  = live.data.change_id
                var newArray = this.newData(live)
                this.liveData = newArray
                this.oldlive = newArray;
                this.oldlive2 = newArray
          this.loading = false
        } else {
          if (this.data_change_id) {
              if (route_path == 'step' || route_path == 'mix') {
                  price = 'EU';
              }
              var setData;
              if (this.$route.params.path != 'step' && this.$route.params.path != 'mixparlay') {
                  setData = { 'sport_type_id': "1", 'odds_type': price, 'change_id': this.data_change_id, 'sortTime': getSortTime };
              } else {
                  setData = { 'sport_type_id': "1", 'odds_type': price, 'change_id': this.data_change_id, 'sortTime': getSortTime, 'date': this.date };
              }
              var response = await this.$axios.get(
                  "event/" + route_path + "/nokey/get-live-odds_nonfullload",
                  {
                      params: setData
                  }
              );
              this.data_change_id = response.data.change_id;
              const teamleague = { data: { data: [] } };
              var array = this.liveData.data.data;
              var anotherOne = response.data.data;
              var close_league_live = [];
              close_league_live = response.data.event_close_id;
              anotherOne.forEach(element => {
                  var findIndex = array.findIndex((el) => {
                      return el.event_id == element[0];
                  });
                  if (findIndex === -1) {
                      array.push(this.addKeyArray(element));
                  } else {
                      array[findIndex] = this.addKeyArray(element);
                  }
              });
              if (close_league_live.length != 0) {
                  if (Array.isArray(close_league_live)) {
                      array = array.filter(item => {
                          return !close_league_live.includes(item.event_id);
                      });
                  } else {
                      var newObj = Object.values(close_league_live);
                      array = array.filter(item => {
                          return !newObj.includes(item.event_id);
                      });
                  }
              }
              teamleague.data.data = array;
              this.liveData = teamleague;
              this.oldlive = teamleague;
          } else {
              let sport_type_id = this.navSide == 'top-menu' && this.navpart != 'today' ? null : '1';
              var setData;
              if (this.$route.params.path != 'step' && this.$route.params.path != 'mixparlay') {
                  setData = { 'sport_type_id': sport_type_id, 'odds_type': type != 'sc' ? 'EU' : price, nav: this.navSide, 'sortTime': getSortTime };
              } else {
                  setData = { 'sport_type_id': sport_type_id, 'odds_type': type != 'sc' ? 'EU' : price, nav: this.navSide, 'sortTime': getSortTime, 'date': this.date };
              }
              var live = await this.$axios.get(
                  "/event/" + type + "/nokey/get-live-odds",
                  {
                      params: setData
                  }
              );
              this.data_change_id = live.data.change_id;
              var newArray = this.newData(live);
              this.liveData = newArray;
              this.oldlive = newArray;
          }
      }
      },
       async fetchgetEarly(type) {
  
        var front = this.getselectleague.sortTime.substring(0, 2);
        let getSortTime = front == '23' ? 'after' : front == '06' ? 'before' : 'all';
        
        var price = this.$auth.$storage.getUniversal('price')
        var dates = this.$auth.$storage.getUniversal('date')
  
        // this.earlyData = await this.$axios.get(
        //   "/event/"+type+"/early" ,
        //   {
        //     params: {'sport_type_id' : '1' , 'odds_type' : type != 'sc' ? 'EU' : price}
        //   }
        // );
         let sport_type_id = this.navSide == 'top-menu' ? null : '1'
         var earlydata = await this.$axios.get(
          "/event/"+type+"/nokey/early" ,
          {
            params: {'sport_type_id' : sport_type_id , 'odds_type' : type != 'sc' ? 'EU' : price, 'date' : dates , nav: this.navSide, 'sortTime':getSortTime}
          }
        );
  
        var newdate = dates.split("/").reverse().join("-");
        var arrayDate = this.newData(earlydata)
        const last2 = newdate.slice(-2)
        var sub = newdate.substring(0, 8)
        var pushs = parseInt(last2) + 1
  
         var d = new Date();
         var months
         var month
         d.setMonth(d.getMonth() + 1);
         d.setDate(0);
          if(parseInt(last2) >=  d.getDate()){
            months = d.getMonth() + 2
            var now = new Date();
            var current = new Date(now.getFullYear(), now.getMonth() + 1, 1);
            var datenext = moment(current).format("YYYY-MM-DD");
            month = datenext
          }else{
           if(pushs <= 9 ){
             pushs = '0' + pushs
           }
            month = sub+pushs
          }
            var datasort1 = arrayDate.data.data.filter(f => {
              if(f.real_kickoff_time.substring(0, 10) == month){
                var today = moment(new Date(f.real_kickoff_time)).format(
                  "YYYY-MM-DD"
                  );
                return (
                    new Date(f.real_kickoff_time)
                );
                // return (
                //     new Date(f.real_kickoff_time) <= new Date(today + "T" + '10' + ":59:59")
                // );
              }
            });
  
            var datasort2 = arrayDate.data.data.filter(f => {
              if(f.real_kickoff_time.substring(0, 10) == newdate){
                var today = moment(new Date(f.real_kickoff_time)).format(
                  "YYYY-MM-DD"
                  );
                // return (
                //     new Date(f.real_kickoff_time) >= new Date(today + "T" + '11' + ":00:00")
                // );
                return (
                    new Date(f.real_kickoff_time)
                );
              }
            });
  
        var newEarly = { data: { data: [] } }
         newEarly.data.data = datasort1.concat(datasort2);         
        this.earlyData = dates == 'Allearly'? arrayDate : newEarly
        this.oldearly = dates == 'Allearly'? arrayDate : newEarly
        this.oldearly2 = dates == 'Allearly'? arrayDate : newEarly
  
  
      },
  
      async fetchGetData(type) {
        this.loading = true
  
        let route = this.$route.path.toString();
        this.path = route.substring(10, 20);
        if (this.path == "today") {
          await this.fetchgetLive('sc', type);
          await this.fetchgetnonLive('sc', type);
        } else if (this.path == "live") {
          await this.fetchgetLive('sc', type);
        } else if (this.path == "early") {
          await this.fetchgetEarly('sc', type);
        } else if (this.path == "all") {
          await this.fetchgetLive('sc', type);
          await this.fetchgetnonLive('sc', type);
        } else if(this.path == "mixparlay"){
          await this.fetchgetLive('mix', type);
          await this.fetchgetnonLive('mix', type);
        } else if (this.path == 'step'){
          await this.fetchgetLive('step', type);
          await this.fetchgetnonLive('step', type);
        }
        this.setAllEventsToState([
          ...this.setDataLive,
          ...this.setDataNonLive,
          ...this.setDataEarly
        ])
        this.loading = false
      },
      filternonlive(event) {
        if (this.path == "today" || this.path == "all") {
          const finda1 = this.oldnotlive2.data.data.filter(a2 =>
            event.find(a1 => parseInt(a1.value) === parseInt(a2.tournament.tournament_id))
          );
          if(finda1.length == 0){
            this.nonLiveData = { data: { data: this.oldnotlive2.data.data } };
          }else{
            this.nonLiveData = { data: { data: finda1 } };
          }
        }
      },
      filterearly(event){
        // if (this.path == "early") {
        //   this.earlyData = this.oldearly;
        //   const finda1 = this.setDataEarly.filter(a2 =>
        //     event.find(a1 => a1 === a2.tournament.name_en)
        //   );
        //   this.earlyData = { data: { data: finda1 } };
        // }
        console.log('event--------',event);
        
        if (this.path == "early") {
          const finda1 = this.oldearly2.data.data.filter(a2 =>
            event.find(a1 => parseInt(a1.value) === parseInt(a2.tournament.tournament_id))
          );
          if(finda1.length == 0){
            this.earlyData = { data: { data: this.oldearly2.data.data } };
          }else{
            this.earlyData = { data: { data: finda1 } };
          }
        }
      },
      filterlive(event) {
        // console.log('eventevent',event);
        this.fetchGetData()
        
        // if (this.path == "live" || this.path == "all") {
        //   const finda1 = this.oldlive2.data.data.filter(a2 =>
        //     event.find(a1 => a1.value === a2.tournament.tournament_id)
        //   );
        //   if(finda1.length == 0){
        //     this.liveData = { data: { data: this.oldlive2.data.data } };
        //   }else{
        //     this.liveData = { data: { data: finda1 } };
        //   }
        // }
      },
      loadMore(type) {
        if(type == 'mb'){
          if (this.length_load > this.nonLiveData.data.data.length) return;
          this.length_load = this.length_load + 20;
        }else{
          if(this.$route.params.path == 'early'){
            if (this.length_load > this.earlyData.data.data.length) return;
            this.length_load = this.length_load + 10;
          }else{
            if (this.length_load > this.nonLiveData.data.data.length) return;
            this.length_load = this.length_load + 10;
          }
        }
      },
      handleScroll() {
          if((window.innerHeight + window.scrollY + 500) >= document.body.offsetHeight){
            // if(window.innerWidth >= 600){
              this.loadMore()
            // }
          }
      },
    },
    mounted() {
    // this.initializeFavorites()
    window.addEventListener("scroll", this.handleScroll);
  },
    async created() {
      if(localStorage.getItem('closeBetAll') == '1'){
        this.checkBetAll = true
      }
      if(localStorage.getItem('iframe')){
        this.iframe = localStorage.getItem('iframe')
      }
      if(localStorage.getItem('adsHidden') == 'true'){
          this.hideAds()
      }
      if(localStorage.getItem('iframe-one')){
        this.iframe = localStorage.getItem('iframe-one')
      }
      const  getpart =  this.$route.query.t
      const getSide = this.$route.query.s
      this.navpart = getpart
      this.navSide = getSide ? getSide : 'side-menu'
      if(this.$route.params.path == 'step'){
        this.numbertpye = 5
      }else if(this.$route.params.path == 'mixparlay'){
        this.numbertpye = 8
      }else{
        this.numbertpye = 2
      }
      await this.fetchGetData('start');
      if(localStorage.getItem('favorites')){
        const favorites = JSON.parse(localStorage.getItem('favorites'));
         for (let index = 0; index < favorites.length; index++) {
          var sport = 1
          var event = favorites[index].event
          this.insertFavorite({ sport,event})
         }
      }
    },
    watch:{
      $route(data){
          this.navSide = data.query.s
          this.fetchGetData('start');
      },
      "getselectleague.sortTime"(){
        this.fetchGetData('start');
      },
      getclosebetlist(valuse){
        this.checkBetAll = valuse
      },
      getCollapse(value){   
        if(this.$route.params.path != 'early'){
          if(value.type == 'live'){
           if(value.collapse){
             this.collapse_All_Live = true
           }else{
             this.collapse_All_Live = false
           }
         }else{
           if(value.collapse){
             this.collapse_All_Non = true
           }else{
             this.collapse_All_Non = false
           }
         }
        }else{
          if(value.collapse){
             this.collapse_All_Early = true
           }else{
             this.collapse_All_Early = false
           }
        }
      }
  
  
    }
  };
  </script>

<style scoped>
  .bet-close-table {
    width: 1078px !important;
  }
  .card-center {
    padding: 8px 0px;
  }
  .style-menu {
    /* top: 128px; */
    margin-left: 0px;
    margin-right: -20px;
    z-index: 2;
    display: flex;
    align-items: center;
    height: 38px;
    background: black;
    width: 1076px;
    padding-right: 8px;
  }
  .style-menu-iframe {
    position: sticky;
    top: 68px;
    margin-left: 0px;
    margin-right: -20px;
    z-index: 99;
    display: flex;
    align-items: center;
    height: 38px;
    background: #f1f2f8;
  }
  @media screen and (max-width: 1400px) {
      .bet-close-table {
        width: 949px !important;
      }
      .style-menu{
        width: 791px;
      }

      .style-menu-iframe {
        top: 40px;
      }
  }
  @media only screen and (max-width: 2200px) and (min-width: 1400px)  {
    .top-menu{
      top: 148px;
    }
  }
  @media screen and (max-width: 800px) {
    .top-menu{
      top: 0px;
    }
    .style-menu{
        position: static;
      }
    .style-menu-iframe {
      top: 0px;
    }
}
</style>
