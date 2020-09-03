<template>
  <div id="app">
    <head-nav :hideGoBack="true" title="首页"></head-nav>
    <div class="content">
      <div class="nav-tit">
        <div class="tit">崖州区实用英语云课堂</div>
        <router-link :to="{name:'register', }">
          <button v-if="!isLogin"  class="btn">登录</button>
        </router-link>
        <button v-if="isLogin" @click="logout" class="btn">退出</button>
      </div>
      <div class="swiper">
        <mt-swipe class="mt-swiper" :speed="500" :show-indicators="false">
          <mt-swipe-item class="mt-swiper-item" v-for="(item, index) in swiperSrc" :key='index'>
            <img class="mt-swiper-item-img" :src="item" alt />
          </mt-swipe-item>
        </mt-swipe>
      </div>

      <!-- video -->

      <!-- <div class="video-player"  @click="videoPlayer">
        <video preload='auto' ref="video" :poster="videoData.poster" :src="videoData.src"  class="video"></video>
        <img src="../../static/images/stop.png" :hidden="videoData.state==1? true: false" class="video-icon" alt="">
        <div class="control">
          <div>{{videoData.name}}</div>
          <div>{{videoData.leftTime}}</div>
        </div>
      </div> -->

      <!-- course list -->
      <div class="course">
        <div class="title">
          <div class="title-name">课程列表</div>
        </div>
        <div v-for="(item, index) in crouseList" :key="index">
            <div class="list" @click="toggleContent(index)">
              <div class="name">{{item.name}}</div>
              <img src="../../static/images/rt.png" alt :class="showContent[index]? 'icon-rotate icon':'icon'" />
            </div>
            <div class="list-cont" v-if="showContent[index]">
              <div class="list" v-for="(itm, idx) in item.data" :key="idx">
                <router-link :to="{name: 'course', query:{id: itm.id, title: itm.name}}">
                  <div class="name">{{itm.name}}</div>
                </router-link>
                  <!-- <div class="time">{{item.duration}}</div> -->
                  <div v-if="itm.status==1?true:false" class="btn btn-s">已学习</div>
                  <div v-if="itm.status==2?true:false" class="btn">未学习</div>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import func from '../../vue-temp/vue-editor-bridge';
import site from '../../config/program.config';
import { Toast } from 'mint-ui';

export default {
  data() {
    return {
      crouseList: [],
      swiperSrc:[],
      videoData:{
        src: '',
        name: '',
        currentTime:0,
        leftTime: '00:00',
        duration: 0,
        state: 0,
        poster: '',
      },
      showContent:[],
      isLogin: false
    };
  },
  created(){

    let that = this;
    
    // 检测是否登录
    let users_id = '';
    if(localStorage.length>0){
      users_id = localStorage.getItem('userid');
      if(users_id){
        this.isLogin = true;
      }
    }

    // 获取首页数据
    this.$ajax.post('/api/shou_ye/getShouye', {users_id}).then(res=>{
    
    // banner 路径拼接
    that.swiperSrc = res.data.image.images.split(',').map(v=>(site.fileSite + v));


    // video src poster 路径拼接
    that.videoData.src = site.fileSite + res.data.video.xcfile;
    that.videoData.poster = site.fileSite +  res.data.video.fmimage;
    
    that.videoData.name = res.data.video.name;

    // 课程列表数据 
    that.crouseList = res.data.data;
    that.showContent = new Array(that.crouseList.length).fill(false);

    });

  },
  
  mounted(){
    let video = this.$refs.video;
    let that = this;

    if(!video) return;

    // 监听视频播放时间改变
    video.addEventListener('timeupdate', function(){
      that.videoData.currentTime = video.currentTime;
      that.videoData.duration = video.duration;
      let left = video.duration - video.currentTime

      that.videoData.leftTime = formateTime(left);

    });

    // 监听视频开始播放
    video.addEventListener('play', function(){
      that.videoData.state = 1;
    });

    // 监听视频暂停
    video.addEventListener('pause', function(){
      that.videoData.state = 0;
    });

    function formateTime(time){
      if(!time) return;
      // 时间格式化 time 单位（秒）
      let s = Math.floor(time%60);
      let m = Math.floor(time/60);

      function addZero(o){
        return o<10? '0'+ o : o +'';
      }
      return `${addZero(m)}:${addZero(s)}`;
    }
  },
  methods: {
    videoPlayer(){
      // video对象
      let video = this.$refs.video;
      
      if(video.paused){
        // 播放视频
        video.play();

      }else{
        // 暂停视频
        video.pause();
      }
    },
    logout(){
      this.isLogin = false;
      localStorage.clear();
      Toast({message: '已退出登录'});
      // 获取首页数据
      let that = this;
      this.$ajax.post('/api/shou_ye/getShouye',).then(res=>{
        
        // banner 路径拼接
        that.swiperSrc = res.data.image.images.split(',').map(v=>(site.fileSite + v));


        // video src poster 路径拼接
        that.videoData.src = site.fileSite + res.data.video.xcfile;
        that.videoData.poster = site.fileSite +  res.data.video.fmimage;
        
        that.videoData.name = res.data.video.name;

        // 课程列表数据 
        that.crouseList = res.data.data;
        that.showContent = new Array(that.crouseList.length).fill(false);

        });

    },
    toggleContent(idx){
      let arr = [...this.showContent];
      arr[idx] = !arr[idx];
      this.showContent = arr;
    }
  }
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
      margin: 0 auto;
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
        font-size: 28/@rem;
        border-radius: 27 / @rem;
        border: 1 / @rem solid #6248ea;
        color: #6248ea;
      }
    }
    .swiper {
      width: 750 / @rem;
      height: 340 / @rem;
      margin: 0 auto;
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
      position: relative;
      margin: 20 / @rem auto;
      width: 710 / @rem;
      height: 400 / @rem;
      background-color: #fff;
      .video {
        width: 710 / @rem;
        height: 400 / @rem;
      }
      .video-icon{
        position: absolute;
        left: 20/@rem;
        top: 20/@rem;
        width: 90/@rem;
        height: 90/@rem;
        z-index: 99;
      }
      .control{
        position: absolute;
        bottom: 0;
        left: 0;
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 50/@rem;
        line-height: 50/@rem;
        color: #fff;
        font-size: 30/@rem;
        background-color: rgba(0, 0, 0, 0.2);
        div{
          padding: 0 20/@rem;
        }
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
          font-size: 32/@rem;
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
        .icon-rotate{
          transform: rotate(90deg);
        }
      }
      .list:last-child {
        border: none;
      }
      // 二级列表
      .list-cont{
        .list{
          display: flex;
          height: 90/@rem;
          line-height: 90/@rem;
          font-size: 28/@rem;
          text-align: center;
          border-bottom: 1/@rem solid #f5f5f5;
          .name{
            text-indent: 2em;
            text-align: left;
            width: 550/@rem;
            // 时间显示、未显示，宽度不一致
            // width: 410/@rem;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
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
          .btn-s{
            opacity: 0.5;
          }
        }
        .list:last-child{
          border: none;
        }
      }
    }
  }
}
</style>