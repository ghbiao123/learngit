// pages/searchresult/searchresult.js
import util from "../../utils/util";
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

    this.getList(options.keywords);
  },
  getList(keywords){
    util.post('/api/products/searchEmodel', {keywords}).then(res=>{
      console.log(res);
      that.setData({
        result: res.data
      });
    });
  },
  getEvaluation(e){
    let mid = e.currentTarget.dataset.id;
    let name = e.currentTarget.dataset.name;
    let cid = e.currentTarget.dataset.cid;
    let userInfo = wx.getStorageSync('userinfo');
    if(userInfo){
      util.post('/api/products/searchStatistics', {mid, name, userid: userInfo.uid});
    }

    if(cid>=4){
      wx.navigateTo({
        url: '/pages/evaluation/othercalcprice',
      });
      return
    }
    wx.navigateTo({
      url: `/pages/evaluation/evaluation?id=${mid}&cid=${cid}`,
    });

    return;
    wx.navigateTo({
      url: '/pages',
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