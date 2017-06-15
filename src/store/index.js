import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  isLoading: true,
  isOnline: true,
  dismissedInventoryHelp: false,
  dismissedTodayHelp: false,
  user: {},
  tasks: {},
  pomodori: {}
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  plugins: [createPersistedState()]
})

export { state, getters, mutations, actions }
