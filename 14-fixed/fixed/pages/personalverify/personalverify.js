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
      applypay_methodlist: "3"
    },
    payType: [
      {
        id: "0",
        name: "现结",
      },
      {
        id: "1",
        name: "月结",
      },
      {
        id: "2",
        name: "年结",
      },
    ],
    isShow: false,
    payMethod: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;

    wx.getStorage({
      key: 'verify',
      success(res){
        let reqData = res.data;
        let payMethod = "";
        if(reqData.applypay_methodlist != 3){
          payMethod = that.data.payType[reqData.applypay_methodlist].name;
        }

        that.setData({
          reqData,
          payMethod,
        });
      }
    });

  },

  // typeChange
  typeChange(e){
    console.log(e);
    let reqData = this.data.reqData;
    let payMethod = this.data.payMethod;
    reqData.applypay_methodlist = this.data.payType[e.detail.value].id;
    payMethod = this.data.payType[e.detail.value].name;

    this.setData({
      reqData,
      payMethod
    });

  },

  // submit
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
    if(this.data.isShow && this.data.reqData.applypay_methodlist==3){
      return util.showSuccess("请完选择支付方式");
    }
    let userInfo = wx.getStorageSync('userinfo');
    that.data.reqData.users_id = userInfo.id;
    util.post("/api/personal/updatePersonalData", that.data.reqData).then(res=>{
       
      if(res.code == 2001){
        // renzhenglist 
        // 认证成功之后修改storage

        wx.setStorage({
          data: that.data.reqData,
          key: 'verify',
        });

        util.showSuccess(res.msg, function(){
          wx.navigateBack({
            delta: 1,
          });
        });
        
        userInfo.renzhenglist = 1;
        wx.setStorage({
          data: userInfo,
          key: 'userinfo',
          success(){
            
          }
        });
      }

      util.showSuccess(res.msg);

    });
  },

  // inputText
  inputText(e){
    let key = e.currentTarget.dataset.key;
    this.data.reqData[key] = e.detail.value;
  },

  businessSuccess(e){
    console.log(e);
    this.data.reqData.company_name = e.detail.enterprise_name.text;

    util.post("/api/personal/checkCompany", {
      company_name: this.data.reqData.company_name
    }).then(res=>{
       
      if(res.code == 2001){
        // 后台维护了企业名称

        that.data.reqData.applypay_methodlist = 3;
        
        that.setData({
          isShow: false,
        });

      }else if(res.code == 3001){
        // 后台未维护企业名称
        that.setData({
          isShow: true
        });
      }
    });

    wx.uploadFile({
      filePath: e.detail.image_path,
      name: 'image',
      url: util.getSiteRoot() + "/index.php/api/personal/upload",
      success(ret) {
        let reqData = that.data.reqData;
        let url = util.getSiteRoot() + JSON.parse(ret.data).data.replace(/\\/g, "/");
        reqData.yingyeimage  = url;
        that.setData({
          reqData,
        });
      }
    });
  },

  // 获取营业执照
  getLicence(e){

    let key = e.currentTarget.dataset.key;

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
            reqData[key]  = url;
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