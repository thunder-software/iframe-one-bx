export const state = () => ({
    tab: null
});

export const getters = {
    getclosebetlist(state) {
        return state.tab;
    }
};

export const mutations = {
    SET_BET(state, tab) {
        state.tab = tab;
    }
};


export const actions = {
    actionsclosebetlist({commit}, tab) {
        commit('SET_BET', tab);
    },
    clearData({commit}) {
        commit('SET_BET', {});
    }
};