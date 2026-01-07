import Vue from 'vue';

const FontSize = {
    install(Vue, options) {
        Vue.mixin({
            methods: {
                fontSize(text){
                    if(text == "A"){
                      return "text-base"
                    }else if(text == "-A"){
                      return "text-sm"
                    }else if(text == "+A"){
                      return "text-xl"
                    }
                },
                collapseTable(array2 , collapse_ID , collapse_All){
                  if(collapse_All == true){
                    array2 = array2.map(item => {
                        return { ...item, collapse: 'open' };
                    });
                    if(collapse_ID.length != 0){
                        array2 = array2.map(item => {
                        if (collapse_ID.includes(item.tournament.tournament_id)) {
                          const { collapse, ...rest } = item;
                              return rest;
                            }
                            return item;
                          });
                      }
                  }else if(collapse_All == null){
                    if(collapse_ID.length != 0){
                        array2 = array2.map(item => {
                        if (collapse_ID.includes(item.tournament.tournament_id)) {
                            return { ...item, collapse: 'open' };
                        }
                        return item;
                      });
                      }
                  }
                  return array2
                },
                newData(live , type){
                  var array = {data : {data : []}}
                  for (let i = 0; i < live.data.data.length; i++) {
                    array.data.data.push({
                      event_id : live.data.data[i][0],
                      web_id : live.data.data[i][1],
                      source_event_id : live.data.data[i][2],
                      event_date : live.data.data[i][3],
                      has_statistics : live.data.data[i][4],
                      sort_order : live.data.data[i][5],
                      show_time : live.data.data[i][6],
                      real_kickoff_time : live.data.data[i][7],
                      live_away_score : live.data.data[i][8],
                      live_home_score : live.data.data[i][9],
                      away_red_cards : live.data.data[i][10] != null && live.data.data[i][10] > 0 ? parseInt(live.data.data[i][10]) : null, 
                      home_red_cards : live.data.data[i][11] != null && live.data.data[i][11] > 0 ? parseInt(live.data.data[i][11]) : null,
                      injury_time : type == 'Nosoccer' ? [] : live.data.data[i][12] ,
                      period : type == 'Nosoccer' ? [] : live.data.data[i][13],
                      period_start_time : type == 'Nosoccer' ? [] : live.data.data[i][14],
                      home_en : live.data.data[i][15], 
                      home_th : live.data.data[i][16],
                      away_en : live.data.data[i][17],
                      away_th : live.data.data[i][18],
                      is_live : live.data.data[i][19],
                      is_settle_match : live.data.data[i][20],
                      ht_ascore : live.data.data[i][21],
                      ht_hscore : live.data.data[i][22],
                      ft_ascore : live.data.data[i][23],
                      ft_hscore : live.data.data[i][24],
                      online : live.data.data[i][25],
                      channel_live : live.data.data[i][26],
                      odds: live.data.data[i][27],
                      tournament: live.data.data[i][28],
                      setting_w_b_l : live.data.data[i][29],
                      sortleague : live.data.data[i][30],
                      pair_league : live.data.data[i][31],
                    })
                  }
            
                  for (let i = 0; i < array.data.data.length; i++) {
                    for (let index = 0; index < array.data.data[i].odds.length; index++) {
                      array.data.data[i].odds[index].id = array.data.data[i].odds[index][0]
                      array.data.data[i].odds[index].event_id = array.data.data[i].odds[index][1]
                      array.data.data[i].odds[index].odds_id = array.data.data[i].odds[index][2]
                      array.data.data[i].odds[index].web_id = array.data.data[i].odds[index][3]
                      array.data.data[i].odds[index].source_event_id = array.data.data[i].odds[index][4]
                      array.data.data[i].odds[index].online = array.data.data[i].odds[index][5]
                      array.data.data[i].odds[index].source_odds_id = array.data.data[i].odds[index][6]
                      array.data.data[i].odds[index].sort_row = array.data.data[i].odds[index][7]
                      array.data.data[i].odds[index].sort_order = array.data.data[i].odds[index][8]
                      array.data.data[i].odds[index].status = array.data.data[i].odds[index][9]
                      array.data.data[i].odds[index].market_type = array.data.data[i].odds[index][10]
                      array.data.data[i].odds[index].point = array.data.data[i].odds[index][11]
                      array.data.data[i].odds[index].is_live = array.data.data[i].odds[index][12]
                      array.data.data[i].odds[index].hasMixParlay = array.data.data[i].odds[index][13]
                      array.data.data[i].odds[index].sport = array.data.data[i].odds[index][14]
                      array.data.data[i].odds[index].in_who = array.data.data[i].odds[index][15]
                      array.data.data[i].odds[index].prices = array.data.data[i].odds[index][16]
                      array.data.data[i].odds[index].percent = array.data.data[i].odds[index][17]
                      array.data.data[i].odds[index].l_percent = array.data.data[i].odds[index][18]
                      array.data.data[i].odds[index].in_percent = array.data.data[i].odds[index][19]
                      array.data.data[i].odds[index].a_percent = array.data.data[i].odds[index][20]
                      array.data.data[i].odds[index].h_percent = array.data.data[i].odds[index][21]
                      array.data.data[i].odds[index].x_percent = array.data.data[i].odds[index][22]
                      array.data.data[i].odds[index].a_sumary = array.data.data[i].odds[index][23]
                      array.data.data[i].odds[index].h_sumary = array.data.data[i].odds[index][24]
                      array.data.data[i].odds[index].x_sumary = array.data.data[i].odds[index][25]
                      array.data.data[i].odds[index].summary_amount = array.data.data[i].odds[index][26]
                    }
                      array.data.data[i].tournament.tournament_id = array.data.data[i].tournament[0]
                      array.data.data[i].tournament.name_en = array.data.data[i].tournament[1]
                      array.data.data[i].tournament.info_en = array.data.data[i].tournament[2]
                      array.data.data[i].tournament.name_th = array.data.data[i].tournament[3]
                      array.data.data[i].tournament.info_th = array.data.data[i].tournament[4]
                      array.data.data[i].tournament.sport_type = array.data.data[i].tournament[5]
                     for (let index = 0; index < array.data.data[i].setting_w_b_l.length; index++) {
                       array.data.data[i].setting_w_b_l[index].event_id = array.data.data[i].setting_w_b_l[index][0]
                       array.data.data[i].setting_w_b_l[index].sort_row = array.data.data[i].setting_w_b_l[index][1]
                       array.data.data[i].setting_w_b_l[index].w_is_open = array.data.data[i].setting_w_b_l[index][2]
                       array.data.data[i].setting_w_b_l[index].b_is_open = array.data.data[i].setting_w_b_l[index][3]
                       array.data.data[i].setting_w_b_l[index].l_is_open = array.data.data[i].setting_w_b_l[index][4]
                       array.data.data[i].setting_w_b_l[index].st_w_is_open = array.data.data[i].setting_w_b_l[index][5]
                       array.data.data[i].setting_w_b_l[index].st_b_is_open = array.data.data[i].setting_w_b_l[index][6]
                       array.data.data[i].setting_w_b_l[index].st_l_is_open = array.data.data[i].setting_w_b_l[index][7]
                       array.data.data[i].setting_w_b_l[index].mix_w_is_open = array.data.data[i].setting_w_b_l[index][8]
                       array.data.data[i].setting_w_b_l[index].mix_b_is_open = array.data.data[i].setting_w_b_l[index][9]
                       array.data.data[i].setting_w_b_l[index].mix_l_is_open = array.data.data[i].setting_w_b_l[index][10]
                       array.data.data[i].setting_w_b_l[index].card_is_open = array.data.data[i].setting_w_b_l[index][11]
                       array.data.data[i].setting_w_b_l[index].score_is_open = array.data.data[i].setting_w_b_l[index][12]
                     }
                  }
            
                  return array
                },
                addKeyArray(element , type){
                  var obj = []
                  obj = [
                    {
                           event_id : element[0],
                            web_id : element[1],
                            source_event_id : element[2],
                            event_date : element[3],
                            has_statistics : element[4],
                            sort_order : element[5],
                            show_time : element[6],
                            real_kickoff_time : element[7],
                            live_away_score : element[8],
                            live_home_score : element[9],
                            away_red_cards : element[10]  != null && element[10]  > 0 ? parseInt(element[10])  : null,
                            home_red_cards : element[11]  != null && element[11]  > 0 ? parseInt(element[11])  : null,
                            injury_time : type == 'Nosoccer' ? [] : element[12] ,
                            period : type == 'Nosoccer' ? [] : element[13],
                            period_start_time : type == 'Nosoccer' ? [] : element[14],
                            home_en : element[15],
                            home_th : element[16],
                            away_en : element[17],
                            away_th : element[18],
                            is_live : element[19],
                            is_settle_match : element[20],
                            ht_ascore : element[21],
                            ht_hscore : element[22],
                            ft_ascore : element[23],
                            ft_hscore : element[24],
                            online : element[25],
                            channel_live : element[26],
                            odds: element[27],
                            tournament: element[28],
                            setting_w_b_l : element[29],
                            sortleague : element[30],
                            pair_league : element[31],
                    }
                  ]

                  
                  for (let i = 0; i < obj[0].odds.length; i++) {
                    obj[0].odds[i].id = obj[0].odds[i][0]
                    obj[0].odds[i].event_id = obj[0].odds[i][1]
                    obj[0].odds[i].odds_id = obj[0].odds[i][2]
                    obj[0].odds[i].web_id = obj[0].odds[i][3]
                    obj[0].odds[i].source_event_id = obj[0].odds[i][4]
                    obj[0].odds[i].online = obj[0].odds[i][5]
                    obj[0].odds[i].source_odds_id = obj[0].odds[i][6]
                    obj[0].odds[i].sort_row = obj[0].odds[i][7]
                    obj[0].odds[i].sort_order = obj[0].odds[i][8]
                    obj[0].odds[i].status = obj[0].odds[i][9]
                    obj[0].odds[i].market_type = obj[0].odds[i][10]
                    obj[0].odds[i].point = obj[0].odds[i][11]
                    obj[0].odds[i].is_live = obj[0].odds[i][12]
                    obj[0].odds[i].hasMixParlay = obj[0].odds[i][13]
                    obj[0].odds[i].sport = obj[0].odds[i][14]
                    obj[0].odds[i].in_who = obj[0].odds[i][15]
                    obj[0].odds[i].prices = obj[0].odds[i][16]
                    obj[0].odds[i].percent = obj[0].odds[i][17]
                    obj[0].odds[i].l_percent = obj[0].odds[i][18]
                    obj[0].odds[i].in_percent = obj[0].odds[i][19]
                    obj[0].odds[i].a_percent = obj[0].odds[i][20]
                    obj[0].odds[i].h_percent = obj[0].odds[i][21]
                    obj[0].odds[i].x_percent = obj[0].odds[i][22]
                    obj[0].odds[i].a_sumary = obj[0].odds[i][23]
                    obj[0].odds[i].h_sumary = obj[0].odds[i][24]
                    obj[0].odds[i].x_sumary = obj[0].odds[i][25]
                    obj[0].odds[i].summary_amount = obj[0].odds[i][26]
                  }

                  for (let i = 0; i < obj[0].setting_w_b_l.length; i++) {
                    obj[0].setting_w_b_l[i].event_id = obj[0].setting_w_b_l[i][0]
                    obj[0].setting_w_b_l[i].sort_row = obj[0].setting_w_b_l[i][1]
                    obj[0].setting_w_b_l[i].w_is_open = obj[0].setting_w_b_l[i][2]
                    obj[0].setting_w_b_l[i].b_is_open = obj[0].setting_w_b_l[i][3]
                    obj[0].setting_w_b_l[i].l_is_open = obj[0].setting_w_b_l[i][4]
                    obj[0].setting_w_b_l[i].st_w_is_open = obj[0].setting_w_b_l[i][5]
                    obj[0].setting_w_b_l[i].st_b_is_open = obj[0].setting_w_b_l[i][6]
                    obj[0].setting_w_b_l[i].st_l_is_open = obj[0].setting_w_b_l[i][7]
                    obj[0].setting_w_b_l[i].mix_w_is_open = obj[0].setting_w_b_l[i][8]
                    obj[0].setting_w_b_l[i].mix_b_is_open = obj[0].setting_w_b_l[i][9]
                    obj[0].setting_w_b_l[i].mix_l_is_open = obj[0].setting_w_b_l[i][10]
                    obj[0].setting_w_b_l[i].card_is_open = obj[0].setting_w_b_l[i][11]
                    obj[0].setting_w_b_l[i].score_is_open = obj[0].setting_w_b_l[i][12]
                  }

                  obj[0].tournament.tournament_id = obj[0].tournament[0]
                  obj[0].tournament.name_en = obj[0].tournament[1]
                  obj[0].tournament.info_en = obj[0].tournament[2]
                  obj[0].tournament.name_th = obj[0].tournament[3]
                  obj[0].tournament.info_th = obj[0].tournament[4]
                  obj[0].tournament.sport_type = obj[0].tournament[5]

                  return obj[0]

                }
            },
        })
    }
}

Vue.use(FontSize);