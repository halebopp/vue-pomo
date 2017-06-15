import Vue from 'vue'
import Router from 'vue-router'
import Inventory from '../components/Inventory'
import Today from '../components/Today'
import heatMap from '../components/Map'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Today',
      component: Today
      // meta: { requiresAuth: true },
    },
    {
      path: '/inventory',
      name: 'Inventory',
      component: Inventory
      // meta: { requiresAuth: true }
    },
    {
      path: '/map',
      name: 'HeatMap',
      component: heatMap
    }
  ]
})
