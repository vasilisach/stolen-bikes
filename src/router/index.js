import Vue from 'vue'
import Router from 'vue-router'
import StolenBikes from '@/components/StolenBikes'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'StolenBikes',
      component: StolenBikes
    }
  ]
})
