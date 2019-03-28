import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuelidate from "vuelidate"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VeeValidate from 'vee-validate';
import BootstrapVue from 'bootstrap-vue';

Vue.use(BootstrapVue)
Vue.use(VeeValidate);

Vue.use(VueAxios, axios)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
