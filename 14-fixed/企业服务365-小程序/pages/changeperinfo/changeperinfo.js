// pages/changeperinfo/changeperinfo.js
let util = require("../../utils/util");
let that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;


    wx.getStorage({
      key: 'userinfo',
      success(res){
        let userInfo = res.data;
        let avatar = userInfo.headimage;
        that.setData({
          userInfo,
          avatar
        });
      }
    });

  },

  // submit
  submit(e){
    let data = e.detail.value;
    data.users_id = this.data.userInfo.id;
    data.headimage = this.data.avatar;
    util.post("/api/personal/updatePersonalData", data).then(res=>{
      if(res.code == 2001){
        util.showSuccess(res.msg, function(){
          let userInfo = Object.assign(that.data.userInfo, data);
          wx.setStorage({
            data: userInfo,
            key: 'userinfo',
            success(){
              wx.navigateBack({
                delta: 1,
              });
            }
          });

        });
      }else{
        util.showSuccess(res.msg);
      }
    });
  },

  // 选择头像
  getAvatar() {
    wx.chooseImage({
      count: 1,
      success(res) {
        let v = res.tempFilePaths[0];
        wx.uploadFile({
          filePath: v,
          name: 'image',
          url: util.getSiteRoot() + "/index.php/api/personal/upload",
          success(ret) {
            let url = util.getSiteRoot1() + JSON.parse(ret.data).data.replace(/\\/g, "/");
            that.setData({
              avatar: url
            });
          }
        });
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