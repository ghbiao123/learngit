// pages/mine/mine.js
let that;
import util from "../../utils/util";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    waitCheckCount: 0,
    waitPayCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    
    
    
  },

  // 初始化 待验机，代付款列表数目
  init(){

    let userInfo = wx.getStorageSync('userinfo');
    if(userInfo){
      let userid = userInfo.uid;

      util.post("/api/order/userOrderCount", {
        userid
      }).then(res=>{
         
        that.setData({
          waitCheckCount: res.data.c1,
          waitPayCount: res.data.c2,
        });
      });

      // 待验机数量
      // util.post("/api/order/userOrderList", {
      //   userid,
      //   orderstatus: 0
      // }).then(res=>{
      //   let count = res.data.length;
      //   that.setData({
      //     waitCheckCount: count
      //   });
      // });
      // 待付款数量
      // util.post("/api/order/userOrderList", {
      //   userid,
      //   orderstatus: 1
      // }).then(res=>{
      //   let count = res.data.length;
      //   that.setData({
      //     waitPayCount: count
      //   });
      // });
    }else{
      this.setData({
        waitCheckCount: 0,
          waitPayCount: 0,
      });
    }

  },

  // 显示我的机型
  showModel(){
    wx.getSystemInfo({
      success: (result) => {
        console.log(result);
        util.showError(result.model, function(){
          wx.setClipboardData({
            data: result.model,
          });
        }); 
      },
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    util.checkIsLogin.call(this);
    this.init();
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 下拉刷新数据
    this.init();
    setTimeout(() => {
      wx.stopPullDownRefresh();
    }, 200);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})