import router from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import LayoutStore, { Layout } from '@/layouts/index'
import { routes as constantRoutes } from '@/router'

import Cookies from 'js-cookie'
import { toHump } from './utils'

import menuStore from '@/layouts/store/index.js'

NProgress.configure({ showSpinner: false })

function getComponent(it) {
  return resolve => {
    if (it.children && it.children.length > 0) {
      require(['@/layouts/RouterViewLayout.vue'], resolve)
    } else {
      require(['@/views' + it.menuUrl], resolve)
    }
  }
}

function getCharCount(str, char) {
  var regex = new RegExp(char, 'g')
  var result = str.match(regex)
  var count = !result ? 0 : result.length
  return count
}

function isMenu(path) {
  return getCharCount(path, '/') === 1
}

function getNameByUrl(menuUrl) {
  const temp = menuUrl.split('/')
  return toHump(temp[temp.length - 1])
}

function generatorRoutes(res) {
  const tempRoutes = []
  res.forEach(it => {
    const route = {
      path: it.menuUrl,
      name: getNameByUrl(it.menuUrl),
      hidden: !!it.hidden,
      component: isMenu(it.menuUrl) ? Layout : getComponent(it),
      meta: {
        title: it.menuName,
        affix: !!it.affix,
        cacheable: !!it.cacheable,
        icon: it.icon || '',
        tip: it.tip
      }
    }
    if (it.children) {
      route.children = generatorRoutes(it.children)
    }
    tempRoutes.push(route)
  })
  return tempRoutes
}

function isTokenExpired() {
  const token = Cookies.get('x-token')
  return !!token
}

const whiteList = ['login']

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (whiteList.includes(to.name)) {
    next()
    NProgress.done()
  } else {
    if (!isTokenExpired()) {
      next(`/login`)
      NProgress.done()
    } else {
      const isEmptyRoute = LayoutStore.isEmptyPermissionRoute()
      if (isEmptyRoute) {
        // 加载路由

        const accessRoutes = generatorRoutes([])
        accessRoutes.push({
          path: '*',
          redirect: '/404',
          hidden: true
        })
        LayoutStore.initPermissionRoute([...constantRoutes, ...accessRoutes])
        router.addRoutes(accessRoutes)
        localStorage.setItem('router', JSON.stringify([...constantRoutes, ...accessRoutes]))
        Cookies.set('router', JSON.stringify([...constantRoutes, ...accessRoutes]))
        menuStore.setDefaultOpeneds([...constantRoutes, ...accessRoutes])

        next({ ...to, replace: true })
      } else {
        next()
      }
    }
  }
})

router.afterEach((to, from) => {
  NProgress.done()
})
