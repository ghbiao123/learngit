<template>
  <div id="app" :style="{height: screeHeight+'px'}">
   <head-nav title="活动倒计时" bgColor="#282828" titleColor="#fff" :isBack="false"></head-nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //
      screeHeight: window.innerHeight
    }
  },
  methods: {}
}
</script>

<style lang='less' scoped>
  @rem: 750/10rem;
  #app{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #282828;
  }
</style>