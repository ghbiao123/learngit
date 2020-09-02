<template>
  <div id="app">
    <head-nav :title="title"></head-nav>
    <div class="content">
      <div class="nav-tit">
        <div class="tit">崖州区实用英语云课堂</div>
        <router-link :to="{name:'register',}">
          <button v-if="!isLogin"  class="btn">登录</button>
        </router-link>
        <button v-if="isLogin" @click="logout" class="btn">退出</button>
      </div>

      <div class="video-player">

        <video :src="videoData.src" @click="videoPlayer" :poster="videoData.poster" preload="auto" ref="video" class="video"></video>
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
        <div class="point-introduce" v-html="videoData.jieshao"></div>
        <!-- <div class="point-introduce" >{{videoData.jieshao}}</div> -->
      </div>

      <div class="card">
        <div class="title">{{title}}</div>

        <div class="list" v-for="(item, index) in classList" :key="index">
          <div class="name">{{item.name}}</div>
          <!-- <div class="time">{{item.duration}}</div> -->
          <div v-if="item.status==1?true:false" @click="getClassDetail(item.id)" class="btn btn-s">已学习</div>
          <div v-if="item.status==2?true:false" @click="getClassDetail(item.id)" class="btn">未学习</div>
        </div>

      </div>

      <div class="card">
        <div class="title">讲师</div>

        <div class="teacher-info">
          <div class="avatar">
            <img :src="videoData.miniavatar" alt="" class="avatar-image">
          </div>
          <div class="name">{{videoData.teacher}}</div>
        </div>

        <div class="introduce">{{videoData.teacherjieshao}}</div>

        <button class="sub" @click="pageTo">参加答题</button>
        <!-- <router-link :to="{name:'examination', params:{id:1}}">
          <button class="sub" @click="pageTo">参加答题</button>
        </router-link> -->

      </div>

    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import site from '../../config/program.config'
export default {
  data() {
    return {
      title: "商务对话",
      videoData:{
        src: '',
        name: '',
        teacher:'',
        currentTime:0,
        leftTime: '00:00',
        duration: 0,
        state: 0,
        playBack:0,
        poster: ""
      },
      courseId: '',
      classList:[],
      isLogin: false,

    };
  },
  created(){
    let that = this;
    let users_id = '';
    // 检测是否登录
    if(localStorage.length>0){
      users_id = localStorage.getItem('userid');
      if(users_id){
        this.isLogin = true;
      }
    }
    // 某一类课程id
    let c_id = this.$route.query.id;
    this.title = this.$route.query.title;

    // 获取某个课程的信息
    this.$ajax.post('/api/shou_ye/getKechengDetail',{kecheng_id: c_id, users_id}).then(res=>{
      that.classList = res.data.data;
      
      // 获取第一节课的详情
      if(that.classList.length>0){
        that.getClassDetail(that.classList[0].id);
      }else{
        Toast({message: '暂无课程信息'});
        setTimeout(() => {
          this.$router.push({name: 'index'});
        }, 3000);
      }

    });


  },
  mounted(){
    let video = this.$refs.video;
    let that = this;

    // 是否看完
    let isDone = false;
    // 播放量是否增加
    let isPlayBack = false;

    // 监听视频播放时间改变
    video.addEventListener('timeupdate', function(){
      that.videoData.currentTime = video.currentTime;
      that.videoData.duration = video.duration;
      let left = video.duration - video.currentTime
      let progress =Math.floor(left / video.duration * 100);
      // that.videoData.leftTime = formateTime(left);
      if(progress<=10){
        // 视频已看完
        if(isDone) return;
        var uid = localStorage.getItem('userid');
        if(!uid) return;
        isDone = true;
        var data = {
          users_id: uid,
          subject_id: that.courseId,
          kecheng_id: that.kecheng_id
        }
        that.$ajax.post('/api/shou_ye/addjilu', data).then(res=>{
        });
      }
      if(progress<=50){
        // 播放量增加
        if(isPlayBack) return; 
        var data  ={
          subject_id: that.courseId
        }
        isPlayBack = true;
        that.$ajax.post('/api/shou_ye/addNum', data).then(res=>{
        });
      }

      

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
        // let a = localStorage.getItem('userid');
        // if(!a){
        //   Toast({message: '请您先登录'});
        //   return;
        // }
        video.play();

      }else{
        // 暂停视频
        video.pause();
      }
    },
    getClassDetail(subject_id){
      let that = this;
      this.$ajax.post('/api/shou_ye/getKecheng',{subject_id}).then(res=>{

        // video src poster 路径拼接
        that.videoData.src = site.fileSite + res.data.data.shipinfile;
        that.videoData.poster = site.fileSite + res.data.data.photoimages;

        that.videoData.name = res.data.data.name;
        that.videoData.teacher = res.data.data.teachers_name;
        that.videoData.playBack = res.data.data.num;
        that.videoData.poster = res.data.data.photoimages;
        // 教师头像路径拼接
        that.videoData.miniavatar = site.fileSite + res.data.data.miniavatar;
        that.videoData.jieshao = res.data.data.jieshao;
        that.videoData.teacherjieshao = res.data.data.teacherjieshao;
        that.courseId = res.data.data.id;
        that.kecheng_id = res.data.data.kecheng_id;
      });
    },
    pageTo(){
      let a = localStorage.getItem('userid');
      if(!a){
        Toast({message: '请您先登录'});
        return;
      }
      this.$router.push({name: 'examination', query:{id: this.courseId}});
    },
    logout(){
      let that = this;
      this.isLogin = false;
      localStorage.clear();
      Toast({message: '已退出登录'});

      let c_id = this.$route.query.id;

      // 获取某个课程的信息
      this.$ajax.post('/api/shou_ye/getKechengDetail',{kecheng_id: c_id, users_id: ''}).then(res=>{
        that.classList = res.data.data;
      });
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
    border-radius: 27 / @rem;
    font-size: 28/@rem;
    border: 1 / @rem solid #6248ea;
    color: #6248ea;
  }
}
.video-player {
  position: relative;
  width: 750 / @rem;
  height: 530 / @rem;
  margin: 0 auto;
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
  margin: 20/@rem auto 0;
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
.point-introduce{
  font-size: 28/@rem;
  white-space: pre-line;
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