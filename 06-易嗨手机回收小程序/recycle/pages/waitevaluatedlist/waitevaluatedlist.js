// pages/waitevaluationlist/waitevaluationlist.js
let that;
let util = require("../../utils/util");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 0,
    list: [],
    isMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  // 获取列表
  getList(){
    let staffid = this.data.staffid;
    let page = this.data.page + 1;
    this.data.page = page;
    if(!this.data.isMore){
      return util.showSuccess('已加载所有订单');
    }
    util.post("/api/order/finishAssessOrderList", {
      staffid,
      page
    }).then(res => {
      console.log(res);
      if (res.code == -1) {
        return util.showSuccess(res.msg, function () {
          wx.navigateBack({
            delta: 1,
          });
        });
      } else if (res.code == 1) {
        if(res.data.last_page == that.data.page){
          that.data.isMore = false
        }
        let list = this.data.list;
        list.push(...res.data.data);
        that.setData({
          list
        });
      }
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */

  onShow: function () {
    this.data.staffid = wx.getStorageSync('staffid');
    
    this.getList();

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
    this.getList();

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})