import Vue from 'vue'
import Vuex from 'vuex'
import Mantenimiento from './modules/mantenimiento.js'
Vue.use(Vuex)



export default new Vuex.Store({
  modules:{
    Mantenimiento
  }  
})



