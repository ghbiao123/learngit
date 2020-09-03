// pages/stafforderlist/stafforderlist.js
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
    let type = options.type;
    this.getList(type);
  },
  // 获取列表数据
  getList(type){
    console.log(type);
    let title = '';
    let url = '';
    switch(type){
      case "staff":{
        title = "工作人员订单";
      }
      break;
      case "send":{
        title = "待发货";
      }
      break;
      case "check":{
        title = "待验机";
      }
      break;
      case "done":{
        title = "已完成";
      }
      break;
      case "cancel":{
        title = "已取消";
      }
      break;
      case 'todoor': {
        title = '未上门订单';
      }
      break;
      case 'dealwith' : {
        title =  '未处理订单';
      }
      break;
      default:{
        title = "全部";
      }
    }
    wx.setNavigationBarTitle({
      title: title,
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