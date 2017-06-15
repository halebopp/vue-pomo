<template lang="html">
  <div class="explication">
    <span class="close-explication" @click="dismiss">&times;</span>
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'infobox',
  props: ['message'],
  methods: {
    dismiss() {
      this.$emit('dismissed')
    }
  }
}
</script>

<style lang="stylus" scoped>

  .explication
    position relative
    padding 1rem 3.8rem 1rem 1rem
    background-color whitesmoke
    border-radius 2px
    color rgb(50, 50, 50)
    margin-bottom 14px
    display flex
    justify-content center
    font-size 1.6rem
    transition opacity .1s ease-in, margin .2s ease-in

  .close-explication
    color darkgray
    display block
    height 2rem
    width 2rem
    cursor pointer
    font-size 3rem
    position absolute
    right 0.6rem
    top 0
    &:hover
      color rgb(50, 50, 50)

  @media (max-width:767px)
    .explication
      font-size 1.4rem

</style>
