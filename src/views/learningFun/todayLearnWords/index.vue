<template>
  <div class="word-blue-bgcolor restore-page h-100">
    <el-row class="padding-lg text-white">
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

      <el-col :span="8">
        <div>
          <span class="text-sl text-bold">resort</span>
          <div class="margin-top">
            <span class="border-radius padding-xs word-info-bgcolor">英 \)))\</span>
            <span class="word-text-info-color">/ rɪˈzɔːrt /</span>
          </div>
          <div class="margin-top">
            <div>
              n.度假胜地采用的方法
            </div>
            <div>
              vi. 诉诸，采取
            </div>
          </div>
          <div
            class="margin-top border-radius padding"
            style="background:#fff;opacity:0.3;color:#999999"
          >
            <div>热（re）瘦（s）的鸡蛋（o）热（r）的头（t）疼</div>
            <div class="border-radius padding-xs text-right">联想</div>
          </div>
          <div class="margin-top border-radius padding">
            <div>
              This place is just so charming, the perfect winter resort.这个地方实在是太好啦，完美的冬季旅游胜地！
            </div>
            <div class="border-radius padding-xs text-right"> 例句</div>
          </div>
          <div class="flex justify-between">
            <el-button round>上一词</el-button>
            <el-button round>下一词</el-button>
          </div>
        </div>
      </el-col>

      <el-col :span="8">
        <el-input
          v-model="serchVal"
          placeholder="搜索"
          suffix-icon="el-icon-search"
          style="z-index:9999;position: relative"
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
      </el-col>
    </el-row>
  </div>
</template>

<script>
import saveRouteParams from '@/utils/saveRouteParams'
export default {
  name: 'Index',
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      serchVal: '',
      nowDate: '',
      showInpitMask: false,
      serchList: []
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
  },

  mounted() { },

  methods: {}
}

</script>
<style lang='less' scoped>
</style>
