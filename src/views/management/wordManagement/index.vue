<template>
  <div class="padding-lg">
    <div class="padding-xs">
      <div class="flex align-center justify-between">
        <div class="flex align-center">
          <span class="word-text-color text-df text-bold">根据条件搜索</span>
          <div class="margin-left">
            <el-input
              v-model="searchConditions"
              placeholder="搜索"
              suffix-icon="el-icon-search"
              style="width:100%"
            >
              <el-select
                slot="prepend"
                v-model="selConditions"
                placeholder="请选择"
                style="width:120px"
              >
                <el-option
                  v-for="(option,index) in serchOptions"
                  :key="index"
                  :label="option.label"
                  :value="option.prop"
                />
              </el-select>
            </el-input>
          </div>
        </div>
        <div>
          <el-button
            icon="el-icon-plus"
            style="background-color: #3D5CFF;color:#fff;border-radius:10px"
            @click="importData"
          >单词导入</el-button>
        </div>
      </div>

      <div class="flex align-center justify-between margin-top-xl">
        <div class="flex">
          <div class="flex align-center margin-right-lg">
            <span class="word-text-color text-df text-bold margin-right-sm">批量修改</span>
            <div>
              <el-select
                v-model="modSelOption"
                placeholder="请选择"
              >
                <el-option
                  v-for="(option,index) in modOptions"
                  :key="index"
                  :label="option.label"
                  :value="option.prop"
                />
              </el-select>
            </div>
          </div>

          <div class="flex align-center margin-right-lg">
            <span class="word-text-color text-bold margin-right-sm">修改为</span>
            <div>
              <el-input v-model="modValue" />
            </div>
          </div>

          <div>
            <el-button style="background-color: #3D5CFF;color:#fff;border-radius:10px">确定</el-button>
          </div>
        </div>

        <div class="word-text-color text-df text-bold">
          <span v-show="checkVal.includes('结果全选')">暂不显示</span>
          <span v-show="!checkVal.includes('结果全选')">已选择{{ selData.length }}</span>
        </div>
      </div>

      <div class="flex justify-end margin-tb-xl">
        <el-checkbox-group
          v-model="checkVal"
          @change="checkBoxChange"
        >
          <el-checkbox
            v-for="(checkItem,index) in checkList"
            :key="index"
            :label="checkItem"
          />
        </el-checkbox-group>
      </div>
    </div>

    <TableBody ref="tableBody">
      <template>
        <!--表格-->
        <XTable
          v-loading="tableLoading"
          :minus-part="300"
          class="mt-2"
          :table-column="tableColumn"
          :table-data="tableData"
          :table-config="tableConfig"
          @rowClick="rowClick"
          @modClick="modClick"
          @deleteOne="deleteOne"
        />
      </template>
    </TableBody>
    <TableFooter
      :current-page="pageModel.currentPage"
      :page-size="pageModel.pageSize"
      :total-size="pageModel.totalSize"
      @pageSizeChanged="pageSizeChanged"
      @currentChanged="currentChanged"
      @onRefresh="getData"
    />
  </div>
</template>

<script>
import TableMixin, { PageModelMixin } from '@/mixins/TableMixin'

import domain from './domain/domain'
export default {
  name: 'Index',
  components: {},
  mixins: [
    TableMixin,
    PageModelMixin
  ],
  props: {},
  data() {
    return {
      searchConditions: '',
      selConditions: 'word_id',
      serchOptions: domain,
      modValue: '',
      modOptions: domain,
      modSelOption: 'word_id',

      tableColumn: domain,
      tableConfig: {
        border: true,
        size: 'medium',
        align: 'center',
        index: false, // 是否需要index列
        selection: false, // 是否需要多选列
        headerCellStyle: { backgroundColor: 'rgb(236, 247, 255)', color: '#333333' },
        rowClassName: ({ row, rowIndex }) => {
          return this.tableRowClassName({ row, rowIndex })
        }
      },

      selData: [],
      checkVal: [],
      checkList: ['结果全选', '当页全选'],
      winExport: false,
      uploadFileAction: ''
    }
  },

  computed: {},
  created() {
    this.getData()
  },

  mounted() { },

  methods: {
    getData() {
      this.tableLoading = true
      const data = {
        word: 'word1',
        paraphrase: '单词',
        connect_in_the_mind: '内容内容内容',
        group_id: '备注',
        first_study_date: '2021-09-03'
      }
      setTimeout(() => {
        this.tableData = Array(20).fill({}).map((item, index) => {
          return {
            rowIndex: index,
            word_id: ++index,
            checked: false,
            ...data
          }
        })
        console.log(this.tableData, '7777this.tableData')
        this.tableLoading = false

        this.handleSuccess(
          {
            data: this.tableData,
            totalSize: 20
          }
        )
      }, 300)
    },
    checkBoxChange(val) {
      if (val.length > 1) {
        this.checkVal.shift()
      } else if (val.length > 0) {
        if (val.includes('结果全选')) {
          console.log('结果全选')
        }
        if (val.includes('当页全选')) {
          console.log('当页全选')
          this.selData = this.tableData
        }
      } else {
        this.selData = []
      }
    },
    modClick(data) {
      console.log(data, '开始编辑')
      if (data._columns.text === '编辑') {
        this.modFun(data)
      } else if (data._columns.text === '完成编辑') {
        this.$showConfirmDialog('是否完成本次编辑？').then(() => {
          this.modFun(data)
          this.$successMsg('编辑成功！')
        }).catch(() => { })
      }
    },
    modFun(data) {
      data.columns.forEach((column, columnIndex) => {
        // if (columnIndex === data.index) {

        console.log(columnIndex, data.rowIndex, '==data.rowIndex')
        if (column.template[0].type === 'input') {
          this.$set(column.template[0], 'isShow', !column.template[0].isShow)
        }

        if (column.template[0].text === '编辑') {
          this.$set(column.template[0], 'text', '完成编辑')
          this.$set(column.template[0], 'assemblyType', 'danger')
        } else if (column.template[0].text === '完成编辑') {
          this.$set(column.template[0], 'text', '编辑')
          this.$set(column.template[0], 'assemblyType', 'primary')
        }
        // }
      })
    },
    deleteOne(data) {
      console.log(data, '开始删除')
    },
    rowClick({ row, column, event }) {
      this.$set(row, 'checked', !row.checked)
      this.selData.forEach(data => {

      })
      if (row.checked) {
        this.selData.push(row)
      } else {
        this.selData.forEach((data, index) => {
          if (data.rowIndex === row.rowIndex) {
            this.selData.splice(index, 1)
          }
        })
      }
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.checked && rowIndex === row.rowIndex) {
        return 'highlight-row'
      }
      // else {
      //   return 'tab-row'
      // }
      // return
    },
    importData() {
      this.winExport = true
    },
    success() {

    }
  }
}

</script>
<style lang='scss' scoped>
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.x-table {
  ::v-deep.el-table__body .highlight-row {
    background-color: #cdcbce !important;
    // color: #3d5cff !important;
    // color: #fff !important;
    font-weight: bold !important;
  }
  // ::v-deep.el-table__body .tab-row {
  //   // background-color: #3d5cff !important;
  //   color: #909399 !important;
  //   // color: #fff !important;
  //   font-weight: bold !important;
  // }
}
</style>
