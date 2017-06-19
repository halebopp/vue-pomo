<template lang="html">
  <li class="task-row" @mouseover="showTrash = { opacity: 1 }" @mouseleave="showTrash = { opacity: 0 }">
    <span class="cell select-today"><span @click="toggleToday(itemKey, $event)" class="glyphicon glyphicon-star today-star" v-if="isOnline" :class="starIfToday(item)" aria-hidden="true"></span></span>
    <span class="cell task-cell"><span v-if="!inEditMode" @click="toggleEdit()">{{ item.title }}</span><span v-else><input
      class="form-control edit-task"
      ref="editor"
      :value="item.title"
      @keyup.enter="editTask()"
      @keyup.esc="toggleEdit()"
      @keydown="removeError()"/>
    <span v-show="hasErrors" class="text-danger pull-right inline-error">This is required</span></span></span>
    <span class="cell" style="text-align: right; white-space: nowrap;"><img src="../assets/img/tomato.svg" alt="Pomodori" class="tomate hidden-xs" v-if="item.pomodori > 0"><span class="badge" v-if="item.pomodori > 0">{{ item.pomodori }}</span></span>
    <span class="cell" style="text-align: right;"><transition name="fade"><span :style="showTrash" v-if="isOnline" @click="removeItem(itemKey)" class="glyphicon glyphicon-trash remove-task"></span></transition></span>
  </li>
</template>

<script>
import moment from 'moment'

const today = moment().format('YYYY-MM-DD')

export default {
  name: 'inventory-item',
  data() {
    return {
      inEditMode: false,
      hasErrors: false,
      showTrash: { opacity: 0 }
    }
  },
  props: ['item', 'itemKey'],
  computed: {
    isOnline() {
      return this.$store.getters.getOnlineStatus
    }
  },
  methods: {
    starIfToday(item) {
      return item.assignedDate === today ? 'glyphicon-star star-gold' : 'glyphicon-star-empty'
    },
    removeItem(key) {
      this.$store.dispatch('removeTask', key)
    },
    toggleToday(key, e) {
      e.target.classList.toggle('glyphicon-star-empty')
      e.target.classList.toggle('glyphicon-star')
      this.$store.dispatch('toggleDoToday', { taskKey: key, isToday: this.item.assignedDate === today })
    },
    toggleEdit() {
      this.inEditMode = !this.inEditMode
      if (this.inEditMode) { this.$nextTick(() => this.$refs.editor.focus()) }
    },
    editTask() {
      if (this.$refs.editor.value.trim().length === 0) {
        this.hasErrors = true
        this.item.title = ''
      } else {
        this.inEditMode = false
        this.$store.dispatch('editTask', { taskKey: this.itemKey, title: this.$refs.editor.value.trim() })
      }
    },
    removeError() {
      if (this.$refs.editor.value.trim().length > 0) { this.hasErrors = false }
    },
  }
}
</script>

<style lang="stylus">

.task-row
  display table-row
  overflow hidden

.cell
  vertical-align middle
  display table-cell
  border-bottom 1px solid rgb(225, 225, 225)
  padding 1rem 0.8rem

.task-cell
  text-align left
  width 70%
  position relative

.select-today
  width 10%

.today-star
  font-size 2rem
  color rgb(225, 225, 225)
  cursor pointer
  &:hover
    color tomato

.star-gold
  color tomato

.remove-task
  color rgb(180, 180, 180)
  cursor pointer
  font-size 1.6rem
  transition all .8s

.tomate
  width 2rem

.edit-task
  border none
  box-shadow none
  background transparent
  border-radius 0
  border-bottom 1px solid #cacaca
  font-size 2rem
  padding 0
  &:focus
    border-bottom 1px solid tomato
    box-shadow 0 2px 2px -2px tomato
    outline none

.inline-error
  font-size 1.3rem
  position absolute
  top 20px
  right 10px

@media (max-width:767px)
  .remove-task
    // We want to overrule hover reveal for small (likely touch) screens
    opacity 1 !important
    font-size 1.5rem
  .edit-task
    font-size 1.6rem
    height 2.5rem

@media (hover:hover)
  .remove-task
    &:hover
      color tomato

</style>
