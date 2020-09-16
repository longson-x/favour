<template>
  <div class="div">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
  </div>
</template>
<script>

export default {
  beforeCreate () {
    console.log('App Launch')
    // eslint-disable-next-line no-new

    if (typeof window.entryUrl === 'undefined' || window.entryUrl === '') {
      window.entryUrl = location.href.split('#')[0]
    }
  }
}

</script>
<style lang="less">
  html, body {
    height: 100%;
    overflow: hidden;
  }

  p {
    margin: 0;
  }

  input, button {
    border: none;
    outline: none;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .div {
    width: 100%;
    height: 100%;
  }

</style>
