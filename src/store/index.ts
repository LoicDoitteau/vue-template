import Vue from 'vue'
import Vuex from 'vuex'
import { Lang, langs } from '@/models/lang'
import { Filter, OutputFilter } from '@/models/filter'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentLang: langs.en,
    filters: [ ...Array.from({ length: 9 }, (_, i) => {
      return { id: i, name: `Filter ${i+1}`, position: { x: (i % 3) * 220, y: Math.floor(i / 3) * 280, k: 0 } } as Filter;
    }), new OutputFilter(10, { x: 220, y: 3 * 280, k: 0 })]
  },
  getters: {
    currentLang: (state) => state.currentLang,
    filters: (state) => state.filters
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
