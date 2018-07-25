<template>
  <div class="training-class">
    <ul class='list-content-section'>
      <li>
        <h2 class="clearfix">
          <i></i>
          <span>1.代理免费加入活动开始了！</span>
          <em>2018-06-01</em>
        </h2>
        <div>
          <p class='open'>各位尊敬的趣返返伙伴：</br>
          为进一步支持各位趣返返伙伴扩大自己代理队伍规模的需求，从2018-6-1日开始至2018-7-31，趣返返将开展为期2个月的“免费加入趣返返代理”活动，在此活动期间只需上级代理审批，即可加入成为趣返返代理，免费开展信用卡和理财产品的推广业务，赚取高额佣金，请各位老代理积极发展代理团队，请各位新代理踊跃加入趣返返大家庭。趣返返帮你实现零成本轻创业！</p>
        </div>
      </li>
      <li>
        <h2 class="clearfix">
          <i></i>
          <span>2.重磅功能上线通知！</span>
          <em>2018-05-07</em>
        </h2>
        <div>
          <p>各位尊敬的趣返返伙伴：</br>
            趣返返首页增加了“佣金设置”功能，进一步满足各位上级代理对不同下级代理进行灵活佣金设置的需求，请各位趣返返伙伴体验&使用，使用过程中如遇任何问题，可咨询专属客服。
          </p>
        </div>
      </li>
      <li>
        <h2 class="clearfix">
          <i></i>
          <span>3.信用卡进度查询功能上线通知！</span>
          <em>2018-04-16</em>
        </h2>
        <div>
          <p>为了提升信用卡进度查询功能的用户体验，趣返返对各银行信用卡进度查询页面进行了统一封装，后续各位趣返返伙伴查询信用卡进度时可在趣返返内部页面直接查询，无需再跳转至各银行查询页面。</p>
        </div>
      </li>
      <li>
        <h2 class="clearfix">
          <i></i>
          <span>4.银行增加通知！</span>
          <em>2018-03-06</em>
        </h2>
        <div>
          <p>各位尊敬的趣返返伙伴：</br>
          第一批上线的银行已增加至6家，包括交通、浦发、招商、中信、兴业、光大、民生，均是大型股份制银行，信誉服务均有保障，欢迎各位趣返返伙伴自申请或积极推广。</p>
        </div>
      </li>
      <li>
        <h2 class="clearfix">
          <i class='toptransform'></i>
          <span>5.趣返返上线通知！</span>
          <em>2018-01-30</em>
        </h2>
        <div class='first-li'>
          <p>各位尊敬的来返返用户以及趣返返代理商：</br>
          经过小鹏科技的研发团队不懈的努力，趣返返信用卡代理平台终于上了！</br>
          趣返返是一款面向专业信用卡发卡代理商的平台级产品，业务核心团队均来自于阿里、UC、新浪、去哪儿，为各位代理商提供专业强大稳定的服务。</br>
          感谢您对趣返返的关注，趣返返始终为您的金融事业增添助力、保驾护航！</p>
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
    mounted () {
      $('.list-content-section li').on('click', function () {
        $(this).find('p').addClass('open').parents('li').siblings('li').find('p').removeClass('open')
        $(this).find('i').addClass('toptransform').parents('li').siblings('li').find('i').removeClass('toptransform')
      })
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
  .first-li{
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
  .list-content-section h2 em{
    display: block;
    margin-right: 0.1rem;
    float: right;
    font-size: 12px;
    color: #666;
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
    padding: 0.18rem 0;
    max-height: 1.8rem;
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