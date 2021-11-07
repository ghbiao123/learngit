// pages/manualresult/manualresult.js
let that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnText:"查询估价列表",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;

    // this.init();
  },
  init(){
    let t = 5;
    let timer = setInterval(function(){
      t--;
      if(t<0){
        clearInterval(timer);
        wx.redirectTo({
          url: '/pages/recyclelist/recyclelist',
        });
        return;
      }
      let str = `${t}s后跳转我的估价列表`;
      that.setData({
        btnText: str
      });
    }, 1000);
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