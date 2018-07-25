$(function () {
  var sessionId = ''
  var D = {
    init: function () {
      var self = this
      self.bindEvent()
      self.urlFn(window.location.href)
      if (sessionId !== '') {
      /*$('.top-content-section button').text('立即邀请拿500元红包')
      $('.top-content-section p').addClass('loginInviteState')
      $('.top-content-section button').addClass('loginNowBtn')*/
    } else{
      /*$('.top-content-section p').addClass('nothingInviteState')
      $('.top-content-section button').addClass('nothingNowBtn')
      $('.top-content-section button').text('登录后邀请即拿500元红包')*/
    }
    },
    bindEvent: function () {
      var str = ''
      var twoStr = ''
      var self = this
      str += '<div class="mask-content-head clearfix">'+
                '<h2>'+
                  '<img src="../../img/bg30.png" />'+
                '</h2>'+
              '</div>'+
              '<div class="mask-content-container">'+
                '<div class="content-section">'+
                  '<span>邀请好友首投>=10000元</span>'+
                '</div>'+
                '<ul>'+
                  '<li>'+
                    '<div class="left">好友首投第一次</div>'+
                    '<div class="right">你可得<i class="red">110元</i></div>'+
                  '</li>'+
                  '<li>'+
                    '<div class="left">好友首投第二次</div>'+
                    '<div class="right">你再得<i class="red">80元</i></div>'+
                  '</li>'+
                  '<li>'+
                    '<div class="left">好友首投第三次</div>'+
                    '<div class="right">你再得<i class="red">120元</i></div>'+
                  '</li>'+
                  '<li>'+
                    '<div class="left">好友首投第四次</div>'+
                    '<div class="right">你在得<i class="red">70元</i></div>'+
                  '</li>'+
                  '<li>'+
                    '<div class="left">好友首投第五次</div>'+
                    '<div class="right">你再得<i class="red">120元</i></div>'+
                  '</li>'+
                '</ul>'+
                '<div class="active-process">'+
                    '<p>1.每位好友完成投资返返提供的理财活动5次，且每次均大于等于10000元的投资，您共获得最高500元现金奖励，奖励以实际投资金额为准；</p>'+
                    '<p>2.好友投资返返提供的任意理财活动均可激活邀请奖励；</p>'+
                '</div>'+
              '</div>'+
              '<div class="mask-footer">'+
                '<a href="javascript:;"">我知道了</a>'+
              '</div>'
      twoStr += '<div class="mask-content-head clearfix">'+
                '<h2>'+
                  '活动说明'+
                '</h2>'+
              '</div>'+
              '<div class="mask-content-container">'+
                '<ul>'+
                  '<li>'+
                    '1.活动期间每邀请1位好友在返返参与理财投资，最高可获得500元现金红包，好友需在被邀请前未安装和未注册过返返及系列产品；'+
                  '</li>'+
                  '<li>'+
                    '2.好友在前5次参与理财投资并领取首投返利后，邀请人均可按照规则依次激活对应邀请奖励红包，<i>每周奖励将于次周的周一进行统计，并在3个工作日内发放完毕</i>；'+
                  '</li>'+
                  '<li>'+
                    '3.邀请活动参与期次以实际进行登记的时间为准，并按照该期活动进行奖励；'+
                  '</li>'+
                  '<li>'+
                    '4.如发现作弊，刷奖行为（包括但不限于相同的设备多账号投资），返返有权取消获奖资格；'+
                  '</li>'+
                  '<li>'+
                    '5.理财投资为用户自愿行为，风险责任自担，返返仅提供活动展示，市场有风险，投资需谨慎；'+
                  '</li>'+
                '</ul>'+
                '<div>'+
                  '<h6><i>*</i>特别注意：</h6>'+
                  '<p>邀请好友时，您必须先登录返返app，否则分享出去的链接为无效链接，无法正常获取邀请好友红包奖励。</p>'+
                  '<p>1、活动期间每邀请一位好友<i>投资指定理财活动</i>，均可获得500元现金红包大礼，红包根据好友投资次数分批发放；</p>'+
                  '<p>2、好友成功受邀注册后，在3个月内的前5次投资并领取投资返利都会依次激活相应的金额；</p>'+
                  '<p>3、红包激活时间以受邀好友领取返利的时间为准。可点击【红包详情】了解具体指定理财活动。</p>'+
                '</div>'+
              '</div>'+
              '<div class="mask-footer-section">'+
                '<a href="javascript:;">我知道了</a>'+
              '</div>'
      $('.bag-box-title').hide()
      $('.bag-box-container').css('top', 0)
      $('.redbake-detail-alert').on('click', function () {
        $('.alert-vue').show()
        $('.mask-box-content').html('')
        $('.mask-box-content').append(str)
        self.dialog($('.mask-box'))
        $('.mask-footer a').on('click', function () {
          $('.alert-vue').hide()
        });
        $('.mask-layer').on('click', function () {
          $('.alert-vue').hide()
        });
      });
      $('.top-section-right').on('click', function () {
        $('.avtive-state-alert-vue').show()
        $('.mask-content').html('')
        $('.mask-content').append(twoStr)
        self.dialog($('.mask-box-section'))
        $('.mask-footer-section').on('click', function () {
          $('.avtive-state-alert-vue').hide()
        });
        $('.mask-layer').on('click', function () {
          $('.avtive-state-alert-vue').hide()
        });
      });
      // 立即邀请赚500元现金红包
      $('.top-content-section button').on('click', function () {
        var sn = $("input[type='hidden']").val()
        var isIOS = /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)
        var isAndroid = /(Android)/i.test(navigator.userAgent)
        if (isAndroid) {
          window.forAndroid.NativeBridge(sn, 125)
        } else {
          console.log(isIOS)
        }
      })
    }, 
    urlFn: function (url) {
      var name = ''
      var value = ''
      sessionId = url.split('sessionId=')[1].split('&')[0]
    },
    dialog: function (obj) {
      // obj是弹出框的整个对象
      var screenWidth = window.screen.width
      var screenHeight = window.screen.height
      // 获取屏幕宽高
      var scrollTop = $(window).scrollTop()
      console.log(scrollTop)
      // 当前窗口距离页面顶部的距离
      var objTop = (screenHeight - obj.height()) / 2
      // 当前窗口距离页面左侧的距离
      var objLeft = (screenWidth - obj.width()) / 2
      // 弹出框距离顶部的距离
      obj.css({
        left: objLeft + 'px',
        top: objTop + 'px'
      });
      // 当窗口大小发生改变时
      $(window).resize(function () {
        screenWidth = $(window).width()
        screenHeight = $(window).height()
        var scrollTop = $(window).scrollTop()
        var objTop = (screenHeight - obj.height()) / 2 - scrollTop / 2
        var objLeft = (screenWidth - obj.width()) / 2
        obj.css({
          left: objLeft + 'px',
          top: objTop + 'px'
        });
      });
      // 当滚动条发生变化时
      $(window).scroll(function () {
        var screenWidth = window.screen.width
        var screenHeight = window.screen.height
        var scrollTop = $(window).scrollTop()
        var objTop = (screenHeight - obj.height()) / 2
        var objLeft = (screenWidth - obj.width()) / 2
        obj.css({
          left: objLeft + 'px',
          top: objTop + 'px'
        });
      });
    },
    openMak: function () {
      document.body.addEventListener('touchmove', handler, false)
      document.body.addEventListener('wheel', handler, false)
    },
    closeMask: function () {
      document.body.removeEventListener('touchmove', handler, false)
      document.body.removeEventListener('wheel', handler, false)
    }
  }
  D.init()
})