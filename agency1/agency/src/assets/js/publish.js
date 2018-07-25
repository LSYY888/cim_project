$(function () {
  var obj = {}
  var sn = ''
  var I = {
    init: function () {
      var self = this
      self.urlFn(window.location.href)
      sn = obj.sn
      self.bindEvent()
    },
    urlFn: function (url) {
      var name = ''
      var value = ''
      var str = window.location.href
      var num = str.indexOf('?')
      str = str.substr(num + 1)
      var arr = str.split('&')
      for (var i = 0; i < arr.length; i++) {
        num = arr[i].indexOf('=')
        if (num > 0) {
          name = arr[i].substring(0, num)
          value = arr[i].substr(num + 1)
          obj[name] = value
        }
      }
    },
    bindEvent: function () {
      $.ajax({
        url : 'http://api.snair.cn/landingPage',
        type: 'get',
        data: {
          'sn': sn,
          'token': I.tokenUrl()
        },
        success: function (res) {
          if (res.code === 200) {
            $('.iframe').attr('src', Base64.decode(res.data))
            console.log(Base64.decode(res.data))
          }
        }
      })
      $('#iframe').load(function () {
        var ifm= document.getElementById("iframe");
        ifm.height=document.documentElement.clientHeight;
        ifm.width=document.documentElement.clientWidth;
      })
      window.onresize=function(){  
       var ifm= document.getElementById("iframe");
        ifm.height=document.documentElement.clientHeight;
        ifm.width=document.documentElement.clientWidth;
      } 
    },
    tokenUrl: function (token) {
      $.ajax({
        url: 'http://api.snair.cn/H5/token',
        type: 'get',
        async: false,
        success: function (response) {
          if (response.code === 200) {
            token = response.data
          }
        }
      })
      return token
    }
  }
  I.init()

 
})