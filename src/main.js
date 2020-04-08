import Vue from 'vue';
import VueMeta from 'vue-meta';
import dateFilter from '@/filters/date';
import currencyFilter from '@/filters/currency.filter';
import localizeFilter from '@/filters/localize.filter';
import tooltipDirective from '@/directives/tooltip.directive';
import Vuelidate from 'vuelidate';
import firebase from 'firebase/app';
import messagePlugin from '@/utils/message.plugin';
import titlePlugin from '@/utils/title.plugin';
import Loader from '@/components/app/Loader.vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'materialize-css/dist/js/materialize.min';
import 'firebase/auth';
import 'firebase/database';


Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.use(Vuelidate);
Vue.use(VueMeta);
Vue.use(titlePlugin);
Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);
Vue.filter('localize', localizeFilter);
Vue.directive('tooltip', tooltipDirective);
Vue.component('Loader', Loader);

firebase.initializeApp({
  apiKey: 'AIzaSyA7RMdpnsVQNkr9hWbLd798Adc2_g8mpBI',
  authDomain: 'vue-crm-project-bf769.firebaseapp.com',
  databaseURL: 'https://vue-crm-project-bf769.firebaseio.com',
  projectId: 'vue-crm-project-bf769',
  storageBucket: 'vue-crm-project-bf769.appspot.com',
  messagingSenderId: '855092922918',
  appId: '1:855092922918:web:9d2ed98242192737aeb4e7',
  measurementId: 'G-LW2Z71NCHE',
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  }
});
