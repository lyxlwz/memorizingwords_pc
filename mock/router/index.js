import { baseAddress } from '@/api/url'
import Mock from 'mockjs'
import { baseData } from '../base'

export const adminRoutes = [
  {
    menuUrl: '/exception',
    menuName: '异常页面',
    icon: 'warning',
    children: [
      {
        menuUrl: '/exception/404',
        menuName: '404'
      },
      {
        menuUrl: '/exception/403',
        menuName: '403'
      },
      {
        menuUrl: '/exception/500',
        menuName: '500'
      }
    ]
  }
]

Mock.mock(baseAddress + '/getMenuList', function () {
  baseData.data = adminRoutes
  return Mock.mock(baseData)
})
