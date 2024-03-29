// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    phoneModal: false,
    userinfoModal: false,
    showMark: false
  },

  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  // 自定义弹窗事件
  getInfo(e) {
    console.log(e.detail)
  },
  // 小程序获取用户手机号事件
  getPhoneNumber(e) {
    console.log(e)
  },
  // 小程序获取用户头像昵称事件
  getUserProfile(e) {
    console.log('e', e)
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log('res', res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShareAppMessage: function () {

  }
})
