import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import moment from 'moment'
import { state, getters } from '@/store'
import TodayPane from '@/components/TodayPane'

const today = moment().format('YYYY-MM-DD')
const testItem = { title: 'Make a movie', status: 'todo', pomodori: 0 }

const localVue = createLocalVue()
localVue.use(Vuex)

/* eslint-disable no-unused-expressions, no-console, no-undef */
describe('TodayPane.vue', () => {
  let store
  let wrapper

  beforeEach(() => {
    store = new Vuex.Store({
      state,
      getters
    })
    wrapper = mount(TodayPane, { store, localVue })
    store.state.tasks = {}
    store.state.isLoading = false
  })

  it('renders a vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('displays loading indicator if the content is loading', () => {
    store.state.isLoading = true
    wrapper.update()
    expect(wrapper.contains('.loading-text')).toBe(true)
  })

  it('does not display loading indicator if the content is not loading', () => {
    expect(wrapper.contains('.loading-text')).toBe(false)
  })

  it('displays empty state if no tasks assigned for today', () => {
    testItem.assignedDate = '2016-01-01'
    store.state.tasks = { foo: testItem }
    wrapper.update()
    expect(wrapper.contains('.empty-state')).toBe(true)
  })

  it('does not display empty state if there are tasks assigned for today', () => {
    testItem.assignedDate = today
    store.state.tasks = { foo: testItem }
    wrapper.update()
    expect(wrapper.contains('.empty-state')).toBe(false)
  })

  it('displays proper number of tasks', () => {
    testItem.assignedDate = today
    store.state.tasks = { foo: testItem }
    wrapper.update()
    expect(wrapper.findAll('span.table-inventory li')).toHaveLength(1)
  })
})
