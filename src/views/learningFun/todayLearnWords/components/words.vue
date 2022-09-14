<template>
  <div>
    <span class="word-name text-bold">{{ wordObj.wordName }}</span>
    <div class="margin-top flex">
      <span class="border-radius padding-xs word-info-bgcolor text-xs flex">
        <span class="margin-right-xs">{{ wordObj.wordNature }}</span>
        <play-words
          :audio-link="wordObj.wordLink"
          play-id="wordLink"
        />
      </span>
      <span class="word-text-info-color margin-left-xs">{{ wordObj.phoneticSymbol }}</span>
    </div>
    <div
      v-for="(item,index) in wordObj.wordsMean"
      :key="index"
      class="margin-top-lg text-lg"
    >
      <div>
        <span class="word-text-info-color">{{ item.wordType }}</span>
        <span class="margin-left-xs">
          <span class="word-dashed-bottom">{{ item.wordMean }}</span>
          <!-- <span class="word-dashed-bottom margin-left-xs">采用的方法</span> -->
        </span>
      </div>
    </div>

    <div class="margin-top-xl border-radius padding-lg word-text-info-color word-area">
      <!-- <el-input v-model="wordAssociate" /> -->
      <div>{{ wordObj.wordAssociate }}</div>
      <div class="text-right margin-top">
        <span class="text-center border-radius word-area-btn text-sm">联想</span>
      </div>
    </div>

    <div class="margin-top-xl border-radius padding-lg word-text-info-color word-area flex">
      <div class="text-xs">
        <div class="border-radius word-info-bgcolor padding-xs flex">
          <span class="margin-right-xs">{{ wordObj.wordNature }}</span>
          <play-words
            :audio-link="wordObj.wordExampleLink"
            play-id="wordExampleLink"
          />
        </div>
      </div>
      <div class="margin-left-sm">
        <div>{{ wordObj.wordExample }}</div>
        <div class="text-right margin-top">
          <span class="text-center border-radius word-area-btn text-sm">例句</span>
        </div>
      </div>
    </div>

    <div class="flex justify-between margin-top-xl">
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
</template>

<script>
import playWords from './playWords.vue'
export default {
  name: 'Words',
  components: { playWords },
  props: {
    wordObj: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
    }
  },

  computed: {},

  mounted() { },

  methods: {}
}

</script>
<style lang='scss' scoped>
.word {
  &-container {
    padding: 80px;
  }

  &-name {
    font-size: 50px;
  }

  &-area {
    background: rgb(255, 255, 255, 0.1);
    &-btn {
      background: rgb(255, 255, 255, 0.2);
      padding: 5px 20px;
    }
  }

  &-btn {
    background: rgb(225, 227, 229, 0.15);
    color: #ddd;
    font-weight: bold;
    border: none;
  }
}
.word-dashed-bottom {
  border-bottom: 2px dashed #ddd;
}
</style>
