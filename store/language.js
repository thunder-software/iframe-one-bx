import Axios from "axios";
export const state = () => ({
    data: {
        language: [],
        langs: '',
    },
    loading: false
});

export const getters = {
    data(state) {
        return state.data;
    },
    dictionary(state) {
        return state.data.language;
    },
    langs(state) {
        return state.data.langs;
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
    async fetchLanguage({commit} , params) {
        // var { readFile } = require("fs");
        // var MockAdapter = require("axios-mock-adapter");
        // var mock = new MockAdapter(this.$axios);

        var langs = {}

        let response = await Axios.get('/api-new/'+params+'.json')
        langs = response.data;
        params = params == null ? {} : params;
        // let response  = await this.$axios.get(`/bo/loadlang?lang=`+ params);
        // commit('SET_DATA', {type:'language',data: params == 'th' ? data.langs_th : data.langs_en} );
        commit('SET_DATA', {type:'language',data: langs } );
        commit('SET_DATA', {type:'langs',data: params} );
    },            
    clearData({commit}) {
        commit('SET_DATA', []);
    }
};