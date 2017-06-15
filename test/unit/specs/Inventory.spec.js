import Vue from 'vue'
import moment from 'moment'

import Inventory from '@/components/Inventory'
import store, { initialState } from '../mockstore'

const today = moment().format('YYYY-MM-DD')
const testItem = { title: 'Make a movie', status: 'todo', pomodori: 0 }

/* eslint-disable no-unused-expressions, no-console */
describe('Inventory.vue', () => {
  let vm

  before((done) => {
    const Constructor = Vue.extend(Inventory)
    vm = new Constructor({ store }).$mount()
    done()
  })

  afterEach((done) => {
    Object.assign(vm.$store.state, initialState)
    done()
  })

  it('should display loading indicator if the content is loading', (done) => {
    vm.$store.state.isLoading = true
    Vue.nextTick()
      .then(() => {
        expect(vm.$el.querySelector('.loading-text')).to.be.ok
        done()
      })
      .catch(done)
  })

  it('should display empty state if no tasks', (done) => {
    vm.$store.state.tasks = {}
    vm.$store.state.isLoading = false

    Vue.nextTick()
      .then(() => {
        expect(vm.$el.querySelector('.empty-state')).to.be.ok
        done()
      })
      .catch(done)
  })

  it('should not display empty state if there are tasks', (done) => {
    vm.$store.state.tasks = { dewde: testItem }
    vm.$store.state.isLoading = false

    Vue.nextTick()
      .then(() => {
        expect(vm.$el.querySelector('.empty-state')).not.to.be.ok
        done()
      })
      .catch(done)
  })

  it('should display proper number of tasks', (done) => {
    vm.$store.state.tasks = { dewde: testItem }
    vm.$store.state.isLoading = false

    Vue.nextTick()
      .then(() => {
        expect(vm.$el.querySelectorAll('ul.table-inventory li').length).to.equal(1)
        done()
      })
      .catch(done)
  })

  it('should remove task once assigned to today', (done) => {
    vm.$store.state.tasks = { dewde: testItem }
    vm.$store.state.isLoading = false

    Vue.nextTick()
      .then(() => {
        expect(vm.$el.querySelectorAll('ul.table-inventory li').length).to.equal(1)
        done()
      })
      .catch(done)

    vm.$store.state.tasks.dewde.assignedDate = today

    Vue.nextTick()
      .then(() => {
        expect(vm.$el.querySelectorAll('ul.table-inventory li').length).to.equal(0)
        done()
      })
      .catch(done)
  })

  it('should not accept submission of an empty new task', (done) => {
    vm.newItem = ''
    vm.addTask()
    Vue.nextTick()
      .then(() => {
        expect(vm.hasErrors).to.be.true
        done()
      })
      .catch(done)
  })
})
