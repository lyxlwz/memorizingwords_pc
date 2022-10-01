
import { RefreshActionMixin } from './ActionMixin.js'
const pageEvents = {
  setTotalSize(size) {
    this.pageModel.totalSize = size
  }
}

export const PageModelMixin = {
  mixins: [RefreshActionMixin],
  data() {
    return {
      pageModel: {
        currentPage: 1,
        pageSize: 10,
        totalSize: 0
      }
    }
  },
  methods: {
    pageSizeChanged(pageSize) {
      this.pageModel.pageSize = pageSize
      this.pageModel.currentPage = 1
      this.publishEvent('pageChanged', this.pageModel)
    },
    currentChanged(currentPage) {
      this.pageModel.currentPage = currentPage
      this.publishEvent('pageChanged', this.pageModel)
    },
    withPageInfoData(otherParams = {}) {
      return {
        ...otherParams,
        page: this.pageModel.currentPage,
        pageSize: this.pageModel.pageSize
      }
    }
  },
  created() {
    this.registeEvent(pageEvents)
  }
}

const tableEvents = {
  pageChanged() {
    this.getData()
  }
}

export default {
  data() {
    return {
      tableData: [],
      tableLoading: false
    }
  },
  mounted() {
    this.$on('tableHeightChanged', _ => {
      this.tableConfig.height = this.$refs.tableBody ? this.$refs.tableBody.$el.offsetHeight - 10 - 2 : '100%'
      this.$refs.table && this.$refs.table.doLayout()
    })
  },
  methods: {
    handleSuccess({ data = [], totalSize = 20 }) {
      if (data.length > 0) {
        data.forEach((item, index) => {
          item._isEdit = false
          item.rowIndex = index
          item.checked = false
        })
      }
      this.tableLoading = false
      this.publishEvent('setTotalSize', totalSize)
      this.tableData = data
    }
  },
  created() {
    this.registeEvent(tableEvents)
  }
}
