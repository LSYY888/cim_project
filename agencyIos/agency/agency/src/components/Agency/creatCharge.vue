<template>
	<div class='charge-set'>
		<div class='charge-set-top'>
			<div class='charge-top-section clearfix'>
				<div class='charge-top-left'>
					<img src='../../assets/img/bg_img18.png' />
				</div>
				<div class='charge-top-right'>
					<h2>{{priceRealname}}</h2>
					<p>{{priceMobile}}</p>
				</div>
			</div>
			<div class='tab-section'>
				<ul>
					<li>
						<a>信用卡</a>
					</li>
					<li>
						<a>理财</a>
					</li>
				</ul>
			</div>
		</div>
		<div class='creat-charge'>
			<div class="bank-recommand">
				<ul class="clearfix">
					<li v-for='(data, index) in creatData'>
						<div class='content clearfix'>
							<div class='left-box'>
								<img src=''/>
							</div>
							<div class='middle-box'>
								<h2>{{data.companyTitle}}</h2>
								<div class='tags'>
									<span v-for='tag in data.tagList'>{{tag.title}}</span>
								</div>
								<p>{{data.summary}}</p>
							</div>
							<div class='right-box'>
								<div class='height-price-box'>
									<label class='height-price'>
										<input type='text' placeholder="88" :value='!data.type ? data.price : data.type === 0 ? data.type.value : data.price * data.type.value' :class="data.type ? 'red' : 'gray' " ref='priceVal' @blur='blurFn(index)'/>
										<span>元</span>
									</label>
									<small :class="current === index & flag === false ? 'toptransform' : 'bottransform'" @click='arrow(index)'>
										<i></i>
									</small>
								</div>
								<div class='percer-section' :class="current === index & flag === false ? 'open' : 'close'">
									<label class='percer-box'>
										<input type='text' placeholder='请填写百分比' class='percer-input' ref='percer'/>
										<span>%</span>
									</label>
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class='charge-set-footer'>
			<div class='sure-btn'>保存</div>
		</div>
	</div>
</template>
<script>
	import '../../../src/assets/css/common.css'
	import Back from './back.vue'
	export default {
		components: {
			Back
		},
		data () {
			return {
				priceRealname: localStorage.getItem('priceRealname'),
				priceMobile: localStorage.getItem('priceMobile'),
				creatData: '',
				flag: true,
				oneFlag: true,
				current: -1,
				priceSn: localStorage.getItem('priceSn')
			}
		},
		created () {
			this.creatAjax()
			console.log(this.creatData)
		},
		mounted () {
			var aa = this.$refs.priceVal
			console.log(aa)
		},
		methods: {
			arrow (index) {
				this.current = index
				console.log(this.$refs.priceVal[index].value)
				if (this.current === index) {
					if (this.oneFlag === true) {
						this.flag = false
						this.oneFlag = false
					} else {
						this.oneFlag = true
						this.flag = true
					}
				}
			},
			blurFn (index) {
				console.log(this.$refs.priceVal[index].value)
			},
			creatAjax () {
				var url = this.$api.wxUrl + 'api/pricing/list?pt=0' + '&sn=' + this.priceSn
				this.$http.get(url).then(response => {
					if (response.data.code === 1) {
						this.creatData = response.data.data
						console.log(this.creatData)
					}
				})
			}
		}
	}
</script>
<style scoped>
	/*.charge-set{
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		min-height: 100%;
		height: auto ! important;
		background: #f5f5f5;
		text-align: left;
	}*/
	.charge-set-top{
		position: fixed;
		top: 0;
		left: 0;
		height: 1.4rem;
		width: 100%;
		z-index: 10;
	}
	.charge-top-section{
		background: #fff;
	}
	.charge-top-left{
		float: left;
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
	}
	.charge-top-right h2{
		margin: 0.18rem 0 0.17rem 0;
		font-size: 19px;
		color: #333;
	}
	.charge-top-right p{
		font-size: 12px;
		color: #999;
	}
	.tab-section{
		width: 100%;
	}
	.tab-section ul{
		display: flex;
		margin: 0.1rem auto 0.13rem;
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
	.creat-charge{
		position: absolute;
		padding-bottom: 1rem;
		top: 1.4rem;
		right: 0;
		left: 0;
		bottom: 0.95rem;
		min-height: 100%;
		height: auto ! important;
		background: #f5f5f5;
		text-align: left;
		overflow: auto;
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
    width: 100%;
  }
  .left-box{
  	margin: 0 0.16rem 0 0.15rem;
    float: left;
  }
  .middle-box{
    float: left;
  }
  .bank-recommand .right-box{
  	margin: 0.56rem 0.14rem 0 0;
    float: right;
    width: 0.97rem;
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
  }
  .middle-box .tags{
    margin-bottom: 0.07rem;
  }
  .middle-box .tags span{
    display: inline-block;
    margin-right: 0.02rem;
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
  .height-price-box{
  	padding: 0.05rem 0;
  	border: 1px solid #999;
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
  .right-box .height-price input{
  	display: inline-block;
  	width: 0.54rem;
  	height: 90%;
  	text-align: right;
  	font-size: 16px;
  	color: #999;
  	border: none;
  	outline: none;
  }
  .right-box i{
    display: inline-block;
    width: 11px;
    height: 6px;
    background: url(../../assets/img/bg_img36.png) no-repeat center center;
    background-size: 100% 100%;
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
	.finace-recommand .right-box{
  	margin: 0.28rem 0.14rem 0 0;
    float: right;
    width: 0.97rem;
  }
  .charge-set-footer{
		position: fixed;
		height: 0.95rem;
		bottom: 0;
		left: 0;
		width: 100%;
		z-index: 20;
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
</style>