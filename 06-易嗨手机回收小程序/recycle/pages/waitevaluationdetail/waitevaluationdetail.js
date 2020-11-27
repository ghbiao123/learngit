// pages/waitevaluationdetail/waitevaluationdetail.js
let that;
let util = require("../../utils/util");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowPrompt: false,
    btnText: "点击填写预估价格"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    this.data.staffid = wx.getStorageSync('staffid');
    this.data.aoid = options.aoid;
    util.post("/api/order/assessOrderDetail", {
      staffid: that.data.staffid,
      aoid: that.data.aoid,
    }).then(res=>{
      console.log(res);
      res.data.configure = res.data.configure.replace(/；/g, "\n");
      res.data.describe = res.data.describe.replace(/；/g, "\n");
      that.setData({
        detail: res.data
      });
    });
  },

  // 估价
  evaluationPrice(e){
    this.setData({
      isShowPrompt: true
    });
  },
  // 确认价格
  getPrice(e){
    let amount = Number(e.detail);
    if(!amount) return util.showSuccess('请输入正确价格');
    util.post("/api/order/doAssessBys", {
      amount,
      staffid: that.data.staffid,
      aoid: that.data.aoid
    }).then(res=>{
      console.log(res);
      if(res.code == 1){

        that.setData({
          btnText: `￥${amount}`
        });
        return util.showSuccess(res.msg);
      }
      if(res.code == -1){
        return util.showSuccess(res.msg);
      }
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