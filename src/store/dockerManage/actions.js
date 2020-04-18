import * as mutationsType from './mutationsType'
import docker from '../../js/docker/docker'

export default {
  /** 实现docker管理底部状态栏信息更新 */
  [mutationsType.UPDATE_CONTAINER_STATE_INFO]({ commit }) {
    var containerStopCount = 0
    var containerStartCount = 0
    var containerPausedCount = 0
    var imagesCount = 0

    const updateDockerInfo = dockerInfo => {
      containerStopCount = dockerInfo.ContainersStopped
      containerStartCount = dockerInfo.ContainersRunning
      containerPausedCount = dockerInfo.ContainersPaused
      imagesCount = dockerInfo.Images

      // 提交数据到mutations更新state数据
      commit(mutationsType.UPDATE_CONTAINER_STATE_INFO, {
        containerStopCount,
        containerStartCount,
        containerPausedCount,
        imagesCount
      })
    }

    // 获取docker信息
    docker.info(undefined)
      .then(updateDockerInfo)
  },

  /** 更新docker事件显示 */
  [mutationsType.UPDATE_DOCKER_EVENT_INFO] ({ commit }, events) {
    commit(mutationsType.UPDATE_DOCKER_EVENT_INFO, JSON.parse(events))
  }
}
