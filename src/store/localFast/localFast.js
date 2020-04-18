import state from './state'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

const localFast = {
  state,
  getters,
  actions,
  mutations,
  namespaced: true // store命名空间
}

export default localFast
