<template>
  <div class="word-blue-bgcolor restore-page h-100 padding-lg text-white text-df">
    <el-row>
      <el-col
        :span="8"
        class="text-xl text-bold"
      >
        <div>学习日期：{{ nowDate }}</div>
        <div class="margin-top-lg">
          <div>分组序号</div>
          <div class="margin-top">单词学习</div>
        </div>
      </el-col>

      <el-col
        :span="8"
        :offset="8"
        class="flex justify-end"
      >
        <el-input
          v-model="serchVal"
          placeholder="搜索"
          suffix-icon="el-icon-search"
          style="z-index:9999;position: relative;width:80%"
          @focus="showInpitMask = true"
        />

        <!-- 搜索蒙层 -->
        <MaskContent :show-mask.sync="showInpitMask">
          <transition>
            <div
              class="word-input-mask"
              style="width:22%"
            >
              <div class="word-input-mask-title text-bold">查询结果</div>
              <el-scrollbar
                class="scrollbar word-input-mask-list"
                wrap-class="scrollbar-wrap-class"
              >
                <div
                  v-for="(word,index) in serchList"
                  :key="index"
                  class="word-input-mask-item solids-bottom margin-tb-sm"
                  @click="jumpLearnWords(word)"
                >
                  <div class="word-name">{{ word.wordName }}</div>
                  <div class="word-mean padding-tb-xs">{{ word.wordMean }}</div>
                </div>
              </el-scrollbar>
            </div>
          </transition>
        </MaskContent>
      </el-col>
    </el-row>

    <el-row class="word-container">
      <el-col
        :span="8"
        :offset="8"
      >
        <div class="padding-lg margin-top-xl">
          <words :word-obj="wordObj" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import saveRouteParams from '@/utils/saveRouteParams'
import words from './components/words.vue'
export default {
  name: 'Index',
  components: { words },
  mixins: [],
  props: {},
  data() {
    return {
      serchVal: '',
      nowDate: '',
      showInpitMask: false,
      serchList: [],
      wordObj: {}
    }
  },
  computed: {},
  created() {
    const that = this
    saveRouteParams(that)
    console.log(this.$route, this.$store, this.$route.params, '----99999999999')
    this.nowDate = new Date().toLocaleDateString()
    // this.researchPlanId = this.$route.params.id
    // this.researchPlanName = this.$route.params.name

    this.getData()
  },

  mounted() { },

  methods: {
    getData() {
      this.serchList = [{
        wordName: 'word',
        wordMean: 'n.单词'
      }, {
        wordName: 'test',
        wordMean: 'n.测试'
      }, {
        wordName: 'public',
        wordMean: 'n.公众，公共'
      }, {
        wordName: 'test',
        wordMean: 'n.测试'
      }, {
        wordName: 'word',
        wordMean: 'n.单词'
      }, {
        wordName: 'test',
        wordMean: 'n.测试'
      }, {
        wordName: 'public',
        wordMean: 'n.公众，公共'
      }, {
        wordName: 'test',
        wordMean: 'n.测试'
      }, {
        wordName: 'word',
        wordMean: 'n.单词'
      }, {
        wordName: 'test',
        wordMean: 'n.测试'
      }, {
        wordName: 'public',
        wordMean: 'n.公众，公共'
      }, {
        wordName: 'test',
        wordMean: 'n.测试'
      }, {
        wordName: 'word',
        wordMean: 'n.单词'
      }, {
        wordName: 'test',
        wordMean: 'n.测试'
      }, {
        wordName: 'public',
        wordMean: 'n.公众，公共'
      }, {
        wordName: 'test',
        wordMean: 'n.测试'
      }, {
        wordName: 'word',
        wordMean: 'n.单词'
      }, {
        wordName: 'test',
        wordMean: 'n.测试'
      }, {
        wordName: 'public',
        wordMean: 'n.公众，公共'
      }, {
        wordName: 'test',
        wordMean: 'n.测试'
      }, {
        wordName: 'word',
        wordMean: 'n.单词'
      }, {
        wordName: 'test',
        wordMean: 'n.测试'
      }, {
        wordName: 'public',
        wordMean: 'n.公众，公共'
      }, {
        wordName: 'test',
        wordMean: 'n.测试'
      }]

      this.wordObj = {
        wordName: 'resort',
        wordNature: '英',
        wordLink: 'https://tts.youdao.com/fanyivoice?word=word.mp3',
        phoneticSymbol: '/ rɪˈzɔːrt /',
        wordsMean: [
          {
            wordType: 'n.',
            wordMean: '度假胜地 采用的方法'
          },
          {
            wordType: 'vi.',
            wordMean: '诉诸，采取'
          }
        ],
        wordAssociate: '热（re）瘦（s）的鸡蛋（o）热（r）的头（t）疼',
        wordExampleLink: 'https://tts.youdao.com/fanyivoice?word=example.mp3',
        wordExample: 'This place is just so charming, the perfect winter resort.这个地方实在是太好啦，完美的冬季旅游胜地！'
      }
    }
  }
}

</script>
<style lang='scss' scoped>
</style>
