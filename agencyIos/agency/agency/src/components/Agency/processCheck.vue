<template>
	<div class="process-check-list">
		<ul>
			<li>
				<div class="bank-list-name">
					<h2>111</h2>
				</div>
				<div class="processCheck-applyInformation">
					<p>申请人姓名：<i>111</i></p>
					<p>手机号码：<i>111</i></p>
					<p>申请时间：<i>11111</i></p>
				</div>
				<div class="btn-section clearfix">
					<a href="javascript:;">进度查询</a>
				</div>
			</li>
		</ul>
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
			}
		},
		created () {
		},
		methods: {
		}
	}
</script>
<style scoped>
	.process-check-list{
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
	  .process-check-list{
	  	margin: 0 auto;
	  	height: 100%;
	    width: 750px;
	  }
	}
	.process-check-list ul li{
		margin-bottom: 0.1rem;
		width: 100%;
		background: #fff;
	}
	.bank-list-name{
		padding: 0.14rem 0 0.14rem 0.19rem;
		border-bottom: 1px solid #f6f6f6;
	}
	.bank-list-name h2{
		padding-left: 0.08rem;
		border-left: 3px solid #333;
		font-size: 14px;
		color: #333;
	}
	.processCheck-applyInformation{
		padding: 0.1rem 0 0.02rem 0.29rem;
		border-bottom: 1px solid #f6f6f6;
	}
	.processCheck-applyInformation p{
		margin-bottom: 0.09rem;
		font-size: 14px;
		color: #333;
	}
	.btn-section{
		height: 0.48rem;
	}
	.btn-section a{
		margin: 0.1rem 0.14rem 0 0;
		float: right;
		display: block;
		width: 0.77rem;
		height: 0.28rem;
		border: 1px solid #427de8;
		border-radius: 14px;
		font-size: 12px;
		color: #496ee0;
		line-height: 0.28rem;
		text-align: center;
	}
</style>