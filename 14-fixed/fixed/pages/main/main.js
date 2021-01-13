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
  init(){
    let userInfo = this.data.userInfo ? this.data.userInfo : wx.getStorageSync('userinfo');

    if(!userInfo) return;

    util.post("/api/orders/getStatusList", {users_id: userInfo.id}).then(res=>{
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

  },
  // 跳转列表
  getList(e){
    let status = e.currentTarget.dataset.status;

    if(!this.data.isLogin) return util.showSuccess("请您先登录");

    wx.navigateTo({
      url: `/pages/orderlist/orderlist?status=${status}&userid=${that.data.userInfo.id}`,
    });


  },

  // getFixList
  getFixList(){


  },
  // 申请成为师傅
  applyWoker(){

  },

  // 获取手机号
  getPhoneNumber(e){

    /**
     *  staffnum 员工编号
        renzhenglist   0=未认证  1 等于认证
     */

    let data = {
      id: 1,
      name: "测试",
      phone: "15165485670",
      sfzh: "370982199407213875",
      staffnum: 123456,
      company_name: "阿里巴巴",
      company_address: "创智谷",
      renzhenglist: "1",
      renzhenglist_text: "Renzhenglist 1",
      jueselist_text: "",
      pay_methodlist_text: "",
      headimage: "http://equipment.do/uploads/20210108/32b1d7da3f7d03e5a18e7293f33a6133.png"
    }

    that.setData({
      isLogin: true,
      userInfo: data
    });

    wx.setStorage({
      data: data,
      key: 'userinfo',
    });


    return;
    util.getUserInfo(e, function(res){
      console.log(res);
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