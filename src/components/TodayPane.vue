<template>
  <transition name="slide-right" mode="out-in">
    <div class="inventory">
      <AppLoader/>
      <section v-if="!isTodayEmpty" key="today-has-tasks">
        <InfoBox 
          v-if="!isLoading && isOnline && !dismissedTodayHelp" 
          ref="infob" 
          message="Here are your tasks for today. Click the tomato icon to add completed pomodori." 
          @dismissed="dismissInfo()"
        />
        <transition-group class="table-inventory" name="table-row" tag="ul">
          <TodayItem 
            v-for="(item, key) in items" 
            :itemKey="key" 
            :item="item" 
            :key="key"
          />
        </transition-group>
      </section>
      <section v-else key="today-empty-state">
        <div class="empty-state">
          <img src="../assets/img/today-empty.svg" alt="Empty calendar icon" />
          <p>You have no tasks on your list for today. Please add some by going to the Inventory tab and clicking the star next the tasks you want to tackle today.</p>
        </div>
      </section>
    </div>
  </transition>
</template>

<script>
import AppLoader from './AppLoader'
import TodayItem from './TodayPaneItem'
import InfoBox from './InfoBox'

export default {
  name: 'TodayPane',
  data() {
    return {
      showInfo: true
    }
  },
  computed: {
    isLoading() {
      return this.$store.getters.getLoadingStatus
    },
    items() {
      return this.$store.getters.dailyTasks
    },
    isTodayEmpty() {
      return !Object.keys(this.items).length && !this.isLoading
    },
    isOnline() {
      return this.$store.getters.getOnlineStatus
    },
    dismissedTodayHelp() {
      return this.$store.getters.dismissedTodayHelp
    }
  },
  components: {
    AppLoader,
    TodayItem,
    InfoBox
  },
  methods: {
    dismissInfo() {
      this.$refs.infob.$el.style.opacity = 0
      this.$refs.infob.$el.style.marginTop = `-${this.$refs.infob.$el.scrollHeight + 14}px`
      setTimeout(() => { this.$store.commit('DISMISS_TODAY_HELP') }, 200)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
h1, h2
  font-weight normal

.table-inventory
  font-size 2rem
  border none
  display table
  width 100%
  padding 0

.empty-state
  p
    display block
    width 80%
    margin 0 auto
    color rgb(115, 115, 115)
    font-weight bold
  img
    height 5rem
    margin 2rem 0 2rem
    opacity 0.5

.inventory
  position absolute
  left 0
  padding 1rem
  width 100%
  transition all .5s cubic-bezier(.55,0,.1,1)

.slide-right-leave-active
  opacity 0
  transform translate(-100px, 0)

.slide-right-enter
  opacity 0
  transform translate(-100px, 0)

.fade-leave-active
  opacity 1

.fade-leave-to
  opacity 0
  transform translateY(-60px)
  transition all 1s

@media (max-width:767px)
  .inventory
    padding 0.5rem 1rem

</style>
