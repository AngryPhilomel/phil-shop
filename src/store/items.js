import firebase from 'firebase/app'

export default {
    actions: {
        async fetchItems() {
            try{
                const items = (await firebase.database().ref(`/items`).once('value')).val() || {}
                return Object.keys(items).map(key => ({...items[key], id: key}))
            } catch (e) {
                console.log(e)
            }
        },

        async fetchItemById({},id) {
            try{
                const item = (await firebase.database().ref(`/items`).child(id).once('value')).val() || {}
                return {...item, id}
            } catch (e) {
                console.log(e)
            }
        }
    }
}

