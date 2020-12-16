<template>
  <div id="app" :style="{height: screeHeight+'px'}">
   <head-nav title="活动倒计时" bgColor="#282828" titleColor="#fff" :isBack="false"></head-nav>

    <div class="circle-out">
      <div class="circle-in">
        <div class="content" v-if="status">
          <div class="text">计时时间</div>
          <div class="time">{{timeCount}}</div>
        </div>
        <div class="content" v-if="!status">
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
      status: true,
      timer: null,
      ret: '123'
    }
  },
  mounted(){
    let that = this;
    
    // this.countDown(Math.floor( new Date()/1000 + 3 ));

    // 查看本地code 有code则初始化数据，
    let users_id = localStorage.getItem("uid");
    let code = localStorage.getItem("code");
    if(!users_id){
      // 用户未登录
      this.$router.push({
        name: 'login'
      });
      return;
    }
    if(!code) {
      // 用户未使用房间
      return;
    };
    // 用户已登录并正在使用房间
    this.$ajax.post("/api/users/getJishiStatus", {users_id}).then(res=>{
      // res.data.state 0,正在使用房间； 1，未使用房间
      // 正在使用房间
      if(res.data.code == 2001 && res.data.data.state == 0){
        if(res.data.data.chaoshi_time > 0){
          // 已超时
          that.status = false;
          let t = Math.floor( new Date()/1000 - res.data.data.chaoshi_time * 60 );
          that.countDown(t);
        }else{
          // 未超时
          that.status = true;
          let t = Math.floor( new Date()/1000 + res.data.data.shengyu_time * 60 );
          that.countDown( t );
        }
      }

    });

  
  },
  methods: {
    punch(){
      let that = this;
      // 需要先请求扫码, 得到扫码结果
      /**
       * index.html 中已经引入了 http://res.wx.qq.com/open/js/jweixin-1.6.0.js
       * 1. 通过wx.config()接口 注入权限验证
       * 2. 通过wx.ready()接口 处理成功验证
       * 3. 通过wx.error()接口 处理失败验证
       */
      // 请求配置参数

      this.$ajax.post("/api/ticket/getTicket", {
        lianjie : window.location.href.split("#")[0]
      }).then(res=>{
        let data = {
          debug: false,
          jsApiList: ["scanQRCode"],
        }
        Object.assign(data, res.data);
        wx.config(data);

        wx.ready(function(){

          wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
              // 当needResult 为 1 时，扫码返回的结果
              let resultStr = res.resultStr;
              let result = {};
              resultStr.split("&").forEach(v=>{
                let arrVal = v.split("=");
                result[arrVal[0]] = arrVal[1];
              });


              let data = {};
              data.users_id = localStorage.getItem("uid");
              data.code_id = result.id;
              // result.tyoe == 1 "进门":"出门"
              let url = result.type == 1 ? "/api/users/admission" : "/api/users/departure";
              that.$ajax.post(url, data).then(res=>{
                console.log(res);
                if(res.data.code == 2001){
                  if(result.type == 1){
                    // 扫码打卡成功, 本地存储房间id：result.id
                    // 进门
                    localStorage.setItem("code", result.id);
                    if(res.data.data.chaoshi_time > 0){
                        // 已超时
                      that.status = false;
                      let t = Math.floor( new Date()/1000 - res.data.data.chaoshi_time * 60 );
                      that.countDown(t);
                    }else{
                      // 未超时
                      that.status = true;
                      let t = Math.floor( new Date()/1000 + res.data.data.shengyu_time * 60 );
                      that.countDown( t );
                    }

                  }else if(result.type == 2){
                    // 扫码退出成功，清除localstorage code, 重新设置显示时间00:00:00
                    // 出门
                    console.log(result);
                    localStorage.removeItem("code");
                    clearInterval(that.timer);
                    that.timeCount = "00:00:00";
                  }

                }
                Toast(res.data.msg);
              });

            },
            fail(err){
              console.log(err);
            }
          });

        });
        
        wx.error(err=>{
          console.log(err);
        });
        
      });

    },
    // 传参，秒为单位
    countDown(newVal) {
      console.log(!newVal);
      let that = this;
      // const unit = ['天', '时', '分', '秒'];
      const unit = [':', ':', ':', ':'];
      
      clearInterval(that.timer);
      that.timer = setInterval(function () {
        let time = Math.abs(new Date(newVal * 1000) - new Date());
        if(time < 1000) {
          that.status = false;
        }
        if(time<0 || !newVal){
          clearInterval(that.timer);
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