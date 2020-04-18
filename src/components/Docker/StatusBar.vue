<template>
  <div class="status-bar">
    <Poptip class="status-item" trigger="hover" placement="top-end">
      <Button type="text" size="small" icon="ios-paper">操作日志</Button>
      <div v-if='dockerEvents.length <= 0' slot="content" style="text-align: center">
        暂无操作记录
      </div>
      <div v-if='dockerEvents.length > 0' slot="content">
        <div v-for="(event, index) in dockerEvents" :key="index">
          <Tag v-if="event.time">{{getTime(event.time)}}</Tag>
          <Tag v-if="event.scope">{{event.scope}}</Tag>
          <Tag v-if="event.Type">{{event.Type}}</Tag>
          <Tag v-if="event.Action">{{event.Action}}</Tag>
          <Tag v-if="event.from">{{event.Actor.Attributes.name}}</Tag>
        </div>
      </div>
    </Poptip>
    <Tag class="status-item" color="blue">{{imagesCount}}</Tag>
    <Button class="status-item" type="text" size="small" icon="md-aperture">镜像个数</Button>
    <Tag class="status-item" color="warning">{{containerPausedCount}}</Tag>
    <Tag class="status-item" color="error">{{containerStopCount}}</Tag>
    <Tag class="status-item" color="primary">{{containerStartCount}}</Tag>
    <Button class="status-item" type="text" size="small" icon="md-cube">容器状态</Button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
var moment = require('moment')
export default {
  name: 'StatusBar',
  computed: {
    /** 使用对象展开运算符将带有命名空间的getter 混入 computed 对象中 */
    ...mapGetters('dockerManage', ['containerStopCount', 'containerStartCount', 'containerPausedCount', 'imagesCount', 'dockerEvents'])
  },
  methods: {
    getTime(time) {
      moment.locale('zh-cn')
      return moment.unix(time).format('YYYY年MM月DD日 dddd HH:mm:ss')
    }
  }
}
</script>

<style lang="less" scoped>
  .status-bar {
    border-style: solid;
    border-width: thin;
    border-color: #d7dde4;
    position: fixed;
    width: 100%;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0 0;
    height: 27px;
    background: rgba(255, 255, 255, 1);
    color: #657180;
    white-space: normal;
    z-index: 1;
    transition: height 1s;
  }

  .status-item {
    float: right;
    cursor: pointer;
  }
</style>
