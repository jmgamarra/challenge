import Vue from 'vue'
import App from './components/Table.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios,axios)
Vue.config.productionTip = false
// Vue.mixin({
//   methods: {
//     //capitalizeFirstLetter: str => str.charAt(0).toUpperCase() + str.slice(1)
//     capitalizeFirstLetter(){

//       console.log('hola');
//     }
    
//   }
// })
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
