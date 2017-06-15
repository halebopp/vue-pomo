import _ from 'lodash'
import moment from 'moment'

const today = moment().format('YYYY-MM-DD')

export default {
  getLoadingStatus: state => state.isLoading,
  getOnlineStatus: state => state.isOnline,
  dismissedInventoryHelp: state => state.dismissedInventoryHelp,
  dismissedTodayHelp: state => state.dismissedTodayHelp,
  currentUser: state => state.user,
  hasCurrentUser: state => !_.isEmpty(state.user),
  allTasks: state => state.tasks,
  dailyTasks: state => _.pickBy(state.tasks, task => task.assignedDate === today),
  openDailyTasks: (state, getters) => _.pickBy(getters.dailyTasks, task => task.status === 'todo'),
  numberOfTasksLeftToday: (state, getters) => _.values(getters.openDailyTasks).length,
  completedTasks: state => _.pickBy(state.tasks, task => task.status === 'done'),
  openTasks: state => _.pickBy(state.tasks, task => task.status === 'todo'),
  numberOfOpenTasks: (state, getters) => _.values(getters.openTasks).length,
  recentPomodori: state => _.reduce(_.values(state.pomodori), (obj, day) => {
    /* eslint-disable no-param-reassign */
    obj[+new Date(day.date) / 1000] = day.pomodori
    return obj
  }, {})
}
