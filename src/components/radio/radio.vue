<template>
    <div class="radio" :style="{fontSize: $px2vw(fontSize)}" @click="handleClick">
      <img :style="{width: $px2vw(iconSize), height: $px2vw(iconSize), marginRight: $px2vw(marginRight)}" :src="checked ? activeIcon : inactiveIcon" />
      <p v-if="items">{{items}}</p>
    </div>
</template>

<script>
export default {
  props: {
    checked: {
      type: Boolean,
      default: false
    },
    fontSize: {
      type: Number,
      default: 30
    },
    iconSize: {
      type: Number,
      default: 36
    },
    items: {
      type: String,
      default: ''
    },
    marginRight: {
      type: Number,
      default: 20
    },
    activeIcon: {
      type: String,
      default: ''
    },
    inactiveIcon: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>

<style scoped lang="less">
  .radio {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: #333;
  }
</style>
