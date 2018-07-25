<template>
	<div class='charge-set'>
		<div class='charge-set-top'>
			<div class='charge-top-section clearfix' v-show='chargeTopShow'>
				<div class='charge-top-left'>
					<img :src="src" />
				</div>
				<div class='charge-top-right'>
					<h2 v-show='priceRealnameShow'>{{priceRealname === 'undefined' ? infoRealname : priceRealname}}</h2>
					<p v-show='priceMobileShow'>{{priceMobile === 'undefined' ? infoMobile : priceMobile}}</p>
				</div>
			</div>
			<div class='tab-section'>
				<ul>
					<li v-for='(tabList, index) in tabList' @click='tabListBtn(index)'>{{tabList}}</li>
				</ul>
			</div>
		</div>
		<div class='chargeSetDetailContain'>
			<div class='creat-charge' v-if='creatShow'>
				<div class="bank-recommand">
					<ul class="clearfix">
						<li v-for='(data, index) in creatData' class="clearfix">
							<div class='content clearfix'>
								<div class='left-box'>
									<!-- <img :src="currentPage === 0 ? data.companyLogo === null ? src : data.companyLogo : data.logo === null ? src : data.logo "/> -->
									<img :src="data.logo === null ? src : data.logo "/>
								</div>
								<div class='middle-box'>
									<h2>{{data.title}}</h2>
									<div class='tags'>
										<span v-for='tag in data.tagList'>{{tag.title}}</span>
									</div>
									<p>{{data.summary}}</p>
								</div>
								<div class='right-box'>
									<div class='height-price-box clearfix'>
										<label class='height-price'>
											<input type='text' :placeholder="data.price !== null && data.pricingType === null ? data.price : ''" :value = "data.price !== null ? data.pricingValue : '' " ref='input' :class="data.price === null ? 'grayColor' : data.price !== null && data.pricingType === null ? 'grayColor' : data.price !== null && data.pricingType === 0 ? 'redColor' : 'blueColor'" :disabled='disabled' @focus='focus(index)' @blur='blur(index)' v-on:input="handleInput(index)"/>
										</label>
										<small @click='arrow(index, $event)' ref='small' :disabled='disabled' :class="data.price === null ? 'grayColor' : data.price !== null && data.pricingType === null ? 'grayColor' : data.price !== null && data.pricingType === 0 ? 'redColor' : 'blueColor'">{{data.price === null ? '元' : data.price !== null && data.pricingType === null ? '元' : data.price !== null && data.pricingType === 0 ? '元' : '%'}}</small>
									</div>
								</div>
							</div>
							<!-- <div class='created-num'>
								<span>≈<i ref='omitVal'></i><em ref='omitUnit'></em></span>
							</div> -->
						</li>
					</ul>
				</div>
			</div>
			<div class='money-charge' v-if='moneyShow'>
				<div class='finace-recommand'>
					<ul>
						<li v-for='(data, index) in creatData'>
							<div>
								<div class='top-box'>
									<div class='name-message clearfix'>
										<div class='icon-box'>
											<img :src="data.companyLogo === null ? srcTwo : data.companyLogo"/>
										</div>
										<h2>{{data.title}}</h2>
										<div class='tags-box'>
											<span v-for='tag in data.tagList'>{{tag.title}}</span>
										</div>
									</div>
									<div class='summary'>
										<p>{{data.summary}}</p>
									</div>
								</div>
								<div class='bottom-box clearfix'>
									<div class='bot-left-box'>
										<div class='rate-message'>
											<p><b>{{data.rateStandard}}</b><i>~</i><b>{{data.rateActivity}}</b><small>%</small></p>
										</div>
										<p class='rate-state'>综合年化收益率</p>
									</div>
									<div class='right-box'>
										<div class='height-price-box clearfix'>
											<label class='height-price'>
												<input type='text' :placeholder="data.price !== null && data.pricingType === null ? data.price : ''" :value = "data.price !== null ?  data.pricingValue : ''" ref='Moneyinput' :class="data.price === null ? 'grayColor' : data.price !== null && data.pricingType === null ? 'grayColor' : data.price !== null && data.pricingType === 0 ? 'redColor' : 'blueColor'" :disabled = 'disabled' @focus='focus1(index)' @blur='blur1(index)' v-on:input="handleTwoInput(index)"/>
											</label>
											<small @click='Moneyarrow(index, $event)' ref='Moneysmall' :class="data.price === null ? 'grayColor' : data.price !== null && data.pricingType === null ? 'grayColor' : data.price !== null && data.pricingType === 0 ? 'redColor' : 'blueColor'" :disabled = 'disabled'>{{data.price === null ? '元' : data.price !== null && data.pricingType === null ? '元' : data.price !== null && data.pricingType === 0 ? '元' : '%'}}</small>
										</div>
									</div>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class='charge-set-footer'>
			<div class='sure-btn' @click='sureBtnFn'>保存</div>
		</div>
		<toast v-model="messageShow" type="text" width="80%" :time='1000'>{{$t(totastText)}}</toast>
		<div class="client-error" v-show='errorShow'>
	    <div class="img-section">
	      <img src="../../assets/img/bg_img25.png" />
	    </div>
	    <p>暂时没有数据!~</p>
	  </div>
	  <back></back>
	</div>
</template>
<script>
	import $ from '../../../node_modules/jquery/dist/jquery.min.js'
	import '../../../src/assets/css/common.css'
	import Back from './back.vue'
	import {Toast} from 'vux'
	// import eventBus from '../../components/Agency/eventBus.js'
	export default {
		components: {
			Back,
			Toast
		},
		data () {
			return {
				tabList: ['信用卡', '理财'],
				priceRealname: localStorage.getItem('priceRealname'),
				priceMobile: localStorage.getItem('priceMobile'),
				current: -1,
				priceSn: localStorage.getItem('priceSn'),
				creatShow: true,
				moneyShow: false,
				index: 0,
				blurCreatInputVal: '',
				flag: true,
				headsrc: '',
				flagTwo: false,
				arrowIndex: 0,
				creatData: '',
				inputVal: '',
				inputValTwo: '',
				messageShow: false,
				errorShow: false,
				totastText: '',
				infoRealname: localStorage.getItem('infoRealname'),
				infoMobile: localStorage.getItem('infoMobile'),
				disabled: false,
				src: require('../../assets/img/bg_img18.png'),
				srcTwo: require('../../assets/img/bg_img78.png'),
				priceRealnameShow: false,
				priceMobileShow: false,
				currentPage: 1,
				chargeTopShow: true
			}
		},
		created () {
			this.creatAjax(1)
			var vm = localStorage.getItem('teamhead')
			if (vm !== 'null') {
        this.src = vm
			}
		},
		mounted () {
			/* eventBus.$on('valhead', (data) => {
            this.src = null
            alert('哈哈' + this.src)
            console.log('====>' + this.src)
            }) */

			$('.tab-section ul li').removeClass('active').eq(0).addClass('active')
		},
		methods: {
			handleInput (index) {
				var reg = /[^\d.]/g
				if (this.$refs.small[index].innerText === '元') {
					if (reg.test(this.$refs.input[index].value) || this.$refs.input[index].value > this.creatData[index].price) {
						this.$refs.input[index].value = ''
					} else {
						this.$refs.input[index].value = this.$refs.input[index].value
					}
					if (this.$refs.input[index].value.length > 0) {
						this.$refs.input[index].className = 'redColor'
						this.$refs.small[index].className = 'redColor'
					} else {
						this.$refs.input[index].className = 'grayColor'
						this.$refs.small[index].className = 'grayColor'
					}
				} else {
					if (reg.test(this.$refs.input[index].value) || this.$refs.input[index].value > 100) {
						this.$refs.input[index].value = ''
					} else {
						this.$refs.input[index].value = this.$refs.input[index].value
					}
					if (this.$refs.input[index].value.length > 0) {
						this.$refs.input[index].className = 'blueColor'
						this.$refs.small[index].className = 'blueColor'
					} else {
						this.$refs.input[index].className = 'grayColor'
						this.$refs.small[index].className = 'grayColor'
					}
				}
			},
			handleTwoInput (index) {
				var reg = /[^\d.]/g
				console.log(this.$refs.Moneyinput[index].value)
				if (this.$refs.Moneysmall[index].innerText === '元') {
					if (reg.test(this.$refs.Moneyinput[index].value) || this.$refs.Moneyinput[index].value > this.creatData[index].price) {
						this.$refs.Moneyinput[index].value = ''
					} else {
						this.$refs.Moneyinput[index].value = this.$refs.Moneyinput[index].value
					}
					if (this.$refs.Moneyinput[index].value.length > 0) {
						this.$refs.Moneyinput[index].className = 'redColor'
						this.$refs.Moneysmall[index].className = 'redColor'
					} else {
						this.$refs.Moneyinput[index].className = 'grayColor'
						this.$refs.Moneysmall[index].className = 'grayColor'
					}
				} else {
					if (reg.test(this.$refs.Moneyinput[index].value) || this.$refs.Moneyinput[index].value > 100) {
						this.$refs.Moneyinput[index].value = ''
					} else {
						this.$refs.Moneyinput[index].value = this.$refs.Moneyinput[index].value
					}
					if (this.$refs.Moneyinput[index].value.length > 0) {
						this.$refs.Moneyinput[index].className = 'blueColor'
						this.$refs.Moneysmall[index].className = 'blueColor'
					} else {
						this.$refs.Moneyinput[index].className = 'grayColor'
						this.$refs.Moneysmall[index].className = 'grayColor'
					}
				}
			},
			focus (index) {
				if (this.creatData[index].price === null) {
					this.$refs.input[index].disabled = true
					this.$refs.small[index].disabled = true
				} else {
					this.$refs.input[index].disabled = false
					this.$refs.small[index].disabled = false
				}
				if (this.$refs.input[index].placeholder !== '') {
					this.$refs.input[index].placeholder = ''
				}
			},
			focus1 (index) {
				if (this.creatData[index].price === null) {
					this.$refs.Moneyinput[index].disabled = true
					this.$refs.Moneysmall[index].disabled = true
				} else {
					this.$refs.Moneyinput[index].disabled = false
					this.$refs.Moneysmall[index].disabled = false
				}
				if (this.$refs.Moneyinput[index].placeholder !== '') {
					this.$refs.Moneyinput[index].placeholder = ''
				}
			},
			blur1 (index) {
				if (this.$refs.Moneyinput[index].placeholder === '') {
					this.$refs.Moneyinput[index].placeholder = this.creatData[index].price
				} else {
					this.$refs.Moneyinput[index].placeholder = ''
				}
			},
			blur (index) {
				if (this.$refs.input[index].placeholder === '') {
					this.$refs.input[index].placeholder = this.creatData[index].price
				} else {
					this.$refs.input[index].placeholder = ''
				}
			},
			tabListBtn (index) {
				this.index = index
				$('.tab-section ul li').removeClass('active').eq(index).addClass('active')
				if (index === 0) {
					this.creatShow = true
					this.moneyShow = false
					this.creatAjax(1)
				} else {
					this.moneyShow = true
					this.creatShow = false
					this.creatAjax(0)
				}
			},
			computVal (index, domInput, domSmall) {
				this.inputVal = Number(domInput[index].value)
				var computVal = ''
				var placeholder = domInput[index].placeholder
				if (this.inputVal === 0 && placeholder !== '') {
					domInput[index].placeholder = placeholder
				} else if (this.inputVal === 0 && placeholder === '') {
					domInput[index].placeholder = 0
				} else if (this.inputVal !== 0) {
					computVal = this.inputVal
				}
				if (domSmall[index].innerText === '元') {
					if (computVal === 0) {
						domInput[index].value = 0
					} else {
						domInput[index].value = ((computVal / this.creatData[index].price) * 100).toFixed(2)
					}
					domInput[index].className = 'blueColor'
					domSmall[index].className = 'blueColor'
					domSmall[index].innerText = '%'
				} else if (domSmall[index].innerText === '%') {
					if (computVal === 0) {
						domInput[index].value = 0
					} else {
						domInput[index].value = ((computVal * this.creatData[index].price) / 100).toFixed(2)
					}
					domInput[index].className = 'redColor'
					domSmall[index].className = 'redColor'
					domSmall[index].innerText = '元'
				}
			},
			arrow (index, $event) {
				if (this.creatData[index].price === null) {
					this.$refs.input[index].disabled = true
					this.$refs.small[index].disabled = true
				} else {
					this.$refs.input[index].disabled = false
					this.$refs.small[index].disabled = false
					this.computVal(index, this.$refs.input, this.$refs.small)
				}
			},
			Moneyarrow (index, $event) {
				if (this.creatData[index].price === null) {
					this.$refs.Moneyinput[index].disabled = true
					this.$refs.Moneysmall[index].disabled = true
				} else {
					this.$refs.Moneyinput[index].disabled = false
					this.$refs.Moneysmall[index].disabled = false
					this.computVal(index, this.$refs.Moneyinput, this.$refs.Moneysmall)
				}
			},
			creatAjax (idx) {
				this.currentPage = idx
				var url = ''
				if (this.priceSn === 'undefined') {
					var url = this.$api.wxUrl + 'api/pricing/list?pt=' + idx + '&sn=' + ''
				} else {
					url = this.$api.wxUrl + 'api/pricing/list?pt=' + idx + '&sn=' + this.priceSn
				}
				this.creatData = ''
				this.$http.get(url).then(response => {
					if (response.data.code === 1) {
						if (idx === 0) {
							this.creatShow = false
							if (response.data.data === null || response.data.data.length === 0) {
								this.errorShow = true
								this.moneyShow = false
							} else {
								this.errorShow = false
								this.moneyShow = true
								this.creatData = response.data.data
							}
						} else {
							this.moneyShow = false
							if (response.data.data === null || response.data.data.length === 0) {
								this.errorShow = true
								this.creatShow = false
							} else {
								this.errorShow = false
								this.creatShow = true
								this.creatData = response.data.data
							}
						}
						if (response.data.data.priceRealname === null) {
							this.priceRealnameShow = false
						} else {
							this.priceRealnameShow = true
						}
						if (response.data.data.priceMobile === null) {
							this.priceMobileShow = false
						} else {
							this.priceMobileShow = true
						}
					}
				})
			},
			sureBtnFn () {
				if (this.errorShow === true) {
					return
				} else {
					var arr = []
				if (this.index === 0) {
					for (var i = 0; i < this.creatData.length; i++) {
						var sureObj = {}
						if (localStorage.getItem('priceSn') === 'undefined') {
							sureObj = {
								pricingType: this.$refs.small[i].innerText === '元' ? 0 : 1,
								pricingValue: this.$refs.input[i].value,
								productType: 1,
								productId: this.creatData[i].id
							}
						} else {
							sureObj = {
								sn: localStorage.getItem('priceSn'),
								pricingType: this.$refs.small[i].innerText === '元' ? 0 : 1,
								pricingValue: this.$refs.input[i].value,
								productType: 1,
								productId: this.creatData[i].id
							}
						}
						arr.push(sureObj)
					}
					var url = this.$api.wxUrl + 'api/pricing/setting'
					console.log(url)
					this.$http.post(url, arr).then(response => {
						if (response.data.code === 1) {
							this.messageShow = true
							this.totastText = '保存成功'
	      			        this.creatAjax(1)
	          } else {
	          	this.messageShow = true
							this.totastText = response.data.msg
	          }
	        })
				} else {
					for (var i = 0; i < this.creatData.length; i++) {
						var sureObj = {}
						if (localStorage.getItem('priceSn') === 'undefined') {
							sureObj = {
								pricingType: this.$refs.Moneysmall[i].innerText === '元' ? 0 : 1,
								pricingValue: this.$refs.Moneyinput[i].value,
								productType: 0,
								productId: this.creatData[i].id
							}
						} else {
							sureObj = {
								sn: localStorage.getItem('priceSn'),
								pricingType: this.$refs.Moneysmall[i].innerText === '元' ? 0 : 1,
								pricingValue: this.$refs.Moneyinput[i].value,
								productType: 0,
								productId: this.creatData[i].id
							}
						}
						arr.push(sureObj)
					}
					var url = this.$api.wxUrl + 'api/pricing/setting'
					this.$http.post(url, arr).then(response => {
						if (response.data.code === 1) {
							this.messageShow = true
							this.totastText = '保存成功'
							// this.$router.repalce('/chargeSetDetail')
	      			this.creatAjax(0)
	          } else {
	          	this.messageShow = true
							this.totastText = response.data.msg
	          }
	        })
				}
				}
			}
		}
	}
</script>
<style scoped>
.charge-set{
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	width: 100%;
	min-height: 100%;
	height: auto ! important;
	background: #f5f5f5;
	overflow: auto;
}
.chargeSetDetailContain {
	position: absolute;
	padding-bottom: 1rem;
	top: 1.27rem;
	left: 0;
	width: 100%;
	overflow: auto;
	z-index: 30;
}
.charge-set-footer{
	position: fixed;
	height: 0.95rem;
	bottom: 0;
	left: 0;
	width: 100%;
	z-index: 60;
	background-color: rgba(0,0,0,0.0);
}
.blueColor{
	color: #478dfd ! important;
}
.grayColor{
	color: #999 ! important;
}
.redColor{
	color: #ff4f4f ! important;
}
.tab-section ul li{
	color: #478dfd
}
.active{
	background: #478dfd;
	color: #fff ! important;
}
.created-num{
	margin-right: 0.12rem;
	float: right;
	font-size: 12px;
	color: #333;
}
.charge-set-top{
	position: fixed;
	top: 0;
	left: 0;
	height: 1.30rem;
	width: 100%;
	z-index: 50;
}
.charge-top-section{
	padding-bottom: 0.05rem;
	background: #ffffff;
	/*height: 0.86rem;*/
}
.charge-top-left{
	float: left;
	width: 16%;
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
	width: 73%;
}
.charge-top-right h2{
	margin: 0.18rem 0 0.17rem 0;
	font-size: 19px;
	color: #333;
	line-height: 0.2rem;
}
.charge-top-right p{
	font-size: 14px;
	color: #999;
}
.tab-section{
	width: 100%;
	height: 0.46rem;
	background: #f5f5f5;
	padding: 0.06rem 0;
}
.tab-section ul{
	display: flex;
	margin: 0 auto 0;
	width: 92%;
	height: 0.3rem;
	border: 1px solid #478dfd;
	border-radius: 5px;
	line-height: 0.3rem;
	text-align: center;
}
.tab-section ul li{
	flex: 1;
}
.tab-section ul li a{
	display: block;
	flex: 1;
	font-size: 12px;
	color: #478dfd;
}
.tab-section ul li:nth-of-type(1) a{
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
}
.tab-section ul li:nth-of-type(2) a{
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;
}
/*.creat-charge{
	position: absolute;
	padding-bottom: 1rem;
	top: 0rem;
	right: 0;
	left: 0;
	min-height: 100%;
	height: auto ! important;
	background: #f5f5f5;
	text-align: left;
	overflow: auto;
}
.money-charge{
	position: absolute;
	padding-bottom: 1rem;
	top: 0rem;
	right: 0;
	left: 0;
	min-height: 100%;
	height: auto ! important;
	background: #f5f5f5;
	text-align: left;
	overflow: auto;
}*/
.creat-charge{
	text-align: left;
}
.money-charge{
	text-align: left;
}
.bank-recommand ul{
	border-top: 1px solid #f4f4f4;
}
.bank-recommand ul li{
	margin-bottom: 0.06rem;
	padding-bottom: 0.15rem;
	border-bottom: 1px solid #f4f4f4;
	background: #fff;
}
.bank-recommand ul li .content{
	width: 100%;
}
.left-box{
	margin: 0 0.16rem 0 0.15rem;
	float: left;
	width: 16%;
}
.middle-box{
	float: left;
	width: 42%;
	text-align: left;
}
.bank-recommand .right-box{
	border: 1px solid #f00;
	margin-right: 0.1rem;
	margin-top: 0.5rem;
	float: right;
	width: 26%;
	height: 0.35rem;
	background: #f0f0f0;
	border: 1px solid #e2e2e2;
	border-radius: 16px;
}
.bank-recommand .right-box label{
	display: block;
	width: 63%;
	float: left;
	height: 0.35rem;
	background: none;
}
.bank-recommand .right-box label input{
	display: block;
	padding-right: 0.1rem;
	width: 90%;
	height: 0.32rem;
	border: none;
	outline: none;
	background: none;
	font-size: 14px;
	color: #3584f3;
	text-align: right;
}
.bank-recommand .right-box small{
	display: block;
	width: 0.32rem;
	height: 0.32rem;
	background: #fff;
	border-radius: 100%;
	float: right;
	line-height: 0.32rem;
	text-align: center;
	box-shadow: 0px 1px 8px 1px 
	rgba(0, 0, 0, 0.21);
	font-size: 18px;
	color: #3584f3;
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
	font-size: 12px;
	color: #5a87ed;
	transform: scale(0.8);
}
.right-box p:nth-of-type(1) b{
	font-size: 28px;
}
.height-price-box small{
	display: inline-block;
	height: 100%;
	width: 15%;
}
.right-box .height-price{
	display: inline-block;
	width: 0.74rem;
	height: 100%;
}
.right-box .height-price span{
	display: inline-block;
	font-size: 12px;
	transform: scale(0.8);
	color: #333;
}
.percer-section{
	max-height: 0;
	overflow: hidden;
	background: #8cb8ff;
}
.percer-box{
	display: block;
	width: 100%;
	height: 0.35rem;
}
.percer-section.open{
	max-height: 0.35rem;
	-webkit-transition: max-height 1s;
}
.percer-section.close{
	max-height: 0;
	-webkit-transition: max-height 1s;
}
.toptransform{
	-webkit-transition: all .5s;
	transform: rotate(180deg);
}
.bottransform{
	-webkit-transition: all .5s;
	transform: rotate(0deg);
}
.percer-box input{
	display: inline-block;
	width: 80%;
	height: 90%;
	color: #fff;
	background: #8cb8ff;
	border: none;
	outline: none;
	text-align: center;
}
.percer-box input::-webkit-input-placeholder{
	color: #fff;
	font-size: 12px;
	transform: scale(0.8);
}
.percer-box span{
	display: inline-block;
	font-size: 12px;
	transform: scale(0.8);
	color: #fff;
}
.color{
	color: #ff5555 ! important;
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
.sure-btn{
	margin: 0.25rem auto;
	width: 60%;
	height: 0.5rem;
	background: #478dfd;
	border-radius: 30px;
	text-align: center;
	line-height: 0.5rem;
	font-size: 19px;
	color: #fff;
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
.money-charge .right-box{
	margin-top: 0.28rem;
	border: 1px solid #f00;
	float: right;
	width: 28%;
	height: 0.35rem;
	background: #f0f0f0;
	border: 1px solid #e2e2e2;
	border-radius: 16px;
}
.money-charge .right-box label{
	display: block;
	width: 63%;
	float: left;
	height: 0.35rem;
	background: none;
}
.money-charge .right-box label input{
	display: block;
	padding-right: 0.1rem;
	width: 90%;
	height: 0.32rem;
	border: none;
	outline: none;
	background: none;
	font-size: 14px;
	text-align: right;
}
.money-charge .right-box small{
	display: block;
	width: 0.32rem;
	height: 0.32rem;
	background: #fff;
	border-radius: 100%;
	float: right;
	line-height: 0.32rem;
	text-align: center;
	box-shadow: 0px 1px 8px 1px 
	rgba(0, 0, 0, 0.21);
	font-size: 18px;
	color: #3584f3;
}
.money-charge .tags-box span{
	margin-right: 0.06rem;
}
.client-error{position: absolute; top: 1.0rem; bottom: 0; width: 100%;}
.client-error .img-section{padding-top: 0.44rem; margin: 0.83rem auto 0.43rem; width: 1.78rem; height: 1.78rem; background: #eee; border-radius: 100%;}
.client-error .img-section img{margin: 0 auto; width: 0.75rem; height: 0.91rem;}
.client-error p{margin-bottom: 0.15rem; font-size: 0.16rem; color: #666666; text-align: center;}
</style>
