<template>
  <div>
    <table small striped hover bordered class="text-center rounded m-0 " style="border: 0px; width: 100%;"
      :class="tableClass(status)">
      <div is="center2-match-table-newline-th-single" :status='status' v-if="displaytable.lineType == 'SingleLine'"></div>

      <div is="center2-match-table-newline-th-double" :status="status" v-if="displaytable.lineType == 'DoubleLine'"></div>

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
          <td colspan="15" class="text-left " :class="tdClass(status)" style="height: 27px;">
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
                      match.tournament['name_en']
                    }}
                  </small>
                </div>
                <!-- <small class="pl-3 font-semibold">
                  {{ match.tournament['name'+_keyLang] ? match.tournament['name'+_keyLang]  : match.tournament['name_en'] }}
                </small> -->
              </div>
              <div class="flex text-right">
                <span class="pt-0 pr-1 cursor-pointer" @click="fetchGetData">
                  <b-icon icon="arrow-repeat" :animation="loading ? 'spin' : ''"></b-icon>
                </span>
              </div>
            </div>
          </td>
        <tr v-if="match.newLeague && match.collapse != 'open'">
          <th colspan="3" :class="tdClass(status)" v-if="displaytable.lineType == 'SingleLine'"></th>
          <th class="w-12" :class="tdClass(status)" v-if="displaytable.lineType == 'SingleLine'"><small
              class="font-semibold" v-if="i != 0">
              HDP
            </small></th>
          <th class="w-14" :class="tdClass(status)" v-if="displaytable.lineType == 'SingleLine'">
            <div>
              <small class="font-semibold" v-if="i != 0">
                {{ trans("content.home") }}
              </small>
            </div>
          </th>
          <th class="w-16" :class="tdClass(status)" v-if="displaytable.lineType == 'SingleLine'"><small
              class="font-semibold" v-if="i != 0">{{
                trans("content.away")
              }}</small></th>
          <th class="w-12" :class="tdClass(status)" v-if="displaytable.lineType == 'SingleLine'"><small
              class="font-semibold" v-if="i != 0">{{
                trans("content.goal")
              }}</small></th>
          <th class="w-12" :class="tdClass(status)" v-if="displaytable.lineType == 'SingleLine'"><small
              class="font-semibold" v-if="i != 0">
              {{ trans("content.over") }}
            </small></th>
          <th class="w-12" :class="tdClass(status)" v-if="displaytable.lineType == 'SingleLine'"><small
              class="font-semibold" v-if="i != 0">
              {{ trans("content.under") }}
            </small></th>

          <th class="w-12" :class="tdClass(status)" v-if="displaytable.lineType == 'SingleLine'"><small
              class="font-semibold" v-if="i != 0">
              HDP
            </small></th>
          <th class="w-14" :class="tdClass(status)" v-if="displaytable.lineType == 'SingleLine'">
            <div>
              <small class="font-semibold" v-if="i != 0">
                {{ trans("content.home") }}
              </small>
            </div>
          </th>
          <th class="w-16" :class="tdClass(status)" v-if="displaytable.lineType == 'SingleLine'"><small
              class="font-semibold" v-if="i != 0">{{
                trans("content.away")
              }}</small></th>
          <th class="w-12" :class="tdClass(status)" v-if="displaytable.lineType == 'SingleLine'"><small
              class="font-semibold" v-if="i != 0">{{
                trans("content.goal")
              }}</small></th>
          <th class="w-12" :class="tdClass(status)" v-if="displaytable.lineType == 'SingleLine'"><small
              class="font-semibold" v-if="i != 0">
              {{ trans("content.over") }}
            </small></th>
          <th class="w-12" :class="tdClass(status)" v-if="displaytable.lineType == 'SingleLine'"><small
              class="font-semibold" v-if="i != 0">
              {{ trans("content.under") }}
            </small></th>
          <th :class="tdClass(status)" v-if="displaytable.lineType == 'SingleLine'"></th>



          <th v-if="displaytable.lineType == 'DoubleLine'" :class="tdClass(status)" class="w-2"></th>  

          <th v-if="displaytable.lineType == 'DoubleLine'" :class="tdClass(status)" class="w-24" colspan="2"></th>
          <th v-if="displaytable.lineType == 'DoubleLine'" :class="tdClass(status)" class="w-24" colspan="2">
            <small class="font-semibold" v-if="i != 0">
              {{ trans("content.fulltime") }}
            </small>
          </th>
          <th v-if="displaytable.lineType == 'DoubleLine'" :class="tdClass(status)" class="w-18" colspan="2">
            <div>
              <small class="font-semibold" v-if="i != 0">{{ trans("content.over") }} /
                {{ trans("content.under") }}</small>
            </div>
          </th>

          <th v-if="displaytable.lineType == 'DoubleLine'" :class="tdClass(status)" class="w-18" colspan="1">
            <small class="font-semibold" v-if="i != 0">1X2</small>
          </th>

          <th v-if="displaytable.lineType == 'DoubleLine'" :class="tdClass(status)" class="w-18" colspan="1">
            <small class="font-semibold" v-if="i != 0">{{ trans("content.odd") }}/{{ trans("content.even") }}</small>
          </th>

          <th v-if="displaytable.lineType == 'DoubleLine'" :class="tdClass(status)" class="w-18" colspan="2"><small
              class="font-semibold" v-if="i != 0">
              {{ trans("content.halftime") }}
            </small></th>
          <th v-if="displaytable.lineType == 'DoubleLine'" :class="tdClass(status)" class="w-18" colspan="2"><small
              class="font-semibold" v-if="i != 0">{{ trans("content.over") }} / {{ trans("content.under") }}</small></th>

          <th v-if="displaytable.lineType == 'DoubleLine'" :class="tdClass(status)" class="w-18" colspan="1">
            <small class="font-semibold" v-if="i != 0">1X2</small>
          </th>
        </tr>
        </tr>


        <tr v-if="match.priceRow == 0 && match.setting_w_b_l[index][numbertpye] != 0 && match.collapse != 'open'"
          v-for="(item, index) in match.setting_w_b_l" :key="index" style="border-top: 0px ;"
          :class="{'odd' :match.count_match % 2 == 0 , 'hidden' : index != 0}">
          <td v-if="displaytable.lineType == 'DoubleLine'"></td>
          <td v-if="displaytable.lineType == 'SingleLine'"></td>
          <td is="center2-column-time" class="align-top" style="height: 40px; width: 68px !important;"
            v-if="displaytable.lineType == 'SingleLine' && index == 0" :status="status" :match="match"
            :live="status == 'live' ? true : false">
            <!-- <div v-if="index==1 && showFavoriteButton">
                <div @click="toggleFavorite(match.tournament[5]['id'], match.event_id)" class="d-inline">
                  <b-icon :icon="$store.state.favorite.eventId.includes(match.event_id) ? 'star-fill' : 'star'" :variant="$store.state.favorite.eventId.includes(match.event_id) ? 'warning' : ''" />
                </div>
              </div> -->
          </td>
          <td class="align-top" style="height: 40px; width: 68px !important;" v-else>
            <div is="center2-column-time" :status="status" :match="match" v-if="index == 0"
              :live="status == 'live' ? true : false"></div>
            <!-- <div v-if="index==1 && showFavoriteButton">
                <div @click="toggleFavorite(match.tournament[5]['id'], match.event_id)" class="d-inline">
                  <b-icon :icon="$store.state.favorite.eventId.includes(match.event_id) ? 'star-fill' : 'star'" :variant="$store.state.favorite.eventId.includes(match.event_id) ? 'warning' : ''" />
                </div>
              </div> -->
          </td>
          <td v-if="displaytable.lineType == 'SingleLine'">
            <div class="text-left pl-2">
              <div class="inline-block">
                <small class="block font-semibold" :class="namepath == 'muaythai-path' ? 'text-danger' : ''"> {{
                  match['home' + _keyLang] ? match['home' + _keyLang] : match['home_en'] }} <b-img
                    v-for="(card, i) in match.home_red_cards" :key="i" src="/icon/redcard.gif"
                    class="inline-block" /></small>
                <small class="block font-semibold"> {{ match['away' + _keyLang] ? match['away' + _keyLang] :
                  match['away_en']
                }} <b-img v-for="(card, i) in match.away_red_cards" :key="i" src="/icon/redcard.gif"
                    class="inline-block" /></small>
              </div>
            </div>
          </td>

          <td class="align-top" v-else>
            <!-- <div class="grid grid-row-2 text-left pl-2"> -->
            <div class="text-left pl-2">
              <div>
                <small class="inline-block font-semibold" :class="namepath == 'muaythai-path' ? 'text-danger' : ''"> {{
                  match['home' + _keyLang] ? match['home' + _keyLang] : match['home_en'] }} <b-img
                    v-for="(card, i) in match.home_red_cards" :key="i" src="/icon/redcard.gif"
                    class="inline-block" /></small>
              </div>
              <div>
                <small class="inline-block font-semibold"> {{ match['away' + _keyLang] ? match['away' + _keyLang] :
                  match['away_en'] }} <b-img v-for="(card, i) in match.away_red_cards" :key="i" src="/icon/redcard.gif"
                    class="inline-block" /></small>
              </div>
              <div>
                <small class="text-secondary font-semibold">{{ trans("content.draw") }}</small>
              </div>
            </div>
          </td>
          <td class="bg"></td>
          <td v-if="displaytable.lineType == 'SingleLine'"></td>
          <td></td>
          <td class="bg"></td>
          <td></td>
          <td></td>
          <td class="bg" v-if="displaytable.lineType == 'SingleLine'"></td>
          <td></td>
          <td v-if="displaytable.lineType == 'SingleLine'"></td>
          <td class="bg"></td>
          <td v-if="displaytable.lineType == 'SingleLine'"></td>
          <td></td>
          <td class="bg" v-if="displaytable.lineType == 'DoubleLine'"></td>
          <td v-if="displaytable.lineType == 'DoubleLine'"></td>
          <td v-if="displaytable.lineType == 'DoubleLine'"></td>
          <td v-if="displaytable.lineType == 'SingleLine'"></td>
        </tr>

        <tr v-for="index in match.priceRow" :key="index" style="border-top: 0px"
        :class="{'odd' :match.count_match % 2 == 0}" v-if="match.collapse != 'open'">
          <td class="align-top" style="height: 40px; width: 68px !important;"
            v-if="displaytable.lineType == 'SingleLine'" colspan="2">
            <!-- <center2-column-time
              :status="status"
              :match="match"
              :live="status == 'live' ? true : false"
            ></center2-column-time> -->
            <div is="center2-column-time" :status="status" :match="match" v-if="index == 1"
              :live="status == 'live' ? true : false"></div>
            <!-- <div v-if="index==1 && showFavoriteButton">
              <div @click="toggleFavorite(match.tournament[5]['id'], match.event_id)" class="d-inline">
                <b-icon :icon="$store.state.favorite.eventId.includes(match.event_id) ? 'star-fill' : 'star'" :variant="$store.state.favorite.eventId.includes(match.event_id) ? 'warning' : ''" />
              </div>
            </div> -->
          </td>
          <td v-if="index != 1 && displaytable.lineType == 'SingleLine'" style="height: 40px;">
            <div class="text-left pl-2">
              <div class="inline-block">
                <small class="block font-semibold" :class="stypType(match, index) == '1' ? 'text-danger' : ''"> {{
                  match['home' + _keyLang] ? match['home' + _keyLang] : match['home_en'] }} <b-img
                    v-for="(card, i) in match.home_red_cards" :key="i" src="/icon/redcard.gif"
                    class="inline-block" /></small>
                <small class="block font-semibold" :class="stypType(match, index) == '2' ? 'text-danger' : ''"> {{
                  match['away' + _keyLang] ? match['away' + _keyLang] : match['away_en'] }} <b-img
                    v-for="(card, i) in match.away_red_cards" :key="i" src="/icon/redcard.gif"
                    class="inline-block" /></small>
              </div>
            </div>
          </td>
          <td v-if="displaytable.lineType == 'DoubleLine'" class="w-2"></td>
          <td class="align-top w-36" style="height: 40px" v-if="displaytable.lineType == 'DoubleLine'">
            <!-- <center2-column-time
              :status="status"
              :match="match"
              v-if="index == 1"
              :live="status == 'live' ? true : false"
            ></center2-column-time> -->

            <div is="center2-column-time" :status="status" :match="match" v-if="index == 1"
              :live="status == 'live' ? true : false"></div>
            <!-- <div v-if="index==1 && showFavoriteButton">
                <div @click="toggleFavorite(match.tournament[5]['id'], match.event_id)" class="d-inline">
                  <b-icon :icon="$store.state.favorite.eventId.includes(match.event_id) ? 'star-fill' : 'star'" :variant="$store.state.favorite.eventId.includes(match.event_id) ? 'warning' : ''" />
                </div>
            </div> -->
          </td>
          <td class="align-top" v-if="displaytable.lineType == 'DoubleLine'">
            <!-- <div class="grid grid-row-2 text-left pl-2"> -->
            <div class="text-left pl-2">
              <div class="inline-block">
                <div>
                  <small class="font-semibold" :class="checkType(match, index) == '1' ? 'text-danger' : ''">{{
                    match['home' + _keyLang] ? match['home' + _keyLang] : match['home_en'] }} <b-img
                      v-for="(card, i) in match.home_red_cards" :key="i" src="/icon/redcard.gif"
                      class="inline-block" /></small>
                </div>
                <div>
                  <small class="font-semibold" :class="checkType(match, index) == '2' ? 'text-danger' : ''">{{
                    match['away' + _keyLang] ? match['away' + _keyLang] : match['away_en'] }} <b-img
                      v-for="(card, i) in match.away_red_cards" :key="i" src="/icon/redcard.gif"
                      class="inline-block" /></small>
                </div>
                <div>
                  <small class="text-secondary font-semibold">{{ trans("content.draw") }}</small>
                </div>
              </div>
            </div>
          </td>






          <td v-if="index == 1 && displaytable.lineType == 'SingleLine'">
            <div class="text-left pl-2">
              <div class="inline-block">
                <small class="block font-semibold" :class="stypType(match, index) == '1' ? 'text-danger' : ''"> {{
                  match['home' + _keyLang] ? match['home' + _keyLang] : match['home_en'] }} <b-img
                    v-for="(card, i) in match.home_red_cards" :key="i" src="/icon/redcard.gif"
                    class="inline-block" /></small>
                <small class="block font-semibold" :class="stypType(match, index) == '2' ? 'text-danger' : ''"> {{
                  match['away' + _keyLang] ? match['away' + _keyLang] : match['away_en'] }} <b-img
                    v-for="(card, i) in match.away_red_cards" :key="i" src="/icon/redcard.gif"
                    class="inline-block" /></small>
              </div>
            </div>
          </td>
          <td v-if="displaytable.lineType == 'SingleLine'" class="w-12 bg">
            <!-- <center2-column-point
              :priceGroups="match"
              market_type="Handicap"
              :index="index"
            ></center2-column-point> -->
            <div is="center2-column-point" :priceGroups="match" market_type="Handicap" :index="index" />

          </td>
          <td v-if="displaytable.lineType == 'SingleLine'" class="w-12" is="center2-column2-price" :status="status"
            :priceGroups="match" :index="index" price_type="h" market_type="Handicap">

            <!-- <div is="center2-column-price"
              :status="status"
              :priceGroups="match"
              :index="index"
              price_type="h"
              market_type="Handicap"></div> -->
          </td>
          <td v-if="displaytable.lineType == 'SingleLine'" class="w-12" is="center2-column2-price" :status="status"
            :priceGroups="match" :index="index" price_type="a" market_type="Handicap">
            <!-- <div is="center2-column-price"
              :status="status"
              :priceGroups="match"
              :index="index"
              price_type="a"
              market_type="Handicap"></div> -->
          </td>

          <td v-if="displaytable.lineType == 'SingleLine'" class="w-12 bg">
            <!-- <center2-column-point
              :priceGroups="match"
              market_type="OverUnder"
              :index="index"
            ></center2-column-point> -->
            <div is="center2-column-point" :priceGroups="match" market_type="OverUnder" :index="index"></div>
          </td>
          <td v-if="displaytable.lineType == 'SingleLine'" class="w-12" is="center2-column2-price" :status="status"
            :priceGroups="match" :index="index" price_type="h" market_type="OverUnder">
            <!-- <div is="center2-column-price"
             :status="status"
              :priceGroups="match"
              :index="index"
              price_type="h"
              market_type="OverUnder"></div> -->
          </td>
          <td v-if="displaytable.lineType == 'SingleLine'" class="w-12" is="center2-column2-price" :status="status"
            :priceGroups="match" :index="index" price_type="a" market_type="OverUnder">

            <!-- <div is="center2-column-price"
              :status="status"
              :priceGroups="match"
              :index="index"
              price_type="a"
              market_type="OverUnder">
            </div> -->
          </td>

          <td v-if="displaytable.lineType == 'SingleLine'" class="w-12 bg">
            <!-- <center2-column-point
              :priceGroups="match"
              market_type="FH_Handicap"
              :index="index"
            ></center2-column-point> -->
            <div is="center2-column-point" :priceGroups="match" market_type="FH_Handicap" :index="index"></div>
          </td>
          <td v-if="displaytable.lineType == 'SingleLine'" class="w-12" is="center2-column2-price" :status="status"
            :priceGroups="match" :index="index" price_type="h" market_type="FH_Handicap">

            <!-- <div is="center2-column-price"
              :status="status"
              :priceGroups="match"
              :index="index"
              price_type="h"
              market_type="FH_Handicap">
            </div> -->
          </td>
          <td v-if="displaytable.lineType == 'SingleLine'" class="w-12" is="center2-column2-price" :status="status"
            :priceGroups="match" :index="index" price_type="a" market_type="FH_Handicap">
            <!-- <div is="center2-column-price"
              :status="status"
              :priceGroups="match"
              :index="index"
              price_type="a"
              market_type="FH_Handicap"
            ></div> -->
          </td>
          <td v-if="displaytable.lineType == 'SingleLine'" class="w-12 bg">
            <!-- <center2-column-point
              :priceGroups="match"
              market_type="FH_OverUnder"
              :index="index"
            ></center2-column-point> -->
            <div is="center2-column-point" :priceGroups="match" market_type="FH_OverUnder" :index="index"></div>
          </td>

          <td v-if="displaytable.lineType == 'SingleLine'" class="w-12" is="center2-column2-price" :status="status"
            :priceGroups="match" :index="index" price_type="h" market_type="FH_OverUnder">

            <!-- <div is="center2-column-price"
              :status="status"
              :priceGroups="match"
              :index="index"
              price_type="h"
              market_type="FH_OverUnder"
            ></div> -->
          </td>
          <td v-if="displaytable.lineType == 'SingleLine'" class="w-12" is="center2-column2-price" :status="status"
            :priceGroups="match" :index="index" price_type="a" market_type="FH_OverUnder">

            <!-- <div is="center2-column-price"
              :status="status"
              :priceGroups="match"
              :index="index"
              price_type="a"
              market_type="FH_OverUnder"
            ></div> -->
          </td>
          <td v-if="displaytable.lineType == 'SingleLine'">
            <div v-if="checkDrow(match,index)">
              <button class="btn-sm" @click="$emit('MoreBet', match)"
                :class="status == 'live' ? 'btn-danger' : 'btn-primary'"
                style="border-radius: 5px;  padding: 0px 1px; width: 30px; border: 0px solid;">
                <small style="font-size: 12px;"><b> + {{ checkprice(match.priceGroups ,match) }}</b></small>
              </button>
            </div>
          </td>

          <!-- <tr style="height: 35px ;" v-if="match.priceGroups['1x2'] && displaytable.lineType == 'SingleLine'">
          <td colspan="2"></td>
          <td colspan="12">
            <small class="cursor-pointer text-primary" @click="$emit('MoreBet' ,match)">{{ trans("content.morebet") }}</small>
          </td>
        </tr> -->



          <td v-if="displaytable.lineType == 'DoubleLine'" class="w-16 align-top bg">
            <!-- <div class="grid grid-row-2">
              <div class="h-5">
                
                <div is="center2-column-point" v-if="stypType1(match)[0].in_who == '1'" :priceGroups="match"
                  market_type="Handicap" :index="index"></div>
              </div>
              <div class="text-white">
                <div class="h-5">
                  
                  <div is="center2-column-point" v-if="stypType1(match)[0].in_who == '2'" :priceGroups="match"
                    market_type="Handicap" :index="index"></div>
                </div>
              </div>
            </div> -->
            <div class="grid grid-row-2">
              <div class="h-5" v-if="stypType1(match)[0].in_who == '1'">
                <div is="center2-column-point" :priceGroups="match" market_type="Handicap" :index="index"></div>
              </div>
              <div class="text-white" v-else-if="stypType1(match)[0].in_who == '2'">
                <div class="h-5">
                  <div is="center2-column-point" :priceGroups="match" market_type="Handicap" :index="index"></div>
                </div>
              </div>
            </div>
          </td>
          <td v-if="displaytable.lineType == 'DoubleLine'" class="w-16 align-top">
            <div class="grid grid-row-2" v-if="match.priceGroups['Handicap']">
              <div class="flex">
                <!-- <center2-column-price
                  :status="status"
                  :priceGroups="match"
                  :index="index"
                  class="flex-1"
                  price_type="h"
                  market_type="Handicap"
                ></center2-column-price> -->
                <div is="center2-column-price" :status="status" :priceGroups="match" :index="index" class="flex-1"
                  price_type="h" market_type="Handicap"></div>
              </div>
              <div class="flex">
                <!-- <center2-column-price
                  :status="status"
                  :priceGroups="match"
                  :index="index"
                  class="flex-1"
                  price_type="a"
                  market_type="Handicap"
                ></center2-column-price> -->
                <div is="center2-column-price" :status="status" :priceGroups="match" :index="index" class="flex-1"
                  price_type="a" market_type="Handicap">
                </div>
              </div>
            </div>
          </td>
          <td v-if="displaytable.lineType == 'DoubleLine'" class="w-16 align-top bg">
            <div class="grid grid-row-2">
              <div class="h-5">
                <!-- <center2-column-point
                  :priceGroups="match"
                  market_type="OverUnder"
                  :index="index"
                ></center2-column-point> -->
                <div is="center2-column-point" :priceGroups="match" market_type="OverUnder" :index="index">
                </div>
              </div>
              <div class="text-white">
                <div class="h-5">
                  <!-- <center2-column-point
                  v-if="stypType(match)[0].in_who == '2'"
                  :priceGroups="match"
                  market_type="OverUnder"
                  :index="index"
                ></center2-column-point> -->
                </div>
              </div>
            </div>
          </td>
          <td v-if="displaytable.lineType == 'DoubleLine'" class="w-16 align-top">
            <div class="grid grid-row-2" v-if="match.priceGroups['OverUnder']">
              <div class="flex">
                <small class="text-secondary font-semibold flex pl-1" style="font-size: 10px;"
                v-if="
                match.priceGroups['OverUnder'] != undefined &&
                match.priceGroups['OverUnder'][index - 1] != undefined && match.priceGroups['OverUnder'][index - 1].l_percent != null && 
                match.priceGroups['OverUnder'][index - 1].in_percent != null"
                >{{ trans("content.over")}}</small>
                <!-- <center2-column-price
                  :status="status"
                  :priceGroups="match"
                  :index="index"
                  class="flex-1 ml-2"
                  price_type="h"
                  market_type="OverUnder"
                ></center2-column-price> -->

                <div is="center2-column-price" :status="status" :priceGroups="match" :index="index" class="flex-1 ml-2"
                  price_type="h" market_type="OverUnder">
                </div>
              </div>
              <div class="flex">
                <small class="text-secondary font-semibold flex pl-1" style="font-size: 10px;"
                v-if="
                match.priceGroups['OverUnder'] != undefined &&
                match.priceGroups['OverUnder'][index - 1] != undefined && match.priceGroups['OverUnder'][index - 1].l_percent != null && 
                match.priceGroups['OverUnder'][index - 1].in_percent != null"
                >{{ trans("content.under")}}</small>

                <!-- <center2-column-price
                  :status="status"
                  :priceGroups="match"
                  :index="index"
                  class="flex-1 ml-2"
                  price_type="a"
                  market_type="OverUnder"
                ></center2-column-price> -->
                <div is="center2-column-price" :status="status" :priceGroups="match" :index="index" class="flex-1 ml-2"
                  price_type="a" market_type="OverUnder">
                </div>
              </div>
            </div>
          </td>

          <td v-if="displaytable.lineType == 'DoubleLine'" class="w-16 align-top">
            <div v-if="match.priceGroups['1x2']">
              <div class="flex">
                <small class="text-secondary font-semibold flex pl-1" style="font-size: 10px;"
                v-if="
                match.priceGroups['1x2'] != undefined &&
                match.priceGroups['1x2'][index - 1] != undefined && match.priceGroups['1x2'][index - 1].l_percent != null && 
                match.priceGroups['1x2'][index - 1].in_percent != null"
                >1</small>
                <!-- <center2-column-price
              :status="status"
              :priceGroups="match"
              :index="index"
              class="flex-1"
              price_type="h"
              market_type="1x2"
            ></center2-column-price> -->

                <div is="center2-column-price" :status="status" :priceGroups="match" :index="index" class="flex-1"
                  price_type="h" market_type="1x2">
                </div>
              </div>
              <div class="flex">
                <small class="text-secondary font-semibold flex pl-1" style="font-size: 10px;"
                v-if="
                match.priceGroups['1x2'] != undefined &&
                match.priceGroups['1x2'][index - 1] != undefined && match.priceGroups['1x2'][index - 1].l_percent != null && 
                match.priceGroups['1x2'][index - 1].in_percent != null"
                >2</small>

                <!-- <center2-column-price
               class="flex-1"
              :status="status"
              :priceGroups="match"
              :index="index"
              price_type="x"
              market_type="1x2"
            ></center2-column-price> -->

                <div is="center2-column-price" class="flex-1" :status="status" :priceGroups="match" :index="index"
                  price_type="a" market_type="1x2">
                </div>
              </div>
              <div class="flex">
                <small class="text-secondary font-semibold flex pl-1" style="font-size: 10px;"
                v-if="
                match.priceGroups['1x2'] != undefined &&
                match.priceGroups['1x2'][index - 1] != undefined && match.priceGroups['1x2'][index - 1].l_percent != null && 
                match.priceGroups['1x2'][index - 1].in_percent != null"
                >X</small>
                <!-- <center2-column-price
              class="flex-1"
              :status="status"
              :priceGroups="match"
              :index="index"
              price_type="a"
              market_type="1x2"
            ></center2-column-price> -->

                <div is="center2-column-price" class="flex-1" :status="status" :priceGroups="match" :index="index"
                  price_type="x" market_type="1x2">
                </div>
              </div>
            </div>
          </td>

          <td v-if="displaytable.lineType == 'DoubleLine'" class="w-16 align-top">
            <div class="flex">
              <!-- {{ trans("content.Over") }} -->
              <small class="text-secondary font-semibold flex pl-1" style="font-size: 10px;"
                v-if="match.priceGroups['OE'] && index == 1"> {{ trans("content.odd") }}</small>
              <!-- <center2-column-price
                :status="status"
                v-if="index == 1"
                :priceGroups="match"
                :index="1"
                price_type="h"
                class="flex-1 ml-2"
                market_type="OE"
              ></center2-column-price> -->

              <div is="center2-column-price" :status="status" v-if="index == 1" :priceGroups="match" :index="1"
                price_type="h" class="flex-1 ml-2" market_type="OE">
              </div>
            </div>
            <!-- <small>คู่</small> -->
            <div class="flex">
              <small class="text-secondary font-semibold flex pl-1" style="font-size: 10px;"
                v-if="match.priceGroups['OE'] && index == 1"> {{ trans("content.even") }}</small>
              <!-- <center2-column-price
                :status="status"
                v-if="index == 1"
                :priceGroups="match"
                :index="1"
                price_type="a"
                class="flex-1 ml-2"
                market_type="OE"
              ></center2-column-price> -->

              <div is="center2-column-price" :status="status" v-if="index == 1" :priceGroups="match" :index="1"
                price_type="a" class="flex-1 ml-2" market_type="OE">
              </div>
            </div>
          </td>

          <td v-if="displaytable.lineType == 'DoubleLine'" class="w-16 align-top bg">
            <div class="grid grid-row-2" :class="{'hidden' : hiddenRow(match)}">
              <!-- ตรวจสอบเงื่อนไขแถวที่หนึ่ง -->
              <div class="h-5" v-if="stypType1(match)[0].in_who == '1'">
                <div is="center2-column-point" :priceGroups="match" market_type="FH_Handicap" :index="index"></div>
              </div>
              <!-- ถ้าแถวที่หนึ่งไม่มีข้อมูล ตรวจสอบแถวที่สอง -->
              <div class="text-white h-5" v-else-if="stypType1(match)[0].in_who == '2'">
                <div is="center2-column-point" :priceGroups="match" market_type="FH_Handicap" :index="index"></div>
              </div>
            </div>

            <!-- <div class="grid grid-row-2">
              <div class="h-5">
                <div is="center2-column-point" v-if="stypType1(match)[0].in_who == '1'" :priceGroups="match"
                  market_type="FH_Handicap" :index="index">
                </div>
              </div>
              <div class="text-white">
                <div class="h-5">
                  <div is="center2-column-point" v-if="stypType1(match)[0].in_who == '2'" :priceGroups="match"
                    market_type="FH_Handicap" :index="index">
                  </div>
                </div>
              </div>
            </div> -->
          </td>
          <td v-if="displaytable.lineType == 'DoubleLine'" class="w-16 align-top">
            <div class="grid grid-row-2" v-if="match.priceGroups['FH_Handicap']" :class="{'hidden' : hiddenRow(match)}">
              <div class="flex">
                <!-- <center2-column-price
                  :status="status"
                  :priceGroups="match"
                  class="flex-1"
                  :index="index"
                  price_type="h"
                  market_type="FH_Handicap"
                ></center2-column-price> -->
                <div is="center2-column-price" :status="status" :priceGroups="match" class="flex-1" :index="index"
                  price_type="h" market_type="FH_Handicap">
                </div>
              </div>
              <div class="flex">
                <!-- <center2-column-price
                  :status="status"
                  :priceGroups="match"
                  class="flex-1"
                  :index="index"
                  price_type="a"
                  market_type="FH_Handicap"
                ></center2-column-price> -->

                <div is="center2-column-price" :status="status" :priceGroups="match" class="flex-1" :index="index"
                  price_type="a" market_type="FH_Handicap">
                </div>
              </div>
            </div>
          </td>
          <td v-if="displaytable.lineType == 'DoubleLine'" class="w-16 align-top bg">
            <div class="grid grid-row-2" :class="{'hidden' : hiddenRow(match)}">
              <div class="h-5">
                <!-- <center2-column-point
                  :priceGroups="match"
                  market_type="FH_OverUnder"
                  :index="index"
                ></center2-column-point> -->

                <div is="center2-column-point" :priceGroups="match" market_type="FH_OverUnder" :index="index">
                </div>
              </div>
              <div class="text-white">
                <div class="h-5">
                  <!-- <center2-column-point
                  v-if="stypType(match)[0].in_who == '2'"
                  :priceGroups="match"
                  market_type="FH_OverUnder"
                  :index="index"
                ></center2-column-point> -->
                </div>
              </div>
            </div>
          </td>
          <td v-if="displaytable.lineType == 'DoubleLine'" class="w-16 align-top">
            <div class="grid grid-row-2" v-if="match.priceGroups['FH_OverUnder']" :class="{'hidden' : hiddenRow(match)}">
              <div class="flex">
                <small class="text-secondary font-semibold flex pl-1" style="font-size: 10px;"
                v-if="
                match.priceGroups['FH_OverUnder'] != undefined &&
                match.priceGroups['FH_OverUnder'][index - 1] != undefined && match.priceGroups['FH_OverUnder'][index - 1].l_percent != null && 
                match.priceGroups['FH_OverUnder'][index - 1].in_percent != null"
                >{{ trans("content.over")}}</small>
                <!-- <center2-column-price
                  :status="status"
                  :priceGroups="match"
                  class="flex-1"
                  :index="index"
                  price_type="h"
                  market_type="FH_OverUnder"
                ></center2-column-price> -->

                <div is="center2-column-price" :status="status" :priceGroups="match" class="flex-1" :index="index"
                  price_type="h" market_type="FH_OverUnder">
                </div>
              </div>
              <div class="flex">
                <small class="text-secondary font-semibold flex pl-1" style="font-size: 10px;"
                v-if="
                match.priceGroups['FH_OverUnder'] != undefined &&
                match.priceGroups['FH_OverUnder'][index - 1] != undefined && match.priceGroups['FH_OverUnder'][index - 1].l_percent != null && 
                match.priceGroups['FH_OverUnder'][index - 1].in_percent != null"
                >{{ trans("content.under")}}</small>
                <!-- <center2-column-price
                  :status="status"
                  :priceGroups="match"
                  class="flex-1"
                  :index="index"
                  price_type="a"
                  market_type="FH_OverUnder"
                ></center2-column-price> -->

                <div is="center2-column-price" :status="status" :priceGroups="match" class="flex-1" :index="index"
                  price_type="a" market_type="FH_OverUnder">
                </div>
              </div>
            </div>
          </td>
          <td v-if="displaytable.lineType == 'DoubleLine'" class="w-16 align-top">
            <div v-if="match.priceGroups['FH_1x2']" :class="{'hidden' : hiddenRow(match)}">
              <div class="flex">
                <small class="text-secondary font-semibold flex pl-1" style="font-size: 10px;"
                v-if="
                match.priceGroups['FH_1x2'] != undefined &&
                match.priceGroups['FH_1x2'][index - 1] != undefined && match.priceGroups['FH_1x2'][index - 1].l_percent != null && 
                match.priceGroups['FH_1x2'][index - 1].in_percent != null"
                >1</small>
                <!-- <center2-column-price
                  class="flex-1"
                  :status="status"
                  :priceGroups="match"
                  :index="index"
                  price_type="h"
                  market_type="FH_1x2"
                ></center2-column-price> -->

                <div is="center2-column-price" class="flex-1" :status="status" :priceGroups="match" :index="index"
                  price_type="h" market_type="FH_1x2">
                </div>
              </div>
              <div class="flex">
                <small class="text-secondary font-semibold flex pl-1" style="font-size: 10px;"
                v-if="
                match.priceGroups['FH_1x2'] != undefined &&
                match.priceGroups['FH_1x2'][index - 1] != undefined && match.priceGroups['FH_1x2'][index - 1].l_percent != null && 
                match.priceGroups['FH_1x2'][index - 1].in_percent != null"
                >2</small>
                <!-- <center2-column-price
                  class="flex-1"
                  :status="status"
                  :priceGroups="match"
                  :index="index"
                  price_type="x"
                  market_type="FH_1x2"
                ></center2-column-price> -->
                  <div is="center2-column-price" class="flex-1" :status="status" :priceGroups="match" :index="index"
                  price_type="a" market_type="FH_1x2">
                </div>
              </div>
              <div class="flex">
                <small class="text-secondary font-semibold flex pl-1" style="font-size: 10px;"
                v-if="
                match.priceGroups['FH_1x2'] != undefined &&
                match.priceGroups['FH_1x2'][index - 1] != undefined && match.priceGroups['FH_1x2'][index - 1].l_percent != null && 
                match.priceGroups['FH_1x2'][index - 1].in_percent != null"
                >X</small>
                <!-- <center2-column-price
                  class="flex-1"
                  :status="status"
                  :priceGroups="match"
                  :index="index"
                  price_type="a"
                  market_type="FH_1x2"
                ></center2-column-price> -->
                <div is="center2-column-price" class="flex-1" :status="status" :priceGroups="match" :index="index"
                  price_type="x" market_type="FH_1x2">
                </div>
              </div>
            </div>
          </td>





        </tr>
        <tr v-if="match.moreBet != null && displaytable.lineType == 'SingleLine' && match.collapse != 'open'">
          <td colspan="16">
            <b-row class="px-3">
              <b-col cols="4" class="py-2 pl-2 pr-0 col-4" v-if="match.data1x2">
                <table class="w-full">
                  <tbody>
                    <tr>
                      <th colspan="3"><small class="font-semibold">{{ trans("content.fulltime") }} 1X2 </small></th>
                    </tr>
                    <tr>
                      <th><small class="font-semibold">{{ trans("content.home") }} </small></th>
                      <th><small class="font-semibold">{{ trans("content.draw") }}</small></th>
                      <th><small class="font-semibold">{{ trans("content.away") }}</small></th>
                    </tr>
                    <tr style="border-bottom: 1px solid #dde1ef;">
                      <td is="center2-column2-price" :status="status" v-if="match.priceGroups['1x2']" :priceGroups="match" :index="1"
                        price_type="h" market_type="1x2">
                      </td>
                      <td is="center2-column2-price" :status="status" v-if="match.priceGroups['1x2']" :priceGroups="match" :index="1"
                        price_type="x" market_type="1x2">
                      </td>
                      <td is="center2-column2-price" :status="status" v-if="match.priceGroups['1x2']" :priceGroups="match" :index="1"
                      style="border-right: 1px solid #dde1ef !important;" price_type="a" market_type="1x2">
                      </td>
                    </tr>
                  </tbody>
                </table>
              </b-col>
              <b-col cols="4" class="p-2" v-if="hiddenRow2(match , type_nonlive , '1x2')" :class="!match.FH_1x2 ? 'hidden' : ''">
                <table class="w-full">
                <tbody>
                    <tr>
                      <th colspan="3"><small class="font-semibold">{{ trans("content.halftimes") }} 1X2</small></th>
                    </tr>
                    <tr>
                      <th><small class="font-semibold">{{ trans("content.home") }} </small></th>
                      <th><small class="font-semibold">{{ trans("content.draw") }}</small></th>
                      <th><small class="font-semibold">{{ trans("content.away") }}</small></th>
                    </tr>
                    <tr style="border-bottom: 1px solid #dde1ef;">
                      <td>
                        <div is="center2-column-price"
                              :status="status"
                              v-if="match.priceGroups['FH_1x2']"
                              :priceGroups="match"
                              :index="1"
                              price_type="h"
                              market_type="FH_1x2"
                            >
                            </div>
                      </td>
                      <td>
                            <div is="center2-column-price"
                              :status="status"
                              v-if="match.priceGroups['FH_1x2']"
                              :priceGroups="match"
                              :index="1"
                              price_type="x"
                              market_type="FH_1x2"
                            >
                            </div>
                      </td>
                      <td  style="border-right: 1px solid #dde1ef !important;">
                        <div is="center2-column-price" :status="status" v-if="match.priceGroups['FH_1x2']" :priceGroups="match"
                          :index="1" price_type="a" market_type="FH_1x2">
                        </div>
                      </td>
                    </tr>
                  </tbody>
                  </table>
                </b-col>
              <b-col cols="4" class="py-2 pl-0 pr-2 col-4" :style="hiddenRow2(match , type_nonlive , '1x2') == false ? 'margin-left: 8px;' : ''" v-if="match.OE">
                <table class="w-full">
                  <tbody>
                    <tr>
                      <th colspan="2"><small class="font-semibold">{{ trans("content.odd") }}/{{ trans("content.even") }}</small></th>
                    </tr>
                    <tr>
                      <th><small class="font-semibold">{{ trans("content.odd") }} </small></th>
                      <th><small class="font-semibold">{{ trans("content.even") }} </small></th>
                    </tr>
                    <tr style="border-bottom: 1px solid #dde1ef;">
                      <td is="center2-column2-price" :status="status" v-if="match.priceGroups['OE']" :priceGroups="match" :index="1"
                        price_type="h" market_type="OE">
                      </td>
                      <td is="center2-column2-price" :status="status" v-if="match.priceGroups['OE']" :priceGroups="match" :index="1"
                      style="border-right: 1px solid #dde1ef !important;" price_type="a" market_type="OE">
                      </td>
                    </tr>
                  </tbody>
                </table>
              </b-col>
            </b-row>
          </td>
        </tr>
      </tbody>

      <tbody v-if="matches.length == 0">
        <tr>
          <td colspan="15" class="text-center p-2" style="height: 27px">
            <small class="text-white">{{ trans("content.notmatch") }}</small>
          </td>
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
      default: []
    },
    status: {
      type: String,
      default: "live"
    },
    loading: {
      type: Boolean,
      default: false
    },
    displaytable: {
      type: Object,
      default: {}
    },
    type_nonlive: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      lang: this.$auth.$storage.getUniversal("language"),
      numbertpye: null,
      namepath: null,
      scY: 0,
      scTimer: 0,
      loadmoreshow: false,
      btnmores: false,
      length_load: 15,
      isFavorite: null,
      pathName: '',
    }
  },
  computed: {
    ...mapGetters({
      eventId: "favorite/eventId",
      allEvents: "favorite/allEvents"
    }),
    showFavoriteButton() {
      return (this.isFavorite || (this.pathName != 'mixparlay' && this.pathName != 'step' && this.pathName != 'early'))
    },
    setDataTable() {
      // var item = this.setData.filter(f=> f.odds.find((data , i) => data.length != 0))
      // var item = this.setData.filter(f=> f.setting_w_b_l[0][2] != 0)
      // if(item){
      // }
      return this.setData
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
    matches() {
      if (this.type_nonlive == 'nonlive') {
        if (this.setData) {
          if (this.$route.name.split('-')[0] == 'football') {
            // if (this.setData.length == 0) {
            //   if (window.innerWidth >= 1200) {
            //     this.btnmores = false
            //   }
            // }
            return this.displaytable.sortBy == 'SortByNormal' ? this.setData.slice(0, this.length_load) : this.sortByTime.slice(0, this.length_load);
          } else {
            return this.displaytable.sortBy == 'SortByNormal' ? this.setData : this.sortByTime
          }
        }
      } else {
        return this.displaytable.sortBy == 'SortByNormal' ? this.setData : this.sortByTime
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
    }),
    checkDrow(match , index){
      if(match.priceGroups['1x2'] && index == 1){
        return true
      }
      if(match.priceGroups['OE'] && index == 1){
        return true
      }
    },
    handleScroll() {
      if ((window.innerHeight + window.scrollY + 500) >= document.body.offsetHeight) {
        // if (window.innerWidth >= 600) {
          this.loadMore()
        // }
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
    hiddenRow(priceGroups){
      if(priceGroups.period == '1' && priceGroups.period_start_time >= 40){
        return true
      } 
    },
    hiddenRow2(priceGroups , type_nonlive , type){
      if(type_nonlive != 'nonlive'){        
        if(priceGroups.period == '1' || priceGroups.period == '0'){
          if(priceGroups.period_start_time < 40){
            return true
          }else{
            return false
          } 
        }else{
          return false
        } 
      }else{
        if(type == '1x2'){
          if(type_nonlive == 'nonlive'){
            return true
          }else{
            return false
          }
        }else{
          return false
        }
      }
    },
    checkprice(item , data) {
      var sumarray = 0
      if (item['1x2']) {
        sumarray = sumarray + 1
        data.data1x2 = true
      }
      if (item['FH_1x2']) {
        sumarray = sumarray + 1
        data.FH_1x2 = true
      }
      if (item['OE']) {
        sumarray = sumarray + 1
        data.OE = true
      }
      return parseInt(sumarray)
    },
    stypType1(m) {
      if (m.priceGroups['Handicap'] != undefined) {
        return m.priceGroups['Handicap']
      } else if (m.priceGroups['OverUnder'] != undefined) {
        return m.priceGroups['OverUnder']
      } else if (m.priceGroups['FH_Handicap'] != undefined) {
        return m.priceGroups['FH_Handicap']
      } else if (m.priceGroups['FH_OverUnder'] != undefined) {
        return m.priceGroups['FH_OverUnder']
      }
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
      this.$emit("fetch");
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
    checkw_b_l(type) {
      var item = type.filter(f => f[this.numbertpye] == 1)
      return item.length == 0 ? true : false
    },
    checkType(m, index) {
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
    // toggleFavoriteLeague(league) {
    //   const filtered = this.matches.filter(match => match.tournament[0] == league)
    //   filtered.forEach(match => this.toggleFavorite(match.tournament[5]['id'], match.event_id))

    //   const isFavorite = this.$store.state.favorite.leagues.includes(league)
    //   if (isFavorite) {
    //     this.removeFavoriteLeague(league)
    //   } else {
    //     this.insertFavoriteLeague(league)
    //   }
    // },
    // toggleFavorite(sport, event) {
    //   const isFavorite = this.$store.state.favorite.eventId.includes(event)
    //   if (isFavorite) {
    //     this.removeFavorite({ sport, event })
    //   } else {
    //     this.insertFavorite({ sport, event })
    //   }
    // },
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

<style scoped>
.text-color:focus {
  background: antiquewhite;
}

.text-color:hover {
  background: antiquewhite;
}
</style>