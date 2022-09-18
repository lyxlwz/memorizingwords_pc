const domain = [
  {
    label: 'ID',
    prop: 'word_id'
  },
  {
    label: '单词',
    prop: 'word'
  },
  {
    label: '释义',
    prop: 'paraphrase'
  },
  {
    label: '联想',
    prop: 'connect_in_the_mind'
  },
  {
    label: '单词备注',
    prop: 'group_id'
  },
  {
    label: '首次学习日期',
    prop: 'first_study_date'
  },
  {
    label: '操作',
    width: '165px',
    fixed: 'right',
    headerAlign: 'center',
    alignStyle: 'justify-content: center;',
    template: [
      {
        type: 'link',
        text: '编辑',
        method: 'showDialog',
        addParams: 2
      },
      {
        type: 'link',
        text: '删除',
        method: 'deleteOne',
        addParams: -1
      }
    ]
  }
]

export default domain
