<template>
  <el-scrollbar
    class="scrollbar"
    wrap-class="scrollbar-wrap-class"
  >
    <el-menu
      ref="menus"
      :default-active="$route.fullPath"
      mode="vertical"
      :collapse="state.isCollapse"
      :background-color="state.themeVariables[state.theme].menuColor"
      :text-color="state.themeVariables[state.theme].menuTextColor"
      :collapse-transition="false"
      :default-openeds="state.defaultOpeneds"
      @close="handleClose"
    >
      <slot></slot>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import store from '../../store/index'
export default {
  name: 'ScrollerMenu',
  props: {
    routes: {
      type: Array,
      require: true,
      default: () => {
        return []
      }
    },
    fullPath: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      state: store.state
    }
  },
  methods: {
    handleClose(key, keyPath) {
      this.$refs.menus.open(keyPath)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/variables.scss";
.scrollbar {
  height: calc(100% - #{$logoHeight}) !important;
}
.scrollbar-wrap-class {
  overflow: hidden !important;
}
.el-menu ::v-deep {
  .el-submenu .el-submenu__title .el-submenu__icon-arrow {
    visibility: hidden;
  }
}
</style>
