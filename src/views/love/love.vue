<template>
  <div class="container">
    <V-container :header="false" bg-color="#ffa5a5">
      <div class="main-home" v-if="!end">
        <div class="chest">
          <div class="chest-text">
            <p>{{tellText}}</p>
          </div>
          <div class="heart left sided top"></div>
          <div class="heart center"></div>
          <div class="heart right sided"></div>
        </div>

        <div class="circle" v-if="tellText.length === tellTexts.length">
          <div class="circle-text">
            <p v-if="tellText.length === tellTexts.length" class="van-multi-ellipsis--l2">{{askText}}</p>
          </div>
          <div class="c-circle first"></div>
          <div class="c-circle second"></div>
          <div class="c-circle third"></div>
          <div class="c-circle four"></div>
        </div>

        <transition name="van-fade">
          <div class="swipe-text" v-if="askText.length === askTexts.length*2+1">
            <van-swipe style="width: 100%;height: 30px;" autoplay="1350" vertical :show-indicators="false"
                       @change="onChange">
              <van-swipe-item v-for="(i, idx) in likeText" :key="idx">
                <p>{{i}}</p>
              </van-swipe-item>
            </van-swipe>
          </div>
        </transition>

        <transition name="van-fade">
          <div class="button-group" v-if="askText.length === askTexts.length*2+1 && current === 2">
            <button class="btn" @click="yesBtn">好</button>
            <button class="btn" @click="noBtn">不好</button>
          </div>
        </transition>
      </div>

      <div class="main-home" style="justify-content: center;" v-if="end">
        <div class="jump-text">
            <span>你</span>
            <span>好</span>
            <span>！</span>
            <span>女</span>
            <span>朋</span>
            <span>友</span>
        </div>
        <div class="jump-text">
          <span>我</span>
          <span>是</span>
          <span>你</span>
          <span>的</span>
          <span>男</span>
          <span>朋</span>
          <span>友</span>
        </div>
        <div class="jump-text">
          <span>喜</span>
          <span>欢</span>
          <span>你</span>
        </div>
        <div class="jump-text">
          <span>四</span>
          <span>天</span>
          <span>、</span>
          <span>三</span>
          <span>天</span>
          <span>、</span>
          <span>两</span>
          <span>天</span>
          <span>、</span>
          <span>一</span>
          <span>天</span>
        </div>
      </div>
    </V-container>

    <van-dialog class="dialog" v-model="noDialog" title="别问~~ 问就是"
                :show-cancel-button="noNum === 6"
                width="250px" confirmButtonColor="#ff8c8c" confirmButtonText="我知道了"
                cancel-button-color="#d3d3d3" cancel-button-text="上一条"
                :before-close="noBeforeClose"
                @cancel="noCancel"
                @confirm="noConfirm">
      <p class="tip-text">{{noTexts[noNum]}}</p>
    </van-dialog>

    <van-dialog class="dialog" v-model="yesDialog" :title="yesTitleTexts[yesNum]"
                width="250px" confirmButtonColor="#ff8c8c" :confirmButtonText="yesConfirmTexts[yesNum]"
                :before-close="yesBeforeClose"
                @confirm="yesConfirm">
      <p class="tip-text">{{yesTexts[yesNum]}}</p>
    </van-dialog>
  </div>
</template>

<script>
import VContainer from '@components/container/container'

export default {
  components: {
    VContainer
  },
  created() {
    this._tellTime()
  },
  data() {
    return {
      end: false,
      tellText: '',
      tellTexts: ['小', '姐', '姐', '我', '想', '撩', '你'],
      askText: '',
      askTexts: ['做我', '女朋友', '好吗'],
      tellTime: 0,
      askTime: 0,
      likeText: ['关注你很久了~~', '世界上所有美好的词都不足以形容你~~', '很喜欢你'],
      current: 0,
      noDialog: false,
      noNum: 0,
      noTexts: ['工资上交', '家务全包', '房产证写你的名字', '我妈会游泳', '保大', '吵架都你对', '即使你不对，参照上一条', '没错也能让你骂几句', '答应我吧'],
      yesDialog: false,
      yesNum: 0,
      yesTexts: ['真的吗？你答应了？', '终于等到你，还好我没放弃', '给我发消息吧，爱你！！！'],
      yesConfirmTexts: ['是的', '我知道了', '好的'],
      yesTitleTexts: ['我要脱单了？', '我好开心呀~~', '就是你了']
    }
  },
  watch: {
    tellTime(newVal) { // 时间为0时，清空定时器
      if (newVal === 0) {
        clearInterval(this.tellTimer)
        this._askTime()
      }
    },
    askTime(newVal) {
      if (newVal === 0) {
        clearInterval(this.askTimer)
      }
    }
  },
  methods: {
    yesBeforeClose(action, done) {
      if (this.yesNum !== this.yesTexts.length - 1) {
        done(false)
      } else {
        done()
      }
    },
    yesConfirm() {
      if (this.yesNum !== this.yesTexts.length - 1) {
        setTimeout(() => {
          this.yesNum += 1
        }, 400)
      } else {
        setTimeout(() => {
          this.end = true
        }, 300)
      }
    },
    yesBtn() {
      this.noNum = 0
      this.yesDialog = true
    },
    noBeforeClose(action, done) {
      if (this.noNum !== this.noTexts.length - 1) {
        done(false)
      } else {
        done()
      }
    },
    noConfirm() {
      if (this.noNum !== this.noTexts.length - 1) {
        setTimeout(() => {
          this.noNum += 1
        }, 400)
      }
    },
    noBtn() {
      this.yesNum = 0
      this.noDialog = true
    },
    noCancel() {
      if (this.noNum !== 0) {
        setTimeout(() => {
          this.noNum -= 1
        }, 400)
      }
    },
    onChange(index) {
      if (this.current === 2) {
        // console.log(index)
      } else {
        this.current += 1
      }
    },
    _tellTime() { // 启动倒计时
      const len = this.tellTexts.length
      this.tellTime = len
      this.tellTimer = setInterval(() => {
        this.tellTime--
        this.tellText = this.tellText + this.tellTexts[len - this.tellTime - 1]
      }, 500)
    },
    _askTime() {
      const len = this.askTexts.length
      this.askTime = len
      this.askTimer = setInterval(() => {
        this.askTime--
        this.askText = this.askText + this.askTexts[len - this.askTime - 1]
      }, 700)
    },
    handleToJump(val) {
      this.$router.push(val)
    }
  },
  beforeRouteLeave(from, to, next) {
  }
}
</script>

<style scoped lang="less">

  .main-home {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 30px;
    box-sizing: border-box;
  }

  .chest {
    width: 500px;
    height: 500px;
    margin: 0 auto;
    position: relative;
  }

  .chest-text {
    position: absolute;
    top: 230px;
    left: 125px;
    z-index: 4;
    background: transparent;

    p {
      font-size: 34px;
      font-weight: bold;
      color: rgba(255, 255, 255, 0.8);
      text-align: center;
      letter-spacing: 3px;

      &:last-child {
        margin-top: 5px;
      }
    }
  }

  .heart {
    position: absolute;
    z-index: 2;
    background: linear-gradient(-90deg, #F50A45 0%, #d5093c 40%);
    animation: beat 2s ease 0s infinite normal;
  }

  .heart.center {
    background: linear-gradient(-45deg, #B80734 0%, #d5093c 40%);
  }

  .heart.top {
    z-index: 3;
  }

  .sided {
    top: 100px;
    width: 220px;
    height: 220px;
    border-radius: 110px;
  }

  .center {
    width: 210px;
    height: 210px;
    bottom: 100px;
    left: 145px;
    transform: rotateZ(225deg);
  }

  .left {
    left: 62px;
  }

  .right {
    right: 62px;
  }

  @keyframes beat {
    0% {
      transform: scale(1) rotate(225deg);
      box-shadow: 0 0 40px #d5093c;
    }
    50% {
      transform: scale(1.1) rotate(225deg);
      box-shadow: 0 0 70px #d5093c;
    }
    100% {
      transform: scale(1) rotate(225deg);
      box-shadow: 0 0 40px #d5093c;
    }
  }

  .swipe-text {
    width: 100%;
    padding: 70px 0 0;

    p {
      font-size: 30px;
      font-weight: bold;
      color: rgba(255, 255, 255, 0.7);
      text-align: center;
    }
  }

  .button-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 50px 30px 0;
    box-sizing: border-box;

    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      background: #ff7272;
      width: 200px;
      height: 60px;
      border-radius: 20px;
      border: none;
      outline: none;
      font-size: 28px;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.8);

      &:last-child {
        background: #ff8c8c;
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }

  .dialog /deep/ .van-dialog__header {
    color: rgba(255, 140, 140, 0.7);
  }

  .tip-text {
    padding: 30px 20px 40px;
    font-size: 32px;
    font-weight: bold;
    color: #ff7272;
    text-align: center;
  }

  .circle-text {
    position: absolute;
    top: 125px;
    left: 70px;
    z-index: 4;
    background: transparent;

    p {
      width: 200px;
      font-size: 34px;
      font-weight: bold;
      color: rgba(255, 255, 255, 0.8);
      text-align: center;
      letter-spacing: 3px;
      line-height: 44px;

      &:last-child {
        margin-top: 5px;
      }
    }
  }

  .circle {
    position: relative;
    /*top: 50%;*/
    /*left: 50%;*/
    /*margin-top: -150px;*/
    /*margin-left: -150px;*/
    width: 330px;
    height: 330px;
    border: 1px solid #ff7272;
    border-radius: 50%;
  }

  .circle .c-circle {
    width: 100%;
    height: 100%;
    border-radius: 100%;
    position: absolute;
    transform-origin: center center;
    animation: circle 10s linear infinite;
  }

  .circle .c-circle:after {
    content: '';
    position: absolute;
    transform: translate(-50%, -50%);
    border-radius: 100%;
  }

  .circle .first:after {
    width: 80px;
    height: 80px;
    left: 20px;
    top: 250px;
    background: url('https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3733985563,1301537690&fm=26&gp=0.jpg') no-repeat;
    background-size: cover;
  }

  .circle .second:after {
    width: 50px;
    height: 50px;
    left: 60px;
    top: 40px;
    background: url('https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3733985563,1301537690&fm=26&gp=0.jpg') no-repeat;
    background-size: cover;
  }

  .circle .third:after {
    width: 70px;
    height: 70px;
    left: 300px;
    top: 90px;
    background: url('https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3733985563,1301537690&fm=26&gp=0.jpg') no-repeat;
    background-size: cover;
  }

  .circle .four:after {
    width: 60px;
    height: 60px;
    left: 255px;
    top: 300px;
    background: url('https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3733985563,1301537690&fm=26&gp=0.jpg') no-repeat;
    background-size: cover;
  }

  @keyframes circle {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .jump-text {
    text-align: center;
    margin-bottom: 30px;

    &:first-child {
      margin-top: -90px;
    }

    span {
      position: relative;
      top: 0;
      font-size: 42px;
      font-weight: bold;
      color: #ff7b7b;
      text-align: center;
      letter-spacing: 4px;
      animation: letter 1s cubic-bezier(0.1, 0.5, 0.2, 1) infinite alternate;
    }

    span:nth-child(1) {
      animation-delay: 0s;
    }

    span:nth-child(2) {
      animation-delay: 0.1s;
    }

    span:nth-child(3) {
      animation-delay: 0.2s;
    }

    span:nth-child(4) {
      animation-delay: 0.3s;
    }

    span:nth-child(5) {
      animation-delay: 0.4s;
    }

    span:nth-child(6) {
      animation-delay: 0.5s;
    }

    span:nth-child(7) {
      animation-delay: 0.6s;
    }

    span:nth-child(8) {
      animation-delay: 0.7s;
    }

    span:nth-child(9) {
      animation-delay: 0.8s;
    }

    span:nth-child(10) {
      animation-delay: 0.9s;
    }

    span:nth-child(11) {
      animation-delay: 1s;
    }

    @keyframes letter {
      from {
        top: 0;
        text-shadow: blanchedalmond 0 0 0.05em;
      }

      to {
        top: 30px;
        text-shadow: blanchedalmond 0 0.5em 0.2em;
      }
    }
  }
</style>
