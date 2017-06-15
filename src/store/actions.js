import _ from 'lodash'
import moment from 'moment'
import fbApp from '../modules/firebase'

const db = fbApp.database()

const today = moment().format('YYYY-MM-DD') // Is this OK?
const ninetyDaysAgo = moment().subtract(90, 'd').format('YYYY-MM-DD')

export default {
  fetchTasks: ({ commit, state }) => {
    db.ref(`tasks/${state.user.uid}`).once('value')
      .then(snapshot => commit('SET_TASKS', snapshot.val()), () => commit('TOAST', 'Failed to retrieve tasks'))
  },
  fetchPomodori: ({ commit, state }) => {
    db.ref(`dailypoms/${state.user.uid}`).orderByChild('date').startAt(ninetyDaysAgo).once('value')
      .then(snapshot => commit('SET_POMS', snapshot.val()), () => commit('TOAST', 'Failed to retrieve pomodori archive'))
  },
  toggleDoToday: ({ commit, state }, { taskKey, isToday }) => {
    const theDate = isToday ? 0 : today
    db.ref(`tasks/${state.user.uid}`).child(taskKey).update({ assignedDate: theDate })
      .then(commit('ASSIGN_TODAY', { key: taskKey, date: theDate }), () => commit('TOAST', 'Failed to sync the change'))
  },
  toggleDone: ({ commit, state }, { taskKey, isDone }) => {
    const newStatus = isDone ? 'todo' : 'done'
    const completedDate = isDone ? 0 : today
    db.ref(`tasks/${state.user.uid}`).child(taskKey).update({ status: newStatus, completedDate })
      .then(commit('UPDATE_STATUS', { key: taskKey, status: newStatus, date: completedDate }), () => commit('TOAST', 'Failed to sync the change'))
  },
  addPomodoro: ({ commit, state, getters }, taskKey) => {
    const newPomodori = state.tasks[taskKey].pomodori + 1 || 1
    const dailyPomodori = getters.recentPomodori[+new Date(today) / 1000] || 0
    db.ref(`tasks/${state.user.uid}`).child(taskKey).update({ pomodori: newPomodori })
      .then(() => {
        commit('UPDATE_POMODORI', { key: taskKey, pomodori: newPomodori })
        /* eslint-disable max-len */
        const theKey = (dailyPomodori === 0) ? Math.random().toString(36).slice(2) : _.findKey(state.pomodori, { date: today })
        commit('UPDATE_POMS', { key: theKey, pomodori: dailyPomodori + 1 })
      }, () => commit('TOAST', 'Failed to sync the change'))
  },
  addTask: ({ commit, state }, newItem) => {
    const newRef = db.ref(`tasks/${state.user.uid}`).push({
      title: newItem,
      status: 'todo',
      pomodori: 0,
      assignedDate: 0,
      completedDate: 0,
    })
    newRef.then(commit('ADD_TASK', { newItem, key: newRef.key }), () => commit('TOAST', 'Failed to add task'))
  },
  editTask: ({ commit, state }, { taskKey, title }) => {
    db.ref(`tasks/${state.user.uid}`).child(taskKey).update({ title })
      .then(commit('UPDATE_TASK', { key: taskKey, title }), () => commit('TOAST', 'Failed to sync the change'))
  },
  removeTask: ({ commit, state }, taskKey) => {
    db.ref(`tasks/${state.user.uid}`).child(taskKey).remove()
      .then(commit('REMOVE_TASK', taskKey), () => commit('TOAST', 'Failed to remove task'))
  },
  signOut: ({ commit }) => {
    fbApp.auth().signOut()
      .then(commit('UNSET_USER'), () => commit('TOAST', 'Failed to sign out'))
  }
}
