// 持久化route
const saveRouteParams = (that) => {
  if (JSON.stringify(that.$route.params) !== '{}') {
    window.localStorage.setItem('params', JSON.stringify(that.$route.params))
  } else {
    const params = window.localStorage.getItem('params')
    const josn = JSON.parse(params)
    for (const key in josn) {
      that.$route.params[key] = josn[key]
    }
  }
}

export default saveRouteParams
