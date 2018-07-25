<template>
  <div class="training-class">
    <div class='tabList-section'>
      <ul>
        <li v-for='(tablist, index) in tabList' @click="tabListBtn(index)">{{tablist}}</li>
      </ul>
    </div>
    <ul class='list-content-section' v-show='agent'>
      <li>
        <h2>
          <i class='toptransform'></i>
          <span>1.如何建立自己的代理商团队？</span>
        </h2>
        <div>
          <p class='open'>“趣返返”首页 -> 进入“邀请代理”并下载推广海报 -> 将海报发送至微信好友/微信群/朋友圈完成推广锁粉 -> 用户扫描邀请代理海报并申请成为代理 -> 对代理申请进行预授权 –> 设置代理价格 -> 完成代理授权。</p>
        </div>
      </li>
      <li>
        <h2>
          <i></i>
          <span>2.成为代理商有什么好处？</span>
        </h2>
        <div>
          <p>“趣返返”代理商无需支付任何费用，只需获得专属客服授权。成为代理商后可推广信用卡和理财产品并赚取相应推广奖金，同时可快速搭建并管理自己的下级代理商团队，并可对代理商层级和佣金进行灵活调整，真正实现零投入轻创业。</p>
        </div>
      </li>
      <li>
        <h2>
          <i></i>
          <span>3.如何邀请用户办理信用卡？</span>
        </h2>
        <div>
          <p>“趣返返”首页 -> 进入“邀请办卡”并下载推广海报 -> 将海报发送至微信好友/微信群/朋友圈完成推广锁粉 -> 用户扫描邀请办卡海报 –> 用户关注“来返返”公众号即可办理。</p>
        </div>
      </li>
      <li>
        <h2>
          <i></i>
          <span>4.如何邀请用户购买理财产品？</span>
        </h2>
        <div>
          <p>“趣返返”首页 -> 进入“邀请理财”并下载推广海报 -> 将海报发送至微信好友/微信群/朋友圈完成推广锁粉 -> 用户扫描邀请理财海报 –> 用户下载“返返”客户端即可购买理财产品并享受平台额外返利。</p>
        </div>
      </li>
      <li>
        <h2>
          <i></i>
          <span>5.怎么提升代理等级？</span>
        </h2>
        <div>
          <p>为方便代理商建立并管理属于自己的代理团队，“趣返返”的代理账号具备设置代理等级和佣金比例的功能，因此代理等级的升级条件由上级代理自行设置，具体升级条件请联系专属客服获取。</p>
        </div>
      </li>
      <li>
        <h2>
          <i></i>
          <span>6.如何设置佣金比例？</span>
        </h2>
        <div>
          <p>“趣返返”首页 -> 进入“佣金设置” –> 手动调整佣金比例。</p>
        </div>
      </li>
      <li>
        <h2>
          <i></i>
          <span>7.信用卡推广奖金是多少？</span>
        </h2>
        <div>
          <p>“趣返返”首页 -> 进入“代理价格” –> 查看信用卡推广奖金。</p>
        </div>
      </li>
      <li>
        <h2>
          <i></i>
          <span>8.如何获得信用卡推广奖金</span>
        </h2>
        <div>
          <p>需要完成“进度查询”，并系统显示办卡成功后，代理才可获得办卡奖金。
代理可在“趣返返”首页替用户查询进度，用户也可在“来返返”首页自行查询进度。</p>
        </div>
      </li>
      <li>
        <h2>
          <i></i>
          <span>9.理财产品推广奖金是多少？</span>
        </h2>
        <div>
          <p>“趣返返”首页 -> 进入“代理价格” –> 查看理财推广奖金。</p>
        </div>
      </li>
      <li>
        <h2>
          <i></i>
          <span>10.如何获得理财产品推广奖金？</span>
        </h2>
        <div>
          <p>后台生成理财推广订单后，有1-3个工作日的订单审核确认时间，审核成功后奖金将自动发放。</p>
        </div>
      </li>
      <li>
        <h2>
          <i></i>
          <span>11.奖金如何提现？</span>
        </h2>
        <div>
          <p>向“趣返返”公众号发送“提现” -> 添加“客服”微信号 –> 发送提现单号 –> 客服审核通过后立即转账。</p>
        </div>
      </li>
    </ul>
    <div class='traing-class-section'>
      
    </div>
    <ul class="new-class" v-show='newClass'>
      <li @click='newClassBtn'>
        <h6>趣返返新手攻略，看这一篇就够了</h6>
        <div>
          <img src="../../assets/img/bg_img84.png" />
        </div>
      </li>
      <li @click='cardBtn'>
        <h6>快速填写办卡申请技巧</h6>
        <div>
          <img src="../../assets/img/bg_img130.jpg" />
        </div>
      </li>
    </ul>
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
        tabList: ['代理必读', '新手攻略'],
        agent: true,
        newClass: false
      }
    },
    mounted () {
      $('.tabList-section ul li').removeClass('router-link-active').eq(0).addClass('router-link-active')
      $('.list-content-section li').on('click', function () {
        $(this).find('p').addClass('open').parents('li').siblings('li').find('p').removeClass('open')
        $(this).find('i').addClass('toptransform').parents('li').siblings('li').find('i').removeClass('toptransform')
      })
    },
    methods: {
      tabListBtn (index) {
        $('.tabList-section ul li').removeClass('router-link-active').eq(index).addClass('router-link-active')
        if (index === 0) {
          this.agent = true
          this.newClass = false
        } else {
          this.agent = false
          this.newClass = true
        }
      },
      newClassBtn () {
        this.$router.push({
          path: '/newClass',
          name: 'newClass'
        })
      },
      cardBtn () {
        this.$router.push({
          path: '/trainingClassCard',
          name: 'trainingClassCard'
        })
      }
    }
  }
</script>
<style scoped>
  .training-class{
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
  .list-content-section li{
    border-bottom: 1px solid #f5f5f5;
  }
  .list-content-section h2{
    padding-left: 0.15rem;
    height: 0.5rem;
    line-height: 0.5rem;
    background: #fff;
    font-size: 15px;
    color: #260e0f;
  }
  .list-content-section h2 i{
    display: inline-block;
    width: 16px;
    height: 10px;
    background: url(../../assets/img/bg_img36.png) no-repeat center center;
    background-size: 100% 100%;
  }
  .list-content-section div p{
    margin: 0 0.24rem;
    font-size: 14px;
    color: #666;
    line-height: 20px;
    max-height: 0;
    overflow: hidden;
  }
  .list-content-section div p.open{
    padding: 0.15rem 0;
    max-height: 1rem;
    -webkit-transition: max-height .5s;
  }
  .toptransform{
    -webkit-transition: all .5s;
    transform: rotate(180deg);
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
  .new-class{
    margin-top: 0.14rem;
  }
  .new-class li{
    padding-bottom: 0.1rem;
    margin-bottom: 0.1rem;
    padding-left: 0.15rem;
    background: #fff;
    width: 100%;
  }
  .new-class li h6{
    padding: 0.15rem 0 0.04rem 0;
    font-size: 14px;
    color: #262424;
  }
  .new-class li img{
    width: 90%;
  }
</style>