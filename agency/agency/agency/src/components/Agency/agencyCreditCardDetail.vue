<template>
	<div class="officialCreditCardDetail">
		<div class='tabList-section'>
			<ul>
				<li v-for='(tablist, index) in tabList' @click="tabListBtn(index)">{{tablist}}</li>
			</ul>
		</div>
		<div class="bank-recommand" v-if='bankShow'>
			<ul class="clearfix">
				<li v-for='bankData in bankData'>
					<div class='content'>
						<div class='left-box'>
							<img :src="bankData.logo === null ? src : bankData.logo"/>
						</div>
						<div class='middle-box'>
							<h2>{{bankData.title}}</h2>
							<div class='tags'>
								<span v-for='tag in bankData.tagList'>{{tag.title}}</span>
							</div>
							<p>{{bankData.summary}}</p>
						</div>
						<div class='right-box'>
							<p><b>{{bankData.price === null ? 0 : bankData.price}}</b>元</p>
							<p>代理价</p>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<div class='finace-recommand' v-if='financeShow'>
			<ul>
				<li v-for='financeData in financeData'>
					<div>
						<div class='top-box'>
							<div class='name-message clearfix'>
								<div class='icon-box'>
									<img :src="financeData.companyLogo === null ? srcTwo : financeData.companyLogo"/>
								</div>
								<h2>{{financeData.title}}</h2>
								<div class='tags-box'>
									<span v-for='tag in financeData.tagList'>{{tag.title}}</span>
								</div>
							</div>
							<div class='summary'>
								<p>{{financeData.summary}}</p>
							</div>
						</div>
						<div class='bottom-box clearfix'>
							<div class='bot-left-box'>
								<div class='rate-message'>
									<p><b>{{financeData.rateStandard}}</b><i>~</i><b>{{financeData.rateActivity}}</b><small>%</small></p>
								</div>
								<p class='rate-state'>综合年化收益率</p>
							</div>
							<div class='bot-right-box'>
								<p><b>{{financeData.price === null ? 0 : financeData.price}}</b>元</p>
								<p>代理价</p>
							</div>
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
    <!-- <back></back> -->
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
		created () {
			this.dataAjax()
			// this.financeAjax()
		},
		data () {
			return {
				bankData: '',
				openid: '',
				applyData: '',
				phoneNumber: '',
				tabList: ['信用卡', '理财'],
				bankShow: true,
				financeShow: false,
				financeData: '',
				errorShow: false,
				src: require('../../assets/img/bg_img78.png'),
				srcTwo: require('../../assets/img/bg_img79.png')
			}
		},
		mounted () {
			$('.tabList-section ul li').removeClass('router-link-active').eq(0).addClass('router-link-active')
		},
		methods: {
			dataAjax () {
				var url = this.$api.wxUrl + 'api/bank/list'
  			this.$http.get(url).then(response => {
  				if (response.data.code === 1) {
  					if (response.data.data === null || response.data.data.length === 0) {
  						this.errorShow = true
  					} else {
	  					this.errorShow = false
	  					this.bankData = response.data.data
	  				}
  				}
  			}).catch(error => {
  				console.log(error)
  			})
			},
			financeAjax () {
				var url = this.$api.wxUrl + 'api/p2p/list'
  			this.$http.get(url).then(response => {
  				if (response.data.code === 1) {
  					if (response.data.data === null || response.data.data.length === 0) {
							this.errorShow = true
						} else {
							this.errorShow = false
							this.financeData = response.data.data
							console.log(this.financeData)
						}
  				}
  			})
			},
			tabListBtn (index) {
				console.log(index)
				$('.tabList-section ul li').removeClass('router-link-active').eq(index).addClass('router-link-active')
				if (index === 0) {
					this.financeShow = false
					this.bankShow = true
					this.dataAjax()
				} else {
					this.bankShow = false
					this.financeShow = true
					this.financeAjax()
				}
			}
		}
	}
</script>
<style scoped>
	.officialCreditCardDetail{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		min-height: 100%;
		height: auto ! important;
		background: #f4f4f4;
		text-align: left;
	}
	@media screen and (min-width: 750px){
	  .officialCreditCardDetail{
	  	margin: 0 auto;
	  	height: 100%;
	    width: 750px;
	  }
	}
	.tabList-section{
		position: fixed;
		height: 0.4rem;
		width: 100%;
		top: 0;
		left: 0;
		z-index: 10;
	}
	.bank-recommand{
		position: absolute;
		padding-bottom: 0.4rem;
		top: 0.4rem;
		left: 0;
		width: 100%;
	}
	.top-banner-section{
		width: 100%;
		height: 1.53rem;
	}
	.top-banner-section img{
		display: block;
		width: 100%;
		height: 100%;
	}
	.swiper-container{
		height: 1.7rem;
		background: #fff;
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
	.standardBonus i{
		color: #ff2433
	}
	.tabList-section ul{
		display: flex;
		width: 100%;
		background: #fff;
	}
	.tabList-section ul li{
		flex: 1;
		text-align: center;
		font-size: 14px;
		color: #333;
		line-height: 0.4rem;
		height: 0.4rem;
	}
	.router-link-active{
		border-bottom: 1px solid #3a84ff;
		color: #3a84ff ! important;
	}
	.bank-recommand ul{
		border-top: 1px solid #f4f4f4;
	}
	.bank-recommand ul li{
		padding-bottom: 0.15rem;
		border-bottom: 1px solid #f4f4f4;
		background: #fff;
	}
	.bank-recommand ul li .content{
		display: flex;
		width: 100%;
	}
	.left-box{
		flex: 3;
	}
	.middle-box{
		flex: 7;
	}
	.right-box{
		flex: 4;
		text-align: center;
	}
	.left-box img{
		display: block;
		margin: 0.24rem auto 0;
		width: 0.57rem;
		height: 0.57rem;
		border-radius: 10px;
	}
	.middle-box h2{
		margin: 0.17rem 0 0.11rem 0;
		font-size: 16px;
		color: #333;
		line-height: 0.2rem;
	}
	.middle-box .tags{
		margin-bottom: 0.07rem;
	}
	.middle-box .tags span{
		display: inline-block;
		margin-right: 0.06rem;
		padding: 0.04rem 0.06rem;
		border-radius: 3px;
		border: 1px solid #facdb6;
		font-size: 12px;
		color: #ffa680;
	}
	.middle-box p{
		font-size: 12px;
		color: #999;
		line-height: 0.2rem;
	}
	.right-box p:nth-of-type(1){
		margin: 0.4rem 0 0.12rem 0;
		font-size: 12px;
		color: #5a87ed;
		transform: scale(0.8);
	}
	.right-box p:nth-of-type(1) b{
		font-size: 28px;
	}
	.right-box p:nth-of-type(2){
		font-size: 12px;
		color: #999;
	}
	.finace-recommand ul{
		border-top: 1px solid #f4f4f4;
	}
	.finace-recommand ul li{
		padding-bottom: 0.13rem;
		margin-bottom:0.1rem;
		width: 100%;
		background: #fff;
	}
	.finace-recommand .top-box{
		padding-bottom: 0.09rem;
		margin: 0 0.15rem;
		border-bottom: 1px solid #f4f4f4;
	}
	.name-message .icon-box{
		float: left;
	}
	.name-message .icon-box img{
		display: inline-block;
		margin: 0.16rem 0 0.08rem 0;
		width: 0.3rem;
		height: 0.3rem;
		border-radius: 3px;
	}
	.name-message h2{
		margin: 0.24rem 0.12rem 0 0.08rem;
		float: left;
		font-size: 17px;
		color: #333;
	}
	.name-message .tags-box{
		margin-top: 0.23rem;
		float: left;
		font-size: 12px;
		color: #ffa680;
	}
	.name-message .tags-box span{
		display: inline-block;
		margin-right: 0.06rem;
		padding: 0.04rem 0.06rem;
		border: 1px solid #facdb6;
		border-radius: 3px;
	}
	.top-box .summary{
		font-size: 14px;
		color: #666;
		line-height: 0.2rem;
	}
	.bottom-box{
		margin: 0 0.15rem;
	}
	.bot-left-box{
		float: left;
	}
	.bot-right-box{
		float: right;
		text-align: center;
	}
	.bot-right-box p:nth-of-type(1){
		padding-top: 0.18rem;
		margin-bottom: 0.07rem;
		font-size: 12px;
		color: #5a87ed;
		transform: scale(0.8);
	}
	.bot-right-box p:nth-of-type(1) b{
		font-size: 28px;
	}
	.bot-right-box p:nth-of-type(2){
		font-size: 12px;
		color: #999;
	}
	.rate-message{
		padding-top: 0.18rem;
		margin-bottom: 0.12rem;
	}
	.rate-message p{
		font-size: 22px;
		color: #333;
	}
	.rate-message small{
		font-size: 12px;
		color: #333;
	}
	.bot-left-box .rate-state{
		font-size: 12px;
		color: #999;
	}
	.client-error{position: absolute; top: 0.5rem; bottom: 0; width: 100%; background: #f5f5f5;}
  .client-error .img-section{padding-top: 0.44rem; margin: 0.83rem auto 0.43rem; width: 1.78rem; height: 1.78rem; background: #eee; border-radius: 100%;}
  .client-error .img-section img{margin: 0 auto; width: 0.75rem; height: 0.91rem;}
  .client-error p{margin-bottom: 0.15rem; font-size: 0.16rem; color: #666666; text-align: center;}
</style>