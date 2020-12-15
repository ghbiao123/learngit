<template>
  <div id="app" :style="{height: screeHeight+'px'}">
   <head-nav title="活动倒计时" bgColor="#282828" titleColor="#fff" :isBack="false"></head-nav>

    <div class="circle-out">
      <div class="circle-in">
        <div class="content" v-if="false">
          <div class="text">计时时间</div>
          <div class="time">{{timeCount}}</div>
        </div>
        <div class="content" v-if="true">
          <div class="time color-red">{{timeCount}}</div>
          <div class="text">额外时间</div>
        </div>
      </div>
    </div>

    <div class="btn-box">
      <div class="btn-item" @mousedown="btnLtHover = true" @mouseup="btnLtHover = false" @touchstart="btnLtHover = true" @touchend="btnLtHover = false" :class="{btnLtHover: btnLtHover}">
        <img @click="punch" class="btn-icon" src="../../../static/images/daka.png" alt="#">
      </div>
      <div class="btn-item" @mousedown="btnRtHover = true" @mouseup="btnRtHover = false" @touchstart="btnRtHover = true" @touchend="btnRtHover = false" :class="{btnRtHover: btnRtHover}">
        <router-link :to="{name:'main'}">
          <img class="btn-icon" src="../../../static/images/main.png" alt="#">
        </router-link>
      </div>
    </div>


  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      //
      screeHeight: window.innerHeight,
      btnLtHover: false,
      btnRtHover: false,
      timeCount: "00:00:00",
    }
  },
  mounted(){
    /**
     * index.html 中已经引入了 http://res.wx.qq.com/open/js/jweixin-1.6.0.js
     * 1. 通过wx.config()接口 注入权限验证
     * 2. 通过wx.ready()接口 处理成功验证
     * 3. 通过wx.error()接口 处理失败验证
     */

    // 请求配置参数
    let data = {};
    data.url = location.href;
    // this.$ajax.post("/api/ticket/getTicket", data).then(res=>{
    //   console.log(res);
    // });

    // 查看本地code 有code则初始化数据，
    this.countDown(Math.floor(new Date()/1000) + 60 * 60 * 3);
  
  },
  methods: {
    punch(){
      let that = this;
      // 需要先请求扫码, 得到扫码结果
      // wx.scanQRCode({
      //   needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
      //   scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
      //   success: function (res) {
      //     var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
      //   }
      // });

      // 模拟请求结果,
      // 进门
      // let resultStr = "id=1&type=1";
      // 出门
      let resultStr = "id=1&type=2";
      let result = {};
      resultStr.split("&").forEach(v=>{
        let arrVal = v.split("=");
        result[arrVal[0]] = arrVal[1];
      });

      console.log(result);
      let data = {};
      data.users_id = localStorage.getItem("uid");
      data.code_id = result.id;
      // result.tyoe == 1 "进门":"出门"
      let url = result.type == 1 ? "/api/users/admission" : "/api/users/departure";
      that.$ajax.post(url, data).then(res=>{
        console.log(res);
        if(res.data.code == 2001){
          // 扫码成功, 本地存储房间id：result.id
          localStorage.setItem("code", result.id);

        }
        Toast(res.data.msg);
      });



    },
    // 传参，秒为单位
    countDown(newVal) {
      
      let that = this;
      let timer;
      // const unit = ['天', '时', '分', '秒'];
      const unit = [':', ':', ':', ':'];

      clearInterval(timer);
      timer = setInterval(function () {
        let time = new Date(newVal * 1000) - new Date();
        if(time<0){
          clearInterval(timer);
          return
        }
        let arrTime = [];
        let day = Math.floor(time / 1000 / 60 / 60 / 24);
        let hour = Math.floor(time % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
        let minute = Math.floor(time % (1000 * 60 * 60) / (1000 * 60));
        let second = Math.floor(time % (1000 * 60) / (1000));
        // let timeSource = [day, hour, minute, second];
        let timeSource = [hour, minute, second];
        that.timeCount = timeSource.map((v, i) => {
          let t = v.toString().padStart(2, '0');
          return t;
        }).join(":");
          
      }, 250);
    }
  }
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
    .circle-out{
      margin: 30/@rem auto 0;
      width: 680/@rem;
      height: 680/@rem;
      border-radius: 50%;
      box-shadow: 0 0 20/@rem #000;
      overflow: hidden;
    }
    .circle-in{
      margin: 30/@rem auto;
      width: 620/@rem;
      height: 620/@rem;
      border-radius: 50%;
      box-shadow: 0 0 10/@rem #000;
      .content{
        padding-top: 200/@rem;
        text-align: center;
        line-height: 1.5;
        color: #fff;
        .text{
          font-size: 36/@rem;
        }
        .time{
          font-size: 110/@rem;
          font-family: "Estrangelo Edessa", calibri;
        }
        .color-red{
          color: #FA2D2D;
        }
      }
    }

    .btn-box{
      padding-top: 80/@rem;
      display: flex;
      justify-content: space-around;
      width: 100%;
      .btn-item,
      .btn-icon{
        width: 180/@rem;
        height: 180/@rem;
        border-radius: 50%;
      }
      .btnLtHover{
        box-shadow: 0 0 10/@rem #FA2D2D inset;
      }
      .btnRtHover{
        box-shadow: 0 0 10/@rem #ffffff inset;
      }
    }


  }
</style>