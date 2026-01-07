export const state = () => ({
    info: false
});

export const getters = {
    getInfo(state) {
        return state.info;
    }
};

export const mutations = {
    SET_INFO(state, info) {
        state.info = info;
    }
};


export const actions = {
    setBetinfo({commit}, info) {
        commit('SET_INFO', info);
    },
    clearData({commit}) {
        commit('SET_INFO', {});
    }
};