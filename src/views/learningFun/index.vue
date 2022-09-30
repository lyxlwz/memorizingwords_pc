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
              v-show="isSearch"
              class="word-input-mask"
              style="width:22%"
            >
              <div class="word-input-mask-title text-bold">查询结果</div>
              <el-scrollbar
                class="scrollbar word-input-mask-list"
                wrap-class="scrollbar-wrap-class"
              >
                <div
                  v-infinite-scroll="loadData"
                  infinite-scroll-delay="1000"
                  :infinite-scroll-disabled="disabled"
                >
                  <div
                    v-for="(item,index) in searchList"
                    :key="index"
                    class="word-input-mask-item solids-bottom margin-tb-sm"
                    @click="jumpLearnWords(item)"
                  >
                    <div class="word-name">{{ item.word }}</div>
                    <div class="word-mean padding-tb-xs">{{ item.paraphrase }}</div>
                  </div>

                  <p
                    v-if="serachLoading"
                    class="flex text-red"
                  >加载中...</p>
                  <p
                    v-if="serachNoMore"
                    class="flex text-red"
                  >没有更多了</p>
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
            <num-train
              :id="id"
              :date="date"
              :number="number"
            />
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
import { mapState, mapMutations } from 'vuex'
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
      queryData: {
        count: 20,
        page: 1
      },
      serachLoading: false,
      last_page: 1,

      id: '',
      date: '',
      number: ''
    }
  },
  computed: {
    ...mapState(['wordList', 'wordId']),
    checkMean() {
      return this.$route.name !== 'todayLearnWords'
    },
    numTraining() {
      return this.$route.name === 'numberMemoryTraining'
    },
    serachNoMore() {
      return this.queryData.page >= this.last_page
    },
    disabled() {
      return this.serachLoading || this.serachNoMore
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
    ...mapMutations(['setWordList', 'setWordId']),
    getData() {
      this.$get({
        url: this.$urlPath.getTodayWord,
        data: {
          date: this.nowDate
        }
      }).then((res) => {
        // this.
        // if (res.data.length === 0 && res.current_page === 1) {
        //   this.$errorMsg('暂无该单词，请重新输入')
        // } else {
        //   this.last_page = res.last_page
        //   this.searchList.push(...res.data)
        //   this.isSearch = true
        // }
        // this.serachLoading = false
      }).catch((_) => {
        this.serachLoading = false
      })
      // this.wordObj = {
      //   wordName: 'resort',
      //   wordNature: '英',
      //   wordLink: 'https://tts.youdao.com/fanyivoice?word=word.mp3',
      //   phoneticSymbol: '/ rɪˈzɔːrt /',
      //   wordsMean: [
      //     {
      //       wordType: 'n.',
      //       wordMean: '度假胜地 采用的方法'
      //     },
      //     {
      //       wordType: 'vi.',
      //       wordMean: '诉诸，采取'
      //     }
      //   ],
      //   wordAssociate: '<p>热（<span style="color: rgb(225, 60, 57);">re</span>）瘦（<span style="color: rgb(225, 60, 57);">s</span>）的鸡蛋（<span style="color: rgb(225, 60, 57);">o</span>）热（<span style="color: rgb(225, 60, 57);">r</span>）的头（<span style="color: rgb(225, 60, 57);">t</span>）疼</p><p></p>',
      //   wordExampleLink: 'https://tts.youdao.com/fanyivoice?word=example.mp3',
      //   wordExample: '<p>This place is just so charming, the perfect <span style="background-color: transparent;">winter resort.</span></p><p>这个地方实在是太好啦，完美的冬季旅游胜地！</p>'
      // }
    },
    initData() {
      this.nowDate = new Date().format('yyyy-MM-dd')
      const showTodayWrods = this.$route.name !== 'fallibleWordScreen' && this.$route.name !== 'randomWordScreen' && this.$route.name !== 'numberMemoryTraining'
      this.changeTodayWrods(showTodayWrods)

      // this.researchPlanId = this.$route.params.id
      // this.researchPlanName = this.$route.params.name
    },
    changeTodayWrods(val, numTraining = false) {
      if (numTraining) {
        this.isTraining = numTraining
        this.toTrainNum()
      } else {
        this.isShowTodayWrods = val
      }
    },
    enterClick() {
      this.queryData = {
        count: 20,
        page: 1
      }
      this.getSerchList()
    },
    getSerchList() {
      this.serachLoading = true
      this.$get({
        url: this.$urlPath.getWordData,
        data: {
          word: this.searchVal,
          ...this.queryData
        }
      }).then((res) => {
        if (res.data.length === 0 && res.current_page === 1) {
          this.$errorMsg('暂无该单词，请重新输入')
        } else {
          this.last_page = res.last_page
          this.searchList.push(...res.data)
          this.isSearch = true
        }
        this.serachLoading = false
      }).catch((_) => {
        this.serachLoading = false
      })
    },
    loadData() {
      this.queryData.page += 1
      this.getSerchList()
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
    },
    toTrainNum() {
      this.$get({
        url: this.$urlPath.getNumberTraining,
        data: {
          digital_number: '20'
        }
      }).then((res) => {
        console.log('666666666', res)
        this.id = res.id
        this.date = res.date
        this.number = res.random_number
      })
    }
  }
}

</script>
<style lang='scss' scoped>
</style>
