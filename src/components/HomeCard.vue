<template>
<div class="col mt-2 h-auto">
        <div class="card" style="width: 18rem; height: 100%">
            <img :src="item.imgSrc" class="card-img-top" alt="..." @click="$router.push(`/detail/${item.id}`)">
            <div class="card-body">
                <h5 class="card-title">{{item.title}}</h5>
                <p class="card-text">{{item.description}}</p>
                <button @click="addItemInBasket(item)" class="btn btn-primary">купить {{item.price}}₽</button>
            </div>
        </div>
</div>
</template>

<script>
import messageMixin from '../mixins/message.mixin'
export default {
    name:'homecard',
    mixins: [messageMixin],
    props: ['item'],
    methods: {
        addItemInBasket(item) {
            this.$store.dispatch('addItem', item)
            this.showMessage(`${item.title} добавлено в корзину`,1000)
        }
    },
}
</script>