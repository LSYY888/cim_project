<template>
  <div class="bigImg">
    <transition name="fade">
      <div class="img-view" @click="bigImg">
        <div class="img-layer"></div>
        <div class="img">
          <img :src="imgSrc"/>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import $ from '../../../node_modules/jquery/dist/jquery.min.js'
  import '../../../src/assets/css/common.css'
  export default {
    props: ['imgSrc'],
    mounted () {
      this.dialog($('.img-view .img img'))
    },
    methods: {
      bigImg () {
        this.$emit('clickit')
      }
    }
  }
</script>
<style scoped>
  .fade-enter-active, .fade-leave-active {transition: all .2s linear;transform: translate3D(0, 0, 0);}
  .fade-enter, .fade-leave-active {transform: translate3D(100%, 0, 0);}
  .img-layer{position: fixed; top: 0; left: 0; bottom: 0; right: 0; width: 100%; background: rgba(0, 0, 0, 0.6); z-index: 999;}
  .img-view .img img{display: block; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); max-width: 80%; z-index: 1000;}
</style>