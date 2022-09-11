<template>
  <div
    class="vaw-main-layout-container"
    :class="[!state.isCollapse ? 'main-layout-open-status': 'main-layout-close-status', state.isFixedNavBar ? 'main-layout_fixed-nav-bar' : 'main-layout']"
  >
    <div class="main-base-style">
      <section class="main-section">
        <Main />
      </section>
      <el-backtop target=".main-base-style">
        <div>
          <i class="el-icon-caret-top"></i>
        </div>
      </el-backtop>
    </div>
    <el-backtop target=".vaw-main-layout-container">
      <div>
        <i class="el-icon-caret-top"></i>
      </div>
    </el-backtop>
  </div>
</template>

<script>
import Main from './Main'
import store from './store/index'
export default {
  name: 'MainLayout',
  components: { Main },
  props: {
    showNavBar: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      state: store.state
    }
  },
  computed: {
    isShowHeader() {
      return store.isShowHeader()
    }
  },
  methods: {
    onFixedHeader() {
      store.toggleFixedNavBar(!this.state.isFixedNavBar)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables.scss";
.main-layout-open-status {
  margin-left: $menuWidth;
}
.main-layout-close-status {
  margin-left: $minMenuWidth;
}
.nav-bar-open-status.fixed-nav-bar {
  width: calc(100% - #{$menuWidth});
}
.nav-bar-close-status.fixed-nav-bar {
  width: calc(100% - #{$minMenuWidth});
}

.main-layout {
  padding-top: 0;
  overflow-y: auto;
  .main-base-style {
    height: calc(100% - #{$logoHeight + $tabHeight});
  }
}
.main-layout_fixed-nav-bar {
  // padding-top: $logoHeight + $tabHeight;
  overflow-y: hidden;
  .main-base-style {
    height: 100%;
    overflow-y: auto;
  }
}

.vaw-main-layout-container {
  background: #fff !important;
  height: 100%;
  box-sizing: border-box;
  transition: margin-left $transitionTime;
  .main-base-style {
    box-sizing: border-box;
    padding: 10px;
  }
  .main-section {
    // min-height: calc(100% - #{$footerHeight});
    overflow-x: hidden;
  }
  .fixed-nav-bar {
    position: fixed;
    top: 0;
    transition: width $transitionTime;
    z-index: 99;
  }
  .tab-bar-top {
    padding-top: $logoHeight;
  }
}
.is-mobile {
  .main-layout-open-status,
  .main-layout-close-status {
    margin-left: 0;
    transition: none;
  }
  .nav-bar-open-status,
  .nav-bar-close-status {
    width: 100%;
  }
}
</style>
