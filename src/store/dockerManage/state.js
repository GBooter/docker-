export default {
  /** 状态栏state */
  statusBar: {
    containerStopCount: 0, // 容器停止数量
    containerStartCount: 0, // 容器启动数量
    containerPausedCount: 0, // 容器暂停数量
    imagesCount: 0, // 镜像数量
    dockerEvents: [] // docker操作事件记录
  }
}
