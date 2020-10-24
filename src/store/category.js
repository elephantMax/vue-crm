import firebase from 'firebase/app'
export default {
  actions: {
    async createCategory({
      dispatch,
      commit
    }, data) {
      try {
        const uid = await dispatch('getUid');
        const category = await firebase.database().ref(`/users/${uid}/categories`).push(data);
        data.id = category.key;
        return data;
      } catch (error) {
        commit('setError', error);
        throw error
      }
    },
    async getCategories({dispatch,commit}) {
      try {
        const uid = await dispatch('getUid');
        const categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {};
        return Object.keys(categories).map(key => ({ id: key, ...categories[key] })); //WOOW
      } catch (error) {
        commit('setError', error);
        throw error
      }
    },
    async getCategoryById({dispatch,commit}, id) {
      try {
        const uid = await dispatch('getUid');
        const category = (await firebase.database().ref(`/users/${uid}/categories`).child(id).once('value')).val();
        return {...category, id}
      } catch (error) {
        commit('setError', error);
        throw error
      }
    },
    async updateCategory({dispatch, commit}, {id, title, limit}){
      try {
        const uid = await dispatch('getUid');
        await firebase.database().ref(`/users/${uid}/categories`).child(id).update({
          title,
          limit
        });
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    }
  }
}