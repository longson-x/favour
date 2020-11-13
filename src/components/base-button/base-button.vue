<template>
  <button class="btn__primary" :disabled="loading || disabled" v-on="$listeners">
    <div class="loading" v-if="loading"></div>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="less" scoped>
.btn__primary {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 670px;
  height: 100px;
  color: #FFFFFF;
  font-size: 34px;
  border: none;
  outline: none;
  background: #FF9C4F;
  border-radius: 10px;

  &:active {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    background: #2c2c2c;
  }
}

.loading {
  width: 30px;
  height: 30px;
  margin-right: 30px;
  display: inline-block;
  vertical-align: middle;
  animation: uni-loading 1s steps(12, end) infinite;
  background-size: 100%;
  background-color: rgba(0, 0, 0, 0);
  background-repeat: no-repeat;
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAAXVBMVEVHcEzY6v/Y6//a7v/V7P/Y6//Y6//I6//Y6//X6v/Y7f8gi/8Pgv8ukv/Y6//R5//Y6/9VqP9No/8+m//X6v9ntf9aq/9jsf9vtP9frf/X6v+Kw//X6v8Aev86mP/XK/swAAAAHHRSTlMAlEQiFb7QB2rtNvr+6637WJmr0d8oc0P+XonPogvedAAAAjpJREFUeF6t2OuSqyAMAOCoSEC81Uttu6Hv/5hn50wtploX0O93J42RYAD2FOpRy+FmbGlM1V/uCBGEqjX9ap72ray6EYJgm9PLzXLVBQOS0fRm7KeyE+ADlaaF0q6VnUdWhSTG2C3mDvswIYbViOkRdmSSVp52m5ngq1TThpuxm8orfNE29EEmKs0E4jhdu34d7wKbFHG5EsCMl8onUktMncGGqf8zUtqwbAr44s6zWtUp0+QMKey4GuuUEzAoyckF7BqXSRmEpYScBOEP2FunZ31BjgIP3XaZULI4gZEMbq2gBDwtnq6DF9Suzgie0FW8FKuEBgHeRsNS4gmlEODqUsKP3sghSPXRKTnNCghyt7MKfgma1QCxKY2s1BkEmli5a1ehYNXy2bTrjWAX+1Iu20xAsNHO7q5EEiIYtwAem10W3HG9q7WCCJ2rtly1R1SbGBjcKoowuUCavbTo11ZCQy8IEdDOTgt02qOdVuyzXn912oI8rUVOa9qztpHprI3t4Fb742p9aPPPGleiQ5+jeh7Cy/HQB7Igasz/OD/xn+w5g+b2fN6a9tAQkdJM45GxRgyrKU9EDVo5Syh+9EvoTUUPo/y/JR4YjxU5xYGBnf08/gghcnIkRh9q0oEcncUes4qcFpo08uCX1cS0UUdRoXLiVOjhWGSpSiR9aNqd43oAne5eIHiTmcdS85Cg5yXLPll4Xvvs0wp9b5Biw3DorsbW8hZjLus4XSsBIfj1oW4aPcj6oXYL/A+1QcAOa+R6IwAAAABJRU5ErkJggg==");
}

@keyframes uni-loading {
  0% {
    transform: rotate3d(0, 0, 1, 0deg);
  }

  100% {
    transform: rotate3d(0, 0, 1, 360deg);
  }
}
</style>
