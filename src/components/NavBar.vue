<template>
    <div>

        <!-- ALERT MODULE -->

        <AllertMessage/>

        <!-- MODAL LOGIN -->

        <Modal/>

        <!-- NAVBAR -->

        <nav class="navbar sticky-top navbar-expand navbar-light bg-light">
            <router-link class="navbar-brand" to="/">
                <img src="../../public/img/me.png" width="30" height="30" class="d-inline-block align-top" alt="">
                    PhilShop
            </router-link>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                    <router-link
                        v-for="link in links"
                        :key="link.url"
                        tag="li"
                        class="nav-item"
                        active-class="active"
                    :to="link.url"
                        :exact="link.exact"
                    >
                        <a href="#" class="nav-link">{{link.title}}</a>
                    </router-link>
                    <li class="nav-item dropdown" >
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Категории
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="#">Соловьи</a>
                            <a class="dropdown-item" href="#">Канарейки</a>
                            <a class="dropdown-item" href="#">Попугаи</a>
                        </div>
                    </li>
                </ul>
                    

                <LoginButton/>

                <Basket/>

            </div>
        </nav>
            
        
    </div>
</template>

<script>
import AllertMessage from '../components/AllertMessage'
import messageMixin from '../mixins/message.mixin'
import Basket from '../components/Basket'
import Modal from '../components/Modal'
import LoginButton from '../components/LoginButton'
    export default {
        name:'navbar',
        data: () => ({
            links: [
                {title: 'Главная', url:'/', exact: true},
                {title: 'О нас', url:'/about'},
                {title: 'Цены', url:'/pricing'},
            ],
           
        }),
        components:{
            AllertMessage, Basket, Modal, LoginButton
        },
    }
</script>