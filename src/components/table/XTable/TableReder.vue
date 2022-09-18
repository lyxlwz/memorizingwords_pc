<script>
export default {
  functional: true,
  props: {
    row: {
      type: Object,
      required: true
    },
    render: {
      type: Function,
      required: true
    },
    sc: {
      type: Object,
      required: true
    },
    rederStyle: {
      type: String,
      require: true,
      default: ''
    }
  },
  render: (h, ctx) => {
    const arr = []
    const params = {
      row: ctx.props.row,
      index: ctx.props.sc.$index
    }
    const VNode = ctx.props.render(h, params)
    arr.push(VNode)
    return h('div', { class: ctx.props.rederStyle }, arr)
  }
}
</script>
