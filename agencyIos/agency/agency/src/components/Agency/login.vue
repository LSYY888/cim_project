<template>
	<div class="user">
		<div class="img-box">
			<img src="../../assets/img/bg_img100.png" />
		</div>
		<div class='user-tab'>
			<div class='active'>手机号登陆</div>
			<div>账号密码登陆</div>
		</div>
		<div class='telphone-box'>
			<ul>
				<li class='name-box'>
					<label class='clearfix'>
						<span>手机号码</span>
						<input type='text' ref='telphoneOne'/>
					</label>
				</li>
				<li class='identify-box'>
					<label class='clearfix'>
						<span>验证码</span>
						<input type='text' ref='vcode'/>
						<a href='javascript:;' class='identifyCodeLoginDom' @click="identifyCodeLogin">获取验证码</a>
					</label>
				</li>
			</ul>
			<div class='login' @click='telBtnFn'>
				<a href='javascript:;'>登录</a>
			</div>
		</div>
		<div class='account-box'>
			<ul>
				<li class='name-box'>
					<label class='clearfix'>
						<span>账号</span>
						<input type='text' ref='telphone'/>
					</label>
				</li>
				<li class='identify-box'>
					<label class='clearfix'>
						<span>密码</span>
						<input type='password' ref='password'/>
					</label>
				</li>
			</ul>
			<div class='login' @click='accountBtnFn'>
				<a href='javascript:;'>登录</a>
			</div>
		</div>
		<toast v-model="messageShow" type="text" width="80%" :time='1000'>{{$t(totastText)}}</toast>
		<div v-transfer-dom>
      <confirm
      v-model="show5"
      :close-on-confirm="false"
      :title="$t('查看提示')"
      :show-cancel-button="false"
      @on-confirm="onConfirm5">
        <p style="text-align:center;">{{tips}}</p>
      </confirm>
    </div>
	</div>
</template>
<script>
	import $ from '../../../node_modules/jquery/dist/jquery.min.js'
	import '../../../src/assets/css/common.css'
	import {Toast,Confirm ,TransferDomDirective as TransferDom} from 'vux'
	import Back from './back.vue'
	export default {
		directives: {
     TransferDom
    },
		components: {
			Toast,
			Back,
			Confirm
		},
		data () {
			return {
				urlObj: {},
				messageShow: false,
				totastText: '',
				touchDouble: true,
				touchDoubleTwo: true,
				show5: false,
				tips: ''
			}
		},
		created () {
			// var str = 'http://www.laifanfan.cn/login?tips=openid%E7%BB%91%E5%AE%9A%E5%A4%B1%E8%B4%A5%EF%BC%8C%E8%AF%B7%E9%80%9A%E8%BF%87%E8%B4%A6%E5%8F%B7%E6%96%B9%E5%BC%8F%E7%99%BB%E9%99%86'
			// this.getUrl(window.location.href)
			this.getUrl('http://www.laifanfan.cn/login?tips=openid%E7%BB%91%E5%AE%9A%E5%A4%B1%E8%B4%A5%EF%BC%8C%E8%AF%B7%E9%80%9A%E8%BF%87%E8%B4%A6%E5%8F%B7%E6%96%B9%E5%BC%8F%E7%99%BB%E9%99%86')
      this.tips = this.urlObj.tips
      if (this.tips === '' || this.tips === null || !this.tips) {
        // this.show5 = false
      } else {
        // this.show5 = true
        this.tips = decodeURIComponent(this.tips)
      }
		},
		mounted () {
			$('.telphone-box').show()
			$('.user-tab div').on('click', function () {
				$(this).addClass('active').siblings().removeClass('active')
				if ($(this).text() === '手机号登陆') {
					$('.telphone-box').show()
					$('.account-box').hide()
				} else {
					$('.account-box').show()
					$('.telphone-box').hide()
				}
			})
		},
		methods: {
			onConfirm5 () {
	      this.show5 = false
	    },
			telBtnFn () {
				var mobile = this.$refs.telphoneOne.value
				var vcode = this.$refs.vcode.value
				if (mobile === '') {
					this.messageShow = true
					this.totastText = '手机号不能为空'
				} else if (vcode === '') {
					this.messageShow = true
					this.totastText = '验证码不能为空'
				} else {
					var url = this.$api.wxUrl + 'api/user/vlogin?mobile=' + mobile + '&vcode=' + vcode
					this.$http.get(url).then(response => {
						if (response.data.code === 1) {
							console.log(response)
							this.$router.push({
								path: '/agencyIndex',
								name: 'agencyIndex'
							})
						} else {
							this.messageShow = true
							this.totastText = response.data.msg
						}
					}).catch(error => {
						this.messageShow = true
						this.totastText = error.response.data.msg
					})
				}
			},
			accountBtnFn () {
				var telphone = this.$refs.telphone.value
				var password = this.$refs.password.value
				if (telphone === '') {
					this.messageShow = true
					this.totastText = '请输入账号'
				} else if (password === '') {
					this.messageShow = true
					this.totastText = '请输入密码'
				} else {
					if (!this.touchDoubleTwo) {
						return false
					}
					this.touchDoubleTwo = false
					var url = this.$api.wxUrl + 'api/user/login'
					console.log(url)
					var data = {
						username: telphone,
						password: password
					}
					this.$http.post(url, data).then(response => {
						if (response.data.code === 1) {
							// localStorage.setItem('username', response.data.data.username)
							localStorage.setItem('sn', response.data.data.sn)
							this.$router.push({
								path: '/',
								redirect: '/agencyIndex'
							})
							this.$router.push({
								path: '/agencyIndex',
								name: 'agencyIndex'
							})
						} else {
							this.touchDoubleTwo = true
							this.messageShow = true
							this.totastText = response.data.msg
				      // localStorage.removeItem('username')
				    }
				  })
				}
			},
			identifyCodeLogin () {
				var telphoneOne = this.$refs.telphoneOne.value
				if (telphoneOne === '') {
					this.messageShow = true
					this.totastText = '手机号不能为空'
				} else {
					if (!this.touchDouble) {
						return false
					}
					this.touchDouble = false
					var url = this.$api.wxUrl + 'api/user/vcode?mobile=' + this.$refs.telphoneOne.value
					this.$http.get(url).then(response => {
						if (response.status === 200) {
							if (response.data.code === 1) {
								this.sendCode(59)
							} else {
								this.touchDouble = true
								this.messageShow = true
								this.totastText = response.data.msg
							}
						} else {
							this.touchDouble = true
							this.messageShow = true
							this.totastText = response.data.msg
						}
					}).catch(error => {
						if (error.response.data.code === 99920001) {
							this.touchDouble = true
							this.messageShow = true
							this.totastText = error.response.data.msg
						} else {
							this.touchDouble = true
							this.messageShow = true
							this.totastText = error.response.data.msg
						}
					})
				}
			},
			getUrl (url) {
        var name = ''
        var value = ''
        var str = url
        var num = str.lastIndexOf('?')
        str = str.substr(num + 1)
        var arr = str.split('&')
        for (var i = 0; i < arr.length; i++) {
          num = arr[i].indexOf('=')
          if (num > 0) {
            name = arr[i].substring(0, num)
            value = arr[i].substr(num + 1)
            this.urlObj[name] = value
          }
        }
      },
			sendCode (wait) {
				var code = $('.identifyCodeLoginDom')
				var self = this
				if (wait === 0) {
					code.attr('disabled', false).text('重发验证码')
					this.touchDouble = true
					wait = 59
				} else {
					code.attr('disabled', true).text(wait + '秒后重发')
					wait--
					setTimeout(function () {
						self.sendCode(wait)
					}, 1000)
				}
			}
		}
	}
</script>
<style scoped>
.user{
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	width: 100%;
	min-height: 100%;
	height: auto ! important;
	background: #f5f5f5;
	text-align: left;
}
@media screen and (min-width: 750px){
	.user{
		margin: 0 auto;
		height: 100%;
		width: 750px;
		background: #000;
	}
}
.img-box{
	height: 1.17rem;
}
.img-box img{
	display: block;
	width: 100%;
	height: 100%;
}
.user-tab{
	height: 0.4rem;
}
.user ul{
	margin-top: 0.13rem;
	background: #fff;
}
.user ul li{
	height: 0.45rem;
	line-height: 0.45rem;
	border-bottom: 1px solid #f6f6f6;
}
.user ul li input{
	border: none;
	outline: none;
}
.name-box{
	font-size: 16px;
	color: #333;
}
.name-box label{
	display: block;
	width: 100%;
	height: 100%;
}
.name-box label input{
	display: inline-block;
	float: left;
	height: 89%;
	width: 52%;
}
.name-box label span{
	margin-left: 0.14rem;
	float: left;
	width: 20%;
	font-size: 14px;
	color: #333;
}
.identify-box{
	border: 1px solid #fff;
}
.identify-box label{
	display: block;
	height: 98%;
}
.identify-box span{
	display: block;
	margin-left: 0.14rem;
	float: left;
	width: 20%;
	height: 94%;
	font-size: 14px;
	color: #333;
}
.identify-box input{
	float: left;
	display: block;
	width: 35%;
	height: 89%;
	font-size: 14px;
	color: #999;
}
.identify-box a{
	display: block;
	float: right;
	margin-right: 0.15rem;
	color: #4790fd;
	font-size: 12px;
}
.login{
	margin: 0.19rem auto 0;
	width: 90%;
	height: 0.45rem;
	line-height: 0.45rem;
	background: #4b78f0;
	border-radius: 3px;
	font-size: 16px;
	color: #fff;
	text-align: center;
}
.login a{
	color: #fff;
}
.user-tab{
	display: flex;
	background: #fff;
}
.user-tab div{
	flex: 1;
	height: 0.4rem;
	line-height: 0.4rem;
	text-align: center;
	font-size: 14px;
	color: #333;
}
.active{
	color: #3a84ff ! important;
	border-bottom: 1px solid #3a84ff;
}
.telphone-box{
	display: none;
}
.account-box{
	display: none;
}
</style>