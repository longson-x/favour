export default {
  baiDuTjPageLoad(id, label) {
    // console.log('page load event: ', id, label);
    this._enableStatCode(id)
    _hmt.push(['_trackEvent', '页面统计', '页面载入', `${label}`])
  },
  baiDuTjBtnPress(id, label) {
    // console.log('btn event: ', id, label);
    this._enableStatCode(id)
    _hmt.push(['_trackEvent', '按钮', '点击', `${label}`])
  },
  _enableStatCode(accountId) {
    const scriptEle = document.querySelector(`#baidu_stat_${accountId}`)
    if (!scriptEle) {
      console.log('安装百度统计代码')
      _hmt.push(['_setAccount', accountId])
      const hm = document.createElement('script')
      hm.src = `https://hm.baidu.com/hm.js?${accountId}`
      hm.id = `baidu_stat_${accountId}`
      const s = document.getElementsByTagName('script')[0]
      s.parentNode.insertBefore(hm, s)
    }
  }
}
