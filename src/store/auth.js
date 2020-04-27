import firebase from 'firebase/app'

export default {
    actions: {
        async login({dispatch}, {email, password}) {
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password)
                dispatch('synchLocalBasket')
            } catch (e) {
                console.log(e)
                throw e
            }
        },
        async logout({commit}){
            await firebase.auth().signOut()
            commit('clearInfo')
        },
        async register({dispatch}, {email, password, name, number, adress}) {
            try {
                await firebase.auth().createUserWithEmailAndPassword(email, password)
                const uid = await dispatch('getUid')
                await firebase.database().ref(`users/${uid}/info`).set({
                    number,
                    adress,
                    name,
                })
                dispatch('synchBasket')
            } catch (e) {
                console.log(e)
                throw e
            }
        },

        getUid() {
            const user = firebase.auth().currentUser
            return user ? user.uid : null
        }
    },
}