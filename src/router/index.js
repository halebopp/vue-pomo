import Vue from 'vue'
import Router from 'vue-router'
import InventoryPane from '../components/InventoryPane'
import TodayPane from '../components/TodayPane'
import AppMap from '../components/TheMap'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Today',
      component: TodayPane
      // meta: { requiresAuth: true },
    },
    {
      path: '/inventory',
      name: 'Inventory',
      component: InventoryPane
      // meta: { requiresAuth: true }
    },
    {
      path: '/map',
      name: 'Map',
      component: AppMap
    }
  ]
})
