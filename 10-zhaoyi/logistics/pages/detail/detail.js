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
    this.data.case_id = options.id;
    this.getData();

  },
  // 获取数据
  getData(type){
    let title = '公告详情';
    let url = '/api/Order/detailgonggao';
    let data = {
      gonggaoid: that.data.case_id
    };

    util.post(url, data).then(res=>{
      res.createtime = util.getToday(res.createtime * 1000).date;
      that.setData({
        detail: res
      });
    });
    that.setData({
      title
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