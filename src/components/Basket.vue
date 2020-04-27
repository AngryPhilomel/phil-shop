<template>
    <!-- BASKET FORM  -->

            <div class="btn-group">
                <!--   -->
                <button :key="basketCount + Math.random()" type="button" class="btn btn-outline-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Корзина
                </button>
                <div class="dropdown-menu dropdown-menu-right" style="padding-bottom: 0; padding-top: 0;">
                    <div :key="b.id" v-for="b in basket">
                            <button 
                                class="dropdown-item" 
                                style=" position: relative; margin-right: 5rem; margin-top: 1rem" 
                                type="button" 
                                >{{b.title}} 
                               <div style="position: absolute; top: 0; right: 0;">
                                    <button @click="removeOne(b)" class="btn btn-secondary btn-sm">-</button>
                                    {{b.count}}
                                    <button @click="addOne(b)" class="btn btn-secondary btn-sm">+</button>
                                    <button @click="removeHandler(b)"  class="btn btn-danger btn-sm">&times;</button>
                                </div>
                            </button>
                    </div>
                    <!-- <div class="row ml-1"> -->
                        
                        <div class="dropdown-item" >Всего {{basketCount}} на сумму: {{basketSum}}₽</div>
                        <button @click="canOrder" class="btn btn-block btn-success" style="border-radius: 0px; margin: 0px;" type="button">Оформить</button>
                        <button @click="clearBasket" class="btn btn-block btn-danger" style="border-radius: 0px; margin: 0px;" type="button">Очистить</button>
                    <!-- </div> -->
                </div>
            </div>
</template>

<script>
import messageMixin from '../mixins/message.mixin'
export default {
    name: 'basket',
    data: () => ({
        basket: [],
    }),
    mixins:[messageMixin],
    async mounted() {
        await this.$store.dispatch('synchLocalBasket')
        this.basket = this.$store.getters.basket
    },
    methods: {
            modal(){this.$modalAuth()},
            addOne(item) {
                this.$store.dispatch('addItem', item)
            },
            removeOne(item) {
                this.$store.dispatch('removeOneItem', item)
            },
            removeHandler(item){
                this.$store.dispatch('removeItem', item)
            },
            clearBasket() {
                this.basket.length = 0
                this.$store.dispatch('clearAllItems')
            },
            async createOrder() {
                const order = await this.$store.dispatch('createOrder')
                this.showMessage(`Заказ ${order} создан, мы свяжемся с вами в ближайшее время!`,5000)
            },
            noOrderMessage() {
                this.showMessage('В корзине пусто!', 2000)
            },
    },
    computed: {
        basketCount() {
                return this.$store.getters.count
            },
        basketSum() {
                return this.$store.getters.sum
            },
        userInfo() {
            return this.$store.getters.info
        },
        canOrder() {
                return this.basketCount ? this.userInfo.uid ? this.createOrder : this.modal : this.noOrderMessage
            },
    },
    watch: {
            basketCount: function () {
                this.basket = this.$store.getters.basket
            }
        }
}
</script>