<template>
  <div id="app" :style="{height: screeHeight+'px'}">
   <head-nav title="活动倒计时" bgColor="#282828" titleColor="#fff" :isBack="false"></head-nav>

    <div class="circle-out">
      <div class="circle-in">
        <div class="content">
          <div class="text">计时时间</div>
          <div class="time">02:00:00</div>
        </div>
      </div>
    </div>

    <div class="btn-box">
      <div class="btn-item" @mousedown="btnLtHover = true" @mouseup="btnLtHover = false" @touchstart="btnLtHover = true" @touchend="btnLtHover = false" :class="{btnLtHover: btnLtHover}">
        <img class="btn-icon" src="../../../static/images/daka.png" alt="#">
      </div>
      <div class="btn-item" @mousedown="btnRtHover = true" @mouseup="btnRtHover = false" @touchstart="btnRtHover = true" @touchend="btnRtHover = false" :class="{btnRtHover: btnRtHover}">
        <img class="btn-icon" src="../../../static/images/main.png" alt="#">
      </div>
    </div>


  </div>
</template>

<script>
export default {
  data() {
    return {
      //
      screeHeight: window.innerHeight,
      btnLtHover: false,
      btnRtHover: false,
    }
  },
  methods: {
    countDown(newVal) {
      
      let that = this;
      let timer;
      const unit = ['天', '时', '分', '秒'];

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
        let timeSource = [day, hour, minute, second];
        timeSource.forEach((v, i) => {
          let t = v.toString().padStart(2, '0').split('');
          // 只显示两位数的天数
          if (t.length > 2) {
            t = ["9", "9"];
          }
          arrTime.push(...t, unit[i]);
        });
        // result => arrTime
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