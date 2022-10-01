<template>
  <div class="flex flex-wrap num-training padding-top">
    <div
      v-for="(num,numIndex) in randomNumber"
      :key="numIndex"
      class="num-training-item"
    >
      <div
        class="word-info-bgcolor border-radius text-center num-training-num"
        :style="{'padding':remember ? '0':'10%','border':`1px solid${colorList[numIndex]}`}"
      >
        <el-input
          v-if="remember"
          v-model="numList[numIndex]"
          maxlength="1"
          type="text"
        />
        <span v-else>{{ num }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RandomBox',
  props: {
    randomNumber: {
      type: String,
      default: ''
    },
    remember: {
      type: Boolean,
      default: false
    },
    answerRules: {
      type: Array,
      default: () => {
        return []
      }
    },
    answerResult: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      numList: [],
      colorList: []
    }
  },
  watch: {
    answerResult(val) {
      val.split(',').forEach(answer => {
        if (answer === this.answerRules[0].state) {
          this.colorList.push(this.answerRules[0].color)
        } else if (answer === this.answerRules[1].state) {
          this.colorList.push(this.answerRules[1].color)
        }
      })
    }
  },

  mounted() { },

  methods: {}
}

</script>
<style lang='scss' scoped>
.num-training {
  &-item {
    width: 10%;
    // margin: 1%;
  }
  &-num {
    margin: 10%;
  }
  ::v-deep .el-input__inner {
    background-color: #506cff !important;
    color: #fff !important;
    border: none !important;
    // height: 70px !important;
    // line-height: 70px !important;
    // font-size: 28px !important;
    padding: 0 !important;
    font-weight: bold !important;
    text-align: center !important;
  }
}
</style>
