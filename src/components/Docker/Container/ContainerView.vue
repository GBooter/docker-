<template>
  <div>
    <!--容器详情页路由占位符-->
    <router-view v-if="!isViewContainerView"/>
    <div v-if="isViewContainerView">
      <div id="containerViewTopButton">
        <Button shape="circle" icon="md-refresh" @click="getContainers(isButtonRefresh = true)">刷新</Button>
        <Button shape="circle" icon="md-add">创建</Button>
        <Button shape="circle" icon="md-code-working">运行</Button>
        <Button shape="circle" icon="ios-color-filter">过滤</Button>
        <Button shape="circle" icon="md-cloud-upload">导入</Button>
      </div>
      <div id="card-div">
        <Card v-for="container in containers" :key="container.Id" class="container-card">
          <p slot="title" class="container-card-title">
            {{container.Names[0].split('/')[1]}}
            <Tag class="container-state-tag" :color="stateToColor[container.State]">
              {{container.State}}
            </Tag>
          </p>
          <p>
            镜像: {{getImageName(container.Image)}}
            <Tag color="blue">{{getTag(container.Image)}}</Tag>
          </p>
          <p>大小: rw {{formatBytes(container.SizeRw)}}, rootfs {{formatBytes(container.SizeRootFs)}}</p>
          <p>状态: {{container.Status}}</p>
          <p>时间: {{getCreatedTime(container.Created)}}</p>
          <Button type="primary" @click="inspectContainer(container.Id)">详情</Button>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import docker from '../../../js/docker/docker'
import ContainerStateToColor from '../../../js/docker/ContainerStateToColor'
import parseRepoTag from '../../../js/docker/parseRepoTag'
import formatBytes from '../../../js/docker/formatBytes'
import * as constantPlugins from '../../../plugins/constantPlugins'
var moment = require('moment')

export default {
  name: 'ContainerView',
  data () {
    return {
      containers: [],
      stateToColor: ContainerStateToColor,
      isViewContainerView: true
    }
  },
  created() {
    this.getContainers()
  },
  methods: {
    /** 获取容器列表 */
    getContainers (isButtonRefresh = false) {
      var queries = {
        all: true,
        size: true
      }

      const updateContainers = containers => {
        this.containers = containers
        /** 按钮刷新提示信息 */
        if (isButtonRefresh) {
          this.$Notice.success({ title: 'Docker管理', desc: '刷新容器列表成功！' })
        }
      }

      const updateErrored = err => {
        this.containers = []
        this.$Notice.error({ title: 'Docker管理', desc: err })
      }

      docker.listContainers(queries)
        .then(updateContainers)
        .catch(updateErrored)
    },

    /** 获取容器详细信息 */
    inspectContainer (containerId) {
      this.isViewContainerView = false
      this.$router.push({ path: constantPlugins.PLUGINS_DOCKERMANAGE_CHILDREN_ROUTER_PATH, query: { containerId: containerId } })
    },

    /** 格式化容器创建时间 */
    getCreatedTime (time) {
      moment.locale('zh-cn')
      return moment.unix(time).format('YYYY年MM月DD日 dddd HH:mm:ss')
    },

    /** 格式化镜像名称 */
    getImageName (repoTag) {
      return parseRepoTag(repoTag).repository
    },

    /** 格式化镜像标签 */
    getTag (repoTag) {
      if (parseRepoTag(repoTag).tag === undefined) return 'latest'
      return parseRepoTag(repoTag).tag
    },

    /** 格式化容器大小单位 */
    formatBytes
  }
}
</script>

<style lang="less" scoped>
#containerViewTopButton {
  > Button {
    margin-left: 3px;
    margin-right: 3px;
  }
}
#card-div {
  text-align: center;
}

.container-card {
  width: 320px;
  display: inline-block;
  margin: 5px 5px;
  p {
    text-align: left!important;
  }
  Button {
    margin-top: 10px;
  }
}

.container-card-title {
  height: 26px;
}

.container-state-tag {
  position: absolute;
  right: 3px;
}
</style>
