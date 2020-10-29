<template>
  <div class="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){

   
    function remChange(){
      let html = document.getElementsByTagName('html')[0];
      let width = html.getBoundingClientRect().width;
      width = width >= 750 ? 750 : width;
      html.style.fontSize = `${width / 10}px`;
    }
    remChange();
    window.addEventListener('resize', remChange);

  }
}
</script>

<style lang="less">
@rem:750/10rem;
.app {
  position: relative;
  width: 750/@rem;
  max-width: 750/@rem;
  margin: 0 auto;
  overflow: hidden;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.viewer-footer {
    display: none;
  }
</style>
