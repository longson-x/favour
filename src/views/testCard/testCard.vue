<template>
  <div class="container">
    <div class="center">
      <luck-card :option="option"></luck-card>
    </div>
  </div>
</template>

<script>
import luckCard from '@views/luck-card/luck-card'
// import img from './test.jpg'

export default {
  components: {
    luckCard,
  },
  data() {
    return {
      option: {
        // 底部文字样式
        scratchFontSize: 32,
        scratchTextStyle: { 'color': 'red', 'font-weight': '800' },
        // 刮层设置
        scratchColor: '#e5e5e5', // 刮层颜色
        placeholder: '刮开涂层', // 刮层上的文字（若要设置）与img互斥，只能选一个
        fontSize: 32, // 刮层上的文字大小
        fontStyle: '800 Arial', // 刮层上的文字样式
        fontColor: '#a0a0a0', // 刮层上文字颜色
        // img: img, // 刮层上的图片（若要设置）
        radio: 0.1, // 刮开面积占总面积的比例
      },
    }
  },
}
</script>

<style scoped lang="less">
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .center {
    width: 70%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
