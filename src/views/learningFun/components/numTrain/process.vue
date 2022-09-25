<template>
  <div>
    <span v-if="remember">请按顺序输入上一页的数字</span>
    <div
      v-else
      class="flex justify-between"
    >
      <span>请记住以下数字</span>
      <span>
        <i class="el-icon-timer margin-right-xs"></i>
        <span>00:13:11''26</span>
      </span>
    </div>

    <random-box
      ref="randomBox"
      :remember="remember"
      :random-number="datas.random_number"
    />

    <div class="flex justify-center num-btn">
      <el-button
        v-if="remember"
        round
        class="btn"
        @click="submit"
      >提交答案</el-button>

      <el-button
        v-else
        round
        class="btn"
        @click="remember = true"
      >我记住了</el-button>
    </div>
  </div>
</template>

<script>
import randomBox from './randomBox'
export default {
  name: 'Process',
  components: { randomBox },
  mixins: [],
  props: {},
  data() {
    return {
      datas: {},
      remember: false
    }
  },

  computed: {},

  created() {
    this.getData()
  },

  methods: {
    getData() {
      const data = {
        'id': 11,
        'date': '16:45:42.000000',
        'random_number': '31814410535809040085',
        'upload_number': null,
        'amount_error': null,
        'accuracy': null,
        'digital_number': 20,
        'time_spent': null
      }
      this.datas = data
    },
    submit() {
      this.datas.upload_number = this.$refs.randomBox.numList.join('')
      this.$emit('submit', true)
    }
  }
}

</script>
<style lang='scss' scoped>
.num-btn {
  padding-top: 200px;
  .btn {
    background: rgb(225, 227, 229, 0.15);
    color: #ddd;
    font-weight: bold;
    border: none;
  }
}
</style>
