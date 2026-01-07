import Axios from "axios";
export const state = () => ({
  data : []
});

export const getters = {
getuser(state) {
return state.data;
}
};

export const mutations = {
SET_DATA(state, data) {
state.data = data
}
};

export const actions = {
async fetchuser({ commit }, data) {

let response = await Axios.get('/api-new/user.json')
commit("SET_DATA", response.data);
},
clearData({ commit }) {
commit("SET_DATA", {});
}
};
