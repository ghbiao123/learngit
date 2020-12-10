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
    reQuery: true,
    isGetExpress: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    this.data.pageOption = options;

    // this.data.pageOption.name = this.data.pageOption.name.replace(/iphone/ig, '苹果');

    // 工作人员扫码估价不可重新询价
    if (options.frompage && options.frompage == 'recyclelist') {
      this.setData({
        reQuery: false,
      });
    }

    // onload init ()
    this.onLoadInit();


  },
  // onload init ()
  onLoadInit() {
    // get parma
    let data = this.data.pageOption;
    // user id
    let userid = wx.getStorageSync('userinfo').uid;

    util.post("/api/order/doOrderInfo", {
      userid,
      pricevalue: data.price
    }).then(res => {
      console.log(res);

      let info = res.data;

      // 将coupon挂载到全局
      that.data.coupon = info.cinfo;

      that.data.couponPrice = Number(info.cinfo.par_value) || 0;
      that.data.price = Number(data.price);
      that.data.totalPrice = that.data.couponPrice + that.data.price;

      let regionData = info.uinfo_h.region ? info.uinfo_h.region.split(",") : [];
      let provence = regionData[0],
        city = regionData[1],
        country = regionData[2];
      let freight = util.getImageFullUrl(info.freight);
      that.setData({
        price: that.data.price,
        totalPrice: that.data.totalPrice,
        couponPrice: that.data.couponPrice,
        userData: info.uinfo_h,
        provenceList: info.plist,
        provence,
        city,
        country,
        freight
      });
      initUserInfo(info.uinfo_h);

      function initUserInfo(data) {
        let o = {
          uname: data.username,
          uphone: data.mobile,
          ubankcard: data.bankcard,
          ubank: data.bank,
          uaddress: data.address,
          uregion: data.region,
          ubname: data.bank_uname
        }

        that.data.userRegion = data.region.split(',');
        Object.assign(that.data.inputDoorData, o);
        Object.assign(that.data.inputExpressData, o);

      }

    });
  },
  // 是否显示快递回收上门服务
  getExpress(e) {
    let val = e.detail.value[0];
    console.log(val);
    if (!val) {
      this.setData({
        isGetExpress: false
      });
    } else {
      this.setData({
        isGetExpress: true
      });
    }
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
        that.data.staffid = res.result;
        console.log(res);
        util.showSuccess('扫码成功');
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

    if (this.data.order) {
      if (this.data.order.otype && this.data.order.otype == 1 && !this.data.staffid) {
        return util.showError('请扫工作人员二维码再进行提交');
      } else if (this.data.order.otype && this.data.order.otype == 1) {
        if (this.data.staffid) {
          data.staffid = this.data.staffid;
        }
      }
    }
    if (this.data.pageOption.otype) {
      if (this.data.pageOption.otype == 1 && !this.data.staffid) {
        return util.showError('请扫工作人员二维码再进行提交');
      } else if (this.data.pageOption.otype == 1) {
        if (this.data.staffid) {
          data.staffid = this.data.staffid;
        }
      }
    }

    // 检测是否完善个人信息
    // let userData = wx.getStorageSync('userdata');
    // if (!userData) {
    //   return util.showError('请您登录', function () {
    //     wx.navigateTo({
    //       url: '/pages/personalinfo/personalinfo',
    //     });
    //   });
    // }

    // 加价券 couponid 1
    let coupon = that.data.coupon;
    // 得到加价券id
    // order.coupon_fee = res.data.cinfo.par_value ? res.data.cinfo.par_value : 0;
    if (coupon.mcid && this.data.isCoupon) {
      data.couponid = coupon.mcid;
    }else{
      data.couponid = 0;
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
    // console.log(JSON.parse(currentMachine.inquiryinfo));
    if (currentMachine.inquiryinfo) {
      let describeinfo = JSON.parse(currentMachine.inquiryinfo).map(v => {
        return v.id
      });
      data.describeinfo = describeinfo;
    }

    currentMachine.cid && (data.cid = currentMachine.cid);
    // currentMachine.mid && (data.mid = currentMachine.mid);
    if (currentMachine.mid || currentMachine.pcid) {
      data.mid = currentMachine.mid || currentMachine.pcid
    }

    // 人工填写
    if (currentMachine.mconfigure) {
      data.configureinfo = currentMachine.mconfigure;
    }

    if (currentMachine.describe) {
      data.describeinfo = currentMachine.describe
    }

    // recoverytype this.data.selected 1
    // 得到回收方式
    data.recoverytype = this.data.selected;

    // this.data.pageOption  estimatefee estimatetype assessorderid 3
    // 得到  estimatefee estimatetype assessorderid
    data.estimatefee = this.data.totalPrice;
    data.estimatetype = this.data.pageOption.frompage == 'evaluation' ? 0 : 1;
    data.staffid && (data.estimatetype = 1);
    this.data.pageOption.orderid && (data.assessorderid = this.data.pageOption.orderid);

    // 用户手动填写信息
    if (this.data.selected == 1) {
      data.dtdtime = this.data.orderDate + ' ' + this.data.orderTime;
      if (!this.data.orderDate || !this.data.orderTime) {
        return util.showSuccess('请填写预约时间');
      }
      Object.assign(data, this.data.inputDoorData);
    } else if (this.data.selected == 2) {
      Object.assign(data, this.data.inputExpressData);
    }

    // data.recoverytype 回收方式 1，上门回收； 2，快递回收；
    let needKey = {};
    if (data.recoverytype == 1) {
      data.uregion = `${that.data.provence},${that.data.city},${that.data.country}`;
      needKey.uaddress = '';
      needKey.uregion = '';
    } else if (data.recoverytype == 2) {
      needKey.ubank = '';
      needKey.ubankcard = '';
      needKey.ubname = '';
      if (this.data.isGetExpress) {
        data.doexpress = 1;
        data.uregion = this.data.userRegion.join(',');
        needKey.uaddress = '';
        needKey.uregion = '';
      } else {
        data.doexpress = 0;
      }
    }

    needKey.uname = '';
    needKey.uphone = '';
    for (let key in needKey) {
      if (!data[key]) {
        return util.showSuccess('请完善您的个人信息');
      }
    }
    // console.log("pageOption", this.data.pageOption);
    // console.log(data);
    // return;
    util.post('/api/order/placeOrder', data).then(res => {
      console.log(res);


      if (res.code == 1) {

        wx.removeStorage({
          key: 'currentmachine',
        });

        let resultData = res.data;
        resultData.name = that.data.pageOption.name;
        resultData.totalPrice = that.data.totalPrice;
        resultData.recycleType = that.data.selected == 1 ? "上门回收" : "快递回收";
        resultData.forecastTime = that.data.orderDate + ' ' + that.data.orderTime;

        wx.setStorage({
          data: resultData,
          key: 'currentResult',
        });

        return util.showSuccess(res.msg, function () {
          wx.redirectTo({
            url: '/pages/orderinformation/orderinformation',
          });
        });

        // wx.removeStorage({
        //   key: 'coupon',
        // });

        // wx.showModal({
        //   cancelColor: '#000000',
        //   cancelText: '返回',
        //   title: '提示',
        //   confirmText: '查看订单',
        //   content: res.msg,
        //   success(res) {
        //     if (res.confirm) {
        //       wx.switchTab({
        //         url: '/pages/order/order',
        //       });
        //     }
        //     if (res.cancel) {
        //       wx.switchTab({
        //         url: '/pages/index/index',
        //       });
        //     }
        //   }
        // });

        // util.showSuccess(res.msg, function(){
        //   wx.switchTab({
        //     url: '/pages/index/index',
        //   });
        // });
      } else {
        return util.showSuccess(res.msg);
      }
    });


  },
  // 编辑用户信息，已废弃
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




    // 回收平台邮寄地址
    util.post('/api/user/getPlatforminfo').then(res => {
      that.setData({
        platformInfo: res.data
      });
    });

    // 获取订单信息
    if (this.data.pageOption.orderid) {
      util.post('/api/order/orderDetail', {
        orderid: this.data.pageOption.orderid
      }).then(res => {
        that.setData({
          order: res.data
        });
      });
    }

    // 获取用户地址

    // let userInfo = wx.getStorageSync('userinfo');
    // if (userInfo) {
    //   util.post('/api/user/getUserInfo', {
    //     userid: userInfo.uid
    //   }).then(res => {
    //     console.log(res);
    //     if (res.code == 1) {
    //       wx.setStorage({
    //         data: res.data,
    //         key: 'userdata',
    //       });
    //     }
    //   });
    // } else {}


  },
  // 显示运费说明
  showExpressFree(e) {
    wx.previewImage({
      urls: [that.data.freight],
      current: that.data.freight
    });
  },
  // 省份改变
  provenceChange(e) {
    let idx = e.detail.value;
    let val = this.data.provenceList[idx];
    util.post("/api/order/area", {
      areaid: val.id,
      key: 1
    }).then(res => {
      that.setData({
        cityList: res.data
      });
    });
    this.setData({
      provence: val.name,
      city: '',
      country: ''
    });
  },
  // 城市改变
  cityChange(e) {
    let idx = e.detail.value;
    let val = this.data.cityList[idx];
    util.post("/api/order/area", {
      areaid: val.id,
      key: 2
    }).then(res => {
      that.setData({
        countryList: res.data,
      });
    });
    this.setData({
      city: val.name,
      country: ''
    });
  },
  // 区域改变
  countryChange(e) {
    let idx = e.detail.value;
    let val = this.data.countryList[idx];
    this.setData({
      country: val.name
    });
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
        if (!userinfo) {
          return util.showError('请您先登录', function (e) {
            wx.navigateTo({
              url: '/pages/login/login',
            });
          });
        };
        util.post('/api/user/getUserInfo', {
          userid: userinfo.uid
        }).then(res => {
          console.log(res);
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
    console.log(e.detail.value);
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
    // let orderTime = this.data.timeSelected[e.detail.value];
    let orderTime = e.detail.value;
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
    if (this.data.pageOption.frompage == 'evaluation' || this.data.pageOption.frompage == 'othercalcprice') {
      wx.navigateBack()

    } else if (this.data.pageOption.frompage == 'recyclelist') {

    } else {
      wx.navigateTo({
        url: `/pages/evaluation/evaluation?id=${this.data.order.m_id}&cid=${this.data.order.c_id}`,
      });
    }
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