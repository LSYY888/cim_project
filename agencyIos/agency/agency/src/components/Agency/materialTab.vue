<template>
  <div class="materialTab">
    <div class="hot-artical-section">
      <dl class='clearfix' @click='arcOne'>
        <dt>
          <img src='../../assets/img/bg_img31.png'/>
        </dt> 
        <dd>
          <h3>你和美好生活之间,还差一张信用卡!</h3>
          <p>早在前几年,身边好多人都没有信用卡;不过近几年,身边越来越多...</p>
        </dd>
      </dl>
      <dl class='clearfix arcTwo' @click='arcTwo'>
          <dt>
            <img src='../../assets/img/bg_img80.png'/>
          </dt>
          <dd>
            <h3 class='h3'>白户首次申请信用卡,该选择哪些银行容易下卡?</h3>
            <p>对于白户(或者三无，条件不给力的群体)可能想申请一张信用卡...</p>
          </dd>
        </dl>
        <dl class='clearfix' @click='arcThree'>
          <dt>
            <img src='../../assets/img/bg_img81.png'/>
          </dt>
          <dd>
            <h3 class='h3'>信用黑户能办信用卡吗?</h3>
            <p>征信黑是指的是银行对个人信用的不良评价,会直接影响到个人...</p>
          </dd> 
        </dl>
        <dl class='clearfix' @click='arcSix'>
          <dt>
            <img src='../../assets/img/bg_img93.png'/>
          </dt>
          <dd>
            <h3 class='h3'>3分钟搞懂,信用卡批卡内幕!</h3>
            <p>来说说你不知道的信用卡初审内幕...</p>
          </dd> 
        </dl>
        <dl class='clearfix' @click='arcSeven'>
          <dt>
            <img src='../../assets/img/bg_img133.png'/>
          </dt>
          <dd>
            <h3>[银行内部资料]看懂再申请信用卡,保证你下卡!</h3>
            <p>经常有小伙伴对小编说,申请信用卡怎么这么难啊,总是被拒绝...</p>
          </dd> 
        </dl>
        <dl class='clearfix' @click='arcEight'>
          <dt>
            <img src='../../assets/img/bg_img142.png'/>
          </dt>
          <dd>
            <h3>史上最全,各行信用卡申请攻略!看这一篇就够了</h3>
            <p>有很多朋友,申卡是比较难的,除了包装等细节没有做好,剩下.....</p>
          </dd> 
        </dl>
        <dl class='clearfix' @click='arcNine'>
          <dt>
            <img src='../../assets/img/bg_img137.png'/>
          </dt>
          <dd>
            <h3>最强攻略！信用卡养卡和快速提额的核心法则！</h3>
            <p>第一个2，就是俩大原则，第二个2，就是提额的俩大核心....</p>
          </dd> 
        </dl>
        <dl class='clearfix' @click='arcTen'>
          <dt>
            <img src='../../assets/img/bg_img143.png'/>
          </dt>
          <dd>
            <h3>信用卡面签被拒？一定是没掌握这几点</h3>
            <p>各家银行对信用卡面签的规定不一，有的银行是在下卡之后，通知....</p>
          </dd> 
        </dl>
        <dl class='clearfix' @click='arcEleven'>
          <dt>
            <img src='../../assets/img/bg_img144.png'/>
          </dt>
          <dd>
            <h3>2018年信用卡提额排名大盘点</h3>
            <p>笔者认为，使用信用卡提额快的银行才能快速提升自己的信用....</p>
          </dd> 
        </dl>
    </div>
  </div>
</template>
<script>
  // import $ from '../../../node_modules/jquery/dist/jquery.min.js'
  import '../../../src/assets/css/common.css'
  export default {
    methods: {
      arcOne () {
        this.$router.push({
          path: '/promotionalMaterial',
          name: 'promotionalMaterial'
        })
      },
      arcFive () {
        this.$router.push({
          path: '/trainingClassCard',
          name: 'trainingClassCard'
        })
      },
      arcSix () {
        this.$router.push({
          path: '/hotFiveArtical',
          name: 'hotFiveArtical'
        })
      },
      arcSeven () {
        this.$router.push({
          path: '/hotSixArtical',
          name: 'hotSixArtical'
        })
      },
      arcEight () {
        this.$router.push({
          path: '/hotSevenArtical',
          name: 'hotSevenArtical'
        })
      },
      arcNine () {
        this.$router.push({
          path: '/hotEightArtical',
          name: 'hotEightArtical'
        })
      },
      arcTen () {
        this.$router.push({
          path: '/hotNineArtical',
          name: 'hotNineArtical'
        })
      },
      arcEleven () {
        this.$router.push({
          path: '/hotTenArtical',
          name: 'hotTenArtical'
        })
      },
      arcTwo () {
        this.$router.push({
          path: '/hotTwoArtical',
          name: 'hotTwoArtical'
        })
      },
      arcThree () {
        this.$router.push({
          path: '/hotThreeArtical',
          name: 'hotThreeArtical'
        })
      } 
    }
  }
</script>
<style scoped>
  .materialTab{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    min-height: 100%;
    height: auto ! important;
    width: 100%;
    background: #f5f5f5;
    margin-top: 0.14rem;
    text-align: left;
  }
  .hot-artical-section{
    width: 100%;
    background: #fff;
  }
  .hot-artical-section h2{
    margin: 0.12rem 0 0.12rem 0.15rem;
    font-size: 16px;
    color: #666;
  }
  .hot-artical-section dl{
  margin: 0 0.1rem 0.1rem 0.1rem;
  background: #fff;
  }
  .hot-artical-section dl dt{
  float: left;
  width: 42%;
  height: 0.9rem;
  background: #fff;
  }
  .hot-artical-section dl dt img{
  width: 100%;
  height: 100%;
  }
  .hot-artical-section dl dd{
  padding: 0.05rem 0.03rem 0.1rem 0.09rem;
  float: left;
  width: 52%;
  background: #fff;
  }
  .hot-artical-section dl dd h3{
  line-height: 0.2rem;
  font-size: 14px;
  color: #333;
  font-weight: bold;
  }
  .hot-artical-section dl dd p{
  display: -webkit-box;
  line-height: 0.16rem;
  font-size: 12px;
  color: #999;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  }
</style>