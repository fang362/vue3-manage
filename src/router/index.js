import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import View404 from '../views/View404.vue'
import Cookies from 'js-cookie';
const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
    meta: { title: '登录页' }
  },
  {
    path: '/home',
    name: 'home',
    
    component: HomeView,
    meta: { title: '主页',
    requiresAuth: true}
    //  懒加载
    // which is lazy-loaded when the route is visited.
    // component: () => import( '../views/HomeView.vue')
  },
  {
    path: '/404',
    name: '404',
    component: View404,
    meta: { title: 'Not Found' }
  },


]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// const isAuthenticated = () => {
//   const userInfoCookie = Cookies.get('userInfo');
//   if (userInfoCookie) {
//     const userInfo = JSON.parse(userInfoCookie);
//     // 进行身份验证的逻辑，例如检查用户名和密码是否有效
//     const isValid = checkCredentials(userInfo.username, userInfo.password);
//     return isValid;
//   } else {
//     return false;
//   }
// };

// router.beforeEach((to, from, next) => {
//   if (to.meta.requiresAuth) {
//     const authenticated = isAuthenticated();
//     if (authenticated) {
//       // 已验证，允许访问受保护的路由
//       next();
//     } else {
//       // 未验证，重定向到登录页面或其他处理
//       next('/login');
//     }
//   } else {
//     // 不要求身份验证的路由，直接放行
//     next();
//   }
// });

// 在导航到任何路由之前进行检查。
//如果没有匹配的路由，则可以将用户重定向到404页面
router.beforeEach((to, from, next) => {
   if (to.matched.length === 0)
    { next('/404') } 
    else { 
      next() 
    } })

// const userIdentify = (username, password) => {
//   // 假定存在一个有效的用户名和密码
//   const validUsername = '花开';
//   const validPassword = '111111111';
  
//   // 比较提供的用户名和密码是否与有效的用户名和密码匹配
//   return username === validUsername && password === validPassword;
// };

// const isAuthenticated = () => {
//   const userInfoCookie = Cookies.get('userInfo');
//   if (userInfoCookie) {
//     const userInfo = JSON.parse(userInfoCookie);
//     // 进行身份验证的逻辑，例如检查用户名和密码是否有效
//     const isValid = userIdentify(userInfo.username, userInfo.password);
//     return isValid;
//   } else {
//     return false;
//   }
// };

// router.beforeEach((to, from, next) => {
//   // 检查是否需要进行身份验证
//   if (to.meta.requiresAuth) {
//     //查看是否有权限
//     const authenticated = isAuthenticated();
//     if (authenticated) {
//       // 已验证，允许访问受保护的路由
//       next();
//     } else {
//       // 未验证，重定向到登录页面或其他处理
//       alert('无法进入')
//       next('/');
//       // next('/404');
//     }
//   } else {
//     // 不要求身份验证的路由，直接放行
//     if (to.matched.length === 0) {
//       // 如果没有匹配的路由，则重定向到404页面
//       next('/404');
//     } else {
//       next();
//     }
//   }
// });

//后置守卫
router.afterEach((to, from) => {
  document.title = to.meta.title || 'route'
})
export default router
