<template>
  <div id="app" :style="{height: screeHeight+'px'}">
    <head-nav title="个人资料" bgColor="#fff" titleColor="#333" :isBack="true"></head-nav>

    <div class="content">
      <div class="list" v-for="(item, index) in [1,2,3,4]" :key="index">
        <div class="name">姓名</div>
        <div class="value">姓名</div>
      </div>
    </div>
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
    background-color: #f5f5f5;
    color: #333;
    .content{
      margin-top: 20/@rem;
      width: 710/@rem;
      padding: 0 20/@rem;
      background-color: #fff;
      .list{
        display: flex;
        justify-content: space-between;
        line-height: 90/@rem;
        height: 90/@rem;
        border-bottom: 1/@rem solid #f5f5f5;
        font-size: 28/@rem;
        .name{
          color: #666666;
        }
        .value{
          color: #333;
        }
      }
    }
  }
</style>