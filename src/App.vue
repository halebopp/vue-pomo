<template>
  <div id="app" class="container">
    <AppHeader 
      v-if="hasCurrentUser" 
      @showMap="showMap=true" 
    />
    <OfflineNotice v-if="!isOnline && hasCurrentUser"/>
    <AppNavigation v-if="hasCurrentUser"/>
    <div class="row">
      <transition v-if="showMap" name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">
              <div class="modal-header">
                <h3>Your activity over time</h3>
                <p>This chart maps the number of pomodori completed daily, over the last 3 months. <span class="hidden-xs">Hover over a day to see the exact number of pomodori completed.</span></p>
              </div>
              <div class="modal-body">
                <AppMap/>
              </div>
              <div class="modal-footer">
                <button class="modal-default-button" @click="showMap=false">
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <div class="col-xs-12">
        <AppSignin 
          v-if="!hasCurrentUser" 
          @signInWithGoogle="signInWithGoogle" 
          @signInWithFacebook="signInWithFacebook" 
        />
        <router-view v-if="hasCurrentUser"/>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import Fastclick from 'fastclick'
import AppHeader from './components/TheHeader'
import AppNavigation from './components/TheNavigation'
import AppSignin from './components/Signin'
import AppMap from './components/TheMap'
import OfflineNotice from './components/OfflineNotice'
import fbApp from './modules/firebase'


export default {
  name: 'App',
  /* eslint-disable */
  beforeCreate() {
    window.addEventListener('offline', () => {
      this.$store.commit('SET_ONLINE_STATUS', false)
    })
    window.addEventListener('online', () => {
      this.$store.commit('SET_ONLINE_STATUS', true)
    })
    const store = this.$store
    const state = store.state
    const toast = this.$toast
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'TOAST') {
        toast(mutation.payload, { className: ['toast-error'] })
      }
    })

    const user = fbApp.auth().currentUser
    if(user) {
      this.$store.commit('SET_USER', user)
      this.$store.dispatch('fetchTasks')
      this.$store.dispatch('fetchPomodori')
    }
  },
  data() {
    return {
      isLoading: true,
      showMap: false,
      user: null
    }
  },
  computed: {
    hasCurrentUser() {
      return this.$store.getters.hasCurrentUser
    },
    isOnline() {
      return this.$store.getters.getOnlineStatus
    }
  },
  components: {
    AppNavigation,
    AppHeader,
    AppSignin,
    AppMap,
    OfflineNotice
  },
  methods: {
    signInWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider()
      fbApp.auth().signInWithRedirect(provider)
    },
    signInWithFacebook() {
      const provider = new firebase.auth.FacebookAuthProvider()
      fbApp.auth().signInWithRedirect(provider)
    }
  },
  mounted() {
    Fastclick.attach(document.body)
    this.$store.commit('SET_ONLINE_STATUS', navigator.onLine)
  }
}
</script>

<style lang="stylus">
#app
    font-family -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    text-align center
    color #2c3e50
    margin-top 60px

.toast-error
    border-radius 0
    background-color rgb(215, 0, 0)
    margin 1rem

.modal-mask
    position fixed
    z-index 9998
    top 0
    left 0
    width 100%
    height 100%
    background-color rgba(0, 0, 0, .5)
    display table
    transition opacity .3s ease

.modal-wrapper
    display table-cell
    vertical-align middle

.modal-container
    width 50%
    margin 0px auto
    padding 20px 30px
    background-color #fff
    border-radius 2px
    box-shadow 0 2px 8px rgba(0, 0, 0, .33)
    transition all .3s ease
    font-family Helvetica, Arial, sans-serif

@media (max-width:767px)
    .modal-container
        width 80%

@media (max-width:450px)
    .modal-container
        width 100%
        padding 10px

@media (min-width:1200px)
    .modal-container
        width 40%

.modal-header
    border 0
    h3
      margin-top 0
      color tomato

.modal-body
    margin 5px 0

.modal-footer
    border 0
    text-align center
    margin auto

.modal-enter
    opacity 0

.modal-leave-active
    opacity 0

.modal-default-button
    background none
    border none
    outline none
    user-select none
    color tomato
    font-size 1.5rem
    letter-spacing .01rem
    &:hover
      color red

.modal-enter .modal-container,
.modal-leave-active .modal-container
    -webkit-transform scale(1.1)
    transform scale(1.1)
</style>
