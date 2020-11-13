/* eslint-disable */
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
import storage from '@utils/localStorage'

Date.prototype.Format = function (fmt) { //author: meizz
  let o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    'S': this.getMilliseconds() //毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

export const getSysDate = (parsePatterns) => {
  if (parsePatterns) {
    return new Date().Format(parsePatterns)
  } else {
    return false
  }
}

/**
 * 计算n天后的日期
 * initDate：开始日期，默认为当天日期， 格式：yyyymmdd/yyyy-mm-dd
 * days:天数
 * flag：返回值， 年与日之间的分隔符， 默认为xxxx年xx月xx日格式
 */
export const getDateAfterN = (initDate, days, flag) => {
  if (!days) {
    return initDate
  }
  initDate = initDate.replace(/-/g, '')
  flag = flag.trim()
  let date
  // 是否设置了起始日期
  if (!initDate.trim()) { // 没有设置初始化日期，就默认为当前日期
    date = new Date()
  } else {
    let year = initDate.substring(0, 4)
    let month = initDate.substring(4, 6)
    let day = initDate.substring(6, 8)
    date = new Date(year, month - 1, day) // 月份是从0开始的
  }
  date.setDate(date.getDate() + days)

  let yearStr = date.getFullYear()
  let monthStr = ('0' + (date.getMonth() + 1)).slice(-2, 8) // 拼接2位数月份
  let dayStr = ('0' + date.getDate()).slice(-2, 8) // 拼接2位数日期
  let result = ''
  if (!flag) {
    result = yearStr + '年' + monthStr + '月' + dayStr + '日'
  } else {
    result = yearStr + flag + monthStr + flag + dayStr
  }
  return result
}

// 是否为空, 如果为空返回 true, 如果不为空返回 false
export const isBlank = (property) => {
  if (property === false) {
    return true
  } else if (property === null || property === undefined || property === 'undefined' || property === 'null' || Object.keys(
    property).length === 0 ||
    !property || property.trim() === '') {
    return true
  } else {
    return false
  }
}

// 是否不为空, 如果不为空返回 true, 如果为空返回 false
export const isNotBlank = (property) => {
  if (property) {
    return true
  } else if (Object.keys(property).length > 0 &&
    property.trim() !== '' && property !== 'undefined' && property !== undefined && property !== null && property !==
    'null') {
    return true
  } else {
    return false
  }
}

export const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

export const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

export const logError = (name, action, info) => {
  let device
  if (!info) {
    info = 'empty'
  }
  try {
    let deviceInfo = uni.getSystemInfoSync()
    device = JSON.stringify(deviceInfo)
  } catch (err) {
    console.error('not support getSystemInfoSync api', err.message)
  }
  let time = formatTime(new Date())
  console.error(time, name, action, info, device)
  if (typeof info === 'object') {
    console.info(JSON.stringify(info))
  }
}

// 指定排序的比较函数
export const compareForMD5 = (property) => {
  return function (obj1, obj2) {
    let value1 = obj1[property]
    let value2 = obj2[property]
    let value1Ascii = 0
    let value2Ascii = 0
    for (let i = 0; i < value1.length; i++) {
      value1Ascii += value1.charCodeAt(i) //只能把字符串中的字符一个一个的解码
    }
    for (let i = 0; i < value2.length; i++) {
      value2Ascii += value2.charCodeAt(i) //只能把字符串中的字符一个一个的解码
    }
    return value1Ascii - value2Ascii // 正序排列
  }
}

export const getTimestamp = () => {
  return new Date().getTime()
}

export const toJSON = (object) => {
  return JSON.parse(JSON.stringify(object))
}

export const setUrl = () => {
  return /(Android)/i.test(navigator.userAgent) ? window.location.href.split('#')[0] : window.entryUrl
}

export const hidePhone = (tel) => {
  return tel.substr(0, 3) + '****' + tel.substr(7)
}

export const pad = (str, maxLength) => {
  return '0'.repeat(maxLength - String(str).length) + str
}

export const groupByFn = (list, fn) => {
  let groups = {}
  list.forEach(function (item) {
    let group = JSON.stringify(fn(item))
    groups[group] = groups[group] || []
    groups[group].push(item)
  })
  return Object.keys(groups).map(group => groups[group])
}

export const groupByField = (list, name) => {
  return list.reduce((obj, item) => {
    if (!obj[item[name]]) {
      obj[item[name]] = []
    }
    obj[item[name]].push(item)
    return obj
  }, {})
}

export const unique = (arr) => {
  return Array.from(new Set(arr))
}

// 检查是否处于登录状态
export function isLogged(userIdKey = 'userId', phoneKey = 'phone') {
  return !!(storage.get(userIdKey) && storage.get(phoneKey))
}
