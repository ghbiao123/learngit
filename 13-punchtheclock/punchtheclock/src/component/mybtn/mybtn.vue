<template>
  <div id="app">
    <button @mousedown="touchstart" @mouseup="touchend" @touchstart="touchstart" @touchend="touchend" :class="{btnhover: btnHover}" class="btn">{{title}}</button>
  </div>
</template>

<script>
export default {
  props: ["title"],
  data() {
    return {
      //
      btnHover: false
    }
  },
  methods: {
    touchstart(){
      this.btnHover = true;
    },
    touchend(){
      this.btnHover = false;

    }
  }
}
</script>

<style lang='less' scoped>
  @rem: 750/10rem;
  .btn{
    display: block;
    margin: 20/@rem auto 0;
    padding: 0;
    width: 640/@rem;
    height: 84/@rem;
    line-height: 84/@rem;
    background-color: #FA2D2D;
    color: #fff;
    font-size: 30/@rem;
    outline: none;
    border: none;
    border-radius: 10/@rem;
  }
  .btnhover{
    background-color:  #fd5252;
  }
</style>