export const state = () => ({
    data: {
        balance: [],
    },
    loading: false
});

export const getters = {
    data(state) {
        return state.data;
    },
    balance(state) {
        return state.data.balance;
    },
    loading(state) {
        return state.loading;
    }
};

export const mutations = {
    SET_DATA(state, data) {       
        state.data[data.type] = data.data;
    },
    SET_LOADING(state, loading) {
        state.loading = loading;
    }
};
export const actions = {
    async fetchBalance({commit} , data) {
        commit('SET_LOADING', true);
        let response = await this.$axios.get(`/balance`);
        commit('SET_DATA', {type:'balance',data: response.data} );
        commit('SET_LOADING', false);        
    },            
    clearData({commit}) {
        commit('SET_DATA', []);
    }
};