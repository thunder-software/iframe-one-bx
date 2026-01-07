export const state = () => ({
  loading: false,
  events: [],
  leagues: [],
  eventId: [],
  menuData: [],
  menuList: [],
  countFav: [],
  curSport: undefined,
  allEvents: [],
})

export const getters = {
  sports: state => {
    const sportsSet = new Set(state.events.map(event => event.sport))
    const filteredKeysSet = new Set(
      Object.keys(state.menuList).filter(key => sportsSet.has(parseInt(key)))
        .map(key => {
          const menuType = state.menuList[parseInt(key)].type.toLowerCase()
          // แปลง type ให้ตรงกับ menuData
          if (menuType === 'bullfight') return 'cow'
          return menuType
        })
    )
    return state.menuData.filter(item => filteredKeysSet.has(item.type))
  },
  events: state => state.events,
  leagues: state => state.leagues,
  eventId: state => state.eventId,
  loading: state => state.loading,
  countFav: state => state.countFav,
  curSport: state => state.curSport,
  allEvents: state => state.allEvents
}

export const actions = {
  setLoadData({ commit }, data) {
    commit('setLoadData', data)
  },
  setMenuData({ commit }, data) {
    commit('setMenuData', data)
  },
  setCurSport({ commit }, data) {
    commit('setCurSport', data)
  },
  insertFavoriteLeague({ commit }, leagueId) {
    commit('insertFavoriteLeague', leagueId)
  },
  removeFavoriteLeague({ commit }, leagueId) {
    commit('removeFavoriteLeague', leagueId)
  },
  insertFavorite({ commit }, favorite) {
    commit('insertFavorite', favorite)
    commit('updateEventId')
    commit('updateCountFav')
  },
  removeFavorite({ commit }, favorite) {
    commit('removeFavorite', favorite)
    commit('updateEventId')
    commit('updateCountFav')
  },
  removeFavoriteWhenOffline({ commit, state }, events) {
    if (!state.loading) {
      const listLeaguesData = events.map(i => i.tournament[0])
      const notFoundLeagues = state.leagues.filter(i => !listLeaguesData.includes(i))
      const filteredLeagues = state.leagues.filter(i => !notFoundLeagues.includes(i))

      commit('updateFavoriteLeagues', filteredLeagues)

      const listEventsData = events.map(i => i.event_id)
      const notFoundEvents = state.events.filter(i => !listEventsData.includes(i.event) || i.sport !== state.curSport)
      const filteredEvents = state.events.filter(i => !notFoundEvents.map(item => item.event).includes(i.event) || i.sport !== state.curSport)

      commit('updateFavorites', filteredEvents)
      commit('updateEventId')
      commit('updateCountFav')
    }
  },
  setAllEventsToState({ commit }, events) {
    commit('setAllEventsToState', events)
  },
  initializeFavorites({ commit }) {
    const storedFavorites = localStorage.getItem('favorites')
    const storedLeagueIds = localStorage.getItem('favoriteLeagues')
    if (storedFavorites) {
      commit('setFavorites', JSON.parse(storedFavorites))
      commit('updateEventId')
      commit('updateCountFav')
    }

    if (storedLeagueIds) {
      commit('setFavoriteLeagues', storedLeagueIds.split(',').map(id => parseInt(id)))
    }
  }
}

export const mutations = {
  insertFavorite(state, { sport, event }) {
    state.events.push({ sport, event });
    localStorage.setItem('favorites', JSON.stringify(state.events))
  },
  updateFavorites(state, filteredEvents) {
    state.events = filteredEvents
    localStorage.setItem('favorites', JSON.stringify(state.events))
  },
  removeFavorite(state, { sport, event }) {
    state.events = state.events.filter(i => i.sport !== sport || i.event !== event)
    localStorage.setItem('favorites', JSON.stringify(state.events))
  },
  insertFavoriteLeague(state, leagueId) {
    state.leagues.push(leagueId);
    localStorage.setItem('favoriteLeagues', state.leagues)
  },
  updateFavoriteLeagues(state, filteredLeagues) {
    state.leagues = filteredLeagues
    localStorage.setItem('favoriteLeagues', state.leagues)
  },
  removeFavoriteLeague(state, leagueId) {
    state.leagues = state.leagues.filter(id => id != leagueId)
    localStorage.setItem('favoriteLeagues', state.leagues)
  },
  setFavorites(state, favorites) {
    state.events = favorites
  },
  setFavoriteLeagues(state, leagues) {
    state.leagues = leagues
  },
  setCurSport(state, sport) {
    state.curSport = sport
  },
  setLoadData(state, isLoading) {
    state.loading = isLoading
  },
  setMenuData(state, { json, menu }) {
    state.menuData = Object.values(json).map(({ img, name, name_en, name_my, name_vn, name_tv, name_cn, name_cnsp, name_lao, name_khmer, route, type }) => ({
      icon: img,
      name,
      name_en,
      name_my,
      name_vn,
      name_tv,
      name_cn,
      name_cnsp,
      name_lao,
      name_khmer,
      route,
      type: type.toLowerCase(),
      active: false,
      sport_id: null
    }))

    state.menuData.forEach(item => {
      // แปลง type ให้ตรงกับ menuList
      let menuType = item.type
      if (item.type === 'cow') menuType = 'bullfight'
      
      const key = Object.keys(menu).find(key => menu[key].type.toLowerCase() === menuType)
      item.sport_id = key ? parseInt(key) : null
    })

    state.menuList = menu
  },
  updateEventId(state) {
    state.eventId = state.events.map(i => i.event)
  },
  updateCountFav(state) {
    state.countFav = state.events.reduce((acc, { sport }) => {
      acc[sport] = (acc[sport] || 0) + 1
      return acc
    }, {})
  },
  setAllEventsToState(state, events) {
    state.allEvents = events
  }
}
