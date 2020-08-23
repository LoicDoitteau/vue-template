import Vue from 'vue'
import Vuex from 'vuex'
import { Lang, langs } from '@/models/lang'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 0,
    currentLang: langs.en
  },
  getters: {
    counter: (state) => state.counter,
    currentLang: (state) => state.currentLang
  },
  mutations: {
    increment(state, amount: number) {
      state.counter += amount;
    },
    changeLang(state, lang: Lang) {
      state.currentLang = lang;
    }
  },
  actions: {
    increment({ commit }, amount: number) {
      commit('increment', amount);
    },
    changeLang({ commit }, lang: Lang) {  
      commit('changeLang', lang);
    }
  },
  modules: {
  }
})
