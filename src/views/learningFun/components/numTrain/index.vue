<template>
  <div class="text-white">
    <train-results v-if="isResults" />
    <train-process
      v-else
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
  props: {},
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
      this.isResults = val
    }
  }
}

</script>
<style lang='scss' scoped>
</style>
