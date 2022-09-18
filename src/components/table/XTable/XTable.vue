<template>
  <div
    class="x-table"
    :style="minTableHeight ? `height: calc(100% - ${minTableHeight}px)` : null"
  >
    <el-table
      ref="xTable"
      v-bind="$attrs"
      :data="tableData"
      :max-height="tableHeight"
      :style="{ '--line': cellLineNumber }"
      :header-row-class-name="tableConfig.headerRowClass"
      :header-row-style="tableConfig.headerRowStyle"
      :header-cell-class-name="tableConfig.headerCellClass"
      :header-cell-style="tableConfig.headerCellStyle"
      :stripe="tableConfig.stripe"
      :border="tableConfig.border"
      :size="tableConfig.size || 'medium'"
      :align="tableConfig.align || 'center'"
      v-on="$listeners"
      @selection-change="selectionChange"
    >
      <!-- 多选列 -->
      <template
        v-if="tableConfig.selection"
        align="center"
      >
        <el-table-column
          type="selection"
          :width="tableConfig.selectionWidth || 40"
          :fixed="tableConfig.selectionFixed || null"
          :selectable="tableConfig.selectable || null"
          :reserve-selection="tableConfig.reserveSave || null"
        />
      </template>
      <!-- 序号列 -->
      <template v-if="tableConfig.index">
        <el-table-column
          type="index"
          :width="tableConfig.indexWidth || 50"
          :label="tableConfig.indexLabel || '序号'"
          :fixed="tableConfig.indexFixed || null"
        />
      </template>
      <!-- 循环列 -->
      <TableTemplate
        v-for="(item, index) in tableColumn"
        :key="index"
        :table-colum-config="item"
        v-bind="$attrs"
        v-on="$listeners"
      />
      <!-- 提供一个插槽  -->
      <slot></slot>
    </el-table>
  </div>
</template>

<script>
import TableTemplate from './TableTemplate.vue'
export default {
  name: 'XTable',
  components: { TableTemplate },
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    tableConfig: {
      type: Object,
      default: () => {
        return {
          index: false, // 是否需要index列
          indexWidth: 60, // index列宽
          indexLabel: '序号', // index列label
          indexFixed: 'left', // index列是否开启fixed布局，如写则开启
          selection: false, // 是否需要多选列
          selectionWidth: 60, // 多选列宽
          selectionFixed: 'left', // index列是否开启fixed布局，如写则开启,
          stripe: this.$layoutStore.state.theme !== 'dark',
          border: this.$layoutStore.state.theme !== 'dark',
          size: 'medium',
          headerCellStyle: this.$layoutStore.state.theme === 'dark' ? {
            color: '#ffffff'
          } : {
            backgroundColor: 'rgb(236, 247, 255)',
            color: '#333333'
          }
        }
      }
    },
    tableColumn: {
      type: Array,
      require: true,
      default: () => []
    },
    minusPart: {
      type: Number,
      default: () => 0
    },
    minTableHeight: {
      type: Number,
      default: () => 0
    },
    cellLineNumber: {
      type: Number,
      default: () => 2
    }
  },
  data() {
    return {
      tableHeight: 0
    }
  },
  mounted() {
    this.getTableHeight()
    window.addEventListener('resize', this.getTableHeight)
  },
  beforeMount() {
    window.removeEventListener('resize', this.getTableHeight)
  },
  methods: {
    getTableHeight() {
      this.$nextTick(() => {
        this.tableHeight = window.innerHeight - this.minusPart
      })
    },

    selectionChange(val) {
      this.$emit('selectionChange', val)
    }
  }
}
</script>

<style lang="scss">
.x-table {
  .cell {
    padding: 0 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box; //作为弹性伸缩盒子模型显示。
    -webkit-box-orient: vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
    -webkit-line-clamp: var(--line); //显示的行
  }
  th {
    background: rgb(240, 242, 245);
  }
  .x-table-template {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: flex-start;
    .x-table-input {
      input {
        text-align: center;
      }
    }
  }
  .el-link {
    font-size: 12px;
  }
}
</style>
