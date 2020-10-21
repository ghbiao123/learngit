// pages/personalinfo/personalinfo.js
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

    this.init();
  },
  init() {
    let userid = wx.getStorageSync('userinfo').uid;
    util.post('/api/user/getUserInfo', {
      userid
    }).then(res => {
      console.log(res);
      wx.setStorage({
        data: res.data,
        key: 'userdata',
      })
      that.setData({
        userData: res.data
      });
    });
  },
  // 提交
  submit(e) {
    let data = e.detail.value;

    let needData = {
      username: '姓名',
      mobile: '手机号',
      region: '所在地区',
      address: '详细地址',
      buname: '户名',
      bank: '开户行',
      bankcard: '银行卡号',
    }

    for(let key in data){
      if(!data[key]){
        return util.showSuccess(needData[key]+'不能为空');
      }
    }

    let userInfo = wx.getStorageSync('userinfo');
    data.userid = userInfo.uid;
    data.avatar = userInfo.avatarUrl;
    util.post('/api/user/editUserInfo', data).then(res => {
      console.log(res);
      if (res.code == 1) {
        wx.setStorage({
          data: data,
          key: 'userdata',
        });
        return util.showSuccess(res.msg, function () {
          wx.navigateBack({
            delta: 1,
          });
        });
      } else {
        util.showSuccess(res.msg);
      }
    });

  },

  // regionChange
  regionChange(e) {
    let region = e.detail.value;
    this.setData({
      region
    })
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