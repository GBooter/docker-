import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/** 导入iview配置文件 */
import './plugins/viewsComponents'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
