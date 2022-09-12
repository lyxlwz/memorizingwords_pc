/*
 * 向localStorage中存储数据的工具模块
 * （export表示向外暴露方法）
 */
export default {
  /*
   * 读取数据
   * key：数据对象的key
   */
  readData(key) {
    return JSON.parse(window.localStorage.getItem(key) || '[]')
  },
  /*
   * 保存数据
   * key：数据对象的key
   * data：要保存的数据（对象数组）
   */
  saveData(key, data) {
    window.localStorage.setItem(key, JSON.stringify(data))
  }
}
