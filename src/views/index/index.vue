<template>
  <div class="main-container">
    <div class="flex justify-end margin-tb-sm">
      <el-input
        v-model="serchVal"
        placeholder="搜索"
        suffix-icon="el-icon-search"
        style="width:40%"
      />
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
          <div class="text-bold">箴言</div>
          <div class="margin-top-sm text-xl">
            人的一生中应该有三个爱好，一个帮助你赚钱，一个管理身材，一个帮助你探索世界
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
      dataList: [
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
      ],
      serchVal: ''
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
  methods: {
    onResize(width) {

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
</style>
