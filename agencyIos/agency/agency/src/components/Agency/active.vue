<template>
	<div class='active'>
		<div class='active-top-section'>
			<img src='../../assets/img/bg_img31.png' />
		</div>
		<div class='active-middle-section'>
			<div class='input-section'>
				<img src='../../assets/img/bg_img32.png' />
				<div class='input-box'>
					<ul>
						<li class='telphone-section'>
							<label>
								<input type='text' placeholder='请输入手机号码'/>
							</label>
						</li>
						<li class='identify-section clearfix'>
							<label>
								<input type='text' placeholder='请输入验证码'/>
							</label>
							<a href='javascript:;'>获取验证码</a>
						</li>
					</ul>
					<div class='button-section'>立即办卡</div>
				</div>
			</div>
		</div>
		<div class='active-footer-section'>
			<img src='../../assets/img/bg_img35.png' />
		</div>
	</div>
</template>
<script>
	import '../../../src/assets/css/common.css'
	export default {}
</script>
<style scoped>
	.active{
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		width: 100%;
		min-height: 100%;
		height: auto ! important;
		background: #f51f47;
	}
	.active-top-section img{
		display: block;
		width: 100%;
		height: 100%;
	}
	.input-section img{
		position: relative;
		margin: 0 auto;
		width: 74%;
		height: 100%;
	}
	.input-box{
		margin: -0.2rem auto 0;
		width: 88%;
		height: 2.09rem;
		background: url(../../assets/img/bg_img33.png) no-repeat center center;
		background-size: 100% 100%;
	}
	.input-box{
		text-align: left;
	}
	.input-box ul{
		padding-top: 0.33rem;
	}
	.input-box ul li{
		margin-bottom: 0.13rem;
	}
	.telphone-section label{
		display: block;
		margin: 0 auto;
		width: 81%;
		height: 0.42rem;
		background: #fdefef;
	}
	.telphone-section label input{
		display: block;
		padding-left: 0.14rem;
		width: 100%;
		height: 100%;
		background: none;
		border: none;
		outline: none;
		font-size: 14px;
		color: #999;
	}
	.identify-section{
		margin: 0 auto;
		width: 81%;
		height: 0.42rem;
	}
	.identify-section label{
		float: left;
		width: 56%;
		height: 100%;
		background: #fdefef;
	}
	.identify-section label input{
		display: inline-block;
		padding-left: 0.14rem;
		width: 100%;
		height: 90%;
		background: none;
		border: none;
		outline: none;
		font-size: 14px;
		color: #999;
	}
	.identify-section a{
		float: right;
		background: url(../../assets/img/bg_img34.png) no-repeat center center;
		background-size: 100% 100%;
		width: 0.94rem;
		height: 100%;
		font-size: 14px;
		color: #ff6561;
		line-height: 0.42rem;
		text-align: center;
	}
	.button-section{
		margin: 0 auto;
		width: 59%;
		height: 0.43rem;
		background: #fd5f4b;
		border-radius: 22px;
		font-size: 16px;
		color: #fffefe;
		line-height: 0.43rem;
		text-align: center;
	}
</style>