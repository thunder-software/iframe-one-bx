<template>
  <div>
    <layouts-ads style="margin-bottom: 0;" />
    <div class="px-3 py-2">
      <b-row class="mb-2 style-menu" :class="scY > 0 ? 'top-menu' : ''" :style="isAdsHidden ? '' : ''" v-if="iframe != '1'">
        <b-col :cols="path == 'early' ? '2' : '3'">
          <div is="center2-title" type="football" :live="path == 'live' ? true : false" :path="path"></div>
        </b-col>
        <b-col :cols="path == 'early' ? '10' : '9'" class="text-right pr-0">
          <div is="center2-select-league-button" :displaytable="getselectleague" @filterlive="filterlive($event)"
            :loading="loading" @refresh="fetchGetData" @filternonlive="filternonlive($event)"
            @filterearly="filterearly($event)" :oldlive="oldlive" :oldnotlive="oldnotlive" :getlive="favoriteGetLive"
            :getnotlive="favoriteNonLive" :getearly="favoriteEarly" :path="path"></div>
        </b-col>
      </b-row>
      <b-row class="mb-2 style-menu-iframe" :class="scY > 0 ? 'top-menu' : ''" v-else>
        <b-col :cols="path == 'early' ? '2' : '3'">
          <div is="center2-title" type="football" :live="path == 'live' ? true : false" :path="path"></div>
        </b-col>
        <b-col :cols="path == 'early' ? '10' : '9'" class="text-right">
          <div is="center2-select-league-button" :displaytable="getselectleague" @filterlive="filterlive($event)"
            :loading="loading" @refresh="fetchGetData" @filternonlive="filternonlive($event)"
            @filterearly="filterearly($event)" :oldlive="oldlive" :oldnotlive="oldnotlive" :getlive="favoriteGetLive"
            :getnotlive="favoriteNonLive" :getearly="favoriteEarly" :path="path"></div>
        </b-col>
      </b-row>

      <b-row class="style-menu-row" :style="!isAdsHidden ? 'margin-top: 190px;' : ''">
        <b-col cols="12">
          <div is="center2-match-table-live" status="live" @MoreBet="MoreBet($event, 'live')" :setData="favoriteGetLive"
            :displaytable="getselectleague" :loading="loading" @fetch="fetchGetData" class="mb-3"></div>
          <div is="center2-match-table-nonlive" status="nonLive" @MoreBet="MoreBet($event, 'nonLive')"
            :setData="favoriteNonLive" :displaytable="getselectleague" :loading="loading" @fetch="fetchGetData"></div>
          <div is="center2-match-table-early" v-if="path == 'early'" status="early" @MoreBet="MoreBet($event, 'early')"
            :setData="favoriteEarly" :displaytable="getselectleague" :loading="loading" @fetch="fetchGetData"></div>
        </b-col>
      </b-row>
      <!-- </b-overlay> -->
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
      start_load: false,
      path: "",
      liveData: { data: { data: [] } },
      nonLiveData: { data: { data: [] } },
      earlyData: { data: { data: [] } },
      oldearly: [],
      oldlive: [],
      oldlive2: [],
      oldnotlive: [],
      oldnotlive2: [],
      oldObj: [],
      moreTrue: [],
      navSide: '',
      navpart: '',
      data_change_id: null,
      data_change_id_non: null,
      numbertpye: 2,
      oldPriceLive: null,
      oldPriceNonLive: null,
      MoreBetID: null,
      scY: 0,
      scTimer: 0,
      iframe : null

    };
  },
  computed: {
    ...mapGetters({
      getselectleague: "selectleaguebutton/getselectleague",
      events: "favorite/events",
      isAdsHidden : 'ads/isAdsHidden'
    }),
    favorites() {
      return this.events.map(data => data.event)
    },
    setDataLive() {
      let array = []
      let array2 = []
      if (this.liveData.data.data.length == 0) {
        return [];
      } else {
        if (localStorage.getItem('filterSport')) {
          let obj = localStorage.getItem('filterSport').split(",");
          let live = { data: { data: [] } }
          live.data.data = this.liveData.data.data.filter(a2 => obj.find(a1 => a1 == a2.tournament[0]))

          var wbl_a = { data: { data: [] } }
          wbl_a.data.data = live.data.data.filter(f => {
            if (f.setting_w_b_l[0]) {
              if (f.setting_w_b_l[0][this.numbertpye] == 1) {
                return f.setting_w_b_l[0][this.numbertpye]
              }
            }
          })

          array = this.sortData(this.mapData(wbl_a), 'live').reduce((group, match) => {
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
          if (this.MoreBetID) {

            array2.filter(f => {
              if (f.event_id == this.MoreBetID) {
                f.moreBet = 'open'
              }
            })
          }
          return array2
        } else {

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
            if (f.setting_w_b_l[0]) {
              if (f.setting_w_b_l[0][this.numbertpye] == 1) {
                return f.setting_w_b_l[0][this.numbertpye]
              }
            }
          })
          array = this.sortData(this.mapData(wbl_a), 'live').reduce((group, match) => {
            const sport_type_id = match.tournament.tournament_id;
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

          array2.sort((a, b) => {
            if (a.sortleague < b.sortleague) {
              return -1;
            }
            if (a.sortleague > b.sortleague) {
              return 1;
            }
            return 0;
          });
          if (this.MoreBetID) {

            array2.filter(f => {
              if (f.event_id == this.MoreBetID) {
                f.moreBet = 'open'
              }
            })
          }
          return array2
        }
      }
    },
    setDataNonLive() {
      let array = []
      let array2 = []
      if (this.nonLiveData.data.data.length == 0) {
        return [];
      } else {
        if (localStorage.getItem('filterSport')) {
          let obj = localStorage.getItem('filterSport').split(",");
          let live = { data: { data: [] } }
          live.data.data = this.nonLiveData.data.data.filter(a2 => obj.find(a1 => a1 == a2.tournament[0]))
          var wbl_a = { data: { data: [] } }
          wbl_a.data.data = live.data.data.filter(f => {
            if (f.setting_w_b_l[0]) {
              if (f.setting_w_b_l[0][this.numbertpye] == 1) {
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
          if (this.MoreBetID) {
            array2.filter(f => {
              if (f.event_id == this.MoreBetID) {
                f.moreBet = 'open'
              }
            })
          }
          return array2
        } else {
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
            if (f.setting_w_b_l[0]) {
              if (f.setting_w_b_l[0][this.numbertpye] == 1) {
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
          if (this.MoreBetID) {

            array2.filter(f => {
              if (f.event_id == this.MoreBetID) {
                f.moreBet = 'open'
              }
            })
          }
          return array2
        }
      }
    },
    setDataEarly() {
      let array = []
      let array2 = []
      if (this.earlyData.data.data.length == 0) {
        return [];
      } else {
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
          if (f.setting_w_b_l[0][this.numbertpye]) {
            if (f.setting_w_b_l[0][this.numbertpye] == 1) {
              return f.setting_w_b_l[0][this.numbertpye]
            }
          }
        })
        array = this.sortData(this.mapData(wbl_a), 'early').reduce((group, match) => {
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
        return array2
      }

    },
    favoriteGetLive() {
      let count = 0
      let league = undefined
      const matches = new Set()

      return this.setDataLive.filter(item => {
        if (this.favorites.includes(item.event_id) && !matches.has(item.event_id)) {
          matches.add(item.event_id)
          item.count_match = ++count
          return true
        }

        return false
      }).map(i => {

        if (i.tournament[0] != league) {
          i.newLeague = true
          league = i.tournament[0]
        } else {
          i.newLeague = false
        }

        return i
      })
    },
    favoriteNonLive() {
      let count = 0
      let league = undefined
      const matches = new Set()

      return this.setDataNonLive.filter(item => {
        if (this.favorites.includes(item.event_id) && !matches.has(item.event_id)) {
          matches.add(item.event_id)
          item.count_match = ++count
          return true
        }
        return false
      }).map(i => {

        if (i.tournament[0] != league) {
          i.newLeague = true
          league = i.tournament[0]
        } else {
          i.newLeague = false
        }

        return i
      })
    },
    favoriteEarly() {
      let count = 0
      let league = undefined
      const matches = new Set()

      return this.setDataEarly.filter(item => {
        if (this.favorites.includes(item.event_id) && !matches.has(item.event_id)) {
          matches.add(item.event_id)
          item.count_match = ++count
          return true
        }
        return false
      }).map(i => {

        if (i.tournament[0] != league) {
          i.newLeague = true
          league = i.tournament[0]
        } else {
          i.newLeague = false
        }

        return i
      })
    }
  },
  methods: {
    ...mapActions({
      setLoadData: "favorite/setLoadData",
      removeFavoriteWhenOffline: "favorite/removeFavoriteWhenOffline",
    }),
    async getPusher(data) {
      var live2 = await this.$axios.get(
        "/event/sc/nokey/get-live-odds_nonfullload",
        {
          params: { 'sport_type_id': '1', 'odds_type': 'MY', nav: "side-menu", 'event_id': data.toString() }
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
    MoreBet(event, type = 'nonLive') {
      var obj = this[type + 'Data'].data.data;
      this.moreTrue = obj.filter(f => f.moreBet == 'open')
      if (this.moreTrue.length == 0) {
        obj.filter(f => { f.moreBet = f.event_id === event.event_id ? 'open' : null });
        this[type + 'Data'] = { data: { data: obj } };
      } else {
        obj.filter(f => { f.moreBet = f.event_id === event.event_id ? f.moreBet == 'open' ? null : 'open' : null });
        this[type + 'Data'] = { data: { data: obj } };
      }
      if (this.MoreBetID == event.event_id) {
        this.MoreBetID = null
      } else {
        this.MoreBetID = event.event_id
      }

    },
    sortData(mapData, type) {
      if (this.getselectleague.sortBy == "SortByTime") {
        return mapData.sort((a, b) => {
          return new Date(b.show_time) - new Date(a.show_time);
        });
      }
      if (this.getselectleague.sortTime != "Allmatch") {
        var front = this.getselectleague.sortTime.substring(0, 2);
        var back = this.getselectleague.sortTime.substring(6, 8);
        if (type != 'live') {
          if (type == 'early') {
            var dates = this.$auth.$storage.getUniversal('date')
            var newdate = dates.split("/").reverse().join("-");
            const last2 = newdate.slice(-2)
            var sub = newdate.substring(0, 8)
            var pushs = parseInt(last2) + 1

            if (front == '23') {
              var datasort1 = mapData.filter(f => {
                if (f.real_kickoff_time.substring(0, 10) == sub + pushs) {
                  var today = moment(new Date(f.real_kickoff_time)).format(
                    "YYYY-MM-DD"
                  );
                  return (
                    new Date(f.real_kickoff_time) < new Date(today + "T" + '10' + ":59:59")
                  );
                }
              });

              var datasort2 = mapData.filter(f => {
                if (f.real_kickoff_time.substring(0, 10) == newdate) {
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
            } else {
              var datasort = mapData.filter(f => {
                if (f.real_kickoff_time.substring(0, 10) == newdate) {
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
          } else {
            if (front == '23') {
              var datasort = mapData.filter(f => {
                var today = moment(new Date(f.real_kickoff_time)).format(
                  "YYYY-MM-DD"
                );
                return (
                  new Date(f.real_kickoff_time) < new Date(today + "T" + back + ":59:59") || new Date(f.real_kickoff_time) >= new Date(today + "T" + front + ":00:00")
                );
              });
              return datasort == [] ? [] : datasort;

            } else {
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
        } else {
          return mapData
        }

      } else {
        if (this.oldObj.length != 0) {
          mapData.filter(a2 =>
            this.oldObj.find(a1 => {
              if (a1.event_id === a2.event_id) {
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
          match.priceGroups.Handicap == undefined ? 0 : match.priceGroups.Handicap.length,
          match.priceGroups.OverUnder == undefined ? 0 : match.priceGroups.OverUnder.length,
          match.priceGroups.FH_Handicap == undefined ? 0 : match.priceGroups.FH_Handicap.length,
          match.priceGroups.FH_OverUnder == undefined ? 0 : match.priceGroups.FH_OverUnder.length
        );

        return match;
      });
    },
    async fetchgetnonLive(type, start) {
      var price = this.$auth.$storage.getUniversal('price')
      if (this.oldPriceNonLive == null) {
        this.oldPriceNonLive = price
      } else {
        if (this.oldPriceNonLive != price) {
          this.oldPriceNonLive = price
          let sport_type_id = this.navSide == 'top-menu' && this.navpart != 'today' ? null : '1'
          var nonlivedata = await this.$axios.get(
            "/event/" + type + "/nokey/get-nonlive-odds",
            {
              params: { 'sport_type_id': sport_type_id, 'odds_type': type != 'sc' ? 'EU' : price, nav: this.navSide }
            }
          );
          this.data_change_id_non = nonlivedata.data.change_id
          var newArray = this.newData(nonlivedata)
          this.nonLiveData = newArray
          this.oldnotlive = newArray
          return
        }
      }
      var route_path
      if (this.$route.params.path == 'step') {
        route_path = 'step'
      } else if (this.$route.params.path == 'mixparlay') {
        route_path = 'mix'
      } else {
        route_path = 'sc'
      }
      if (start == 'start') {
        this.loading = true
        let sport_type_id = this.navSide == 'top-menu' && this.navpart != 'today' ? null : '1'
        var nonlivedata = await this.$axios.get(
          "/event/" + type + "/nokey/get-nonlive-odds",
          {
            params: { 'sport_type_id': sport_type_id, 'odds_type': type != 'sc' ? 'EU' : price, nav: this.navSide }
          }
        );
        this.data_change_id_non = nonlivedata.data.change_id
        var newArray = this.newData(nonlivedata)
        this.nonLiveData = newArray
        this.oldnotlive = newArray
        this.oldnotlive2 = newArray
        this.loading = false
      } else {
        if (this.data_change_id_non) {
          if (route_path == 'step' || route_path == 'mix') {
            price = 'EU'
          }
          let response = await this.$axios.get("event/" + route_path + "/nokey/get-nonlive-odds_nonfullload?sport_type_id=1&odds_type=" + price + "&change_id=" + this.data_change_id_non);
          this.data_change_id_non = response.data.change_id
          const teamleague = { data: { data: [] } }
          var array = this.nonLiveData.data.data
          var anotherOne = response.data.data
          var close_league = response.data.event_close_id
          anotherOne.forEach(element => {
            var findIndex = array.findIndex((el) => {
              return el.event_id == element[0]
            })
            if (findIndex === -1) {
              array.push(this.addKeyArray(element))
            } else {
              array[findIndex] = this.addKeyArray(element)
            }
          });
          if (close_league.length != 0) {
            array = array.filter(ar => !close_league.find(rm => (rm === ar.event_id)))
          }
          if (this.liveData.data.data.length != 0) {
            array = array.filter(ar => !this.liveData.data.data.find(rm => (rm.event_id === ar.event_id)))
          }
          teamleague.data.data = array
          this.nonLiveData = teamleague;
          this.oldnotlive = teamleague;
        } else {
          let sport_type_id = this.navSide == 'top-menu' && this.navpart != 'today' ? null : '1'
          var nonlivedata = await this.$axios.get(
            "/event/" + type + "/nokey/get-nonlive-odds",
            {
              params: { 'sport_type_id': sport_type_id, 'odds_type': type != 'sc' ? 'EU' : price, nav: this.navSide }
            }
          );
          this.data_change_id_non = nonlivedata.data.change_id
          var newArray = this.newData(nonlivedata)
          this.nonLiveData = newArray
          this.oldnotlive = newArray
        }
      }
    },
    async fetchgetLive(type, start) {
      var price = this.$auth.$storage.getUniversal('price')
      if (this.oldPriceLive == null) {
        this.oldPriceLive = price
      } else {
        if (this.oldPriceLive != price) {
          this.oldPriceLive = price
          let sport_type_id = this.navSide == 'top-menu' && this.navpart != 'today' ? null : '1'
          var live = await this.$axios.get(
            "/event/" + type + "/nokey/get-live-odds",
            {
              params: { 'sport_type_id': sport_type_id, 'odds_type': type != 'sc' ? 'EU' : price, nav: this.navSide }
            }
          );
          this.data_change_id = live.data.change_id
          var newArray = this.newData(live)
          this.liveData = newArray
          this.oldlive = newArray
          return
        }
      }
      var route_path
      if (this.$route.params.path == 'step') {
        route_path = 'step'
      } else if (this.$route.params.path == 'mixparlay') {
        route_path = 'mix'
      } else {
        route_path = 'sc'
      }
      // if (start == 'start') {
        this.loading = true
        let sport_type_id = this.navSide == 'top-menu' && this.navpart != 'today' ? null : '1'
        var live = await this.$axios.get(
          "/event/" + type + "/nokey/get-live-odds",
          {
            params: { 'sport_type_id': sport_type_id, 'odds_type': type != 'sc' ? 'EU' : price, nav: this.navSide }
          }
        );
        this.data_change_id = live.data.change_id
        var newArray = this.newData(live)
        this.liveData = newArray
        this.oldlive = newArray;
        this.oldlive2 = newArray
        this.loading = false
      // } else {
      //   if (this.data_change_id) {
      //     if (route_path == 'step' || route_path == 'mix') {
      //       price = 'EU'
      //     }
      //     let response = await this.$axios.get("event/" + route_path + "/nokey/get-live-odds_nonfullload?sport_type_id=1&odds_type=" + price + "&change_id=" + this.data_change_id);
      //     this.data_change_id = response.data.change_id
      //     const teamleague = { data: { data: [] } }
      //     var array = this.liveData.data.data
      //     var anotherOne = response.data.data
      //     var close_league = response.data.event_close_id
      //     anotherOne.forEach(element => {
      //       var findIndex = array.findIndex((el) => {
      //         return el.event_id == element[0]
      //       })
      //       if (findIndex === -1) {
      //         array.push(this.addKeyArray(element))
      //       } else {
      //         array[findIndex] = this.addKeyArray(element)
      //       }
      //     });
      //     if (close_league.length != 0) {
      //       array = array.filter(ar => !close_league.find(rm => (rm === ar.event_id)))
      //     }
      //     teamleague.data.data = array
      //     this.liveData = teamleague;
      //     this.oldlive = teamleague;
      //   } else {
      //     let sport_type_id = this.navSide == 'top-menu' && this.navpart != 'today' ? null : '1'
      //     var live = await this.$axios.get(
      //       "/event/" + type + "/nokey/get-live-odds",
      //       {
      //         params: { 'sport_type_id': sport_type_id, 'odds_type': type != 'sc' ? 'EU' : price, nav: this.navSide }
      //       }
      //     );
      //     this.data_change_id = live.data.change_id
      //     var newArray = this.newData(live)
      //     this.liveData = newArray
      //     this.oldlive = newArray;
      //   }
      // }
    },
    async fetchGetData(type) {
      this.loading = true;
      this.path = 'today'
      await this.fetchgetLive('sc', type);
      await this.fetchgetnonLive('sc', type);
      this.setLoadData(false)
      this.removeFavoriteWhenOffline([
        ...this.favoriteGetLive,
        ...this.favoriteNonLive,
        ...this.favoriteEarly
      ])
      this.loading = false;
    },
    filternonlive(event) {
      if (this.path == "today" || this.path == "all") {
        const finda1 = this.oldnotlive2.data.data.filter(a2 =>
          event.find(a1 => parseInt(a1.value) === parseInt(a2.tournament.tournament_id))
        );
        if (finda1.length == 0) {
          this.nonLiveData = { data: { data: this.oldnotlive2.data.data } };
        } else {
          this.nonLiveData = { data: { data: finda1 } };
        }
      }
    },
    filterlive(event) {
      if (this.path == "live" || this.path == "all") {
        const finda1 = this.oldlive2.data.data.filter(a2 =>
          event.find(a1 => a1.value === a2.tournament.tournament_id)
        );
        if (finda1.length == 0) {
          this.liveData = { data: { data: this.oldlive2.data.data } };
        } else {
          this.liveData = { data: { data: finda1 } };
        }
      }
    },
  },
  async created() {
    if(localStorage.getItem('iframe')){
      this.iframe = localStorage.getItem('iframe')
    }
    const getpart = this.$route.query.t
    const getSide = this.$route.query.s
    this.navpart = getpart
    this.navSide = getSide ? getSide : 'side-menu'
    if (this.$route.params.path == 'step') {
      this.numbertpye = 5
    } else if (this.$route.params.path == 'mixparlay') {
      this.numbertpye = 8
    } else {
      this.numbertpye = 2
    }

    await this.fetchGetData('start');
  },
  watch: {
    $route(data) {
      this.navSide = data.query.s
      this.fetchGetData('start');
    }
  }
};
</script>

<style scoped>
  .style-menu {
    position: fixed;
    /* top: 129px; */
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
      .style-menu{
        top: 82px;
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
        top: 45px;
        position: static;
      }
    .style-menu-iframe {
      top: 0px;
    }
  }
</style>
