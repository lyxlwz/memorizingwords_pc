<template>
  <div>
    <span class="word-name text-bold">{{ wordObj.wordName }}</span>
    <div class="margin-top flex">
      <span class="border-radius padding-xs word-info-bgcolor text-xs flex">
        <span class="margin-right-xs">{{ wordObj.wordNature }}</span>
        <play-words
          ref="wordLink"
          :audio-link="wordObj.wordLink"
          play-id="wordLink"
          :is-play.sync="wordIsPlay"
          @beforePlay="beforWordPlay"
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
      <div v-html="wordObj.wordAssociate"></div>
      <RichTextEditor
        v-if="isEditorAssociate"
        v-model="wordObj.wordAssociate"
        class="word-area-btn rich-text-editor"
      />
      <div
        class="text-right margin-top"
        @dblclick="isEditorAssociate = true"
      >
        <span class="text-center border-radius word-area-btn text-sm">联想</span>
      </div>
    </div>

    <div class="margin-top-xl border-radius padding-lg word-text-info-color word-area flex">
      <div class="text-xs">
        <div class="border-radius word-info-bgcolor padding-xs flex">
          <span class="margin-right-xs">{{ wordObj.wordNature }}</span>
          <play-words
            ref="wordExampleLink"
            :audio-link="wordObj.wordExampleLink"
            play-id="wordExampleLink"
            :is-play.sync="exampleIsPlay"
            @beforePlay="beforeExamplePlay"
          />
        </div>
      </div>
      <div class="margin-left-sm">
        <div v-html="wordObj.wordExample"></div>
        <RichTextEditor
          v-if="isEditorExample"
          v-model="wordObj.wordExample"
          :height="100"
          class="word-area-btn rich-text-editor"
        />
        <div
          class="text-right margin-top"
          @dblclick="isEditorExample = true"
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
    }
  },
  data() {
    return {
      wordIsPlay: false,
      exampleIsPlay: false,
      wordIds: ['wordLink', 'wordExampleLink'],
      isEditorAssociate: false,
      isEditorExample: false
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
    }
  }
}
.word-dashed-bottom {
  border-bottom: 2px dashed #ddd;
}

::v-deep .ql-toolbar.ql-snow {
  background: #fff !important;
  border-top-left-radius: 10px !important;
  border-top-right-radius: 10px !important;
}
</style>
