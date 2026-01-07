export const state = () => ({
    display: {
        price : "MY",
        fontSize: "A",
        sortBy: "SortByNormal",
        sortTime: "Allmatch",
        lineType: "FulltimeOnly",
        date:"Allearly"
      },
});

export const getters = {
  getselectleague(state) {
    return state.display;
  }
};

export const mutations = {
  SET_SELECT(state, select) {
    state.display = select
    this.$auth.$storage.setUniversal("price", state.display.price);
    this.$auth.$storage.setUniversal("date", state.display.date);
    this.$auth.$storage.setUniversal("fontSize", state.display.fontSize);
    this.$auth.$storage.setUniversal("lineType", state.display.lineType);
    this.$auth.$storage.setUniversal("sortTime", state.display.sortTime);
    this.$auth.$storage.setUniversal("sortBy", state.display.sortBy);

    // localStorage.setItem('Newdate', state.display.date)


    


  }
};

export const actions = {
  fetchSelectLeagueButton({ commit }, params) {
    commit("SET_SELECT", params);
  },
  clearData({ commit }) {
    commit("SET_SELECT", {});
  }
};
