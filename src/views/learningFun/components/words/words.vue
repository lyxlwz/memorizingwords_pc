<template>
  <div>
    <div @dblclick="isEditorword = true">
      <span
        v-if="!isEditorword"
        class="word-name text-bold"
      >{{ wordObj.word }}</span>
      <el-input
        v-else
        v-model="wordObj.word"
      />
    </div>
    <div class="margin-top flex">
      <span
        class="border-radius padding-xs word-info-bgcolor text-sm flex justify-around"
        style="width:60px;"
      >
        <span class="margin-right-xs">英</span>
        <play-words
          ref="wordLink"
          :audio-link="wordObj.word_voice"
          play-id="wordLink"
          :is-play.sync="wordIsPlay"
          @beforePlay="beforWordPlay"
        />
      </span>
    </div>

    <div
      v-if="checkMean"
      class="flex justify-center margin-top-xl"
    >
      <el-button
        round
        class="word-btn"
        @click="checkMean = false"
      >查看释意</el-button>
    </div>

    <div v-else>
      <div class="margin-top-lg text-lg">
        <span class="word-text-info-color">{{ wordObj.paraphrase }}</span>
      </div>

      <div class="margin-top-xl border-radius padding-lg word-text-info-color word-area">
        <div
          class="margin-bottom"
          v-html="wordObj.connect_in_the_mind"
        ></div>
        <RichTextEditor
          v-if="isEditorAssociate"
          v-model="wordObj.connect_in_the_mind"
          class="word-area-btn rich-text-editor"
        />
        <div
          class="text-right margin-top"
          @dblclick="isEditorAssociate = true"
        >
          <span class="text-center border-radius word-area-btn text-sm">联想</span>
        </div>
      </div>

      <div class="margin-top-xl border-radius padding-lg word-text-info-color word-area">
        <div>{{ wordObj.example }}</div>
        <div
          class="text-right margin-top"
          style="width:100%"
        >
          <span class="text-center border-radius word-area-btn text-sm">例句</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Words',
  components: {
    playWords(resolve) {
      require(['./playWords'], resolve)
    },
    RichTextEditor(resolve) {
      require(['@/components/common/RichTextEditor'], resolve)
    }
  },
  props: {
    wordObj: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 是否展示单词
    checkMean: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  data() {
    return {
      wordIsPlay: false,
      exampleIsPlay: false,
      wordIds: ['wordLink'],
      isEditorAssociate: false,
      isEditorword: false
    }
  },

  computed: {},

  mounted() { },

  methods: {
    beforWordPlay() {
      this.stopAllAudio()
      this.wordIsPlay = false
      console.log('beforWordPlay', this)
    },
    beforeExamplePlay() {
      this.stopAllAudio()
      this.exampleIsPlay = false
      console.log('beforeExamplePlay')
    },
    stopAllAudio() {
      this.wordIds.forEach(wordId => {
        this.$refs[wordId].pause()
      })
    }
  }
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
    .rich-text-editor {
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      font-size: 16px;
    }
  }

  // &-btn {
  //   background: rgb(225, 227, 229, 0.15);
  //   color: #ddd;
  //   font-weight: bold;
  //   border: none;
  //   width: 30%;
  // }
}
.word-dashed-bottom {
  border-bottom: 2px dashed #ddd;
}

::v-deep .ql-toolbar.ql-snow {
  background: #fff !important;
  border-top-left-radius: 10px !important;
  border-top-right-radius: 10px !important;
}

::v-deep .el-input__inner {
  background-color: #506cff !important;
  color: #fff !important;
  border: none !important;
  height: 80px !important;
  line-height: 80px !important;
  font-size: 48px !important;
  font-weight: bold !important;
}
</style>
