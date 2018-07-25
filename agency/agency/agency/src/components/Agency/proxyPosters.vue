<template>
	<div class='proxy-posters'>
		<div class='top-section'>
			<p>温馨提示:可长按下方图片直接分享给好友/朋友圈/微信群</p>
		</div>
		<div class='img-section'>
			<div class='img-section-box'>
				<p style="text-align:center; margin-top: 50%;" v-show='loading'>
		      <inline-loading></inline-loading><span style="vertical-align:middle;display:inline-block;font-size:14px;">&nbsp;&nbsp;{{$t('海报下载中...')}}</span>
		    </p>
				<swiper direction="horizontal" :aspect-ratio="1.6" dots-position="center" @on-index-change="onSwiperItemIndexChange">
        <!-- <swiper-item class="swiper-demo-img" v-for="(item, index) in imag_list" :key="index"><img :src="imgUrl" /></swiper-item> -->
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
      // this.imgSrc()
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
			this.width = 100
			this.height = 200
			console.log(this.width, this.height)
		},
		methods: {
        getUserInfo () {
          var url = this.$api.wxUrl + 'api/user/info'
          this.infoMobile = localStorage.getItem('infoMobile')
          this.$http.get(url).then(response => {
          	if (response.data.code === 1) {
          		this.loading = false
          		this.imgUrl = 'http://api.laifanfan.cn/watermark/qrc?p=poster_agent_10&w=250&h=250&x=177&y=237&t=' + response.data.data.ticket
          	} else {
          		this.loading = true
          	}
          // this.imgCont(false,response.data.data.ticket,true)
          /*this.imgUrl = 'http://api.laifanfan.cn/watermark/qrc?p=poster_agent_10&w=250&h=250&x=177&y=237&t=gQHc8TwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAyQnVvNjAtMkdkaWgxMDAwMGcwN20AAgSPi0VbAwQAAAAA'*/
           }).catch(error => {
         /* this.imgCont(false,null,true)*/
          }) 
        },
          onSwiperItemIndexChange (index) {
          /*	if (index == 0) {
               this.img_name = '海报1(公众号)'
          	}else {
          	   this.img_name = '海报1(推广页)'
          	}*/
            },
			imgCont (ischannel, content,islai) {
				// var channel = localStorage.getItem('tag')
				if (islai) {
				var url = 'http://apiwx.laifanfan.com/QrCodeCombineBg?channel=' + channel + '&width=' + 250 + '&height=' + 250 + '&top=' + 300 + '&left=' + 180 + '&bgName=' + this.lastStr + '&isChannel=' + ischannel + '&content=' + content  + '&isLaiFanFan=' + false
				}else {
					var url = 'http://apiwx.laifanfan.com/QrCodeCombineBg?channel=' + channel + '&width=' + 250 + '&height=' + 250 + '&top=' + 300 + '&left=' + 180 + '&bgName=' + this.lastStr + '&isChannel=' + ischannel + '&content=' + content + '?pub='+ channel 
				}
				/*if (content === null && islai) {
				 this.img_name = '海报1(推广页)'
				 this.imgCont(true,'http://ads.laifanfan.cn/qufanfanIndex.html',false)
                return
				}*/
				this.$http.get(url).then(response => {
					if (response.data.code === 200) {
					this.loading = false
                     this.imag_list.push('data:;base64,' +  response.data.data)
                /*if (islai) {
                 this.imgCont(true,'http://ads.laifanfan.cn/qufanfanIndex.html',false)
                }*/
					}
				})
			},
			imgSrc () {
				var imgSrc = '../../assets/img/bg_img30.png'
				var str = imgSrc.lastIndexOf('/')
				this.lastStr = imgSrc.substring(str + 1)
			},
			share () {
				// this.wxShareTimeline ()
				this.messageShow = true
				this.totastText = '此功能即将开放!'
			}
		}
	}
</script>
<style>
	/*.proxy-posters .vux-slider, .vux-swiper{
	}
	.proxy-posters .vux-slider > .vux-indicator, .vux-slider .vux-indicator-right{
		display: none;
	}*/
	img[src=""]{
		opacity: 0;
	}
	.proxy-posters{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		min-height: 100%;
		height: auto ! important;
		background: #f5f5f5;
	}
	.proxy-posters .img-section{
		position: absolute;
		padding-bottom: 0.1rem;
		width: 100%;
		top: 0.2rem;
		left: 0;
		bottom: 1.14rem;
		overflow: auto;
		z-index: 5;
	}
	.proxy-posters .top-section{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		background: #fff;
		z-index: 10;
	}
	.proxy-posters .top-section p{
		margin: 0 auto;
		padding: 0.1rem 0 0.1rem 0.05rem;
		width: 100%;
		font-size: 14px;
		color: #f24c3f;
		text-align: left;
		line-height: 0.22rem;
	}
	.proxy-posters .weui-loading{
		width: 40px;
		height: 40px;
	}
	.proxy-posters .img-section-box img{
		display: block;
		margin: 10% auto;
		width: 86%;
	}
	.proxy-posters .footer-section{
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 1.14rem;
		background: #fff;
		z-index: 10;
	}
	.proxy-posters .smallBtn{
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
	.proxy-posters .bigBtn{
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