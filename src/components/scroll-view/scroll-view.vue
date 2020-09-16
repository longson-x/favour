<template>
  <div v-on="$listeners">
    <div class="scroll-view-main" ref="main"
         :style="{'overflow-x': scrollX?'auto':'hidden','overflow-y': scrollY?'auto':'hidden'}">
      <div class="scroll-view-content" ref="content">
        <slot/>
      </div>
    </div>
  </div>
</template>
<script>
// 该组件是基于UniApp抽离的h5组件，可参考: https://uniapp.dcloud.io/component/scroll-view,做了一些针对h5的优化
// note: 暂时不考虑下拉刷新功能，后面如果有需求再研究
import scroller from '@mixins/scroller/index'
import { supportsPassive } from '@utils/shared'

const passiveOptions = supportsPassive ? {
  passive: true
} : false

export default {
  mixins: [scroller],
  props: {
    scrollX: {
      type: Boolean,
      default: false
    },
    scrollY: {
      type: Boolean,
      default: false
    },
    upperThreshold: {
      type: [Number, String],
      default: 50
    },
    lowerThreshold: {
      type: [Number, String],
      default: 50
    },
    scrollTop: {
      type: [Number, String],
      default: 0
    },
    scrollLeft: {
      type: [Number, String],
      default: 0
    },
    scrollIntoView: {
      type: String,
      default: ''
    },
    scrollWithAnimation: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      lastScrollTop: this.scrollTopNumber,
      lastScrollLeft: this.scrollLeftNumber,
      lastScrollToUpperTime: 0,
      lastScrollToLowerTime: 0
    }
  },
  computed: {
    upperThresholdNumber() {
      return Number(this.upperThreshold) || 50
    },
    lowerThresholdNumber() {
      return Number(this.lowerThreshold) || 50
    },
    scrollTopNumber() {
      return Number(this.scrollTop) || 0
    },
    scrollLeftNumber() {
      return Number(this.scrollLeft) || 0
    }
  },
  watch: {
    scrollTopNumber(val) {
      this._scrollTopChanged(val)
    },
    scrollLeftNumber(val) {
      this._scrollLeftChanged(val)
    },
    scrollIntoView(val) {
      this._scrollIntoViewChanged(val)
    }
  },
  mounted() {
    var self = this
    this._scrollTopChanged(this.scrollTopNumber)
    this._scrollLeftChanged(this.scrollLeftNumber)
    this._scrollIntoViewChanged(this.scrollIntoView)
    this.__handleScroll = function (event) {
      event.preventDefault()
      event.stopPropagation()
      self._handleScroll.bind(self, event)()
    }
    var touchStart = null
    var needStop = null

    this.__handleTouchStart = function (event) {
      if (event.touches.length === 1) {
        needStop = null
        touchStart = {
          x: event.touches[0].pageX,
          y: event.touches[0].pageY
        }
      }
    }
    this.__handleTouchMove = function (event) {
      var x = event.touches[0].pageX
      var y = event.touches[0].pageY
      var main = self.$refs.main
      if (needStop === null) {
        if (Math.abs(x - touchStart.x) > Math.abs(y - touchStart.y)) {
          // 横向滑动
          if (self.scrollX) {
            if (main.scrollLeft === 0 && x > touchStart.x) {
              needStop = false
              return
            } else if (main.scrollWidth === main.offsetWidth + main.scrollLeft && x < touchStart.x) {
              needStop = false
              return
            }
            needStop = true
          } else {
            needStop = false
          }
        } else {
          // 纵向滑动
          if (self.scrollY) {
            if (main.scrollTop === 0 && y > touchStart.y) {
              needStop = false
              return
            } else if (main.scrollHeight === main.offsetHeight + main.scrollTop && y < touchStart.y) {
              needStop = false
              return
            }
            needStop = true
          } else {
            needStop = false
          }
        }
      }
      if (needStop) {
        event.stopPropagation()
      }
    }
    this.__handleTouchEnd = function (event) {
      touchStart = null
    }

    this.$refs.main.addEventListener('touchstart', this.__handleTouchStart, passiveOptions)
    this.$refs.main.addEventListener('touchmove', this.__handleTouchMove, passiveOptions)
    this.$refs.main.addEventListener('touchend', this.__handleTouchEnd, passiveOptions)
    this.$refs.main.addEventListener('scroll', this.__handleScroll, supportsPassive ? {
      passive: false
    } : false)
  },
  activated() {
    // 还原 scroll-view 滚动位置
    this.scrollY && (this.$refs.main.scrollTop = this.lastScrollTop)
    this.scrollX && (this.$refs.main.scrollLeft = this.lastScrollLeft)
  },
  beforeDestroy() {
    this.$refs.main.removeEventListener('touchstart', this.__handleTouchStart, passiveOptions)
    this.$refs.main.removeEventListener('touchmove', this.__handleTouchMove, passiveOptions)
    this.$refs.main.removeEventListener('touchend', this.__handleTouchEnd, passiveOptions)
    this.$refs.main.removeEventListener('scroll', this.__handleScroll, supportsPassive ? {
      passive: false
    } : false)
  },
  methods: {
    scrollTo: function (val, type) {
      var mainEle = this.$refs.main
      val < 0 ? val = 0 : type === 'x' && val > mainEle.scrollWidth - mainEle.offsetWidth ? val = mainEle.scrollWidth - mainEle.offsetWidth
        : type === 'y' && val > mainEle.scrollHeight - mainEle.offsetHeight && (val = mainEle.scrollHeight - mainEle.offsetHeight)
      var r = 0
      var o = ''
      type === 'x' ? r = mainEle.scrollLeft - val : type === 'y' && (r = mainEle.scrollTop - val)
      if (r !== 0) {
        this.$refs.content.style.transition = 'transform .3s ease-out'
        this.$refs.content.style.webkitTransition = '-webkit-transform .3s ease-out'
        if (type === 'x') {
          o = 'translateX(' + r + 'px) translateZ(0)'
        } else if (type === 'y') {
          o = 'translateY(' + r + 'px) translateZ(0)'
        }
        this.$refs.content.removeEventListener('transitionend', this.__transitionEnd)
        this.$refs.content.removeEventListener('webkitTransitionEnd', this.__transitionEnd)
        this.__transitionEnd = this._transitionEnd.bind(this, val, type)
        this.$refs.content.addEventListener('transitionend', this.__transitionEnd)
        this.$refs.content.addEventListener('webkitTransitionEnd', this.__transitionEnd)
        if (type === 'x') {
          mainEle.style.overflowX = 'hidden'
        } else if (type === 'y') {
          mainEle.style.overflowY = 'hidden'
        }

        this.$refs.content.style.transform = o
        this.$refs.content.style.webkitTransform = o
      }
    },
    _handleScroll: function ($event) {
      if (!($event.timeStamp - this._lastScrollTime < 20)) {
        this._lastScrollTime = $event.timeStamp
        const target = $event.target
        this.$emit('scroll', $event, {
          scrollLeft: target.scrollLeft,
          scrollTop: target.scrollTop,
          scrollHeight: target.scrollHeight,
          scrollWidth: target.scrollWidth,
          deltaX: this.lastScrollLeft - target.scrollLeft,
          deltaY: this.lastScrollTop - target.scrollTop
        })
        if (this.scrollY) {
          if (target.scrollTop <= this.upperThresholdNumber && this.lastScrollTop - target.scrollTop > 0 && $event.timeStamp - this.lastScrollToUpperTime > 200) {
            this.$emit('scrolltoupper', $event, {
              direction: 'top'
            })
            this.lastScrollToUpperTime = $event.timeStamp
          }
          if (target.scrollTop + target.offsetHeight + this.lowerThresholdNumber >= target.scrollHeight && this.lastScrollTop - target.scrollTop < 0 && $event.timeStamp - this.lastScrollToLowerTime > 200) {
            this.$emit('scrolltolower', $event, {
              direction: 'bottom'
            })
            this.lastScrollToLowerTime = $event.timeStamp
          }
        }
        if (this.scrollX) {
          if (target.scrollLeft <= this.upperThresholdNumber && this.lastScrollLeft - target.scrollLeft > 0 && $event.timeStamp - this.lastScrollToUpperTime > 200) {
            this.$emit('scrolltoupper', $event, {
              direction: 'left'
            })
            this.lastScrollToUpperTime = $event.timeStamp
          }
          if (target.scrollLeft + target.offsetWidth + this.lowerThresholdNumber >= target.scrollWidth && this.lastScrollLeft - target.scrollLeft < 0 && $event.timeStamp - this.lastScrollToLowerTime > 200) {
            this.$emit('scrolltolower', $event, {
              direction: 'right'
            })
            this.lastScrollToLowerTime = $event.timeStamp
          }
        }
        this.lastScrollTop = target.scrollTop
        this.lastScrollLeft = target.scrollLeft
      }
    },
    _scrollTopChanged: function (val) {
      if (this.scrollY) {
        if (this._innerSetScrollTop) {
          this._innerSetScrollTop = false
        } else {
          if (this.scrollWithAnimation) {
            this.scrollTo(val, 'y')
          } else {
            this.$refs.main.scrollTop = val
          }
        }
      }
    },
    _scrollLeftChanged: function (val) {
      if (this.scrollX) {
        if (this._innerSetScrollLeft) {
          this._innerSetScrollLeft = false
        } else {
          if (this.scrollWithAnimation) {
            this.scrollTo(val, 'x')
          } else {
            this.$refs.main.scrollLeft = val
          }
        }
      }
    },
    _scrollIntoViewChanged: function (id) {
      if (id) {
        if (!/^[_a-zA-Z][-_a-zA-Z0-9:]*$/.test(id)) {
          console.group('scroll-into-view="' + id + '" 有误')
          console.error('id 属性值格式错误。如不能以数字开头。')
          console.groupEnd()
          return
        }
        var element = this.$el.querySelector('#' + id)
        if (element) {
          var mainRect = this.$refs.main.getBoundingClientRect()
          var elRect = element.getBoundingClientRect()
          if (this.scrollX) {
            var left = elRect.left - mainRect.left
            var scrollLeft = this.$refs.main.scrollLeft
            var x = scrollLeft + left
            if (this.scrollWithAnimation) {
              this.scrollTo(x, 'x')
            } else {
              this.$refs.main.scrollLeft = x
            }
          }
          if (this.scrollY) {
            var top = elRect.top - mainRect.top
            var scrollTop = this.$refs.main.scrollTop
            var y = scrollTop + top
            if (this.scrollWithAnimation) {
              this.scrollTo(y, 'y')
            } else {
              this.$refs.main.scrollTop = y
            }
          }
        }
      }
    },
    _transitionEnd: function (val, type) {
      this.$refs.content.style.transition = ''
      this.$refs.content.style.webkitTransition = ''
      this.$refs.content.style.transform = ''
      this.$refs.content.style.webkitTransform = ''
      var main = this.$refs.main
      if (type === 'x') {
        main.style.overflowX = this.scrollX ? 'auto' : 'hidden'
        main.scrollLeft = val
      } else if (type === 'y') {
        main.style.overflowY = this.scrollY ? 'auto' : 'hidden'
        main.scrollTop = val
      }
      this.$refs.content.removeEventListener('transitionend', this.__transitionEnd)
      this.$refs.content.removeEventListener('webkitTransitionEnd', this.__transitionEnd)
    },
    getScrollPosition() {
      const main = this.$refs.main
      return {
        scrollLeft: main.scrollLeft,
        scrollTop: main.scrollTop
      }
    }
  }
}
</script>
<style scoped>
  *[hidden] {
    display: none;
  }

  .scroll-view-main {
    position: relative;
    -webkit-overflow-scrolling: touch;
    width: 100%;
    /* display: flex; 时在安卓下会导致scrollWidth和offsetWidth一样 */
    height: 100%;
    max-height: inherit;
  }
  .scroll-view-main::-webkit-scrollbar {
    display: none;
  }
  .scroll-view-content {
    height: 100%;
  }
</style>
