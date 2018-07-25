<template>
  <div class="team">
    <div class='charge-set-top'>
      <div class='charge-top-section clearfix'>
        <div class='charge-top-left'>
          <img :src="infoAvatar === 'null' || !infoAvatar ? src : infoAvatar"/>
        </div>
        <div class='charge-top-right'>
          <div class='clearfix charge-top-right-name'>
            <em>{{infoRealname}}</em>
            <!-- <span class='red'>间接代理</span> -->
            <!-- <h2>{{infoRealname}}</h2> -->
            <!-- <div class='tags'>
              <span :class="tagText === '间接代理' ? 'red' : tagText === '直接代理' ? 'blue' : '' ">{{tagText}}</span>
              <span class='red'>间接代理</span>
            </div> -->
            <span :class="tagText === '间接代理' ? 'red' : tagText === '直接代理' ? 'blue' : '' ">{{tagText}}</span>
          </div>
          <p>{{infoMobile}}</p>
        </div>
      </div>
      <div class="bar-line"></div>
      <div class='tab-section'>
        <ul>
          <li v-for='(tabList, index) in tabList' @click='tabListBtn(index)'>{{tabList}}</li>
        </ul>
      </div>
    </div>
    <div class='content-section'>
      <ul v-if='agentShow'>
        <li class='clearfix' v-for='(teamData, index) in teamData'>
          <div @click='team(teamData)'>
            <div class='left-section'>
              <div class='img-box'>
                <img :src="teamData.avatar === null || !teamData.avatar ? src : teamData.avatar"/>
              </div>
            </div>
            <div class='middle-section'>
              <p>{{teamData.realname}}</p>
              <p>{{teamData.mobile}}</p>
              <p>加入时间：{{format(teamData.joinTime)}}</p>
            </div>
          </div>
          <div class='right-section'>
            <div v-if='teamData.pass === true ? true : false' class="phone clearfix">
              <img src='../../assets/img/bg_img26.png' @click='orderListUrl(teamData)'/>
              <a :href="'tel:' + teamData.mobile">
                <img src='../../assets/img/bg_img27.png'/>
              </a>
            </div>
            <div v-if='teamData.pass === false ? true : false' class="pass-apply" @click='setCommission(teamData)' >设置佣金</div>
            <div v-if='teamData.pass === false ? true : false' class="pass-apply2" @click='passApply(teamData,index)' >通过申请</div>
          </div>
        </li>
      </ul>
      <ul v-if='peopelShow'>
        <li class='clearfix' v-for='(teamData, index) in teamData'>
          <div>
            <div class='left-section'>
              <div class='img-box'>
                <img :src="teamData.avatar === null || !teamData.avatar ? src : teamData.avatar" />
              </div>
            </div>
            <div class='middle-section'>
              <p>{{teamData.nickname}}</p>
              <p>{{teamData.mobile}}</p>
              <p>加入时间：{{format(teamData.joinTime)}}</p>
            </div>
          </div>
          <div class='right-section'>
            <div>
              <a :href="'tel:' + teamData.mobile">
                <img src='../../assets/img/bg_img27.png' class="peopel_img"/>
              </a>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="client-error" v-show='errorShow'>
      <div class="img-section">
        <img src="../../assets/img/bg_img25.png" />
      </div>
      <p>暂时没有数据!~</p>
    </div>
   <div v-transfer-dom>
      <confirm v-model="alertShow"
      confirm-text="设置佣金"
      cancel-text="确认通过"
      :hide-on-blur = "true"
      :title="$t('重要提示')"
      @on-confirm="onConfirm"
      @on-cancel="onCancel"
      >
        <p style="text-align:left; color:#ff0000; padding-top:10px;padding-bottom:6px;line-height: 21px;">{{ $t('通过申请后，您的代理可以立即看到您设置的默认价格。如您希望单独针对该代理设置佣金，请务必确保佣金设置完毕后再通过申请。') }}</p>
      </confirm>
    </div>
     <div v-transfer-dom>
      <confirm
      v-model="lookShow"
      :show-cancel-button="false"
      cancel-text=""
      :title="$t('查看提示')"
      @on-confirm="onConfirm">
        <p style="text-align:center; padding-top:10px;padding-bottom:6px;line-height: 21px">{{ $t('通过申请后才能查看其团队与客户') }}</p>
      </confirm>
    </div>
    <toast v-model="messageShow" type="text" width="80%" :time='1000'>{{$t(totastText)}}</toast>
  </div>
</template>
<script>
  import $ from '../../../node_modules/jquery/dist/jquery.min.js'
  import '../../../src/assets/css/common.css'
  import Back from './back.vue'
  // import BigImg from '../../components/Agency/bigImg.vue'
  import {Confirm, TransferDomDirective as TransferDom, Toast} from 'vux'
  export default {
      beforeRouteUpdate (to, from, next) {
        next() // 主要就是这一步
      },
       components: {
        Back,
        Confirm,
        Toast
       },
      directives: {
       TransferDom
      },
       inject: ['reload'],
       created () {
        var url = this.$api.wxUrl + 'api/team/list?page=' + 1
        this.teamDataAjax(url)
        this.head()
       },
       data () {
        return {
          tabList: ['代理', '客户'],
          teamData: '',
          errorShow: false,
          alertShow: false,
          infoRealname: '',
          infoMobile: '',
          lookShow: false,
          messageShow: false,
          infoAvatar: '',
          tagText: '',
          clickItem: '',
          totastText: '',
          cientShow: true,
          src: require('../../assets/img/bg_img17.png'),
          agentShow: true,
          peopelShow: false
        }
       },
       mounted () {
        $('.tab-section ul li').removeClass('active').eq(0).addClass('active')
       },
       methods: {
        handleReload () {
        this.reload()
        },
        head () {
          var sn = localStorage.getItem('sn')
          if (sn === '') {
            this.infoRealname = localStorage.getItem('infoRealname')
            this.infoMobile = localStorage.getItem('infoMobile')
            this.infoAvatar = localStorage.getItem('infoAvatar')
            // this.tagText = localStorage.getItem('infoDirect') === 'false' ? '间接代理' : '直接代理'
          }
        },
        onConfirm (msg) {
          // 跳转到设置佣金的页面
         this.setCommission(this.teamData[this.clickItem])
        },
        onConfirm2 (msg) {
           this.lookShow = false
        },
        onCancel () {
          var url = this.$api.wxUrl + 'api/team/pass?sn=' + this.teamData[this.clickItem].sn
          this.$http.get(url).then(response => {
            if (response.data.code === 1) {
              this.teamData[this.clickItem].pass = true
            } else {
              this.messageShow = true
              this.totastText = '网络繁忙'
            }
          }).catch(error => {
            console.log(error)
            this.loding = false
            this.messageShow = true
            this.totastText = '网络繁忙'
          })
        },
        clickImg (e) {
          this.showImg = true
          this.imgSrc = e.currentTarget.src
        },
        viewImg () {
          this.showImg = false
        },
        passApply (teamData, index) {
          this.alertShow = true
          this.clickItem = index
        },
        setCommission (teamData) {
        localStorage.setItem('priceSn', teamData.sn)
        localStorage.setItem('priceRealname', teamData.realname)
        localStorage.setItem('priceMobile', teamData.mobile)
        localStorage.setItem('teamhead', teamData.avatar)
        this.$router.push({
          path: '/chargeSetDetail',
          name: 'chargeSetDetail'
        })
        },
        orderListUrl (teamData) {
          if (teamData.sn === null || teamData.sn === undefined) {
            window.location.reload()
            this.lookShow = true
          } else {
            localStorage.setItem('teamSn', teamData.sn)
            localStorage.setItem('teamRealname', teamData.realname)
            localStorage.setItem('teamMobile', teamData.mobile)
            localStorage.setItem('teamAvatar', teamData.avatar)
            this.$router.push({
              path: '/orderList',
              name: 'orderList'
            })
          }
        },
        tabListBtn (index) {
          var url = ''
          var sn = localStorage.getItem('sn')
          this.teamData = ''
          $('.tab-section ul li').removeClass('active').eq(index).addClass('active')
          if (index === 0 && sn === '') {
            url = this.$api.wxUrl + 'api/team/list?page=' + 1
            this.peopelShow = false
            this.cientShow = true
            this.agentShow = true
            this.teamDataAjax(url)
          } else if (index === 0 && sn !== '') {
            url = this.$api.wxUrl + 'api/team/list?sn=' + sn
            this.peopelShow = false
            this.cientShow = true
            this.agentShow = true
            this.teamDataAjax(url)
            this.infoRealname = localStorage.getItem('teamRealname')
            this.infoMobile = localStorage.getItem('teamMobile')
            this.infoAvatar = localStorage.getItem('teamAvatar')
          } else if (index === 1 && sn === '') {
            url = this.$api.wxUrl + 'api/member/list?page=' + 1
            this.agentShow = false
            this.peopelShow = true
            this.teamDataAjax(url)
          } else {
            url = this.$api.wxUrl + 'api/member/list?page=' + 1 + '&sn=' + sn
            this.agentShow = false
            this.peopelShow = true
            this.teamDataAjax(url)
          }
        },
        teamDataAjax (url) {
          this.$http.get(url).then(response => {
            if (response.data.code === 1) {
              if (response.data.data.list.length === 0) {
                this.teamData = ''
                this.errorShow = true
              } else {
                this.errorShow = false
                this.teamData = response.data.data.list
              }
            } else {
              this.errorShow = true
            }
          }).catch(error => {
            console.log('得到的错误信息====>' + error)
            this.errorShow = true
          })
        },
        team (teamData) {
          console.log(teamData.sn)
          if (teamData.sn === null || teamData.sn === undefined) {
            window.location.reload()
          } else {
            console.log(teamData)
            if (teamData.pass === true) {
              this.teamDataAjax(this.$api.wxUrl + 'api/team/list?sn=' + teamData.sn)
              localStorage.setItem('sn', teamData.sn)
              localStorage.setItem('teamRealname', teamData.realname)
              localStorage.setItem('teamMobile', teamData.mobile)
              localStorage.setItem('teamAvatar', teamData.avatar)
              localStorage.setItem('teamDirect', teamData.direct)
              this.infoRealname = localStorage.getItem('teamRealname')
              this.infoMobile = localStorage.getItem('teamMobile')
              this.infoAvatar = localStorage.getItem('teamAvatar')
              if (localStorage.getItem('teamDirect') === 'true') {
                this.tagText = '直接代理'
              } else {
                this.tagText = '间接代理'
              }
            } else {
              this.lookShow = true
            }
            this.$router.push({
              path: '/team',
              name: 'team'
            })
          }
        },
        add0 (m) {
          return m < 10 ? '0' + m : m
        },
        format (tim) {
          var time = new Date(tim)
          var y = time.getFullYear()
          var m = time.getMonth() + 1
          var d = time.getDate()
          var h = time.getHours()
          var mm = time.getMinutes()
          var s = time.getSeconds()
          return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s)
        }
       }
     }
   </script>
   <style scoped>
   .team{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    min-height: 100%;
    height: auto ! important;
    background: #f5f5f5;
    overflow: auto;
   }
   @media screen and (min-width: 750px){
    .team{
      margin: 0 auto;
      height: 100%;
      width: 750px;
      background: #000;
    }
   }
   .bar-line{
    width: 100%;
    height: 0.1rem;
    background: #f5f5f5;
   }
   .pass-apply{
    width: 0.78rem;
    height: 0.24rem;
    background: #478dfd;
    border-radius: 12px;
    font-size: 12px;
    color: #fff;
    line-height: 0.24rem;
    text-align: center;
   }
  .pass-apply2{
    width: 0.78rem;
    height: 0.24rem;
    background: #20a86d;
    border-radius: 12px;
    font-size: 12px;
    color: #fff;
    line-height: 0.24rem;
    text-align: center;
   }
   .charge-top-right-name{
    margin-top: 0.19rem;
   }
   .charge-top-right-name em{
    font-size: 18px;
    color: #333;
    line-height: 0.22rem;
   }
   .red{
    background: #f24c3f;
   }
   .blue{
    background: #2e7eff;
   }
   /*.charge-top-right-name .tags{
    margin: 0.19rem 0 0.17rem 0.04rem;
    float: left;
   }*/
   .charge-top-right-name span{
    padding: 0.02rem;
    text-align: center;
    line-height: 0.15rem;
    border-radius: 6px;
    font-size: 12px;
    color: #fff;
   }
   .charge-set-top{
    margin-bottom: 0.1rem;
   }
   .chargeSetDetailContain {
    position: absolute;
    padding-bottom: 1rem;
    top: 1.23rem;
    left: 0;
    width: 100%;
    height: 4.25rem;
    overflow: auto;
    z-index: 30px;
   }
   .charge-top-section{
    padding-bottom: 0.05rem;
    background: #fff;
   }
   .charge-top-left{
    float: left;
    width: 19%;
   }
   .right-section div a{
    display: inline-block;
    width: 0.35rem;
    height: 0.35rem;
    border-radius: 100%;
   }
   .charge-top-left img{
    display: block;
    margin: 0.15rem 0 0.14rem 0.1rem;
    width: 0.52rem;
    height: 0.52rem;
    border-radius: 100%;
   }
   .charge-top-right{
    /*margin-left: 0.22rem;*/
    float: left;
    text-align: left;
    width: 70%;
   }
   .charge-top-right h2{
    margin: 0.18rem 0 0.17rem 0;
    font-size: 19px;
    color: #333;
   }
   .charge-top-right p{
    padding: 0.1rem 0;
    font-size: 14px;
    color: #999;
   }
   .tab-section{
    margin-bottom: 0.1rem;
    background: #fff;
   }
   .tab-section ul{
    display: flex;
   }
   .tab-section ul li{
    flex: 1;
    height: 0.4rem;
    line-height: 0.4rem;
    text-align: center;
    font-size: 14px;
    color: #333;
   }
   .active{
    border-bottom: 1px solid #478dfd;
    color: #478dfd ! important;
   }
   .content-section ul li{
    background: #fff;
    border-bottom: 1px solid #f4f4f4;
    padding-right: 0.1rem;
   }
   .left-section{
    margin: 0.15rem 0.05rem 0 0.05rem;
    float: left;
    width: 17%;
   }
   .middle-section{
    padding: 0.18rem 0;
    float: left;
    text-align: left;
    width: 52%;
   }
   .middle-section p{
    color: #333;
   }
   .middle-section p:nth-of-type(1){
    margin-bottom: 0.1rem;
    font-size: 14px;
    line-height: 0.22rem;
   }
   .middle-section p:nth-of-type(2){
    margin-bottom: 0.08rem;
    font-size: 14px;
   }
   .middle-section p:nth-of-type(3){
    font-size: 12px;
   }
   .right-section{
    float: right;
   }
   .right-section div{
    margin: 0.15rem 0.1rem 0 0;
   }
   .right-section .phone{
    margin: 0.28rem 0.1rem 0 0;
   }
  .right-section div{
    margin: 0.15rem 0.1rem 0 0;
   }
   .right-section div img:nth-of-type(1){
    margin-right: 0.05rem;
   }
   .right-section img{
    display: inline-block;
    width: 0.35rem;
    height: 0.35rem;
    border-radius: 100%;
   }
   .left-section .img-box{
    width: 0.54rem;
    height: 0.54rem;
    border-radius: 100%;
   }
   .left-section .img-box img{
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 100%;
   }
   .peopel_img {
    margin-right: 0.05rem;
    margin-top: 0.15rem;
   }
   .client-error{position: absolute; width: 100%; background: #f5f5f5; min-height: 100%}
   .client-error .img-section{padding-top: 0.44rem; margin: 0.83rem auto 0.43rem; width: 1.78rem; height: 1.78rem; background: #eee; border-radius: 100%;}
   .client-error .img-section img{margin: 0 auto; width: 0.75rem; height: 0.91rem;}
   .client-error p{margin-bottom: 0.15rem; font-size: 0.16rem; color: #666666; text-align: center;}
 </style>

