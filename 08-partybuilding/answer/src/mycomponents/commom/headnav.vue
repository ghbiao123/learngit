<template>
  <div class="app">
    <div class="nav">
      <div class="goback" @click="goBack">
        <img :hidden='hideGoBack' src="../../../static/images/lt.png" alt="">
      </div>
      <div class="txt e-t">{{title}}</div>
      <div class="menu"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newData: 'test'
    }
  },
  props: ['title', 'hideGoBack'],
  created(){
    
  },
  methods: {
    goBack(){
      
      if(this.hideGoBack) return;
      this.$router.go(-1);
    }
  }
}
</script>

<style lang='less' scoped>
  @rem:750/10rem;
  .app{
    width: 750/@rem;
    height: 128/@rem;
    .nav{
      position: fixed;
      top: 0;
      left: 0;
      z-index: 9999;
      display: flex;
      width: 750/@rem;
      height: 128/@rem;
      text-align: center;
      background-color: #fff;
      .goback{
        width: 120/@rem;
        height: 128/@rem;
        img{
          margin-top: 49/@rem;
          width: 30/@rem;
          height: 30/@rem;
        }
      }
      .txt{
        width: 510/@rem;
        height: 128/@rem;
        line-height: 128/@rem;
        font-size: 32/@rem;
        font-weight: bold;
      }
      .menu{
        width: 120/@rem;
      }
    }
  }
</style>