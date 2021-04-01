// pages/remarklist/remarklist.js
let util = require("../../utils/util");
let that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reqData: {},
    reqApi: {
      get: "",
      post: ""
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;

    this.data.reqData.orderid = options.orderid;
    this.data.pageOption = options;
    if (options.frompage&&options.frompage == "evaluated"){
      // 已估价订单API
      this.data.reqApi = {
        get: "/api/order/assessOrderRemarkList",
        post: "/api/order/updateAssessOrderRemark"
      }
    }else{
      // 待验机订单API
      this.data.reqApi = {
        get: "/api/order/orderRemarkList",
        post: "/api/order/updateOrderRemark"
      }

    }

    this.init();

  },
  // 初始化
  init(){

    let data = {};
    data.staffid = wx.getStorageSync('staffid');
    data.orderid = this.data.reqData.orderid;

    if (this.data.pageOption.frompage&&this.data.pageOption.frompage == "evaluated"){
      delete data.orderid;
      data.assessid = this.data.reqData.orderid;
    }

    util.post(this.data.reqApi.get, data).then(res=>{
       
      let list = res.data.map(v=>{
        let t = util.getToday(v.createtime * 1000);
        v.createtime = t.date + " " + t.time;
        return v;
      });
      that.setData({
        list
      });
    });


  },
  // 备注内容
  textareaInput(e){
    this.data.reqData.remark = e.detail.value;
  },
  // 确认备注
  confirmRemark(e){
    if(!this.data.reqData.remark){
      return util.showSuccess("请输入您的备注");
    }
    this.data.reqData.staffid = wx.getStorageSync('staffid');

    if (this.data.pageOption.frompage&&this.data.pageOption.frompage == "evaluated"){
      this.data.reqData.assessid = this.data.reqData.orderid;
      delete this.data.reqData.orderid;
    }

    util.post(this.data.reqApi.post, this.data.reqData).then(res=>{
       
      let list = this.data.list;
      let t = util.getToday();
      let data = {
        remark: that.data.reqData.remark,
        createtime: t.date + " " + t.time
      }
      list.unshift(data);
      that.setData({
        list,
        textarea: ""
      });

      return util.showSuccess(res.msg);
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