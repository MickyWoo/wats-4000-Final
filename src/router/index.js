import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '@/components/HomePage.vue'
import BoosterPack from '@/components/BoosterPack.vue'
import cardSearch from '@/components/cardSearch.vue'

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
  },    {
    path: '/cardSearch',
    name: 'cardSearch',
    component: cardSearch
}
  ]

const router = new VueRouter({
  routes
})

export default router