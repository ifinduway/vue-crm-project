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
      const key = process.env.VUE_APP_FIXER;
      const res = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB`);
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
