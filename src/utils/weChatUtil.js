import wx from 'weixin-js-sdk'
import checkPlatform from './checkPlatform'
import apis from '../service/api'
import HTTP_STATUS from '../service/status'
import { setUrl, isNotBlank } from './index'
import vm from '../main'

// 微信config配置
/**
 * @Description: 微信配置
 * @author snail
 * @date 2019-02-26
 * @param url 需要配置的页面地址
 * @param jsApiList 需要配置的页面需要使用的api接口集合
 */
function weChatConfig(jsApiList = ['hideMenuItems', 'scanQRCode', 'chooseWXPay', 'onMenuShareTimeline',
  'onMenuShareAppMessage',
]) {
  const url = setUrl()
  return config(process.env.VUE_APP_WE_CHAT_INNER_ID, url, jsApiList)
}

async function config(weChatConfigId, url, jsApiList) {
  const isWeChat = checkPlatform.isWeiXin()
  if (isWeChat && isNotBlank(url)) {
    const genConfigParams = {
      weChatConfigId,
      targetUrl: url,
    }
    const applyParRes = await apis.weChatConfig(genConfigParams)
    const wxConfigData = applyParRes.data.data
    const {
      code,
    } = applyParRes.data
    if (code === HTTP_STATUS.REQUEST_SUCCESS_STATUS) {
      const {
        timestamp,
        nonceStr,
        signature,
        appId,
      } = wxConfigData
      const configData = {
        debug: false, // 开启调试模式
        appId, // 必填，公众号的唯一标识
        timestamp, // 必填，生成签名的时间戳
        nonceStr, // 必填，生成签名的随机串
        signature, // 必填，签名，见附录1
        jsApiList,
      }
      console.log('configData : ', wxConfigData)
      wx.config(configData)
      return true
    }
  }
  return false
}

function noop() {

}

function initOpenId(router, url, callback = noop) {
  const {
    state,
  } = router.query
  // const storageOpenId = storage.get('openId');
  // const userId = storage.get('userId');
  let stateParams = 'boc'
  if (state) {
    stateParams = state
  }
  const storageOpenId = localStorage.getItem('openId')
  if (storageOpenId) {
    callback && callback(true, storageOpenId)
    return
  }
  if (checkPlatform.isWeiXin()) {
    // 包含code参数，说明是微信授权之后回调的，可以使用该code获取openid
    if (router.query.hasOwnProperty('code')) {
      const {
        code,
      } = router.query
      console.log(code)
      getOpenId(code, process.env.VUE_APP_WE_CHAT_INNER_ID, callback)
    } else {
      // 没有包含code参数，需要调整微信授权页面拿取code
      const redirectUrl = genGetCodeUrl(process.env.VUE_APP_PROJECT_URL_PREFIX + url, process.env.VUE_APP_WE_CHAT_APP_ID,
        stateParams)
      console.log('genGetCodeUrl : ', redirectUrl)
      if (redirectUrl) {
        window.location.href = `${redirectUrl}`
      }
      callback && callback(false, null)
    }
  }
}

async function getOpenId(code, weChatConfigId, callback) {
  const params = {
    code,
    weChatConfigId,
  }
  let openId = ''

  const openIdRes = await apis.getOpenId(params)

  const returnCode = openIdRes.data.code
  // const msg = res.data.msg;
  if (returnCode === HTTP_STATUS.REQUEST_SUCCESS_STATUS) {
    // 保存openId
    openId = openIdRes.data.data
    localStorage.setItem('openId', openId)
    callback && callback(true, openId)
  } else {
    vm.$toast('获取OpenId失败')
    callback && callback(false, openId)
  }
}

async function getWeChatUserInfo(openId, callback = noop) {
  let weChatConfigId = process.env.VUE_APP_WE_CHAT_INNER_ID
  const params = {
    openId,
    weChatConfigId,
  }
  let userInfo

  const res = await apis.getWeChatUserInfo(params)

  const returnCode = res.data.code
  if (returnCode === HTTP_STATUS.PAY_SUCCESS) {
    userInfo = JSON.parse(res.data.data)
    userInfo.country = decodeURIComponent(escape(userInfo.country))
    userInfo.nickname = decodeURIComponent(escape(userInfo.nickname))
    localStorage.setItem('weChatUser', JSON.stringify(userInfo))
    callback && callback(true, userInfo)
  } else {
    vm.$toast('获取weChatUserInfo失败')
    callback && callback(false, userInfo)
  }
}

function genGetCodeUrl(redirectUri, appId = process.env.VUE_APP_WE_CHAT_APP_ID, params) {
  return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=snsapi_base&state=${params}#wechat_redirect`
}

/**
 * @Description: 隐藏微信右上角弹出菜单中部分功能按钮
 * @author snail
 * @date 2019-02-26
 * @param menuList 需要隐藏的菜单集合
 * @param callback
 */
function hideWeChatMenuItems(menuList = ['menuItem:share:qq', 'menuItem:share:QZone', 'menuItem:share:weiboApp',
  'menuItem:copyUrl',
], callback) {
  wx.ready(() => {
    wx.hideMenuItems({
      menuList, // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录4
      success(res) {
        if (callback && callback instanceof Function) {
          callback(res)
        }
      },
    })
  })
}

// 分享
function share(title, desc, link, icon, timeLineTitle) {
  weChatShareTimeline((timeLineTitle || title), link, icon)
  weChatShareAppMessage(title, desc, link, icon)
}

/**
 * @Description: 分享到朋友圈
 * @author snail
 * @date 2019-02-26
 * @param title 分享标题
 * @param link  分享内容对应的链接地址
 * @param imgUrl 分享图标
 * @param callback 回调函数
 */
function weChatShareTimeline(title, link, imgUrl, callback) {
  let ret = {}
  wx.ready(() => {
    wx.onMenuShareTimeline({
      // 分享标题
      title,
      // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      link,
      // 分享图标
      imgUrl,
      // 用户确认分享后执行的回调函数
      success() {
        if (callback && callback instanceof Function) {
          ret = {
            success: true,
            type: '1',
            msg: '分享成功',
          }
          callback(ret)
        }
      },
      // 用户取消分享后执行的回调函数
      cancel() {
        if (callback && callback instanceof Function) {
          ret = {
            success: false,
            type: '2',
            msg: '取消分享',
          }
          callback(ret)
        }
      },
      fail(res) {
        if (callback && callback instanceof Function) {
          ret = {
            success: false,
            type: '3',
            msg: res,
          }
          callback(ret)
        }
      },
    })
  })
}

/**
 * @Description: 分享好友
 * @author snail
 * @date 2019-02-26
 * @param title 分享标题
 * @param desc  分享描述信息
 * @param link  分享内容对应的链接地址
 * @param imgUrl 分享图标
 * @param callback 回调函数
 */
function weChatShareAppMessage(title, desc, link, imgUrl, callback) {
  let ret = {}
  wx.ready(() => {
    wx.onMenuShareAppMessage({
      // 分享标题
      title,
      // 分享描述
      desc,
      // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      link,
      // 分享图标
      imgUrl,
      // 用户确认分享后执行的回调函数
      success() {
        if (callback && callback instanceof Function) {
          ret = {
            success: true,
            type: '1',
            msg: '分享成功',
          }
          callback(ret)
        }
      },
      // 用户取消分享后执行的回调函数
      cancel() {
        // alert('取消分享回调函数');
        if (callback && callback instanceof Function) {
          ret = {
            success: false,
            type: '2',
            msg: '取消分享',
          }
          callback(ret)
        }
      },
      fail(res) {
        if (callback && callback instanceof Function) {
          ret = {
            success: false,
            type: '3',
            msg: res,
          }
          callback(ret)
        }
      },
    })
  })
}

// 扫码
function weChatScanQrCode(scanType = ['qrCode', 'barCode'], success, failure) { // ["qrCode","barCode"]
  wx.ready(() => {
    wx.scanQRCode({
      needResult: 1,
      scanType,
      success(res) {
        if (success && success instanceof Function) {
          success(res)
        }
      },
    })
  })
  wx.error((res) => {
    if (failure && failure instanceof Function) {
      failure(res)
    }
  })
}

// 位置

function weChatGetLocation(successCB, failCB) {
  wx.ready(() => {
    wx.getLocation({
      type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      success(res) {
        console.log(res)
        typeof successCB === 'function' && successCB(res)
      },
      fail(err) {
        console.log(err)
        typeof failCB === 'function' && failCB(err)
      },
      cancel(err) {
        console.log(err)
        typeof failCB === 'function' && failCB(err)
      },
      complete(err) {
        console.log(err)
      },
    })
  })
  wx.error((err) => {
    console.warn(err)
  })
}

// 微信H5支付
async function payForH5InnerId(productDesc, orderNum, price, notifyUrl, successUrl, failureUrl, callback) {
  // let isWeChat = checkPlatform.isWeiXin() && !checkPlatform.isYzl();
  const isWeChat = checkPlatform.isWeiXin()
  console.log('是否在微信中打开的 : ', isWeChat)
  const successRedirectUrl = encodeURIComponent(successUrl)
  // let failureRedirectUrl = encodeURIComponent(failureUrl);

  const tradeType = isWeChat ? 'JSAPI' : 'MWEB'
  const openId = isWeChat ? localStorage.getItem('openId') : ''
  const applyPayDataParams = {
    weChatConfigId: process.env.VUE_APP_WE_CHAT_INNER_ID,
    productDesc,
    orderNum,
    price,
    notifyUrl,
    tradeType,
    attach: 'attach', // 暂时写死
    openId,
  }

  console.log('微信预支付需要的参数 applyPayDataParams : ', applyPayDataParams)

  // 声明用于接收发起支付请求后的返回结果
  let timestamp = ''
  let mwebUrl = ''

  const applyParRes = await apis.weChatPayForH5(applyPayDataParams)

  const payResultData = applyParRes.data.data
  const {
    code,
  } = applyParRes.data
  const {
    msg,
  } = applyParRes.data
  console.log('微信预支付返回结果 payResultData : ', payResultData)
  if (code === HTTP_STATUS.REQUEST_SUCCESS_STATUS) {
    // 声明用于接收发起支付请求后的返回结果
    timestamp = payResultData.timeStamp
    const {
      nonceStr,
      prepayId,
      signType,
      paySign,
    } = payResultData
    mwebUrl = isWeChat ? '' : payResultData.mwebUrl
    if (isWeChat) {
      // 配置完以后才能在此方法中调起微信支付的弹窗
      wx.ready(() => {
        // 就绪后的处理
        wx.chooseWXPay({
          timestamp,
          // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。
          // 但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          nonceStr, // 支付签名随机串，不长于 32 位
          package: `prepay_id=${prepayId}`, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
          signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign, // 支付签名
          success(res) {
            if (successUrl !== null && successUrl !== '') {
              // alert(successUrl)
              window.location.href = successUrl
              // alert('支付成功');
            } else {
              alert('支付成功, 下一步跳转页面')
            }
          },
          Error(err) {
            if (failureUrl !== null && failureUrl !== '') {
              alert('支付失败')
            } else {
              alert(`支付失败, 错误信息:${err}`)
            }
          },
          cancel(res) {
            // alert('取消支付');
            if (callback && callback instanceof Function) {
              callback(res)
            }
          },
          fail(res) {
            // alert("支付失败");
            if (callback && callback instanceof Function) {
              callback(res)
            }
          },
        })
      })
    } else {
      window.location.href = `${mwebUrl}&redirect_url=${successRedirectUrl}`
    }
  } else {
    vm.$toast(msg)
  }
}

export default {
  weChatConfig,
  initOpenId,
  getWeChatUserInfo,
  hideWeChatMenuItems,
  share,
  weChatShareTimeline,
  weChatShareAppMessage,
  weChatScanQrCode,
  weChatGetLocation,
  payForH5InnerId,
}
