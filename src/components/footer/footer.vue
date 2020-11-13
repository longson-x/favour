<template>
  <footer class="foot-view" :style="{backgroundColor:bgColor,height:$px2vw(heightNumber)}">
    <slot></slot>
  </footer>
</template>

<script>
export default {
  props: {
    bgColor: {
      type: String,
      default: '#F3F3F3',
    },
    height: {
      type: [Number, String],
      default: 100,
    },
  },
  computed: {
    heightNumber() {
      return Number(this.height) || 100
    },
  },
}
</script>

<style>
.foot-view {
  position: absolute;
  z-index: 50;
  left: 0;
  bottom: 0;
  width: 100%;
}
</style>
