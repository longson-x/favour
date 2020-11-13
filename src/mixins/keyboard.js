/*
  解决 Android 和 iOS 下软键盘弹出时导致的一些问题：
  1. (Android) 在弹出键盘时调用 scrollIntoView，将输入框滚动到视口中间
  2. (Android) 在关闭键盘时调用 document.activeElement.blur() 手动释放输入框的焦点
  3. (iOS) 由于 iOS 在键盘弹出时会自动滚动页面，所以不需要操作
  4. (iOS) 在关闭键盘时调用 window.scrollTo(0, 0) 将页面滚动到顶部，防止底部出现「滚动过头」问题
 */

import platform from '@utils/checkPlatform'

let originHeight = 0
const resizeHandler = () => {
  console.log(document.activeElement.tagName)
  const resizeHeight = document.documentElement.clientHeight || document.body.clientHeight
  if (resizeHeight < originHeight) {
    // 软键盘弹出时所需的页面逻辑
    if (
      document.activeElement.tagName === 'INPUT' ||
      document.activeElement.tagName === 'TEXTAREA'
    ) {
      window.setTimeout(() => {
        document.activeElement.scrollIntoView({
          block: 'center',
          behavior: 'smooth',
        })
      }, 150) // 考虑到键盘弹起有延时
    }

    // 隐藏底部 footer 组件
    // document.querySelector('#footer').style.display = 'none'
  } else {
    // 软键盘收会后所需的页面逻辑
    document.activeElement.blur()

    // 显示底部 footer 组件
    // document.querySelector('#footer').style.display = 'flex'
  }
}

function timestamp() {
  return new Date().getTime()
}

let _focusInTime = 0
let _focusOutTime = 0
const focusinFunc = () => {
  _focusInTime = timestamp()
}
const focusoutFunc = () => {
  _focusOutTime = timestamp()

  // 在 focusout 之后，可能马上会有一个 focusin 事件，因此延迟 50ms 再执行
  setTimeout(() => {
    // 如果 50ms 后没有出现 focusin 事件，则说明键盘关闭了
    // (-100是一个经验值，通常只需要比较小于0即可)
    if (_focusInTime - _focusOutTime < -100) {
      // 此处表示键盘关闭
      window.scrollTo(0, 0)
    }
  }, 50)
}

export default {
  mounted() {
    if (platform.isAndroid()) {
      // android 端检测 resize 事件来判断软键盘是否弹出
      originHeight = document.documentElement.clientHeight || document.body.clientHeight
      window.addEventListener('resize', resizeHandler)
    }
    if (platform.isIOS()) {
      // 软键盘收起的事件处理
      document.body.addEventListener('focusin', focusinFunc)
      document.body.addEventListener('focusout', focusoutFunc)
    }
  },
  beforeDestroy() {
    if (platform.isAndroid()) {
      window.removeEventListener('resize', resizeHandler)
    }
    if (platform.isIOS()) {
      document.body.removeEventListener('focusin', focusinFunc)
      document.body.removeEventListener('focusout', focusoutFunc)
    }
  },
}
