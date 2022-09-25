<template>
  <div>
    <div class="border-radius accTraining padding text-bold">
      <div class="word-text-light-color text-sm">数字训练准确率<span>10%</span></div>
      <div class="text-xl margin-top-xs">01:13''12</div>
      <el-progress
        :show-text="false"
        :percentage="70"
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
        random-number="31814410535809040085"
      />
    </div>

    <div class="checkAnswers">
      <div class="flex justify-between text-sm  align-center">
        <div>标准答案</div>
      </div>

      <random-box
        ref="randomBox"
        random-number="31814410535809040085"
      />
    </div>

    <div class="flex justify-around margin-top-xl">
      <el-button
        round
        class="word-btn"
      >结束训练</el-button>
      <el-button
        round
        class="word-btn"
      >再次联系</el-button>
    </div>
  </div>
</template>

<script>
import randomBox from './randomBox'
export default {
  name: 'Results',
  components: { randomBox },
  mixins: [],
  props: {},
  data() {
    return {
      answerRules: [
        {
          color: '#00FF49',
          title: '正确'
        },
        {
          color: '#D8001B',
          title: '错误'
        },
        {
          color: '#fff',
          title: '未做'
        }
      ]
    }
  },

  computed: {},

  mounted() { },

  methods: {}
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
