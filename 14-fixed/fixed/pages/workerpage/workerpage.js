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

  },

  // init
  init(){

    // calculate height
    this.calculateHeight();

    // 获取用户信息
    let userInfo = this.data.userInfo ? this.data.userInfo : wx.getStorageSync('userinfo');
    util.post("/api/worker/getWorkerDetail", {
      users_id: userInfo.id
    }).then(res=>{
      let orderStatus = res.data.ordercount;
      that.setData({
        userInfo: res.data,
        orderStatus,
      });

      that.data.pageOption.userid = res.data.id;
      that.data.pageOption.status = res.data.ordercount[that.data.tabSelected].status;

      // 获取列表
      that.getList();

    });


  },

  // 取消订单
  cancel(e){

    util.post("/api/repair/cancelRepair", e.detail).then(res=>{
      if(res.code == 2001){
        util.showSuccess(res.msg, function(){
          // getStatus
          that.init();

          // 获取列表
          that.getList();
        });
      }
    });

  },

  // 获取列表
  getList(){
    util.post("/api/worker/getOrdersList", {
      users_id: that.data.pageOption.userid,
      status: that.data.pageOption.status
    }).then(res=>{
      let list = res.data;
      let orderStatus = that.data.orderStatus;
      orderStatus[that.data.tabSelected].count = list.length;
      that.setData({
        list,
        orderStatus
      });

      wx.stopPullDownRefresh({
        success: (res) => {},
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
    util.post("/api/repair/getRepairStatus", {users_id: that.data.pageOption.userid}).then(res=>{

      let orderStatus = [];

      for(let key in res.data){
        orderStatus.push(res.data[key]);
      }
      orderStatus = orderStatus.sort((a, b)=>a.status - b.status);

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
  async calculateHeight (){

    let sysHeight = wx.getSystemInfoSync().windowHeight;
    let headHeight = await new Promise((resolve, reject)=>{
      let query = wx.createSelectorQuery();
      query.select(".header").boundingClientRect();
      query.exec(res=>{
        resolve(res[0].height);
      });
    });
    let tabHeight = await new Promise((resolve, reject)=>{
      let query = wx.createSelectorQuery();
      query.select(".tab-box").boundingClientRect();
      query.exec(res=>{
        resolve(res[0].height);
      });
    });

    let contHeight = sysHeight - headHeight - tabHeight;

    that.setData({
      contHeight
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
    this.init();
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
    this.init();
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