export const state = () => ({
    datatv: null
});

export const getters = {
    getDataTV(state) {

        return state.datatv;
    }
};

export const mutations = {
    SET_TV(state, data) {
        state.datatv = data;
    }
};


export const actions = {
    actionsTV({commit}, data) {
        commit('SET_TV', data);
    },
    clearData({commit}) {
        commit('SET_TV', {});
    }
};