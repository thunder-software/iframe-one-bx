export const state = () => ({
    tab: null
});

export const getters = {
    getClosetabs(state) {
        return state.tab;
    }
};

export const mutations = {
    SET_BET(state, tab) {
        state.tab = tab;
    }
};


export const actions = {
    closeTabsbet({commit}, tab) {
        commit('SET_BET', tab);
    },
    clearData({commit}) {
        commit('SET_BET', {});
    }
};