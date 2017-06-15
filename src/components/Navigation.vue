<template lang="html">
  <div class="row" style="margin-top:2rem;">
    <div class="col-xs-12">
      <ul class="nav nav-pills" role="tablist">
        <router-link to="/" exact activeClass="active" tag="li" role="tab"><a><h3>Today<span class="badge">{{ numberOfTasksLeftToday }}</span></h3></a></router-link>
        <li class="divider"></li>
        <router-link to="/inventory" activeClass="active" tag="li" role="tab"><a><h3>Inventory</h3></a></router-link>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    numberOfTasksLeftToday() {
      return this.$store.getters.numberOfTasksLeftToday
    }
  }
}
</script>

<style lang="stylus">
.nav-pills
  display flex
  justify-content center

li
  &.divider
    min-width 5rem

.nav
  & > li
    & > a
      color gray !important
      background-color transparent !important
      &:hover
        color black !important
    &.active
      & > a
        color black !important
        border-bottom solid 3px tomato
        border-radius 0
        height 6.5rem
        &:hover
          color black !important

.badge
  margin-left 1rem

@media (max-width:767px)
  li
    h3
      font-size 2.1rem
    &.divider
        min-width 2.3rem
  .nav
    & > li.active
      & > a
        height 6.2rem
</style>
