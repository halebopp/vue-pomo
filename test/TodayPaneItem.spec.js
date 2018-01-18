import { shallow, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { state, getters } from '@/store'
import TodayPaneItem from '@/components/TodayPaneItem'

const testItem = { title: 'Make a movie', status: 'todo', pomodori: 0 }

const localVue = createLocalVue()
localVue.use(Vuex)

describe('TodayPaneItem.vue', () => {
  let wrapper
  let actions
  let store

  beforeEach(() => {
    actions = {
      addPomodoro: jest.fn(),
      toggleDone: jest.fn()
    }
    store = new Vuex.Store({
      state,
      getters,
      actions
    })
    testItem.status = 'todo'
    wrapper = shallow(TodayPaneItem, {
      propsData: { item: testItem, itemKey: 'foo' },
      store,
      localVue
    })
  })

  it('renders a vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('displays done items crossed over and greyed out', () => {
    testItem.status = 'done'
    wrapper.update()
    expect(wrapper.contains('.strikeout')).toBe(true)
    expect(wrapper.contains('.glyphicon-check')).toBe(true)
  })

  it('calls store action "addPomodoro" with the correct itemKey when user clicks on the tomato button', () => {
    const tomatoButton = wrapper.find('.pomodoro-icon')
    tomatoButton.trigger('click')
    expect(actions.addPomodoro).toHaveBeenCalledWith(
      expect.any(Object),
      'foo',
      undefined
    )
  })

  it('calls store action "toggleDone" when user clicks on the done checkbox', () => {
    const doneButton = wrapper.find('.done-sign')
    doneButton.trigger('click')
    expect(actions.toggleDone).toHaveBeenCalledWith(
      expect.any(Object),
      { taskKey: 'foo', isDone: false },
      undefined
    )
  })
})
