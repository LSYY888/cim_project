<template>
  <div class="new-class-section">
    <div class='new-class-top clearfix'>
      <img src="../../assets/img/bg_img91.png" class='index'/>
      <i class="new-class-top-left">
        <img src="../../assets/img/bg_img85.png" />
      </i>
      <div class="new-class-top-right">
        <p>1.用户头像：默认使用微信头像，点击后可完善或修改个人资料</p>
        <p>2.账户收益信息：包括总收入、支出（已提现）、余额（未提现）</p>
        <p>3.明细：每一笔收入对应的来源、金额、时间、状态等信息</p>
        <p>4.提现：点击后可进入提现操作页面，其中包含提现教程</p>
        <p>5.邀请代理：进入邀请代理页面可下载专属推广海报，发给想成为你下游代理的朋友</p>
        <p>6.邀请办卡：进入邀请办卡页面可下载专属推广海报，发给想办信用卡的客户</p>
        <p>7.邀请理财：进入邀请理财页面可下载专属推广海报，发给想理财的客户</p>
        <p>8.推广素材：提供信用卡相关的优质内容，并定期更新，可转发给好友或微信群或朋友圈进行锁粉</p>
        <p>9.订单明细：自己及所有下游代理申请信用卡、理财的订单信息，也可以在订单中查询信用卡办卡进度</p>
        <p>10.团队管理：可看到你所有的客户和代理</p>
        <p>11.代理价格：可看到你自己的信用卡和理财产品的推广佣金</p>
        <p>12.佣金设置：可以给你的下游代理设置每一个信用卡产品和理财产品的代理价格</p>
        <p>13.收支明细：个人账户内的佣金收入和支出明细，也可做提现操作</p>
        <p>14.培训课堂：进入后可查看代理必读，包含代理最关心的一些常见问题</p> 
        <p>15.系统公告：趣返返发布的相关通知公告等信息</p>
        <p>16.我的客服：进入后可看见专属客服的微信二维码和联系电话，有任何问题都可以直接找专属客服沟通</p>
        <p>17.新手攻略：里面有趣返返的详细功能和使用介绍，看完你就是高手了</p>
        <p>18.热门文章：最新最优质的信用卡相关文章</p>
      </div>
      <img src="../../assets/img/bg_img102.png" class='index'/>
      <ul>
        <li class="clearfix">
          <img src="../../assets/img/bg_img103.png" />
          <img src="../../assets/img/bg_img104.png" />
        </li>
        <li class="clearfix">
          <img src="../../assets/img/bg_img105.png" class='three-img'/>
          <img src="../../assets/img/bg_img106.png"  class='four-img'/>
        </li>
      </ul>
      <div class="last-img">
        <img src="../../assets/img/bg_img119.png"/>
      </div>
      <img src="../../assets/img/bg_img107.png" class='index moneySet'/>
      <div class="last-img">
        <img src="../../assets/img/bg_img108.png"/>
      </div>
      <ul>
        <li class="clearfix">
          <img src="../../assets/img/bg_img110.png" class='money'/>
          <img src="../../assets/img/bg_img111.png"  class='moneyTwo'/>
        </li>
      </ul>
      <ul>
        <li class="clearfix">
          <img src="../../assets/img/bg_img112.png" class='position-last-img-112'/>
          <img src="../../assets/img/bg_img113.png"  class='moneyTwo113'/>
        </li>
      </ul>
      <div class="last-img position-last-img">
        <img src="../../assets/img/bg_img120.png"/>
      </div>
      <img src="../../assets/img/bg_img117.png" class='index position-last-img'/>
      <ul>
        <li class="clearfix"> 
          <img src="../../assets/img/bg_img114.png" class="position-last-img invite-one-img" />
          <img src="../../assets/img/bg_img115.png" class="position-last-img invite-two-img" />
        </li>
      </ul>
      <ul>
        <li class="clearfix">
          <img src="../../assets/img/bg_img116.png" class="position-last-img invite-one-img"/>
          <img src="../../assets/img/bg_img121.png" class="position-last-img" />
        </li>
      </ul>
      <ul>
        <li class="clearfix">
          <img src="../../assets/img/bg_img122.png" class="position-last-img invite-one-img"/>
          <img src="../../assets/img/bg_img123.png" class="position-last-img" />
        </li>
      </ul>
      <div class="last-img position-last-img">
        <img src="../../assets/img/bg_img124.png"/>
      </div>
      <div class="last-img position-last-img">
        <img src="../../assets/img/bg_img125.png"/>
      </div>
      <img src="../../assets/img/bg_img126.png" class='index position-last-img'/>
      <ul>
        <li class="clearfix">
          <img src="../../assets/img/bg_img127.png" class='position-last-img invite-one-img'/>
          <img src="../../assets/img/bg_img128.png" class='position-last-img'/>
        </li>
      </ul>
      <div class="position-last-img processLastImg">
        <img src="../../assets/img/bg_img129.png"/>
      </div>
    </div>
  </div>
</template>
<script>
  import '../../../src/assets/css/common.css'
  import Back from './back.vue'
  export default {
    components: {
      Back
    }
  }
</script>
<style scoped>
  .new-class-section .new-class-top{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    min-height: 100%;
    height: auto !important;
    background: #f5f5f5;
  }
  .three-img{
    width: 48% !important;
  }
  .four-img{
    width: 51.6% !important;
  }
  .index{
    margin: 0.27rem 0;
    height: 0.33rem;
    width:100%;
  }
  .moneySet{
    height: 0.6rem !important;
  }
  .processLastImg{
    margin-left: 0.05rem;
    width: 50% ! important;
  }
  .new-class-top{
    text-align: left;
    height: 7.02rem;
  } 
  .new-class-top-left{
    display: block;
    margin: 0 0.11rem 0 0.15rem;
    float: left;
    width: 64%;
  }
  .new-class-top-right{
    margin: 0 0.15rem;
    font-size: 12px;
    color: #333;
    line-height: 0.24rem;
  }
  ul{
    margin: 0 0.03rem;
  }
  ul li{
    margin-bottom: 0.21rem;
  }
  ul li img:nth-of-type(1){
    float: left;
    margin-right: 0rem;
    width: 49%;
    height: 100%;
  }
  ul li img:nth-of-type(2){
    float: right;
    width: 49.6%;
    height: 100%;
  }
  .moneyTwo113{
    position: relative;
    top:-0.1rem;
    width: 48.5% !important;
  }
  .last-img{
    margin: 0 0.1rem 0.25rem 0.05rem;
    width: 92%;
    height: 2.89rem;
  }
  .last-img img{
    display: block;
    width: 100%;
    height: 100%;
  }
  .money{
    float: left !important;
    width: 50% !important;
  }
  .moneyTwo{
    float: right !important;
    width: 48% !important;
  }
  .position-last-img{
    position: relative;
    top: -1rem;
  }
  .position-last-img-112{
    position: relative;
    top: -1rem;
  }
  .invite-one-img{
    width: 49.4% !important;
  }
</style>