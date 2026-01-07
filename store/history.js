export const state = () => ({
    data: {
        history: [],
    },
    detail: [],
    loading: false
  });
  
  export const getters = {
    data(state) {
      return state.data;
    },
    gethistory(state) {
      return state.data.history;
    },
    getdetail(state) {
      return state.data;
    },
    loading(state) {
      return state.loading;
    }
  };
  
  export const mutations = {
    SET_DATA(state, payload) {        
        state.data[payload.type] = payload.data;
    },
    SET_DETAIL(state, payload) {        
      state.data[payload.type] = payload.data.datas;
  },
    SET_LOADING(state, loading) {
      state.loading = loading;
    }
  };
  
  export const actions = {
    async fetchHistory({ commit }, params) {
      commit("SET_LOADING", true);
      let response = await this.$axios.get(`/offersale/history`, {
        params: params
      });
      commit("SET_DATA", { type: "history", data: response.data });
      commit("SET_LOADING", false);
    },

    async fetchdetail({ commit }, params) {
      commit("SET_LOADING", true);
      let response = await this.$axios.get(`/offersale/history/detail/?quotationNo=${params}`, {
        params: params
      });
      commit("SET_DETAIL", { type: "history", data: response.data });
      commit("SET_LOADING", false);
    },
  
    clearData({ commit }) {
      commit("SET_DATA", []);
    }
  };
  