<template>
	<div>
		<div class="back-section" ref='moveDiv' @touchstart='down' @touchmove='move' @touchend='end'>
    	<div @click='backBtn'>
    		<img src="../../assets/img/bg_img13.png"/>
    	</div>
    </div>
	</div>
</template>
<script>
	import '../../../src/assets/css/common.css'
	export default {
		data () {
			return {
				flags: false,
				position: {
					x: 0,
					y: 0
				},
				nx: '',
				ny: '',
				dx: '',
				dy: '',
				xPum: '',
				yPum: ''
			}
		},
		methods: {
			down () {
				this.flags = true
				var touch
				var moveDiv = this.$refs.moveDiv
				if (event.touches) {
					touch = event.touches[0]
				} else {
					touch = event
				}
				this.position.x = touch.screenX
				this.position.y = touch.screenY
				this.dx = moveDiv.offsetLeft
				this.dy = moveDiv.offsetTop
			},
			move () {
				if (this.flags) {
					var touch
					var moveDiv = this.$refs.moveDiv
					var screenHeight = window.screen.height
					var screenWidth = window.screen.width
					var rightX = screenWidth - 45
					var rightY = screenHeight - 45
					console.log(rightX)
					if (event.touches) {
						touch = event.touches[0]
					} else {
						touch = event
					}
					this.nx = touch.screenX - this.position.x
					this.ny = touch.screenY - this.position.y
					this.xPum = this.dx + this.nx
					this.yPum = this.dy + this.ny
					if (this.xPum < 0) {
						this.xPum = 0
					}
					if (this.xPum >= rightX) {
						this.xPum = rightX
						console.log(this.xPum)
					}
					if (this.yPum < 0) {
						this.yPum = 0
					}
					if (this.yPum > rightY) {
						this.yPum = rightY
					}
					moveDiv.style.left = this.xPum + 'px'
					moveDiv.style.top = this.yPum + 'px'
					event.preventDefault()
				}
			},
			end (event) {
				this.flags = false
			},
			backBtn () {
				this.$router.go(-1)
			}
		}
	}
</script>
<style scoped>
	.back-section{
		position: fixed;
		bottom: 0.3rem;
		right: 0.1rem;
		z-index: 300;
		width: 0.45rem;
		height: 0.45rem;
	}
	.back-section div{
		width: 0.45rem;
		height: 0.45rem;
	}
	.back-section div img{
		width: 100%;
		height: 100%;
	}
</style>