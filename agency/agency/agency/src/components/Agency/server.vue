<template>
	<div class="server" v-show="serverBox">
		<div class="mask-layer"></div>
			<div class="mask-box">
				<div class="mask-box-content">
					<h2>趣返返服务协议</h2>
					<p>趣返返由小鹏科技(北京)有限公司(以下简称“我们”)运营，我们依照以下注册协议向您提供本注册协议涉及的相关服务。请您使用趣返返服务前仔细阅读本注册服务协议。您只有完全同意所有注册协议，才能够趣返返的用户(“用户”)并使用相应的服务。您在注册为趣返返用户过程中点击“同意趣返返用户注册服务协议”按钮即表示您已仔细阅读并明确同意遵守本注册协议以及参引而且并入其中的所有条款、政策以及指南，并受该等规则的约束(合称“本注册协议”)。我们可能根据法律法规的邀请或业务运营的需要，对本注册协议不时的进行修改除非另有规定，否则任何变动或者修改将在修订内容于趣返返发布之时即时生效，您对趣返返的使用、继续使用将表明您接受此等变更或修改。如果您不同意本注册协议(包括我们可能不定时对其或其中引述的其他规则所进行的任何修改)的全部规定，则请勿使用趣返返提供的所有服务，或者您可以主动取消趣返返提供的服务。</p>
				</div>
				<a href="javascript:;" @click="sureDialog">确定</a>
			</div>
	</div>
</template>
<script>
	import '../../../src/assets/css/common.css'
	export default {
		components: {
		},
		created () {
		},
		data () {
			return {
				serverBox: true
			}
		},
		methods: {
			sureDialog () {
				this.$emit('serverBtnFN', this.serverBox)
			}
		}
	}
</script>
<style scoped>
	.mask-layer{
	  position: fixed; 
	  width: 100%; 
	  height: 100%; 
	  background: rgba(0,0,0,0.5); 
	  z-index: 995; 
	  top: 0; 
	  left: 0;
	  bottom: 0;
	  right: 0;
	}
	.mask-box{
	  position: fixed;
	  width: 90%;
	  z-index: 1000;
	  top: 50%;
	  left: 50%;
	  transform: translate(-50%, -50%);
	  background: #fff;
	  border-radius: 5px;
	}
	.mask-box-content{
		text-align: left;
		height: 4rem;
		overflow: auto;
	}
	.mask-box-content h2{
		height: 0.65rem;
		font-size: 16px;
		color: #333;
		line-height: 0.65rem;
		text-align: center;
	}
	.mask-box-content p{
		margin: 0 0.13rem 0 0.18rem;
		font-size: 14px;
		color: #353535;
		line-height: 0.24rem;
	}
	.mask-box a{
		display: block;
		margin: 0.15rem auto;
		width: 80%;
		height: 0.48rem;
		background: #4b78f0;
		line-height: 0.48rem;
		text-align: center;
		font-size: 0.2rem;
		color: #fff;
		border-radius: 5px;
	}
</style>