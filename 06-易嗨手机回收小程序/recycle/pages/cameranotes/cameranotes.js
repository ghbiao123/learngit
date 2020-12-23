// pages/tips/tips.js
let util = require('../../utils/util');
let that;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    this.data.pageOption = options;
    this.data._data = wx.getStorageSync('currentmachine');
  },
  // 人工回收
  getConfirm(e){
    this.data._data.otype = 0;
    let data = this.data._data;

    this.submit(data, function(){
      wx.redirectTo({
        url: '/pages/recyclelist/recyclelist',
      });
    });


  },
  // 立即回收
  getRecycle(e){
    // 用户现场扫码 立即回收
    this.data._data.otype = 1;
    let data = this.data._data;
    // 添加storage： currentmachine
    wx.setStorage({
      data: data,
      key: 'currentmachine',
    });
    this.submit(data, function(res){
      wx.navigateTo({
        url: `/pages/evaluation/result?name=${that.data._data.modelname}&price=${res.data.totalprice || 0}&frompage=evaluation&otype=1&orderid=${res.data.aoid}`
      });
      
    });

  },
  submit(data, callBack){
    util.post('/api/order/calculateOtherNa', data).then(res=>{
      if(res.code == 1){
        callBack&&callBack(res);
      }
    });
  },
  sendData(e){
    
    let data = this.data._data;
    if(e.detail.value == 2){
      
      submit(data, function(res){
        // wx.navigateTo({
        //   url: `/pages/evaluation/result?frompage=othercalcprice&name=${data.name}&price=0&otype=1&orderid=${res.data.aoid}`,
        // });
        wx.navigateTo({
          url: `/pages/tips/tips?frompage=othercalcprice&name=${data.name}&price=0&otype=1&orderid=${res.data.aoid}`,
        });
      });
    }else if(e.detail.value == 1 ){
      // 用户正常流程进行人工估价
      data.otype = 0;
      submit(data, function(){
        wx.redirectTo({
          url: '/pages/recyclelist/recyclelist',
        });
      });
    }

    function submit(data, callBack){
      util.post('/api/order/calculatePriceOther', data).then(res=>{
        if(res.code == 1){
          callBack&&callBack(res);
        }
      });
    }
    
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