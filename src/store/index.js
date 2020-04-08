import Vue from 'vue';
import Vuex from 'vuex';
import Auth from './auth';
import Info from './info';
import Category from './category';
import Record from './record';

Vue.use(Vuex);

export default new Vuex.Store({


  state: {
    error: null,
  },


  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    },
  },


  actions: {
    async fetchCurrency() {
      const res = await fetch('https://api.exchangeratesapi.io/latest?symbols=USD,RUB,MYR');
      console.log(res);
      return res.json();
    },
  },


  getters: {
    error: (e) => e.error,
  },


  modules: {
    Auth,
    Info,
    Category,
    Record,
  },
});
