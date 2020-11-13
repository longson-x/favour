<template>
  <div class="container">
    <v-header title="首页"></v-header>
    <V-container :header="false" :footer="true" :footer-height="100">
      <div class="main-home">
        <button v-for="(i, idx) in routerList.filter((i, idx) => idx !== 0)" :key="idx" @click="handleToJump(i.path)">
          {{ i.meta.title }}
        </button>
      </div>
    </V-container>
    <V-footer :height="100">
      <div class="footer-content">
        <div class="footer-detail">
          <button class="footer-item footer-submit">这是底部</button>
        </div>
      </div>
    </V-footer>
  </div>
</template>

<script>
import Router from '../../../src/router/index'
import VHeader from '@components/header/header'
import VContainer from '@components/container/container'
import VFooter from '@components/footer/footer'

export default {
  components: {
    VHeader,
    VContainer,
    VFooter,
  },
  created() {
    // this.$showLoading('加载中')
    // console.log(Router.options.routes)
    this.routerList = Router.options.routes
  },
  data() {
    return {
      routerList: [],
    }
  },
  methods: {
    handleToJump(val) {
      this.$router.push(val)
    },
  },
}
</script>

<style scoped lang="less">

.main-home {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 30px;

  button {
    width: 100%;
    height: 80px;
    margin: 20px 0;
    font-size: 34px;
    color: #333;
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
      background-color: #ffb065;
      color: #fff;
      border: none;
      outline: none;
    }
  }
}
</style>
