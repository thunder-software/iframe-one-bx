export const state = () => ({
    data: {
        arrayParlay : [],
        arrayStep : []
    }
});

export const getters = {
    getmix(state) {
        return state.data;
    }
};

export const mutations = {
    ADDS_DATA(state, match){
        if(match.type == 'mix'){
            state.data.arrayStep = []
            const itemIndex = state.data.arrayParlay.findIndex(o => o.event_id === match.event_id);
            if(itemIndex > -1) {
                state.data.arrayParlay = state.data.arrayParlay.map(u => u.event_id !== match.event_id ? u : match);
    
            } else {
                state.data.arrayParlay.push(match);
            }   
        }else{
            state.data.arrayParlay = []
            const itemIndex = state.data.arrayStep.findIndex(o => o.event_id === match.event_id);
            if(itemIndex > -1) {
                state.data.arrayStep = state.data.arrayStep.map(u => u.event_id !== match.event_id ? u : match);
    
            } else {
                state.data.arrayStep.push(match);
            }   
        }
    },
    REMOVE_DATA(state, match) {
        if (state.data.arrayStep.length !=0) {
            const index = state.data.arrayStep.findIndex(object => {return object.event_id === match.event_id;});
            return  state.data.arrayStep.splice(index, 1);
        }
        if(state.data.arrayParlaylength !=0){
            const index = state.data.arrayParlay.findIndex(object => {return object.event_id === match.event_id;});
            return  state.data.arrayParlay.splice(index, 1);
        }    
    },
    REMOVE_ALL(state, match){
        state.data.arrayParlay = []
        state.data.arrayStep = []
    }
};


export const actions = {
    pushBetList({commit}, data){
        commit('ADDS_DATA', data);
    },
    removeBet({commit}, data) {  
        
        commit('REMOVE_DATA', data);
    },
    removeAll({commit}, data) {
        commit('REMOVE_ALL', data);
    },
};