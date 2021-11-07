// pages/evaluation/result.js
let that;
let util = require('../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected: 1,
    timeAllSelected: ["09:00-11:00", "11:00-13:00", "13:00-15:00", "15:00-17:00", "17:00-19:00", "19:00-21:00", ],
    pageOption: {},
    price: 0,
    totalPrice: 0,
    couponPrice: 0,
    inputDoorData: {},
    inputExpressData: {},
    isCoupon: true,
    reQuery: true,
    isGetExpress: false,
    provence: '',
    city: '',
    country: '',
    arrDatePickerValue: [0, 0]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    this.data.pageOption = options;

    // 工作人员扫码估价不可重新询价
    if (options.frompage && options.frompage == 'recyclelist') {
      this.setData({
        reQuery: false,
      });
    }

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
      //  初始化用户信息、价格、省、市、区，省份列表

      let info = res.data;

      // 将coupon挂载到全局
      that.data.coupon = info.cinfo;

      that.data.couponPrice = Number(info.cinfo.par_value) || 0;
      that.data.price = Number(data.price);
      that.data.totalPrice = that.data.couponPrice + that.data.price;

      let regionData = info.uinfo_h.region ? info.uinfo_h.region.split(",") : [];
      let provence = regionData[0] || "",
        city = regionData[1] || "",
        country = regionData[2] || "";
      let freight = util.getImageFullUrl(info.freight);
      that.setData({
        // price: that.data.price,
        // totalPrice: that.data.totalPrice,
        couponPrice: that.data.couponPrice,
        userData: info.uinfo_h,
        provenceList: info.plist,
        provence,
        city,
        country,
        freight
      });
      // 价格数字动态改变
      this.numJump(that.data.price, 'price');
      this.numJump(that.data.totalPrice, 'totalPrice');
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

      if (provence && city) {
        let provenceItem = info.plist.filter(v => v.name == provence)[0];
        return {
          id: provenceItem.id,
          city
        }
      }

    }).then(data => {

      // 获取城市列表
      util.post("/api/order/area", {
        areaid: data.id,
        key: 1
      }).then(res => {

        let cityItem = res.data.filter(v => v.name == data.city)[0];

        that.setData({
          cityList: res.data
        });
        return {
          id: cityItem.id
        }
      }).then(data => {

        // 获取区域列表
        util.post("/api/order/area", {
          areaid: data.id,
          key: 2
        }).then(res => {
          that.setData({
            countryList: res.data,
          });
        });
      });
    });
  },

  // 数字跳动效果
  numJump(number, tagSource) {
    let that = this;
    number = Number(number);
    // let base = 0;
    let times = number > 100 ? 100 : number;
    for (let i = 1; i <= times; i++) {
      setTimeout(() => {
        let diff = Math.floor(number * i / times);
        that.setData({
          [tagSource]: diff
        });
      }, i * 15);
    }

  },

  // 数字修改, 已废弃
  numChange(number, tagSource) {
    var baseNumber = 0; //原数字
    var difference = number - baseNumber //与原数字的差
    var absDifferent = Math.abs(difference) //差取绝对值
    var changeTimes = 10;
    var changeTimes = absDifferent < changeTimes ? absDifferent : changeTimes //最多变化6次
    var changeUnit = absDifferent < changeTimes ? 1 : Math.floor(difference / 6) //绝对差除以变化次数
    // 依次变化
    for (var i = 0; i < changeTimes; i += 1) {
      // 使用闭包传入i值，用来判断是不是最后一次变化
      (function (i) {
        setTimeout(() => {
          that.setData({
            [tagSource]: that.data[tagSource] += changeUnit
          })
          // 差值除以变化次数时，并不都是整除的，所以最后一步要精确设置新数字
          if (i == changeTimes - 1) {
            that.setData({
              [tagSource]: baseNumber + difference
            });
          }
        }, 100 * (i + 1))
      })(i)
    }
  },
  // 是否显示快递回收上门服务
  getExpress(e) {
    let val = e.detail.value[0];
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


    data.userid = userInfo.uid;


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


    let coupon = that.data.coupon;

    if (coupon.id && this.data.isCoupon) {
      data.couponid = coupon.mcid;
    } else {
      data.couponid = 0;
    }


    let currentMachine = wx.getStorageSync('currentmachine');

    let needId = ['phonecolor', 'phonestorage', 'phonemodel', 'pcconfigure', 'pcram', 'pcssd', 'pcvideocard', 'pcharddisk', 'pcprocessor'];
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

    if (currentMachine.mid || currentMachine.pcid) {
      data.mid = currentMachine.mid || currentMachine.pcid
    }

    if (currentMachine.mconfigure) {
      data.configureinfo = currentMachine.mconfigure;
    }

    if (currentMachine.describe) {
      data.describeinfo = currentMachine.describe
    }


    data.recoverytype = this.data.selected;


    data.estimatefee = this.data.price;
    data.estimatetype = this.data.pageOption.frompage == 'evaluation' ? 0 : 1;
    data.staffid && (data.estimatetype = 1);
    this.data.pageOption.orderid && (data.assessorderid = this.data.pageOption.orderid);


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
      // needKey.uregion = '';
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
        return util.showSuccess('请完善信息');
      }
    }

    util.post('/api/order/placeOrder', data).then(res => {



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

    // 初始化预约时间的选项
    {
      let arrDatePicker = [
        ["今天", "明天", "后天", " "],
        []
      ];
      for (let i = 0; i < 7; i++) {
        let todayDate = new Date();
        todayDate.setDate(todayDate.getDate() + i);
        let strDate = util.getToday(todayDate.getTime()).date.replace(/\//g, "-");
        arrDatePicker[1].push(strDate);
      }
      that.data.arrDatePicker = arrDatePicker;
      that.setData({
        arrDatePicker
      });
    }
    // 初始化当前预约时间的开始时间
    this.checkStartTime();

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
  radioChange(e) {},
  // 检测开始时间
  checkStartTime(date) {
    date = date ? date : new Date();
    let oDate = util.getToday(date);
    let today = util.getToday();
    let timeSelected = [];
    // let datePickerStart = today.date.replace(/\//g, "-"),
    //   timePickerStart = today.time.substring(0, 5);

    const numEnd = 21;
    if (oDate.date == today.date) {
      // 当前日期为当天
      let nowTime = Number(today.time.split(":")[0]);
      timeSelected = this.data.timeAllSelected.filter((v, i, arr) => {

        // 09:00-11:00

        let numStart = Number(v.split(":")[0]);

        if (nowTime < numStart || nowTime >= numEnd - 2) return v;


      });

      if (nowTime > numEnd-2) {
        let arrDatePicker = that.data.arrDatePicker;
        arrDatePicker[0].shift();
        arrDatePicker[1].shift();
        that.setData({
          arrDatePicker
        });
      }

      // let nowTime = Number(today.time.split(":").toString());
      // // 判断当前日期是在8:00-22:00之间
      // if (nowTime >= 80000 && nowTime <= 220000) {

      // }
      // // 判断当前日期是在00:00-08:00之间
      // if (nowTime >= 0 && nowTime < 80000) {
      //   timePickerStart = "08:00";
      // }
      // // 判断当前日期是在22:00-00:00之间
      // if (nowTime > 220000 && nowTime < 235959) {
      //   timePickerStart = "08:00";
      //   let t = new Date();
      //   t.setDate(t.getDate() + 1);
      //   datePickerStart = t.toLocaleDateString().replace(/\//, "-");
      // }


    } else {
      // 当前日期不是当天，明天或以后的日期
      timeSelected = this.data.timeAllSelected;
    }

    that.setData({
      // timePickerStart,
      // datePickerStart,
      timeSelected
    });

  },
  // date picker column change
  dateColumnChange(e) {
    let arrDatePickerValue = this.data.arrDatePickerValue;
    let value = e.detail.value;
    arrDatePickerValue[0] = Math.min(3, value);
    arrDatePickerValue[1] = value;
    this.setData({
      arrDatePickerValue
    });

  },
  // 选择日期
  dateChange(e) {
    let orderDate = this.data.arrDatePicker[1][e.detail.value[1]];
    this.checkStartTime(orderDate);
    this.setData({
      orderDate,
      orderTime: ""
    });

  },
  // 选择时间
  timeChange(e) {
    // let orderTime = this.data.timeSelected[e.detail.value];
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

    // onload init ()
    this.onLoadInit();
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