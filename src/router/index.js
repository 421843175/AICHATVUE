import Vue from 'vue'
import VueRouter from 'vue-router'
import ChatWeb from '@/components/ChatWeb'
import Login from '@/components/Login'
import shops  from '../components/Shops.vue'
import Setting from '../components/Setting.vue'
import CustomerSetting from '../components/CustomerSetting.vue'

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
}


Vue.use(VueRouter)


 const routes= [
  {
    path: '/',
    name: 'Shops',
    component: shops,
    meta: { isAuth: true }  //需要认证
  },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/chat/:id?:user?', 
       //TODO: 传id 如果是1是对接卖家(机器人/人工) 如果是0是对接客服(机器人/人工)
      name: 'ChatWeb',
      component: ChatWeb,
      meta: { isAuth: true },  //需要认证
        // 添加以下配置防止组件复用问题
      props: route => ({ key: route.fullPath }) // 通过唯一key强制组件重建
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting,
      meta: { isAuth: true }  //需要认证
    },
    {
      path: '/customersetting',
      name: 'customersetting',
      component: CustomerSetting,
      meta: { isAuth: true }  //需要认证
    },
  ]

const router = new VueRouter({
  mode: "history",
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    return {x: 0, y: 0}
  }
})

router.beforeEach((to, from, next) => {
  // 检查目标路由是否需要认证
  if (to.matched.some(record => record.meta.isAuth)) {  // 修改判断逻辑
      const hasToken = localStorage.getItem("usertoken")
      
      if (!hasToken) {
          console.log("需要登录认证")
          next({
              path: '/login',
              query: { redirect: to.fullPath }
          })
          return
      }
  }
  
  next()  // 其他情况放行
})

export default router