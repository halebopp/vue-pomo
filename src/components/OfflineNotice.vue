<template lang="html">
    <div class="status-indicator pulse">No internet connection.</div>
</template>

<script>
export default {
}
</script>

<style lang="stylus" scoped>
.status-indicator
  background-color darken(tomato, 10%)
  color white
  height 2.5rem
  position absolute
  top 65px
  left 0
  padding 0.3rem
  margin 0
  width 100%

.pulse {
  animation pulse 2.5s infinite ease-in
}

@keyframes pulse
  0%
    opacity 1
  20%
    opacity 0.95
  30%
    opacity 0.9
  50%
    opacity 0.85
  70%
    opacity 0.9
  80%
    opacity 0.95
  100%
    opacity 1

</style>
