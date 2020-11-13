<template>
  <div class="scroll-view-wrapper" :style="{top:$px2vw(top),bottom:$px2vw(bottom),backgroundColor:bgColor}">
    <scroll-view class="scroll-view" ref="scroller" :scroll-y="true" :scroll-with-animation="true">
      <v-loading v-if="loading"/>
      <slot v-else/>
    </scroll-view>
  </div>
</template>

<script>
import checkPlatform from '@utils/checkPlatform'
import ScrollView from '@components/scroll-view/scroll-view'
import VLoading from '@components/loading/loading'

export default {
  components: {
    ScrollView,
    VLoading,
  },
  props: {
    bgColor: {
      type: String,
      default: '#FFFFFF',
    },
    header: {
      type: Boolean,
      default: false,
    },
    footer: {
      type: Boolean,
      default: false,
    },
    footerHeight: {
      type: [Number, String],
      default: 100,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    bottom: function() {
      // 底部定位
      return this.footer ? this.footerHeightNumber : 0
    },
    top: function() {
      // 顶部定位
      // header属性有一票否决权，当外部传入false时，无论在哪个平台，都不再计算header的高度。
      return (this.header || checkPlatform.isH5()) ? 88 : 0
    },
    footerHeightNumber() {
      return Number(this.footerHeight) || 100
    },
  },
  methods: {
    getScrollPosition() {
      return this.$refs.scroller.getScrollPosition()
    },
    scrollIntoView(id) {
      this.$refs.scroller._scrollIntoViewChanged(id)
    },
    scrollToTop() {
      this.$refs.scroller.scrollTo(0, 'y')
    },
  },
}
</script>

<style scoped>
.scroll-view-wrapper {
  position: absolute;
  width: 100%;
}

.scroll-view {
  height: 100%;
}
</style>
