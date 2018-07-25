<template>
	<div class="agent">
		<section class='top-section'>
			<img src='../../assets/img/bg_img19.png'/>
		</section>
		<section class='middle-section'>
			<div v-show='inputSection'>
				<ul>
					<li class='name'>
						<label>
							<input type='text' placeholder='请输入您的姓名' ref='name'/>
						</label>
					</li>
					<li class='phone'>
						<label>
							<input type='text' placeholder='请输入您的手机号' ref='telphone'/>
						</label>
					</li>
					<li class='code'>
						<label class='clearfix'>
							<input type='text' placeholder='您的验证码' ref='code'/>
							<span><a href='javascript:;' @click='identifyCode' class='identifyCode'>获取验证码</a></span>
						</label>
					</li>
				</ul>
				<div class="now-join-league" @click='joinBtn'>
					<a href='javascript:;'>立即加盟</a>
				</div>
			</div>
			<div v-show='qrCode' class='qrCode'>
				<div>
					<img src='../../assets/img/bg_img22.jpg'/>
				</div>
				<p>恭喜您已成功加入趣返返！</p>
				<p>关注趣返返公众号轻松开启您的事业！</p>
			</div>
		</section>
		<section class='footer-section'>
			<img src='../../assets/img/bg_img20.png'/>
		</section>
		<toast v-model="messageShow" type="text" width="80%" :time='1000'>{{$t(totastText)}}</toast>
	</div>
</template>
<script>
	import $ from '../../../node_modules/jquery/dist/jquery.min.js'
	import '../../../src/assets/css/common.css'
	import {Toast} from 'vux'
	export default {
		components: {
			Toast
		},
		created () {
			// this.getUrl('http://192.168.1.128:8002/api/channel/register?pub=05B9C6CD70294945BC674B230499928D&mobile=17610801162&code=1234')
			this.getUrl(window.location.href)
			this.pub = this.urlObj.pub
			console.log(this.pub)
		},
		data () {
			return {
				messageShow: false,
				totastText: '',
				touchDouble: true,
				joinDialog: false,
				urlObj: {},
				pub: '',
				inputSection: true,
				qrCode: false
			}
		},
		mounted () {
		},
		methods: {
			joinBtn () {
				var name = this.$refs.name.value
				var mobile = this.$refs.telphone.value
				var code = this.$refs.code.value
				if (name === '') {
					this.messageShow = true
      		this.totastText = '姓名不能为空'
				} else if (mobile === '') {
					this.messageShow = true
      		this.totastText = '手机号不能为空'
				} else if (code === '') {
					this.messageShow = true
      		this.totastText = '验证码不能为空'
				} else {
					var url = this.$api.wxUrl + 'api/channel/register?pub=' + this.pub + '&mobile=' + mobile + '&code=' + code + '&name=' + name
					this.$http.get(url).then(response => {
						console.log(response)
						if (response.status === 200) {
      				if (response.data.code === 1) {
      					this.qrCode = true
      					this.inputSection = false
      				} else {
      					this.messageShow = true
      					this.totastText = response.data.msg
      				}
      			}
					}).catch(error => {
      			if (error.response.data.code === 99920001) {
      				this.messageShow = true
      				this.totastText = error.response.data.msg
      			} else {
              this.messageShow = true
              this.totastText = error.response.data.msg
            }
      		})
				}
			},
			maskLayer () {
				this.joinDialog = false
				$('.agent').removeClass('model-open')
      	$('.agent').addClass('model-close')
			},
			identifyCode () {
				var telphone = this.$refs.telphone.value
				console.log(telphone)
				if (telphone === '') {
					this.messageShow = true
					this.totastText = '手机号不能为空'
				} else {
					if (!this.touchDouble) {
						return false
					}
					this.touchDouble = false
					var url = this.$api.wxUrl + 'api/user/vcode?mobile=' + telphone
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
	.agent{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		width: 100%;
		min-height: 100%;
		height: auto ! important;
		background: #161920;
		text-align: left;
	}
	@media screen and (min-width: 750px){
	  .agent{
	  	margin: 0 auto;
	  	height: 100%;
	    width: 750px;
	    background: #000;
	  }
	}
	.agent.model-open{
	  position: fixed;
	  width: 100%;
	  top: 0;
	  left: 0;
	}
	.agent.model-close{
		position: absolute;
	  top: 0;
	  left: 0;
	  right: 0;
	  width: 100%;
	  height: auto ! important;
	  min-height: 100%;
	  height: 100%;
	}
	.top-section{
		width: 100%;
	}
	.top-section img{
		height: 100%;
		width: 100%;
	}
	.footer-section img{
		width: 100%;
		height: 100%;
	}
	.middle-section ul li{
		margin: 0 auto 0.15rem;
		height: 0.5rem;
		background: #0c0f16;
		border-radius: 6px;
		width: 80%;
		line-height: 0.5rem;
		border: 1px solid #e8c398;
	}
	.middle-section ul li label{
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 6px;
	}
	.code span{
		display: block;
		float: right;
	}
	.code span a{
		padding: 0 0.21rem;
		font-size: 16px;
		color: #d2c88b;
		border-left: 1px solid #222325;
	}
	.phone input{
		display: block;
	}
	.code input{
		display: block;
		float: left;
		width: 40%;
	}
	input{
		padding-left: 0.14rem;
		height: 100%;
		font-size: 16px;
		background: #0c0f16;
		border: none;
		outline: none;
		color: #d5d4d4;
		border-radius: 6px;
	}
	input::-webkit-input-placeholder{
		color: #d5d4d4; 
	}
	.now-join-league{
		margin: 0 auto 0.17rem;
		width: 68%;
		height: 0.45rem;
		line-height: 0.45rem;
		background: url(../../assets/img/bg_img21.png) no-repeat center center;
		background-size: 100% 100%;
		text-align: center;
	}
	.now-join-league a{
		font-size: 18px;
		color: #070406;
		font-weight: bold;
	}
	.qrCode{
		margin-bottom: 0.27rem;
		width: 100%;
	}
	.qrCode img{
		margin: 0 auto;
		width: 2rem;
		height: 2rem;
	}
</style>