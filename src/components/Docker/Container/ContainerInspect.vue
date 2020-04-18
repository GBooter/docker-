<template>
  <div>
    <div id="containerInspectTopButton">
      <Button
        shape="circle"
        icon="md-refresh"
        @click="getContainerInspect(isButtonRefresh = true)"
      >刷新</Button>
      <Button shape="circle" @click="startContainer">启动</Button>
      <Button shape="circle" @click="stopContainer">停止</Button>
      <Button shape="circle" @click="pausedContainer">暂停</Button>
      <Button shape="circle" @click="unpausedContainer">恢复</Button>
      <Button shape="circle" @click="restartContainer">重启</Button>
      <Button shape="circle" @click="killContainer">杀死</Button>
      <Button shape="circle" @click="logContainer">日志</Button>
      <Button shape="circle" @click="containerRenameModal = true">重命名</Button>
      <Modal
        :mask-closable="false"
        v-model="containerRenameModal"
        title="容器重命名"
        @on-ok="renameContainer"
      >
        <Input v-model="containerNewName" placeholder="容器新名称" />
      </Modal>
      <Button shape="circle" @click="removeContainerModal = true">删除</Button>
      <Modal
        :mask-closable="false"
        v-model="removeContainerModal"
        title="容器删除"
        @on-ok="removeContainer"
      >
        删除与容器关联的卷:
        <i-switch v-model="rmcParams.v" size="large">
          <span slot="open">True</span>
          <span slot="close">False</span>
        </i-switch>
        <br />是否强制删除:
        <i-switch v-model="rmcParams.force" size="large">
          <span slot="open">True</span>
          <span slot="close">False</span>
        </i-switch>
        <br />删除与容器关联的指定链接:
        <i-switch v-model="rmcParams.link" size="large">
          <span slot="open">True</span>
          <span slot="close">False</span>
        </i-switch>
      </Modal>
      <Button shape="circle">进程</Button>
      <Button shape="circle">交互</Button>
      <Button shape="circle">导出</Button>
      <Tag class="container-state-tag" :color="stateToColor[containerState]">{{containerState}}</Tag>
    </div>
    <JsonView :data="containerInspect" />
  </div>
</template>

<script>
import ContainerStateToColor from '../../../js/docker/ContainerStateToColor'
import { mapGetters } from 'vuex'
import docker from '../../../js/docker/docker'
// import { ipcRenderer } from 'electron'
// import * as constantIPC from '../../../js/constantIPC'
// import { tarFileSaveInit } from '../../../js/setIPCRenderer'
// var fs = require('fs')

export default {
  name: 'ContainerInspect',
  data() {
    return {
      container: Object,
      containerInspect: [],
      containerState: 'exited',
      containerName: '',
      containerId: '',
      stateToColor: ContainerStateToColor,
      /** 重命名对话框相关属性 */
      containerRenameModal: false,
      containerNewName: '',
      /** 删除容器对话框相关属性 */
      removeContainerModal: false,
      rmcParams: {
        v: false,
        force: false,
        link: false
      }
    }
  },
  computed: {
    ...mapGetters('dockerManage', ['dockerEvents'])
  },
  created() {
    /** 获取容器对象 */
    this.containerId = this.$route.query.containerId
    this.container = docker.getContainer(this.$route.query.containerId)
    this.getContainerInspect()
  },
  watch: {
    /** 通过监控docker事件的改变来更新数据 */
    dockerEvents: function() {
      this.getContainerInspect()
    }
  },
  methods: {
    /** 获取容器详细信息 */
    getContainerInspect(isButtonRefresh = false) {
      var queries = {
        size: true
      }

      const containerInspect = data => {
        this.containerState = data.State.Status
        this.containerName = data.Name.split('/')[1]
        /** 设置重命名对话框的值为容器名称 */
        this.containerNewName = this.containerName
        this.containerInspect = {
          HK工具箱: '容器 ' + data.Name.split('/')[1] + ' 的详细信息',
          containerInspect: data
        }

        /** 按钮刷新提示信息 */
        if (isButtonRefresh) {
          this.$Notice.success({ title: 'Docker管理', desc: '刷新容器成功！' })
        }
      }

      const containerInspectErrored = err => {
        this.$Notice.error({ title: 'Docker管理', desc: err })
      }

      this.container
        .inspect(queries)
        .then(containerInspect)
        .catch(containerInspectErrored)
    },

    /** 启动容器 */
    startContainer() {
      const containerStart = data => {
        this.$Notice.success({
          title: 'Docker管理',
          desc: '容器 ' + this.containerName + ' 启动成功！'
        })
      }

      const containerStartError = err => {
        this.$Notice.error({ title: 'Docker管理', desc: err })
      }

      this.container
        .start()
        .then(containerStart)
        .catch(containerStartError)
    },

    /** 停止容器 */
    stopContainer() {
      const containerStop = data => {
        this.$Notice.success({
          title: 'Docker管理',
          desc: '容器 ' + this.containerName + ' 停止成功！'
        })
      }

      const containerStopError = err => {
        this.$Notice.error({ title: 'Docker管理', desc: err })
      }

      this.container
        .stop()
        .then(containerStop)
        .catch(containerStopError)
    },

    /** 暂停容器 */
    pausedContainer() {
      const containerPause = data => {
        this.$Notice.success({
          title: 'Docker管理',
          desc: '容器 ' + this.containerName + ' 暂停成功！'
        })
      }

      const containerPauseError = err => {
        this.$Notice.error({ title: 'Docker管理', desc: err })
      }

      this.container
        .pause()
        .then(containerPause)
        .catch(containerPauseError)
    },

    /** 恢复容器 */
    unpausedContainer() {
      const containerUnpause = data => {
        this.$Notice.success({
          title: 'Docker管理',
          desc: '容器 ' + this.containerName + ' 恢复成功！'
        })
      }

      const containerUnpauseError = err => {
        this.$Notice.error({ title: 'Docker管理', desc: err })
      }

      this.container
        .unpause()
        .then(containerUnpause)
        .catch(containerUnpauseError)
    },

    /** 重启容器 */
    restartContainer() {
      const containerRestart = data => {
        this.$Notice.success({
          title: 'Docker管理',
          desc: '容器 ' + this.containerName + ' 重启成功！'
        })
      }

      const containerRestartError = err => {
        this.$Notice.error({ title: 'Docker管理', desc: err })
      }

      this.container
        .restart()
        .then(containerRestart)
        .catch(containerRestartError)
    },

    /** 杀死容器 */
    killContainer() {
      const containerKill = data => {
        this.$Notice.success({
          title: 'Docker管理',
          desc: '容器 ' + this.containerName + ' 杀死成功！'
        })
      }

      const containerKillError = err => {
        this.$Notice.error({ title: 'Docker管理', desc: err })
      }

      this.container
        .kill()
        .then(containerKill)
        .catch(containerKillError)
    },

    /** 日志容器 */
    logContainer() {
      // TODO：(容器日志查看功能未完成)
      this.$Notice.error({ title: 'Docker管理', desc: '此功能暂未开启！' })
      // const logOpts = {
      //   follow: true,
      //   stdout: true,
      //   stderr: true
      //   // tail: 20
      // }
      //
      // const containerLogs = data => {
      //   data.setEncoding('utf8')
      //   data.on('data', logs => {
      //     console.log('---- \n')
      //     console.log(logs)
      //   })
      //   data.on('end', end => {
      //     console.log(end)
      //   })
      // }
      //
      // const containerLogsError = err => {
      //   this.$Notice.error({ title: 'Docker管理', desc: err })
      // }
      //
      // this.container.logs(logOpts)
      //   .then(containerLogs)
      //   .catch(containerLogsError)
    },

    /** 容器重命名 */
    renameContainer() {
      var renameParams = {
        name: this.containerNewName
      }

      const containerRename = data => {
        this.$Notice.success({
          title: 'Docker管理',
          desc:
            '容器 ' +
            this.containerName +
            ' 重命名成功！新名称为：' +
            this.containerNewName
        })
      }

      const containerRenameError = err => {
        this.$Notice.error({ title: 'Docker管理', desc: err })
      }

      this.container
        .rename(renameParams)
        .then(containerRename)
        .catch(containerRenameError)
    },

    /** 容器删除 */
    removeContainer() {
      const containerRemove = data => {
        this.$Notice.success({
          title: 'Docker管理',
          desc: '容器 ' + this.containerName + ' 删除成功！'
        })
      }

      const containerRemoveError = err => {
        this.$Notice.error({ title: 'Docker管理', desc: err })
      }

      this.container
        .remove(this.rmcParams)
        .then(containerRemove)
        .catch(containerRemoveError)
    }

    /** 容器进程 */
    // TODO：(容器进程功能未完成)

    /** 容器交互 */
    // TODO：(容器交互功能未完成)

    /** 容器导出 */
    // TODO：(容器导出功能未完成)
    // exportContainer () {
    //   var fileName = `hktools_${this.containerName}_${this.containerId}.tar`

    //   ipcRenderer.send(constantIPC.IPC_CHANNEL_OPEN_SAVE_DIALOG, fileName)

    //   const containerExport = stream => {
    //     var writeStream = fs.createWriteStream(fileName)

    //     stream.pipe(writeStream)

    //     stream.on(streamConstants.STREAM_READABLE_EVENT_END, () => {
    //       this.$Notice.success({ title: 'Docker管理', desc: '容器 ' + this.containerName + ' 已被导出为tar文件！' })
    //     })
    //   }

    //   const containerExportError = err => {
    //     this.$Notice.error({ title: 'Docker管理', desc: err })
    //   }

    //   const saveFile = (error, data) => {
    //     if (!error) {
    //       fileName = data
    //       this.container.export()
    //         .then(containerExport)
    //         .catch(containerExportError)
    //     } else {
    //       this.$Notice.error({ title: 'Docker管理', desc: error })
    //     }
    //   }
    //   tarFileSaveInit(saveFile)
    // }
  }
}
</script>

<style lang="less" scoped>
.container-state-tag {
  position: absolute;
  right: 8px;
}

#containerInspectTopButton {
  > button {
    margin-left: 3px;
    margin-right: 3px;
  }
}
</style>
