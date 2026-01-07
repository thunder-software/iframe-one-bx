export const state = () => ({
    tab: false
});

export const getters = {
    getbetlist(state) {
        return state.tab;
    }
};

export const mutations = {
    SET_CREDIT(state, tab) {
        state.tab = tab;
    }
};


export const actions = {
    fetchbetlist({commit}, tab) {
        commit('SET_CREDIT', tab);
    },
    clearData({commit}) {
        commit('SET_CREDIT', {});
    }
};