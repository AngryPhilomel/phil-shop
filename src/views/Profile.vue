<template>
    <div class="container">
            <Loader v-if="loading"/>
        <form v-else>
            <div class="form-group">
                <label>Имя</label>
                <input type="text" class="form-control" v-model="name">
            </div>
            <div class="form-group">
                <label>Номер телефона</label>
                <input type="text" class="form-control" v-model="number">
            </div>
            <div class="form-group">
                <label>Адрес доставки</label>
                <input type="text" class="form-control" v-model="adress">
            </div>
            <button @click.prevent="changeHandler" type="submit" class="btn btn-primary">Сохранить</button>
        </form>
    </div>
</template>

<script>
import messageMixin from '../mixins/message.mixin'
export default {
    data: () => ({
        name: '',
        number: '',
        adress: '',
        loading: true,
    }),
    mixins:[messageMixin],
    async mounted() {
        await this.$store.dispatch('fetchInfo')
        this.name = this.$store.getters.info.name
        this.number = this.$store.getters.info.number
        this.adress = this.$store.getters.info.adress
        this.loading = false
    },
    methods: {
        changeHandler() {
            const formInfo = {
                name: this.name,
                number: this.number,
                adress: this.adress,
            }
            this.$store.dispatch('updateInfo', formInfo)
            this.showMessage('Данные обновлены', 1000)
        }
    }
}
</script>