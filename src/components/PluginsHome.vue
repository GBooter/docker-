<template>
  <div>
    <!--跳转插件的路由占位符-->
    <router-view v-show="isOpenPlugin"/>
    <!--跳转插件首页按钮-->
    <Button id="goPluginsHome" v-if="isOpenPlugin" size="large" icon="ios-home" type="primary" shape="circle" @click="goPluginsHome"/>
    <div v-show="!isOpenPlugin" id="pluginsContainer">
      <div id="pluginsTitle">插件中心</div>
      <div id="pluginsCardContainer">
        <Card v-for="plugin in plugins" :key="plugin.name" class="plugins-card">
          <p slot="title" class="plugins-card-title">
            <Icon style="font-size: 45px;color: #409EFF" :type="plugin.icon"/>
          </p>
          <p style="text-align: left">名称：{{plugin.name}}</p>
          <p style="text-align: left">版本：{{plugin.version}}</p>
          <Tooltip style="text-align: left;margin-bottom: 16px" id="tooltip" max-width="265" :content="plugin.desc" placement="top">
            <p>描述：{{plugin.desc.substring(0,15)}}...</p>
          </Tooltip>
          <Button type="primary" @click="openPlugin(plugin.path)">使用</Button>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import * as constantPlugins from '../plugins/constantPlugins'

export default {
  name: 'PluginsHome',
  data () {
    return {
      /** 显示插件内容并隐蔽插件中心首页 */
      isOpenPlugin: false,
      /** 插件列表 */
      plugins: [
        {
          name: constantPlugins.PLUGINS_DOCKERMANAGE_NAME,
          icon: constantPlugins.PLUGINS_DOCKERMANAGE_ICON,
          version: constantPlugins.PLUGINS_DOCKERMANAGE_VERSION,
          path: constantPlugins.PLUGINS_DOCKERMANAGE_PATH,
          desc: constantPlugins.PLUGINS_DOCKERMANAGE_DESC
        },
        {
          name: constantPlugins.PLUGINS_LOCALFAST_NAME,
          icon: constantPlugins.PLUGINS_LOCALFAST_ICON,
          version: constantPlugins.PLUGINS_LOCALFAST_VERSION,
          path: constantPlugins.PLUGINS_LOCALFAST_PATH,
          desc: constantPlugins.PLUGINS_LOCALFAST_DESC
        }
      ]
    }
  },
  watch: {
    /** 当路由为插件首页路由则显示插件卡片，否则隐藏 */
    '$route.path': function (path) {
      this.isOpenPlugin = path !== constantPlugins.PLUGINSHOME_PATH
    }
  },
  methods: {
    /** 打开插件 */
    openPlugin(pluginPath) {
      // 如果插件未开放插件提示用户
      if (constantPlugins.notOpenPlugins.includes(pluginPath)) {
        this.$Notice.warning({
          title: 'HK工具箱',
          desc: '此插件暂未开放，敬请期待！'
        })
      } else {
        this.$router.push(pluginPath)
      }
    },

    /** 回到插件中心首页 */
    goPluginsHome () {
      this.$router.push(constantPlugins.PLUGINSHOME_PATH)
    }
  }
}
</script>

<style lang="less">
  #pluginsTitle {
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 1;
    background-color: #409EFF;
    color: white;
    font-size: 25px;
    font-weight: bold;
    text-align: center;
    line-height: 45px;
    height: 45px;
  }

  #pluginsCardContainer {
    margin-top: 45px;
    text-align: center;
  }

  .plugins-card {
    width: 300px;
    display: inline-block;
    margin: 10px 10px;
  }

  .plugins-card-title {
    height: 45px !important;
  }

  #tooltip {
    display: block;
  }

  #goPluginsHome {
    position: fixed;
    right: 60px;
    bottom: 60px;
  }
</style>
