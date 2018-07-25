<template>
  <div class="hellowWorld">
    <img class="previewer-demo-img" v-for="(item, index) in list" :src="item.src" width="100%" @click="show(index)" />
    <div v-transfer-dom>
      <previewer :list="list" ref="previewer" :options="options" @on-index-change="logIndexChange"></previewer>
    </div>
  </div>
</template>
<script>
  import {Previewer, TransferDom} from 'vux'
  export default {
    directives: {
      TransferDom
    },
    components: {
      Previewer
    },
    data () {
      return {
        list: [{
          msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
          src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwu9ze86j20m80b40t2.jpg'
        },
        {
          msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
          src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg'
        }],
        options: {
          isClickableElement: function (el) {
            return /previewer-delete-icon/.test(el.className)
          }
        }
      }
    },
    methods: {
      show(index) {
        this.$refs.previewer.show(index)
      },
      logIndexChange () {
        console.log(111)
      }
    }
  }
</script>
<style scoped>
  .pswp__top-bar{display: none ! important; background-color: #fff;}
</style>
