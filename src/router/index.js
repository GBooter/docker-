import Vue from 'vue'
import VueRouter from 'vue-router'

/** 导入插件常量模块 */
import * as constantPlugins from '../plugins/constantPlugins'

/** 按需导入组件(避免应用开启所有组件一并加载，这样可以保证启动那个功能就加载对应组件) */
const PluginsHome = () => import('../components/PluginsHome')

/** 自动化导入路由 */
const files = require.context('.', false, /\.js$/)
const pluginsRouter = []
files.keys().forEach(key => {
  if (key === './index.js') return
  pluginsRouter.push(...files(key).default)
})

Vue.use(VueRouter)
const routes = [
  {
    path: constantPlugins.PLUGINSHOME_PATH,
    name: constantPlugins.PLUGINSHOME_NAME,
    component: PluginsHome,
    children: [
      ...pluginsRouter
    ]
  },
  {
    path: '*',
    redirect: '/'
  }
]

/** 重写路由的push方法(解决Navigating to current location (XXX) is not allowed"的问题) */
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}

const router = new VueRouter({
  routes
})

export default router
