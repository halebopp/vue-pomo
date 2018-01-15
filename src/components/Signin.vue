<template lang="html">
  <div class="signup-wrapper">
    <div class="container text-center" id="signInPrompt">
      <p class="text-center"><img src="../assets/img/tomato.svg" alt="Pomodoro" class="signup-logo"></p>
      <p id="sign-in-prompt">With Pomo d'Oro, you can track your daily productivity and enforce good work habits, by effectively using the Pomodoro Technique. To begin, you need to sign in with your <span v-if="!isStandaloneiOS">Google or </span>Facebook account.</p>
      <div id="gButton" :class="{ disabled: !isOnline }" v-if="!isStandaloneiOS" @click="signInWithGoogle"></div>
      <div id="fButton" :class="{ disabled: !isOnline }" @click="signInWithFacebook"></div>
      <div class="issue" role="alert" v-if="!isOnline">You cannot sign in because you are not connected to the internet.</div>
    </div>
    <BeatLoader 
      :loading="authInProgress" 
      color="#A6AB9B" 
      size="20px" 
      style="margin: 6rem auto 2rem;"
    />
    <div class="footer"><p>@2017 Susuko Maka LLC. Tomato icon by Freepik at <a href="http://www.flaticon.com/free-icon/tomato_167283">www.flaticon.com</a>.</p></div>
  </div>
</template>

<script>
import BeatLoader from 'vue-spinner/src/BeatLoader'

export default {
  name: 'SignIn',
  data() {
    return {
      authInProgress: false,
      isStandaloneiOS: false // Google login doesn't work in iOS web app mode.
    }
  },
  computed: {
    isOnline() {
      return this.$store.getters.getOnlineStatus
    }
  },
  components: {
    BeatLoader
  },
  methods: {
    signInWithGoogle() {
      if (this.isOnline) {
        this.authInProgress = true
        this.$emit('signInWithGoogle')
      }
    },
    signInWithFacebook() {
      if (this.isOnline) {
        this.authInProgress = true
        this.$emit('signInWithFacebook')
      }
    }
  },
  mounted() {
    if (('standalone' in window.navigator) && window.navigator.standalone) {
      this.isStandaloneiOS = true
    }
  }
}
</script>

<style lang="stylus" scoped>
.signup-wrapper
  position fixed
  top 0
  left 0
  bottom 0
  right 0
  padding-top 8vh
  color white
  background-color #3d3d3d
  z-index 100

@media (max-width:350px)
  .signup-wrapper
    padding-top 3vh

.signup-logo
  height 6rem
  width 100%

#signInPrompt
  color white
  width 520px
  font-size 1.7rem
  margin-top 5rem
  display flex
  justify-content center
  flex-wrap wrap
  & > p
    margin-bottom 2rem
    width 500px

@media (max-width:767px)
  #signInPrompt
    width 90%
    font-size 1.6rem
    & > p
        margin-bottom 2rem
        width 85%

@media (max-width:400px)
  #signInPrompt
    width 100%
    font-size 1.5rem
    margin-top 3rem
    & > p
      margin-bottom 2rem

#gButton
  background-image url('../assets/img/btn_google_signin_normal.png')
  background-size 200px
  background-repeat no-repeat
  height 50px
  width 200px
  margin 0.3rem 0.6rem
  cursor pointer
  &:hover
    background-image url('../assets/img/btn_google_signin_pressed.png')
  &:focus
    background-image url('../assets/img/btn_google_signin_focus.png')

div#gButton.disabled
  background-image url('../assets/img/btn_google_signin_disabled.png')
  cursor default
  &:hover
    background-image url('../assets/img/btn_google_signin_disabled.png')
  &:focus
    background-image url('../assets/img/btn_google_signin_disabled.png')

#fButton
  background-image url('../assets/img/btn_fb_signin_normal.png')
  background-size 200px
  background-repeat no-repeat
  height 50px
  width 200px
  margin 0.3rem 0.6rem
  cursor pointer
  &:hover
    background-image url('../assets/img/btn_fb_signin_pressed.png')
  &:focus
    background-image url('../assets/img/btn_fb_signin_focus.png')

div#fButton.disabled
  background-image url('../assets/img/btn_fb_signin_disabled.png')
  cursor default
  &:hover
    background-image url('../assets/img/btn_fb_signin_disabled.png')
  &:focus
    background-image url('../assets/img/btn_fb_signin_disabled.png')

.issue
  padding 1rem 1.2rem
  color white
  border 1px solid tomato
  margin-top 2rem
  font-size 1.3rem
  width 80%
  animation fadeIn 1s ease-in

@keyframes fadeIn
  from
    opacity 0
  to
    opacity 1

.footer
  margin-top 3rem
  padding 0 1rem
  font-size 1rem
  color rgb(196, 196, 196)
  a
    color tomato
    text-decoration none
    &:hover
      text-decoration underline
</style>
