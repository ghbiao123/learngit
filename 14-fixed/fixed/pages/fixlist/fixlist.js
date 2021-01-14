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
    util.post("/api/repair/getRepairList", {
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