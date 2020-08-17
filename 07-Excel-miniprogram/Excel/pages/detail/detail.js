// pages/detail/detail.js
let that;
let mQuery = require("../../utils/mQuery");
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

    this.getDetail(options.id);
  },
  getDetail(id){
    let needData = [
      {key: "borrower", value: "客户名称"},
      {key: "cate", value: "资产种类"},
      {key: "city", value: "资产所在地"},
      {key: "address", value: "资产详细地址"},
      {key: "count", value: "面积（平方米）"},
      {key: "price", value: "原评估价值/最新评估价值"},
      {key: "situation", value: "优先权情况"},
      {key: "seizure", value: "有无第三方查封"},
      {key: "management", value: "预计可处置时间"},
      {key: "manager", value: "管护人员名称"},
      {key: "managerphone", value: "管护人员联系方式"},
    ];

    mQuery.getQuery("api/info/detail",{info_id:id}).then(res=>{
    
      let detail = res.data;
      needData = needData.map(v=>{
        v.info = detail[v.key];
        return v;
      });
      this.setData({
        needData
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})