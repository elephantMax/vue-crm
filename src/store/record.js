import firebase from 'firebase/app'
export default {
  actions: {
    async addRecord({dispatch, commit}, data){
      try {
        const uid = await dispatch('getUid');
        return await firebase.database().ref(`/users/${uid}/records`).push(data);
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
    async getRecords({dispatch, commit}){
      try {
        const uid = await dispatch('getUid');
        const records = (await firebase.database().ref(`/users/${uid}/records`).once('value')).val() || {};
        return Object.keys(records).map(key => ({
          id: key,
          ...records[key]
        }));
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
    async getRecordById({dispatch, commit}, id){
      try {
        const uid = await dispatch('getUid');
        const record = (await firebase.database().ref(`/users/${uid}/records`).child(id).once('value')).val();
        return {...record, id}
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    }
  }
}