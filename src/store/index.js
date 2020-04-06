import Vue from 'vue';
import Vuex from 'vuex';
import Auth from './auth';
import Info from './info';

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
  },
  getters: {
    error: (e) => e.error,
  },
  modules: {
    Auth,
    Info,
  },
});
