import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/** vuex动态导入store文件 */
const files = require.context('.', true, /\.js$/)
const moduleStores = {}
files.keys().forEach(key => {
  // 分割字符串
  var file = key.replace(/(\.\/|\.js)/g, '').split('/')
  // 如果文件名称和文件夹名称一致就说明此文件是此文件夹的主文件
  if (file[0] === file[1]) {
    // 生成一个对象与当前文件同名(方便区分)
    const fileModule = files(key).default
    moduleStores[file[0]] = {
      ...fileModule
    }
  }
})

export default new Vuex.Store({
  modules: {
    ...moduleStores
  },
  strict: process.env.NODE_ENV !== 'production'
})
