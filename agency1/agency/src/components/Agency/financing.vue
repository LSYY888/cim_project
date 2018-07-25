<template>
	<div class='financing'>
		<div class='top-section'>
			<p>温馨提示:可长按下方图片直接分享给好友/朋友圈/微信群</p>
		</div>
		<div class='img-section'>
			<div class='img-section-box'>
				<p style="text-align:center; margin-top: 50%;" v-if='loading'>
		      <inline-loading></inline-loading><span style="vertical-align:middle;display:inline-block;font-size:14px;color:rab(255, 255, 255)">&nbsp;&nbsp;{{ $t('海报下载中...') }}</span>
		    </p>
		    <!-- <img :src="imgUrl"> -->
				<swiper direction="horizontal" :aspect-ratio="1.65" dots-position="center" @on-index-change="onSwiperItemIndexChange">
          <swiper-item>
	        	<img :src="imgUrl" />
	        </swiper-item>
        </swiper>
			</div>
		</div>
		<div class='footer-section'>
			<div class='smallBtn'>{{img_name}}</div>
			<div class='bigBtn' @click='share'>自定义海报</div>
		</div>
		<toast v-model="messageShow" type="text" width="80%" :time='2000'>{{$t(totastText)}}</toast>
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
			this.imgCont(true,'http://ads.laifanfan.cn/marketing.html')
			this.getUserInfo() 
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
			var channel = localStorage.getItem('tag')
			this.imgUrl = 'http://api.laifanfan.cn/watermark/qrc?p=poster_p2p_10&w=240&h=240&x=182&y=740&u=http://ads.laifanfan.cn/marketing.html?pub=' + channel
			if (this.imgUrl === '') {
				this.loading = true
			} else {
				this.loading = false
			}
			/*this.width = this.$refs.qcode.width
			this.height = this.$refs.qcode.height*/
			console.log(this.width, this.height)
			this.imgSrc()
		},
		methods: {
	   	getUserInfo () {
       	var url = this.$api.wxUrl + 'api/user/info'
       	this.infoMobile = localStorage.getItem('infoMobile')
       	this.$http.get(url).then(response => {
       	if (response.status === 200 && response.data.data.ticket !== null) {
      		this.imgCont(false,response.data.data.ticket)
       	}
       })
     	},
      onSwiperItemIndexChange (index) {
        this.img_name = '海报' + (index + 1)
      },
			imgCont (ischannel, content) {
				// var channel = localStorage.getItem('tag')
				/*var url = 'http://apiwx.laifanfan.com/QrCodeCombineBg?channel=' + channel + '&width=' + 220 + '&height=' + 220 + '&top=' + 720 + '&left=' + 180 + '&bgName=' + 'bg_img28.png' + '&isChannel=' + ischannel + '&content=' + content + '?pub=' + channel + '&isLaiFanFan=' + false*/
				var url = 'http://api.laifanfan.cn/watermark/qrc?p=poster_p2p_10&w=240&h=240&x=182&y=740&u=content'
				this.$http.get(url).then(response => {
					if (response.data.code === 200) {
						this.loading = false
						this.img = 'data:;base64,' +  response.data.data
						this.imag_list.push(this.img)
					}
				})
			},
			imgSrc () {
				var imgSrc = '../../assets/img/bg_img28.png'
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
/*.financing .vux-slider, .vux-swiper{
	}
.financing .vux-slider > .vux-indicator, .vux-slider .vux-indicator-right{
		display: none;
	}*/
	img[src=""]{
		opacity: 0;
	}
	.financing{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		min-height: 100%;
		height: auto ! important;
		background: #f5f5f5;
	}
	.financing .img-section{
		position: absolute;
		padding-bottom: 0.1rem;
		width: 100%;
		top: 0.2rem;
		left: 0;
		bottom: 1.14rem;
		overflow: auto;
		z-index: 5;
	}
	.financing .top-section{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		background: #fff;
		z-index: 10;
	}
	.financing .top-section p{
		margin: 0 auto;
		padding: 0.1rem 0 0.1rem 0.05rem;
		width: 100%;
		font-size: 14px;
		color: #f24c3f;
		text-align: left;
		line-height: 0.22rem;
	}
	.financing .weui-loading{
		width: 40px;
		height: 40px;
	}
	.financing .img-section-box img{
		display: block;
		margin: 10% auto;
		width: 86%;
	}
	.financing .footer-section{
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 1.14rem;
		background: #fff;
		z-index: 10;
	}
	.financing .smallBtn{
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
	.financing .bigBtn{
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