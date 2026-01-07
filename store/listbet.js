export const state = () => ({
  data: {
    ticket: [],
},
loading: false
});

export const getters = {
  getlistbet(state) {
    return state.data.ticket;
  },
  getticket(state){
    return state.data.ticket;
  }
};

export const mutations = {
  SET_DATA(state, data) {
    state.data[data.type] = data.data;
    // for (let i = 0; i < data.data; i++) {
    //    state.data.push(data.data[i])
    // }
  },
  SET_BET_LIST(state, data){

  },
  SET_BET(state, data) {
    if(state.data){
      //   state.data.unshift(data)
    }else{
      state.data = data
    }
  }
};

export const actions = {
  fetchListBet({ commit }, data) {
    commit("SET_BET", data);
  },
  async confirmBet({ commit }, data){
    try {    
      let response = await this.$axios.post("/ticket/bet/confirm" , data);
      // let response = await this.$axios.post("https://api-get-sport.lsmsportsbook.com/confirm_test" , data);
      commit("SET_BET_LIST", response.data);
    } catch (error) {
      console.log('error',error);
      // this.$swal.fire("ไม่สำเร็จ", "ราคาถูกเปลี่ยน !"  , "warning");
    }
  },
  async fetchGetListBet({ commit }, data){
    
    let response = await this.$axios.get(`/event/ticket/latest`, {params: data});
    commit("SET_DATA",{type:'ticket',data: response.data});
    
  },
  clearData({ commit }) {
    commit("SET_BET", {});
  }
};
