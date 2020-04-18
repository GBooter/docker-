/** 定义插件信息常量 */

// 插件首页
export const PLUGINSHOME_NAME = 'hktools'
export const PLUGINSHOME_PATH = '/'

// Docker管理
export const PLUGINS_DOCKERMANAGE_NAME = 'Docker管理'
export const PLUGINS_DOCKERMANAGE_ICON = 'md-cube'
export const PLUGINS_DOCKERMANAGE_PATH = '/dockerManageIndex'
export const PLUGINS_DOCKERMANAGE_DESC =
  'Docker管理是一款包含容器，镜像，仓库，数据卷，网络等功能的工具，有一定的管理能力，帮助用户方便可视化的操作Docker，更高效的部署开发环境及应用程序！'
export const PLUGINS_DOCKERMANAGE_VERSION = '0.0.1'

export const PLUGINS_DOCKERMANAGE_CHILDREN_ROUTER_NAME = 'Docker容器详细信息'
export const PLUGINS_DOCKERMANAGE_CHILDREN_ROUTER_PATH =
  '/dockerManageIndex/containerInspect'

// 局域快传
export const PLUGINS_LOCALFAST_NAME = '局域快传'
export const PLUGINS_LOCALFAST_ICON = 'ios-paper-plane'
export const PLUGINS_LOCALFAST_PATH = '/localFastIndex'
export const PLUGINS_LOCALFAST_DESC =
  '局域快传是一款帮助用户在本地的多台设备间快速传输文件，做到跨终端高速传输，无需下载其他工具即可快人一步！'
export const PLUGINS_LOCALFAST_VERSION = '0.0.1'

// 暂未开放插件
export const notOpenPlugins = [PLUGINS_LOCALFAST_PATH]
