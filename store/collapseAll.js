export const state = () => ({
    tab: {
        live : null,
        nonlive : null
    }
});

export const getters = {
    getCollapse(state) {
        return state.tab;
    }
};

export const mutations = {
    SET_BET(state, tab) {
        state.tab = tab;
    }
};


export const actions = {
    setCollapse({commit}, tab) {
        commit('SET_BET', tab);
    },
    clearData({commit}) {
        commit('SET_BET', {});
    }
};