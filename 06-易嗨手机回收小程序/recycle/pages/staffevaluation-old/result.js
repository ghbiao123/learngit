// pages/evaluation/result.js
let that;
let util = require('../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected: 1,
    timeSelected: ["10:00", "14:00", "14:00", "14:00", "14:00", ],
    pageOption: {},
    price: 0,
    totalPrice: 0,
    couponPrice: 0,
    inputDoorData: {},
    inputExpressData: {},
    isCoupon: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    this.data.pageOption = options;
  },
  inputText(e) {
    let key = e.currentTarget.dataset.key;
    let selected = e.currentTarget.dataset.selected;
    let val = e.detail.value;
    if (selected == 1) {
      this.data.inputDoorData[key] = val;
    } else if (selected == 2) {
      this.data.inputExpressData[key] = val;
    }

  },
  // 扫码
  scanCode(e) {
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        that.data.staffid = res;
         
      }
    });
  },
  // 点击是否启用回收加价券
  chooseCoupon() {
    let isCoupon = !this.data.isCoupon;
    if (isCoupon) {
      this.data.totalPrice = this.data.price + this.data.couponPrice;
    } else {
      this.data.totalPrice = this.data.price;
    }
    this.setData({
      totalPrice: that.data.totalPrice,
      isCoupon,
    });
  },

  // 回收
  recycle() {
    // request data
    let data = {};

    let userInfo = wx.getStorageSync('userinfo');
    // 检测登录 userid 1
    if (!userInfo) {
      return util.showError('请您登录', function () {
        wx.navigateTo({
          url: '/pages/login/login',
        });
      });
    }

    // 登录后得到userid
    data.userid = userInfo.uid;

    // 是否是扫码获取工作人员id
    if (this.data.staffid) {
      data.staffid = this.data.staffid;
    }

    // 检测是否完善个人信息
    let userData = wx.getStorageSync('userdata');
    if (!userData) {
      return util.showError('请您登录', function () {
        wx.navigateTo({
          url: '/pages/personalinfo/personalinfo',
        });
      });
    }

    // 加价券 couponid 1
    let coupon = wx.getStorageSync('coupon');
    // 得到加价券id
    if (coupon && this.data.isCoupon) {
      data.couponid = coupon.id;
    }

    // currentmachine 当前机型 cid mid configureinfo describeinfo 4
    let currentMachine = wx.getStorageSync('currentmachine');
    // 得到 cid mid configureinfo describeinfo
    let needId = ['phonecolor', 'phonestorage', 'phonemodel', 'pcconfigure', 'pcram', 'pcssd', 'pcvideocard'];
    data.configureinfo = [];
    data.describeinfo = [];
    for (let key in currentMachine) {
      if (needId.indexOf(key) >= 0) {
        data.configureinfo.push(currentMachine[key]);
      }
    }
    if (currentMachine.inquiryinfo) {
      let describeinfo = JSON.parse(currentMachine.inquiryinfo).map(v => {
        return v.id
      });
      data.describeinfo = describeinfo;
    }

    currentMachine.cid && (data.cid = currentMachine.cid);
    currentMachine.mid && (data.cid = currentMachine.mid);
    // currentMachine.mid&&(data.configureinfo = currentMachine.mid);
    // currentMachine.mid&&(data.describeinfo = currentMachine.mid);


    // recoverytype this.data.selected 1
    // 得到回收方式
    data.recoverytype = this.data.selected;

    // this.data.pageOption  estimatefee estimatetype assessorderid 3
    // 得到  estimatefee estimatetype assessorderid
    data.estimatefee = this.data.totalPrice;
    data.estimatetype = this.data.pageOption.frompage == 'evaluation' ? 0 : 1;
    this.data.pageOption.orderid && (data.assessorderid = this.data.pageOption.orderid);

    // 用户手动填写信息
    if (this.data.selected == 1) {
      data.dtdtime = this.data.orderDate + ' ' + this.data.orderTime;
      if(!data.dtdtime){
        return util.showSuccess('请填写预约时间');
      }
      Object.assign(data, this.data.inputDoorData);
    } else if (this.data.selected == 2) {
      Object.assign(data, this.data.inputExpressData);
    }
    data.uaddress = this.data.userRegion.join(',') + ' ' + data.uaddress;
    let needKey = {
      uname: '',
      uphone: '',
      uaddress: '',
      ubank: '',
      ubankcard: '',
    }
    for(let key in needKey){
      if(!data[key]){
        return util.showSuccess('请完善您的个人信息');
      }
    }
    util.post('/api/order/placeOrder', data).then(res => {
       
      if (res.code == 1) {

        wx.removeStorage({
          key: 'currentmachine',
        });
        wx.removeStorage({
          key: 'coupon',
        });

        wx.showModal({
          cancelColor: '#000000',
          cancelText: '返回',
          title: '提示',
          confirmText: '查看订单',
          content: res.msg,
          success(res) {
            if (res.confirm) {
              wx.switchTab({
                url: '/pages/order/order',
              });
            }
            if (res.cancel) {
              wx.switchTab({
                url: '/pages/index/index',
              });
            }
          }
        });

        // util.showSuccess(res.msg, function(){
        //   wx.switchTab({
        //     url: '/pages/index/index',
        //   });
        // });
      }
    });


  },
  editUserData() {
    wx.navigateTo({
      url: '/pages/personalinfo/personalinfo',
    });
  },
  // init()
  init() {

    let data = this.data.pageOption;

    wx.setNavigationBarTitle({
      title: data.name,
    });


    let coupon = wx.getStorageSync('coupon');

    this.data.couponPrice = Number(coupon.parvalue) || 0;
    this.data.price = Number(data.price);
    this.data.totalPrice = this.data.couponPrice + this.data.price;

    this.setData({
      price: this.data.price,
      totalPrice: this.data.totalPrice,
      couponPrice: this.data.couponPrice,
    });


    // 回收平台邮寄地址
    util.post('/api/user/getPlatforminfo').then(res => {
      that.setData({
        platformInfo: res.data
      });
    });

    // 获取用户信息
    let userInfo = wx.getStorageSync('userinfo');
    if (userInfo) {
      util.post('/api/user/getUserInfo', {
        userid: userInfo.uid
      }).then(res => {
         
        if (res.code == 1) {
          wx.setStorage({
            data: res.data,
            key: 'userdata',
          });
        }
      });
    } else {}


  },
  // 使用个人信息
  usingUserInfo() {
    // 获取storage
    // 使用了个人信息
    function initUserInfo(data) {
      let o = {
        uname: data.username,
        uphone: data.mobile,
        ubankcard: data.bankcard,
        ubank: data.bank,
        uaddress: data.address,
      }
      that.data.userRegion = data.region.split(',');
      Object.assign(that.data.inputDoorData, o);
      Object.assign(that.data.inputExpressData, o);
    }
    wx.getStorage({
      key: 'userdata',
      success(res) {
        initUserInfo(res.data);
        that.setData({
          userData: res.data
        });
      },
      fail() {
        let userinfo = wx.getStorageSync('userinfo');
        if (!userinfo) return;
        util.post('/api/user/getUserInfo', {
          userid: userinfo.uid
        }).then(res => {
           
          if (res.code == 1) {
            initUserInfo(res.data);
            wx.setStorage({
              data: res.data,
              key: 'userdata',
            })
            that.setData({
              userData: res.data
            });
          } else if (res.code == -1) {
            util.showSuccess('请您先完善您的个人信息');
          }
        });
      }
    });
  },
  // tab 点击事件, 切换回收类型
  getSelected(e) {
    let selected = e.currentTarget.dataset.id;
    this.setData({
      selected
    });
  },
  // regionChange 
  regionChange(e) {
    let userRegion = e.detail.value;
    this.setData({
      userRegion
    });
  },
  // radios chang 事件
  radioChange(e) {
  },
  // 选择日期
  dateChange(e) {
    let orderDate = e.detail.value;
    this.setData({
      orderDate
    });
  },
  // 选择时间
  timeChange(e) {
    let orderTime = this.data.timeSelected[e.detail.value];
    this.setData({
      orderTime
    });
  },
  // 重新询价
  resetPrice(e) {
    // wx.navigateBack();
    // wx.redirectTo({
    //   url: '/pages/evaluation/evaluation',
    // });
    wx.navigateBack()
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