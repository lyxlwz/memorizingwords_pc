<template>
  <div>
    <div class="border-radius accTraining padding text-bold">
      <div class="word-text-light-color text-sm">数字训练准确率<span>{{ numResultsData.accuracy }}%</span></div>
      <div class="text-xl margin-top-xs">{{ numResultsData.time_spent }}</div>
      <el-progress
        :show-text="false"
        :percentage="parseFloat(numResultsData.accuracy)"
        :stroke-width="10"
        status="warning"
      />
    </div>

    <div class="checkAnswers">
      <div class="flex justify-between text-sm  align-center">
        <div>你的答案</div>
        <div class="flex">
          <div
            v-for="(rule,ruleIndex) in answerRules"
            :key="ruleIndex"
            class="flex align-center margin-left-xs"
          >
            <div
              class="answer-box word-info-bgcolor margin-right-xs"
              :style="{'border':`1px solid${rule.color}`}"
            ></div>
            <span>{{ rule.title }}</span>
          </div>
        </div>
      </div>

      <random-box
        ref="randomBox"
        :answer-result="numResultsData.res"
        :answer-rules="answerRules"
        :random-number="numResultsData.upload_number"
      />
    </div>

    <div class="checkAnswers">
      <div class="flex justify-between text-sm  align-center">
        <div>标准答案</div>
      </div>

      <random-box
        ref="randomBox"
        :random-number="numResultsData.random_number"
      />
    </div>

    <div class="flex justify-around margin-top-xl">
      <!-- <el-button
        round
        class="word-btn"
      >结束训练</el-button> -->
      <el-button
        round
        class="word-btn"
        @click="toNumTrain"
      >再次练习</el-button>
    </div>
  </div>
</template>

<script>
import randomBox from './randomBox'
export default {
  name: 'Results',
  components: { randomBox },
  mixins: [],
  props: {
    numResultsData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      answerRules: [
        {
          color: '#00FF49',
          state: 'correct',
          title: '正确'
        },
        {
          color: '#D8001B',
          state: 'error',
          title: '错误'
        }
        // {
        //   color: '#fff',
        //   state:'',
        //   title: '未做'
        // }
      ]
    }
  },

  computed: {},

  mounted() { },

  methods: {
    toNumTrain() {
      this.$router.replace({ path: '/redirect' + this.$route.path })
    }
  }
}

</script>
<style lang='scss' scoped>
.accTraining {
  background: #fff;
  color: #000;
}

.checkAnswers {
  padding-top: 50px;

  .answer-box {
    width: 20px;
    height: 20px;
    border-radius: 6px;
  }
}
</style>
