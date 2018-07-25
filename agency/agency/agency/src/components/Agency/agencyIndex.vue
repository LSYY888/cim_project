  <template>
  <div class="official-account-index">
    <section class="banner-section">
      <img :src="headImg" class="banner-img"/>
      <div class="user-image" @click="userImage">
        <a href="javascript:;">
          <img :src="avatar === null ? src : avatar" />
        </a>
      </div>
      <div class="banner-footer-section">
        <h2>账户总览</h2>
        <div class='total-income'>
          <p>账户余额<i>(元)</i></p>
          <p><b><countup :end-val="totalmoney" :duration="1" :decimals="2"></countup></b></p>
        </div>
        <ul class='recome-balance-message'>
          <li>
            <div class='recome'>
              <span>总收入(元)：<i>{{totalMoneyData.totalRevenue == null ? 0:totalMoneyData.totalRevenue}}</i></span>
            </div>
            <div class='balance'>
              <span>总支出(元)：<i>{{totalMoneyData.totalExpense == null ? 0:totalMoneyData.totalExpense}}</i></span>
            </div>
          </li>
        </ul>
        <ul class='detail-cash-message'>
          <li>
            <div class='detail' @click='detail'>
              <span><i></i></span>
              <em>明细</em>
            </div>
            <div class='cash' @click='withDrawmoney'>
              <span><i></i></span>
              <em>提现</em>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <section class="contain-section">
      <div class="tab-list-section">
        <ul class="tab">
          <li>
            <a href="javascript:;" @click='proxyUrl'>
              <i class="icon-three">
                <img src="../../assets/img/bg_img37.png" />
              </i>
              <span>邀请代理</span>
            </a>
          </li>
          <li>
            <a href="javascript:;" @click='invitUrl'>
              <i class="icon-five">
                <img src="../../assets/img/bg_img38.png" />
              </i>
              <span>邀请办卡</span>
            </a>
          </li>
          <li>
            <a href="javascript:;" @click='financingUrl'>
              <i class="icon-six">
                <img src="../../assets/img/bg_img39.png" />
              </i>
              <span>邀请理财</span>
            </a>
          </li>
          <li>
            <a href="javascript:;" @click='material'>
              <i class="icon-four">
                <img src="../../assets/img/bg_img40.png" />
              </i>
              <span>推广素材</span>
            </a>
          </li>
          <li @click='orderListUrl'>
            <a href="javascript:;">
              <i class="icon-one">
                <img src="../../assets/img/bg_img41.png">
              </i>
              <span>订单明细</span>
            </a>
          </li>
          <li @click='teamUrl'>
            <a href="javascript:;">
              <i class="icon-seven">
                <img src="../../assets/img/bg_img42.png" />
              </i>
              <span>团队管理</span>
            </a>
          </li>
          <li>
            <a href="javascript:;" @click='agencyPriceUrl'>
              <i class="icon-two">
                <img src="../../assets/img/bg_img43.png" />
              </i>
              <span>代理价格</span>
            </a>
          </li>
          <li @click='chargeSetUrl'>
            <a href="javascript:;">
              <i class="icon-eight">
                <img src="../../assets/img/bg_img44.png" />
              </i>
              <span>佣金设置</span>
            </a>
          </li>
          <li @click='incomeAndExpenseUrl'>
            <a href="javascript:;">
              <i class="icon-nine">
                <img src="../../assets/img/bg_img45.png" />
              </i>
              <span>收支明细</span>
            </a>
          </li>
          <li>
            <a href="javascript:;" @click='trainingClassUrl'>
              <i class="icon-ten">
                <img src="../../assets/img/bg_img46.png" />
              </i>
              <span>培训课堂</span>
            </a>
          </li>
          <li>
            <a href="javascript:;" @click='system'>
              <i class="icon-eleven">
                <img src="../../assets/img/bg_img47.png" />
              </i>
              <span>系统公告</span>
            </a>
          </li>
          <li @click='customServieUrl'>
            <a href="javascript:;">
              <i class="icon-twelve">
                <img src="../../assets/img/bg_img9.png" />
              </i>
              <span>我的客服</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="hot-artical-section">
        <h2>新手攻略</h2>
        <div class='clearfix firstImg' @click='arcOne'>
          <img src='../../assets/img/bg_img84.png'/>
        </div>
        <div class='clearfix firstImg firstImgClass' @click='arcFive'>
          <img src="../../assets/img/bg_img130.jpg" />
        </div>
        <h2>热门文章</h2>
        <dl class='clearfix' @click='arcFour'>
          <dt>
            <img src='../../assets/img/bg_img31.png'/>
          </dt> 
          <dd>
            <h3>你和美好生活之间,还差一张信用卡!</h3>
            <p>早在前几年,身边好多人都没有信用卡;不过近几年,身边越来越多...</p>
          </dd>
        </dl>
        <dl class='clearfix arcTwo' @click='arcTwo'>
          <dt>
            <img src='../../assets/img/bg_img80.png'/>
          </dt>
          <dd>
            <h3 class='h3'>白户首次申请信用卡,该选择哪些银行容易下卡?</h3>
            <p>对于白户(或者三无，条件不给力的群体)可能想申请一张信用卡...</p>
          </dd>
        </dl>
        <dl class='clearfix' @click='arcThree'>
          <dt>
            <img src='../../assets/img/bg_img81.png'/>
          </dt>
          <dd>
            <h3 class='h3'>信用黑户能办信用卡吗?</h3>
            <p>征信黑是指的是银行对个人信用的不良评价,会直接影响到个人...</p>
          </dd> 
        </dl>
        <dl class='clearfix' @click='arcSix'>
          <dt>
            <img src='../../assets/img/bg_img93.png'/>
          </dt>
          <dd>
            <h3 class='h3'>3分钟搞懂,信用卡批卡内幕!</h3>
            <p>来说说你不知道的信用卡初审内幕...</p>
          </dd> 
        </dl>
        <dl class='clearfix' @click='arcSeven'>
          <dt>
            <img src='../../assets/img/bg_img133.png'/>
          </dt>
          <dd>
            <h3>[银行内部资料]看懂再申请信用卡,保证你下卡!</h3>
            <p>经常有小伙伴对小编说,申请信用卡怎么这么难啊,总是被拒绝...</p>
          </dd> 
        </dl>
        <dl class='clearfix' @click='arcEight'>
          <dt>
            <img src='../../assets/img/bg_img142.png'/>
          </dt>
          <dd>
            <h3>史上最全,各行信用卡申请攻略!看这一篇就够了</h3>
            <p>有很多朋友,申卡是比较难的,除了包装等细节没有做好,剩下.....</p>
          </dd> 
        </dl>
        <dl class='clearfix' @click='arcNine'>
          <dt>
            <img src='../../assets/img/bg_img137.png'/>
          </dt>
          <dd>
            <h3>最强攻略！信用卡养卡和快速提额的核心法则！</h3>
            <p>第一个2，就是俩大原则，第二个2，就是提额的俩大核心....</p>
          </dd> 
        </dl>
        <dl class='clearfix' @click='arcTen'>
          <dt>
            <img src='../../assets/img/bg_img143.png'/>
          </dt>
          <dd>
            <h3>信用卡面签被拒？一定是没掌握这几点</h3>
            <p>各家银行对信用卡面签的规定不一，有的银行是在下卡之后，通知....</p>
          </dd> 
        </dl>
        <dl class='clearfix' @click='arcEleven'>
          <dt>
            <img src='../../assets/img/bg_img144.png'/>
          </dt>
          <dd>
            <h3>2018年信用卡提额排名大盘点</h3>
            <p>笔者认为，使用信用卡提额快的银行才能快速提升自己的信用....</p>
          </dd> 
        </dl>
      </div>
    </section>
    <div v-transfer-dom>
      <confirm
      v-model="show4"
      :close-on-confirm="false"
      :title="$t('重要通知')"
      :show-cancel-button="false"
      @on-confirm="onConfirm4">
        <p style="text-align:left; color:#ff0000; padding-top:10px;padding-bottom:6px;line-height: 21px;">{{tips}}</p>
      </confirm>
    </div>
    <section class="footer-section">
      <h2>来返返<i>.</i>赚翻翻</h2>
      <p>
        <span>客服热线: <i>010-64743351</i></span>
        <span>商务合作: <i>ding@mnn.cn</i></span>
      </p>
      <p>qufanfan.cn</p>
    </section>
  </div>
  </template>
  <script>
  import $ from '../../../node_modules/jquery/dist/jquery.min.js'
  import '../../../src/assets/css/common.css'
  import {Countup, Confirm ,TransferDomDirective as TransferDom} from 'vux'
  export default {
    directives: {
       TransferDom
      },
  	components: {
      Countup,
      Confirm
  	},
    /*beforeCreate () {
      if (localStorage.getItem('code') == 'false') {
        this.$router.push({
          path: '/login',
          name: 'login'
        })
      }  
    },*/
    created () {
      this.getUrl(window.location.href)
      this.tips = this.urlObj.tips
      if (this.tips === '' || this.tips === null || !this.tips) {
        // this.show4 = false
      } else {
        // this.show4 = true
        this.tips = decodeURIComponent(this.tips)
        localStorage.setItem('tips', this.tips)
      }
      var url = this.$api.wxUrl + 'api/user/info'
      this.infoMobile = localStorage.getItem('infoMobile')
      this.$http.get(url).then(response => {
        if (response.status === 200) {
          this.avatar = response.data.data.avatar
          localStorage.setItem('sn', '')
          localStorage.setItem('tag', response.data.data.tag)
          localStorage.setItem('infoRealname', response.data.data.realname)
          localStorage.setItem('infoMobile', response.data.data.mobile)
          localStorage.setItem('infoAvatar', response.data.data.avatar)
          localStorage.setItem('infoDirect', response.data.data.direct)
          localStorage.setItem('teamRealname', '')
          localStorage.setItem('teamMobile', '')
          localStorage.setItem('teamAvatar', '')
          localStorage.setItem('teamDirect', '')
          this.personSn = response.data.data.sn
          console.log(this.avatar)
        }
      }).catch(error => {
        this.errorMsg = error.status
        console.log(this.errorMsg)
      })
      this.totalMoney ()
    },
    mounted () {
      // headImg
      var headImgUrl = this.$api.wxUrl + 'api/config/setting'
      this.$http.get(headImgUrl).then(response => {
        if (response.data.code === 1 && response.data.data !== null && (response.data.data.logo !== null || response.data.data.logo !== undefined || response.data.data.logo !== '')) {
          this.headImg = response.data.data.logo
        } else {
          this.headImg = this.headDefaultImg
        }
      }) 
    },
    data () {
      return {
       urlObj: {},
       status: '',
       personSn: '',
       infoMobile:'',
       doStart: false,
       totalmoney: 0,
       totalMoneyData:'',
       errorMsg: '',
       avatar: '',
       src: require('../../assets/img/bg_img18.png'),
       headDefaultImg: require('../../assets/img/bg_img1.png'),
       headImg: '',
       tips: '',
       show4: false
     }
   },
   methods: {
    onConfirm4 () {
      this.show4 = false
    },
    detail () { // 明细
      this.$router.push({
        path: '/incomeAndExpense',
        name: 'incomeAndExpense'
      })
    },
    arcOne () {
      this.$router.push({
        path: '/hotOneArtical',
        name: 'hotOneArtical'
      })
    },
    arcFive () {
      this.$router.push({
        path: '/trainingClassCard',
        name: 'trainingClassCard'
      })
    },
    arcSix () {
      this.$router.push({
        path: '/hotFiveArtical',
        name: 'hotFiveArtical'
      })
    },
    arcSeven () {
      this.$router.push({
        path: '/hotSixArtical',
        name: 'hotSixArtical'
      })
    },
    arcEight () {
      this.$router.push({
        path: '/hotSevenArtical',
        name: 'hotSevenArtical'
      })
    },
    arcNine () {
      this.$router.push({
        path: '/hotEightArtical',
        name: 'hotEightArtical'
      })
    },
    arcTen () {
      this.$router.push({
        path: '/hotNineArtical',
        name: 'hotNineArtical'
      })
    },
    arcEleven () {
      this.$router.push({
        path: '/hotTenArtical',
        name: 'hotTenArtical'
      })
    },
    totalMoney () {
      var url = this.$api.wxUrl + 'api/wallet/info' 
      this.$http.get(url).then(response =>{
        if (response.data.code === 1) {
          this.totalMoneyData = response.data.data
          this.totalmoney = this.totalMoneyData.cashBalance
        }
      })
    },
    arcFour () {
      this.$router.push({
        path: '/hotFourArtical',
        name: 'hotFourArtical'
      })
    },
    arcTwo () {
      this.$router.push({
        path: '/hotTwoArtical',
        name: 'hotTwoArtical'
      })
    },
    withDrawmoney () {
      this.$router.push({
        path: '/cash',
        name: 'cash'
      }) 
    },
    arcThree () {
      this.$router.push({
        path: '/hotThreeArtical',
        name: 'hotThreeArtical'
      })
    },
  		userImage () { // 个人信息
       this.$router.push({
        path: '/logout',
        name: 'logout'
      })
     },
  		agencyPriceUrl () { // 代理价格
        this.$router.push({
          path: '/agencyCreditCardDetail',
          name: 'agencyCreditCardDetail'
        })
      },
  		processUrl () { // 进度查询
        this.$router.push({
          path: '/processCheck',
          name: 'processCheck',
          params: {}
        })
      },
  		customServieUrl () { // 个人中心
       this.$router.push({
        path: '/customServie',
        name: 'customServie'
      })
     },
      userUrl () { // 用户中心
        this.$router.push({
          path: '/user',
          name: 'user'
        })
      },
      teamUrl () { // 团队
       this.$router.push({
        path: '/team',
        name: 'team',
        params: {
            sn: 'all'
          }
      })
     },
      proxyUrl () { // 邀请代理
        this.$router.push({
          path: '/proxyPosters',
          name: 'proxyPosters'
        })
      },
      invitUrl () { // 邀请办卡
       this.$router.push({
        path: '/invitCard',
        name: 'invitCard'
      })
     },
      financingUrl () { // 邀请理财
        this.show4 = true
        this.tips = '由于近期P2P行业爆发的集中兑付风险，为了避免投资者损失，公司已下线了所有理财产品推广，感谢您的理解与支持！'
      },
      trainingClassUrl () { // 培训课堂
        this.$router.push({
          path: '/trainingClass',
          name: 'trainingClass'
        })
      },
      chargeSetUrl () { // 佣金设置
        this.$router.push({
          path: '/chargeSetIndex',
          name: 'chargeSetIndex'
        })
      },
      orderListUrl () { // 订单明细
       localStorage.setItem('teamSn', '')
       this.$router.push({
         // 置换本地的地址
         path: '/orderList',
         name: 'orderList'
       })
      },
      incomeAndExpenseUrl () {
        this.$router.push({
          path: '/incomeAndExpense',
          name: 'incomeAndExpense'
        })
      },
      material () { // 推广素材
        this.$router.push({
          path: '/materialTab',
          name: 'materialTab'
        })
      },
      system () {
        this.$router.push({
          path: '/system',
          name: 'system'
        })
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
      tokenUrl (token) {
        $.ajax({
          url: this.$api.baseUrl + 'H5/token',
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
  }
  </script>
  <style scoped>
  img[src=""]{
    opacity: 0;
  }
  .firstImgClass{
    margin-top: 0.1rem;
  }
  .firstImg img{
    margin: 0 auto;
    width: 94%;
  }
  .official-account-index{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    min-height: 100%;
    height: auto ! important;
    background: #f4f4f4;
    overflow: auto;
  }
  @media screen and (min-width: 750px){
    .official-account-index{
      margin: 0 auto;
      height: 100%;
      width: 750px;
      background: #000;
    }
  }
  .banner-section{
  position: relative;
  height: 2.25rem;
  }
  .banner-section .banner-img{
  display: block;
  width: 100%;
  height: 100%;
  }
  .banner-section .user-image{
  position: absolute;
  top: 0.36rem;
  right: 0.34rem;
  width: 0.47rem;
  height: 0.47rem;
  }
  .banner-section .user-image img{
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  }
  .banner-footer-section{
  position: relative;
  top: -1.06rem;
  margin: 0 auto;
  width: 90%;
  background: #fff;
  box-shadow: 0px 5px 19px 1px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  }
  @media screen and (min-width: 750px){
  .banner-footer-section{
   position: absolute;
   left: 30%;
   bottom: -1.06rem;
   width: 3.06rem;
   height: 1.96rem;
   box-shadow: 0px 5px 19px 1px rgba(0, 0, 0, 0.1);
   border-radius: 5px;
  }
  }
  .banner-footer-section h2{
  padding-top: 0.1rem;
  margin: 0 0 0.08rem 0.11rem;
  text-align: left;
  font-size: 14px;
  color: #000;
  }
  .total-income p:nth-of-type(1){
  margin-bottom: 0.12rem;
  font-size: 14px;
  color: #333;
  }
  .total-income p:nth-of-type(2){
  margin-bottom: 0.11rem;
  font-size: 24px;
  color: #000;
  }
  .total-income p:nth-of-type(3){
  font-size: 12px;
  color: #999;
  transform:scale(0.9);
  }
  .recome-balance-message{
  padding: 0.35rem 0 0.14rem 0;
  border-bottom: 1px solid #f4f4f4;
  font-size: 14px;
  }
  .banner-footer-section ul li{
  display: flex;
  }
  .banner-footer-section ul li div{
  flex: 1;
  text-align: center;
  font-weight: bold;
  }
  .banner-footer-section ul li .recome{
  border-right: 1px solid #f4f4f4;
  }
  .detail-cash-message{
  height: 0.45rem;
  line-height: 0.45rem;
  }
  .detail-cash-message span{
  display: inline-block;
  }
  .detail-cash-message i{
  position: relative;
  top: 0.05rem;
  }
  .detail-cash-message .detail i{
  display: inline-block;
  background: url(../../assets/img/bg_img24.png) no-repeat center center;
  background-size: 100% 100%;
  width: 0.21rem;
  height: 0.21rem;
  }
  .detail-cash-message .detail em{
  display: inline-block;
  margin-left: 0.06rem;
  }
  .detail-cash-message .cash em{
  display: inline-block;
  margin-left: 0.06rem;
  }
  .detail-cash-message .cash i{
  display: inline-block;
  background: url(../../assets/img/bg_img23.png) no-repeat center center;
  background-size: 100% 100%;
  width: 0.2rem;
  height: 0.2rem;
  }
  .tab-list-section{
  padding-top: 1.37rem;
  padding-bottom: 0.16rem;
  background: #fff;
  }
  .tab-list-section .tab{
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  }
  .tab-list-section .tab li{
  text-align: center;
  width: 25%;
  }
  .tab-list-section .tab li:nth-of-type(2) span{
  margin-top: 0.04rem;
  }
  .tab-list-section .tab li:nth-of-type(3) span{
  margin-top: 0.03rem;
  }
  .tab-list-section .tab li:nth-of-type(4) span{
  margin-top: 0.08rem;
  }
  .tab-list-section .tab li:nth-of-type(5) span{
  margin-top: 0.03rem;
  }
  .tab-list-section .tab li:nth-of-type(6) span{
  margin-top: 0.05rem;
  }
  .tab-list-section .tab li:nth-of-type(7) span{
  margin-top: 0.02rem;
  }
  .tab-list-section .tab li:nth-of-type(8) span{
  margin-top: 0.05rem;
  }
  .tab-list-section .tab li:nth-of-type(9) span{
  margin-top: 0.03rem;
  }
  .tab-list-section .tab li:nth-of-type(10) span{
  margin-top: 0.03rem;
  }
  .tab-list-section .tab li:nth-of-type(11) span{
  margin-top: 0.03rem;
  }
  .tab-list-section .tab li:nth-of-type(12) span{
  margin-top: 0.03rem;
  }
  .tab-list-section .tab li a i{
  display: inline-block;
  }
  .tab-list-section .tab li a i img{
  display: block;
  width: 100%;
  height: 100%;
  }
  .tab-list-section .tab li a span{
  display: block;
  font-size: 12px;
  color: #666;
  }
  .icon-one{
  margin-bottom: 0.16rem;
  width: 0.31rem;
  height: 0.31rem;
  }
  .icon-two{
  margin-bottom: 0.16rem;
  width: 0.32rem;
  height: 0.32rem;
  }
  .icon-three{
  margin-bottom: 0.16rem;
  width: 0.39rem;
  height: 0.34rem;
  }
  .icon-four{
  margin-bottom: 0.11rem;
  margin-top: 0.03rem;
  width: 0.32rem;
  height: 0.28rem;
  }
  .icon-five{
  margin-bottom: 0.14rem;
  width: 0.34rem;
  height: 0.32rem;
  }
  .icon-six{
  margin-bottom: 0.13rem;
  width: 0.3rem;
  height: 0.34rem;
  }
  .icon-seven{
  margin-bottom: 0.12rem;
  width: 0.34rem;
  height: 0.33rem;
  }
  .icon-eight{
  margin-bottom: 0.12rem;
  width: 0.33rem;
  height: 0.33rem;
  }
  .icon-nine{
  margin-bottom: 0.12rem;
  width: 0.31rem;
  height: 0.32rem;
  }
  .icon-ten{
  margin-bottom: 0.12rem;
  width: 0.35rem;
  height: 0.32rem;
  }
  .icon-eleven{
  margin-bottom: 0.12rem;
  width: 0.32rem;
  height: 0.32rem;
  }
  .icon-twelve{
  margin-bottom: 0.12rem;
  width: 0.3rem;
  height: 0.32rem;
  }
  .tab-list-section .tab li{
  margin-bottom: 0.27rem;
  }
  .new-active-section h2{
  margin: 0.13rem 0 0.12rem 0.16rem;
  font-size: 16px;
  color: #666;
  }
  .big-banner li{
  margin: 0 0.11rem;
  height: 1.17rem;
  }
  .big-banner li a img{
  display: block;
  width: 100%;
  height: 100%;
  }
  .img-text-banner li{
  margin: 0 0.11rem;
  height: 0.94rem;
  background: #fff;
  }
  .img-text-banner-left{
  float: left;
  width: 1.42rem;
  height: 0.94rem;
  }
  .img-text-banner-left img{
  display: block;
  width: 100%;
  height: 100%;
  }
  .img-text-banner-right{
  width: 1.8rem;
  height: 0.94rem;
  float: left;
  }
  .img-text-banner-right h3{
  margin: 0.19rem 0 0.05rem 0.1rem;
  text-align: left;
  font-size: 14px;
  color: #333;
  }
  .img-text-banner-right p{
  margin-left: 0.1rem;
  font-size: 12px;
  color: #999;
  line-height: 0.23rem;
  text-align: left;
  }
  .footer-section h2{
  margin: 0.32rem 0 0.1rem 0;
  font-size: 16px;
  color: #000;
  text-align: center;
  }
  .footer-section h2 i{
  display: inline-block;
  margin: -0.12rem 0.07rem 0;
  vertical-align: middle;
  }
  .footer-section p{
  font-size: 12px;
  color: #999;
  text-align: center;
  }
  .footer-section p span:nth-of-type(1){
  display: inline-block;
  margin-right: 0.09rem;
  }
  .footer-section p:nth-of-type(2){
  margin: 0.04rem 0 0.17rem 0;
  }
  .hot-artical-section{
  text-align: left;
  }
  .hot-artical-section h2{
  margin: 0.12rem 0 0.12rem 0.15rem;
  font-size: 16px;
  color: #666;
  }
  .hot-artical-section dl{
  margin: 0 0.1rem 0.1rem 0.1rem;
  background: #fff;
  }
  .hot-artical-section dl dt{
  float: left;
  width: 42%;
  height: 0.9rem;
  background: #fff;
  }
  .hot-artical-section dl dt img{
  width: 100%;
  height: 100%;
  }
  .hot-artical-section dl dd{
  padding: 0.05rem 0.03rem 0.1rem 0.09rem;
  float: left;
  width: 52%;
  background: #fff;
  }
  .hot-artical-section dl dd h3{
  line-height: 0.2rem;
  font-size: 14px;
  color: #333;
  font-weight: bold;
  }
  .hot-artical-section dl dd p{
  display: -webkit-box;
  line-height: 0.16rem;
  font-size: 12px;
  color: #999;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  }
  .hot-artical-section dl dd .h3{
  margin-bottom: 0.15rem;
  }
  .arcTwo h3{
  margin-bottom: 0 !important;
  }
  </style>