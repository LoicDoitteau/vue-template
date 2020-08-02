import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 0
  },
  getters: {
    counter: (state) => state.counter
  },
  mutations: {
    increment(state, playload) {
      state.counter += playload.amount;
    }
  },
  actions: {
    increment({ commit }, playload) {
      commit('increment', playload);
    }
  },
  modules: {
  }
})
