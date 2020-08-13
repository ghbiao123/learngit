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
    that = this;
  },
  submit(e){
    let id = e.detail.target.dataset.id;
    let data = e.detail.value;
    let _url = "";
    let needData = {
      name: "姓名",
      phone: "手机号",
      password: "密码",
      address: "地址"
    }

    for(let key in needData){
      if(data.hasOwnProperty(key)&&(!data[key])){
        wx.showToast({
          title: needData[key] + "不能为空",
          icon: "none"
        });
        return;
      }else if(key == "phone"){
        if(! mQuery.checkPhoneFormate(data[key])){
          wx.showToast({
            title: '您填写的手机号有误',
            icon: "none"
          });
          return;
        }
      }
    }

    console.log("submit", id, data);
    if(id == 0){
      // 注册
      _url = "api/member/register";
    }else if(id == 1){
      // 登录
      _url = "api/member/login"
    }

    mQuery.getQuery(_url, data).then(res=>{
      console.log(res);
      if(res.data.code==0){
        // 请求登录成功
        wx.showToast({
          title: res.data.msg,
          icon: "none"
        });

        setTimeout(() => {
          if(id==0){
            // 注册成功

            that.setData({
              id: 1
            });

            wx.showToast({
              title: '请您登录',
              icon: "none"
            });

          }else if(id == 1){
            // 登录成功
            // 跳转详情，并关闭当前页面

            wx.redirectTo({
              url: '/pages/list/list',
            });

          }
        }, 2000);

      }else if(res.data.code==1){
        // 请求成功，被拒绝
        wx.showToast({
          title: res.data.msg,
          icon: "none"
        });
      }
    });

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
