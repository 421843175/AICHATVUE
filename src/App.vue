<template>
  <div id="app">
    <!-- $route.fullPath 做唯一键 router.push 即便页面相同 传参不同 可以强制组件重建 -->
    <router-view :key="$route.fullPath"/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

}
</style>
