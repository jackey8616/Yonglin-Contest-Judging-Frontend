<template>
  <div id="app">
    <img src="./assets/yonglin-logo.png">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
html, body {
  height: 100vh;
}
#app {
  font-family: 'Teko', '黑體-繁', '蘋果儷中體', '微軟正黑體', Microsoft JhengHei, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  height: 100vh;
}

@import '~bootstrap/scss/bootstrap';
</style>
