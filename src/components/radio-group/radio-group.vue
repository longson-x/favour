<template>
  <div class="radio-group">
    <div class="radio" :style="{fontSize: $px2vw(fontSize)}" @click="handleClick(i)" v-for="(i, idx) in items"
         :key="idx">
      <img :style="{width: $px2vw(iconSize), height: $px2vw(iconSize), marginRight: $px2vw(marginRight)}"
           :src="i.checked ? activeIcon : inactiveIcon"/>
      <p>{{i.label}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'single'
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
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: [
        {
          id: 1,
          label: '1',
          checked: false
        },
        {
          id: 2,
          label: '2',
          checked: false
        },
        {
          id: 3,
          label: '3',
          checked: false
        }
      ]
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
  data() {
    return {
      multi: [] // 多选push进里面
    }
  },
  methods: {
    handleClick(e) {
      if (this.type === 'single') {
        this.items.map((i, idx) => {
          if (i === e) {
            i.checked = !i.checked
          } else {
            i.checked = false
          }
        })
        this.$emit('click', e)
      } else {
        this.items.map((i, idx) => {
          if (i === e) {
            i.checked = !i.checked
          }
        })
        this.multi = this.items.filter(i => i.checked)
        this.$emit('click', this.multi)
      }
    }
  }
}
</script>

<style scoped lang="less">
  .radio-group {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .radio {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      color: #333;
    }
  }
</style>
