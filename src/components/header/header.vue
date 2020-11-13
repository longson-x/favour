<template>
  <header class="head-view" v-if="showHeader" :style="{backgroundColor:bgColor}">
    <div class="back-view" @click="back" v-if="showBack">
      <img class="icon" src="./icon-back.png" alt="back"/>
    </div>
    <p class="title single-line" :style="{fontSize:$px2vw(titleSize),color:titleColor}">{{ title }}</p>
  </header>
</template>

<script>
import checkPlatform from '@utils/checkPlatform'

export default {
  props: {
    bgColor: {
      type: String,
      default: '#F3F3F3',
    },
    titleColor: {
      type: String,
      default: '#333333',
    },
    titleSize: {
      type: Number,
      default: 34,
    },
    title: {
      type: String,
      default: '标题栏组件是根据环境进行显示的组件是根据环境进行显示的',
    },
    showBack: {
      type: Boolean,
      default: true,
    },
    backHandler: {
      type: Function,
      default: () => {
      },
    },
  },

  data() {
    return {
      // note: header组件是根据环境进行显示的
      showHeader: checkPlatform.isH5(),
    }
  },
  methods: {
    back() {
      typeof this.backHandler === 'function' && this.backHandler()
      this.$router.back()
    },
  },
}
</script>

<style scoped>
.head-view {
  position: absolute;
  z-index: 50;
  top: 0;
  left: 0;
  width: 100%;
  height: 88px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 100px;
  box-sizing: border-box;
}

.head-view > .back-view {
  position: absolute;
  left: 0;
  width: 100px;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-left: 10px;
  box-sizing: border-box;
}

.head-view > .back-view > .icon {
  width: 36px;
  height: 36px;
}

.head-view > .title {
  font-weight: Bold;
}
</style>
