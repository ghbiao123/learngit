// pages/orderlist/orderlist.js
let that;
let util = require("../../utils/util");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabSelected: 0,
    filter: false
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;

    this.data.pageOption = options;

    // init
    this.init();
  },

  // init
  init(){

    // calculate height
    this.calculateHeight();

    // getStatus
    this.getStatus();

    // 获取列表
    this.getList();

  },

  // 获取列表
  getList(){
    util.post("/api/orders/getOrdersList", {
      users_id: that.data.pageOption.userid,
      status: that.data.pageOption.status
    }).then(res=>{
      console.log(res);
      let list = res.data;
      that.setData({
        list
      });
    });
  },
  // getMoreList
  getMoreList(){

  },

  // getTab
  getTab(e){
    let tabSelected = e.currentTarget.dataset.idx;

    this.data.pageOption.status = this.data.orderStatus[tabSelected].status;
    this.getList();

    that.setData({
      tabSelected,
      filter: false
    });

  },

  // showFilter
  showFilter(e){
    that.setData({
      filter: true
    });
  },

  // get status
  getStatus(){
    util.post("/api/orders/getStatusList", {users_id: that.data.pageOption.userid}).then(res=>{
      let data = res.data.sort((a, b) => {
        return a.status - b.status;
      });

      let orderStatus = [
        {name: "已下单", status: data[3].status, count: data[3].count},
        {name: "合同确认", status: data[5].status, count: data[5].count},
        {name: "已预付款", status: data[6].status, count: data[6].count},
        {name: "维修中", status: data[9].status, count: data[9].count},
        {name: "维修完成", status: data[10].status, count: data[10].count},
        {name: "已付余款", status: data[11].status, count: data[11].count},
        {name: "订单完成", status: data[13].status, count: data[13].count},
        {name: "已取消", status: data[0].status, count: data[0].count},
      ];

      let tabSelected;
      orderStatus.filter((v,i)=> {
        if(v.status == that.data.pageOption.status){
          tabSelected = i;
        }
        return false
      });

      that.setData({
        orderStatus,
        tabSelected
      });

      wx.stopPullDownRefresh({
        success: (res) => {},
      });
    });
  },

  // calculate height
  calculateHeight(){
    let sysHeight = wx.getSystemInfoSync().windowHeight;
    let query = wx.createSelectorQuery();
    query.select(".tab-box").boundingClientRect();
    query.exec(res=>{
      let contHeight = sysHeight - res[0].height;
      that.setData({
        contHeight
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
    // getStatus
    this.getStatus();
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