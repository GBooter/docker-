import Vue from 'vue'
import router from '../router'
import JsonView from '../components/jsonView/index'
import 'view-design/dist/styles/iview.css'
import { Button, LoadingBar, Card, Tooltip, Icon, Notice, Tabs, TabPane, Tag, Poptip, Modal, Input, Switch } from 'view-design'

/** 注册第三方UI组件 */
Vue.component('JsonView', JsonView)
// Vue.use(jsonView)
Vue.component('Button', Button)
Vue.component('Card', Card)
Vue.component('Tooltip', Tooltip)
Vue.component('Icon', Icon)
Vue.component('Tabs', Tabs)
Vue.component('TabPane', TabPane)
Vue.component('Tag', Tag)
Vue.component('Poptip', Poptip)
Vue.component('Modal', Modal)
Vue.component('Input', Input)
Vue.component('i-switch', Switch)

/** 使用加载进度条特效 */
router.beforeEach((to, from, next) => {
  LoadingBar.start()
  next()
})

router.afterEach(route => {
  LoadingBar.finish()
})

/** 配置iview的Notice组件全局配置 */
Vue.prototype.$Notice = Notice
Vue.prototype.$Notice.config({
  top: 60, // 离顶部距离
  duration: 5 // 延时
})
