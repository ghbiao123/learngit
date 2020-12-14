<template>
  <div id="app">

    <head-nav title="登录" :isBack="false"></head-nav>

    <div class="head">
      <img class="head-bg" src="../../../static/images/register-head.jpg" alt="#">
    </div>

    <div class="navbar">
      <div class="tab-item" :class="[selected==1?'is-selected':'']" @click="selected = '1'">客户注册</div>
      <div class="tab-item" :class="[selected==2?'is-selected':'']" @click="selected = '2'">员工注册</div>
    </div>


    <!-- 手机号 -->
    <div class="cell-input">
      <div class="icon-box">
        <img class="icon" src="../../../static/images/register01.png" alt="#">
      </div>
      <div class="cont">
        <mt-field placeholder="请输入手机号(将做为登录账号)" v-model="registerData" type="number"></mt-field>
      </div>
      <div class="rt-box">
        <img class="rt" v-if="false" src="../../../static/images/arrow-rt.png" alt="#">
      </div>
    </div>
    <!-- 密码 -->
    <div class="cell-input">
      <div class="icon-box">
        <img class="icon" src="../../../static/images/register02.png" alt="#">
      </div>
      <div class="cont">
        <mt-field placeholder="请输入密码" v-model="registerData" type="text"></mt-field>
      </div>
      <div class="rt-box">
        <img class="rt" v-if="false" src="../../../static/images/arrow-rt.png" alt="#">
      </div>
    </div>

    <div class="m-t">
      <my-btn title="立即登录"></my-btn>
    </div>

    <router-link :to="{name: 'login'}" class="linkto">没有账号？去注册 ></router-link>

    <mt-popup
      v-model="popupVisible"
      position="bottom">
      <div class="picker-box">
        <div class="picker-btn">
          <button @click="popupVisible = false" type="btn" hover-class="picker-hover" class="picker-cancel">取消</button>
          <button @click="popupVisible = false" hover-class="picker-hover" class="picker-confirm">确认</button>
        </div>
        <mt-picker :slots="slotList" @change="onGenderChange"></mt-picker>
      </div>
    </mt-popup>

    

    
  </div>
</template>

<script>
export default {
  data() {
    return {
      //
      popupVisible: false,
      selected: "1",
      registerData: "",
      slotList:[{
          flex: 1,
          values: [],
          textAlign: 'center'
        }],
      genderList: ["女", "男"],
      calendarList: ['公历', '农历'],
      pickerVisible: ""

    }
  },
  methods: {
    onGenderChange(picker, values){
      console.log(picker, values);

    },
    showPopup(e){
      console.log(e);
      let type = e.target.dataset.type;
      this.type = type;
      if(type == "gender"){
        this.slotList[0].values = this.genderList;
      }
      if(type == "calendar"){
        this.slotList[0].values = this.calendarList;
      }
      this.popupVisible = true;
    },
    handleConfirm(e){

    }
  }
}
</script>

<style lang='less' scoped>
  @rem:750/10rem;
  #app{
      .m-t{
        margin-top: 40/@rem;
      }
    color: #333;
    padding-bottom: 20/@rem;
    .head,
    .head-bg{
      width: 750/@rem;
      height: 380/@rem;
    }
    
    .navbar {
      margin-bottom: 30/@rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      height: 100/@rem;
      .tab-item{
        height: 80/@rem;
        line-height: 80/@rem;
        font-size: 14px;
      }
      .is-selected{
        font-size: 18px;
        font-weight: bold;
        border-bottom: 6/@rem solid #FA2D2D;
      }
    }

    .cell-input{
      margin: 0 auto;
      display: flex;
      align-items: center;
      width: 640/@rem;
      height: 100/@rem;
      border-bottom: 2/@rem solid #E5E5E5;

      .icon-box{
        width: 50/@rem;
        height: 100/@rem;
        .icon{
          margin: 35/@rem 10/@rem;
          width: 30/@rem;
          height: 30/@rem;
        }
      }
      .cont{
        display: flex;
        align-items: center;
        width: 550/@rem;
        .input-disabled{
          padding-left: 24/@rem;
          font-size: 16px;
          color: #707070;
        }
        .calendar{
          display: flex;
          align-items: center;
          padding: 0 5/@rem;
          width: 80/@rem;
          height: 46/@rem;
          line-height: 46/@rem;
          border: 2/@rem solid #999999;
          .calendar-text{
            font-size: 24/@rem;
          }
          .calendar-icon{
            margin-left: 10/@rem;
            width: 16/@rem;
            height: 12/@rem;
          }
        }
      }
      .rt-box{
        width: 40/@rem;
        .rt{
          margin: 38/@rem 8/@rem;
          width: 24/@rem;
          height: 24/@rem;
        }
      }
    }
    .cell-input:first-child .mint-cell{
      width: 245px !important;
    }
    .mint-popup-bottom,
    .mint-popup{
      left: 0;
    }
    .picker-box{
      position: fixed;
      bottom: 0;
      // height: 200px;
      width: 750/@rem;
      background-color: #fff;
      z-index: 23;
      border-top: 2/@rem solid #999999;
      .picker-btn{
        display: flex;
        justify-content: space-between;
        padding: 10/@rem 40/@rem 0;
        .picker-cancel,
        .picker-confirm{
          font-size: 16px;
          background-color: rgba(0, 0, 0, 0);
          border: none;
          outline: none;
        }
        .picker-hover[type="btn"]{
          background-color: #000;
        }
        
      }
    }

    .tip{
      line-height: 3;
      padding-left: 65/@rem;
      font-size: 20/@rem;
      color: #999999;
    }

    .linkto{
      display: block;
      width: 100%;
      padding: 20/@rem 0 40/@rem;
      text-align: center;
      color: #FA2D2D;
      font-size: 30/@rem;
    }

  }
</style>