// pages/choicedetail/choicedetail.js
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
    let id = options.id;
    wx.getStorage({
      key: 'choice',
      success(res){
        let list = res.data;
        let data = list.filter(v=>{return v.id==id})[0] || {};
        let imageList = data.images.split(',').map(v=>(util.getSiteRoot() + v));
        wx.setNavigationBarTitle({
          title: data.name,
        });

        that.setData({
          imageList
        });
      }
    });
  },
  showIt(e){
    let idx = e.currentTarget.dataset.idx;
    wx.previewImage({
      urls: that.data.imageList,
      current: that.data.imageList[idx]
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