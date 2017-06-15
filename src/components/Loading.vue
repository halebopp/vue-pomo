<template lang="html">
  <div>
    <beat-loader :loading="isLoading" color="#A6AB9B" size="20px" style="margin: 6rem auto 2rem;"></beat-loader>
    <p v-if="isLoading" class="loading-text"><strong>Loading your tasks. Please hold.</strong></p>
  </div>
</template>

<script>
import BeatLoader from 'vue-spinner/src/BeatLoader'

export default {
  name: 'loader',
  computed: {
    isLoading() {
      return this.$store.getters.getLoadingStatus
    }
  },
  components: {
    beatLoader: BeatLoader
  }
}
</script>

<style lang="css">
</style>
