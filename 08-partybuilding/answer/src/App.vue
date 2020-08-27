<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    // this.$ajax
    //   .post("api/services/servicesList", { status: 0, page: 1 })
    //   .then((res) => {
    //     console.log(res);
    //   });
  },
};
</script>

<style>
.app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
