// pages/makeorderonline/makeorderonline.js
let that;
let util = require("../../utils/util");
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

    // 初始化数据
    this.init();
  },
  // init data
  init(){
    // 商品类型
    util.post('/api/Xd/selecttype').then(res=>{
      console.log("商品类型", res);
      that.setData({
        goodsTypeRange: res
      });
    });
    // 国家
    util.post('/api/Xd/selectadder').then(res=>{
      console.log("国家", res);
    });
    // 运输方式
    util.post('/api/Xd/selectyunshu').then(res=>{
      console.log("运输方式", res);
    });
  },
  // 监听文字输入
  textInput(e){
    let type = e.currentTarget.dataset.type;
    console.log(type);
  },
  // 商品类型pickerChange
  goodsTypeChange(e){
    let val = e.detail.value;
    console.log(val);
    that.setData({
      goodstype: that.data.goodsTypeRange[val].name
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