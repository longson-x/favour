<template>
  <div class="canvasBox">
    <div class="award">
      <div class="title">
        <p :style="[{'fontSize': this.fontSize / 75 * option.scratchFontSize + 'px'}, option.scratchTextStyle]">
          恭喜中奖
        </p>
      </div>
    </div>
    <canvas
      ref="canvas"
      @touchmove="touchmove"
      @touchstart="touchstart"
      @touchend="touchend">
    </canvas>
  </div>
</template>

<script>

export default {
  props: {
    option: {
      type: Object,
      default: () => {
        return {
          // 底部文字样式
          scratchFontSize: 0,
          scratchTextStyle: {},
          // 刮层设置
          scratchColor: '', // 刮层颜色
          placeholder: '', // 刮层上的文字（若要设置）
          fontStyle: '', // 刮层上的文字样式
          fontSize: 0, // 刮层上文字大小
          fontColor: '', // 刮层上文字颜色
          img: '', // 刮层上的图片（若要设置）
          radio: 0.25, // 刮开面积占总面积的比例
        }
      },
    },
  },
  data() {
    return {
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      canvas: null,
      ctx: null,
      fontSize: 0,
    }
  },
  created() {
  },
  mounted() {
    this.fontSize = parseInt(
      window.getComputedStyle(document.documentElement, null)['font-size']
    )
    this.initSetting()
  },
  methods: {
    initSetting() {
      this.canvas = this.$refs.canvas
      const { left, top, width, height } = this.canvas.getBoundingClientRect()
      console.log(this.canvas.getBoundingClientRect())
      this.left = left
      this.top = top
      this.width = width
      this.height = height
      this.canvas.width = width
      this.canvas.height = height

      this.ctx = this.canvas.getContext('2d')
      this.initCanvas()
    },
    initCanvas() {
      if (this.option.placeholder) {
        this.ctx.fillStyle = this.option.scratchColor
        this.ctx.fillRect(0, 0, this.width, this.height)
        this.ctx.fill()
        // 刮层上面的文字设置
        if (this.option.fontStyle) {
          let arr = []
          arr = this.option.fontStyle.split(' ')
          arr.splice(1, 0, `${this.option.fontSize * this.fontSize / 75 + 'px'}`)
          this.ctx.font = arr.join(' ')
        }
        this.ctx.textAlign = 'center'
        this.ctx.textBaseline = 'middle'
        this.ctx.fillStyle = this.option.fontColor
        this.ctx.fillText(this.option.placeholder, this.width / 2, this.height / 2)
        // 在刮层上显示文字
        this.ctx.globalCompositeOperation = 'destination-out'
      } else if (this.option.img) {
        // 画灰色涂层图片
        const coverImg = new Image()
        coverImg.src = this.option.img
        coverImg.onload = () => {
          console.log('图片加载成功')
          this.ctx.drawImage(coverImg, 0, 0, this.width, this.height)
          this.ctx.globalCompositeOperation = 'destination-out'
        }
      }
    },
    touchstart(e) {
      e.preventDefault()
    },

    touchmove(e) {
      e.preventDefault()
      let evt = e.touches[0]
      const { left, top } = this.canvas.getBoundingClientRect()
      let pageScrollTop = document.documentElement.scrollTop || document.body.scrollTop
      let pageScrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft
      let mouseX = evt.pageX - left - pageScrollLeft
      let mouseY = evt.pageY - top - pageScrollTop

      this.ctx.beginPath()
      this.ctx.fillStyle = '#FFFFFF'
      this.ctx.arc(mouseX, mouseY, this.fontSize * 0.5, 0, 2 * Math.PI, true)
      this.ctx.fill()
    },

    touchend(e) {
      e.preventDefault()
      this.checkComplete()
    },

    checkComplete() {
      let coverData = this.ctx.getImageData(0, 0, this.width, this.height)
      let pxData = coverData.data // 获取字节数据
      let len = pxData.length // 获取字节长度
      let count = 0 // 记录透明点的个数

      // 主要的思想是 一个像素由四个数据组成，每个数据分别是 rgba() 所以第四个数据 a 表示alpha透明度
      for (let i = 0; i < len; i += 4) {
        let alpha = pxData[i + 3] // 获取每个像素的透明度
        if (alpha < 10) {
          count++
        }
      }
      console.log('count', count)
      let percent = count / (len / 4) // 计算百分比
      console.log('percent', percent)

      if (percent >= this.option.radio) {
        this.showResult()
      }
    },

    // 显示刮奖结果
    showResult() {
      this.ctx.clearRect(0, 0, this.width, this.height)

      let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      let num = 0
      while (num !== 7) {
        for (let i = 0; i < 10; i++) {
          let len = 0
          arr[Math.floor(Math.random() * arr.length)] = Math.round(Math.random())
          len = arr.filter(i => i === 1).length
          num = len
          if (num === 7) break
        }
      }

      let result = arr[Math.floor(Math.random() * arr.length)]
      if (result === 1) {
        this.$toast('恭喜您中奖了')
      } else {
        this.$toast('很遗憾，您未中奖')
      }
    },
  },
}
</script>

<style scoped lang="less">
.canvasBox {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .award {
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);

    .title {
      p {
        overflow: hidden;
        text-overflow: ellipsis;
        letter-spacing: 30px;
      }
    }
  }

  canvas {
    border: 3px dashed #F1F1F1;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
}
</style>
