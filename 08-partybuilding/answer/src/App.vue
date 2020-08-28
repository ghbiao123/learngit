<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    remChange();

    window.addEventListener("resize", remChange);

    function remChange() {
      var html = document.getElementsByTagName("html")[0];
      var width = html.getBoundingClientRect().width;
      if (width >= 750) {
        width = 750;
      }
      html.style.fontSize = width / 10 + "px";
    }
  },
};
</script>

<style>
  .app{
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #000;
  }

</style>
