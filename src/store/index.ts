import Vue from 'vue'
import Vuex from 'vuex'
import { Lang, langs } from '@/models/lang'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentLang: langs.en
  },
  getters: {
    currentLang: (state) => state.currentLang
  },
  mutations: {
    currentLang(state, lang: Lang) {
      state.currentLang = lang;
    }
  },
  actions: {
    changeLang({ commit }, lang: Lang) {  
      commit('currentLang', lang);
    }
  },
  modules: {
  }
})
