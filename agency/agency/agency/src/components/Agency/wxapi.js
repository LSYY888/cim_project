import wx from 'weixin-js-sdk'
import api from '../../api/api.js'
import axios from 'axios'
const wxApi = {

 /**
 * [isweixin 判断是否微信浏览器]
 */
 isweixin () {
  const ua = window.navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
   return true
  } else {
   this.$router.push({path: '/wxkj/isnotWechat'})
   return false
  }
 },
 // 这里接着上面的代码
/**
* [wxRegister 微信Api初始化]
* @param  {Function} callback [ready回调函数]
*/
wxRegister (callback) {
    alert('wxRegister')
    wx.config({
     debug: true, // 开启调试模式
     appId: 'wx31fe842141e81d6e', // 必填，公众号的唯一标识
     timestamp: '123', // 必填，生成签名的时间戳
     nonceStr: '568', // 必填，生成签名的随机串
     signature: '489', // 必填，签名
     jsApiList: [
        'onMenuShareAppMessage', // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
        'onMenuShareTimeline' // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
     ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    })
    wx.ready((res) => {
    // 如果需要定制ready回调方法
    if (callback) {
     callback()
    }
 })
},

 ShareTimeline (opstion) { 
  alert('ShareTimeline')
  wx.onMenuShareTimeline({
   title: opstion.title, // 分享标题
   link: opstion.link, // 分享链接
   imgUrl: opstion.imgUrl, // 分享图标
   success () {
    // 用户成功分享后执行的回调函数
    opstion.success()
    alert('成功')
   },
   cancel () {
    // 用户取消分享后执行的回调函数
    opstion.error()
    alert('失败')
   }
 })
},
/**
 * [isWxAuth 微信授权]
 */
 isWxAuth () {
  let localUid = localStorage.getItem('localUid')
  let localToken = localStorage.getItem('localToken')
  if (!localToken) {
   let token = this.$route.query.token
   let uid = this.$route.query.uid
   if (token) {
    localStorage.setItem('localToken', token)
    localStorage.setItem('localUid', uid)
   } else {
    // 将url编码后传给后端，解决微信过滤Vue hash模式 #被过滤的问题
    var u = encodeURIComponent(window.location.href)
    window.location.href = hostName + '/wxpl/oauth?forwardUrl=' + u
   }
  }
}
}
export default wxApi
