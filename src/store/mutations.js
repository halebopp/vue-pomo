import Vue from 'vue'
import moment from 'moment'

const today = moment().format('YYYY-MM-DD')

/* eslint-disable no-param-reassign, no-undef, no-console, no-unused-vars */
export default {
  SET_USER(state, result) {
    state.user = result
  },
  UNSET_USER(state) {
    state.user = {}
    // Resetting state for proper local storage sync.
    state.tasks = {}
    state.pomodori = {}
    state.isLoading = true
  },
  SET_TASKS(state, tasks) {
    state.isLoading = false
    state.tasks = tasks || {}
  },
  SET_POMS(state, poms) {
    state.pomodori = poms || {}
  },
  CLEAR_TASKS(state) {
    state.tasks = {}
  },
  ASSIGN_TODAY(state, { key, date }) {
    // Vue.set(state.tasks[key], 'assignedDate', date) [use this for non-preexisting properties]
    state.tasks[key].assignedDate = date
  },
  UPDATE_STATUS(state, { key, status, date }) {
    // Vue.set(state.tasks[key], 'status', status) [use this for non-preexisting properties]
    state.tasks[key].status = status
    state.tasks[key].completedDate = date
  },
  UPDATE_POMODORI(state, { key, pomodori }) {
    state.tasks[key].pomodori = pomodori
  },
  UPDATE_POMS(state, { key, pomodori }) {
    if (state.pomodori[key]) {
      state.pomodori[key].pomodori = pomodori
    } else {
      Vue.set(state.pomodori, key, { date: today, pomodori })
    }
  },
  ADD_TASK(state, { newItem, key }) {
    Vue.set(state.tasks, key, {
      title: newItem,
      status: 'todo',
      pomodori: 0,
      assignedDate: 0,
      completedDate: 0
    })
  },
  UPDATE_TASK(state, { key, title }) {
    state.tasks[key].title = title
  },
  REMOVE_TASK(state, key) {
    Vue.delete(state.tasks, key)
  },
  TOAST(state, message) {
    state.isLoading = false
    // console.log(message) // TODO: log properly (in logger).
  },
  SET_ONLINE_STATUS(state, status) {
    // console.log('Online status provided in mutation:', status)
    state.isOnline = status
  },
  DISMISS_INVENTORY_HELP(state) {
    state.dismissedInventoryHelp = true
  },
  DISMISS_TODAY_HELP(state) {
    state.dismissedTodayHelp = true
  }
}
