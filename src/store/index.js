import { createStore } from 'vuex'
import auth from './auth'
import info from './info'
import category from './category'
import record from './record'

export default createStore({
  state: {
    error: null
  },
  mutations: {
    setError(state, error){
      state.error = error;
    },
    clearError(state){
      state.error = null;
    }

  },
  actions:{
    async fetchCurrency(){
      const res =  await fetch('https://www.cbr-xml-daily.ru/latest.js')
      return await res.json()
    }
  },
  getters:{
    error: s => s.error //(state) => state.error
  },
  modules: {
    auth, info, category, record
  }
})
