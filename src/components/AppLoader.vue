<template lang="html">
  <div>
    <BeatLoader 
      :loading="isLoading" 
      color="#A6AB9B" 
      size="20px" 
      style="margin: 6rem auto 2rem;"
    />
    <p v-if="isLoading" class="loading-text"><strong>Loading your tasks. Please hold.</strong></p>
  </div>
</template>

<script>
import BeatLoader from 'vue-spinner/src/BeatLoader'

export default {
  name: 'AppLoader',
  computed: {
    isLoading() {
      return this.$store.getters.getLoadingStatus
    }
  },
  components: {
    BeatLoader
  }
}
</script>
