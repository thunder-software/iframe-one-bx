export const state = () => ({
  data: []
});

export const getters = {
  getlive(state) {
    return state.data;
  }
};

export const mutations = {
  SET_LIVE(state, data) {
    state.data = data;
  },
  SET_UPDATE_LIVE(state , data){
    state.data.result = data
  }
};

export const actions = {
  async fetchFootballLive({ commit }, data) {
    let response = await this.$axios.get("/live.json");
    commit("SET_LIVE", response.data);
  },
  updateFootballLive({ commit }, data) {
    commit("SET_UPDATE_LIVE", data);
  },


  clearData({ commit }) {
    commit("SET_LIVE", {});
  }
};
