export const state = () => ({
    data: {
        announce: []
    },
    loading: false
});

export const getters = {
    data(state) {
        return state.data;
    },
    getannounce(state) {
        return state.data.announce;
    },
    loading(state) {
        return state.loading;
    }
};

export const mutations = {
    SET_DATA(state, payload) {
        state.data.announce = payload.data.data;
    },
};
export const actions = {
    async fetchannounce({commit} , params) {
        var announce  = {}
        let response = await this.$axios.get('/announces')
        announce = response.data;

        params = params == null ? {} : params;
        commit('SET_DATA', {type:'anouncement',data: announce } );

    },
    clearData({commit}) {
        commit('SET_DATA', []);
    }
};
