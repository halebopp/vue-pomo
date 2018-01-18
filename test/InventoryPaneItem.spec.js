import { shallow, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { state, getters } from '@/store'
import moment from 'moment'
import InventoryPaneItem from '@/components/InventoryPaneItem'

const today = moment().format('YYYY-MM-DD')
const testItem = { title: 'Make a movie', status: 'todo', pomodori: 0 }

const localVue = createLocalVue()
localVue.use(Vuex)

describe('InventoryPaneItem.vue', () => {
  let wrapper
  let actions
  let store

  beforeEach(() => {
    actions = {
      removeTask: jest.fn(),
      toggleDoToday: jest.fn()
    }
    store = new Vuex.Store({
      state,
      getters,
      actions
    })
    testItem.status = 'todo'
    testItem.assignedDate = 0
    wrapper = shallow(InventoryPaneItem, {
      propsData: { item: testItem, itemKey: 'foo' },
      store,
      localVue
    })
    wrapper.vm.inEditMode = false
  })

  it('renders a vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('shows an empty star next to a task with no assigned date', () => {
    expect(wrapper.contains('.glyphicon-star-empty')).toBe(true)
  })

  it('shows a full star next to a task with an assigned date of today', () => {
    testItem.assignedDate = today
    wrapper.update()
    expect(wrapper.contains('.glyphicon-star-empty')).toBe(false)
  })

  it('shows an empty star next to a task with an assigned date other than today', () => {
    testItem.assignedDate = '2016-01-01'
    wrapper.update()
    expect(wrapper.contains('.glyphicon-star-empty')).toBe(true)
  })

  it('switches to editing mode once the user clicks on the name of the task', () => {
    const taskName = wrapper.find('span.task-cell span')
    taskName.trigger('click')
    wrapper.update()
    expect(wrapper.contains('input.edit-task')).toBe(true)
    expect(wrapper.vm.inEditMode).toBe(true)
  })

  it('calls store action "removeTask" with the correct itemKey when user clicks on the trash button', () => {
    const trashButton = wrapper.find('.glyphicon-trash')
    trashButton.trigger('click')
    expect(actions.removeTask).toHaveBeenCalledWith(
      expect.any(Object),
      'foo',
      undefined
    )
  })

  it('calls store action "toggleDoToday" when user clicks on the today star', () => {
    const todayButton = wrapper.find('.today-star')
    todayButton.trigger('click')
    expect(actions.toggleDoToday).toHaveBeenCalledWith(
      expect.any(Object),
      { isToday: false, taskKey: 'foo' },
      undefined
    )
  })
})
