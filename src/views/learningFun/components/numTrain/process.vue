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
        <span>{{ time_spent }}</span>
      </span>
    </div>

    <random-box
      ref="randomBox"
      :remember="remember"
      :random-number="number"
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
  props: {
    number: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      datas: {},
      remember: false,
      time_spent: '01:02:100'
    }
  },

  computed: {},

  created() {

  },

  methods: {
    submit() {
      const upload_number = this.$refs.randomBox.numList.join('')
      this.$emit('submit', { isResults: true, upload_number, time_spent: this.time_spent })
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
