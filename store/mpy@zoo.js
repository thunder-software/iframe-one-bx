export const state = () => ({
    data: []
  });
  
  export const getters = {
    getmpyzoo(state) {
      return state.data;
    }
  };
  
  export const mutations = {
    SET_MPY_ZOO(state, data) {
      state.data = data;
    },
    SET_UPDATE(state , data){
        console.log('statestate',state);
        console.log('datadata',data);
    //   state.data.result = data
    }
  };
  
  export const actions = {
    async fetchmpyzoo({ commit }, data) {
      let response = await this.$axios.get("/mpy@zoo.json");
      commit("SET_MPY_ZOO", response.data);
    },
    async updateMpyZoo({ commit }, data) {
      commit("SET_UPDATE", data);
    },
    clearData({ commit }) {
      commit("SET_MPY_ZOO", {});
    }
  };
  