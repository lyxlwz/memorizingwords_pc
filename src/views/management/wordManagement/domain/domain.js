const domain = [
  {
    label: 'ID',
    prop: 'id',
    template: [{
      type: 'input'
    }]
  },
  {
    label: '单词',
    prop: 'word',
    template: [{
      type: 'input'
    }]
  },
  {
    label: '释义',
    prop: 'paraphrase',
    template: [{
      type: 'input'
    }]
  },
  {
    label: '联想',
    prop: 'connect_in_the_mind',
    template: [{
      type: 'input'
    }]
  },
  {
    label: '单词备注',
    prop: 'group_id',
    template: [{
      type: 'input'
    }]
  },
  {
    label: '首次学习日期',
    prop: 'first_study_date',
    template: [{
      type: 'input'
    }]
  },
  {
    label: '操作',
    alignStyle: 'justify-content: center;',
    template: [
      {
        type: 'link',
        text: '编辑',
        method: 'modClick',
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
