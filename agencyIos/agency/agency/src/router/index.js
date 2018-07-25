import Vue from 'vue'
import Router from 'vue-router'

// 微信公账号
import agencyIndex from '@/components/Agency/agencyIndex'
import personInformation from '@/components/Agency/personInformation'
import agencyCreditCardDetail from '@/components/Agency/agencyCreditCardDetail'
import server from '@/components/Agency/server'
import processCheck from '@/components/Agency/processCheck'
import customServie from '@/components/Agency/customServie'
import login from '@/components/Agency/login'
import agent from '@/components/Agency/agent'
import incomeAndExpense from '@/components/Agency/incomeAndexpense'
import orderList from '@/components/Agency/orderList'
import team from '@/components/Agency/team'
import proxyPosters from '@/components/Agency/proxyPosters'
import teamChild from '@/components/Agency/teamChild'
import invitCard from '@/components/Agency/invitCard'
import financing from '@/components/Agency/financing'
import active from '@/components/Agency/active'
import trainingClass from '@/components/Agency/trainingClass'
import chargeSetDetail from '@/components/Agency/chargeSetDetail'
import chargeSetIndex from '@/components/Agency/chargeSetIndex'
import creatCharge from '@/components/Agency/creatCharge'
import moneyCharge from '@/components/Agency/moneyCharge'
import hotOneArtical from '@/components/Agency/hotOneArtical'
import hotTwoArtical from '@/components/Agency/hotTwoArtical'
import hotThreeArtical from '@/components/Agency/hotThreeArtical'
import hotFourArtical from '@/components/Agency/hotFourArtical'
import hotFiveArtical from '@/components/Agency/hotFiveArtical'
import hotSixArtical from '@/components/Agency/hotSixArtical'
import hotSevenArtical from '@/components/Agency/hotSevenArtical'
import hotEightArtical from '@/components/Agency/hotEightArtical'
import hotNineArtical from '@/components/Agency/hotNineArtical'
import hotTenArtical from '@/components/Agency/hotTenArtical'
import person from '@/components/Agency/person'
import cash from '@/components/Agency/cash'
import logout from '@/components/Agency/logout'
import ChangePwd from '@/components/Agency/ChangePwd'
import cashClass from '@/components/Agency/cashClass'
import newClass from '@/components/Agency/newClass'
import promotionalMaterial from '@/components/Agency/promotionalMaterial'
import materialTab from '@/components/Agency/materialTab'
import system from '@/components/Agency/system'
import trainingClassCard from '@/components/Agency/trainingClassCard'
Vue.use(Router)
const router = new Router({
  /* mode: 'history', */
  routes: [
    {
      path: '/',
      name: 'agencyIndex',
      component: agencyIndex,
      meta: {
        title: '趣返返'
      }
    },
    { // 代理
      path: '/agent',
      name: 'agent',
      component: agent,
      meta: {
        title: '代理'
      }
    },
    { // 微信公众号
      path: '/agencyIndex',
      name: 'agencyIndex',
      component: agencyIndex,
      meta: {
        title: '趣返返'
      }
    },
    { // 个人信息
      path: '/personInformation',
      name: 'personInformation',
      component: personInformation,
      meta: {
        title: '修改基本资料'
      }
    },
    { // 信用卡详情
      path: '/agencyCreditCardDetail',
      name: 'agencyCreditCardDetail',
      component: agencyCreditCardDetail,
      meta: {
        title: '代理价格'
      }
    },
    { // 服务信息弹窗
      path: '/server',
      name: 'server',
      component: server,
      meta: {
        title: '服务信息弹窗'
      }
    },
    { // 进度查询列表
      path: '/processCheck',
      name: 'processCheck',
      component: processCheck,
      meta: {
        title: '进度查询列表'
      }
    },
    { // 客服
      path: '/customServie',
      name: 'customServie',
      component: customServie,
      meta: {
        title: '我的客服'
      }
    },
    { // 用户
      path: '/login',
      name: 'login',
      component: login,
       meta: {
        title: '登陆'
      }
    },
    { // 收支明细
      path: '/incomeAndExpense',
      name: 'incomeAndExpense',
      component: incomeAndExpense,
      meta: {
        title: '收支明细'
      }
    },
    { // 订单列表
      path: '/orderList',
      name: 'orderList',
      component: orderList,
      meta: {
        title: '订单明细'
      }
    },
    { // 团队
      path: '/team',
      name: 'team',
      component: team,
      meta: {
        title: '团队管理'
      }
    },
    { // 团队子页面
      path: '/teamChild',
      name: 'teamChild',
      component: teamChild,
      meta: {
        title: '团队管理'
      }
    },
    { // 邀请代理的海报
      path: '/proxyPosters',
      name: 'proxyPosters',
      component: proxyPosters,
      meta: {
        title: '邀请代理'
      }
    },
    { // 邀请办卡
      path: '/invitCard',
      name: 'invitCard',
      component: invitCard,
      meta: {
        title: '邀请办卡'
      }
    },
    { // 邀请理财
      path: '/financing',
      name: 'financing',
      component: financing,
      meta: {
        title: '邀请理财'
      }
    },
    { // 活动
      path: '/active',
      name: 'active',
      component: active,
      meta: {
        title: '活动'
      }
    },
    { // 培训课堂
      path: '/trainingClass',
      name: 'trainingClass',
      component: trainingClass,
      meta: {
        title: '培训课堂'
      }
    },
    {
      path: '/trainingClassCard',
      name: 'trainingClassCard',
      component: trainingClassCard,
      meta: {
        title: '培训课堂'
      }
    },
    { // 佣金首页
      path: '/chargeSetIndex',
      name: 'chargeSetIndex',
      component: chargeSetIndex,
      meta: {
        title: '佣金设置'
      }
    },
    { // 佣金设置详情
      path: '/chargeSetDetail',
      name: 'chargeSetDetail',
      component: chargeSetDetail,
      meta: {
        title: '佣金设置'
      }
    },
    {
      path: '/creatCharge',
      name: 'creatCharge',
      component: creatCharge,
      meta: {
        title: '佣金设置详情'
      }
    },
    {
      path: '/moneyCharge',
      name: 'moneyCharge',
      component: moneyCharge,
      meta: {
        title: '佣金设置详情'
      }

    },
    {
      path: '/hotOneArtical',
      name: 'hotOneArtical',
      component: hotOneArtical,
      meta: {
        title: '文章详情'
      }
    },
    {
      path: '/hotTwoArtical',
      name: 'hotTwoArtical',
      component: hotTwoArtical,
      meta: {
        title: '文章详情'
      }
    },
    {
      path: '/hotThreeArtical',
      name: 'hotThreeArtical',
      component: hotThreeArtical,
      meta: {
        title: '文章详情'
      }
    },
    {
      path: '/hotFourArtical',
      name: 'hotFourArtical',
      component: hotFourArtical,
      meta: {
        title: '文章详情'
      }
    },
    {
      path: '/hotFiveArtical',
      name: 'hotFiveArtical',
      component: hotFiveArtical,
      meta: {
        title: '文章详情'
      }
    },
    {
      path: '/hotSixArtical',
      name: 'hotSixArtical',
      component: hotSixArtical,
      meta: {
        title: '文章详情'
      }
    },
    {
      path: '/hotSevenArtical',
      name: 'hotSevenArtical',
      component: hotSevenArtical,
      meta: {
        title: '文章详情'
      }
    },
    {
      path: '/hotEightArtical',
      name: 'hotEightArtical',
      component: hotEightArtical,
      meta: {
        title: '文章详情'
      }
    },
    {
      path: '/hotNineArtical',
      name: 'hotNineArtical',
      component: hotNineArtical,
      meta: {
        title: '文章详情'
      }
    },
    {
      path: '/hotTenArtical',
      name: 'hotTenArtical',
      component: hotTenArtical,
      meta: {
        title: '文章详情'
      }
    },
    {
      path: '/person',
      name: 'person',
      component: person,
      meta: {
        title: '修改基本资料'
      }
    },
    {
      path: '/ChangePwd',
      name: 'ChangePwd',
      component: ChangePwd,
      meta: {
        title: '修改账号密码'
      }
    },
    { // 提现
      path: '/cash',
      name: 'cash',
      component: cash,
       meta: {
        title: '提现'
      }
    },
    { // 登出
      path: '/logout',
      name: 'logout',
      component: logout,
       meta: {
        title: '个人资料'
      }
    },
    {
      path: '/cashClass',
      name: 'cashClass',
      component: cashClass,
       meta: {
        title: '新手必读'
      }
    },
    {
      path: '/newClass',
      name: 'newClass',
      component: newClass,
       meta: {
        title: '新手必读'
      }
    },
    {
      path: '/materialTab',
      name: 'materialTab',
      component: materialTab,
      meta: {
        title: '推广素材'
      }
    },
    {
      path: '/promotionalMaterial',
      name: 'promotionalMaterial',
      component: promotionalMaterial,
       meta: {
        title: '推广素材'
      }
    },
    {
      path: '/system',
      name: 'system',
      component: system,
      meta: {
        title: '系统公告'
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
export default router


