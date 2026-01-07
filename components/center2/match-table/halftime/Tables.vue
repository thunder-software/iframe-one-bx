<template>
  <div>
    <table small striped hover bordered class="text-center rounded m-0 " style="border: 0px; width: 100%;"
      :class="tableClass(status)">
      <thead>
        <tr>
          <th rowspan="2" class="w-2">
            <span>
              <b-icon
              @click="collapseData('all')"
              style="cursor:pointer;"
              :icon="collapse_All  ? 'chevron-down' : 'chevron-up'"
              class=""
              ></b-icon>
            </span>
          </th>
          <th rowspan="2" class="align-middle" style="width: 72px !important;">
            <small class="font-semibold">
              {{ trans("content.time") }}
            </small>
          </th>
          <th rowspan="2" class="align-middle">
            <small class="font-semibold">
              {{ trans("content.event") }}
            </small>
          </th>
          <th colspan="9" style="border: 0px">
            <small class="font-semibold">
              {{ trans("content.halftime") }}
            </small>
          </th>
        </tr>
        <tr>
          <th class="align-middle" style="width: 50px !important;"><small class="font-semibold">
              HDP
            </small></th>
          <th class="w-14 align-middle">
            <div>
              <small class="font-semibold">
                {{ trans("content.home") }}
              </small>
            </div>
          </th>
          <th class="w-16 align-middle"><small class="font-semibold">{{
            trans("content.away")
          }}</small></th>
          <th class="w-12 align-middle"><small class="font-semibold">{{
            trans("content.goal")
          }}</small></th>
          <th class="w-12 align-middle"><small class="font-semibold">
              {{ trans("content.over") }}
            </small></th>
          <th class="w-12 align-middle"><small class="font-semibold">
              {{ trans("content.under") }}
            </small></th>
          <!--ครึ่งเวลา1*2-->
          <th class="w-12 align-middle"><small class="font-semibold">1</small></th>
          <th class="w-12 align-middle"><small class="font-semibold">X</small></th>
          <th class="w-12 align-middle"><small class="font-semibold">2</small></th>
        </tr>
      </thead>
      <tbody v-if="matches.length == 0">
        <tr>
          <td class="w-2"></td>
          <td colspan="17" class="text-center p-2" style="height: 27px">
            <small class="text-white">{{ trans("content.notmatch") }}</small>
          </td>
        </tr>
      </tbody>
      <tbody v-for="(match, i) in matches" :key="i" :class="fontSize(displaytable.fontSize)">
        <tr v-if="match.newLeague">
          <td class="w-2 cursor-pointer" :class="tdClass(status)">
            <b-icon
              @click="$emit('CollapseBet', match)"
              style="cursor:pointer;"
              :icon="match.collapse != 'open'  ? 'chevron-up' : 'chevron-down'"
              class=""
              ></b-icon> 
          </td>
          <td colspan="11" class="text-left " :class="tdClass(status)" style="height: 27px">
            <div class="flex">
              <div class="flex-1">
                <div class="inline-block pl-2 favorite-head">
                  <small @click="toggleFavoriteLeague(match.tournament[0])" class="inline-block">
                    <b-icon :icon="$store.state.favorite.leagues.includes(match.tournament[0]) ? 'star-fill' : 'star'"
                      :variant="$store.state.favorite.leagues.includes(match.tournament[0]) ? 'warning' : ''" />
                  </small>
                </div>
                <div class="inline-block">
                  <small class="font-semibold">
                    {{ match.tournament['name' + _keyLang] ? match.tournament['name' + _keyLang] :
                      match.tournament['name_en'] }}
                  </small>
                </div>
              </div>
              <div class="flex text-center">
                <span class="pt-0 pr-1 cursor-pointer" @click="fetchGetData">
                  <b-icon icon="arrow-repeat" :animation="loading ? 'spin' : ''"></b-icon>
                </span>
              </div>
            </div>
          </td>
        <tr v-if="match.newLeague">
          <th colspan="3" :class="tdClass(status)" class="align-middle" style="width: 50px !important;"><small
              v-if="i != 0" class="font-semibold"> </small></th>
          <th :class="tdClass(status)" class="align-middle" style="width: 50px !important;"><small v-if="i != 0"
              class="font-semibold">
              HDP
            </small></th>
          <th :class="tdClass(status)" class="w-14 align-middle">
            <div>
              <small v-if="i != 0" class="font-semibold">
                {{ trans("content.home") }}
              </small>
            </div>
          </th>
          <th :class="tdClass(status)" class="w-16 align-middle"><small v-if="i != 0" class="font-semibold">{{
            trans("content.away")
          }}</small></th>
          <th :class="tdClass(status)" class="w-12 align-middle"><small v-if="i != 0" class="font-semibold">{{
            trans("content.goal")
          }}</small></th>
          <th :class="tdClass(status)" class="w-12 align-middle"><small v-if="i != 0" class="font-semibold">
              {{ trans("content.over") }}
            </small></th>
          <th :class="tdClass(status)" class="w-12 align-middle"><small v-if="i != 0" class="font-semibold">
              {{ trans("content.under") }}
            </small></th>
          <th :class="tdClass(status)" class="w-12 align-middle"><small v-if="i != 0" class="font-semibold">1</small></th>
          <th :class="tdClass(status)" class="w-12 align-middle"><small v-if="i != 0" class="font-semibold">X</small></th>
          <th :class="tdClass(status)" class="w-12 align-middle"><small v-if="i != 0" class="font-semibold">2</small></th>
        </tr>
        </tr>
        <tr v-if="match.priceRow == 0 && match.setting_w_b_l[index][numbertpye] != 0 && match.period != '2' && match.collapse != 'open'"
          v-for="(item, index) in match.setting_w_b_l" :key="index" style="border-top: 0px"
          :class="{'odd' : match.count_match % 2 == 0 , 'hidden' : index != 0}">
          <td class="align-center w-12" style="height: 40px" colspan="2">
            <!-- <center2-column-time
              :status="status"
              :match="match"
              v-if="index == 0"
              :live="status == 'live' ? true : false"
            ></center2-column-time> -->
            <div is="center2-column-time" :status="status" :match="match" v-if="index == 0"
              :live="status == 'live' ? true : false">
            </div>
            <!-- <div v-if="index==1 && showFavoriteButton">
              <div @click="toggleFavorite(match.tournament[5]['id'], match.event_id)" class="d-inline">
                <b-icon :icon="$store.state.favorite.eventId.includes(match.event_id) ? 'star-fill' : 'star'" :variant="$store.state.favorite.eventId.includes(match.event_id) ? 'warning' : ''" />
              </div>
            </div> -->
          </td>
          <td class="align-center">
            <div class="text-left pl-2">
              <div class="inline-block">
                <small class="block font-semibold" :class="namepath == 'muaythai-path' ? 'text-danger' : ''"> {{
                  match['home' + _keyLang] ? match['home' + _keyLang] : match['home_en'] }} <b-img
                    v-for="(card, i) in match.home_red_cards" :key="i" src="/icon/redcard.gif"
                    class="inline-block" /></small>
                <small class="block font-semibold"> {{ match['away' + _keyLang] ? match['away' + _keyLang] : match['away_en']
                }} <b-img v-for="(card, i) in match.away_red_cards" :key="i" src="/icon/redcard.gif"
                    class="inline-block" /></small>
              </div>
            </div>
          </td>
          <td class="bg"></td>
          <td></td>
          <td></td>
          <td class="bg"></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr v-for="index in match.priceRow" :key="index" style="border-top: 0px" :style="checkStatusTable(match.period)" 
        :class="{'odd': (match.count_match % 2 == 0),'hidden' : hiddenRow(match , 'FH_Handicap' ,index)} " v-if="match.collapse != 'open'">
          <td class="align-center w-12" style="height: 40px" colspan="2">
            <div is="center2-column-time" :status="status" :match="match" v-if="index == 1"
              :live="status == 'live' ? true : false">
            </div>
          </td>
          <td class="align-center">
            <div class="text-left pl-2">
              <div class="inline-block">
                <small class="block font-semibold" :class="stypType(match, index) == '1' ? 'text-danger' : 'text-white'">{{
                  match['home' + _keyLang] ? match['home' + _keyLang] : match['home_en'] }} <b-img
                    v-for="(card, i) in match.home_red_cards" :key="i" src="/icon/redcard.gif"
                    class="inline-block" />( 1st )</small>
                <small class="block font-semibold" :class="stypType(match, index) == '2' ? 'text-danger' : 'text-white'">{{
                  match['away' + _keyLang] ? match['away' + _keyLang] : match['away_en'] }} <b-img
                    v-for="(card, i) in match.away_red_cards" :key="i" src="/icon/redcard.gif"
                    class="inline-block" />( 1st )</small>
              </div>
            </div>
          </td>
          <td class="w-12 align-center bg">
            <div is="center2-column-point" :priceGroups="match" market_type="FH_Handicap" :index="index">
            </div>
          </td>
          <td class="w-12 align-center " is="center2-column2-price" :priceGroups="match" :index="index"
            price_type="h" market_type="FH_Handicap">
          </td>
          <td class="w-12 align-center " is="center2-column2-price" :priceGroups="match" :index="index"
            price_type="a" market_type="FH_Handicap">
          </td>
          <td class="w-12 align-center bg">
            <div is="center2-column-point" :priceGroups="match" market_type="FH_OverUnder" :index="index">
            </div>
          </td>

          <td class="w-12 align-center " is="center2-column2-price" :priceGroups="match" :index="index"
            price_type="h" market_type="FH_OverUnder">

          </td>
          <td class="w-12 align-center " is="center2-column2-price" :priceGroups="match" :index="index"
            price_type="a" market_type="FH_OverUnder">
          </td>
          <td class="w-12 align-center " is="center2-column2-price" :priceGroups="match" v-if="index == 1" :index="1"
            price_type="h" market_type="FH_1x2">
          </td>
          <td v-else></td>
          <td class="w-12 align-center " is="center2-column2-price" :priceGroups="match" v-if="index == 1" :index="1"
            price_type="x" market_type="FH_1x2">
          </td>
          <td v-else></td>
          <td class="w-12 align-center " is="center2-column2-price" :priceGroups="match" v-if="index == 1" :index="1"
            price_type="a" market_type="FH_1x2">
          </td>
          <td v-else></td>
        </tr>
  
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import collect from "collect.js";
import moment from "moment";
export default {
  props: {
    setData: {
      type: Array,
      default: [],
    },
    status: {
      type: String,
      default: 'live',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    displaytable: {
      type: Object,
      default: {},
    },
    type_nonlive: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      numbertpye: null,
      namepath: null,
      scY: 0,
      scTimer: 0,
      loadmoreshow: false,
      btnmores: false,
      length_load: 15,
      isFavorite: null,
      pathName: '',
      collapse_All : false,
    }
  },
  computed: {
    ...mapGetters({
      eventId: "favorite/eventId",
      allEvents: "favorite/allEvents",
    }),
    showFavoriteButton() {
      return (this.isFavorite || (this.pathName != 'mixparlay' && this.pathName != 'step' && this.pathName != 'early'))
    },
    sortBySbo() {
      const collection = collect(this.setDataTable).sortBy('sort_order')
      return collection.all()
    },
    sortByTime() {
      const collection = collect(this.setDataTable).sortBy((match) => {
        return moment(match.real_kickoff_time).format('X')
      })
      collection.all().filter(f => f.newLeague = true)
      for (let i = 0; i < collection.all().length; i++) {
        if (i === 0) {
          continue;
        }
        for (let j = 0; j < i; j++) {
          if (collection.all()[i].tournament.tournament_id == collection.all()[j].tournament.tournament_id && collection.all()[i].real_kickoff_time == collection.all()[j].real_kickoff_time) {
            collection.all()[i].newLeague = false;
          }
        }
      }
      return collection.all()
    },
    setDataTable() {
      return this.setData
    },
    matches() {

      var obj = this.setData.reduce((group, match) => {
             const sport_type_id = match.tournament[0]+'-'+match.web_id;
             group[sport_type_id] = group[sport_type_id] ?? [];
             group[sport_type_id].push(match);
             return group;
         }, {});
         
         var newArray = []
         for (const array2 in obj) {
          obj[array2].forEach((item) => {
              if(item.priceGroups['FH_Handicap']){
                  item.hidden_row = 1
                  newArray.push(item)                
              }else{                
                item.priceRow = 1
                newArray.push(item) 
              }
              
            })
           
         }

         var nonliveArray = []
      if (this.type_nonlive == 'nonlive') {
        if (newArray) {
          nonliveArray = newArray.filter(f => f.priceGroups['FH_Handicap'])
          if (this.$route.name.split('-')[0] == 'football') {
            return this.displaytable.sortBy == 'SortByNormal' ? nonliveArray.slice(0, this.length_load) : this.sortByTime.slice(0, this.length_load);
          } else {
            return this.displaytable.sortBy == 'SortByNormal' ? nonliveArray : this.sortByTime
          }
        }
      } else {         
        return this.displaytable.sortBy == 'SortByNormal' ? newArray : this.sortByTime
      }
    },
  },
  methods: {
    ...mapActions({
      insertFavorite: "favorite/insertFavorite",
      removeFavorite: "favorite/removeFavorite",
      insertFavoriteLeague: "favorite/insertFavoriteLeague",
      removeFavoriteLeague: "favorite/removeFavoriteLeague",
      initializeFavorites: "favorite/initializeFavorites",
      setCollapse : 'collapseAll/setCollapse'
    }),
    collapseData(){
      this.collapse_All = !this.collapse_All
      var data = {
        'collapse' : this.collapse_All,
        'type' : this.type_nonlive == 'nonlive' ? 'nonlive' : 'live'
      }
      this.setCollapse(data)
    },
    checkrow(priceGroups , market_type ,index){
      if(priceGroups.priceGroups[market_type] != undefined &&
      priceGroups.priceGroups[market_type][index - 1] != undefined && priceGroups.priceGroups[market_type][index - 1].l_percent != null && priceGroups.priceGroups[market_type][index - 1].in_percent != null){
        if(priceGroups){
          priceGroups.chickrow = 1
        }
        return null
        
      }else{
        if(priceGroups.priceGroups[market_type]){
          return priceGroups.priceGroups[market_type].length
        }
        
      }
    },
    hiddenRow(priceGroups , market_type ,index){
      // if(this.type_nonlive == 'nonlive'){
      //   if(priceGroups.priceGroups[market_type] != undefined &&
      //   priceGroups.priceGroups[market_type][index - 1] != undefined && priceGroups.priceGroups[market_type][index - 1].l_percent != null && priceGroups.priceGroups[market_type][index - 1].in_percent != null){
      //     return null
      //   }else{
      //     return true
      //   }   
      // }else{
        if(priceGroups.hidden_row == 1){
          if(priceGroups.priceGroups[market_type] != undefined &&
          priceGroups.priceGroups[market_type][index - 1] != undefined && priceGroups.priceGroups[market_type][index - 1].l_percent != null && priceGroups.priceGroups[market_type][index - 1].in_percent != null){
            return null
          }else{
            return true
        }       
      // }
      }
    },
    checkpointhide(priceGroups,market_type,index){
      return priceGroups.priceGroups[market_type] != undefined &&
      priceGroups.priceGroups[market_type][index - 1] != undefined && priceGroups.priceGroups[market_type][index - 1].l_percent != null && priceGroups.priceGroups[market_type][index - 1].in_percent != null
    },
    checkhidetr(item,index){
      if(this.type_nonlive == 'nonlive'){ 
        if(this.checkpointhide(item,'FH_Handicap',index) == true && this.checkpointhide(item,'FH_OverUnder',index) == true){
          return false
        }else{
          return true
        }      
      }
    },
    handleScroll() {
      if ((window.innerHeight + window.scrollY + 500) >= document.body.offsetHeight) {
        // if (window.innerWidth >= 600) {
          this.loadMore()
        // }
      }
    },
    checkStatusTable(event){
      if(this.status == 'live'){
        if(event == '2' || event == '5'){
          return 'display: none;'
        }
      }
    },
    loadMore(type) {
      this.loadmoreshow = true
      if (type == 'mb') {
        if (this.length_load > this.setData.length) return;
        this.length_load = this.length_load + 20;
      } else {
        if (this.length_load > this.setData.length) return;
        this.length_load = this.length_load + 10;
      }

      // if (this.length_load >= this.setData.length) {
      //   if (window.innerWidth >= 1200) {
      //     this.btnmores = false
      //   }
      // }
      setTimeout(() => {
        this.loadmoreshow = false
      }, 500);
    },
    stypType(m, index) {
      if (m.priceGroups['Handicap'] != undefined) {
        if (m.priceGroups['Handicap'][index - 1] != undefined) {
          return m.priceGroups['Handicap'][index - 1][15]
        } else {
          return '1'
        }
      } else if (m.priceGroups['OverUnder'] != undefined) {
        if (m.priceGroups['OverUnder'][index - 1] != undefined) {
          return m.priceGroups['OverUnder'][index - 1][15]
        } else {
          return '1'
        }
      } else if (m.priceGroups['FH_Handicap'] != undefined) {
        if (m.priceGroups['FH_Handicap'][index - 1] != undefined) {
          return m.priceGroups['FH_Handicap'][index - 1][15]
        } else {
          return '1'
        }
      } else if (m.priceGroups['FH_OverUnder'] != undefined) {
        if (m.priceGroups['FH_OverUnder'][index - 1] != undefined) {
          return m.priceGroups['FH_OverUnder'][index - 1][15]
        } else {
          return '1'
        }
      }
    },
    fetchGetData() {
      this.$emit('fetch')
    },
    tableClass(status) {
      if (status == 'live') {
        return "table-live"
      } else if (status == "nonLive") {
        return "table-notlive"
      } else if (status == "early") {
        return "table-early"
      }
    },
    tdClass(status) {
      if (status == 'live') {
        return "td-live"
      } else if (status == "nonLive") {
        return "td-notlive"
      } else if (status == "early") {
        return "td-early"
      }
    },
    toggleFavoriteLeague(league) {
      const filtered = this.allEvents.filter(match => match.tournament[0] === league)
      const isFavorite = this.$store.state.favorite.leagues.includes(league)

      filtered.forEach(match => {
        const sport = match.tournament[5]['id']
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
  },
  mounted() {
    this.initializeFavorites()

    this.isFavorite = this.$route.path.split('/')[1] == 'favorite'
    this.pathName = this.$route.params.path

    window.addEventListener("scroll", this.handleScroll);
  },
  created() {
    // if (window.innerWidth <= 1200) {
    //   if (this.$route.name.split('-')[0] == 'football') {
    //     this.btnmores = true
    //   }
    // }
    this.namepath = this.$route.name
    if (this.$route.params.path == 'step') {
      this.numbertpye = 5
    } else if (this.$route.params.path == 'mixparlay') {
      this.numbertpye = 8
    } else {
      this.numbertpye = 2
    }
  },
};
</script>
