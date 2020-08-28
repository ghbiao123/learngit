<template>
  <div id="app">
    <head-nav :title="title"></head-nav>
    <div class="content">
      <div class="nav-tit">
        <div class="tit">崖州区实用英语云课堂</div>
        <button class="btn">登录</button>
      </div>

      <div class="video-player"></div>

      <div class="card">
        <div class="title">本节重点</div>
        asdfsd
      </div>

      <div class="card">
        <div class="title">商务对话</div>

        <div class="list" v-for="(item, index) in 5" :key="index">
          <div class="name">第一课</div>
          <div class="time">12:12</div>
          <div class="btn">已学习</div>
        </div>

      </div>




    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "商务对话",
    };
  },
  methods: {},
};
</script>

<style lang='less' scoped>
@rem: 750/10rem;
.content {
  background-color: #f5f5f5;
}
.nav-tit {
  display: flex;
  justify-content: space-between;
  width: 750 / @rem;
  height: 100 / @rem;
  .tit {
    line-height: 100 / @rem;
    text-indent: 20 / @rem;
    font-size: 35 / @rem;
    font-weight: bold;
  }
  .btn {
    margin: 22 / @rem 20 / @rem 0 0;
    width: 134 / @rem;
    height: 54 / @rem;
    border-radius: 27 / @rem;
    border: 1 / @rem solid #6248ea;
    color: #6248ea;
  }
}
.video-player {
  width: 750 / @rem;
  height: 530 / @rem;
}
.card{
  margin-top: 20/@rem;
  padding: 0 20/@rem 20/@rem;
  width: 750/@rem;
  background-color: #fff;
  .title{
    padding: 30/@rem 0 20/@rem;
    line-height: 1.5;
    font-size: 35/@rem;
    font-weight: bold;
    border-bottom: 1/@rem solid #f5f5f5;
  }
}
.list{
  display: flex;
  height: 90/@rem;
  line-height: 90/@rem;
  font-size: 28/@rem;
  text-align: center;
  border-bottom: 1/@rem solid #f5f5f5;
  .name{
    text-align: left;
    width: 410/@rem;
  }
  .time{
    width: 150/@rem;
  }
  .btn{
    margin-top: 20/@rem;
    width: 150/@rem;
    height: 50/@rem;
    line-height: 50/@rem;
    color: #fff;
    background-color: #6248EA;
    border-radius: 25/@rem;
  }
}
.list:last-child{
  border: none;
}
</style>