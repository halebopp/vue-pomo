<template lang="html">
  <li class="task-row">
    <span class="cell is-done"><span v-if="isOnline" @click="toggleDone(itemKey, $event)" class="glyphicon done-sign" :class="checkIfDone(item)" aria-hidden="true"></span></span>
    <span class="cell task-cell"><span :class="checkShouldStrikeOut(item)">{{ item.title }}</span></span>
    <span style="text-align: right; white-space:nowrap;" class="cell pomodori">
      <span class="hidden-xs" :class="checkShouldStrikeOut(item)">
          <span v-for="n in Math.min(item.pomodori, 3)" :key="n">
            <img src="../assets/img/tomato.svg" class="tomate" alt=""/>
          </span><span v-if="item.pomodori > 3" class="badge" key="thebadge">+{{item.pomodori-3}}</span>

      </span>
      <span class="visible-xs" :class="checkShouldStrikeOut(item)" v-if="item.pomodori>0">
        <span class="badge">{{item.pomodori}}</span>
      </span>
    </span>
    <span style="text-align: right;" class="cell"><img v-if="item.status!=='done' && isOnline" @click="addPomodoro(itemKey)" src="../assets/img/tomatoadd3.png" class="pomodoro-icon"/></span>
  </li>
</template>

<script>
export default {
  name: 'today-item',
  props: ['item', 'itemKey'],
  computed: {
    isOnline() {
      return this.$store.getters.getOnlineStatus
    }
  },
  methods: {
    checkIfDone(item) {
      return item.status === 'done' ? 'glyphicon glyphicon-check' : 'glyphicon-unchecked'
    },
    checkShouldStrikeOut(item) {
      return item.status === 'done' ? 'strikeout' : ''
    },
    addPomodoro(key) {
      this.$store.dispatch('addPomodoro', key)
    },
    toggleDone(key, e) {
      e.target.classList.toggle('glyphicon-check')
      e.target.classList.toggle('small-icon')
      e.target.classList.toggle('glyphicon-unchecked')
      this.$store.dispatch('toggleDone', { taskKey: key, isDone: this.item.status === 'done' })
    }
  }
}
</script>

<style lang="stylus">

.cell
  vertical-align middle
  display table-cell
  border-bottom 1px solid rgb(225, 225, 225)
  padding 1rem 0.8rem
  height 5.5rem !important
  &.is-done
    width 10%
  &.task-cell
    text-align left

.task-row
  display table-row

.done-sign
  font-size 2.3rem
  color rgb(171, 171, 171)
  cursor pointer
  vertical-align middle
  padding-bottom 0.4rem
  &:active
    transform scale(1.2)

.small-icon
  font-size 1.8rem

.strikeout
  text-decoration line-through
  opacity 0.4
  filter grayscale(1)

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

.pomodoro-icon
  width 2.5rem
  opacity 0.3
  cursor pointer

.tomate
  width 2rem
  margin-right 1rem

@media (hover:hover)
  .done-sign
    &:hover
      color rgb(107, 107, 107)

  .pomodoro-icon
    &:hover
      opacity 1

@media (max-width:767px)
  .pomodoro-icon, .pomodoro-icon:hover
    opacity 0.9
    width 2.3rem

  .pomodoro-icon:active
    opacity 1

  .cell
    font-size 1.6rem
    height 3.5rem !important

  .done-sign
    font-size 2.1rem

</style>
