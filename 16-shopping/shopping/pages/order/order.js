// pages/order/order.js
let that;
let util = require("../../utils/util");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arrTitle:[
      {name: "全部订单", id: "9"},
      {name: "待付款", id: "1"},
      {name: "已完成", id: "2"},
    ],
    goodsList: {
      list: [],
      reqData: {
        userid: 0,
        status: 9,
        page: 1
      },
      isMore: true
    },
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    that = this;
    let type = options.type ? options.type : 0;
    this.data.goodsList.reqData.status = this.data.arrTitle[type].id;

    this.setData({
      type
    });


    this.init();
  },

  init(){

    let userInfo = wx.getStorageSync('userinfo');
    if(!userInfo){
      return util.showSuccess("请您先登录", function(){
        wx.navigateBack();
      });
    }

    this.data.goodsList.reqData.userid = userInfo.userid;

    this.getGoodsList();
  },
  getSelected(e){
    console.log(e);
    this.data.goodsList.reqData.status = e.detail.id;
    this.data.goodsList.reqData.page = 1;
    this.data.goodsList.list = [];
    this.data.goodsList.isMore = true;

    this.getGoodsList();
  },
  // util.post("/api/order/userOrderList", this.data.reqData).then(res=>{
    getGoodsList(){
      let goodsList = this.data.goodsList;
      if(!goodsList.isMore){
        return util.showSuccess('已加载所有订单');
      }
      util.post("/api/order/userOrderList", goodsList.reqData).then(res=>{
        if(res.data.current_page == res.data.last_page){
          goodsList.isMore = false;
        }else{
          goodsList.reqData.page++;
        }
        console.log(res);
        goodsList.list.push(...res.data.data);
  
        that.setData({
          goodsList
        });
  
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
    this.getGoodsList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})