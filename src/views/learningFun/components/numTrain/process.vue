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
      :random-number="trainNumData.random_number"
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
import { handleTime } from '@/utils/utils'
export default {
  name: 'Process',
  components: { randomBox },
  mixins: [],
  props: {
    trainNumData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      datas: {},
      remember: false,
      time_spent: '',
      timer: null
    }
  },

  computed: {},

  created() {
    const before = new Date().getTime()
    this.timer = setInterval(() => {
      const now = new Date().getTime()
      const time = now - before
      this.time_spent = handleTime(time, false)
    }, 1000 / 60)
  },
  beforeDestroy() {
    clearTimeout(this.timer)
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
