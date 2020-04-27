<template>
<div>
    <Loader v-if="loading"/>
    <div v-else class="media">
        <img :src="item.imgSrc" style="width: 50%" class="mr-3" alt="...">
        <div class="media-body">
            <h5 class="mt-0">{{item.title}}</h5>
            <p>{{item.description}}</p>
            Категория: <strong>{{item.category}}</strong>
            <hr/>
            <button @click="addItemInBasket(item)" class="btn btn-primary">купить {{item.price}}₽</button>
        </div>
    </div>


</div>
    
</template>

<script>
import messageMixin from '../mixins/message.mixin'
export default {
    data: () => ({
        item: null,
        loading: true,
    }),
    mixins: [messageMixin],
    async mounted() {
        const id = this.$route.params.id
        this.item = await this.$store.dispatch('fetchItemById', id)
        this.loading = false
    },
    methods: {
        addItemInBasket(item) {
            this.$store.dispatch('addItem', item)
            this.showMessage(`${item.title} добавлено в корзину`, 1000)
        }
    },
}
</script>