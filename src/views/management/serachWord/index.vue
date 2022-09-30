<template>
  <div class="word-blue-bgcolor restore-page h-100 padding-lg text-white text-df">
    <el-row style="height:120px">
      <el-col
        v-if="false"
        :span="8"
        class="text-xl text-bold"
      >
        <div>学习日期：{{ wordObj.study_date }}</div>
        <div class="margin-top-lg">
          <div>分组序号</div>
          <div class="margin-top">单词学习</div>
        </div>
      </el-col>

      <el-col
        v-if="false"
        :span="8"
        :offset="16"
        class="flex justify-end"
      >
        <el-input
          placeholder="搜索"
          style="z-index:1000;position: relative;width:80%"
        >
          <i
            slot="suffix"
            class="el-input__icon el-icon-search"
          ></i>
        </el-input>
      </el-col>
    </el-row>

    <el-row class="word-container">
      <el-col
        :span="8"
        :offset="8"
      >
        <div class="padding margin-top-xl">
          <words
            ref="words"
            :word-obj="wordObj"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import saveRouteParams from '@/utils/saveRouteParams'
import words from '@/views/learningFun/components/words/words.vue'
export default {
  name: 'Index',
  components: { words },
  mixins: [],
  props: {},
  data() {
    return {
      wordObj: {}
    }
  },
  computed: {

  },
  created() {
    const that = this
    saveRouteParams(that)
    console.log(this.$route, this.$store, this.$route.params, '----99999999999')

    this.getWord(this.$route.params.id)
  },
  methods: {
    getWord(word_id) {
      this.$get({
        url: this.$urlPath.getWord,
        data: { word_id }
      }).then((res) => {
        this.wordObj = res
        this.wordObj.word_voice = `${this.$urlPath.wordVoiceUrl}${res.word_voice}`
      })
    }
  }
}

</script>
<style lang='scss' scoped>
</style>
