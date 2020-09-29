// pages/evaluation/result.js
let that;
let util = require('../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected:1,
    timeSelected:["10:00", "14:00", "14:00", "14:00", "14:00",],
    pageOption: {},
    price: 0,
    totalPrice: 0,
    couponPrice: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    this.data.pageOption = options;
  },
  // 回收
  recycle(){
    // request data
    let data = {};
    
    let userInfo = wx.getStorageInfoSync('userinfo');
    // 检测登录 userid 1
    if(!userInfo){
      return util.showError('请您登录', function(){
        wx.navigateTo({
          url: '/pages/login/login',
        });
      });
    }

    // 登录后得到userid
    data.userid = userInfo.uid;

    // 检测是否完善个人信息
    let userData = wx.getStorageInfoSync('userdata');
    if(!userData){
      return util.showError('请您登录', function(){
        wx.navigateTo({
          url: '/pages/personalinfo/personalinfo',
        });
      });
    }

    // 加价券 couponid 1
    let coupon = wx.getStorageInfoSync('coupon');
    // 得到加价券id
    data.couponid = coupon.id;

    // currentmachine 当前机型 cid mid configureinfo describeinfo 4
    let currentMachine = wx.getStorageSync('currentmachine');
    // 得到 cid mid configureinfo describeinfo



    // recoverytype this.data.selected 1
    // 得到回收方式
    data.recoverytype = this.data.selected;
    
    // this.data.pageOption  estimatefee estimatetype assessorderid 3
    // 得到  estimatefee estimatetype assessorderid



  },
  editUserData(){
    wx.navigateTo({
      url: '/pages/personalinfo/personalinfo',
    });
  },
  // init()
  init(){

    let data = this.data.pageOption;

    wx.setNavigationBarTitle({
      title: data.name,
    });


    let coupon = wx.getStorageSync('coupon');

    this.data.couponPrice = Number(coupon.parvalue);
    this.data.price = Number(data.price);
    this.data.totalPrice = this.data.couponPrice + this.data.price;

    this.setData({
      price: this.data.price,
      totalPrice: this.data.totalPrice,
      couponPrice: this.data.couponPrice,
    });

    // 获取storage

    wx.getStorage({
      key: 'userdata',
      success(res){
        that.setData({
          userData: res.data
        });
      },
      fail(){
        util.showSuccess('请完善您的个人信息');
      }
    });

    // 回收平台邮寄地址
    util.post('/api/user/getPlatforminfo').then(res=>{
      that.setData({
        platformInfo: res.data
      });
    });


  },
  // tab 点击事件, 切换回收类型
  getSelected(e){
    let selected = e.currentTarget.dataset.id;
    this.setData({
      selected
    });
  },
  // radios chang 事件
  radioChange(e){
    console.log(e.detail.value);
  },
  // 选择日期
  dateChange(e){
    let orderDate = e.detail.value;
    this.setData({orderDate});
  },
  // 选择时间
  timeChange(e){
    let orderTime = this.data.timeSelected[e.detail.value];
    this.setData({orderTime});
  },
  // 重新询价
  resetPrice(e){
    // wx.navigateBack();
    wx.redirectTo({
      url: '/pages/evaluation/evaluation',
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
    // init data
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