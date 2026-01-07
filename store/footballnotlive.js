export const state = () => ({
  data: []
});

export const getters = {
  getnotlive(state) {
    return state.data;
  }
};

export const mutations = {
  SET_NOT_LIVE(state, data) {
    state.data = data;
  },
  SET_UPDATE_NOT_LIVE(state , data){
    state.data.result = data
  }
};

export const actions = {
  async fetchFootballNotLive({ commit }, data) {
    let response = await this.$axios.get("/today.json");
    commit("SET_NOT_LIVE", response.data);
  },
  async updateFootballNotLive({ commit }, data) {
    commit("SET_UPDATE_NOT_LIVE", data);
  },
  clearData({ commit }) {
    commit("SET_NOT_LIVE", {});
  }
};
