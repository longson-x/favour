export default {
  save(key, value) {
    try {
      localStorage.setItem(key, value)
    } catch (e) {
      console.error('保存缓存时出错')
    }
  },
  get(key) {
    let result
    try {
      result = localStorage.getItem(key)
    } catch (e) {
      result = false
    }

    if (result && result !== 'undefined' && result !== undefined && result !== 'null') {
      if (result instanceof Object || result instanceof Array) {
        if (Object.keys(result).length > 0 || result.length > 0) {
          return result
        } else {
          return false
        }
      } else {
        return result
      }
    } else {
      result = false
      return result
    }
  },
  remove(key) {
    try {
      localStorage.removeItem(key)
    } catch (e) {
      console.error('删除缓存时出错')
    }
  },
}
