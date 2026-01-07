export const state = () => ({
    tab: true
});

export const getters = {
    getQuickbet(state) {
        return state.tab;
    }
};

export const mutations = {
    SET_BET(state, tab) {
        state.tab = tab;
    }
};


export const actions = {
    actionsQuickbet({commit}, tab) {
        commit('SET_BET', tab);
    },
    clearData({commit}) {
        commit('SET_BET', {});
    }
};