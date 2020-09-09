// pages/detail/detail.js
let that;
let util = require('../../utils/util');
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
    
    // 确定是哪个页面详情
    let type = options.type;
    this.data.case_id = options.case_id;
    this.getData(type);

  },
  // 获取数据
  getData(type){
    let title = '';
    let url = '';
    let data = {};
    if(type=='case'){
      title = '案例详情';
      url = '/api/carcase/detail';
      data.case_id = this.data.case_id;
    }
    
    if(type == 'project'){
      title = '产品中心';
      url = '/api/center/detail';
    }

    util._post(url, data).then(res=>{
      if(type=='case'){
        that.setData({
          detail: res
        });
      }
      if(type=='project'){
        that.setData({
          detail: res.detail
        });
      }
    });

    wx.setNavigationBarTitle({
      title: title,
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