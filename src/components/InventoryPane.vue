<template>
  <transition name="slide-left" mode="out-in">
    <div class="inventory">
      <AppLoader/>
      <section v-if="!isInventoryEmpty" key="inventory-has-tasks">
        <transition name="fade">
          <InfoBox 
            v-if="!isLoading && isOnline && !dismissedInventoryHelp" 
            ref="infob" 
            message="Here are your outstanding tasks. Star those you want to tackle today." 
            @dismissed="dismissInfo()"
          />
        </transition>
        <!-- <transition name="fade">
          <info-box v-if="!isLoading && !isOnline" message="Connect to the internet for more functionality." @dismissed="dismissInfo()"></info-box>
        </transition> -->
        <transition-group class="table-inventory" name="table-row" tag="ul">
          <InventoryItem 
            v-for="(item, key) in items" 
            :itemKey="key" 
            :item="item" 
            :key="key"
          />
        </transition-group>
      </section>
      <section v-else key="inventory-empty-state">
        <div class="empty-state">
          <img src="../assets/img/inventory-empty.svg" alt="Empty clipboard icon" />
          <p>You don't have any tasks yet. Use the field below to create some.</p>
        </div>
      </section>
      <div class="row" style="padding:0;margin:0;" v-if="!isLoading && isOnline">
        <div class="col-xs-12 col-sm-10 col-sm-offset-1" style="margin-bottom: 5rem;">
          <input
            class="form-control add-task"
            name="title"
            ref="addnew"
            v-model.trim="newItem"
            placeholder="Add a new task (& hit enter)"
            @keyup.enter="addTask()"
            @keyup.esc="$refs.addnew.blur()"
            @keydown="removeError()"
            @blur="hideError()"/>
          <span v-show="hasErrors" class="text-danger pull-right">This field is required</span>
        </div>
      </div>
      <button class="fab" v-if="isOnline" ref="fab" @click="newTask()">+</button>
    </div>
  </transition>
</template>

<script>
import AppLoader from './AppLoader'
import InventoryItem from './InventoryPaneItem'
import InfoBox from './InfoBox'

export default {
  name: 'InventoryPane',
  data() {
    return {
      newItem: '',
      hasErrors: false
    }
  },
  computed: {
    items() {
      return this.$store.getters.openTasks
    },
    isLoading() {
      return this.$store.getters.getLoadingStatus
    },
    isInventoryEmpty() {
      return !this.$store.getters.numberOfOpenTasks && !this.isLoading
    },
    isOnline() {
      return this.$store.getters.getOnlineStatus
    },
    dismissedInventoryHelp() {
      return this.$store.getters.dismissedInventoryHelp
    }
  },
  components: {
    AppLoader,
    InventoryItem,
    InfoBox
  },
  methods: {
    addTask() {
      if (this.newItem.trim().length === 0) {
        this.hasErrors = true
      } else {
        this.$store.dispatch('addTask', this.newItem)
        this.newItem = ''
        this.hasErrors = false
      }
    },
    newTask() {
      this.$nextTick(() => this.$refs.addnew.focus())
    },
    removeError() {
      if (this.newItem.length > 0) { this.hasErrors = false }
    },
    hideError() {
      this.hasErrors = false
    },
    /* eslint-disable no-console */
    dismissInfo() {
      this.$refs.infob.$el.style.opacity = 0
      this.$refs.infob.$el.style.marginTop = `-${this.$refs.infob.$el.scrollHeight + 14}px`
      setTimeout(() => { this.$store.commit('DISMISS_INVENTORY_HELP') }, 200)
    }
  },
  mounted() {
    // To avoid FAB jitter on transition (due to issue with position:fixed)
    setTimeout(() => { this.$refs.fab.style.opacity = 1 }, 800)
    window.addEventListener('online', () => {
      setTimeout(() => { this.$refs.fab.style.opacity = 1 }, 800)
    })
  },
  // To avoid FAB jitter on transition (due to issue with position:fixed)
  beforeRouteLeave(to, from, next) {
    if (this.isOnline) {
      this.$refs.fab.style.transition = 'none'
      this.$refs.fab.style.opacity = 0
    }
    next()
  }
}

</script>

<style lang="stylus" scoped>
h1, h2
  font-weight normal

.table-inventory
  font-size 2rem
  border none
  margin-bottom 4rem
  display table
  width 100%
  padding 0

.add-task
  border none
  box-shadow none
  background transparent
  border-radius 0
  border-bottom 1px solid #cacaca
  font-size 2rem
  height 3.5rem !important
  &:focus
    border-bottom 1px solid tomato
    box-shadow 0 2px 2px -2px tomato
    outline none

.empty-state
  p
    display block
    width 80%
    margin 0 auto 5rem
    color rgb(115, 115, 115)
    font-weight bold
  img
    height 5rem
    margin 3.5rem 0 2rem
    opacity 0.4

.inventory
  position absolute
  left 0
  width 100%
  transition all .5s cubic-bezier(.55,0,.1,1)
  padding 1rem

.slide-left-enter
  opacity 0
  transform translate(100px, 0)

.slide-left-leave-active
  opacity 0
  transform translate(100px, 0)

.table-row
  display inline-block
  transition all 1s
  overflow hidden
  position absolute

.table-row-move
  transition all .6s

.content-move
  transition all .6s

.table-row-leave-active
  position absolute
  width 100%
  left 30px

.table-row-leave-to
  opacity 0
  transform translateX(60px)
  transition all .3s

.table-row-enter
  opacity 0
  transform translateY(-20px)

.table-row-enter-to
  opacity 1
  transition all .5s

.fab
  opacity 0
  border none
  transition all .5s
  position fixed
  bottom 2rem
  right 2rem
  display inline-block
  box-sizing border-box
  background-clip padding-box
  padding 0
  margin 0
  background transparent
  user-select none
  width 56px
  height 56px
  vertical-align middle
  text-align center
  border-radius 50%
  overflow hidden
  margin-bottom 10px
  font-family 'Avenir', Helvetica, Arial, sans-serif
  font-size 2em
  color white
  background-color #ff3600
  outline none
  box-shadow 0 4px 7px rgba(0,0,0,0.15), 0 3px 6px rgba(0,0,0,0.23)
  transform translateZ(0)
  &:hover
    background-color #f94313
    color rgb(242, 242, 242)
    box-shadow 0 6px 12px rgba(0,0,0,0.17), 0 5px 10px rgba(0,0,0,0.23)

.fab:active, .fab:focus
  background-color #e83606
  box-shadow 0 1px 2px rgba(0,0,0,0.17), 0 1px 2px rgba(0,0,0,0.23)

.fade-enter-active, .fade-leave-active
  transition opacity .3s

.fade-enter, .fade-leave-to
  opacity 0

@media (min-width:1400px)
  .fab
    right 3rem
    bottom 3rem

@media (max-width:767px)
  input
    font-size 1.6rem !important
  .inventory
    padding 0.5rem 1rem

</style>
