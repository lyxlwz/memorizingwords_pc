import Vue from 'vue'
import VueRouter from 'vue-router'

import { Layout } from '@/layouts/index'

import NextPageInfo from './next-page/routes'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

export const routes = [
  ...NextPageInfo,
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),
    hidden: true
  },
  {
    path: '/personal',
    name: 'personal',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'center',
        name: 'personalCenter',
        component: () => import('@/views/personal'),
        meta: {
          title: '个人中心'
        }
      }
    ]
  },
  {
    path: '/',
    name: 'root',
    redirect: '/index/main',
    hidden: true
  },
  // 首页
  {
    path: '/index',
    name: 'index',
    component: Layout,
    hidden: false,
    /*    meta: {
      title: "Dashboard",
      icon: "el-icon-house"
    },*/
    children: [
      {
        path: 'main',
        name: 'Main',
        component: () => import('@/views/index'),
        meta: {
          title: '首页',
          affix: true,
          cacheable: true,
          icon: 'el-icon-s-home'
        }
      }
    ]
  },
  // 学习功能
  {
    path: '/learningFun',
    name: 'learningFun',
    component: Layout,
    hidden: false,
    meta: {
      title: '学习功能',
      icon: 'el-icon-s-tools'
    },
    children: [
      {
        path: '/todayLearnWords',
        name: 'todayLearnWords',
        component: () => import('@/views/learningFun/todayLearnWords'),
        meta: {
          title: '今日学习单词',
          icon: 'el-icon-s-tools'
        }
      },
      {
        path: '/todayScreenWords',
        name: 'todayScreenWords',
        component: () => import('@/views/learningFun/todayScreenWords'),
        meta: {
          title: '今日单词筛查',
          icon: 'el-icon-s-tools'
        }
      },
      {
        path: '/fallibleWordScreen',
        name: 'fallibleWordScreen',
        component: () => import('@/views/learningFun/fallibleWordScreen'),
        meta: {
          title: '易错单词筛查',
          icon: 'el-icon-s-tools'
        }
      },
      {
        path: '/randomWordScreen',
        name: 'randomWordScreen',
        component: () => import('@/views/learningFun/randomWordScreen'),
        meta: {
          title: '随机单词筛查',
          icon: 'el-icon-s-tools'
        }
      },
      {
        path: '/numberMemoryTraining',
        name: 'numberMemoryTraining',
        component: () => import('@/views/learningFun/numberMemoryTraining'),
        meta: {
          title: '数字记忆训练',
          icon: 'el-icon-s-tools'
        }
      }
    ]
  },
  // 管理
  {
    path: '/management',
    name: '管理',
    component: Layout,
    hidden: false,
    meta: {
      title: '管理',
      icon: 'el-icon-data-line'
    },
    children: [
      {
        path: 'wordManagement',
        name: 'wordManagement',
        component: () => import('@/views/management/wordManagement'),
        meta: {
          title: '单词管理',
          icon: 'el-icon-s-data'
        }
      }
    ]
  }
]

const createRouter = () => new VueRouter({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
