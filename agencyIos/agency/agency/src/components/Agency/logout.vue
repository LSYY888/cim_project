<template>
	<div class="logout">
    <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
    <div class="logout-top-box">
      <div class="logout-top-section">
        <div class='top-img'>
          <img :src="Avattar === null ? src : Avattar" @click="clickheadImg($event)" />
        </div>
        <p>{{userHeadinfo.realname === "" ? '未设置姓名' : userHeadinfo.realname}}</p>
        <div class='tag-box'>
          <span v-if="levelTitle">{{userHeadinfo.levelTitle}}</span>
        </div>
      </div>
      <div class="logout-content-section">
        <ul>
          <li class='clearfix' @click='modifyUserInfo'>
            <i class='one-icon'>
              <img src="../../assets/img/bg_img74.png" />
            </i>
            <span>修改基本资料</span>
            <em>></em>
          </li>
          <li class='clearfix two-li' @click='changePwd'>
            <i class='two-icon'>
              <img src="../../assets/img/bg_img75.png" />
            </i>
            <span>修改账号密码</span>
            <em>></em>
          </li>
          <li class='clearfix three-li'>
            <label class="clearfix">
              <i class='three-icon'>
                <img src="../../assets/img/bg_img76.png" />
              </i>
              <span>上传个人头像</span>
              <input type="file" @change="onFileChange"/>
              <em>></em>
            </label>
          </li>
          <li class='clearfix four-li'>
            <label class="clearfix">
              <i class='four-icon'>
                <img src="../../assets/img/bg_img77.png" />
              </i>
              <span>上传微信二维码</span>
              <input type="file" @change="oncodeFileChange" class="code" />
              <em>></em>
            </label>
          </li>
        </ul>
        <div class="qrcode-section">
          <img :src="userHeadinfo.weixinCode" v-if='codeIsshow'  @click="clickImg($event)"/>
        </div>
      </div>
    </div>
		<div class="logout-footer-section" @click='droupOut'>
			<a>退出登录</a>
		</div>
    <toast v-model="messageShow" type="text" width="80%" :time='1000'>{{$t(totastText)}}</toast>
    <div class='loading-box'>
      <p v-show='loding' style="text-align:center;" class='loadingSection'>
        <inline-loading class='weui-loading'></inline-loading><span style="vertical-align:middle;display:inline-block;font-size:14px; ">&nbsp;&nbsp;{{ $t(upmessage) }}</span>
      </p>
    </div>
     
  </div>
</template>
<script>
  import '../../../src/assets/css/common.css'
  import $ from '../../../node_modules/jquery/dist/jquery.min.js'
  import Back from './back.vue'
  import {Toast, InlineLoading} from 'vux'
  import BigImg from '../../components/Agency/bigImg.vue'
  export default {
  	components: {
      Back,
      Toast,
      BigImg,
      InlineLoading
    },
    created () {
      this.getUserinfo()
    },
    inject: ['reload'],
    data () {
      return {
       userHeadinfo: '',
       Avattar: '',
       showImg: false,
       totastText: '',
       upmessage: '',
       loding: false,
       codeIsshow: false,
       messageShow: false,
       levelTitle: false,
       src: require('../../assets/img/bg_img17.png')
     }
   },
   mounted() {
    const self = this
    if (this.judgeIE9) {
      $('body').delegate('.code', 'onFileChange', function() {
        self.uploadByIframe(self.opt)
      })
    }
  },
  methods: {
   getUserinfo () {
    var url = this.$api.wxUrl + 'api/user/info'
    this.$http.get(url).then(response => {
      if (response.data.code === 1) {
        this.userHeadinfo = response.data.data
        this.Avattar = response.data.data.avatar
        if (this.userHeadinfo.weixinCode === null) {
          this.codeIsshow = false
        } else {
          this.codeIsshow = true
        }
        if (this.userHeadinfo.levelTitle === null) {
          this.levelTitle = false
        } else {
          this.levelTitle = true
        }
      }
    })
  },
  handleReload () {
  this.reload()
  },
  droupOut () {
    var url = this.$api.wxUrl + 'api/user/logout'
    this.$http.get(url).then(response => {
     this.$router.go(-1)
   }).catch(error => {
      console.log(error)
     this.errorShow = true
   })
 },
 modifyUserInfo () {
   this.$router.push({
    path: '/person',
    name: 'person'
  })
 },
 changePwd () {
   this.$router.push({
    path: '/ChangePwd',
    name: 'ChangePwd'
  })
 },
 onFileChange(e) {
  this.upmessage = '正在上传个人头像…'
  this.loding = true
  this.updateHead(e)
},
 oncodeFileChange(e) {
 this.upmessage = '正在上传微信二维码...'
 this.loding = true
 this.updateCode(e)
 },
 clickImg (e) {
  this.showImg = true
  this.imgSrc = this.userHeadinfo.weixinCodeSrc
},
clickheadImg (e) {
  this.showImg = true
  if (this.userHeadinfo.avatarSrc === null) {
    return
  }
  this.imgSrc = this.userHeadinfo.avatarSrc
},
viewImg () {
this.showImg = false
},
updateHead (image) {
	var url = this.$api.wxUrl + 'api/user/upload/avatar'
	let file = image.target.files[0]
          let param = new FormData() // 创建form对象
          param.append('imgFile', file, file.name)// 通过append向form对象添加数据
          let config = {
          	headers: {'Content-Type': 'multipart/form-data'}
          }  // 添加请求头
          this.$http.post(url, param, config)
          .then(response => {
            setTimeout(() => {
            this.handleReload()
            this.messageShow = true
            this.totastText = response.data.msg
            this.loding = false
            }, 2000)
          }).catch(error => {
            console.log(error)
            this.loding = false
            this.messageShow = true
            this.totastText = '网络繁忙'
            setTimeout(() => {
              this.handleReload()
            }, 1000)
          })
        },
        updateCode (image) {
          var url = this.$api.wxUrl + '/api/user/upload/weixin'
          let file = image.target.files[0]
          let param = new FormData() // 创建form对象
          param.append('imgFile', file, file.name) // 通过append向form对象添加数据
          let config = {
            headers: {'Content-Type': 'multipart/form-data'}
          } // 添加请求头
          this.$http.post(url, param, config)
          .then(response => {
            setTimeout(() => {
                this.handleReload()
                this.messageShow = true
                this.totastText = response.data.msg
                this.loding = false
              }, 2000)
            }).catch(error => {
              console.log(error)
            this.messageShow = true
            this.totastText = '网络繁忙'
            this.handleReload()
            this.loding = false
          })
        }
      }
    }
  </script>
  <style scoped>
  .logout{
  	position: absolute;
  	top: 0;
  	left: 0;
  	right: 0;
  	width: 100%;
  	min-height: 100%;
  	height: auto ! important;
  	background: #f5f5f5;
  }
  .loadingSection{
    position: absolute;
    z-index: 200;
    top: 47%;
    left: 27%;
  }
  /*.loading-box{
    position: absolute;
    z-index: 200;
    top: 50%;
    left: auto;
    width: 200px;
    height: 200px;
    background: #f5d5d5;
  }*/
  .logout-top-box{
    position: absolute;
    padding-bottom: 0.1rem;
    top: 0;
    left: 0;
    bottom: 0.64rem;
    overflow: auto;
  }
  .qrcode-section{
    margin: 0.15rem auto 0;
    width: 50%;
  }
  .qrcode-section img{
    display: block;
    width: 100%;
    height: 100%;
  }
  .logout-top-section{
  	padding-top: 0.25rem;
  	width: 100%;
  	height: 1.6rem;
  	background: #373b3e;
  }
  .logout-top-section p{
  	margin-top: 0.18rem;
  	text-align: center;
  	font-size: 18px;
  	color: #fff;
  }
  .tag-box{
  	position: absolute;
  	top: 0.41rem;
  	right: 25%;
  }
  .tag-box span{
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
  .top-img{
  	margin: 0 auto;
  	width: 0.72rem;
  	height: 0.72rem;
  	border: 3px solid #4a4b4f;
  	border-radius: 100%;
  }
  .top-img img{
  	display: block;
  	width: 100%;
  	height: 100%;
    border-radius: 100%;
  }
  .logout-content-section ul li{
  	background: #fff;
  	border-bottom: 1px solid #f4f4f4;
  	height: 0.53rem;
  	line-height: 0.5rem;
  }
  .logout-content-section ul li i{
  	float: left;
  }
  .logout-content-section ul li span{
  	float: left;
  	font-size: 16px;
  	color: #2a2a2a;
  }
  .logout-content-section ul li em{
  	float: right;
  	margin-right: 0.17rem;
  	font-size: 22px;
  	color: #a6a6a6;
  }
  .one-icon{
  	margin: 0.19rem 0.25rem;
  	width: 0.14rem;
  	height: 0.12rem;
    font-size: 14px;
  }
  .two-icon{
  	margin: 0.19rem 0.25rem;
  	width: 0.15rem;
  	height: 0.12rem;
  }
  .three-icon{
    float: left;
  	margin: 0.19rem 0.25rem;
  	width: 0.14rem;
  	height: 0.14rem;
  }
  .four-icon{
    float: left;
  	margin: 0.19rem 0.25rem;
  	width: 0.14rem;
  	height: 0.14rem;
  }
  .logout-footer-section{
  	position: fixed;
  	height: 0.64rem;
  	background: #fff;
  	left: 0;
  	bottom: 0;
  	width: 100%;
  }
  .logout-footer-section a{
  	display: block;
  	margin: 0.12rem auto 0;
  	background: #f92829; 
  	border-radius: 2px;
  	height: 0.41rem;
  	line-height: 0.41rem;
  	width: 70%;
  	font-size: 14px;
  	color: #fff;
  }
  .three-li label{
  	display: block;
  	font-size: 16px;
  	color: #2a2a2a;
  	height: 0.53rem;
  	width: 100%;
  }
  .three-li label input{
  	display: block;
  	float: left;
  	width: 10%;
  	height: 0.53rem;
  	opacity: 0;
  }
  .four-li{
  	border: 1px solid #fff;
  }
  .four-li label{
  	display: block;
  	float: left;
  	width: 100%;
  	height: 0.53rem;
  }
  .four-li label span{
  	float: left;
  }
  .four-li label input{
  	display: block;
  	float: left;
  	width: 10%;
  	height: 0.53rem;
  	opacity: 0;
  }
  .weui-loading{
    width: 40px;
    height: 40px;
  }
</style>