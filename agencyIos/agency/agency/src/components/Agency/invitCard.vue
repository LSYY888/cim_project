<template>
	<div class='invitCard'>
		<div class='top-section'>
			<p>温馨提示:可长按下方图片直接分享给好友/朋友圈/微信群</p>
		</div>
		<div class='img-section'>
			<div class='img-section-box'>
				<p style="text-align:center; margin-top: 50%;" v-if='loading'>
		      <inline-loading></inline-loading><span style="vertical-align:middle;display:inline-block;font-size:14px;color:rab(255, 255, 255)">&nbsp;&nbsp;{{ $t('海报下载中...') }}</span>
		    </p>
				<!-- <img :src="imgUrl" class='qcode' ref='qcode'/> -->
				<swiper direction="horizontal" :aspect-ratio="1.65" dots-position="center" @on-index-change="onSwiperItemIndexChange">
        	<swiper-item class="swiper-demo-img" v-for="(item, index) in imag_list" :key="index"><img :src="item"></swiper-item>
        </swiper>
			</div>
		</div>
		<div class='footer-section'>
			<div class='smallBtn'>{{img_name}}</div>
			<div class='bigBtn' @click='share'>自定义海报</div>
		</div>
		<toast v-model="messageShow" type="text" width="80%" :time='1000'>{{$t(totastText)}}</toast>
	</div>
</template>
<script>
	import '../../../src/assets/css/common.css'
	import Back from './back.vue'
	import {Toast, InlineLoading,Swiper,SwiperItem} from 'vux'
	export default {
		components: {
			Back,
			Toast,
			InlineLoading,
			Swiper,
			SwiperItem
		},
		created () {
			this.imgSrc()
			this.imgCont(false,'http://creditcard.laifanfan.cn')
			/*this.getUserInfo() */
		},
		data () {
			return {
				ticket: '',
				width: '',
				height: '',
				lastStr: '',
				img: '',
				img_name: '海报1',
				imag_list: [],
				messageShow: false,
				totastText: '',
				loading: true,
				imgUrl: ''
			}
		},
		mounted () {
			/*this.width = this.$refs.qcode.width
			this.height = this.$refs.qcode.height*/
			console.log(this.width, this.height)
			
		},
		methods: {
		   getUserInfo () {
           var url = this.$api.wxUrl + 'api/user/info'
           this.infoMobile = localStorage.getItem('infoMobile')
          this.$http.get(url).then(response => {
          if (response.status === 200 && response.data.data.ticket !== null) {
          	this.imgCont(false,response.data.data.ticket)
           }
           })},
          onSwiperItemIndexChange (index) {
              this.img_name = '海报' + (index + 1)
            },
			imgCont (ischannel, content) {
				var channel = localStorage.getItem('tag')
				var url = 'http://apiwx.laifanfan.com/QrCodeCombineBg?channel=' + channel + '&width=' + 250 + '&height=' + 250 + '&top=' + 230 + '&left=' + 180 + '&bgName=' + this.lastStr + '&isChannel=' + ischannel + '&content=' + content + '?pub='+ channel + '&isLaiFanFan=' + true
				this.$http.get(url).then(response => {
					if (response.data.code === 200) {
						if (response.data.data === null) {
							this.loading = true
						} else {
							this.loading = false
	            this.imag_list.push('data:;base64,' +  response.data.data)
	            // this.imgUrl = 'data:;base64,' +  response.data.data
						}
					}
				})
			},
			imgSrc () {
				var imgSrc = '../../assets/img/bg_img29.png'
				var str = imgSrc.lastIndexOf('/')
				this.lastStr = imgSrc.substring(str + 1)
			},
			share () {
				this.messageShow = true
				this.totastText = '此功能即将开放！'
			}
		}
	}
</script>
<style>
/*.invitCard .vux-slider > .vux-indicator, .vux-slider .vux-indicator-right{
		display: none;
	}*/
	img[src=""]{
		opacity: 0;
	}
	.invitCard{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		min-height: 100%;
		height: auto ! important;
		background: #f5f5f5;
	}
	.invitCard .top-section{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		background: #fff;
		z-index: 10;
		padding: 0.05rem 0;
		z-index: 10;
	}
	.invitCard .top-section p{
		margin: 0 auto;
		padding: 0.05rem 0 0.05rem 0.05rem;
		width: 100%;
		font-size: 14px;
		color: #f24c3f;
		text-align: left;
		line-height: 0.22rem;
	}
	.invitCard .img-section{
		position: absolute;
		padding-bottom: 0.1rem;
		width: 100%;
		top: 0.2rem;
		left: 0;
		bottom: 1.14rem;
		overflow: auto;
		z-index: 5;
	}
	.invitCard .weui-loading{
		width: 40px;
		height: 40px;
	}
	.invitCard .img-section-box img{
		display: block;
		margin: 10% auto;
		width: 86%;
	}
	.invitCard .footer-section{
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 1.14rem;
		background: #fff;
		z-index: 10;
	}
	.invitCard .smallBtn{
		margin: 0.15rem auto;
		width: 1.52rem;
		height: 0.27rem;
		background: #478dfd;
		border-radius: 12px;
		font-size: 14px;
		color: #f4f4f4;
		line-height: 0.27rem;
		text-align: center;
	}
	.invitCard .bigBtn{
		margin: 0 auto;
		width: 80%;
		height: 0.39rem;
		background: #478dfd;
		border-radius: 20px;
		font-size: 16px;
		color: #f4f4f4;
		line-height: 0.39rem;
		text-align: center;
	}
</style>