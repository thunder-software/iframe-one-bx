<template>
  <tbody :class="fontSize(displaytable.fontSize)">
    <tr>
        <td class="w-2 cursor-pointer" :class="tdClass(status)">
            <b-icon
              @click="CollapseBet()"
              style="cursor:pointer;"
              :icon="collapseAlls  ? 'chevron-down' : 'chevron-up'"
              class=""
              ></b-icon> 
          </td>

        <td
            colspan="8"
            class="text-left align-center cursor-pointer"
            style="height: 27px ;"
            :class="tdClass(status)"
          >
            <div class="flex">
              <div class="flex-1">
                <div class="inline-block pl-2 favorite-head">
                  <small class="inline-block cursor-default" @click="toggleFavoriteLeague(tournament.tournament_id)">
                    <b-icon :icon="$store.state.favorite.leagues.includes(tournament.tournament_id) ? 'star-fill' : 'star'" :variant="$store.state.favorite.leagues.includes(tournament.tournament_id) ? 'warning' : ''" />
                  </small>
                </div>
                <div class="inline-block ml-2">
                  <small class="font-semibold">
                    {{ tournament['name'+_keyLang] ? tournament['name'+_keyLang]  : tournament['name_en'] }}
                  </small>
                </div>
              </div>
              <div class="flex text-right  pr-1">
                <span class="pt-0 cursor-pointer" @click="fetchGetData">
                  <b-icon
                    icon="arrow-repeat"
                    :animation="loading ? 'spin' : ''"
                  ></b-icon>
                </span>
              </div>
            </div>
          </td>

          </tr>
          <tr v-for="(data, i) in checkRow" :key="i" v-if="data.collapse != 'open'" :class="{'odd' :data.count_match % 2 == 0}">
          <td class="align-center w-12" colspan="2" style="height: 36px">
            <div is="center2-column-time2"
              :status="status"
              :match="data"
              :live="status == 'live' ? true : false"
              v-if="data.sort_row == '1'"
            ></div>
          </td>

            <td class="align-center" >
              <span class="w-24 text-left cursor-pointer"
              :style="data.in_who_handicap == 1 ? 'color: #ff0f11; ' : 'color: white;'">
                <b-img  v-for="(card, i) in data.home_red_cards" :key="i" src="/icon/redcard.gif" class="inline-block" :title=" data.home_red_cards"/>
                <small class="font-semibold pl-0" @click="ticket(data, 'teamhome')" :title="transname(data.home_th, data.home_en)">
                  <!-- {{ transname(data.home_th,data.home_en) }} -->
                  {{ _keyLang == '_th' ? data.home_th : data.home_en  }}
                </small>
            </span>
            <span class="text-white">
              vs
            </span>
            <span class="w-24 text-left cursor-pointer"
              :style="data.in_who_handicap == 2 ? 'color: #ff0f11; ' : 'color: white;'">
              <small class="font-semibold pl-0" @click="ticket(data, 'teamaway')" :title="transname(data.away_th, data.away_en)">
                <!-- {{ transname(data.away_th,data.away_en) }} -->
                {{ _keyLang == '_th' ? data.away_th : data.away_en  }}
              </small>
              <b-img  v-for="(card, i) in data.away_red_cards" :key="i" src="/icon/redcard.gif" class="inline-block" />
            </span>
            </td>
          <td class="w-14" is="center2-column2-point2" :odds="data.odds" :marketType="'Handicap'" :isonline="data.row_is_online"></td>

          <td class="w-10" is="center2-column2-price2" :odds="data.odds" :priceGroups="data" :marketType="'Handicap'" :index="i" :type="'h'" :isonline="data.row_is_online"></td>
          <td class="w-10" is="center2-column2-price2" :odds="data.odds" :priceGroups="data" :marketType="'Handicap'" :index="i" :type="'a'" :isonline="data.row_is_online"></td>

          <td class="w-14" is="center2-column2-point2" :odds="data.odds" :marketType="'OverUnder'" :isonline="data.row_is_online"></td>
          
          <td class="w-10" is="center2-column2-price2" :odds="data.odds" :priceGroups="data" :marketType="'OverUnder'" :index="i" :type="'h'" :isonline="data.row_is_online"></td>
          <td class="w-10" is="center2-column2-price2" :odds="data.odds" :priceGroups="data" :marketType="'OverUnder'" :index="i" :type="'a'" :isonline="data.row_is_online"></td>
    </tr>
  </tbody>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["groupleague", "status", "displaytable", "numbertpye"],
  data() {
    return {
      type: "low",
      opened: [],
      modalType: null,
      dataPair: [],
      collapseAlls : false,
      collapseList : null,
      tournament: {
        id: "",
        web_id: "",
        tournament_id: "",
        name_en: "",
        info_en: "",
        name_th: "",
        info_th: "",
        sport_type: "",
        sortleague: "",
      },
      loading: false,
      datadiff: [],
    };
  },
  computed: {
    ...mapGetters({
      getbet: "tabbet/getbet",
      mockbet : "tabbet/mockbet",
      getmix: "tabmix/getmix",
      getQuickbet : "quickbet/getQuickbet",
      favEvents: "favorite/events",
      allEvents: "favorite/allEvents",
      getCollapse : 'collapseAll/getCollapse'

    }),
    checkRow() {
       let result = this.getData.reduce((acc, curr) => {
       let group = acc.find(item => item.source_event_id === curr.source_event_id);
 
       if (curr.priceRow === 0) {
           if (!group) {
             acc.push(curr);
           }
         } else {
           acc.push(curr);
         }
 
         return acc;
       }, []);
       return result
     },
    getData() {
      const result = this.groupleague;

      if (result) {

        const results = result.reduce((row, item) => {    
          if(row){

            this.dataPair = result
            this.tournament.id = result[0].tournament.id
            this.tournament.web_id = result[0].tournament.web_id
            this.tournament.tournament_id = result[0].tournament.tournament_id
            this.tournament.name_en = result[0].tournament.name_en 
            this.tournament.info_en = result[0].tournament.info_en
            this.tournament.name_th = result[0].tournament.name_th
            this.tournament.info_th = result[0].tournament.info_th
            this.tournament.sport_type = result[0].sport_type 
            this.tournament.sortleague = result[0].sortleague
            this.tournament.isPair = result[0].pair_league.is_pair

            this.opened = Array.from(Array(result.length).keys())

            let countp        = 0
            let temp          = []

            
            
            let tempMatchId   = 0
            let countMatch    = 0

            item.setting_w_b_l.forEach((setting, i) => {
                  setting.event_id = setting.event_id
                  setting.sort_row = setting.sort_row
                  
                    let datas = {
                      online: item.online,
                      away_en: item.away_en,
                      away_red_cards: item.away_red_cards != null && item.away_red_cards != 0 ? parseInt(item.away_red_cards) : null,
                      away_th: item.away_th,
                      event_date: item.event_date,
                      event_id: item.event_id,
                      has_statistics: item.has_statistics,
                      home_en: item.home_en,
                      home_red_cards: item.home_red_cards != null && item.home_red_cards != 0 ? parseInt(item.home_red_cards) : null,
                      home_th: item.home_th,
                      injury_time: item.injury_time,
                      live_away_score: item.live_away_score,
                      live_home_score: item.live_home_score,
                      period: item.period,
                      period_start_time: item.period_start_time,
                      real_kickoff_time: item.real_kickoff_time,
                      show_time: item.show_time,
                      sort_order: item.sort_order,
                      source_event_id: item.source_event_id,
                      is_live: item.is_live,
                      is_settle_match: item.is_settle_match,
                      ht_ascore: item.ht_ascore,
                      ht_hscore: item.ht_hscore,
                      ft_ascore: item.ft_ascore,
                      ft_hscore: item.ft_hscore,

                      percent: null,//odd[17],
                      l_percent: null,//odd[18],
                      in_percent: null,//odd[19],
                      a_percent: null,//odd[20],
                      h_percent: null,//odd[21],
                      x_percent: null,//odd[22],
                      a_sumary: null,//odd[23],
                      h_sumary: null,//odd[24],
                      x_sumary: null,//odd[25],
                      summary_amount: null,//odd[27],

                      b_is_open: setting ? setting.b_is_open : null,
                      w_is_open: setting ? setting.w_is_open : null,
                      l_is_open: setting ? setting.l_is_open : null,

                      st_w_is_open: setting ? setting.st_w_is_open : null,
                      st_b_is_open: setting ? setting.st_b_is_open : null,
                      st_l_is_open: setting ? setting.st_l_is_open : null,

                      mix_w_is_open: setting ? setting.mix_w_is_open : null,
                      mix_b_is_open: setting ? setting.mix_b_is_open : null,
                      mix_l_is_open: setting ? setting.mix_l_is_open : null,

                      is_close_bf_kickoff_sc: setting ? setting.is_close_bf_kickoff_sc : null,
                      is_close_bf_kickoff_st: setting ? setting.is_close_bf_kickoff_st : null,
                      is_close_bf_kickoff_mix: setting ? setting.is_close_bf_kickoff_mix : null,

                      // close_bf_kickoff_sc: item[26],
                      // close_bf_kickoff_st: item[27],
                      // close_bf_kickoff_mix: item[28],
                      channel_live: item.channel_live,

                      id: null,//odd[0],
                      sort_row: setting.sort_row,
                      in_who: null,
                      odds: [],
                      // event_results: event_results,
                      row_is_online : null,
                      sortleague : item.sortleague,
                      pair_league: item.pair_league,
                      a_r_n : countp,
                      in_who_handicap : null,//odd[10] == 'Handicap' ? odd[15] : 0,
                      in_who_fh_handicap : null,//odd[10] == 'FH_Handicap' ? odd[15] : 0,
                      new_sort : null,
                      row_is_online : 0,
                      
                      name_en : result[0].tournament.name_en ,
                      name_th : result[0].tournament.name_th ,
                      tournament_id : result[0].tournament.tournament_id ,

                      priceRow : item.priceRow,

                      sport_type : result[0].tournament.sport_type
                }

                    if (item.odds.length == 0) {
                      row.push(datas);
                    }else{
                      if(item.odds){
                        item.odds.filter(a => setting.sort_row === a.sort_row && setting.event_id === a.event_id).forEach((odd, i) => {
                      const existing = row.find(a => a.sort_row === odd.sort_row && a.event_id === odd.event_id);

                      // console.log('row_'+odd[7]+'_'+ odd[1] , odd[1] , odd[5] , odd[5] == 1 ? 1 : datas.row_is_online);
                      datas.in_who_handicap     = odd.market_type == 'Handicap' ? odd.in_who : datas.in_who_handicap
                      datas.in_who_fh_handicap  = odd.market_type == 'FH_Handicap' ? odd.in_who :datas.in_who_handicap
                      datas.row_is_online       = odd.online == 1 ? 1 : datas.row_is_online,
                      datas.new_sort            = datas.sort_order+'-E'+datas.event_id+'-R'+datas.sort_row

                      let setodd = {
                          a_percent: odd.a_percent,
                          a_sumary: odd.a_sumary,
                          event_id: odd.event_id,
                          h_percent: odd.h_percent,
                          h_sumary: odd.h_sumary,
                          hasMixParlay: odd.hasMixParlay,
                          id: odd.id,
                          in_percent: odd.in_percent,
                          in_who: odd.in_who,
                          is_live: odd.is_live,
                          l_percent: odd.l_percent,
                          market_type: odd.market_type,
                          odds_id: odd.odds_id,
                          online: odd.online,
                          percent: odd.percent,
                          point: odd.point,
                          prices: odd.prices,
                          sort_order: odd.sort_order,
                          sort_row: odd.sort_row,
                          source_event_id: odd.source_event_id,
                          source_odds_id: odd.source_odds_id,
                          sport: odd.sport,
                          status: odd.status,
                          summary_amount: odd.summary_amount,
                          web_id: odd.web_id,
                          x_percent: odd.x_percent,
                          x_sumary: odd.x_sumary,
                          row_is_online : null,
                          sortleague : item.sortleague,
                          a_r_n : countp,

                      }


                      if (existing) {
                        existing.odds.push(setodd);
                      } else {

                          datas.percent     = odd.percent,
                          datas.l_percent   = odd.l_percent,
                          datas.in_percent  = odd.in_percent,
                          datas.a_percent   = odd.a_percent,
                          datas.h_percent   = odd.h_percent,
                          datas.x_percent   = odd.x_percent,
                          datas.a_sumary    = odd.a_sumary,
                          datas.h_sumary    = odd.h_sumary,
                          datas.x_sumary    = odd.x_sumary,
                          datas.summary_amount = odd.summary_amount,

                          datas.id          = odd.id,
                          datas.sort_row    = odd.sort_row,
                          datas.in_who      = odd.in_who,
                          datas.odds        = [setodd],

                          datas.in_who_handicap     = odd.market_type == 'Handicap' ? odd.in_who : datas.in_who_handicap
                          datas.in_who_fh_handicap  = odd.market_type == 'FH_Handicap' ? odd.in_who :datas.in_who_handicap
                          datas.row_is_online       = odd.online == 1 ? 1 : datas.row_is_online,
                          datas.new_sort            = datas.sort_order+'-E'+datas.event_id+'-R'+datas.sort_row



                        row.push(datas);
 
                         }
                        });
                      }
                    }
                    
                  });




                  // console.log('rowrow',row);

                  let a_row = row.sort(function(a, b){
                      let nameA = a.pair_league[3];
                      let nameB = b.pair_league[3];
                      if (nameA < nameB){
                        return -1;
                      } 
                      if (nameA > nameB){
                        return 1;
                      }
                      return 0;
                  })
                  .map(item => {
                    if (tempMatchId != item.event_id) {
                      tempMatchId = item.event_id
                      countMatch++
                    }
                    item.count_match = countMatch
                    return item
                  })
                  
                return a_row

                }

                

        }, []);
        // console.log('resultsresults',results);

        if(this.collapseAlls){
          for (let i = 0; i < results.length; i++) {
            results[i].collapse = 'open'
          }
        }else{
          for (let i = 0; i < results.length; i++) {
            results[i].collapse = 'close'
          }
        }

        if(this.collapseList != null){
          for (let i = 0; i < results.length; i++) {
            if(this.collapseList == results[i].pair_league[1]){
              results[i].collapse = 'open'
            }
          }
          
        }
        
        
        return results;
      } else {
      }
    },
  },
  methods: {
    ...mapActions({
      pushBetList: "tabmix/pushBetList",
      fetchGetListBet: "listbet/fetchGetListBet",
      fetchActionsTab: "tabbet/fetchActionsTab",
      fetchbetlist : "fetchbet/fetchbetlist",
      actionsQuickbet: "quickbet/actionsQuickbet",
      insertFavorite: "favorite/insertFavorite",
      removeFavorite: "favorite/removeFavorite",
      insertFavoriteLeague: "favorite/insertFavoriteLeague",
      removeFavoriteLeague: "favorite/removeFavoriteLeague",
      initializeFavorites: "favorite/initializeFavorites",
      setCollapse : 'collapseAll/setCollapse'
    }),
    CollapseBet(){
      if(this.collapseList == null){
        this.collapseList = this.tournament.tournament_id
      }else{
        if(this.collapseList == this.tournament.tournament_id){
          this.collapseList = null
        }else{
          this.collapseList = this.tournament.tournament_id
        }
      }
      
    },
    fetchGetData() {
      this.$emit("fetch");
    },
    toggleFavoriteLeague(league) {
      const isFavorite = this.$store.state.favorite.leagues.includes(league)

      this.getData.forEach(match => {
        
        const sport = match.sport_type.id
        const event = match.event_id
        this.toggleFavorite(sport, event, isFavorite)
      })

      if (isFavorite) {
        this.removeFavoriteLeague(league)
      } else {
        this.insertFavoriteLeague(league)
      }



    },
    toggleFavorite(sport, event, isFavorite) {
      const isEventFavorite = this.$store.state.favorite.eventId.includes(event)

      if (isEventFavorite !== isFavorite) {
        return
      }

      if (isEventFavorite) {
        this.removeFavorite({ sport, event })
      } else {
        this.insertFavorite({ sport, event })
      }
    },
    stypType(m , index){
      if(m.priceGroups['Handicap'] != undefined){
          if(m.priceGroups['Handicap'][index-1] != undefined){
            return m.priceGroups['Handicap'][index-1][15]
          }else{
            return '1'
          }
        }else if(m.priceGroups['OverUnder'] != undefined){
          if(m.priceGroups['OverUnder'][index-1] != undefined){
            return m.priceGroups['OverUnder'][index-1][15]
          }else{
            return '1'
          }
        }else if(m.priceGroups['FH_Handicap'] != undefined){
          if(m.priceGroups['FH_Handicap'][index-1] != undefined){
            return m.priceGroups['FH_Handicap'][index-1][15]
          }else{
            return '1'
          }
        }else if(m.priceGroups['FH_OverUnder'] != undefined){
          if(m.priceGroups['FH_OverUnder'][index-1] != undefined){
            return m.priceGroups['FH_OverUnder'][index-1][15]
          }else{
            return '1'
          }
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
    tdClass(status){
      if(status == 'live'){
        return "td-live"
      }else if(status == "nonLive"){
        return "td-notlive"
      }else if(status == "early"){
        return "td-early"
      }
    },
  },
  watch : {
    getCollapse: {
      handler() {
        if(this.getCollapse.type == 'live'){
          if(this.getCollapse.collapse){
            this.collapseAlls = true
          }else{
            this.collapseAlls = false
          }
        }
        
      },
      deep: true
    }
  }
};
</script>