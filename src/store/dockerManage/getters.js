export default {
  containerStopCount: state => state.statusBar.containerStopCount,
  containerStartCount: state => state.statusBar.containerStartCount,
  containerPausedCount: state => state.statusBar.containerPausedCount,
  imagesCount: state => state.statusBar.imagesCount,
  dockerEvents: state => state.statusBar.dockerEvents
}
