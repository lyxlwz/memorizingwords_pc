
const state = {
  wordId: '',
  wordList: []
}

const getters = {

}

const actions = {

}

const mutations = {
  // 储存单词list
  setWordList(state, data) {
    if (data) {
      state.wordList = data
      window.sessionStorage.setItem('wordList', JSON.stringify(state.wordList))
    }
  },
  // 储存单词id
  setWordId(state, data) {
    if (data) {
      state.wordId = data
      window.sessionStorage.setItem('wordId', JSON.stringify(state.wordId))
    }
  },
  // 清空单词list
  emptyWordList(state) {
    state.wordList = []
    window.sessionStorage.removeItem('wordList')
  },
  // 清空单词id
  emptyWorId(state) {
    state.wordId = ''
    window.sessionStorage.removeItem('wordId')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
