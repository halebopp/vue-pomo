<template lang="html">
  <nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container-fluid">
      <div class="navbar-header">
        <router-link to="/" class="navbar-brand">
          <img src="../assets/img/tomato.svg" alt="Pomodoro" style="height:3.4rem;display:inline;vertical-align:top;"/>
          <img class="hidden-xs" src="../assets/img/pomodoro-logo.png" alt="Pomodoro Logo" style="height:4.2rem;display:inline;margin-left:0.8rem;"/>
        </router-link>
        <ul v-if="hasCurrentUser" class="pull-right visible-xs" style="padding-right:1.5rem; padding-top:1.4rem;">
          <span class="greeting">{{ currentUser.displayName.split(' ')[0] }}</span>
          <img :src="currentUser.providerData[0].photoURL" :alt="currentUser.displayName" class="img-circle circle-thumb"/>
          <span class="glyphicon glyphicon-log-out icon-button" @click="signOut"></span>
        </ul>
      </div>
      <div class="collapse navbar-collapse" id="account-manage" v-if="hasCurrentUser">
        <ul class="nav navbar-nav navbar-right" style="padding-right:3rem; padding-top:1.4rem;">
          <span>{{ currentUser.displayName.split(' ')[0] }}</span>
          <img :src="currentUser.providerData[0].photoURL" :alt="currentUser.displayName" class="img-circle circle-thumb"/>
          <span class="glyphicon glyphicon-calendar icon-button" @click="showMap"></span>
          <span class="glyphicon glyphicon-log-out icon-button" @click="signOut"></span>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'TheHeader',
  computed: {
    currentUser() {
      return this.$store.getters.currentUser
    },
    hasCurrentUser() {
      return this.$store.getters.hasCurrentUser
    }
  },
  methods: {
    signOut() {
      this.$store.dispatch('signOut')
    },
    signIn() {
      this.$store.dispatch('signInWithGoogle')
    },
    showMap() {
      this.$emit('showMap')
    }
  }
}
</script>


<style lang="stylus" scoped>
.navbar-inverse
  color white
  min-height 65px

.navbar
  margin-bottom 10px

.greeting
  max-width 110px
  overflow hidden
  text-overflow ellipsis
  display inline-block
  vertical-align middle
  white-space nowrap

.circle-thumb
  width 4rem
  height 4rem
  margin-left 1rem
  object-fit cover

.icon-button
  margin-left 1.3rem
  cursor pointer
  &:hover
    color rgb(193, 193, 193)
</style>
