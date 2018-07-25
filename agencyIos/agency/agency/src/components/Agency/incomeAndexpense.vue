<template>
	<div class='cash'>
		<div class="banner-footer-section">
      <h2>账户总览</h2>
      <div class='total-income'>
        <p>账户余额(元)</p>
        <p><b><countup :end-val="totalmoney" :duration="1" :decimals="2"></countup></b></p>
      </div>
      <ul class='recome-balance-message'>
        <li>
          <div class='recome'>
            <i>{{totalMoneyData.totalRevenue}}</i>
            <span>总收入(元)</span>
          </div>
          <div class='balance'>
            <i>{{totalMoneyData.totalExpense}}</i>
            <span>总支出(元)</span>
          </div>
        </li>
      </ul>
    </div>
    <div class='tab-section'>
    	<ul>
    		<li v-for='(tabList, index) in tabList' @click='tabListBtn(index)'>{{tabList}}</li>
    	</ul>
    </div>
    <div class='data-list-section' v-show='incomeShow'>
    	<ul v-for='item of incomeData'>
    		<li class='clearfix'>
    			<div class='data-list-left'>
    				<p>
    					<span>订单号： {{item.sn}}</span>
    				</p>
    				<p>
    					<span>金额： {{item.money}}</span>
    				</p>
    				<p>
    					<span>交易时间： {{$formate.format(item.time)}}</span>
    				</p>
    			</div>
    			<div class='data-list-right'>
    				<span>{{item.type === 1 ? '信用卡' : '理财'}}</span>
    			</div>
    		</li>
    	</ul>
      <div class='cash-section' style="display: none">
        <div class='cash-btn'>提现</div>
      </div>
    </div>
    <div class='money-list-section' v-show='moneyShow'>
      <ul v-for='item of moneyData'>
        <li class='clearfix'>
          <div class='data-list-left'>
            <p style="display : none">
              <span>订单号： {{item.sn}}</span>
            </p>
            <p>
              <span>金额： {{item.money}}</span>
            </p>
            <p>
              <span>交易时间： {{$formate.format(item.time)}}</span>
            </p>
            <p>
              <span>交易状态：{{item.status === 1 ? '已完成' : '等待打款'}}</span>
            </p>
          </div>
          <div class='data-list-right' style="display : none" >
            <span>{{item.type === 1 ? '信用卡' : '理财'}}</span>
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
  import {Countup} from 'vux'
	export default {
    components: {
      Back,
      Countup
    },
		data () {
			return {
				tabList: ['收入', '支出'],
        incomeShow: true,
        incomeData: '',
        errorShow: false,
        moneyData: '',
        totalmoney: 0,
        totalMoneyData:'',
        moneyShow: false
			}
		},

    created () {
      this.totalMoney()
      this.incomePerson()
      this.moneyPerson ()

    },
		mounted () {
			$('.tab-section ul li').removeClass('active').eq(0).addClass('active')
		},
		methods: {
			tabListBtn (index) {
				$('.tab-section ul li').removeClass('active').eq(index).addClass('active')
        if (index === 0) {
          this.incomeShow = true
          this.moneyShow = false
          if (this.incomeData === '' || this.incomeData === null || this.incomeData.length === 0) {
              this.errorShow = true
          } else {
              this.errorShow = false
          }
        } else {
          this.incomeShow = false
          this.moneyShow = true
          if (this.moneyData === '' || this.moneyData === null || this.moneyData.length === 0) {
            this.errorShow = true
          } else {
            this.errorShow = false
          }
        }
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

      incomePerson () {
          var url = this.$api.wxUrl + 'api/transaction/income'
          this.$http.get(url).then(response => {
              this.incomeData = response.data.data
              if (this.incomeData === null || this.incomeData.length === 0) {
                  this.errorShow = true
              } else {
                  this.errorShow = false
              }
         }).catch(error => {
            errorShow = true
        })
      },
      moneyPerson () {
          var url = this.$api.wxUrl + 'api/transaction/expenditure'
          this.$http.get(url).then(response => {
              this.moneyData = response.data.data
         }) 
      }
		}
	}
</script>
<style scoped>
  .cash{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100%;
    height: auto ! important;
    background: #fff;
  }
  .banner-footer-section{
    height: 2.05rem;
    width: 100%;
    background: url(../../assets/img/bg_img99.png) no-repeat center center;
    background-size: 100% 100%;
  }
	.banner-footer-section h2{
    padding-left: 0.17rem;
	  height: 0.39rem;
	  text-align: left;
	  font-size: 16px;
    line-height: 0.39rem;
	  color: #fff;
  }
  .total-income{
    height: 0.88rem;
  }
  .total-income p:nth-of-type(1){
    margin-top: 0.09rem;
    margin-bottom: 0.23rem;
    font-size: 16px;
    color: #fff;
    height: 0.24rem;
  }
  .total-income p:nth-of-type(2){
    height: 0.41rem;
    font-size: 41px;
    color: #fff;
  }
  .total-income p:nth-of-type(3){
    font-size: 12px;
    color: #999;
    transform:scale(0.9);
    height: 0.2rem;
  }
  .recome-balance-message{
    margin-top: 0.2rem;
  }
  .recome-balance-message i{
    display: block;
    margin-bottom: 0.08rem;
    font-size: 17px;
    color: #fff;
  }
  .recome-balance-message span{
    display: block;
    font-size: 14px;
    color: #fff;
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
    /*border-right: 1px solid #f4f4f4;*/
  }
  .tab-section{
    padding: 0.1rem 0;
    background: #f5f5f5;
  }
  .tab-section ul{
  	display: flex;
  	margin: 0 auto;
  	width: 57%;
  	height: 0.31rem;
  	border: 1px solid #478dfd;
  	border-radius: 20px;
  }
  .tab-section ul li{
  	flex: 1;
  	line-height: 0.31rem;
  	text-align: center;
  	font-size: 12px;
  	color: #478dfd;
  }
  .tab-section ul li:nth-of-type(1){
  	border-top-left-radius: 20px;
  	border-bottom-left-radius: 20px;
  }
  .tab-section ul li:nth-of-type(2){
  	border-top-right-radius: 20px;
  	border-bottom-right-radius: 20px;
  }
  .active{
  	color: #fff ! important;
  	background: #478dfd;
  }
  .money-list-section ul li{
    border-bottom: 1px solid #f4f4f4;
  }
  .data-list-section ul li{
  	padding-bottom: 0.03rem;
  	border-bottom: 1px solid #f4f4f4;
  }
  .data-list-left{
  	margin-top: 0.27rem;
  	float: left;
  	text-align: left;
  }
  .data-list-right{
  	margin: 0.14rem 0.14rem 0 0;
  	float: right;
  }
  .data-list-right span{
  	display: block;
  	padding: 0.03rem 0.09rem;
  	font-size: 14px;
  	color: #478dfd;
  	border: 1px solid #478dfd;
  	border-radius: 15px;
  }
  .data-list-left p:nth-of-type(1){
  	position: relative;
  }
  .data-list-left p:nth-of-type(1):after{
  	position: absolute;
  	content: '';
  	width: 3px;
  	height: 14px;
  	background: #333;
  	left: 0.21rem;
  	top: 0;
  }
  .data-list-left p{
  	margin-bottom: 0.1rem;
  	font-size: 14px;
  	color: #333;
  }
  .data-list-left p span{
  	display: line-block;
  	margin-left: 0.3rem;
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
  }
  .icon-box{
    padding-bottom: 0.12rem;
    margin-top: 0.22rem;
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
  .input-box ul li label{
    display: block;
    height: 100%;
  }
  .input-box ul li label input{
    display: inline-block;
    height: 100%;
    width: 64%;
    text-align: right;
    font-size: 14px;
    color: #333;
    outline: none;
    border: none;
  }
  .input-box ul li label span{
    margin-left: 0.14rem;
    font-size: 14px;
    color: #666;
  }
  .input-box ul li label i{
    font-size: 14px;
    color: #333;
  }
  .identify-box label{
    display: inline-block ! important;
    width: 68% ! important;
  }
  .identify-box input{
    width: 56% ! important;
    text-align: center ! important;
  }
  .identify-box a{
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
    margin-right: 0.1rem;
    width: 59% ! important;
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
    height: 0.42rem;
    background: #478dfd;
    border-radius: 20px;
    font-size: 16px;
    color: #fff;
    border: none;
  }
  .client-error{position: absolute; top: 2.5rem; bottom: 0; width: 100%; background: #f5f5f5;}
  .client-error .img-section{padding-top: 0.44rem; margin: 0.83rem auto 0.43rem; width: 1.78rem; height: 1.78rem; background: #eee; border-radius: 100%;}
  .client-error .img-section img{margin: 0 auto; width: 0.75rem; height: 0.91rem;}
  .client-error p{margin-bottom: 0.15rem; font-size: 0.16rem; color: #666666; text-align: center;}
</style>