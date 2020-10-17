import { createStore } from 'vuex'
import auth from './auth'
import info from './info'

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
    test(){
    },
    async fetchCurrency(){
      const key = process.env.VUE_APP_FIXER;
      const res =  await fetch(`http://data.fixer.io/api/latest?access_key=${key}&format=1&symbols=USD,EUR,RUB`);
      return await res.json();
    }
  },
  getters:{
    error: s => s.error //(state) => state.error
  },
  modules: {
    auth, info
  }
})
