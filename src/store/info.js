import firebase from 'firebase/app'

export default {
    state: {
        info: {}
    },
    mutations: {
        setInfo(state, info) {
            state.info = info
        },
        clearInfo(state) {
            state.info = {}
        }
    },
    actions: {
        async fetchInfo({dispatch, commit}){
            const uid = await dispatch('getUid')
            const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
            const infoid = {...info, uid}
            commit('setInfo', infoid)
        },
        async updateInfo({dispatch, getters, commit}, toUpdate){
            try {
            const uid = await dispatch('getUid')
            const updateData = {...getters.info, ...toUpdate}
            await firebase.database().ref(`users/${uid}/info`).update(updateData)
            commit('setInfo', updateData)
            } catch (e) {
                console.log(e)
                throw e
            }
        }
    },
    getters: {
        info: s => s.info
    }
}