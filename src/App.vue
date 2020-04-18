<template>
  <div id="app" class="app">
    <!-- 视图路由切换-->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}

html,
body {
  height: 100%;
}

.app {
  height: 100%;
  /*overflow: hidden;*/
  /*::-webkit-scrollbar {display:none;}*/
}
</style>
