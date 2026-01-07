<template>
  <div>
    <div class="" style="padding: 8px 8px;">
      <div class="card-center bg-black">
      <b-row class="mb-2 style-menu pr-0" :class="{'bet-close-table' : (checkBetAll)}" :style="isAdsHidden ? 'top: 128px;' : 'top: 254px;'" v-if="iframe != '1'">
        <b-col cols="3">
          <div
            is="center2-title"
            type="basketball"
            :live="path == 'live' ? true : false"
            :path="path"
          ></div>
        </b-col>
        <b-col cols="9" class="text-right pr-1">
          <div
            is="center2-select-league-button"
            :displaytable="getselectleague"
            @filterlive="filterlive($event)"
            :loading="loading"
            @refresh="fetchGetData"
            @filternonlive="filternonlive($event)"
            @filterearly="filterearly($event)"
            :oldlive="oldlive"
            :oldnotlive="oldnotlive"
            :getlive="setDataLive"
            :getnotlive="setDataNonLive"
            :getearly="setDataEarly"
            :path="path"
          ></div>
        </b-col>
      </b-row>
      <b-row class="mb-0 mr-0 style-menu-iframe" :class="scY > 0 ? '' : ''" v-else style="margin-top: 75px;">
        <b-col cols="3">
          <div
            is="center2-title"
            type="basketball"
            :live="path == 'live' ? true : false"
            :path="path"
          ></div>
        </b-col>
        <b-col cols="9" class="text-right">
          <div
            is="center2-select-league-button"
            :displaytable="getselectleague"
            @filterlive="filterlive($event)"
            :loading="loading"
            @refresh="fetchGetData"
            @filternonlive="filternonlive($event)"
            @filterearly="filterearly($event)"
            :oldlive="oldlive"
            :oldnotlive="oldnotlive"
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
        <b-col cols="12">
          <div
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
          ></div>
          <div
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
            :setData="setDataEarly"
            :displaytable="getselectleague"
            :loading="loading"
            @fetch="fetchGetData"
          ></div>
        </b-col>
      </b-row>
    </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      loading: false,
      path: "",
      liveData: { data: { data: [] } },
      nonLiveData: { data: { data: [] } },
      earlyData: { data: { data: [] } },
      oldearly: [],
      oldlive: [],
      oldlive2: [],
      oldnotlive: [],
      oldnotlive2 : [],
      oldObj : [],
      moreTrue : [],
      navSide: '',
      numbertpye : null,
      data_change_id : null,
      data_change_id_non : null,
      oldPriceLive : null,
      oldPriceNonLive : null,
      scY: 0,
      scTimer: 0,
      iframe : null,
      checkBetAll : false,
      collapse_ID : [],
      collapse_All_Live : null,
      collapse_All_Non : null,
      collapse_All_Early : null,
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
            return obj.reduce((group, match) => {
                  var sport_type_id 
                  // if(match.pair_league[0] != true){
                  //   sport_type_id = match.pair_league[2];
                  // }else{
                    sport_type_id = match.pair_league[1];
                  // }
                  group[sport_type_id] = group[sport_type_id] ?? [];
                  group[sport_type_id].push(match);
                  return group;
              }, {});
          // }
      },
      setDataLive3(){
        let array = []
        for (const array2 in this.setDataLive2) {

          let data = this.setDataLive2[array2].sort((a, b) => b.real_kickoff_time.localeCompare(a.real_kickoff_time));
          let date = moment(new Date(data[0].real_kickoff_time)).format("YYYY-MM-DD") > moment(new Date(data[data.length-1].real_kickoff_time)).format("YYYY-MM-DD") ? data[0].real_kickoff_time : data[data.length-1].real_kickoff_time
          // var web_3 = data.filter(f => f.web_id == 3)
          array.push({
            id: array2,
            data: data,
            index: array.length,
            status : true,
            sortleague : data[0].pair_league[3],
            sport_type : data[0].pair_league[4],
            real_kickoff_time : date
          });
          }

          var newNumber = '1'
          array.forEach((item) => {
              item.moreBet = 'open'
              // item.data[0].newLeague = true
              // if(item.data[0].tournament[1].substring(0, 2) == 'e-'){
              //   item.sortleague = [`${'ZZ'}`]+item.sortleague
              // }else if(item.sport_type == 3){
              //   item.sortleague = [`${'ASBO'}`]+item.sortleague
              // }else if(item.sport_type == 10){
              //   item.sortleague = [`${'IBC'}`]+item.sortleague
              // }else{
              item.sortleague = newNumber + item.sortleague.slice(1);
              // }
          });


          array.sort((a, b) => {
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

        array.forEach((item ) => {
            item.data.sort((a, b) => {
              let aParts = a.sort_order.split('-').map(Number);
            let bParts = b.sort_order.split('-').map(Number);

              for (let i = 0; i < aParts.length; i++) {
                  if (aParts[i] !== bParts[i]) {
                      return aParts[i] - bParts[i];
                  }
              }

            return 0;
            })
            });
          return array

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
          // ตรวจสอบค่า setting_w_b_l[0][5]
          if(item.setting_w_b_l[0]){
            if (item.setting_w_b_l[0][5] != 1 && item.setting_w_b_l[0][5] != 0) {
              arrayData.push(item);
            }
          }
          // เพิ่มเงื่อนไขเพิ่มเติมที่นี่ เช่น ตรวจสอบค่าอื่นๆ ที่ไม่เท่ากับ 0
          if (this.numbertpye != 5 && this.numbertpye != 8) {
            if (item.some_other_value != 0 ) {  // เปลี่ยน some_other_value ให้เป็นตัวแปรที่คุณต้องการตรวจสอบ
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
                     if(item.tournament[1].substring(0, 2) == 'e-'){
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
                    if (a.pair_league[3] < b.pair_league[3]) {
                        return -1;
                    }
                    if (a.pair_league[3] > b.pair_league[3]) {
                        return 1;
                    }
                    return 0;
                });                
                 sort_data[0].showTable = 'false'
                 sort_data[0].newLeague = true
                for (let i = 0; i < sort_data.length; i++) {
                  array2.push(sort_data[i])
                }
              }
                //  var newNumber = '1'
                //  array2.forEach((item) => {
                //     if(item.tournament[1].substring(0, 2) == 'e-'){
                //       item.pair_league[3] =  [`${'ZZ'}`]+item.pair_league[3]
                //     }
                //  });

                var ball_game = array2.filter(f => f.tournament[1].substring(0, 2) != 'e-')
                var ball_e = array2.filter(f => f.tournament[1].substring(0, 2) == 'e-')
                
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
          // var web_3 = data.filter(f => f.web_id == 3)
          array.push({
            id: array2,
            data: data,
            index: array.length,
            status : true,
            sortleague : data[0].pair_league[3],
            sport_type : data[0].pair_league[4],
            real_kickoff_time : date
          });
          }

          var newNumber = '1'
          array.forEach((item) => {
            item.moreBet = 'open'
            // item.data[0].newLeague = true
            // if(item.data[0].tournament[1].substring(0, 2) == 'e-'){
            //   item.sortleague = [`${'ZZ'}`]+item.sortleague
            // }else if(item.sport_type == 3){
            //   item.sortleague = [`${'ASBO'}`]+item.sortleague
            // }else if(item.sport_type == 10){              
            //     item.sortleague = [`${'IBC'}`]+item.sortleague
            //   }else{
               item.sortleague = newNumber + item.sortleague.slice(1);
            //   }
          });

          
          array.sort((a, b) => {
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

            array.forEach((item ) => {
            item.data.sort((a, b) => {
              let aParts = a.sort_order.split('-').map(Number);
            let bParts = b.sort_order.split('-').map(Number);

              for (let i = 0; i < aParts.length; i++) {
                  if (aParts[i] !== bParts[i]) {
                      return aParts[i] - bParts[i];
                  }
              }

            return 0;
            })
            });
          return array

      },
      setDataNonLive2() {
        if (this.nonLiveData.data.data.length == 0) {
          return [];
        }        
        var obj = this.nonLiveData.data.data.reduce((group, match) => {
          var sport_type_id 
          // if(match.pair_league[0] != true){
           sport_type_id = match.pair_league[1];
          // }else{
            // sport_type_id = match.tournament[1];
          // }
          group[sport_type_id] = group[sport_type_id] ?? [];
          group[sport_type_id].push(match);
          return group;
        }, {});
        
        return obj
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
                  if(item.tournament[1].substring(0, 2) == 'e-'){
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
                sort_data =  array[data].sort((a, b) => {
                    if (a.pair_league[3] < b.pair_league[3]) {
                        return -1;
                    }
                    if (a.pair_league[3] > b.pair_league[3]) {
                        return 1;
                    }
                    return 0;
                });                
                sort_data[0].showTable = 'false'
                sort_data[0].newLeague = true
                for (let i = 0; i < sort_data.length; i++) {
                  array2.push(sort_data[i])
                }
              }
                 var newNumber = '1'
                 array2.forEach((item) => {
                    if(item.tournament[1].substring(0, 2) == 'e-'){
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
      hideAds : "ads/hideAds"
    }),
    sortArrayByPosition3(array) {
      return array.sort((a, b) => a[7] - b[7]);
    },
    sortArrayRow(array) {
      return array.sort((a, b) => a.sort_row - b.sort_row);
    },
    handleScroll() {
      if (this.scTimer) return;
      this.scTimer = setTimeout(() => {
        this.scY = window.scrollY;
        clearTimeout(this.scTimer);
        this.scTimer = 0;
      }, 100);
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
    MoreBet(event, type = 'nonLive'){
        var obj = this[type+'Data'].data.data;
        this.moreTrue = obj.filter(f => f.moreBet == true )
        if(this.moreTrue.length == 0){
          obj.filter(f => { f.moreBet = f.event_id === event.event_id ? !f.moreBet  : null});
          this[type+'Data'] = { data: { data: obj } };
        }else{
          this.oldObj = []
          this.moreTrue = []
          obj.filter(f => {
            f.moreBet = null
          })
          this[type+'Data'] = { data: { data: obj } };
        }
        if(this.oldObj.length == 0) {
          this.oldObj = this[type+'Data'].data.data.filter(f => f.moreBet == true )
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
    sortData(mapData) {
      if (this.getselectleague.sortBy == "SortByTime") {
        return mapData.sort((a, b) => {
          return new Date(b.show_time) - new Date(a.show_time);
        });
      }
      if (this.getselectleague.sortTime != "Allmatch") {
        return mapData;
        var front = this.getselectleague.sortTime.substring(0, 2);
        var back = this.getselectleague.sortTime.substring(6, 8);
        var datasort = mapData.filter(f => {
          var today = moment(new Date(f.real_kickoff_time)).format(
            "YYYY-MM-DD"
          );
          return (
            new Date(f.real_kickoff_time) >=
              new Date(today + "T" + front + ":00:00") &&
            new Date(f.real_kickoff_time) <= new Date(today + "T" + back + ":59:59")
          );
        });
        return datasort == [] ? [] : datasort;
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
      console.log('get pusher',getSortTime);

      var price = this.$auth.$storage.getUniversal('price')
      if(this.oldPriceNonLive == null){
        this.oldPriceNonLive = price
      }else{
        if(this.oldPriceNonLive != price){
          this.oldPriceNonLive = price
          var nonlivedata = await this.$axios.get(
            "/event/"+type+"/nokey/get-nonlive-odds" ,
            {
              params: {'sport_type_id' : '2' , 'odds_type' : type != 'sc' ? 'EU' : price,nav: this.navSide, 'sortTime':getSortTime}
            }
          );
          this.data_change_id_non  = nonlivedata.data.change_id
          this.nonLiveData = this.newData(nonlivedata)
          this.oldnotlive = this.newData(nonlivedata)
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
      var nonlivedata = await this.$axios.get(
        "/event/"+type+"/nokey/get-nonlive-odds" ,
        {
          params: {'sport_type_id' : '2' , 'odds_type' : type != 'sc' ? 'EU' : price,nav: this.navSide, 'sortTime':getSortTime}
        }
      );
      this.data_change_id_non  = nonlivedata.data.change_id
      this.nonLiveData = this.newData(nonlivedata)
      this.oldnotlive = this.newData(nonlivedata)
      this.oldnotlive2 = this.newData(nonlivedata)
      this.loading = false
       }else{
         if(this.data_change_id_non){
          if(route_path == 'step' || route_path == 'mix'){
            price = 'EU'
          }
         let response = await this.$axios.get("event/"+route_path+"/nokey/get-nonlive-odds_nonfullload?sport_type_id=2&odds_type="+price+"&change_id=" + this.data_change_id_non+'&sortTime='+getSortTime);
             this.data_change_id_non = response.data.change_id
             const teamleague = { data: { data: [] } }
             var array = this.nonLiveData.data.data
             var anotherOne = response.data.data
             var close_league = response.data.event_close_id
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
           if(close_league.length != 0){
            //  close_league.forEach(element => {
            //    var findIndex = array.findIndex((el) => {
            //        return el.event_id == element
            //    })
            //    if(findIndex != -1){
            //      array.splice(findIndex, 1);
            //    }
            //  })
              if(Array.isArray(close_league)){
                array = array.filter(item => {
                   return !close_league.includes(item.event_id)
                 });
              }else{
                var newObj = Object.values(close_league)
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
           var nonlivedata = await this.$axios.get(
         "/event/"+type+"/nokey/get-nonlive-odds" ,
             {
               params: {'sport_type_id' : '2' , 'odds_type' : type != 'sc' ? 'EU' : price,nav: this.navSide, 'sortTime':getSortTime}
             }
           );
           this.data_change_id_non  = nonlivedata.data.change_id
           this.nonLiveData = this.newData(nonlivedata)
           this.oldnotlive = this.newData(nonlivedata)
         }
       }
    },
    async fetchgetLive(type , start) {
      var front = this.getselectleague.sortTime.substring(0, 2);
      let getSortTime = front == '23' ? 'after' : front == '06' ? 'before' : 'all';
      // Allmatch ,  หลัง => 23 ,  ก่อน => 06
      
      var price = this.$auth.$storage.getUniversal('price')
      if(this.oldPriceLive == null){
        this.oldPriceLive = price
      }else{
        if(this.oldPriceLive != price){
          this.oldPriceLive = price
          var live = await this.$axios.get("/event/"+type+"/nokey/get-live-odds" ,
            {
              params: {'sport_type_id' : '2' , 'odds_type' : type != 'sc' ? 'EU' : price,nav: this.navSide , 'sortTime':getSortTime}
            }
          );
          this.data_change_id  = live.data.change_id
          this.liveData = this.newData(live)
          this.oldlive = this.newData(live);
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
      var live = await this.$axios.get(
        "/event/"+type+"/nokey/get-live-odds" ,
        {
          params: {'sport_type_id' : '2' , 'odds_type' : type != 'sc' ? 'EU' : price,nav: this.navSide , 'sortTime':getSortTime}
        }
      );
      this.data_change_id  = live.data.change_id
      this.liveData = this.newData(live)
      this.oldlive = this.newData(live);
      this.oldlive2 = this.newData(live);
       }else{
         if(this.data_change_id){
          if(route_path == 'step' || route_path == 'mix'){
            price = 'EU'
          }
         let response = await this.$axios.get("event/"+route_path+"/nokey/get-live-odds_nonfullload?sport_type_id=2&odds_type="+price+"&change_id=" + this.data_change_id);
             this.data_change_id = response.data.change_id
             const teamleague = { data: { data: [] } }
             var array = this.liveData.data.data
             var anotherOne = response.data.data
             var close_league = response.data.event_close_id
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
           if(close_league.length != 0){
            //  close_league.forEach(element => {
            //    var findIndex = array.findIndex((el) => {
            //        return el.event_id == element
            //    })
            //    if(findIndex != -1){
            //      array.splice(findIndex, 1);
            //    }
            //  })
            if(Array.isArray(close_league)){
                array = array.filter(item => {
                   return !close_league.includes(item.event_id)
                 });
              }else{
                var newObj = Object.values(close_league)
                array = array.filter(item => {
                   return !newObj.includes(item.event_id)
                 });
              }
           }
           teamleague.data.data = array
           this.liveData = teamleague;
           this.oldlive = teamleague;
         }else{
           var live = await this.$axios.get(
             "/event/"+type+"/nokey/get-live-odds" ,
             {
               params: {'sport_type_id' : '2' , 'odds_type' : type != 'sc' ? 'EU' : price,nav: this.navSide , 'sortTime':getSortTime}
             }
           );
           this.data_change_id  = live.data.change_id
           this.liveData = this.newData(live)
           this.oldlive = this.newData(live);
         }
       }
    },
    async fetchgetEarly(type) {
      var front = this.getselectleague.sortTime.substring(0, 2);
      let getSortTime = front == '23' ? 'after' : front == '06' ? 'before' : 'all';
      var price = this.$auth.$storage.getUniversal('price')
      var date = this.$auth.$storage.getUniversal('date')
      var earlydata = await this.$axios.get(
        "/event/"+type+"/nokey/early" ,
        {
          params: {'sport_type_id' : '2' , 'odds_type' : type != 'sc' ? 'EU' : price, 'date' : date , 'sortTime':getSortTime}
        }
      );
      this.earlyData = this.newData(earlydata , 'Nosoccer')
      this.oldearly = this.newData(earlydata , 'Nosoccer')
    },
    async fetchGetData(type) {
      this.loading = true;
      let route = this.$route.path.toString();
      this.path = route.substring(12, 99);
      if (this.path == "today") {
        await this.fetchgetLive('sc', type);
        await this.fetchgetnonLive('sc', type);
      } else if (this.path == "live") {
        await this.fetchgetLive('sc', type);
      } else if (this.path == "early") {
        await this.fetchgetEarly('sc' , type);
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
      this.loading = false;

    },
    filternonlive(event) {
      if (this.path == "today" || this.path == "all") {
        const finda1 = this.oldnotlive2.data.data.filter(a2 =>
          event.find(a1 => a1.value === a2.tournament.tournament_id)
        );
        if(finda1.length == 0){
          this.nonLiveData = { data: { data: this.oldnotlive2.data.data } };
        }else{
          this.nonLiveData = { data: { data: finda1 } };
        }
      }
    },
    filterlive(event) {
      if (this.path == "live" || this.path == "all") {
        const finda1 = this.oldlive2.data.data.filter(a2 =>
          event.find(a1 => a1.value === a2.tournament.tournament_id)
        );
        if(finda1.length == 0){
          this.liveData = { data: { data: this.oldlive2.data.data } };
        }else{
          this.liveData = { data: { data: finda1 } };
        }
      }
    },
    filterearly(event){
      if (this.path == "early") {
        this.earlyData = this.oldearly;
        const finda1 = this.setDataEarly.filter(a2 =>
        event.find(a1 => a1.value === a2.tournament.tournament_id)
        );
        this.earlyData = { data: { data: finda1 } };
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  watch :{
    "getselectleague.sortTime"(){
      console.log('watch sortTime',this.getselectleague.sortTime)
      this.fetchGetData('start');

    },
    getclosebetlist(valuse){
      this.checkBetAll = valuse
    },
    getCollapse(value){   
      console.log('valuevalue',value);
      
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
    }
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
    if(this.$route.params.path == 'step'){
      this.numbertpye = 5
    }else if(this.$route.params.path == 'mixparlay'){
      this.numbertpye = 8
    }else{
      this.numbertpye = 2
    }
    const getSide = this.$route.query.s
    this.navSide = getSide ? getSide : 'side-menu'
    await this.fetchGetData('start');
  }
};
</script>
<style scoped>
  .bet-close-table {
    width: 1078px !important;
  }
  .style-menu {
    position: fixed;
    /* top: 128px; */
    margin-left: 0px;
    margin-right: -20px;
    z-index: 2;
    display: flex;
    align-items: center;
    height: 41px;
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
        /* top: 82px; */
        width: 793px;
      }

      .style-menu-iframe {
        top: 40px;
      }
  }

  @media only screen and (max-width: 2200px) and (min-width: 1400px)  {
    .top-menu{
      top: 68px;
    }
  }

  @media screen and (max-width: 800px) {
    .top-menu{
      top: 0px;
    }
    .style-menu{
        /* top: 45px; */
        position: static;
      }

    .style-menu-iframe {
      top: 0px;
    }

      
}
</style>
