export const state = () => ({
    data: [],
    loading: false
  });
  
  export const getters = {
    getlive(state) {
      console.log('state.data',state.data);
      return state.data;
    },
    loading(state) {
      return state.loading;
    }
  };
  
  export const mutations = {
    SET_LIVE(state, data) {
      console.log('state.data',state.data);
      console.log('data',data);
      state.data = data;
    },
    SET_UPDATE_LIVE(state , data){
       var obj = state.data.data;
       for (let i = 0; i < obj.length; i++) {
         if (obj[i].priceGroups[data.event.market_type]) {
           for (
             let index = 0;
             index < obj[i].priceGroups[data.event.market_type].length;
             index++
           ) {
             if (
               data.event.event_id ==
                 obj[i].priceGroups[data.event.market_type][index].event_id &&
               data.event.sort_row ==
                 obj[i].priceGroups[data.event.market_type][index].sort_row
             ) {
               obj[i].priceGroups[data.event.market_type][index].prices[
                data.index - 1
               ].actives = true;
             }
           }
         }
       }

       
       state.data = { data : []};

       setTimeout(() => {
        state.data = { data : obj};
       }, 1000)

       state.data = { data : obj};
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    }
  };
  
  export const actions = {
    async fetchFootballLive({ commit }, data) {
      commit('SET_LOADING', true);
      let response = await this.$axios.get("https://api-get-sport.lsmsportsbook.com/api/getLive");
      commit("SET_LIVE", response.data);
      commit('SET_LOADING', false);  
    },
    updateFootballLive({ commit }, data) {
      commit("SET_UPDATE_LIVE", data);
    },
  
  
    clearData({ commit }) {
      commit("SET_LIVE", {});
    }
  };
  