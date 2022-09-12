<template>
  <div
    v-if="showMask"
    class="mask text-white"
    @click.stop="closeMask"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'MaskContent',
  props: {
    showMask: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  },
  methods: {
    closeMask() {
      this.$emit('update:showMask', false)
    }
  }
}

</script>
<style lang='less' scoped>
</style>
