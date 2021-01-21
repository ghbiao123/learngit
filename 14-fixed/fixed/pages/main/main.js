// pages/main/main.js
let that;
let util = require("../../utils/util");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;

  },
  // 数据初始化
  init() {
    let userInfo = this.data.userInfo ? this.data.userInfo : wx.getStorageSync('userinfo');

    if (!userInfo) return;

    util.post("/api/orders/getStatusList", {
      users_id: userInfo.id
    }).then(res => {
      let orderStatus = res.data.sort((a, b) => {
        return a.status - b.status;
      });

      that.setData({
        orderStatus
      });

      wx.stopPullDownRefresh({
        success: (res) => {},
      });
    });

    util.post("/api/wxlogin/getUserData", {
      users_id: userInfo.id
    }).then(res => {

      that.setData({
        userInfo: res.data
      });

    });

  },
  // 跳转列表
  getList(e) {
    if (!this.data.isLogin) return util.showSuccess("请您先登录");
    let status = e.currentTarget.dataset.status;


    wx.navigateTo({
      url: `/pages/orderlist/orderlist?status=${status}&userid=${that.data.userInfo.id}`,
    });


  },

  // getFixList
  getFixList() {
    if (!this.data.isLogin) return util.showSuccess("请您先登录");

    wx.navigateTo({
      url: `/pages/fixlist/fixlist?userid=${that.data.userInfo.id}&status=0`,
    });

  },
  // 申请成为师傅
  applyWoker() {
    if (!that.data.userInfo) return util.showSuccess("请您先登录");
    let status = that.data.userInfo.jueselist;

    if (status == 2) {
      // 已成为师傅

      wx.navigateTo({
        url: '/pages/workerpage/workerpage',
      });

    }

    if (status == 1) {
      // 申请成为师傅

      wx.navigateTo({
        url: '/pages/applyworker/applyworker',
      });

    }

  },

  // 更新用户信息
  updateUserData() {

  },

  // 获取手机号
  getPhoneNumber(e) {
    console.log(e);
    /**
     *  staffnum 员工编号
        renzhenglist   0=未认证  1 等于认证
     */

    util.getUserInfo(e, function (res) {
      console.log(res);

      if (res.code == 2001) {

        let data = res.data;
        data.sfzimages = data.sfzimages ? data.sfzimages.split(",") : '';
        data.certimages = data.certimages ? data.certimages.split(",") : '';
        data.cardimage = data.cardimage ? data.cardimage.split(",") : '';
        data.yingyeimage = data.yingyeimage ? data.yingyeimage.split(",") : '';

        that.setData({
          isLogin: true,
          userInfo: data
        });

        wx.setStorage({
          data: data,
          key: 'userinfo',
          success(){
            if(!data.name){
              wx.navigateTo({
                url: '/pages/changeperinfo/changeperinfo',
              });
            }
          }
        });
        that.init();
      } else {
        util.showSuccess(res.msg);
      }
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
    util.checkIsLogin.call(this);

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