<template>
  <div id="app">
    <head-nav :title="title"></head-nav>
    <div class="content">
      <div class="nav-tit">
        <div class="tit">崖州区实用英语云课堂</div>
        <button class="btn">登录</button>
      </div>

      <div class="video-player">

        <video :src="videoData.src" @click="videoPlayer" preload="auto" ref="video" class="video"></video>
        <div class="control">
          <div class="info">
            <div class="title">{{videoData.name}}</div>
            <div class="teacher">讲师：{{videoData.teacher}}</div>
          </div>
          <div class="time">
            <img src="../../static/images/play.png" class="time-icon" alt="">
            <div class="time-item">播放量：{{videoData.playBack}}</div>
          </div>
        </div>
        <img src="../../static/images/stop.png" class="video-icon" :hidden='videoData.state==1?true:false' alt="">

      </div>

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

      <div class="card">
        <div class="title">商务对话</div>

        <div class="teacher-info">
          <div class="avatar">
            <img src="../../static/images/avatar.png" alt="" class="avatar-image">
          </div>
          <div class="name">姓名</div>
        </div>

        <div class="introduce">
          朱东明老师，美藉华人，美国俄亥俄州立大学学士，亚利桑那大学教育学硕士。现任海南欧美同事会理事，海口广播电视台英文新闻栏目专业配音，标准美语发音。 新阳英语资深教师。持有ESL证书，连续三年被评为优秀外藉教师。课堂幽默风趣，内容充实，备受学生追捧。精通各学段口语课程及托福课程。在校十年来，培养出众多托福口语高分。
        </div>

        <button class="sub" @click="pageTo">参加答题</button>
        <!-- <router-link :to="{name:'examination', params:{id:1}}">
          <button class="sub" @click="pageTo">参加答题</button>
        </router-link> -->

      </div>




    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "商务对话",
      videoData:{
        src: '../../static/video/test.mp4',
        name: '视频标题',
        teacher:'Bruce',
        currentTime:0,
        leftTime: '00:00',
        duration: 0,
        state: 0,
        playBack:123
      }
    };
  },
  mounted(){
    let video = this.$refs.video;
    let that = this;

    // 监听视频播放时间改变
    video.addEventListener('timeupdate', function(){
      that.videoData.currentTime = video.currentTime;
      that.videoData.duration = video.duration;
      let left = video.duration - video.currentTime

      that.videoData.leftTime = formateTime(left);

    });

    // 监听视频开始播放
    video.addEventListener('play', function(){
      console.log('play');
      that.videoData.state = 1;
    });

    // 监听视频暂停
    video.addEventListener('pause', function(){
      that.videoData.state = 0;
    });

    function formateTime(time){
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
    pageTo(){
      this.$router.push({name: 'examination', query:{id: 123}});
    }
  },
  
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
  position: relative;
  width: 750 / @rem;
  height: 530 / @rem;
  overflow: hidden;
  .video-icon{
    position: absolute;
    left: 40/@rem;
    top: 10/@rem;
    width: 90/@rem;
    height: 90/@rem;
  }
  .video{
    display: block;
    margin: 0 auto;
    width: 710/@rem;
    height: 400/@rem;
    background-color: #fff;
  }
  .control{
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    padding-top: 10/@rem;
    width: 710/@rem;
    height: 110/@rem;
    .info{
      padding-top: 10/@rem;
      line-height: 50/@rem;
      .title{
        font-size: 30/@rem;
        color: #000;
        font-weight: bold;
      }
      .teacher{
        font-size: 26/@rem;
      }
    }
    .time{
      display: flex;
      line-height: 110/@rem;
      font-size: 24/@rem;
      color: #CCCCCC;
      .time-icon{
        margin-top: 44/@rem;
        width: 22/@rem;
        height: 22/@rem;
      }
      .time-item{
        padding-left: 10/@rem;
      }
    }
  }
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
.teacher-info{
  display: flex;
  // justify-content: space-between;
  padding: 20/@rem 0;
  .avatar{
    width: 140/@rem;
    height: 140/@rem;
    border-radius: 50%;
    overflow: hidden;
    .avatar-image{
      width: 140/@rem;
      height: 140/@rem;
    }
  }
  .name{
    font-size: 45/@rem;
    text-indent: 20/@rem;
    line-height: 140/@rem;
  }
}
.introduce{
  padding: 20/@rem 0;
  font-size: 28/@rem;
}
.sub{
  width: 670/@rem;
  height: 100/@rem;
  font-size: 30/@rem;
  color: #fff;
  background-color: #6248EA;
  border-radius: 50/@rem;
}
</style>