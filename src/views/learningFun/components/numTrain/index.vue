<template>
  <div class="text-white">
    <train-results
      v-if="isResults"
      :num-results-data="numResultsObj"
    />
    <train-process
      v-else
      :train-num-data="trainNumData"
      @submit="submit"
    />

  </div>
</template>

<script>
import trainProcess from './process.vue'
import trainResults from './results.vue'
export default {
  name: 'Index',
  components: { trainProcess, trainResults },
  mixins: [],
  props: {
    trainNumData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      isResults: false,
      numResultsObj: {}
    }
  },

  computed: {},

  created() {

  },

  methods: {
    submit(val) {
      this.isResults = val.isResults
      this.$get({
        url: this.$urlPath.getNumberTraining,
        data: {
          id: this.trainNumData.id,
          upload_number: val.upload_number,
          time_spent: val.time_spent
        }
      }).then((res) => {
        this.numResultsObj = res
      })
    }
  }
}

</script>
<style lang='scss' scoped>
</style>
