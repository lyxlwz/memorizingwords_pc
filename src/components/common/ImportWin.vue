<template>
  <div class="go-upload-excel-win hidden">
    <el-dialog
      custom-class="dialogClass"
      :title="title"
      :top="'15vh'"
      :visible.sync="value"
      :show-close="false"
      :width="'25%'"
      append-to-body
      @click="closeWin"
    >
      <div
        v-loading="loading"
        :style="{height: 350+'px', overflow:'auto',padding:'0 15px'}"
      >

        <div
          v-show="showExcelUpload"
          class="winBody"
        >
          <el-row
            class="clearfix"
            style="margin-top: 3px;"
          >

            <el-upload
              ref="upload"
              :headers="headers"
              :max-size="maxSize"
              style="width: 100%"
              :accept="'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'"
              :data="posData"
              :multiple="false"
              :show-file-list="false"
              :action="uploadFileAction"
              :format="formateAry"
              :on-progress="handleProgress"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              :on-success="handleSuccess"
              :on-error="handleError"
              type="drag"
              class="upload-demo flex justify-center"
              drag
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>

          </el-row>
          <div class="row-div">
            <slot></slot>
          </div>

          <div
            v-show="errFilePath!=''"
            class="margin-tb"
          >

            <span
              class="text-btn"
              @click="downloadResult"
            >下载导入报告</span>

          </div>
        </div>

      </div>

      <span slot="footer">
        <el-button
          size="small"
          @click="closeWin"
        >取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import UploadFileMixins from '@/mixins/uploadFileMixin'
import { Loading } from 'element-ui'
import Cookies from 'js-cookie'

export default {
  name: 'ImportWin',
  mixins: [UploadFileMixins],
  props: {
    // 下载导出结果的url
    downResultFileAction: { type: String, default: '' },
    // 上传时的参数
    params: {
      type: Object,
      default: () => { }
    },
    // 显示回退表格
    showBackTable: { type: Boolean, default: true },
    // 上传文件的action
    uploadFileAction: {
      type: [Object, String],
      default: () => { }
    },
    // 标题
    title: { type: String, default: '选择导入的Excel' },
    // 是否显示窗口
    value: {
      type: [Object, String, Boolean],
      default: () => { }
    },
    // 是否是系统管理模块的导入
    isSystem: { type: Boolean, default: false },
    isCheck: {
      type: Boolean, default: false
    }
  },
  data() {
    const token = Cookies.get('x-token')
    return {
      bigloading: null,
      loading: false,
      errFilePath: '',
      dialogWinId: '',
      fileName: '',
      showExcelUpload: true,
      headers: {
        'x-token': `${token}`
      },
      posData: {},

      formateAry: ['xls', 'xlsx']
      // winId: GoingUtils.getUUid(10)
    }
  },
  watch: {
    params() {
      // 如果传入的参数发生变化
      this.initPostData()
    },

    va() {
      // 如果传入的参数发生变化
      this.initPostData()
    }
    // 如果为true  则弹出窗口 如果为false 则关闭窗口

  },
  beforeMount() {

  },
  mounted() {
    this.$nextTick(() => {
      this.initPostData()
    })
  },
  methods: {
    initPostData() {
      this.posData = {
        ...this.params
      }
    },
    beforeUpload() {
      this.$refs.upload.clearFiles()
      return true
    },
    // 关闭窗口
    closeWin() {
      this.$emit('onCancel', true)
    },
    handleProgress(event, file, fileList) {
      this.startLoading()

      // 调用监听 上传进度 的事件
      event.target.onprogress = (event) => {
        const uploadPercent = parseFloat(((event.loaded / event.total) * 100).toFixed(2))	// 保留两位小数，具体根据自己需求做更改

        // 手动设置显示上传进度条 以及上传百分比
        if (uploadPercent >= 99) {
          this.endLoading()
        }
      }
    },
    // 处理附件上传成功事件  查重
    handleSuccess(res) {
      if (res.code && res.code === '200') {
        if (res.data && res.data.syncType === '同步') {
          if (this.isSystem) {
            this.$emit('success', res)
            this.$successMsg('导入成功')
          } else {
            if (res.data && res.data.result === '成功') {
              this.$emit('success', res)
              this.$successMsg('导入成功')
            } else {
              if (this.isCheck) {
                this.$emit('getData', res)
              }
              this.$errorMsg('导入失败，请下载导入结果分析报告查看失败原因！')
              // this.errFilePath = SysConfigUtils.niftyUrl + res.data.errFilePath
            }
          }
        } else if (res.data && res.data.syncType === '异步') {
          this.$emit('success')
          this.$infoMsg('当前为异步导入，导入完成后会有消息提示。请收到提示信息后查看数据！')
        }
        this.loading = false

        // //附件上传后的事件
        // return;
      } else {
        this.$errorMsg(res.message)
        if (this.isCheck) {
          this.$emit('getData', res)
        }
        this.loading = false
      }
    },
    startLoading() { // 使用Element loading-start 方法
      this.bigloading = Loading.service({
        lock: false,
        text: '上传中...',
        background: 'rgba(0, 0, 0, 0.3)'

      })
    },
    endLoading() { // 使用Element loading-close 方法
      this.bigloading.close()
    },
    downloadResult() {
      window.open(this.errFilePath)
    },
    // 隐藏窗口
    hideWin() {

    }
  }
}
</script>

<style>
.dialogClass {
  border-radius: 10px !important;
}
</style>
