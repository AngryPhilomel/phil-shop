export default {
    state: {
        message: ''
    },
    mutations:{
        setMessage(state, message) {
            state.message = message
        }
    },
    actions: {
        setMessage({commit}, message) {
            commit('setMessage', message)
        }
    },
    getters: {
        message: s => s.message
    }
}