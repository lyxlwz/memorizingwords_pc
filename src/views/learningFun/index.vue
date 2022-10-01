<template>
  <div
    v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-text="拼命加载中"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    class="word-blue-bgcolor restore-page h-100 padding-lg text-white text-df"
  >
    <el-row style="height:120px">
      <el-col
        v-if="isShowTodayWrods"
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
            <num-train :train-num-data="numTrainObj" />
          </div>

          <div v-else>
            <div
              v-if="!isShowTodayWrods"
              class="flex align-center  flex-direction"
            >
              <div class="text-bold text-xxl">{{ $route.meta.title }}</div>
              <div
                class="word-info-bgcolor border-radius flex align-center justify-center inputVal"
                style="width:50%; margin: 50px 0; "
              >
                <!-- <span class="padding text-bold text-xxl ">20</span> -->
                <el-input v-model="inputVal" />
              </div>
              <el-button
                round
                class="word-btn"
                @click="changeTodayWrods(true,numTraining)"
              >{{ numTraining ? '开始训练' : '开始筛查' }}</el-button>
            </div>

            <div v-else>
              <words
                ref="words"
                :word-obj="wordObj"
                :check-mean="checkMean"
                :is-editor-word.sync="isEditorWord"
                :is-editor-associate.sync="isEditorAssociate"
              />

              <div class="flex justify-around margin-top-xl">
                <el-button
                  round
                  class="word-btn"
                  @click="lastWord"
                >{{ firstLoad ? '不记得' : '上一词' }}</el-button>
                <el-button
                  round
                  class="word-btn"
                  @click="nextWord"
                >
                  {{ lastLoad ? '开始筛查' :'下一词' }}</el-button>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import words from './components/words/words.vue'
import numTrain from './components/numTrain/index.vue'
import { mapGetters, mapMutations } from 'vuex'
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
      firstLoad: false,
      lastLoad: false,
      screenType: 1,
      inputVal: '20',
      numTrainObj: {},
      fullscreenLoading: false,
      isEditorWord: false,
      isEditorAssociate: false
    }
  },
  computed: {
    ...mapGetters({
      wordList: 'word/getWordList',
      wordId: 'word/getWordId'
    }),
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
    this.initData()
  },
  methods: {
    ...mapMutations({
      setWordList: 'word/setWordList',
      setWordId: 'word/setWordId'
    }),
    getTodayLearnWords() {
      this.fullscreenLoading = true
      this.$get({
        url: this.$urlPath.getTodayWord,
        data: {
          date: this.nowDate
        }
      }).then((res) => {
        this.setWordList(res.temp_word_list)
        this.setWordId(res.temp_word_list[0])
        this.getWord(this.wordId)
      })
    },
    getRandomWordScreen() {
      this.fullscreenLoading = true
      this.$get({
        url: this.$urlPath.getRandomWordScreening,
        data: {
          count: this.inputVal
        }
      }).then((res) => {
        this.setWordList(res.temp_word_list)
        this.setWordId(res.temp_word_list[0])
        this.getWord(this.wordId)
      })
    },
    getFallibleWordScreen() {
      this.fullscreenLoading = true
      this.$get({
        url: this.$urlPath.getErrorWordScreening,
        data: {
          count: this.inputVal
        }
      }).then((res) => {
        this.setWordList(res.temp_word_list)
        this.setWordId(res.temp_word_list[0])
        this.getWord(this.wordId)
      })
    },
    getScreenWords(data) {
      this.$get({
        url: this.$urlPath.getWordScreening,
        data
      }).then((res) => {
        let successMsg = '单词不记得，临时表及筛查表更新成功'
        if (data.type === 2) {
          successMsg = '单词不记得，临时表及筛查表更新成功'
        } else if (data.type === 3) {
          successMsg = '单词记得，临时表及筛查表更新成功'
        }
        this.$successMsg(successMsg)
      })
    },
    getWord(word_id) {
      this.firstLoad = this.wordList[0] === this.wordId
      this.lastLoad = this.wordId === this.wordList[this.wordList.length - 1]
      this.$get({
        url: this.$urlPath.getWord,
        data: { word_id }
      }).then((res) => {
        this.wordObj = res
        this.wordObj.word_voice = `${this.$urlPath.wordVoiceUrl}${res.word_voice}`
        this.fullscreenLoading = false
      })
    },
    initData() {
      this.nowDate = new Date().format('yyyy-MM-dd')
      const showTodayWrods = this.$route.name !== 'fallibleWordScreen' && this.$route.name !== 'randomWordScreen' && this.$route.name !== 'numberMemoryTraining'
      this.changeTodayWrods(showTodayWrods)

      switch (this.$route.name) {
        case 'todayLearnWords':
          this.screenType = 1
          this.getTodayLearnWords()
          break
        case 'randomWordScreen':
          this.screenType = 2
          break
        case 'fallibleWordScreen':
          this.screenType = 3
          break
        default:
          break
      }
    },
    changeTodayWrods(val, numTraining = false) {
      if (numTraining) {
        this.isTraining = numTraining
        this.toTrainNum()
      } else {
        this.isShowTodayWrods = val
        if (this.screenType === 2) {
          this.getRandomWordScreen()
        } else if (this.screenType === 3) {
          this.getFallibleWordScreen()
        }
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
        url: this.$urlPath.getWord,
        data: {
          word: this.searchVal,
          ...this.queryData
        }
      }).then((res) => {
        if (res.data.length === 0 && res.current_page === 1) {
          this.$errorMsg('暂无该单词，请重新输入')
          return
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
    lastWord() {
      if (this.firstLoad) {
        this.getScreenWords({
          type: this.screenType,
          word_id: this.wordId,
          error_count: 1,
          date: this.nowDate
        })
      } else {
        const length = this.wordList.length
        const index = this.wordList.findIndex(v => v === this.wordId)
        const wordId = index === 0 ? this.wordList[length - 1] : this.wordList[index - 1]
        this.toNewWord(wordId)
      }
    },
    nextWord() {
      if (this.lastLoad) {
        this.getScreenWords({
          type: this.screenType,
          word_id: this.wordId,
          error_count: 0,
          date: this.nowDate
        })
      } else {
        const length = this.wordList.length
        const index = this.wordList.findIndex(v => v === this.wordId)
        const wordId = index === length - 1 ? this.wordList[0] : this.wordList[index + 1]
        this.toNewWord(wordId)
      }
    },
    toNewWord(wordId) {
      if (this.isEditorWord || this.isEditorAssociate) {
        this.$get({
          url: this.$urlPath.updateWord,
          data: {
            word_id: this.wordObj.id,
            word: this.wordObj.word,
            connect_in_the_mind: this.wordObj.connect_in_the_mind
          }
        }).then((res) => {
          this.isEditorWord = false
          this.isEditorAssociate = false
          this.wordObj = res[0]
          this.$successMsg('单词更新成功!')
        })
      } else {
        this.setWordId(wordId)
        this.getWord(wordId)
      }
    },
    jumpLearnWords(params) {
      this.$router.push({
        name: 'serachWord',
        params: {
          id: params.id
        }
      })
    },
    toTrainNum() {
      this.$get({
        url: this.$urlPath.getNumberTraining,
        data: {
          digital_number: '20'
        }
      }).then((res) => {
        this.numTrainObj = res
      })
    }
  }
}

</script>
<style lang='scss' scoped>
.inputVal {
  ::v-deep .el-input__inner {
    background-color: #506cff !important;
    color: #fff !important;
    border: none !important;
    height: 70px !important;
    line-height: 70px !important;
    font-size: 28px !important;
    font-weight: bold !important;
    text-align: center !important;
  }
}
</style>
