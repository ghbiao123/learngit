// pages/qaquery/qaquery.js
let that;
let util = require('../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    choiceCange:['车主手机号', '车架号码', '车牌号'],
    idx: 0,
    placeholderText: '请输入车主手机号'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;


    // 获取富文本
    this.getRichText();
  },
  // 获取富文本
  getRichText(){
    util._post('/api/warrantyinfo/detail').then(res=>{
      that.setData({
        richTxt: res.detail
      });
    });
  },
  // picker的change事件
  getChoice(e){
    let idx = e.detail.value;
    let placeholderText = `请输入${this.data.choiceCange[idx]}`;
    this.setData({
      inputVal:'',
      idx,
      placeholderText
    });
  },
  // 提交事件
  submit(e){
    let value = e.detail.value.keyword;
    if(!value) return;
    if(this.data.idx==0){
      let reg = /^1[3-9]\d{9}$/;
      let isPhone = reg.test(value);
      if(!isPhone){
        return util.showSuccess('您的手机号有误');
      }
    }
    wx.navigateTo({
      url: `/pages/qaresult/qaresult?flag=${Number(this.data.idx)+1}&keyword=${value}`,
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