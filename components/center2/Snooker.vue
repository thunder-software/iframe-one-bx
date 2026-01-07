<template>
  <div>
    <div class="" style="padding: 8px 8px;">
      <div class="card-center bg-black">
      <b-row class="mb-2 style-menu pr-0" :class="{'bet-close-table' : (checkBetAll)}" :style="isAdsHidden ? 'top: 128px;' : 'top: 254px;'" v-if="iframe != '1'">
        <b-col cols="3">
          <center2-title
            type="snooker"
            :live="path == 'live' ? true : false"
            :path="path"
          ></center2-title>
        </b-col>
        <b-col cols="9" class="text-right pr-1">
          <center2-select-league-button
            :displaytable="getselectleague"
            @filterlive="filterlive($event)"
            :loading="loading"
            @refresh="fetchGetData"
            @filternonlive="filternonlive($event)"
             @filterearly="filterearly($event)"
            :oldlive="oldlive"
            :oldearly="oldearly"
            :oldnotlive="oldnotlive"
            :getlive="setDataLive"
            :getnotlive="setDataNonLive"
            :getearly="setDataEarly"
            :path="path"
          ></center2-select-league-button>
        </b-col>
      </b-row>

      <b-row class="mb-0 mr-0 style-menu-iframe" :class="scY > 0 ? '' : ''" v-else style="margin-top: 75px;">
        <b-col cols="3">
          <center2-title
            type="snooker"
            :live="path == 'live' ? true : false"
            :path="path"
          ></center2-title>
        </b-col>
        <b-col cols="9" class="text-right">
          <center2-select-league-button
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
          ></center2-select-league-button>
        </b-col>
      </b-row>

      <div class="class-tv-box" v-if="getDataTV">
        <div is="center2-iframebox" :urls="getDataTV"></div>
      </div>
   
       <b-row :class="{'row-style-menu': !getDataTV, 'tv-style-menu': getDataTV , 'box-banner' : banners.length != 0, 'style-banner': isAdsHidden}"></b-row>
        <b-col cols="12">
          <center2-match-table-live
            v-if="path != 'early' && setDataLive.length != 0"
            status="live"
            @MoreBet="MoreBet($event, 'live')"
            @MoreCollapse="MoreCollapse($event , 'live')"
            :setData="setDataLive"
            :displaytable="getselectleague"
            :loading="loading"
            @fetch="fetchGetData"
            class="mb-3"
          ></center2-match-table-live>
          <center2-match-table-nonlive
            v-if="path != 'early' && path != 'live' && setDataNonLive.length != 0"
            status="nonLive"
            @MoreBet="MoreBet($event, 'nonLive')"
            @MoreCollapse="MoreCollapse($event , 'nonLive')"
            :setData="setDataNonLive"
            :displaytable="getselectleague"
            :loading="loading"
            @fetch="fetchGetData"
          ></center2-match-table-nonlive>
          <center2-match-table-early
            v-if="path == 'early'"
            status="early"
            @MoreBet="MoreBet($event, 'early')"
            :setData="setDataEarly"
            :displaytable="getselectleague"
            :loading="loading"
            @fetch="fetchGetData"
          ></center2-match-table-early>
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
      navSide:'',
      numbertpye : null,
      data_change_id : null,
      data_change_id_non : null,
      oldPriceLive : null,
      oldPriceNonLive : null,
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
    setDataLive() {
      let array = []
      let array2 = []
      if (this.liveData.data.data.length == 0) {
        return [];
      }else{
        if (localStorage.getItem('filterSport')) {
            let obj = localStorage.getItem('filterSport').split(",");
            let live = { data: { data: [] } }
            live.data.data = this.liveData.data.data.filter(a2 => obj.find(a1 => a1 == a2.tournament[0]))

            var wbl_a = { data: { data: [] } }
             wbl_a.data.data = live.data.data.filter(f => {
              if(f.setting_w_b_l[0]) {
                if(f.setting_w_b_l[0][this.numbertpye] == 1){
                 return f.setting_w_b_l[0][this.numbertpye]
                }
              }
             })

            array = this.sortData(this.mapData(wbl_a)).reduce((group, match) => {
              const sport_type_id = match.tournament.tournament_id;
              group[sport_type_id] = group[sport_type_id] ?? [];
              group[sport_type_id].push(match);
              return group;
            }, {});

            for (const data in array) {
              array[data][0].newLeague = true
              for (let i = 0; i < array[data].length; i++) {
                array2.push(array[data][i])
              }
            }
            array2.sort((a, b) => {
                if (a.sortleague < b.sortleague) {
                    return -1;
                }
                if (a.sortleague > b.sortleague) {
                    return 1;
                }
                return 0;
            });
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

          this.liveData.data.data.sort((a, b) => {
               if (a.sort_order < b.sort_order) {
                   return -1;
               }
               if (a.sort_order > b.sort_order) {
                   return 1;
               }
               return 0;
           });
            var wbl_a = { data: { data: [] } }
             wbl_a.data.data = this.liveData.data.data.filter(f => {
              if(f.setting_w_b_l[0]) {
                if(f.setting_w_b_l[0][this.numbertpye] == 1){
                 return f.setting_w_b_l[0][this.numbertpye]
                }
              }
             })
            array = this.sortData(this.mapData(wbl_a)).reduce((group, match) => {
            const sport_type_id = match.tournament.tournament_id;
            group[sport_type_id] = group[sport_type_id] ?? [];
              group[sport_type_id].push(match);

            return group;
          }, {});
          for (const data in array) {
            array[data][0].newLeague = true
            for (let i = 0; i < array[data].length; i++) {
              array2.push(array[data][i])
            }
          }
           array2.sort((a, b) => {
               if (a.sortleague < b.sortleague) {
                   return -1;
               }
               if (a.sortleague > b.sortleague) {
                   return 1;
               }
               return 0;
           });
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
        }
      }
    },
    setDataNonLive() {
      let array = []
      let array2 = []
      if (this.nonLiveData.data.data.length == 0) {
        return [];
      }else{
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
            array = this.sortData(this.mapData(wbl_a)).reduce((group, match) => {
              const sport_type_id = match.tournament.tournament_id;
              group[sport_type_id] = group[sport_type_id] ?? [];
              group[sport_type_id].push(match);
              return group;
            }, {});
            for (const data in array) {
                array[data][0].newLeague = true
                for (let i = 0; i < array[data].length; i++) {
                  array2.push(array[data][i])
                }
              }
              array2.sort((a, b) => {
                  if (a.sortleague < b.sortleague) {
                      return -1;
                  }
                  if (a.sortleague > b.sortleague) {
                      return 1;
                  }
                  return 0;
              });
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
                this.nonLiveData.data.data.sort((a, b) => {
                      if (a.sort_order < b.sort_order) {
                          return -1;
                      }
                      if (a.sort_order > b.sort_order) {
                          return 1;
                      }
                      return 0;
                  });
                var wbl_a = { data: { data: [] } }
                wbl_a.data.data = this.nonLiveData.data.data.filter(f => {
                  if(f.setting_w_b_l[0]){
                    if(f.setting_w_b_l[0][this.numbertpye] == 1){
                      return f.setting_w_b_l[0][this.numbertpye]
                    }
                  }
                })
                array = this.sortData(this.mapData(wbl_a)).reduce((group, match) => {
                const sport_type_id = match.tournament.tournament_id;
                group[sport_type_id] = group[sport_type_id] ?? [];
                group[sport_type_id].push(match);
                return group;
              }, {});
              for (const data in array) {
                array[data][0].newLeague = true
                for (let i = 0; i < array[data].length; i++) {
                  array2.push(array[data][i])
                }
              }
                  array2.sort((a, b) => {
                      if (a.sortleague < b.sortleague) {
                          return -1;
                      }
                      if (a.sortleague > b.sortleague) {
                          return 1;
                      }
                      return 0;
                  });
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
        }
      }
    },
    setDataEarly() {
      let array = []
      let array2 = []
      if (this.earlyData.data.data.length == 0) {
        return [];
      }else{
        var wbl_a = { data: { data: [] } }
          wbl_a.data.data = this.earlyData.data.data.filter(f => {
            if(f.setting_w_b_l[0][this.numbertpye]){
              if(f.setting_w_b_l[0][this.numbertpye] == 1){
                return f.setting_w_b_l[0][this.numbertpye]
              }
            }
        })
        array = this.sortData(this.mapData(wbl_a)).reduce((group, match) => {
        const sport_type_id = match.tournament.tournament_id;
        group[sport_type_id] = group[sport_type_id] ?? [];
        group[sport_type_id].push(match);
        return group;
      }, {});
      for (const data in array) {
        array[data][0].newLeague = true
        for (let i = 0; i < array[data].length; i++) {
          array2.push(array[data][i])
        }
      }
            var newNumber = '1'
            array2.forEach((item) => {
                item.sortleague = newNumber + item.sortleague;
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
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
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
      var price = this.$auth.$storage.getUniversal('price')
      if(this.oldPriceNonLive == null){
        this.oldPriceNonLive = price
      }else{
        if(this.oldPriceNonLive != price){
          this.oldPriceNonLive = price
          var nonlivedata = await this.$axios.get("/event/"+type+"/nokey/get-nonlive-odds" ,
            {
              params: {'sport_type_id' : '6' , 'odds_type' : type != 'sc' ? 'EU' : price,nav: this.navSide, 'sortTime':getSortTime}
            }
          );
          this.data_change_id_non = nonlivedata.data.change_id
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
          params: {'sport_type_id' : '6' , 'odds_type' : type != 'sc' ? 'EU' : price,nav: this.navSide, 'sortTime':getSortTime}
        }
      );
      this.data_change_id_non = nonlivedata.data.change_id
      this.nonLiveData = this.newData(nonlivedata)
      this.oldnotlive = this.newData(nonlivedata)
      this.oldnotlive2 = this.newData(nonlivedata)
      this.loading = false
    }else{
      if(this.data_change_id_non){
        if(route_path == 'step' || route_path == 'mix'){
            price = 'EU'
          }
        let response = await this.$axios.get("event/"+route_path+"/nokey/get-nonlive-odds_nonfullload?sport_type_id=6&odds_type="+price+"&change_id=" + this.data_change_id_non+'&sortTime='+getSortTime);
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
              params: {'sport_type_id' : '6' , 'odds_type' : type != 'sc' ? 'EU' : price,nav: this.navSide, 'sortTime':getSortTime}
            }
          );
          this.data_change_id_non = nonlivedata.data.change_id
          this.nonLiveData = this.newData(nonlivedata)
          this.oldnotlive = this.newData(nonlivedata)
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
          var live = await this.$axios.get("/event/"+type+"/nokey/get-live-odds" ,
            {
              params: {'sport_type_id' : '6' , 'odds_type' : type != 'sc' ? 'EU' : price,nav: this.navSide, 'sortTime':getSortTime}
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
          params: {'sport_type_id' : '6' , 'odds_type' : type != 'sc' ? 'EU' : price,nav: this.navSide, 'sortTime':getSortTime}
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
        let response = await this.$axios.get("event/"+route_path+"/nokey/get-live-odds_nonfullload?sport_type_id=6&odds_type="+price+"&change_id=" + this.data_change_id+'&sortTime='+getSortTime);
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
              params: {'sport_type_id' : '6' , 'odds_type' : type != 'sc' ? 'EU' : price,nav: this.navSide, 'sortTime':getSortTime}
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
          params: {'sport_type_id' : '6' , 'odds_type' : type != 'sc' ? 'EU' : price, 'date' : date , 'sortTime':getSortTime}
        }
      );
      this.earlyData = this.newData(earlydata , 'Nosoccer')
      this.oldearly = this.newData(earlydata , 'Nosoccer')
    },

    async fetchGetData(type) {
      this.loading = true;
      let route = this.$route.path.toString();
      this.path = route.substring(9, 99);
      if (this.path == "today") {
        await this.fetchgetLive('sc' , type);
        await this.fetchgetnonLive('sc' , type);
      } else if (this.path == "live") {
        await this.fetchgetLive('sc' , type);
      } else if (this.path == "early") {
        await this.fetchgetEarly('sc' , type);
      } else if (this.path == "all") {
        await this.fetchgetLive('sc' , type);
        await this.fetchgetnonLive('sc' , type);
      } else if(this.path == "mixparlay"){
        await this.fetchgetLive('mix' , type);
        await this.fetchgetnonLive('mix' , type);
      } else if (this.path == 'step'){
        await this.fetchgetLive('step' , type);
        await this.fetchgetnonLive('step' , type);
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
          this.nonLiveData = { data: { data: this.oldnotlive2.data.data } };
        }else{
          this.nonLiveData = { data: { data: finda1 } };
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
  },
  watch :{
    "getselectleague.sortTime"(){
      console.log('watch sortTime',this.getselectleague.sortTime)
      this.fetchGetData('start');
    },
    getCollapse(value){   
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
        width: 794px;
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
