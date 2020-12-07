// pages/waitdeliverlist/waitdeliverlist.js
let that;
let util = require("../../utils/util");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;

    this.init();

  },
  // init
  init(){
    let staffid = wx.getStorageSync('staffid');
    let page = this.data.page;
    util.post("/api/order/deliveryOrdersList", {
      staffid,
      page
    }).then(res=>{
      console.log(res);
      let list = that.data.list;
      let data = res.data.data.map(v=>{
        let t = util.getToday(v.createtime);
        v.createtime = t.date + " " + t.time;
        v.c_no = v.c_no ? v.c_no : " ";
        return v;
      });
      list.push(...data);
      that.setData({
        list
      });
    });

  },
  // 跳转详情
  getDetail(e){
    let id = e.currentTarget.dataset.id;

    wx.navigateTo({
      url: '/pages/waitdeliverdetail/waitdeliverdetail?stockid=' + id,
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