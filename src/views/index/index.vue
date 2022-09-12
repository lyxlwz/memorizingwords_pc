<template>
  <div class="main-container">
    <div class="flex justify-end margin-tb-sm">
      <!--       style="position: relative" -->
      <el-input
        v-model="serchVal"
        placeholder="搜索"
        suffix-icon="el-icon-search"
        style="width:40%;z-index:9999;position: relative"
        @focus="showInpitMask = true"
      />

      <!-- 搜索蒙层 -->
      <MaskContent :show-mask.sync="showInpitMask">
        <transition>
          <div class="content">
            <div class="content-title text-bold">查询结果</div>
            <el-scrollbar
              class="scrollbar content-list"
              wrap-class="scrollbar-wrap-class"
            >
              <div
                v-for="(word,index) in serchList"
                :key="index"
                class="content-list-item solids-bottom margin-tb-sm"
                @click="jumpLearnWords(word)"
              >
                <div class="word-name">{{ word.wordName }}</div>
                <div class="word-mean padding-tb-xs">{{ word.wordMean }}</div>
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
          class="text-white text-df border-radius flex justify-center flex-direction padding-lg card-item"
          :style="{'background-color':item.backgroundColor}"
        >
          <div>
            {{ item.title }}
          </div>
          <div class="text-xxl">
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
        class="border-radius padding-xl text-xxl margin-top flex justify-between"
        style="background-color:red;width:60%;height:40%;"
      >
        <div style="max-width:400px;">
          <div class="text-bold">{{ proverbs.title }}</div>
          <div class="margin-top-sm text-xl">
            {{ proverbs.message }}
          </div>
        </div>
        <div>
          <img
            :src="require('@/assets/img_avatar_default.png')"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ResizeMixin from '@/mixins/ResizeMixin'
export default {
  name: 'Main',
  components: {
  },
  mixins: [ResizeMixin],
  data() {
    return {
      dataList: [],
      serchVal: '',
      showInpitMask: false,
      proverbs: {},
      serchList: []
    }
  },
  computed: {
    collapse() {
      return this.$layoutStore.state.isCollapse
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
    this.getData()
  },
  methods: {
    onResize(width) {

    },
    getData() {
      this.dataList = [
        {
          backgroundColor: 'pink',
          title: '今日待学单词',
          number: '201'
        },
        {
          backgroundColor: 'blue',
          title: '累积学习单词',
          number: '9000'
        },
        {
          backgroundColor: 'purple',
          title: '目标学习单词',
          number: '20000'
        },
        {
          backgroundColor: 'green',
          title: '剩余未学单词',
          number: '11000'
        }
      ]

      this.proverbs = {
        title: '箴言',
        message: '人的一生中应该有三个爱好，一个帮助你赚钱，一个管理身材，一个帮助你探索世界'
        // imgUrl:''
      }

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

<style lang="scss" scoped>
@media screen and (max-width: 992px) {
}

.card-item {
  height: 140px;
}

.content {
  position: absolute;
  top: 10%;
  right: 1%;
  width: 32.8%;
  height: inherit;

  &-list {
    height: 80%;
  }
}

.scrollbar-wrap-class {
  overflow: hidden !important;
}
</style>
