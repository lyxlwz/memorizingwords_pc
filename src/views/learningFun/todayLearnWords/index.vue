<!--  -->
<template>
  <div>今日学习单词</div>
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
    }
  },
  computed: {},
  created() {
    const that = this
    saveRouteParams(that)
    console.log(this.$route, this.$store, this.$route.params, '----99999999999')
    // this.researchPlanId = this.$route.params.id
    // this.researchPlanName = this.$route.params.name
  },

  mounted() { },

  methods: {}
}

</script>
<style lang='less' scoped>
</style>
