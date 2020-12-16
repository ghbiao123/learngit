<template>
  <div id="app">

    <head-nav title="注册" :isBack="false"></head-nav>

    <div class="head">
      <img class="head-bg" src="../../../static/images/register-head.jpg" alt="#">
    </div>

    <div class="navbar">
      <div class="tab-item" :class="[selected==2?'is-selected':'']" @click="selected = '2'">客户注册</div>
      <div class="tab-item" :class="[selected==1?'is-selected':'']" @click="selected = '1'">员工注册</div>
    </div>


    <!-- 手机号 -->
    <div class="cell-input">
      <div class="icon-box">
        <img class="icon" src="../../../static/images/register01.png" alt="#">
      </div>
      <div class="cont">
        <mt-field placeholder="请输入手机号(将做为登录账号)" v-model="registerData.phone" type="number"></mt-field>
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
        <mt-field placeholder="请输入密码" v-model="registerData.password" type="password"></mt-field>
      </div>
      <div class="rt-box">
        <img class="rt" v-if="false" src="../../../static/images/arrow-rt.png" alt="#">
      </div>
    </div>
    
    <!-- erp -->
    <div v-show="selected == 1" class="cell-input">
      <div class="icon-box">
        <img class="icon" src="../../../static/images/register03.png" alt="#">
      </div>
      <div class="cont">
        <mt-field placeholder="请输入ERP编号" v-model="registerData.erpnum" type="text"></mt-field>
      </div>
      <div class="rt-box">
        <img class="rt" v-if="false" src="../../../static/images/arrow-rt.png" alt="#">
      </div>
    </div>
    <!-- 请输入姓名 -->
    <div class="cell-input">
      <div class="icon-box">
        <img class="icon" src="../../../static/images/register04.png" alt="#">
      </div>
      <div class="cont">
        <mt-field placeholder="请输入姓名" v-model="registerData.name" type="text"></mt-field>
      </div>
      <div class="rt-box">
        <img class="rt" v-if="false" src="../../../static/images/arrow-rt.png" alt="#">
      </div>
    </div>
    <!-- 请输入单位 -->
    <div class="cell-input">
      <div class="icon-box">
        <img class="icon" src="../../../static/images/register05.png" alt="#">
      </div>
      <div class="cont">
        <mt-field placeholder="请输入单位" v-model="registerData.danwei" type="text"></mt-field>
      </div>
      <div class="rt-box">
        <img class="rt" v-if="false" src="../../../static/images/arrow-rt.png" alt="#">
      </div>
    </div>
    <!-- 请输入职务 -->
    <div class="cell-input">
      <div class="icon-box">
        <img class="icon" src="../../../static/images/register06.png" alt="#">
      </div>
      <div class="cont">
        <mt-field placeholder="请输入职务" v-model="registerData.zhiwu" type="text"></mt-field>
      </div>
      <div class="rt-box">
        <img class="rt" v-if="false" src="../../../static/images/arrow-rt.png" alt="#">
      </div>
    </div>
    <!-- 性别 -->
    <div class="cell-input">
      <div class="icon-box">
        <img class="icon" src="../../../static/images/register07.png" alt="#">
      </div>
      <div class="cont" @click="showPopup" data-type="gender">
        <div class="input-disabled">{{registerData.sex}}</div>
        <!-- <mt-field placeholder="请选择性别" disabled v-model="registerData" type="text"></mt-field> -->
      </div>
      <div class="rt-box">
        <img class="rt" src="../../../static/images/arrow-rt.png" alt="#">
      </div>
    </div>
    <!-- 请选择出生日期 -->
    <div class="cell-input">
      <div class="icon-box">
        <img class="icon" src="../../../static/images/register08.png" alt="#">
      </div>
      <div class="cont">
        <div class="calendar">
          <div @click="showPopup" data-type="calendar" class="calendar-text">{{calendar}}</div>
          <img class="calendar-icon" src="../../../static/images/arrow-down.png" />
        </div>
        <div class="input-disabled" @click="open">{{registerData.birthday}}</div>
      </div>
      <div class="rt-box">
        <img class="rt" src="../../../static/images/arrow-rt.png" alt="#">
      </div>
    </div>
    <!-- 请填写您的运动爱好 -->
    <div class="cell-input">
      <div class="icon-box">
        <img class="icon" src="../../../static/images/register09.png" alt="#">
      </div>
      <div class="cont">
        <mt-field placeholder="请填写您的运动爱好" v-model="registerData.hobby" type="text"></mt-field>
      </div>
      <div class="rt-box">
        <img class="rt" v-if="false" src="../../../static/images/arrow-rt.png" alt="#">
      </div>
    </div>

    <!-- 请选择卡类别 -->
    <div class="cell-input" v-show="selected == 2">
      <div class="icon-box">
        <img class="icon" src="../../../static/images/register11.png" alt="#">
      </div>
      <div class="cont" @click="showPopup" data-type="card">
        <!-- <mt-field placeholder="请选择卡类别" v-model="registerData.hobby" type="text"></mt-field> -->
        <div class="input-disabled">{{registerData.card_type}}</div>
      </div>
      <div class="rt-box">
        <img class="rt" v-if="true" src="../../../static/images/arrow-rt.png" alt="#">
      </div>
    </div>

    <!-- 请输入备注资料 -->
    <div class="cell-input">
      <div class="icon-box">
        <img class="icon" src="../../../static/images/register10.png" alt="#">
      </div>
      <div class="cont">
        <mt-field placeholder="请输入备注资料" v-model="registerData.remark" type="text"></mt-field>
      </div>
      <div class="rt-box">
        <img class="rt" v-if="false" src="../../../static/images/arrow-rt.png" alt="#">
      </div>
    </div>

    <div class="tip">*每位新用户有3小时计时时间</div>

    <div @click="register">
      <my-btn title="立即注册"></my-btn>
    </div>

    <router-link :to="{name: 'login'}" class="linkto">已有账号，去登录 ></router-link>

    <mt-popup
      v-model="popupVisible"
      position="bottom">
      <div class="picker-box">
        <div class="picker-btn">
          <!-- <button @click="popupVisible = false" type="btn" hover-class="picker-hover" class="picker-cancel">取消</button> -->
          <button @click="popupVisible = false" hover-class="picker-hover" class="picker-confirm">确认</button>
        </div>
        <mt-picker :slots="slotList" @change="onGenderChange"></mt-picker>
      </div>
    </mt-popup>

      <!-- v-model="pickerValue" -->
    <mt-datetime-picker
      ref="picker"
      type="date"
      :start-date="startTime"
      :end-date="endTime"
      @confirm="getBirth"
      >
    </mt-datetime-picker>

    
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      //
      popupVisible: false,
      selected: "2",
      registerData: {
        phone:'',
        password:"",
        name: "",
        danwei: "",
        zhiwu: "",
        sex: "",
        birthday: "",
        hobby: "",
        card_type: "",
        remark: "",
        juese: "",
        erpnum: "",
        rili: "",
      },
      calendar: "",
      slotList:[{
          flex: 1,
          values: [],
          textAlign: 'center'
        }],
      genderList: ["女", "男"],
      calendarList: ['公历', '农历'],
      cardList: ["黑金卡", "黄金卡"],
      pickerVisible: "",
      pickerValue: "",
      startTime: new Date(),
      endTime: new Date(),

    }
  },
  mounted(){
    // 初始化数据
    this.registerData.birthday = new Date().toLocaleDateString();
    this.registerData.sex = this.genderList[0];
    this.registerData.card_type = this.cardList[0];
    this.registerData.rili = 1;
    this.calendar = this.calendarList[0];
    // startTime
    this.startTime = new Date(`${new Date().getFullYear() - 65}-01-01`);
  },
  methods: {
    // 注册
    register(e){
      console.log(this.registerData);
      this.registerData.juese = this.selected;
      let needData = {
        phone:'请输入手机号',
        password:"请输入密码",
        name: "请输入姓名",
        danwei: "请输入单位",
        zhiwu: "请输入职务",
        sex: "请选择性别",
        birthday: "请选择出生日期",
        hobby: "请填写您的运动爱好",
        card_type: "请选择卡类别",
      }
      // 员工注册
      if(this.selected == 1){
        // 员工有ERP账号
        needData.erpnum = "请输入ERP编号";
      }
      // 客户注册
      if(this.selected == 1){
        // 客户有卡
        needData.card_type = "请选择卡类别";
      }

      for(let key in needData) {
        if( !this.registerData[key]) {
          Toast(needData[key]);
          return;
        }
      }
      let that = this;
      this.$ajax.post("/api/register/registerUsers", this.registerData).then(res=>{
        console.log(res);
        if(res.data.code == 2001){
          setTimeout(()=>{
            that.$router.push({
              name: 'login',
            });
          }, 3000);
        }
        Toast(res.data.msg);
      });


    },
    // 打开日期picker
    open(){
      this.$refs.picker.open();
    },
    // 选定日期后的赋值操作
    getBirth(e){
      this.registerData.birthday = e.toLocaleDateString();
    },
    // 打开给设置picker选定值
    onGenderChange(picker, values){
      let type = this.type;
      if(type == "gender"){
        this.registerData.sex = values[0];
      }
      if(type == "calendar"){
        this.calendar = values[0];
        this.registerData.rili = values[0] == "公历" ? '1' : '2';
      }
      if(type == "card"){
        this.registerData.card_type = values[0];
      }

    },
    // 展示picker
    showPopup(e){
      let type = e.target.dataset.type;
      this.type = type;
      if(type == "gender"){
        this.slotList[0].values = this.genderList;
      }
      if(type == "calendar"){
        this.slotList[0].values = this.calendarList;
      }
      if(type == "card"){
        this.slotList[0].values = this.cardList;
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
    /deep/ .mint-datetime{
      left: 50% !important;
    }
    /deep/ .mint-cell-wrapper{
      background-size: 0 0;
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
          color: #333333;
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
    .mint-popup-bottom{
      left: 0;
    }
    .picker-box{
      position: fixed;
      bottom: 0;
      left: -50%;
      // height: 200px;
      width: 750/@rem;
      background-color: #fff;
      z-index: 23;
      border-top: 2/@rem solid #999999;
      .picker-btn{
        display: flex;
        justify-content: flex-end;
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