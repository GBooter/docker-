<template>
  <div id="tabsAndTabPane">
    <Tabs @on-click="selectFunction">
      <TabPane label="容器" icon="md-cube">
        <div class="tabPaneContent">
          <ContainerView :key="tabsKey.containerKey" />
        </div>
      </TabPane>
      <TabPane label="镜像" icon="md-aperture">镜像</TabPane>
      <TabPane label="仓库" icon="ios-home">仓库</TabPane>
      <TabPane label="网络" icon="md-git-network">网络</TabPane>
      <TabPane label="数据卷" icon="logo-buffer">数据卷</TabPane>
      <TabPane label="设置" icon="ios-cog">设置</TabPane>
    </Tabs>
    <!--Docker管理底部状态栏-->
    <StatusBar />
  </div>
</template>

<script>
import * as mutationsType from '../../store/dockerManage/mutationsType'
import docker from '../../js/docker/docker'
const StatusBar = () => import('./StatusBar')
const ContainerView = () => import('./Container/ContainerView')

export default {
  name: 'DockerIndex',
  components: {
    StatusBar,
    ContainerView
  },
  data() {
    return {
      // 标签栏功能刷新(利用vue的key特性)
      tabsKey: {
        containerKey: 0,
        imageKey: 0,
        dockerHubKey: 0,
        networkKey: 0,
        volumeKey: 0,
        settingKey: 0
      }
    }
  },
  created() {
    this.getStatusBarData()
    this.getDockerEvents()
  },
  methods: {
    /** 实现功能页面刷新 */
    selectFunction(tabsIndex) {
      switch (tabsIndex) {
        case 0:
          ++this.tabsKey.containerKey
          break
        case 1:
          ++this.tabsKey.imageKey
          break
        case 2:
          ++this.tabsKey.dockerHubKey
          break
        case 3:
          ++this.tabsKey.networkKey
          break
        case 4:
          ++this.tabsKey.volumeKey
          break
        case 5:
          ++this.tabsKey.settingKey
          break
        default:
          console.log('default')
          break
      }
    },

    /** 获取docker事件 */
    getDockerEvents() {
      docker.getEvents(undefined, undefined).then(events => {
        events.setEncoding('utf8')
        events.on('data', data => {
          this.$store.dispatch(
            'dockerManage/' + mutationsType.UPDATE_DOCKER_EVENT_INFO,
            data
          )
          this.getStatusBarData()
          /** 删除容器刷新组件实现退出容器详细页 */
          if (
            JSON.parse(data).Type === 'container' &&
            JSON.parse(data).Action === 'destroy'
          ) {
            this.updateComponents()
          }
        })
      })
    },

    /** 获取底部状态栏数据 */
    getStatusBarData() {
      this.$store.dispatch(
        'dockerManage/' + mutationsType.UPDATE_CONTAINER_STATE_INFO
      )
    },

    /** 更新组件 */
    updateComponents() {
      /** 刷新组件 */
      ++this.tabsKey.containerKey
      ++this.tabsKey.imageKey
      ++this.tabsKey.dockerHubKey
      ++this.tabsKey.networkKey
      ++this.tabsKey.volumeKey
      ++this.tabsKey.settingKey
    }
  }
}
</script>

<style lang="less" scoped>
#tabsAndTabPane {
  /*样式穿透*/

  /deep/ .ivu-tabs-bar {
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 1;
    background-color: white;
  }
}

.tabPaneContent {
  margin-top: 40px;
}
</style>
