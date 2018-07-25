<template>
	<div class="customServie">
		<big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
		<div class="customServie-top-section">
			<div class="customServie-top clearfix">
				<div class="customServie-top-left">
					<img :src="userData.avatar === null || !userData.avatar ? srcPerson : userData.avatar"/>
				</div>
				<div class="customServie-top-right">
					<p class="name"><span v-if='realname'>{{userData.realname}}</span><i v-if='levelTitle'>{{userData.levelTitle}}</i></p>
					<p class="userId">{{userData.sign}}</p>
				</div>
			</div>
		</div>
		<div class="qr-code-section">
			<div class="qr-code" v-show='weixinCode'>
				<div class="qr-code-image">
					<img :src="userData.weixinCode === null ? src : userData.weixinCode" @click="clickImg"/>
				</div> 
			</div>
			<div v-show='weixinNo' :data-clipboard-text="userData.weixinNo" @click="copy"  class="tag-read">
				<a href="javascript:;">专属客服微信：<span>{{userData.weixinNo}}</span><button>(点我复制)</button></a>
			</div>
		</div>
		<div class="tel-phone-section" v-if='mobile'>
			<h2>电话沟通(直接电话与我联系)</h2>
			<div class="telphone">
				<i></i>
				<a :href="'tel:' + userData.mobile">
					<em>{{userData.mobile}}</em>
				</a>
			</div>
		</div>
		<toast v-model="messageShow" type="text" width="60%" :time='1000'>{{$t(totastText)}}</toast>
	</div>
</template>
<script>
	import '../../../src/assets/css/common.css'
	import {Toast} from 'vux'
	import Back from './back.vue'
	import Clipboard from 'clipboard'
	import BigImg from '../../components/Agency/bigImg.vue'
	export default {
	components: {
      Toast,
      Back,
      BigImg,
      Clipboard
    },
    data () {
    	return {
    		messageShow: false,
    		totastText: '',
    		userData: '',
    		showImg: false,
    		src: require('../../assets/img/bg_img22.jpg'),
    		srcPerson: require('../../assets/img/bg_img17.png'),
    		levelTitle: false,
    		weixinCode: false,
    		weixinNo: false,
    	  weixinnum: '',
    		realname: false,
    		mobile: false
    	}
    },
    created () {
    	var url = this.$api.wxUrl + 'api/user/service'
        this.$http.get(url).then(response => {
          if (response.data.code === 1) {
          	this.userData = response.data.data
          	console.log(this.userData.avatar)
          	if (response.data.data.levelTitle === null || response.data.data.levelTitle === '' || !response.data.data.levelTitle) {
          		this.levelTitle = false
          	} else {
          		this.levelTitle = true
          	}
          	if (response.data.data.weixinCode === null || response.data.data.weixinCode === '' || !response.data.data.weixinCode) {
          		this.weixinCode = false
          	} else {
          		this.weixinCode = true
          	}
          	if (response.data.data.weixinNo === null || response.data.data.weixinNo === '' || !response.data.data.weixinNo) {
          		this.weixinNo = false
          	} else {
          		this.weixinNo = true
          	}
          	if (response.data.data.realname === null || response.data.data.realname === '' || !response.data.data.realname) {
          		this.realname = false
          	} else {
          		this.realname = true
          	}
          	if (response.data.data.mobile === null || response.data.data.mobile === '' || !response.data.data.mobile) {
          		this.mobile = false
          	} else {
          		this.mobile = true
          	}
          }
        })
    },
    methods: {
    	copy() {
        var clipboard = new Clipboard('.tag-read')
        clipboard.on('success', e => {
	        this.messageShow = true
					this.totastText = '复制成功'
	        // 释放内存
	        clipboard.destroy()
        })
        clipboard.on('error', e => {
	        // 不支持复制
	        this.messageShow = true
					this.totastText = '复制成功'
	        // 释放内存
	        clipboard.destroy()
        })
			},
			clickImg () {
			  this.showImg = true
			  this.imgSrc = this.userData.weixinCodeSrc
			},
			viewImg () {
			this.showImg = false
			}
		}
	}
</script>
<style scoped>
	.customServie{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		min-height: 100%;
		height: auto ! important;
		background: #f5f5f5;
	}
	@media screen and (min-width: 750px){
	  .customServie{
	  	margin: 0 auto;
	  	height: 100%;
	    width: 750px;
	  }
	}
	.customServie button{
		border: none;
		outline: none;
		font-size: 14px;
		color: #fff;
		background: none;
	}
	.customServie-top-section{
		height: 1.28rem;
		background: #000;
	}
	.customServie-top-left{
		margin: 0 0 0 0.25rem;
		float: left;
		width: 0.74rem;
		height: 0.74rem;
		border-radius: 100%;
	}
	.customServie-top-right{
		margin-top: 0.43rem;
		margin-left: 0.13rem;
		float: left;
		width: 68%;
		text-align: left;
	}
	.customServie-top-left img{
		margin-top: 0.26rem;
		width: 100%;
		height: 100%;
		border-radius: 100%;
	}
	.name{
		width: 100%;
		font-size: 18px;
		color: #fff;
	}
	.name i{
		padding: 0.01rem 0.05rem;
		margin-left: 0.09rem;
		font-size: 12px;
		color: #4e4b4a;
		background: #ffc000;
		border-radius: 8px;
	}
	.userId{
		margin-top: 0.12rem;
		color: #abacad;
		font-size: 13px;
	}
	.qr-code-section{
		padding: 0.25rem 0 0.16rem 0;
	}
	.qr-code{
		margin: 0 auto;
		border-radius: 15px;
		width: 50%;
	}
	.qr-code-image{
		margin: 0.2rem auto 0;
	}
	.qr-code-image img{
		width: 100%;
		height: 100%;
	}
	.qr-code-section a{
		margin-top: 0.17rem;
		display: inline-block;
		height: 0.38rem;
		line-height: 0.38rem;
		width: 92%;
		font-size: 14px;
		color: #fff;
		background: #379fff;
		border-radius: 15px;
	}
	.tel-phone-section{
		margin-top: 0.1rem;
		padding-bottom: 0.17rem;
		background: #fff;
	}
	.tel-phone-section h2{
		padding-left: 0.17rem;
		height: 0.5rem;
		line-height: 0.5rem;
		font-size: 16px;
		color: #333;
		text-align: left;
		font-weight: bold;
		border-bottom: 1px solid #f6f6f6;
	}
	.telphone{
		margin: 0.2rem auto 0;
		width: 60%;
		height: 0.45rem;
		border: 1px solid #e5e4e4;
		border-radius: 15px;
		line-height: 0.45rem;
		text-align: center;
		font-size: 18px;
		color: #333;
	}
	.telphone a{
		display: inline-block;
		width: 63%;
		color: #333;
	}
	.telphone i{
		display: inline-block;
		margin-bottom: 0.05rem;
		width: 0.23rem;
		height: 0.23rem;
		background: url(../../assets/img/bg_img15.png) no-repeat center center;
		background-size: 100% 100%;
		vertical-align: middle;
	}
</style>