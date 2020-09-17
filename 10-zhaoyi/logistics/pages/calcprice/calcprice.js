// pages/makeorderonline/makeorderonline.js
let that;
let util = require("../../utils/util");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAgree: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;

    
  },
  // submit
  submit(e){
    // 判断是否同意协议
    if(!this.data.isAgree){
      return util.showSuccess('请同意电子运单契约条款');
    }
    let getGoodsSize = function(){
      return `${that.data.long}x${that.data.wide}x${that.data.high}`;
    }
    let data = {};
    data = {
      goodstype: that.data.goodsType,
      goodsweight: that.data.weight,
      reservetime: that.data.time,
      goodssize: getGoodsSize(),
      adder: that.data.sendCountry+','+that.data.receiveCountry,
      mailname: that.data.sendCountryAddress.name,
      mailphone: that.data.sendCountryAddress.phone,
      mailadder: that.data.sendCountryAddress.address,
      receiptname: that.data.receiveCountryAddress.name,
      receiptphone: that.data.receiveCountryAddress.phone,
      receiptadder: that.data.receiveCountryAddress.address,
      transport: that.data.transport,
    }

    for(let key in data){
      if(!data[key]){
        return util.showSuccess('请完善您的信息');
      }
    }

    let uid = wx.getStorageSync('userinfo').uid;
    data.userid = uid;
    console.log(data, Object.keys(data).length);

    util.post('/api/Order/addorder', data).then(res=>{
      console.log(res);
      if(res.code == 1){
        util.showSuccess(res.msg, function(){
          wx.navigateBack({
            delta: 1,
          });
          
        });
      }else{
        util.showError(res.msg);
      }
    });



  },
  // init data
  init(){
    // 商品类型
    util.post('/api/Xd/selecttype').then(res=>{
      that.setData({
        goodsTypeRange: res
      });
    });
    // 国家
    util.post('/api/Xd/selectadder').then(res=>{
      that.setData({
        sendCountryRange: res,
        receiveCountryRange: res
      });
    });
    // 运输方式
    util.post('/api/Xd/selectyunshu').then(res=>{
      that.setData({
        transportRange: res
      });
    });
    // 用户storage地址,
    // sendCountry,
    wx.getStorage({
      key: 'sendCountryAddress',
      success(res){
        that.setData({
          sendCountryAddress: res.data
        });
      }
    });
    // reveiveCountry
    wx.getStorage({
      key: 'receiveCountryAddress',
      success(res){
        that.setData({
          receiveCountryAddress: res.data
        });
      }
    });
    
  },
  // 检测是否同意协议
  checkAgreement(){
    let isAgree = !this.data.isAgree;
    this.setData({
      isAgree
    });
  },
  // 监听是否可以估价
  checkEvaluationValue(){
    function findIt(arr, key, val){
      return arr.filter(v=>{
        return v[key] == val;
      });
    }
    
    let needData = {
      huowuid: that.data.goodsType&&findIt(that.data.goodsTypeRange, 'name', that.data.goodsType)[0].id,
      adderid: that.data.receiveCountry&&findIt(that.data.receiveCountryRange, 'name', that.data.receiveCountry)[0].id,
      yunshuid: that.data.transport&&findIt(that.data.transportRange, 'name', that.data.transport)[0].id,
      weight: that.data.weight,
    }
    for(let key in needData){
      if(!needData[key]){
        return
      }
    }
    util.post('/api/Order/selectprice', needData).then(res=>{
      console.log(res);
      if(res.code == 1){
        that.setData({
          evaluationPrive: res.price
        });
      }
    });
  },
  // 监听文字输入
  textInput(e){
    let type = e.currentTarget.dataset.type;
    this.data[type] = e.detail.value;
    // 检测是否满足估价条件
    this.checkEvaluationValue();
  },
  // 商品类型picker
  goodsTypeChange(e){
    let val = e.detail.value;
    that.setData({
      goodsType: that.data.goodsTypeRange[val].name
    });

    // 检测是否满足估价条件
    this.checkEvaluationValue();
  },
  // 发件国家picker
  sendCountryChange(e){
    let val = e.detail.value;
    that.setData({
      sendCountry: that.data.sendCountryRange[val].name
    });
    // 检测是否满足估价条件
    this.checkEvaluationValue();
  },
  // 收件国家picker
  receiveCountryChange(e){
    let val = e.detail.value;
    that.setData({
      receiveCountry: that.data.receiveCountryRange[val].name
    });
    // 检测是否满足估价条件
    this.checkEvaluationValue();
  },
  // 运输方式picker
  transportChange(e){
    let val = e.detail.value;
    that.setData({
      transport: that.data.transportRange[val].name
    });
    // 检测是否满足估价条件
    this.checkEvaluationValue();
  },
  // 预约时间picker
  timeChange(e){
    let val = e.detail.value;
    let startTime = util.getToday().date.replace(/\//g, "-");
    that.setData({
      time: val,
      startTime
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

    // 初始化数据
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