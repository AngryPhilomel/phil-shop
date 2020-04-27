<template>
    <div>
        <div v-if="getUser.uid" class="btn-group">
            <button type="button" class="btn btn-outline-primary mr-1 dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {{userInfo.name}}
            </button>
                <div class="dropdown-menu dropdown-menu-right" style="padding-bottom: 0; padding-top: 0;">
                    <router-link to="/profile" class="btn btn-block btn-success" style="border-radius: 0px; margin: 0px;" type="button">Профиль</router-link>
                    <button @click="logoutHandler" class="btn btn-block btn-danger" style="border-radius: 0px; margin: 0px;" type="button">Выход</button>
                </div>
        </div>
        <button v-else @click.prevent="modal" class="btn btn-outline-primary mr-1">Логин</button>
    </div>
</template>

<script>
import messageMixin from '../mixins/message.mixin'
export default {
    name: 'loginButon',
    data: () => ({
         userInfo: null,
    }),
    mixins:[messageMixin],
    async mounted() {
        await this.$store.dispatch('fetchInfo')
        this.userInfo = this.getUser
    },
    methods: {
        modal() {
            this.$modalAuth()
        },
        async logoutHandler() {
            this.$store.dispatch('logout')
            this.userInfo = null
            this.showMessage('Вы вышли из системы', 1000)
        },
    },

    computed: {
        getUser() { 
            return this.$store.getters.info
        },
    },
    watch: {
        getUser: function() {
            this.userInfo = this.$store.getters.info
        }
    },
}
</script>