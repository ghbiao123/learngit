// pages/coupon/coupon.js
let that;
let util = require('../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:'',
    arrIsGot: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;

    this.data.type = options.type;

    this.data.available = options.available;

    this.data.fromPage = options.page;

    console.log(options);

  },
  // 使用加价券
  useCoupon(e){
    let idx = e.currentTarget.dataset.id;
    let item = this.data.list[idx];
    if(item.status == 0){
      // 加价券未使用，用户要使用，添加到本地storage，coupon
      wx.setStorage({
        data: item,
        key: 'coupon',
        success(){
          // 跳转其他页面
          let url = '';
          if(that.data.fromPage == 'result'){
            url = `/pages/evaluation/result`;
            wx.navigateBack({
              delta: 1,
            });
            return;
          }else if(that.data.fromPage == 'mine'){
            url = `/pages/search/search`;
          }
         wx.redirectTo({
           url: url,
         });
        }
      });
    }
  },
  // 用户手动领取加价券
  getCoupon(e){
    let arrIsGot = this.data.arrIsGot;
    let idx = e.currentTarget.dataset.id;

    if(arrIsGot[idx]){

      wx.redirectTo({
        url: '/pages/search/search',
      });

      return;
    }

    let mcid = this.data.list[idx].id;
    let userid = this.data.userInfo.uid;
    util.post('/api/products/userDoCoupon', {mcid, userid}).then(res=>{
      arrIsGot[idx] = true;
      that.setData({arrIsGot});
      return util.showSuccess(res.msg);
    });
  },
  // init data
  init(){
    let type = this.data.type;
    let isLogin = util.checkIsLogin.call(this);
    if(!isLogin){
      return util.showError('请您先登录', function(){
        wx.navigateTo({
          url: '/pages/login/login',
        });
      });
    }

    let url, 
      data = {},
      arrIsGot = this.data.arrIsGot;
    if(type == 'add'){
      // 领取加价券
      url = '/api/products/markupCouponList';
      data.userid = isLogin.uid;
    }else if(type == 'mine'){
      // 用户的加价券
      url = '/api/user/userMarkupCoupon';
      data.userid = isLogin.uid;
      this.data.available&&(data.available = this.data.available);
    }

    util.post(url, data).then(res=>{
      console.log(res);
      let list = [];
      if(type == 'add'){
        // 领取加价券数据处理
        list = res.data.map(v=>{
          v.validstime_text = v.validstime_text.replace(/\-/g, "\/");
          v.validetime_text = v.validetime_text.replace(/\-/g, "\/");
          // v.isGot = false;
          arrIsGot.push((v.usercoupon_count==0? false:true));
          return v;
        });
      }else if(type == 'mine'){
        list = res.data.map(v=>{

          return v;
        });
      }
      that.setData({
        list,
        type,
        arrIsGot
      });
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