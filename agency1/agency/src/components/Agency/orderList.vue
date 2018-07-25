<template>
	<div class='order-list'>
    <div class='charge-set-top'>
      <div class='charge-top-section clearfix'>
        <div class='charge-top-left'>
          <img :src="teamAvatar === 'null' || !teamAvatar ? src : teamAvatar"/>
        </div>
        <div class='charge-top-right'>
          <div class='clearfix charge-top-right-name'>
            <h2>{{teamRealname}}</h2>
          </div>
          <p>{{teamMobile}}</p>
        </div>
      </div>
    </div>
    <div class="order-list-top">
      <div class='tab-section'>
        <ul>
          <li v-for='(tabList, index) in tabList' @click='tabListBtn(index)'>{{tabList}}</li>
        </ul>
      </div>
      <div class='search-section'>
        <label>
          <i @click='seacrh'></i>
          <input type="text" class="search"  placeholder="请输入您要查询的手机号或姓名" ref='preSearch' />
        </label>
        <a href="javascript:;" @click='seacrh'>搜索</a>
      </div>
    </div>
    <div class='state-tab-section'>
    	<ul>
    		<li v-for='(stateTabList, index) in stateTabList' @click='stateTabListBtn(index)'>{{stateTabList}}</li>
    	</ul>
    </div>
    <div class='statement-section'>
    	<p>声明：本订单信息仅代表用户发起过申请，不代表完成了申请流程</p>
    </div>
    <div class='list-section' v-show='creditShow'>
    	<ul>
    		<li v-for='orderDataitem of cardData'>
    			<div class='list-top clearfix'>
    				<div class='list-top-left'>
    					<p>
    						<span>{{orderDataitem.title}}</span>
    					</p>
    				</div>
            <div class='list-top-middle' v-show='tagShow'>
              <span>自</span>
              <span>子</span>
              <span>下</span>
            </div>
    				<div class='list-top-right'>
    					<span>{{orderDataitem.desc}}</span>
            </p>
    				</div>
    			</div>
    			<div class='list-middle clearfix'>
            <div class='list-middle-left'>
              <p><i>订单号：</i><span>{{orderDataitem.sn}}</span></p>
              <p><i>申请人姓名：</i><span>{{orderDataitem.name}}</span></p>
              <p><i>手机号码：</i><span>{{orderDataitem.mobile}}</span></p>
              <p><i>申请时间：</i><span>{{$formate.format(orderDataitem.time)}}</span></p>
            </div>
    			</div>
    			<div class='list-bottom clearfix'  v-show=' (orderDataitem.price === null && orderDataitem.commission === null) ? false : true'>
    			<p v-show='orderDataitem.price === null ? false : true' style="margin-left: 0.1rem"><span >代理价:</span><i>{{orderDataitem.price}}</i><small>元</small></p> <p v-show="orderDataitem.commission === null ? false: true" class="proxy"><span>佣金:</span><i>{{orderDataitem.commission}}</i><small>元</small></p> 
    			</div>
    		</li>
    	</ul>
    </div>
    <div class='list-section' v-show='moneyShow'>
      <ul v-for = 'item of orderData'>
        <li>
          <div class='list-top clearfix'>
            <div class='list-top-left'>
              <p>
                <span>{{item.title}}</span>
              </p>
            </div>
            <div class='list-top-middle' style="display : none">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div class='list-top-right'>
              <span>{{item.desc}}</span>
            </div>
          </div>
          <div class='list-middle clearfix'>
            <div class='list-middle-left money-list-middle-left'>
              <p><i>订单号：</i><span>{{item.sn}}</span></p>
              <p><i>投资标的：</i><span>{{item.title}}</span></p>
              <p><i>投资日期：</i><span>{{$formate.format(item.time)}}</span></p>
              <p><i>投资金额：</i><span>{{item.price === null ? 0 : item.price}}元</span></p>
            </div>
            <div class='list-middle-right' style="display : none">
              <p><span>佣金:</span><i>88</i><small>元</small></p>
            </div>
          </div>
          <div class='list-bottom clearfix' style="display : none">
            <p><span>代理价:</span><i>88</i><small>元</small></p>
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
	</div>
</template>
<script>
	import $ from '../../../node_modules/jquery/dist/jquery.min.js'
	import '../../../src/assets/css/common.css'
  import Back from './back.vue'
	export default {
    components: {
      Back
    },
		data () {
			return {
				tabList: ['信用卡', '理财'],
				stateTabList: ['全部','未完成', '已完成'],
        errorShow: true,
        creditShow: true,
        moneyShow: false,
        ishowdai:true,
        orderData: '',
        cardData: '',
        status: -1,
        search:false,
        tagShow: false,
        orderType: 1,
        sn: localStorage.getItem('teamSn'),
        teamRealname: '',
        teamMobile: '',
        teamAvatar: '',
        src: require('../../assets/img/bg_img17.png')
			}
		},
    created () {
    window.addEventListener("popstate",function(){
    },false)
     if (this.sn == '') {
      this.getUserinfo()
     }else {
      this.teamRealname = localStorage.getItem('teamRealname')
      this.teamMobile = localStorage.getItem('teamMobile')
      this.teamAvatar = localStorage.getItem('teamAvatar')
     }
     this.orderDataAjax()
    },
		mounted () {
			$('.tab-section ul li').removeClass('active').eq(0).addClass('active')
			$('.state-tab-section ul li').removeClass('stateActive').eq(0).addClass('stateActive')
		},
		methods: {
			tabListBtn (index) {
        this.search = false
        $(".search").val("")
        if (index === 0) {
        this.orderType = 1
        } else {
        this.orderType = 0
        }
        this.orderDataAjax()
				$('.tab-section ul li').removeClass('active').eq(index).addClass('active')
        if (index === 0) {
          this.creditShow = true
          this.moneyShow = false
        } else {
          this.moneyShow = true
          this.creditShow = false
        }
			},
      getUserinfo () {
       var url = this.$api.wxUrl + 'api/user/info' 
       this.$http.get(url).then(response =>{
          if (response.data.code === 1) {
            this.teamRealname = response.data.data.realname
            this.teamMobile = response.data.data.mobile
            this.teamAvatar = response.data.data.avatar
            this.teamAvatar = response.data.data.avatar
          }
        })
      },
      seacrh () {
        if (this.$refs.preSearch.value === '') {
          this.search = false
        } else {
          this.search = true
        }
        this.orderDataAjax()
      },
  		stateTabListBtn (index) {
        this.status = index-1
        this.orderDataAjax()
        console.log(index)
  			$('.state-tab-section ul li').removeClass('stateActive').eq(index).addClass('stateActive')
  		},
      orderDataAjax () {
        var url = ''
        url = this.$api.wxUrl + 'api/order/list?ot=' + this.orderType
        if (this.status == -1) {
        } else {
        url = url + '&st=' + this.status
        }
        if (this.sn != '') {
        url = url + '&sn=' + this.sn
        } 
        if (this.search == true) {
        url = url + '&qs=' + this.$refs.preSearch.value 
        } 
        this.$http.get(url).then(response => {
          if (response.data.code === 1) {
            if (response.data.data === null || response.data.data === 'null' || response.data.data.length === 0) {
              this.errorShow = true
              this.cardData = response.data.data
            } else {
              this.errorShow = false
              if (this.orderType === 1) {
                this.cardData = response.data.data
              } else {
                this.orderData = response.data.data
                console.log('cardData' + this.cardData)
              }
            }
          } else {
            this.errorShow = true
          }
        }).catch(error => {
          console.log(error)
        })
      }
	  }
	}
</script>
<style scoped>
	.order-list{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		width: 100%;
		min-height: 100%;
		height: auto ! important;
		background: #f5f5f5;
		text-align: left;
	}
	@media screen and (min-width: 750px){
	  .order-list{
	  	margin: 0 auto;
	  	height: 100%;
	    width: 750px;
	  }
	}
.charge-set-top{
  margin-bottom: 0.1rem;
}
.charge-top-right-name h2{
    float: left;
   }
   .red{
    background: #f24c3f;
   }
   .blue{
    background: #2e7eff;
   }
   .charge-top-right-name .tags{
    margin: 0.19rem 0 0.17rem 0.04rem;
    float: left;
   }
   .charge-top-right-name .tags span{
    padding: 0.02rem;
    display: inline-block;
    text-align: center;
    line-height: 0.15rem;
    border-radius: 6px;
    font-size: 12px;
    color: #fff;
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
  width: 21%;
}
.charge-top-left img{
  display: block;
  margin: 0.15rem 0 0.14rem 0.15rem;
  width: 0.52rem;
  height: 0.52rem;
  background: #8c97cb;
  border-radius: 100%;
}
.charge-top-right{
  margin-left: 0.22rem;
  float: left;
  text-align: left;
  width: 65%;
}
.charge-top-right h2{
  margin: 0.18rem 0 0.1rem 0;
  font-size: 19px;
  color: #333;
  line-height: 0.2rem;
}
.charge-top-right p{
  padding-bottom: 0.05rem;
  font-size: 14px;
  color: #999;
}
  .order-list-top{
    padding-bottom: 0.12rem;
    background: #fff;
  }
  .search-section{
    height: 0.52rem;
  }
  .search-section label{
    display: block;
    float: left;
    margin: 0.12rem 3% 0;
    height: 0.28rem;
    line-height: 0.28rem;
    background: #f5f5f5;
    width: 80%;
    border-radius: 14px;
  }
  .search-section  a{
    margin-right: 0.2rem;
    float: right;
    font-size: 14px;
    color: #478dfd;
    line-height: 0.52rem;
  }
  .search-section label i{
    display: inline-block;
    margin: 0 0.08rem 0 0.15rem;
    vertical-align: middle;
    width: 0.14rem;
    height: 0.15rem;
    background: url(../../assets/img/bg_img73.png) no-repeat center center;
    background-size: 100% 100%;
  }
  .search-section label input{
    display: inline-block;
    height: 80%;
    width: 80%;
    font-size: 12px;
    color: #737373;
    border: none;
    outline: none;
    background: #f5f5f5;
  }
  .tab-section ul{
    display: flex;
    height: 0.4rem;
    line-height: 0.4rem;
    background: #fff;
  }
  .tab-section ul li{
    flex: 1;
    line-height: 0.4rem;
    text-align: center;
    font-size: 14px;
    color: #333;
  }
  .active{
    color: #478dfd ! important;
    border-bottom: 1px solid #478dfd;
  }
  .state-tab-section ul{
  	display: flex;
    margin: 0.08rem auto 0;
    width: 57%;
    height: 0.31rem;
    border: 1px solid #478dfd;
    border-radius: 20px;
  }
  .state-tab-section ul li{
  	flex: 1;
    line-height: 0.31rem;
    text-align: center;
    font-size: 14px;
    color: #478dfd;
  }
  .state-tab-section ul li:nth-of-type(1){
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }
  .state-tab-section ul li:nth-of-type(2){
    border-right: 1px solid #478dfd;
  }
  .state-tab-section ul li:nth-of-type(3){
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }
  .stateActive{
  	color: #fff ! important;
    background: #478dfd;
  }
  .statement-section{
    margin-left: 0.05rem;
  	height: 0.35rem;
  	line-height: 0.35rem;
  	font-size: 12px;
  	color: #999;
  }
  .list-section ul li{
  	margin-bottom: 0.1rem;
  	background: #fff;
  }
  .list-top{
  	height: 0.4rem;
  	line-height: 0.4rem;
  	border-bottom: 1px solid #f4f4f4;
  }
  .list-top-left{
  	margin-left: 0.15rem;
  	float: left;
  }
  .list-top-left p{
  	position: relative;
  	font-size: 14px;
  	color: #333;
  }
  .list-top-left p:after{
  	position: absolute;
  	content: '';
  	width: 3px;
  	height: 14px;
  	background: #333;
  	left: -0.07rem;
  	top: 0.14rem;
  }
  .list-top-middle{
    margin-left: 0.1rem;
    float: left;
  }
  .list-top-middle span{
    padding: 0 0.06rem;
    font-size: 12px;
    color: #88a3ff;
    background: #e8ecff;
    border: 1px solid #aec1ff;
    border-radius: 3px;
  }
  .list-top-right{
  	margin-right: 0.14rem;
  	float: right;
  	font-size: 14px;
  	color: #3a84ff;
  }
  .list-middle{
  	padding: 0.1rem 0 0.03rem 0.15rem;
  	border-bottom: 1px solid #f4f4f4;
  }
  .list-middle p{
  	margin-bottom: 0.09rem;
  	font-size: 14px;
  	color: #999;
  }
  .list-middle p span{
  	color: #333;
  }
  .list-bottom{
  	padding: 0.14rem 0.14rem 0.14rem 0;
  }
  .list-bottom p {
    float: right;
    text-align: right;
  }
  .list-bottom p span{
  	font-size: 14px;
  	color: #3a84ff;
  }
   .list-bottom p i{
    margin-left: 0.05rem;
    font-size: 14px;
    color: #5a87ed;
  }
  .list-bottom p small{
    display: inline-block;
    font-size: 14px;
    color: #5a87ed;
  }
  .list-bottom .proxy span{
    font-size: 14px;
    color: red;
  }
  .list-bottom .proxy i{
    margin-left: 0.05rem;
    font-size: 14px;
    color: red;
  }
   .list-bottom .proxy small {
    font-size: 14px;
    color: red;
  }
 
  .list-middle-left{
    float: left;
    width: 96%;
  }
  .list-middle-left p span{
    display: inline-block;
    width: 66%;
  }
  .list-middle-left p i{
    display: inline-block;
    width: 32%;
  }
  .list-middle-right{
    margin: 0rem 0.15rem 0 0;
    float: right;
  }
  .list-middle-right p{
    text-align: right;
  }
  .list-middle-right p span{
    margin-right: 0.05rem;
    font-size: 12px;
    color: #999;
  }
  .list-middle-right p i{
    display: inline-block;
    color: #ff5d5d;
  }
  .list-middle-right p small{
    display: inline-block;
    font-size: 12px;
    color: #ff5d5d;
    transform: scale(0.8);
  }
  .money-list-middle-left p i{
    width: 26%;
  }
  .client-error{position: absolute; top: 2.8rem; bottom: 0; width: 100%; background: #f5f5f5;}
  .client-error .img-section{padding-top: 0.44rem; margin: 0.43rem auto 0.43rem; width: 1.78rem; height: 1.78rem; background: #eee; border-radius: 100%;}
  .client-error .img-section img{margin: 0 auto; width: 0.75rem; height: 0.91rem;}
  .client-error p{margin-bottom: 0.15rem; font-size: 0.16rem; color: #666666; text-align: center;}
</style>