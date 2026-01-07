export const state = () => ({
  data: {
    tab: false,
    dataBetSingle: [],
    dataBetParlay: [],
    type_bet: ""
  },
  mock : {
    mockBetSingle: [],
    mockBetParlay: [],
  },
  setOUtab : [],
  value : 0,
  checkbox : false,
  pricechange : false,
  loadingbet : false,
  placeholder : false,
});

export const getters = {
  getbet(state) {
    return state.data;
  },
  getdatatab(state){
    return state.setOUtab;
  },
  mockbet(state) {
    return state.mock;
  },
  mockprice(state) {
    return state.value;
  },
  mockcheckbox(state) {
    return state.checkbox;
  },
  mockpricechange(state) {
    return state.pricechange;
  },
  mockloadingbet(state){
    return state.loadingbet;
  },
  mockplaceholder(state){
    return state.placeholder;
  }
};

export const mutations = {
  MOCK_DATA(state, match) {
    if (match.type == "mixparlay" || match.type == "step") {
      state.mock.mockBetParlay = match.data;
    } else {
      state.mock.mockBetSingle = match.data;
    }
  },
  SET_PRICE(state, match){
    state.value = match;
  },
  SET_CHECKBOX(state, match){
    state.checkbox = match;
  },
  SET_PRICE_CHANGE(state, match){
    state.pricechange = match;
  },
  SET_LOADING_BET(state, match){
    state.loadingbet = match;
  },
  SET_OUTAB(state, match){
    state.setOUtab = match;
  },
  SET_DATA(state, match) {
    state.data.tab = match.open;
    state.data.type_bet = match.type_bet;
    if (match.type_bet == "mixparlay" || match.type_bet == "step") {
      state.data.dataBetParlay = match;
    } else {
      state.data.dataBetSingle = match;
    }
  },
  SET_PLACEHOLDER(state, match){
    state.placeholder = match;
  },
};

export const actions = {
  fetchActionsTab({ commit }, data) {
    commit("SET_DATA", data);
  },
  mockDataBet({ commit }, data) {
    commit("MOCK_DATA", data);
  },
  setCheckbox({ commit }, data) {
    commit("SET_CHECKBOX", data);
  },
  setPrice({ commit }, data) {
    commit("SET_PRICE", data);
  },
  setPriceChange({ commit }, data) {
    commit("SET_PRICE_CHANGE", data);
  },
  setLoadingbet({ commit }, data) {
    commit("SET_LOADING_BET", data);
  },
  setPlaceholder({ commit }, data) {
    commit("SET_PLACEHOLDER", data);
  },
  setOUtab({ commit }, data) {
    commit("SET_OUTAB", data);
  },
  clearData({ commit }) {
    commit("SET_DATA", {});
  }
};