import firebase from 'firebase/app'

export default {
    state: {
        basket: [
            
        ],
        count: 0,
        sum: 0,
    },
    mutations: {
        getSum(state) {
            state.sum = 0
            state.count = 0
            state.basket.forEach((b) => {
                state.count += b.count
                state.sum += b.count * b.price
            })
        },
        addItemInBasket(state, item){
            const q = state.basket.find(b => b.id === item.id)
            
            if (!q){
                state.basket.push({...item, count: 1})
            }
            else {
                state.basket.map(i => {
                    if (i.id === item.id) {
                        i.count = i.count+1
                        return
                    }
                })
                
            }
            state.count = state.count + 1
        },
        removeOneItemFromBasket(state, item) {
            state.basket.map(i => {
                if (i.id === item.id) {
                    i.count = i.count-1
                    return
                }
            })
            state.count = state.count + 1
        },
        removeItemFromBasket(state, item) {
            const q = state.basket.filter(i => {
                    return i.id !== item.id  
            })
            state.basket = q
            state.count = state.count + 1
        },
        clearItemInBasket(state){
            state.basket.length = 0
            state.count = state.count + 1
        },
        updateBasket(state, basket) {
            state.basket = basket
            state.count = state.count + 1
        }
    },
    actions: {
        async addItem({commit, dispatch}, item) {
            dispatch('synchLocalBasket')
            commit('addItemInBasket', item)
            commit('getSum')
            dispatch('synchBasket')  
        },
        async clearAllItems({commit, dispatch}) {
            commit('clearItemInBasket')
            commit('getSum')
            dispatch('synchBasket')
            dispatch('synchLocalBasket')
        },
        async removeItem({commit, dispatch}, item) {
            commit('removeItemFromBasket',item)
            commit('getSum')
            dispatch('synchBasket')
            dispatch('synchLocalBasket')
        },
        async removeOneItem({commit, dispatch}, item) {
            if (item.count === 1) {
                commit('removeItemFromBasket',item)
                commit('getSum')
            }
            commit('removeOneItemFromBasket',item)
            commit('getSum')
            dispatch('synchBasket')
            dispatch('synchLocalBasket')
        },
        async synchBasket({dispatch, getters}) {
            
            const uid = await dispatch('getUid')
            const basket = {...getters.basket}
            await firebase.database().ref(`users/${uid}/basket`).set(basket)
        },
        async synchLocalBasket({dispatch, commit}) {
            const uid = await dispatch('getUid')
            const basket = (await firebase.database().ref(`users/${uid}/basket`).once('value')).val()
            basket ? commit('updateBasket', basket) : []
            commit('getSum')
        },
        async createOrder({dispatch, commit, getters}) {
            const uid = await dispatch('getUid')
            const basket = {...getters.basket, ...getters.count, ...getters.sum}
            const q = await firebase.database().ref(`/orders`).push({
                uid,
                basket,
                status: "New",
                date: new Date().toJSON()
            })
            dispatch('clearAllItems')
            return q.key
        }
    },
    getters: {
        basket: s => s.basket,
        count: s => s.count,
        sum: s => s.sum,
    }
}