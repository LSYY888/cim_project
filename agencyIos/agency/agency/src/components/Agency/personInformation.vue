<template>
	<div class="personInformation">
		<div class="top-section">
			<div class="user-image">
				<img src='../../assets/img/bg_img17.png'/>
			</div>
			<h2>你的名字</h2>
		</div>
		<div class="contain-section">
			<h3>修改个人资料</h3>
			<ul>
				<li>
					<label class="clearfix">
						<span>姓名</span>
						<input type="text" placeholder="请输入您的姓名" class="commone-input" ref='perName' @blur="blur"/>
					</label>
				</li>
				<li>
					<label class="clearfix">
						<span>身份证号</span>
						<input type="text" placeholder="请输入您的身份证号" class="commone-input" ref='perCardId' @blur="blur"/>
					</label>
				</li>
				<li>
					<label class="clearfix">
						<span>手机号</span>
						<input type="text" placeholder="请输入您的手机号" class="commone-input" ref="telphone" @blur="blur"/>
					</label>
				</li>
				<li class="identify-box">
					<label class="clearfix">
						<span>短信验证码</span>
						<input type="text" ref='perCode'/>
						<a href="javascript:;" class='identifyCode' @click="identifyCode">获取验证码</a>
					</label>
				</li>
			</ul>
			<div class="server-information-section">
				<label>
					<input type="checkbox"/>
				</label>
				<span>同意</span>
				<i @click="checkbox">《返返平台服务协议》</i>
			</div>
		</div>
		<Server v-show="server" @serverBtnFN='serverFn'></Server>
		<div class="sure-modify-personInformation-section">
			<div class="sure-modify-personInformation-btn" @click='stepBtn'>确认修改</div>
		</div>
		<toast v-model="messageShow" type="text" width="80%" :time='1000'>{{$t(totastText)}}</toast>
	</div>
</template>
<script>
	import $ from '../../../node_modules/jquery/dist/jquery.min.js'
	import '../../../src/assets/css/common.css'
	import Server from './server.vue'
	import {Toast} from 'vux'
	import Back from './back.vue'
	export default {
		components: {
			Server,
			Toast,
			Back
		},
		created () {
		},
		data () {
			return {
				server: false,
				messageShow: false,
				totastText: '',
				touchDouble: true
			}
		},
		methods: {
			stepBtn () {
      	var name = this.$refs.perName.value
        var identifycard = this.$refs.perCardId.value
        var phoneNumber = this.$refs.telphone.value
      	var identifycode = this.$refs.perCode.value
      	var data = {
				  'cardId': identifycard,
				  'phoneNumber': phoneNumber,
				  'openId': this.openid,
				  'sn': this.sn,
				  'token': this.tokenUrl(),
				  'userName': name,
				  'verifyCode': identifycode
				}
      	if (name === '') {
      		this.messageShow = true
      		this.totastText = '请输入姓名'
      	} else if (identifycard === '') {
      		this.messageShow = true
      		this.totastText = '请输入身份证号'
      	} else if (phoneNumber === '') {
      		this.messageShow = true
      		this.totastText = '请输入手机号'
      	} else if (identifycode === '') {
      		this.messageShow = true
      		this.totastText = '请输入短信验证码'
      	} else {
      		var url = this.$api.wxUrl + 'userProfile'
      		this.$http.post(url, data).then(response => {
      			if (response.status === 200) {
      				if (response.data.code === 200) {
      					this.messageShow = true
	              this.totastText = '正在跳转银行官网'
	              setTimeout(() => {
	                this.messageShow = false
	              }, 800)
	              setTimeout(() => {
	                window.location.href = response.data.data
	              }, 1300)
      				} else {
      					this.messageShow = true
      					this.totastText = response.data.message
      				}
      			}
      		}).catch(error => {
      			if (error.response.data.code === 99920001) {
      				this.messageShow = true
      				this.totastText = error.response.data.message
      			} else {
              this.messageShow = true
              this.totastText = error.response.data.message
            }
      		})
      	}
      },
			blur () { // input失去焦点时的校验
        var name = this.$refs.perName.value
        var identifycard = this.$refs.perCardId.value
        var phoneNumber = this.$refs.telphone.value
        var url = ''
        var data = {
          'token': this.tokenUrl(),
          'userName': name,
          'cardId': identifycard,
          'phoneNumber': phoneNumber
        }
        if (name === '' || identifycard === '' || phoneNumber === '') {
          url = this.$api.baseUrl + 'userProfile/check?token=' + data.token + '&userName=' + name + '&cardId=' + identifycard + '&phoneNumber=' + phoneNumber
          this.blurAjax(url)
        } else {
          url = this.$api.baseUrl + '/userProfile/check?token=' + data.token + '&userName=' + name + '&cardId=' + identifycard + '&phoneNumber=' + phoneNumber
          this.blurAjax(url)
        }
      },
      blurAjax (url) {
        this.$http.get(url).then(response => {
          if (response.status === 200) {
            if (response.data.code === 200) {
              console.log(response.data.data)
            } else {
              this.messageShow = true
              this.totastText = response.data.message
            }
          } else {
            this.messageShow = true
            this.totastText = response.data.message
          }
        }).catch(error => {
          if (error.response.data.code === 99920001) {
            this.messageShow = true
            this.totastText = error.response.data.message
          } else {
            this.messageShow = true
            this.totastText = error.response.data.message
          }
        })
      },
			identifyCode () {
				var telphone = this.$refs.telphone.value
				var data = {
					token: this.tokenUrl(),
					phoneNumber: telphone
				}
				if (telphone === '') {
					this.messageShow = true
					this.totastText = '手机号不能为空'
				} else {
					console.log(111)
					if (!this.touchDouble) {
						return false
					}
					this.touchDouble = false
					var url = this.$api.baseUrl + 'userProfile/messageSending'
					this.$http.post(url, data).then(response => {
						if (response.status === 200) {
							if (response.data.code === 200) {
								this.sendCode(59)
							} else {
								this.touchDouble = true
								this.messageShow = true
      					this.totastText = response.data.message
							}
						} else {
							this.touchDouble = true
          		this.messageShow = true
      				this.totastText = response.data.message
						}
					}).catch(error => {
						if (error.response.data.code === 99920001) {
          		this.touchDouble = true
      				this.messageShow = true
      				this.totastText = error.response.data.message
      			} else {
              this.touchDouble = true
              this.messageShow = true
              this.totastText = error.response.data.message
            }
					})
				}
			},
			serverFn (serverBox) {
				this.serverDiv = serverBox
				if (this.serverDiv === true) {
					this.server = false
				}
			},
			checkbox () {
				this.server = true
			},
			sendCode (wait) {
      	var code = $('.identifyCode')
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
      },
      tokenUrl (token) {
        $.ajax({
          url: this.$api.baseUrl + 'H5/token',
          type: 'get',
          async: false,
          success: function (response) {
            if (response.code === 200) {
              document.cookie = 'h5_token=' + response.data
              token = response.data
            }
          }
        })
        return token
      }
		}
	}
</script>
<style scoped>
	.personInformation{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		width: 100%;
		min-height: 100%;
		height: auto ! important;
		background: #f4f4f4;
		text-align: left;
	}
	@media screen and (min-width: 750px){
	  .personInformation{
	  	margin: 0 auto;
	  	height: 100%;
	    width: 750px;
	    background: #000;
	  }
	}
	.top-section{
		padding-top: 0.33rem;
		width: 100%;
		height: 1.86rem;
		background: #373b3e;
	}
	.user-image{
		margin: 0 auto;
		width: 0.72rem;
		height: 0.72rem;
		border-radius: 100%;
		background: #4a4b4f;
	}
	.top-section h2{
		margin-top: 0.3rem;
		font-size: 18px;
		color: #ebe6bd;
		text-align: center;
	}
	.contain-section h3{
		margin: 0.14rem 0 0.07rem 0.21rem;
		font-size: 16px;
		color: #333;
	}
	.contain-section ul{
		margin: 0 0.12rem 0 0.1rem;
		background: #fff;
		width: 95%;
	}
	.contain-section ul li{
		margin: 0 0.34rem 0 0.36rem;
		height: 0.63rem;
		border-bottom: 1px solid #f4f4f4;
	}
	.contain-section ul li label{
		display: block;
		height: 100%;
	}
	.contain-section ul li label input{
		border: none;
		outline: none;
	}
	.contain-section ul li label span{
		display: block;
		height: 100%;
		line-height: 0.63rem;
		width: 22%;
		float: left;
	}
	.commone-input{
		display: block;
		height: 100%;
		text-align: right;
		font-size: 14px;
		color: #999;
		float: right;
		width: 76%;
	}
	.identify-box label{
		display: block;
	}
	.identify-box span{
		float: left;
	}
	.identify-box a{
		float: right;
		display: inline-block;
		margin-top: 0.15rem;
		width: 0.94rem;
		height: 0.32rem;
		border: 1px solid #478dfd;
		color: #4790fd;
		font-size: 12px;
		border-radius: 5px;
		line-height: 0.32rem;
		text-align: center;
	}
	.identify-box input{
		float: left;
		display: inline-block;
		width: 1rem;
		height: 100%;
		font-size: 14px;
		color: #999;
	}
	.server-information-section{
		margin: 0.44rem 0 0.18rem 0;
		text-align: center;
	}
	.server-information-section label input{
		margin-top: -0.03rem;
		vertical-align: middle;
	}
	input[type=checkbox]:checked:after{
    color: #37AF6E;
    background: #37AF6E;
	}   
	.server-information-section label span{
		font-size: 14px;
		color: #9b9b9b;
	}
	.server-information-section label i{
		font-size: 14px;
		color: #7790bf;
	}
	.sure-modify-personInformation-section{
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 0.64rem;
		background: #fff;
	}
	.sure-modify-personInformation-btn{
		margin: 0.12rem auto 0;
		width: 80%;
		height: 0.41rem;
		background: #478dfd;
		border-radius: 2px;
		text-align: center;
		line-height: 0.41rem;
		font-size: 16px;
		color: #fff;
	}
</style>