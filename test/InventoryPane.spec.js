import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { state, getters } from '@/store'
import InventoryPane from '@/components/InventoryPane'

const testItem = { title: 'Make a movie', status: 'todo', pomodori: 0 }

const localVue = createLocalVue()
localVue.use(Vuex)

/* eslint-disable no-unused-expressions, no-console, no-undef */
describe('InventoryPane.vue', () => {
  let store
  let actions
  let wrapper

  beforeEach(() => {
    actions = {
      addTask: jest.fn()
    }
    store = new Vuex.Store({
      state,
      getters,
      actions
    })
    wrapper = mount(InventoryPane, { store, localVue })
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

  it('displays empty state if no tasks', () => {
    expect(wrapper.contains('.empty-state')).toBe(true)
  })

  it('does not display empty state if there are tasks', () => {
    store.state.tasks = { foo: testItem }
    wrapper.update()
    expect(wrapper.contains('.empty-state')).toBe(false)
  })

  it('displays proper number of tasks', () => {
    store.state.tasks = { foo: testItem }
    wrapper.update()
    expect(wrapper.findAll('span.table-inventory li')).toHaveLength(1)
  })

  it('triggers error upon submission of an empty new task and does not call the store action "addTask"', () => {
    wrapper.vm.newItem = ''
    wrapper.vm.addTask()
    expect(wrapper.vm.hasErrors).toBe(true)
    expect(actions.addTask).not.toHaveBeenCalled()
  })

  it('calls store action "addTask" when a non-empty new task is submitted', () => {
    wrapper.vm.newItem = 'Take out the garbage'
    wrapper.vm.addTask()
    expect(actions.addTask).toHaveBeenCalled()
  })
})
