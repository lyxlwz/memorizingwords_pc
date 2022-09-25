<template>
  <div class="flex flex-wrap num-training padding-top">
    <div
      v-for="(num,numIndex) in randomNumber"
      :key="numIndex"
      class="num-training-item"
    >
      <div
        class="word-info-bgcolor border-radius text-center num-training-num"
        :style="{'margin':remember ? '0':'10%'}"
      >
        <el-input
          v-if="remember"
          v-model="numList[numIndex]"
          maxlength="1"
          type="text"
        />
        <span v-else>{{ num }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RandomBox',
  props: {
    randomNumber: {
      type: String,
      default: ''
    },
    remember: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      numList: []
    }
  },

  computed: {},

  mounted() { },

  methods: {}
}

</script>
<style lang='scss' scoped>
.num-training {
  &-item {
    width: 10%;
    // margin: 1%;
  }
  &-num {
    padding: 10%;
  }
}
</style>
