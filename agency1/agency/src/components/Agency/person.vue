<template>
	<div class="personInformation">
		<div class="top-section">
			<div class="user-image">
				<img :src="Avattar === null ? src : Avattar"/>
			</div>
			<h2><span>{{userHeadinfo.realname === "" ? '未设置姓名' : userHeadinfo.realname}}</span></h2>
			<p><i v-show="levelTitle">{{userHeadinfo.levelTitle}}</i></p>
		</div>
		<div class="contain-section">
			<h3>修改基本资料</h3>
			<ul>
				<li>
					<label class="clearfix">
						<span>姓名</span>
						<input type="text" v-model:value='UserInfo.realname' placeholder="请输入您的姓名" class="commone-input" ref='perName'/>
					</label>
				</li>
				<li class="clearfix">
					<label class="clearfix">
						<span>微信号</span>
						<input type="text" v-model:value='UserInfo.weixinNo' placeholder="请输入微信号" class="commone-input" ref='perWx'/>
					</label>
				</li>
				<li>
					<label class="clearfix">
						<span>公司名称</span>
						<input type="text" v-model:value='UserInfo.company' placeholder="请输入公司名称" class="commone-input" ref='perCompany'/>
					</label>
				</li>
				<li>
					<label class="clearfix">
						<span>个性签名</span>
						<input type="text" v-model:value='UserInfo.sign' placeholder="请输入您的签名" class="commone-input" ref='perSign'/>
					</label>
				</li>
			</ul>
			<div class="server-information-section">
				<label>
					<input checked="checked" type="checkbox" ref='checkbox'/>
				</label>
				<span>同意</span>
				<i @click="checkbox">《趣返返平台服务协议》</i>
			</div>
		</div>
		<Server v-show="server" @serverBtnFN='serverFn'></Server>
		<div class="sure-modify-personInformation-section">
			<div class="sure-modify-personInformation-btn" @click="modifyinformation">确认修改</div>
		</div>
		<toast v-model="messageShow" type="text" width="80%" :time='1000'>{{$t(totastText)}}</toast>
	</div>
</template>
<script>
	import $ from '../../../node_modules/jquery/dist/jquery.min.js'
	import '../../../src/assets/css/common.css'
	import Server from './server.vue'
	import {Toast, Datetime, Group} from 'vux'
	import Back from './back.vue'
	export default {
		components: {
			Server,
			Toast,
			Back,
			Datetime,
			Group
		},
		created () {
			this.getUserInfo()
			this.getHeadInfo()
		},
		data () {
			return {
				server: false,
				messageShow: false,
				totastText: '',
				touchDouble: true,
				UserInfo:'',
				value1: '请选择您的生日',
				levelTitle: false,
				userHeadinfo:'',
				Avattar:'',
				src: require('../../assets/img/bg_img17.png')
			}
		},
		methods: {
			getUserInfo() {
				var url = this.$api.wxUrl + 'api/user/profile'
				this.$http.get(url).then(response => {
					this.UserInfo = response.data.data
					if (this.UserInfo.levelTitle === null) {
						this.levelTitle = false
					} else {
						this.levelTitle = true
					}
				}).catch(error => {
					this.errorShow = true
				})
			},
            getHeadInfo () {
            var url = this.$api.wxUrl + 'api/user/info' 
           this.$http.get(url).then(response =>{
          if (response.data.code === 1) {
            this.userHeadinfo = response.data.data
            this.Avattar = response.data.data.avatar
          }
        })
	    },	
			identifyCode () {
				var telphone = this.$refs.mobile.innerText
				if (telphone !== '') {
					if (!this.touchDouble) {
						return false
					}
					this.touchDouble = false
					var url = this.$api.wxUrl + 'api/user/vcode?mobile=' + telphone
					this.$http.get(url).then(response => {
						if (response.data.code === 200) {
							this.messageShow = true
							this.totastText = '短信发送成功'
							this.sendCode(59)
						} else {
							if (response.data.msg != null) {
								this.messageShow = true
								this.totastText = response.data.msg
							}
							this.touchDouble = true
						}
					}).catch(error => {
						this.messageShow = true
						this.totastText = error.response.data.message
						this.touchDouble = true
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

			modifyinformation () {
        if (!this.$refs.checkbox.checked) {
            this.messageShow = true
        	this.totastText = '请同意返返平台服务协议'
        	return
        }
        var data = {
        	weixinNo: this.$refs.perWx.value,
        	realname: this.$refs.perName.value,
        	company:  this.$refs.perCompany.value,
        	sign: this.$refs.perSign.value
        }
        var url = this.$api.wxUrl + 'api/user/profile'
        this.$http.post(url, data).then(response => {
        	if (response.data.code === 1) {
        		this.messageShow = true
        		this.totastText = '保存信息成功'
        		setTimeout(() => {
        			this.messageShow = false
        		}, 800)
        		setTimeout(() => {
        			this.$router.go(-1)
        		}, 1300)
        	} else {
        		this.messageShow = true
        		this.totastText = response.data.msg
        	}
        }).catch(error => {
        	this.messageShow = true
        	this.totastText = '网络繁忙'
        })
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
	padding-top: 0.25rem;
	width: 100%;
	height: 1.60rem;
	background: #373b3e;
}
.user-image{
	margin: 0 auto;
  width: 0.72rem;
  height: 0.72rem;
  border: 3px solid #4a4b4f;
  border-radius: 100%;
}
.user-image img{
	border-radius: 100%;
	width: 100%;
	height: 100%;
}
.top-section h2{
	margin-top: 0.18rem;
  text-align: center;
  font-size: 18px;
  color: #fff;
}
.top-section h2 input{
	display: block;
	margin: 0 auto;
	background: #f5f5f5 !important;
	border: 1px solid #f00;
}
.top-section p{
	position: absolute;
  top: 0.41rem;
  right: 25%;
}
.top-section p i{
  display: inline-block;
  padding: 0.02rem 0.1rem;
  background: #ffc000;
  height: 0.17rem;
  border-radius: 0.08rem;
  font-size: 12px;
  color: #4e4b4a;
  line-height: 0.17rem;
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
	font-size: 14px;
}
.contain-section ul li label input{
	border: none;
	outline: none;
}
.contain-section ul li label span{
	display: block;
	height: 100%;
	line-height: 0.63rem;
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
::-webkit-input-placeholder{
  color: #999;
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
	margin: 0.2rem 0 0.18rem 0;
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
	/* .datetime{
		border: 1px solid #f00;
	}
	.datetime a{
		border: 1px solid #000;
		display: block;
		width: 100%;
		height: 100%;
	}
	.personInformation .datetime .weui-cells.vux-no-group-title{
		margin: none !important;
		padding: none !important;
		} */
	</style>