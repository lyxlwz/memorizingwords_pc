<template>
  <div class="main-container padding-lr-xl">
    <div class="flex justify-end margin-tb-sm">
      <el-input
        v-model="searchVal"
        placeholder="搜索"
        style="width:40%;z-index:1000;position: relative"
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
    </div>

    <el-row :gutter="20">
      <el-col
        v-for="(item,index) in dataList"
        :key="index"
        :span="6"
      >
        <div
          class="text-white text-xl border-radius flex justify-center flex-direction padding-lg card-item"
          :style="{'background-color':item.backgroundColor}"
        >
          <div>
            {{ item.title }}
          </div>
          <div style="font-size: 60px;">
            {{ item.number }}
          </div>
        </div>
      </el-col>
    </el-row>

    <div
      style="height: calc(100vh - 280px);"
      class="flex align-center justify-center"
    >
      <div
        class="border-radius margin-top flex justify-between text-bold"
        style="background-color:rgb(239, 224, 255);width:60%; padding:60px;"
      >
        <div style="max-width:400px;">
          <div
            class="text-sl"
            style="font-size:32px;color:#4d5156"
          >{{ proverbs.title }}</div>
          <div
            class="margin-top-sm word-text-color text-xxl"
            style="line-height:60px;"
          >
            {{ proverbs.aphorism }}
          </div>
        </div>
        <div>
          <img
            :src="proverbs.picture"
            alt=""
            style="width:230px;height:230px;border-radius: 50%;"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ResizeMixin from '@/mixins/ResizeMixin'
import { mapGetters } from 'vuex'
export default {
  name: 'Main',
  mixins: [ResizeMixin],
  data() {
    return {
      dataList: [],
      searchVal: '',
      showInpitMask: false,
      proverbs: {},
      searchList: [],
      isSearch: false,
      queryData: {
        count: 20,
        page: 1
      },
      serachLoading: false,
      last_page: 1
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'user/getUserInfo'
    }),
    collapse() {
      return this.$layoutStore.state.isCollapse
    },
    serachNoMore() {
      return this.queryData.page >= this.last_page
    },
    disabled() {
      return this.serachLoading || this.serachNoMore
    }
  },
  watch: {
    collapse(newVal) {
      setTimeout(() => {
        this.onResize()
      }, 500)
    }
  },
  created() {
    this.getDataList()
    this.getProverbs()
  },
  methods: {
    onResize(width) {

    },
    getDataList() {
      this.dataList = [
        {
          backgroundColor: 'rgb(250, 112, 139',
          title: '今日待学单词',
          number: this.userInfo.today_word_target
        },
        {
          backgroundColor: 'rgb(56, 172, 245)',
          title: '累积学习单词',
          number: this.userInfo.cumulative_learn_words
        },
        {
          backgroundColor: 'rgb(142, 107, 235)',
          title: '目标学习单词',
          number: this.userInfo.word_target
        },
        {
          backgroundColor: 'rgb(63, 200, 169)',
          title: '剩余未学单词',
          number: this.userInfo.remaining_unlearned_words
        }
      ]
    },
    getProverbs() {
      this.$get({ url: this.$urlPath.getAphorism }).then((res) => {
        this.proverbs = {
          title: '箴言',
          ...res
        }
      })
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
    jumpLearnWords(params) {
      this.$router.push({
        name: 'serachWord',
        params: {
          id: params.id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 992px) {
}

.card-item {
  height: 200px;
}

.scrollbar-wrap-class {
  overflow: hidden !important;
}
</style>
