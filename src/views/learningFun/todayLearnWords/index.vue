<template>
  <div class="word-blue-bgcolor restore-page h-100 padding-lg text-white text-df">
    <el-row style="height:120px">
      <el-col
        v-if="isShowTodayWrods"
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
        :offset="isShowTodayWrods ? 8 : 16"
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
        <div class="padding margin-top-xl">
          <div
            v-if="!isShowTodayWrods"
            class="flex align-center  flex-direction"
          >
            <div class="text-bold text-xxl">{{ $route.meta.title }}</div>
            <div
              class="word-info-bgcolor border-radius flex align-center justify-center"
              style="width:50%; margin: 50px 0;"
            >
              <span class="padding text-bold text-xxl ">20</span>
            </div>
            <el-button
              round
              class="word-btn"
              @click="changeTodayWrods(true)"
            >开始筛查</el-button>
          </div>

          <div v-else>
            <words
              :word-obj="wordObj"
              :check-mean="checkMean"
            />

            <div class="flex justify-around margin-top-xl">
              <el-button
                round
                class="word-btn"
              >上一词</el-button>
              <el-button
                round
                class="word-btn"
              >下一词</el-button>
            </div>
          </div>
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
      wordObj: {},
      isShowTodayWrods: false
    }
  },
  computed: {
    checkMean() {
      return this.$route.name !== 'todayLearnWords'
    }
  },
  created() {
    const that = this
    saveRouteParams(that)
    console.log(this.$route, this.$store, this.$route.params, '----99999999999')

    this.initData()

    this.getData()
  },

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
        wordAssociate: '<p>热（<span style="color: rgb(225, 60, 57);">re</span>）瘦（<span style="color: rgb(225, 60, 57);">s</span>）的鸡蛋（<span style="color: rgb(225, 60, 57);">o</span>）热（<span style="color: rgb(225, 60, 57);">r</span>）的头（<span style="color: rgb(225, 60, 57);">t</span>）疼</p><p></p>',
        wordExampleLink: 'https://tts.youdao.com/fanyivoice?word=example.mp3',
        wordExample: '<p>This place is just so charming, the perfect <span style="background-color: transparent;">winter resort.</span></p><p>这个地方实在是太好啦，完美的冬季旅游胜地！</p>'
      }
    },
    initData() {
      this.nowDate = new Date().toLocaleDateString()
      const showTodayWrods = this.$route.name !== 'fallibleWordScreen' && this.$route.name !== 'randomWordScreen'
      this.changeTodayWrods(showTodayWrods)

      // this.researchPlanId = this.$route.params.id
      // this.researchPlanName = this.$route.params.name
    },
    changeTodayWrods(val) {
      this.isShowTodayWrods = val
    }
  }
}

</script>
<style lang='scss' scoped>
.word-btn {
  background: rgb(225, 227, 229, 0.15);
  color: #ddd;
  font-weight: bold;
  border: none;
  width: 30%;
}
</style>
