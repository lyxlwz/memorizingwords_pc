<template>
  <div class="text-white">
    <train-results v-if="isResults" />
    <train-process
      v-else
      :number="number"
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
    id: {
      type: Number,
      default: 0
    },
    date: {
      type: String,
      default: ''
    },
    number: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isResults: false
    }
  },

  computed: {},

  created() {

  },

  methods: {
    submit(val) {
      console.log(val, 55555555)
      this.isResults = val.isResults
      this.$get({
        url: this.$urlPath.getNumberTraining,
        data: {
          id: this.id,
          upload_number: val.upload_number,
          time_spent: val.time_spent
        }
      }).then((res) => {
        console.log('666666666', res)
      })
    }
  }
}

</script>
<style lang='scss' scoped>
</style>
