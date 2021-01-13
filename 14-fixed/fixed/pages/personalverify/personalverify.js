// pages/personalverify/personalverify.js
let util = require("../../utils/util");
let that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reqData: {
      sfzimages: "",
      name: "",
      sfzh: "",
      company_name: "",
      yingyeimage: "",
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;


  },

  submit(){
    console.log(that.data.reqData);
    let data = that.data.reqData;
    let needData = {
      sfzimages: "",
      name: "",
      sfzh: "",
      company_name: "",
      yingyeimage: "",
    }
    for(let key in needData){
      if(!data[key]) {
        return util.showSuccess("请完善信息");
      }
    }

    util.post("/api/personal/updatePersonalData", that.data.reqData).then(res=>{
      console.log(res);
    });
  },

  // inputText
  inputText(e){
    let key = e.currentTarget.dataset.key;
    this.data.reqData[key] = e.detail.value;
  },

  // 获取营业执照
  getLicence(){
    wx.chooseImage({
      count: 1,
      success(res) {
        let v = res.tempFilePaths[0];
        wx.uploadFile({
          filePath: v,
          name: 'image',
          url: util.getSiteRoot() + "/index.php/api/personal/upload",
          success(ret) {
            let reqData = that.data.reqData;
            let url = util.getSiteRoot() + JSON.parse(ret.data).data.replace(/\\/g, "/");
            reqData.yingyeimage = url;
            that.setData({
              reqData,
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