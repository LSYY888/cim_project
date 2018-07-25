$(function () {
	var obj = {}
  var urlObj = ''
  var platformName = ''
  var build = 0
  var channel = ''
  var pub = ''
  var sn = ''
  var imei = ''
  var code_touchDouble = true
  var S = {
    init: function () {
      var self = this
      self.bindEvent()
      self.urlFn(window.location.href)
      urlObj = obj.phoneNumber
      platformName = obj.platformName
      pub = obj.pub
      channel = obj.pub === null || obj.pub === undefined || obj.pub === '' ? obj.channel : obj.pub
      sn = obj.sn
      imei = obj.imei
    },
    urlFn: function (url) {
      /*var name = ''
      var value = ''
      urlObj = url.split('phoneNumber=')[1].split('&')[0]
      platformName = url.split('platformName=')[1].split('&')[0]
      channel = url.split('channel=')[1].split('&')[0]
      ad = url.split('ad=')[1].split('&')[0]
      sn = url.split('sn=')[1].split('&')[0]
      imei = url.split('imei=')[1].split('&')[0]
      console.log(ad)*/
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
      var self = this
      $('.bag-box-title').hide()
      $('.friendShare-container').css('top', 0)
      $(window).on('scroll', function () {
        var scrollTop = $(window).scrollTop()
        if (scrollTop >= 0) {
          $('.bag-box-title').show()
          $('.friendShare-container').css('top', 0.52 + 'rem')
        }
        if (scrollTop <= 10) {
          $('.bag-box-title').hide()
          $('.friendShare-container').css('top', 0)
        }
      });
      //验证码：
      $('.identify_code_a').on("click", function(){
        var reg = /^[1][3,4,5,7,8][0-9]{9}$/
        var login_account_input = $(".login-account-input").val()
        if (login_account_input === '') {
          $.toast({
            text: '手机号不能为空',
            position: 'mid-center',
            stack: false,
            bgColor: 'rgba(51, 51, 51, 0.88)',
            allowToastClose: false,
            textColor: '#fff',
            textAlign: 'center',
            hideAfter: 1000
          })
        } else if (!reg.test(login_account_input)) {
          $.toast({
            text: '手机格式不正确',
            position: 'mid-center',
            stack: false,
            bgColor: 'rgba(51, 51, 51, 0.88)',
            allowToastClose: false,
            textColor: '#fff',
            textAlign: 'center',
            hideAfter: 1000
          })
        } else {
          if ((urlObj === '' || urlObj === undefined || urlObj === null) && (pub === '' || pub === undefined || pub === null) && (channel === '' || channel === undefined || channel === null)) {
            $.toast({
              text: '很抱歉,当前分享链接来自于非正常渠道,无法完成注册！',
              position: 'mid-center',
              stack: false,
              bgColor: 'rgba(51, 51, 51, 0.88)',
            	allowToastClose: false,  
              textColor: '#fff',
              textAlign: 'center',
              hideAfter: 1000
            })
            console.log(pub)
          } else {
            if (!code_touchDouble) {
              return false;
            }
            code_touchDouble = false
            $.ajax({
              url: 'http://api.snair.cn/share/check',
              type: 'get',
              data: {                    
                'friendPhoneNumber': login_account_input,
                'token': S.tokenUrl(),
                'account': urlObj
              },
              success: function (res) {
                if (res.code === 200) {
                  S.sendCode(60)
                  $.ajax({
                    url: 'http://api.snair.cn/user/messageSending',
                    type: 'post',
                    data: JSON.stringify({
                      'phoneNumber': login_account_input,
                      'token': S.tokenUrl()  
                    }),
                    contentType: "application/json",  
                    success: function (res) {
                      if (res.code === 200) {
                        $('.identify_code_input').val(res.data.verifyCode)
                      } else {
                        code_touchDouble = true
                        $.toast({
                          text: res.responseJSON.message,
                          position: 'mid-center',
                          stack: false,
                          bgColor: 'rgba(51, 51, 51, 0.88)',
            							allowToastClose: false,
                          textColor: '#fff',
                          textAlign: 'center',
                          hideAfter: 1000
                        })
                      }
                    },  
                    error: function (res) {
                      if (res.responseJSON.code === 500) {
                        code_touchDouble = true
                        $.toast({
                          text: res.responseJSON.message,
                          position: 'mid-center',
                          stack: false,
                          bgColor: 'rgba(51, 51, 51, 0.88)',
            							allowToastClose: false,
                          textColor: '#fff',
                          textAlign: 'center',
                          hideAfter: 1000
                        })
                      }
                    }
                  })
                } else {
                  $.toast({
                    text: res.responseJSON.message,
                    position: 'mid-center',
                    stack: false,
                    bgColor: 'rgba(51, 51, 51, 0.88)',
                    allowToastClose: false,
                    textColor: '#fff',
                    textAlign: 'center',
                    hideAfter: 1000
                  })
                }
              },
              error: function (res) {
                if (res.responseJSON.code === 500) {
                  code_touchDouble = true
                  $.toast({
                    text: res.responseJSON.message,
                    position: 'mid-center',
                    stack: false,
                    bgColor: 'rgba(51, 51, 51, 0.88)',
            				allowToastClose: false,
                    textColor: '#fff',
                    textAlign: 'center',
                    hideAfter: 1000
                  })
                } else if (res.responseJSON.code === 509) {
                  code_touchDouble = true
                  $.toast({
                    text: '您已注册返返，请前往登陆！',
                    position: 'mid-center',
                    stack: false,
                    bgColor: 'rgba(51, 51, 51, 0.88)',
                    allowToastClose: false,
                    textColor: '#fff',
                    textAlign: 'center',
                    hideAfter: 1000
                  })
                  S.download(platformName, channel, 0)
                } else if (res.responseJSON.code === 99910003) {
                  $.toast({
                    text: res.responseJSON.message,
                    position: 'mid-center',
                    stack: false,
                    bgColor: 'rgba(51, 51, 51, 0.88)',
                    allowToastClose: false,
                    textColor: '#fff',
                    textAlign: 'center',
                    hideAfter: 1000
                  })
                }
              }
            })
          }
        }
      });
      // 点击领取现金红包
      $('.j_get_redbag').on('click', function () {
        var login_account_input = $(".login-account-input").val()
        var identify_code_input = $('.identify_code_input').val()
        if (login_account_input === '') {
          $.toast({
            text: '手机号不能为空',
            position: 'mid-center',
            stack: false,
            bgColor: 'rgba(51, 51, 51, 0.88)',
            allowToastClose: false,
            textColor: '#fff',
            textAlign: 'center',
            hideAfter: 1000
          })
        } else {
          $.ajax({
          	url: 'http://api.snair.cn/share/check',
          	type: 'get',
          	data: {
          		'friendPhoneNumber': login_account_input,
              'token': S.tokenUrl(),
              'account': urlObj
          	},
          	success: function (res) {
          		console.log(channel)
          		if (res.code === 200) {
          			$.ajax({
            			url: 'http://api.snair.cn/share/binding',
            			type: 'post',
			            data: JSON.stringify({
			              'account': urlObj,
			              'friendPhoneNumber': $(".login-account-input").val(),
			              'token': S.tokenUrl(),
			              'verifyCode': $('.identify_code_msg input').val(),
			              'ip': '',
			              'name': '',
			              'channel': channel,
			              'platform': platformName === null || platformName === undefined || platformName === '' ? 'h5' : platformName,
			              'network': '',
			              'version': '',
			              'shareSn': sn,
			              'imei': imei === undefined || imei === null ? '' : imei,
			              'ad': pub === undefined || pub === null ? '' : pub
			            }),
            			contentType: "application/json",
			            success: function (res) {
			              if (res.code === 200) {
			                $('.j_two_input').hide()
			                $('.two-section .info-msg').show()
			              } else {
			                $('.j_two_input').hide()
			                $('.two-section .info-msg').show()
			                $('.two-section .info-msg div').text(res.responseJSON.message)
			              }
			            },
			            error: function (res) {
			              if (res.responseJSON.code === 500) {
			              	if (identify_code_input === '') {
				            		$.toast({
							            text: '验证码不能为空',
							            position: 'mid-center',
							            stack: false,
							            bgColor: 'rgba(51, 51, 51, 0.88)',
							            allowToastClose: false,
							            textColor: '#fff',
							            textAlign: 'center',
							            hideAfter: 1000
							          })
				            	} else {
				            		$.toast({
				                  text: res.responseJSON.message,
				                  position: 'mid-center',
				                  stack: false,
				                  bgColor: 'rgba(51, 51, 51, 0.88)',
				            			allowToastClose: false,
				                  textColor: '#fff',
				                  textAlign: 'center',
				                  hideAfter: 1000
				                })
				            	}
			              } else if (res.responseJSON.code === 99910003) {
                      $.toast({
                        text: res.responseJSON.message,
                        position: 'mid-center',
                        stack: false,
                        bgColor: 'rgba(51, 51, 51, 0.88)',
                        allowToastClose: false,
                        textColor: '#fff',
                        textAlign: 'center',
                        hideAfter: 1000
                      })
                    }
			            }
	          		})
          		} else {
                $.toast({
                  text: res.responseJSON.message,
                  position: 'mid-center',
                  stack: false,
                  bgColor: 'rgba(51, 51, 51, 0.88)',
                  allowToastClose: false,
                  textColor: '#fff',
                  textAlign: 'center',
                  hideAfter: 1000
                })
              }
          	},
          	error: function (res) {
              if (res.responseJSON.code === 500) {
                $.toast({
                  text: res.responseJSON.message,
                  position: 'mid-center',
                  stack: false,
                  bgColor: 'rgba(51, 51, 51, 0.88)',
                  allowToastClose: false,
                  textColor: '#fff',
                  textAlign: 'center',
                  hideAfter: 1000
                })
              } else if (res.responseJSON.code === 509) {
                $.toast({
                  text: '您已注册返返，请前往登陆！',
                  position: 'mid-center',
                  stack: false,
                  bgColor: 'rgba(51, 51, 51, 0.88)',
                  allowToastClose: false,
                  textColor: '#fff',
                  textAlign: 'center',
                  hideAfter: 1000
                })
                S.download(platformName, channel, 0)
              } else if (res.responseJSON.code === 99910003) {
                $.toast({
                  text: res.responseJSON.message,
                  position: 'mid-center',
                  stack: false,
                  bgColor: 'rgba(51, 51, 51, 0.88)',
                  allowToastClose: false,
                  textColor: '#fff',
                  textAlign: 'center',
                  hideAfter: 1000
                })
              }
          	}
          })
        }
      });
      // 点击开启
      $('.start-btn').on('click', function () {
        $(window).scrollTop(0)
      });
      // 下载
      $('.download').on('click', function () {
        var isIOS = /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)
        var isAndroid = /(Android)/i.test(navigator.userAgent)
        if (isAndroid) {
        	S.download(platformName, channel, 0)
        } else if (isIOS) {
          S.download(platformName, channel, 0)
        } else {
          window.location.href = 'http://www.snair.cn'
        }
      });
      $('.friendSharePage-footer-section').on('click', function () {
        var isIOS = /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)
        var isAndroid = /(Android)/i.test(navigator.userAgent)
        if (isAndroid) {
        	S.download(platformName, channel, 0)
        } else if (isIOS) {
          S.download(platformName, channel, 0)
        } else {
          window.location.href = 'http://www.snair.cn'
        }
      })
    },
    download: function (platformName, channel, build) {
      var url = 'http://api.snair.cn/app/package/info'
	    $.ajax({
	      url: url,
	      type: 'get',
	      data: {
	        'token': S.tokenUrl(),
	        'platformName': platformName === null || platformName === undefined || platformName === '' ? 'Android' : platformName,
	        'channel': channel === null || channel === undefined || channel === '' ? '001@fanfan' : channel,
	        'build': build
	      },
	      success: function (res) {
	        if (res.code === 200) {
	          var url = res.data.downloadPackageUrl
	          $.fileDownload(url, {
	            data: '',
	            successCallback: function (url) {
	              layer.closeAll();
	              common.layer.success('下载成功！', function () {
	              });
	            }
	          })
	        } else {
            window.location.href = 'http://www.snair.cn'
          }
	      },
	      error: function () {
        	window.location.href = 'http://www.snair.cn'
        }
	    })
    },
    tokenUrl: function (token) {
      $.ajax({
        url: 'http://api.snair.cn/H5/token',
        type: 'get',
        async: false,
        success: function (response) {
          if (response.code === 200) {
            token = response.data
            console.log(token)
          }
        }
      })
      return token
    },
    sendCode: function (wait) {
      var code = $(".identify_code_a").children('span');
        if (wait === 0) {
          code.attr("disabled", false).text('重发验证码');
          code_touchDouble = true;
          wait = 59;
        } else {
          code.attr("disabled", true).text(wait + '秒后重发');
          wait--;
          setTimeout(function () {
            S.sendCode(wait);
          }, 1000);
        }
      }
    }
  S.init()
});