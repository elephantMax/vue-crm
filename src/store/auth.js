//логика для авторизации регистрации и логаута
import firebase from 'firebase/app'
export default {
  actions: {
    async login({ dispatch, commit}, { email,password }) { //второй аргумент - поля 
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (e) {
        commit('setError', e);
        throw e
      }
    },
    async logout({commit}) {
      await firebase.auth().signOut();
      commit('clearInfo');
    },

    async register({dispatch, commit}, {email,password,name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const uid = await dispatch('getUid');
        await firebase.database().ref(`/users/${uid}/info`).set({
          bill: 10000,
          name,
          locale: 'ru-RU'
        })
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
    async getUid(){
      const user = await firebase.auth().currentUser;
      return user ? user.uid : null;
    }
  }
}