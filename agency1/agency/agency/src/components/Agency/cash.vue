<template>
	<div class='cash'>
    <div class='money-list-section' v-show='moneyShow'>
      <div class='icon-box clearfix'>
        <div class='icon-box-left clearfix'>
          <img src='../../assets/img/bg_img69.png'/>
        </div>
        <div class='icon-box-right'>
          <div class='icon-box-right-top'>
            <span>微信红包</span>
            <i>极速到账</i>
          </div>
          <div class='icon-box-right-bottom'>
            <p>以微信红包形式发放，需绑定微信账号</p>
          </div>
        </div>
      </div>
      <div class='input-box'>
        <h2>请填写提现信息</h2>
        <ul>
          <li class='first-li'>
            <label class="clearfix">
              <span>账户余额：</span>
              <span>{{UserInfo.balance}}<i>元</i></span>
            </label>
          </li>
          <li class="cash-li">
            <label>
              <span>提现金额：</span>
              <input type='text' v-model:value='WitdmAount' @input="handleInput"/>
              <i>元</i>
            </label>
          </li>
          <li class='telphone-box'>
            <label>
              <span>登记手机号码：</span>
              <input :value='UserInfo.mobile' type="text" disabled="true" ref='mobile'>
            </label>
          </li>
          <li class='identify-box'>
            <label>
              <span >短信验证码：</span>
              <input type='text' maxlength="6"  onkeyup="value=value.replace(/[^\d]/g,'')" ng-pattern="/[^a-zA-Z]/" ref='preCode'/>
            </label>
            <a href='javascript:;'  class='identifyCodeBtnCashDom' @click='identifyCodeBtn'>获取验证码</a>
          </li>
        </ul>
        <div class='promt-box'>
          <p>温馨提示：提现申请成功后，请复制页面上的提现码，并前往公众号领取奖金。<a href='javascript:;' @click='cashBtn'>查看领取教程</a></p>
          <button @click='withdrawMethod' >确认提现</button>
        </div>
      </div>
    </div>
    <toast v-model="messageShow" type="text" width="80%" :time='1000'>{{$t(totastText)}}</toast>
    <!-- <back></back> -->
  </div>
</template>
<script>


	import $ from '../../../node_modules/jquery/dist/jquery.min.js'
	import '../../../src/assets/css/common.css'
  import Back from './back.vue'
  import {Toast} from 'vux'
  export default {
    components: {
      Back ,
      Toast
    },
    data () {
     return {
      moneyShow: true ,
      UserInfo:'',
      touchDouble: true,
      messageShow: false,
      enable:true,
      WitdmAount:'',
      totastText: ''
    }
  },
  watch: {
     WitdmAount: function(curVal,oldVal){
        if (this.UserInfo.balance > curVal || this.UserInfo.balance === curVal) {
            this.enable =true
        } else {
            this.enable =false
        }
    }
  },

  created () {
    this.getUserInfo()
  },

  methods: {
    cashBtn () {
      this.$router.push({
        path: '/cashClass',
        name: 'cashClass'
      })
    },
    handleInput(e){
    this.WitdmAount=e.target.value.replace(/[^0-9.]/g, '')
    },
    identifyCodeBtn () {
      var preCode = this.$refs.preCode.value
      if (this.WitdmAount === '') {
        this.messageShow = true
        this.totastText = '提现金额不能为空'
        return
      }
      var telphone = this.$refs.mobile.value
      if (!this.touchDouble) {
        return false
      }
      this.touchDouble = false
      var url = this.$api.wxUrl + 'api/user/vcode?mobile=' + telphone
      this.$http.get(url).then(response => {
        if (response.data.code === 1) {
          this.messageShow = true
          this.totastText = '短信发送成功'
          this.sendCode(59)
        } else {
          if (response.data.msg != null) {
            this.messageShow = true
            this.touchDouble = true
            this.totastText = response.data.msg
          }
        }
      }).catch(error => {
        this.touchDouble = true
        this.messageShow = true
        this.totastText = error.response.data.message
      })
    },
    withdrawMethod () {
      if (!this.enable) {
        this.messageShow = true
        this.totastText = '输入金额不能大于总金额'
        return
      }
      var preCode = this.$refs.preCode.value
      if (this.WitdmAount === '') {
        this.messageShow = true
        this.totastText = '提现金额不能为空'
        return
      } else if (preCode === '') {
        this.messageShow = true
        this.totastText = '短信验证码不能为空'
        return
      }
      var url = this.$api.wxUrl + 'api/wallet/draw'
      var data = {
        vcode: preCode,
        value: this.WitdmAount
      }
      this.$http.post(url, data).then(response => {
        if (response.data.code === 1) {
          this.messageShow = true
          this.totastText = '提现成功'
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
        console.log(error)
        this.messageShow = true
        this.totastText = '网络繁忙'
      })
    },
    getUserInfo () {
      var url = this.$api.wxUrl + '/api/wallet/draw'
      this.$http.get(url).then(response => {
        this.UserInfo = response.data.data
      }).catch(error => {
        console.log(error)
        this.errorShow = true
      })
    },
    sendCode (wait) {
      if (!this.enable) {
         this.messageShow = true
        this.totastText = '输入金额不能大于总金额'
        return
      }
      var code = $('.identifyCodeBtnCashDom')
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
function check(e) {
  var re = /^\d+(?=\.{0,1}\d+$|$)/
  if (e.value !== '') {
    if (!re.test(e.value)) {
      e.value = ''
      e.focus()
    }
  }
}
</script>
<style scoped>
input[disabled]{
  background: #fff;
}
.cash{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  width: 100%;
  min-height: 100%;
  height: auto ! import;
  background: #f5f5f5;
}
.cash-btn{
 margin: 0.13rem auto;
 width: 74%;
 height: 0.42rem;
 line-height: 0.42rem;
 background: #478dfd;
 border-radius: 20px;
 font-size: 14px;
 color: #fff;
}
.money-list-section{
  width: 100%;
  background: #f5f5f5;
}
.icon-box{
  padding-bottom: 0.12rem;
  padding-top: 0.22rem;
  background: #fff;
}
.icon-box-left{
  float: left;
}
.icon-box-left img{
  display: block;
  margin: 0 0.19rem 0 0.13rem;
  width: 0.45rem;
  height: 0.45rem;
}
.icon-box-right{
  float: left;
  text-align: left;
}
.icon-box-right-top span{
  font-size: 16px;
  color: #333;
}
.cash-li input{
  width: 65%;
}
.icon-box-right-top i{
  position: relative;
  top: -0.1rem;
  left: -0.1rem;
  display: inline-block;
  background: url(../../assets/img/bg_img70.png) no-repeat center center;
  background-size: 100% 100%;
  width: 0.6rem;
  height: 0.17rem;
  font-size: 12px;
  color: #fff;
  transform: scale(0.8);
  line-height: 0.17rem;
  text-align: center;
}
.icon-box-right-bottom{
  margin-top: 0.11rem;
  font-size: 14px;
  color: #666;
}
.input-box h2{
  padding: 0.13rem 0 0.15rem 0;
  margin-left: 0.14rem;
  font-size: 14px;
  color: #333;
  text-align: left;
}
.input-box ul li{
  text-align: left;
  height: 0.45rem;
  line-height: 0.45rem;
  background: #fff;
  border-bottom: 1px solid #f4f4f4;
}
.first-li span:nth-of-type(1){
  float: left;
}
.first-li span:nth-of-type(2){
  float: right;
  width: 44%;
  text-align: right;
  height: 0.41rem;
  /*margin-right: 0.15rem;*/
}
.first-li i{
  margin-left: 0.05rem;
  height: 100%;
}
.input-box ul li label{
  display: block;
  height: 100%;
}
.input-box ul li label input{
  display: inline-block;
  height: 80%;
  text-align: right;
  font-size: 14px;
  color: #333;
  outline: none;
  border: none;
}
.input-box ul li label span{
  display: inline-block;
  margin-left: 0.14rem;
  font-size: 14px;
  color: #666;
}
.input-box ul li label i{
  display: inline-block;
  margin-right: 0.16rem;
  font-size: 14px;
  color: #333;
}
.identify-box label{
  display: inline-block ! important;
  width: 72%;
}
.identify-box input{
  width: 59%;
}
.identify-box a{
  float: right;
  margin-top: 0.06rem;
  margin-right: 0.14rem;
  display: inline-block;
  width: 0.79rem;
  height: 0.32rem;
  background: #ff4e4e;
  border-radius: 5px;
  font-size: 12px;
  color: #fff;
  line-height: 0.32rem;
  text-align: center;
}
.telphone-box input{
  float: right;
  margin-right: 0.16rem;
  /*margin-right: 0.1rem;
  width: 64% ! important;*/
}

.input-box ul li:nth-of-type(2){
  margin-bottom: 0.1rem;
}
.promt-box{
  padding: 0.17rem 0 0.14rem 0;
  text-align: left;
}
.promt-box p{
  margin: 0 auto;
  width: 90%;
  font-size: 12px;
  color: #999;
  line-height: 0.2rem;
}
.promt-box p a{
  color: #2068d4 ! important;
}
.promt-box button{
  display: block;
  margin: 0.25rem auto 0;
  width: 80%;
  outline:none;
  height: 0.42rem;
  background: #478dfd;
  border-radius: 20px;
  font-size: 16px;
  color: #fff;
  border: none;
}
.cash-i label{
  display: block;
}
.cash-i label span{
  float: left;
}
.cash-i label input{
  float: left;
}
.input-box label i{
  float: right;
}
</style>