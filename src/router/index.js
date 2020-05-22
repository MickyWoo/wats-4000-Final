import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '@/components/HomePage.vue'
import BoosterPack from '@/components/BoosterPack.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage
    },    {
      path: '/BoosterPack',
      name: 'BoosterPack',
      component: BoosterPack
  }
  ]

const router = new VueRouter({
  routes
})

export default router