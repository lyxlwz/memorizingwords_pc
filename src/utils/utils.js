import Vue from 'vue'

export const baseModel = {
  actionModel: 'add' // 用于表格操作对话框的模式 eidt: 编辑模式  add: 添加模式，默认是添加模式
}

export function mergeObject(model) {
  if (model) {
    return { ...baseModel, ...model }
  }
  return {}
}

export function uuid() {
  var s = []
  var hexDigits = '0123456789abcdef'
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-'
  var uuid = s.join('')
  return uuid
}

export function randomString(length) {
  var str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  var result = ''
  for (var i = length; i > 0; --i) { result += str[Math.floor(Math.random() * str.length)] }
  return result
}

/**
 * 时间转换为XX前
 */
export const clickDateDiff = function (value) {
  let dataValue = value
  if (typeof value === 'string') {
    dataValue = new Date(value.replace(/-/g, '/')).getTime()
  }
  var result
  var minute = 1000 * 60
  var hour = minute * 60
  var day = hour * 24
  var month = day * 30
  var now = new Date().getTime()
  var diffValue = parseInt(now) - parseInt(dataValue)
  if (diffValue < 0) {
    return
  }
  var monthC = diffValue / month
  var weekC = diffValue / (7 * day)
  var dayC = diffValue / day
  var hourC = diffValue / hour
  var minC = diffValue / minute
  if (monthC >= 1) {
    result = '' + parseInt(monthC) + '月前'
  } else if (weekC >= 1) {
    result = '' + parseInt(weekC) + '周前'
  } else if (dayC >= 1) {
    result = '' + parseInt(dayC) + '天前'
  } else if (hourC >= 1) {
    result = '' + parseInt(hourC) + '小时前'
  } else if (minC >= 1) {
    result = '' + parseInt(minC) + '分钟前'
  } else {
    result = '刚刚'
  }
  return result
}
/**
 * 时间戳转换为想要的时间格式
 */
// 时间戳转换为时间 format('yyyy-MM-dd hh:mm:ss')
// 时间格式转换
Date.prototype.format = function (fmt = 'yyyy-MM-dd hh:mm:ss') { // author: meizz
  var o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    'S': this.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((
        '00' + o[
        k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

// 时间距离现在多少天前
Vue.filter('timeFormat', function (val, fmt = 'yyyy-MM-dd hh:mm:ss') {
  if (val) {
    if (typeof val === 'string') {
      const timeText = val.replace(/-/g, '/')
      return new Date(timeText).format(fmt)
    } else if (typeof val === 'number') {
      return new Date(val).format(fmt)
    }
  } else {
    return ''
  }
})

export function currentDate() {
  const d = new Date()
  let str = ''
  str += d.getFullYear() + '-' // 获取当前年份
  const month = d.getMonth() + 1
  str += month < 10 ? '0' + month + '-' : month + '-' // 获取当前月份（0——11）
  str += d.getDate() + ' '
  const hours = d.getHours()
  str += hours < 10 ? '0' + hours : hours + ':'
  str += d.getMinutes() + ':'
  str += d.getSeconds()
  return str
}

export function isOjbect(param) {
  return Object.prototype.toString.call(param) === '[object Object]'
}

export function isFunction(param) {
  return Object.prototype.toString.call(param) === '[object Function]'
}

export function isArray(param) {
  return Object.prototype.toString.call(param) === '[object Array]'
}

export function isNumber(param) {
  return Object.prototype.toString.call(param) === '[object Number]'
}

export function isBoolean(param) {
  return Object.prototype.toString.call(param) === '[object Boolean]'
}

/**
 * @param {*} element
 * @param {*} className
 * @returns
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const clazz = classString.split(' ').filter(it => it.indexOf('theme_color_') === -1)
  clazz.push(className)
  classString = clazz.join(' ')
  element.className = classString
}

/**
 * 中划线字符驼峰
 * @param {*} str 要转换的字符串
 * @returns 返回值
 */
export function toHump(str) {
  if (!str) return str
  return str.replace(/\-(\w)/g, function (all, letter) {
    return letter.toUpperCase()
  }).replace(/(\s|^)[a-z]/g, function (char) {
    return char.toUpperCase()
  })
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function toggleThemeColorClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const clazz = classString.split(' ').filter(it => it.indexOf('theme_') === -1)
  clazz.push(className)
  classString = clazz.join(' ')
  element.className = classString
}

export function toggleThemeClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const clazz = classString.split(' ').filter(it => it.indexOf('theme_') !== -1)
  clazz.push(className)
  classString = clazz.join(' ')
  element.className = classString
}

