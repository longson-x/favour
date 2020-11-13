<template>
  <van-tree-select :height="height" :items="items" :main-active-index.sync="active" @click-nav="changeHandler">
    <slot slot="content" name="content"></slot>
  </van-tree-select>
</template>

<script>

export default {
  props: {
    height: {
      type: String,
      default: '',
    },
    items: { // 标签集合
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: [],
    },
    selectedActive: { // 当前标签
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      active: this.selectedActive,
    }
  },
  methods: {
    changeHandler(idx) {
      this.$emit('click', idx)
    },
  },
}
</script>
