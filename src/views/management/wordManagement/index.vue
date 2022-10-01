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
              style="width:100%"
            >
              <el-select
                slot="prepend"
                v-model="selConditions"
                placeholder="请选择"
                style="width:120px"
                @keyup.enter.native="enterClick"
              >
                <el-option
                  v-for="(option,index) in serchOptions"
                  :key="index"
                  :label="option.label"
                  :value="option.prop"
                />
              </el-select>
              <i
                slot="suffix"
                class="el-icon-search"
                @click="serachData"
              ></i>
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
                v-model="modSelOptions"
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
            <el-button
              style="background-color: #3D5CFF;color:#fff;border-radius:10px"
              @click="confirmUpDate"
            >确定</el-button>
          </div>
        </div>

        <div class="word-text-color text-df text-bold">
          <span v-show="checkVal.includes('结果全选')">暂不显示</span>
          <span v-show="!checkVal.includes('结果全选')">已选择{{ selDataIds.length }}</span>
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

    <!-- 导入组件-->
    <import-win
      :value="winExport"
      title="单词导入"
      :params="{}"
      :upload-file-action="uploadFileAction"
      @onCancel="winExport=false"
      @success="success"
    />
  </div>
</template>

<script>
import TableMixin, { PageModelMixin } from '@/mixins/TableMixin'

import domain from './domain/domain'
import modDomain from './domain/modDomain'
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
      selConditions: 'id',
      serchOptions: domain,
      modValue: '',
      modOptions: modDomain,
      modSelOptions: 'word',

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
      queryData: {
        count: 20,
        page: 1
      },

      selDataIds: [],
      checkVal: [],
      // checkList: ['结果全选', '当页全选'],
      checkList: ['当页全选'],
      winExport: false,
      //  uploadFileAction: this.$urlPath.wordImport,
      uploadFileAction: 'http://154.213.21.110/index.php/index/WordSystem/wordImport'
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
      this.$get({
        url: this.$urlPath.getWord,
        data: {
          wordList: 'all',
          ...this.queryData
        }
      }).then((res) => {
        this.handleSuccess(
          {
            data: res.data,
            totalSize: res.per_page
          }
        )
      })
    },
    serachData() {
      let selConditions = 'word_id'
      if (this.selConditions === 'id') {
        selConditions = 'word_id'
      } else {
        selConditions = this.selConditions
      }
      this.$get({
        url: this.$urlPath.getWord,
        data: {
          [selConditions]: this.searchConditions,
          ...this.queryData
        }
      }).then((res) => {
        this.handleSuccess(
          {
            data: res.data,
            totalSize: res.per_page
          }
        )
      })
    },
    checkBoxChange(val) {
      if (val.length > 1) {
        this.checkVal.shift()
      } else if (val.length > 0) {
        if (val.includes('结果全选')) {
          console.log('结果全选')
        }
        if (val.includes('当页全选')) {
          this.selDataIds = this.tableData.map(v => v.id)
        }
      } else {
        this.selDataIds = []
      }
    },
    modClick(data) {
      data.isShow = true
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
      this.tableData.forEach((row, rowIndex) => {
        if (rowIndex === data.rowIndex) {
          row._isEdit = !row._isEdit
        }

        // if (data._columns.text === '编辑' && row._isEdit) {
        //   data._columns.text = '完成编辑'
        //   data._columns.assemblyType = 'danger'
        //   // this.$set(column.template[0], 'text', '完成编辑')
        //   // this.$set(column.template[0], 'assemblyType', 'danger')
        // } else if (data._columns.text === '完成编辑' && !row._isEdit) {
        //   data._columns.text = '编辑'
        //   data._columns.assemblyType = 'primary'
        //   // this.$set(column.template[0], 'text', '编辑')
        //   // this.$set(column.template[0], 'assemblyType', 'primary')
        // }
      })

      if (!data.row._isEdit) {
        this.updateWord({
          word_id: data.row.id,
          ...data.row
        })
      }
    },
    deleteOne(res) {
      this.$showConfirmDialog('确定删除本条数据？').then(() => {
        this.$get({
          url: this.$urlPath.wordDelete,
          data: {
            word_id: res.row.id
          }
        }).then((res) => {
          this.getData()
          this.$successMsg('删除成功！')
        })
      }).catch(() => { })
    },
    enterClick() {
      this.queryData = {
        count: 20,
        page: 1
      }
      this.serachData()
    },
    confirmUpDate() {
      if (this.selDataIds.length === 0) {
        this.$errorMsg('请选择需要修改的数据！')
        return
      }
      this.updateWord({
        'word_id': this.selDataIds.join(','),
        [this.modSelOptions]: this.modValue
      })
    },
    updateWord(data) {
      this.$get({
        url: this.$urlPath.updateWord,
        data
      }).then((res) => {
        this.getData()
        this.$successMsg('更新成功！')
      })
    },
    rowClick({ row, column, event }) {
      this.$set(row, 'checked', !row.checked)
      if (row.checked) {
        this.selDataIds.push(row.id)
      } else {
        this.selDataIds.forEach((data, index) => {
          if (data === row.id) {
            this.selDataIds.splice(index, 1)
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
      this.winExport = false
      this.getData()
    }
  }
}

</script>
<style lang='scss' scoped>
.el-select .el-input {
  width: 130px;
}
::v-deep .el-input__suffix {
  height: 100%;
  width: 25px;
  text-align: center;
  line-height: 40px;
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
