import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {layout: 'main'},
    component: () => import('../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    meta: {layout: 'main'},
    component: () => import('../views/About.vue')
  },
  {
    path: '/pricing',
    name: 'Pricing',
    meta: {layout: 'main'},
    component: () => import('../views/Pricing.vue')
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    meta: {layout: 'main'},
    component: () => import('../views/Detail.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: {layout: 'main'},
    component: () => import('../views/Profile.vue')
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
