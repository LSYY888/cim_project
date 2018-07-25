<template>
	<div class='charge-index'>
		<div class='charge-index-top'></div>
		<div class='charge-index-content'>
			<div class='charge-index-content-section'>
				<ul>
					<li @click='clickBtnItem(chargeData)' v-for='chargeData in chargeData'>
						<div class='clearfix liDiv'>
							<div class='charge-index-content-left'>
								<img :src="chargeData.avatar === null ? src : chargeData.avatar" />
							</div>
							<div class='charge-index-content-middle'>
								<h2>{{chargeData.realname}}</h2>
								<p>{{chargeData.mobile}}</p>
							</div>
							<div class='charge-index-content-right'>
								<div :class="chargeData.special === true ? '' : 'active' ">{{chargeData.special === true ? '特殊佣金' : '默认佣金'}}</div>
							</div>
						</div>
					</li>
					<li>
					<div class='clearfix'>
							<div class='charge-index-content-left'>
							</div>
							<div class='charge-index-content-middle'>
							</div>
							<div class='charge-index-content-right'>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class='charge-index-footer'>
			<div class='sure-btn' @click='clickBtn'>设置默认佣金</div>
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
	import '../../../src/assets/css/common.css'
	import Back from './back.vue'
	// import eventBus from '../../components/Agency/eventBus.js'
	export default {
		components: {
			Back
		},
		data () {
			return {
				chargeData: '',
				errorShow: false,
				src: require('../../assets/img/bg_img18.png')
			}
		},
		created () {
			this.chargeDataAjax()
		},
		methods: {
			clickBtnItem (chargeData) {
				localStorage.setItem('priceSn', chargeData.sn)
				localStorage.setItem('priceRealname', chargeData.realname)
				localStorage.setItem('priceMobile', chargeData.mobile)
				/* eventBus.$emit('valhead', chargeData.avatar) */
				localStorage.setItem('teamhead', chargeData.avatar)
				this.$router.push({
					path: '/chargeSetDetail',
					name: 'chargeSetDetail'
				})
			},
			clickBtn () {
				localStorage.setItem('teamhead', localStorage.getItem('infoAvatar'))
				localStorage.setItem('priceSn', '')
				localStorage.setItem('priceRealname', localStorage.getItem('infoRealname'))
				localStorage.setItem('priceMobile', localStorage.getItem('infoMobile'))
				this.$router.push({
					path: '/chargeSetDetail',
					name: 'chargeSetDetail'
				})
			},
			chargeDataAjax () {
				var url = this.$api.wxUrl + 'api/pricing/team'
				this.$http.get(url).then(response => {
					if (response.data.code === 1) {
						if (response.data.data.length === 0) {
							this.errorShow = true
						} else {
							this.errorShow = false
							this.chargeData = response.data.data
						}
					}
				}).catch(error => {
					console.log(error + 'aaa')
				})
			}
		}
	}
</script>
<style scoped>
	.charge-index{
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		min-height: 100%;
		height: auto ! important;
		background: #f5f5f5;
		text-align: left;
	}
	.charge-index-top{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}
	.charge-index-content{
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0.95rem;
		width: 100%;
		overflow: auto;
		height: 100%;
		padding-bottom: 0.95rem;
	}
	.charge-index-footer{
		position: fixed;
		height: 0.95rem;
		bottom: 0;
		left: 0;
		width: 100%;
		z-index: 11;
		background-color:rgba(0,0,0,0.0);
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
	.charge-index-content-section{
	}
	.charge-index-content-section ul li .liDiv{
		padding-bottom: 0.05rem;
		background: #fff;
	}
	.charge-index-content-section ul li{
		border-bottom: 1px solid #f4f4f4;
	}
	.charge-index-content-left{
		float: left;
		width: 22%;
	}
	.charge-index-content-left img{
		display: block;
		margin: 0.15rem 0.19rem 0.14rem 0.15rem;
		width: 0.52rem;
		height: 0.52rem;
		background: #8c97cb;
		border-radius: 100%;
	}
	.charge-index-content-middle{
		float: left;
		width: 51%;
	}
	.charge-index-content-middle h2{
		margin: 0.18rem 0 0.17rem 0;
		font-size: 16px;
		color: #333;
		line-height: 0.2rem;
	}
	.charge-index-content-middle p{
		font-size: 14px;
		color: #999;
	}
	.charge-index-content-right{
		float: right;
		/*width: 26%;*/
	}
	.charge-index-content-right div{
		margin: 0.30rem 0.15rem 0 0;
		padding: 0.06rem 0.15rem;
		font-size: 12px;
		background: #fcb203;
		color: #fff;
		border-radius: 12px;
	}
	.active{
		background: #478dfd ! important;
		color: #fff ! important;
	}
	.client-error{position: absolute; top: 0.5rem; bottom: 0; width: 100%;}
  .client-error .img-section{padding-top: 0.44rem; margin: 0.83rem auto 0.43rem; width: 1.78rem; height: 1.78rem; background: #eee; border-radius: 100%;}
  .client-error .img-section img{margin: 0 auto; width: 0.75rem; height: 0.91rem;}
  .client-error p{margin-bottom: 0.15rem; font-size: 0.16rem; color: #666666; text-align: center;}
</style>