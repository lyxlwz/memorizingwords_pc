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
        v-if="!numTraining"
        :span="8"
        :offset="isShowTodayWrods ? 8 : 16"
        class="flex justify-end"
      >
        <el-input
          v-model="searchVal"
          placeholder="搜索"
          style="z-index:1000;position: relative;width:80%"
          @focus="showInpitMask = true"
          @keyup.enter.native="enterClick"
        >
          <i
            slot="suffix"
            class="el-input__icon el-icon-search"
            @click="getSerchList"
          ></i>
        </el-input>

        <!-- 搜索蒙层 -->
        <MaskContent :show-mask.sync="showInpitMask">
          <transition>
            <div
              v-show="isSerach"
              class="word-input-mask"
              style="width:22%"
            >
              <div class="word-input-mask-title text-bold">查询结果</div>
              <el-scrollbar
                class="scrollbar word-input-mask-list"
                wrap-class="scrollbar-wrap-class"
              >
                <div
                  v-for="(item,index) in searchList"
                  :key="index"
                  v-loading="serachLoading"
                  class="word-input-mask-item solids-bottom margin-tb-sm"
                  @click="jumpLearnWords(item)"
                >
                  <div class="word-name">{{ item.word }}</div>
                  <div class="word-mean padding-tb-xs">{{ item.paraphrase }}</div>
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
          <div v-if="isTraining">
            <num-train />
          </div>

          <div v-else>
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
                @click="changeTodayWrods(true,numTraining)"
              >{{ numTraining ? '开始训练' : '开始筛查' }}</el-button>
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
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import saveRouteParams from '@/utils/saveRouteParams'
import words from './components/words/words.vue'
import numTrain from './components/numTrain/index.vue'
export default {
  name: 'Index',
  components: { words, numTrain },
  mixins: [],
  props: {},
  data() {
    return {
      searchVal: '',
      nowDate: '',
      showInpitMask: false,
      searchList: [],
      wordObj: {},
      isShowTodayWrods: false,
      isTraining: false,
      isSearch: false,
      serachLoading: false
    }
  },
  computed: {
    checkMean() {
      return this.$route.name !== 'todayLearnWords'
    },
    numTraining() {
      return this.$route.name === 'numberMemoryTraining'
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
      const showTodayWrods = this.$route.name !== 'fallibleWordScreen' && this.$route.name !== 'randomWordScreen' && this.$route.name !== 'numberMemoryTraining'
      this.changeTodayWrods(showTodayWrods)

      // this.researchPlanId = this.$route.params.id
      // this.researchPlanName = this.$route.params.name
    },
    changeTodayWrods(val, numTraining = false) {
      if (numTraining) {
        this.isTraining = numTraining
      } else {
        this.isShowTodayWrods = val
      }
    },
    enterClick() {
      this.getSerchList()
    },
    getSerchList() {
      this.serachLoading = true
      this.$get({
        url: this.$urlPath.getWordData,
        data: {
          word: this.searchVal
        }
      }).then((res) => {
        if (res.length === 0) {
          this.$errorMsg('暂无该单词，请重新输入')
        } else {
          this.searchList = res
          this.isSearch = true
        }
        this.serachLoading = false
      }).catch((_) => {
        this.serachLoading = false
      })
    },
    jumpLearnWords(params) {
      console.log(params, '===item')
      this.$router.push({
        name: 'todayLearnWords',
        ...params
        // params: {
        //   id: this.questionsId,
        //   name: this.name,
        //   isPushStats,
        //   isPause,
        // },
      })
    }
  }
}

</script>
<style lang='scss' scoped>
</style>
