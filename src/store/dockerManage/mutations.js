import * as mutationsType from './mutationsType'

export default {
  [mutationsType.UPDATE_CONTAINER_STATE_INFO] (state, payload) {
    state.statusBar.containerStopCount = payload.containerStopCount
    state.statusBar.containerStartCount = payload.containerStartCount
    state.statusBar.containerPausedCount = payload.containerPausedCount
    state.statusBar.imagesCount = payload.imagesCount
  },

  [mutationsType.UPDATE_DOCKER_EVENT_INFO] (state, events) {
    // 限制events事件显示数量
    while (state.statusBar.dockerEvents.length > 15) {
      state.statusBar.dockerEvents.shift()
    }
    // 当数组中存在相同数据则不添加
    // TODO:(临时解决进多少次docker页面执行某个操作导致dockerEvents重复多少次的问题)
    if (!JSON.stringify(state.statusBar.dockerEvents).includes(JSON.stringify(events))) {
      state.statusBar.dockerEvents.push(events)
    }
  }
}
