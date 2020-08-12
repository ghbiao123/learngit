//index.js
//获取应用实例
let that;
let mQuery = require("../../utils/mQuery");
const app = getApp()

Page({
  data: {
    id:0
  },
  //事件处理函数
  
  onLoad: function () {
    
  },
  submit(e){
    let id = e.detail.target.dataset.id;
    console.log("submit", id);
    if(id == 0){
      // 注册
    }else if(id == 1){
      // 登录
    }

  },
  changePage(e){
    let id = e.currentTarget.dataset.id;
    this.setData({
      id
    });
  },
  swiperChange(e){
    let id = e.detail.current;
    this.data.id = id;
  },

  onShareAppMessage: function () {

  }
  
})
