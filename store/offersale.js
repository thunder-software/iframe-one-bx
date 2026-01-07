export const state = () => ({
  data: {
    offersale: [],
    // offersale: 
    //   {
    //     datas: []
    //   }
  },
  sendoffersale: [],
  loading: false
});

export const getters = {
  data(state) {
    return state.data;
  },
  getoffersales(state) {
    return state.data.offersale;
  },
  sendoffersales(state) {
    return state.sendoffersale;
  },
  loading(state) {
    return state.loading;
  }
};

export const mutations = {
  SET_DATA(state, payload) {
    state.data[payload.type] = payload.data;
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  }
};

export const actions = {
  async fetchOffersale({ commit }, params) {
    commit("SET_LOADING", true);
    let response = await this.$axios.get(`/offersale/price`, {
      params: params
    });
    commit("SET_DATA", { type: "offersale", data: response.data });
    commit("SET_LOADING", false);
  },

  async sendOffersale({ commit }, params) {
    commit("SET_LOADING", true);
    let response = null
    if(params.order_status == 'sale'){
      response = await this.$axios.post(`/offersale/sale`, params);
    }else{
      response = await this.$axios.post(`/offersale/buy`, params);
    }
    
    commit("SET_DATA", { type: "sendoffersales", data: response.data });
    commit("SET_LOADING", false);
  },

  clearData({ commit }) {
    commit("SET_DATA", []);
  }
};
