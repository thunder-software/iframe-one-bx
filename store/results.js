export const state = () => ({
    data: {
        results: []
        
    },
    loading: false
});

export const getters = {
    data(state) {
        return state.data;
    },
    getresults(state) {
        return state.data.results;
    },
    loading(state) {
        return state.loading;
    }
};

export const mutations = {
    SET_DATA(state, payload) {   
        state.data[payload.type] = payload.data;
    },
};

export const actions = {
    async fetchResults({commit} , params) {
        // var { readFile } = require("fs");
        // var MockAdapter = require("axios-mock-adapter");
        // var mock = new MockAdapter(this.$axios);
        var results  = {}
        let response = await this.$axios.get('/results')
        results = response.data;
        params = params == null ? {} : params;
        // let response  = await this.$axios.get(`/bo/loadlang?lang=`+ params);
        // commit('SET_DATA', {type:'language',data: params == 'th' ? data.langs_th : data.langs_en} );
        commit('SET_DATA', {type:'results',data: results } );
       
    },            
    clearData({commit}) {
        commit('SET_DATA', []);       
    }
};