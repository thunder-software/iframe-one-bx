export const state = () => ({
    data: {
        menu: []
    },
    loading: false
});

export const getters = {
    getMenu(state) {
        return state.data;
    },
    loading(state) {
        return state.loading;
    }
};

export const mutations = {
    SET_DATA(state, payload) {
        state.data.menu = payload;
    },
    SET_LOADING(state, loading) {
        state.loading = loading;
    }
};
export const actions = {
    async fetchMenu({commit} , params) {
        try {
            commit('SET_LOADING', true);
            var value  = {}
            let response = await this.$axios.get("/event/sport/menu");
            value = response.data.menu;
            commit('SET_DATA', value );
            commit('SET_LOADING', false);
        } catch (error) {
            commit('SET_LOADING', false);
            alert(error.response.data.message)
        }
    },
    clearData({commit}) {
        commit('SET_DATA', []);
    }
};
