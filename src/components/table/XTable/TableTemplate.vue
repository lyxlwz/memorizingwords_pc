<template>
  <el-table-column
    :label="tableColumConfig.label || ''"
    :width="tableColumConfig.width || ''"
    :min-width="tableColumConfig.minWidth || ''"
    :prop="tableColumConfig.prop"
    :align="tableColumConfig.align || 'center'"
    :header-align="tableColumConfig.headerAlign || 'center'"
    :fixed="tableColumConfig.fixed || null"
    :sortable="tableColumConfig.sortable || false"
    :render-header="
      tableColumConfig.renderHeader ? tableColumConfig.renderHeader : null
    "
  >
    <template slot-scope="scope">
      <!-- 循环可能存在的template数组 -->
      <div
        v-if="
          tableColumConfig.template &&
            Array.isArray(tableColumConfig.template) &&
            !tableColumConfig.children
        "
        class="x-table-template"
        :style="tableColumConfig.alignStyle || ''"
      >
        <div
          v-for="(i, _index) in renderItem(
            tableColumConfig.template,
            scope.row
          )"
          :key="_index"
        >
          <!-- 按钮项 -->
          <template v-if="i.type === 'button'">
            <el-button
              :type="i.assemblyType || 'primary'"
              :disabled="
                i.disabled
                  ? i.disabled({
                    row: scope.row,
                    route: $route,
                    exData: exData,
                  })
                  : false
              "
              @click="
                emitFunc(i.method || 'defaultMethod', {
                  row: scope.row,
                  index: scope.$index,
                  additionalParams: i.addParams || '',
                })
              "
            >
              {{ i.text }}
            </el-button>
          </template>
          <!-- icon项 -->
          <template v-else-if="i.type === 'icon'">
            <el-link
              :type="i.assemblyType || 'primary'"
              :disabled="
                i.disabled
                  ? i.disabled({
                    row: scope.row,
                    route: $route,
                    exData: exData,
                  })
                  : false
              "
              @click="
                emitFunc(i.method || 'defaultMethod', {
                  row: scope.row,
                  index: scope.$index,
                  additionalParams: i.addParams || '',
                })
              "
            >
              <!-- icon的样式 具体看 https://element.eleme.cn/#/zh-CN/component/icon -->
              <i :class="i.iconClass"></i>
            </el-link>
          </template>
          <!-- input输入框 -->
          <template v-else-if="i.type === 'input'">
            <el-input
              v-model="scope.row[`${tableColumConfig.prop}`]"
              class="x-table-input"
              :type="i.assemblyType || 'text'"
              :placeholder="i.placeholder || '请输入'"
              :disabled="
                i.disabled
                  ? i.disabled({
                    row: scope.row,
                    route: $route,
                    exData: exData,
                  })
                  : false
              "
              @blur="
                emitFunc(i.method || 'defaultMethod', {
                  row: scope.row,
                  index: scope.$index,
                  additionalParams: i.addParams || '',
                })
              "
            />
          </template>
          <!-- 文字方面的 -->
          <template v-else-if="i.type === 'link'">
            <el-link
              :type="i.assemblyType || 'primary'"
              :disabled="
                i.disabled
                  ? i.disabled({
                    row: scope.row,
                    route: $route,
                    exData: exData,
                  })
                  : false
              "
              @click="
                emitFunc(i.method || 'defaultMethod', {
                  row: scope.row,
                  index: scope.$index,
                  additionalParams: i.addParams || '',
                })
              "
            >
              {{ i.text }}
            </el-link>
          </template>
          <!-- 非超链接 -->
          <template v-else-if="i.type === 'span'">
            <span
              :style="i.spanStyle ? i.spanStyle(scope.row) : ''"
              @click="
                emitFunc(i.method || 'defaultMethod', {
                  row: scope.row,
                  index: scope.$index,
                  additionalParams: i.addParams || '',
                })
              "
            >
              {{ i.span(scope.row) }}
            </span>
          </template>
          <template v-else-if="i.type === 'render'">
            <XTableReder
              v-bind="$attrs"
              :sc="scope"
              :row="scope.row"
              :render="i.render(scope.row, that)"
              :reder-style="i.classStyle ? i.classStyle(scope.row) : ''"
              v-on="$listeners"
              @sss="sss"
            />
          </template>
          <template v-else-if="i.type === 'renderLink'">
            <el-link
              v-for="(_x, _xindex) in i.renderLink(scope.row)"
              :key="_xindex"
              :disabled="
                i.disabled
                  ? i.disabled({
                    row: scope.row,
                    route: $route,
                    exData: exData,
                  })
                  : false
              "
              :type="i.assemblyType ? i.assemblyType() : 'primary'"
              :style="i.linkStyle"
              @click="
                emitFunc(i.method || 'defaultMethod', {
                  row: scope.row,
                  index: scope.$index,
                  additionalParams: i.addParams || '',
                  linkIndex: _xindex,
                })
              "
            >
              {{ _x }}
            </el-link>
          </template>
          <!-- 自定义值 -->
          <el-link
            v-if="i.supplement"
            :type="i.suppleType ? i.suppleType(scope.row) : ' '"
            :disabled="
              i.disabled
                ? i.disabled({
                  row: scope.row,
                  route: $route,
                  exData: exData,
                })
                : false
            "
            @click="
              emitFunc(i.method || 'defaultMethod', {
                row: scope.row,
                index: scope.$index,
                additionalParams: i.addParams || '',
              })
            "
          >{{ i.supplement(scope.row) }}
          </el-link>
        </div>
      </div>

      <template v-else>
        {{ scope.row[`${tableColumConfig.prop}`] }}
      </template>
    </template>
    <!-- 可能存在的子集 -->
    <template v-if="tableColumConfig.children">
      <xtable-template
        v-for="(i, __index) in tableColumConfig.children"
        :key="__index"
        :table-colum-config="i"
        v-bind="$attrs"
        v-on="$listeners"
      />
    </template>
  </el-table-column>
</template>

<script>
import XTableReder from './TableReder.vue'
export default {
  name: 'XtableTemplate',
  components: { XTableReder },
  props: {
    tableColumConfig: {
      type: Object,
      default: () => { }
    }
  },
  computed: {
    that() {
      return this
    },
    exData() {
      return window.localStorage.getItem('exData') || ''
    },
    // 是否渲染模板内的template
    renderItem() {
      return function (templateList, row) {
        if (!Array.isArray(templateList)) {
          return []
        }
        return templateList.filter((i) => {
          return i.showItem
            ? i.showItem({
              row: row,
              route: this.$route,
              exData: this.exData
            })
            : true
        })
      }
    }
  },
  methods: {
    emitFunc(method, row) {
      this.$emit(method, row)
    }
  }
}
</script>

<style lang="scss" scoped></style>
