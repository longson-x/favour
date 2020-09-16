<template>
  <div class="container">
    <v-container ref="container" :header="false" :footer="true" :footer-height="100">
      <div class="main-test">
        <div class="test-item">
          <v-radio :items="'选项'" :activeIcon="checked" :inactiveIcon="unchecked" :checked="choose"
                   @click="changeRadio">
          </v-radio>
        </div>

        <div class="test-item">
          <v-radio-group :type="'single'" :items="items" :activeIcon="checked" :inactiveIcon="unchecked"
                         @click="changeRadioGroup">
          </v-radio-group>
        </div>

        <div class="test-item">
          <van-cell-group class="cell-group">
            <van-field v-model="form.name" label="姓名" placeholder="请输入姓名" center/>
            <van-field v-model="form.phone" label="手机号" placeholder="请输入手机号" maxlength="11" center/>
            <van-field v-model="form.idNo" label="身份证" placeholder="请输入身份证号码" maxlength="18" center/>
            <van-field v-model="verificationCode" label="验证码" placeholder="请输入验证码" maxlength="6" center>
              <template #button>
                <van-button size="small" type="primary" @click="showPopup = !showPopup">发送验证码</van-button>
              </template>
            </van-field>
          </van-cell-group>
        </div>

        <div class="test-item">
          <v-tree-list :height="'80vh'" :items="DATA_MAP" :selected-active="treeActive" @click="changeTreeActive">
            <template #content>
              <ul ref="ul">
                <li v-for="(item, index) in DATA_MAP[treeActive].data" :key="index">
<!--                  <img v-lazy="item.avatar" alt="">-->
                  <span>{{item.name}}</span>
                </li>
              </ul>
            </template>
          </v-tree-list>
        </div>

        <div class="test-item">
          <van-cell is-link center to="/">
            <!-- 使用 title 插槽来自定义标题 -->
            <template #title>
              <div class="cell-link">
                <div class="link-left">
                  <p>test</p>
                  <p>{{DateUtil.formatDate(new Date(), 'yyyy-MM-dd')}}</p>
                </div>
              </div>
            </template>
          </van-cell>
        </div>

<!--        <div class="test-item">
          &lt;!&ndash;position修改弹出位置 top left bottom right（最好用于弹出）&ndash;&gt;
          &lt;!&ndash;确认、取消还是用dialog比较好&ndash;&gt;
          <van-popup
            v-model="showPopup"
            closeable
            round
            :close-on-click-overlay="false"
            :style="{ height: '50%', width: '80%' }"
          >
            <div class="popup-bg">
              <div class="bg-left">
                <p>鲸保宝</p>
                <p>{{DateUtil.formatDate(new Date(), 'yyyy-MM-dd')}}</p>
              </div>
              <img :src="checked" alt="">
            </div>
          </van-popup>
        </div>-->

        <div class="test-item">
          <van-dialog class="dialog-bg" v-model="showPopup" title="标题" show-cancel-button>
            <div class="popup-bg">
              <div class="bg-left">
                <p>鲸保宝</p>
                <p>{{DateUtil.formatDate(new Date(), 'yyyy-MM-dd')}}</p>
              </div>
              <img :src="checked" alt="">
            </div>
          </van-dialog>
        </div>

      </div>
    </v-container>
    <v-footer :height="100">
      <div class="footer-content">
        <div class="footer-detail">
          <button class="footer-item footer-submit"></button>
        </div>
      </div>
    </v-footer>
  </div>
</template>

<script>
import keyboard from '../../mixins/keyboard'
import { DateUtil } from 'sn-js-utils'
import VContainer from '@components/container/container'
import VFooter from '@components/footer/footer'
import VRadio from '@components/radio/radio'
import VRadioGroup from '@components/radio-group/radio-group'
import checked from '@assets/images/circle-checked.png'
import unchecked from '@assets/images/circle-uncheck.png'
import VTreeList from '@components/tree-list/tree-list'
import * as DATA from '@components/tree-list/data'

export default {
  mixins: [keyboard],
  components: {
    VContainer,
    VFooter,
    VRadio,
    VRadioGroup,
    VTreeList
  },
  data() {
    const DATA_MAP = [
      { text: '全部', data: DATA.ALL_HEROES },
      { text: '近战', data: DATA.MELEE_HEROES },
      { text: '远程', data: DATA.REMOTE_HEROES },
      { text: '辅助', data: DATA.SUPPORT_HEROES },
      { text: '法师', data: DATA.MAGIC_HEROES },
      { text: '打野', data: DATA.JUNGLE_HEROES },
      { text: '坦克', data: DATA.TANK_HEROES },
      { text: '隐身', data: DATA.INVISIBLE_HEROES },
      { text: '后期', data: DATA.CARRY_HEROES },
      { text: '闪烁', data: DATA.BLINK_HEROES },
      { text: '爆发', data: DATA.HIGH_DAMAGE_HEROES },
      { text: '召唤', data: DATA.INVOKE_HEROES },
      { text: '眩晕', data: DATA.DIZZY_HEROES },
      { text: '治疗', data: DATA.HEALER_HEROES }
    ]
    return {
      DateUtil,
      showPopup: false,

      // radio
      choose: false, // 单个radio

      // radio-group
      checked,
      unchecked,
      items: [
        {
          id: 1,
          label: '选项1',
          checked: false
        },
        {
          id: 2,
          label: '选项2',
          checked: false
        },
        {
          id: 3,
          label: '选项3',
          checked: false
        }
      ],
      moreSingle: 0, // 多个radio（单选）
      moreMulti: [], // 多个radio（多选）

      // 输入框
      form: {
        name: '',
        phone: '',
        idNo: ''
      },
      verificationCode: '',

      // tree-list
      treeActive: 1,
      DATA_MAP

    }
  },
  created() {
    // this.$showLoading('加载中')
  },
  mounted() {
  },
  methods: {
    changeRadio() {
      this.choose = !this.choose
    },
    changeRadioGroup(e) {
      // console.log(e)
    },
    changeTreeActive(e) {
      setTimeout(() => { // 设个延时，稍微有点快
        this.$refs.ul.parentNode.scrollTop = 0
        this.treeActive = e
      }, 300)
    },
    afterRead(file) {
      console.log(file)
    }
  }
}
</script>

<style scoped lang="less">

  .main-test {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    padding: 30px;
    box-sizing: border-box;

    .test-item {
      width: 100%;
      padding: 20px 0;
    }

/*    .test-item /deep/ .van-button--default {
      background-color: #34A1EE;
    }*/

    .dialog-bg {
      width: 80%;
    }

    ul {
      height: 100%;

      li {
        height: auto;
        padding: 50px;
        display: flex;
        align-items: center;
        border-bottom: 1px #f3f3f3 solid;

        img {
          width: 192px;
          height: 144px;
          margin: 0 20px 0;
          border: 1px solid #34A1EE;
          border-radius: 3px;
          box-shadow: 0 1px 5px 0 #000;
        }

        span {
          font-size: 32px;
          color: #34A1EE;
        }
      }
    }

    .cell-link, .popup-bg {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .link-left, .bg-left {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;

        p {
          font-size: 30px;
          font-weight: bold;
          color: #333;

          &:last-child {
            font-size: 24px;
            font-weight: 400;
            color: #c3c3c3;
          }
        }
      }
    }

    .popup-bg {
      width: 100%;
      height: 100%;
      padding: 70px 30px 30px;
      box-sizing: border-box;
      align-items: flex-start;
    }
  }

  .footer-content {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;

    .footer-detail {
      display: flex;
      width: 100%;
      height: 100%;

      .footer-item {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        height: 100%;
        font-size: 36px;
      }

      .footer-price {
        background: #fff;
        color: #353535;
      }

      .footer-submit {
        /*background-color: #ffb065;*/
        background-color: #fff;
        color: #fff;
        border: none;
        outline: none;
      }
    }
  }

</style>
