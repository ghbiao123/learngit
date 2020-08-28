<template>
  <div id="app">
    <head-nav :hideGoBack="true" title="首页"></head-nav>
    <div class="content">
      <div class="nav-tit">
        <div class="tit">崖州区实用英语云课堂</div>
        <button class="btn">登录</button>
      </div>
      <div class="swiper">
        <mt-swipe class="mt-swiper" :speed="500" :show-indicators="false">
          <mt-swipe-item class="mt-swiper-item">
            <img class="mt-swiper-item-img" src="../../static/images/a.png" alt />
          </mt-swipe-item>
          <mt-swipe-item>
            <img class="mt-swiper-item-img" src="../../static/images/a.png" alt />
          </mt-swipe-item>
          <mt-swipe-item>
            <img class="mt-swiper-item-img" src="../../static/images/a.png" alt />
          </mt-swipe-item>
        </mt-swipe>
      </div>

      <!-- video -->

      <div class="video-player">
        <video src="../../static/video/test.mp4" controls class="video"></video>
      </div>

      <!-- course list -->
      <div class="course">
        <div class="title">
          <div class="title-name">课程列表</div>
        </div>
        <div v-for="(item, index) in list" :key="index">
          <router-link :to="{name: 'course'}">
            <div class="list">
              <div class="name">第一课</div>
              <img src="../../static/images/rt.png" alt class="icon" />
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [1, 2, 3, 4],
    };
  },
  methods: {},
};
</script>

<style lang='less' scoped>
@rem: 750/10rem;
#app {
  .content {
    height: 100%;
    background-color: #f5f5f5;
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
    .swiper {
      width: 750 / @rem;
      height: 340 / @rem;
      img {
        width: 750 / @rem;
        height: 340 / @rem;
      }
      // .mt-swiper{
      //   .mt-swiper-item{
      //     .mt-swiper-item-img{
      //       width: 750/@rem;
      //       height: 340/@rem;
      //     }
      //   }
      // }
    }
    .video-player {
      margin: 20 / @rem auto;
      width: 710 / @rem;
      height: 400 / @rem;
      background-color: #fff;
      .video {
        width: 710 / @rem;
        height: 400 / @rem;
      }
    }
    .course {
      margin: 20 / @rem auto 0;
      padding: 0 20 / @rem;
      width: 750 / @rem;
      height: auto;
      background-color: #fff;
      .title {
        height: 90 / @rem;
        overflow: hidden;
        border-bottom: 1 / @rem solid #f5f5f5;
        .title-name {
          margin-top: 30 / @rem;
          font-size: 32rpx;
          text-indent: 20 / @rem;
          border-left: 6 / @rem solid #6248ea;
        }
      }
      .list {
        display: flex;
        justify-content: space-between;
        height: 90 / @rem;
        line-height: 90 / @rem;
        font-size: 28 / @rem;
        border-bottom: 1 / @rem solid #f5f5f5;
        .name {
          text-indent: 26 / @rem;
        }
        .icon {
          margin-top: 30 / @rem;
          width: 30 / @rem;
          height: 30 / @rem;
        }
      }
      .list:last-child {
        border: none;
      }
    }
  }
}
</style>