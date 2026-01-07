export const state = () => ({
    data: [],
    loading: false
  });
  
  export const getters = {
    getnotlive(state) {
      return state.data;
    },
    loading(state) {
      return state.loading;
    }
  };
  
  export const mutations = {
    SET_DATA(state, data) {
      state.data = data;
    },
    SET_UPDATE_NOT_LIVE(state , data){
      state.data.result = data
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    }
  };
  
  export const actions = {
    async fetchFootballNotLive({ commit }, data) {
      commit('SET_LOADING', true);
      let response = await this.$axios.get("https://api-get-sport.lsmsportsbook.com/api/getnonLive");
      commit("SET_DATA", response.data);
      commit('SET_LOADING', false);  
    },
    updateFootballLive({ commit }, data) {
      commit("SET_UPDATE_LIVE", data);
    },
  
  
    clearData({ commit }) {
      commit("SET_DATA", {});
    }
  };
  