export default {
    methods: {
        showMessage(message, time) {
            this.$store.dispatch('setMessage', message)
            $('.toast').toast('show')
            setTimeout(() => {
                $('.toast').toast('hide')
                },time)
        }
    }
}