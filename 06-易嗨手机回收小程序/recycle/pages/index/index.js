let util = require("../../utils/util");
let that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:["手机", "平板", "电脑", "摄影摄像", "其他产品",]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    wx.getSystemInfo({
      success: (result) => {
        console.log(result);
      },
    });

    // init
    this.initData();
  },
  // 跳转估价页面
  getEvaluation(e){
    let idx = e.currentTarget.dataset.id;
    let cid = e.currentTarget.dataset.cid;
    if(cid>=4){
      wx.navigateTo({
        url: '/pages/evaluation/othercalcprice',
      });
      return
    }
    wx.navigateTo({
      url: `/pages/evaluation/evaluation?id=${idx}&cid=${cid}`,
    });
  },
  // 跳转不同估价页面
  getDiffPage(e){
    let id = e.currentTarget.dataset.id;
    if(id<4){
      wx.navigateTo({
        url: '/pages/search/search?id='+id,
      });
    }else if(id>=4){
      wx.navigateTo({
        url: '/pages/evaluation/othercalcprice?id='+id,
      });
    }
  },
  // 初始化数据
  initData(){
    util.post('/api/index/indexContent').then(res=>{
      res.data.banner = util.getImageFullUrl(res.data.banner, 'picture').map(v=>v.picture);
      res.data.category = util.getImageFullUrl(res.data.category, 'image');
      res.data.hotmodel = util.getImageFullUrl(res.data.hotmodel, 'image');
      that.setData({
        init: res.data
      });
    });
  },

  // 跳转加价券页面
  receiveCoupon(){
    wx.navigateTo({
      url: '/pages/coupon/coupon?type=add',
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