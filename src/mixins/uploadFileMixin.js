
export default {
  props: {
    // 文件大小
    maxSize: {
      type: Number,
      default: 102400
    },
    // 显示是否可以下载
    showDown: {
      type: Boolean,
      default: false
    },
    // 是否可以多选
    multiple: {
      type: Boolean,
      default: false
    },
    encryption: {
      type: Boolean,
      default: false
    },
    // 显示是否可以预览
    showPreview: {
      type: Boolean,
      default: false
    },
    // 显示是否可以删除
    showDelete: {
      type: Boolean,
      default: true
    },
    relFileId: {
      type: String
      // default: GoingUtils.getUUid(12)
    }
  },
  computed: {
    uploadActionBySingle() {
      // return this.encryption ? SysConfigUtils.go_eplat_adress + '/go-framework/documentEncrypt/upload' : SysConfigUtils.go_eplat_adress + '/go-framework/document/uploadFileBySingle'
    },
    uploadAction() {
      // return this.encryption ? SysConfigUtils.go_eplat_adress + '/go-framework/documentEncrypt/upload' : SysConfigUtils.go_eplat_adress + '/go-framework/document/uploadFile'
    }
  },
  methods: {
    handleError(err, file, fileList) {
      this.$warningMsg('上传失败')
      this.loading = false
    },
    handleFormatError(file) {
      this.loading = false
      this.$warningMsg('上传文件【' +
        file.name +
        '】类型不正确，允许的上传类型为【' +
        this.getUploadFormat().join(';') +
        '】')
    },
    handleMaxSize(file) {
      this.loading = false
      this.$warningMsg('上传文件【' +
        file.name +
        '】太大，最大文件大小为【' +
        Math.ceil(this.maxSize / 1024) +
        'MB】')
    },
    // 下载附件的链接地址
    downFileUrl({ id }) {
      // const downUrl = this.encryption ? SysConfigUtils.go_eplat_adress + '/go-framework/documentEncrypt_download?documentId=' : SysConfigUtils.go_eplat_adress + '/go-framework/document_download?documentId='
      // return `${downUrl}${id}`
    },
    // 预览附件
    previewAttachment() {
      this.$warningMsg('正在开发中')
    },
    // 处理数据
    dealFile(file) {
      if (file && Object.keys(file).length) {
        this.file = file
        this.fileObj.fileIds = [file.id]
        this.fileObj.fileNames = [file.name]
        this.$emit('input', file.name)
        this.$emit('backFun', {
          ids: this.fileObj.fileIds.join(';'),
          names: this.fileObj.fileNames.join(';')
        })
      } else {
        this.file = {
          id: '',
          name: ''
        }
        this.fileObj = {
          fileNames: [],
          fileIds: []
        }
        this.$emit('input', '')
        this.$emit('backFun', { ids: '', names: '' })
      }
    }
  }
}
