// / pages/evaluation/evaluation.js
let util = require("../../utils/util");
let that;
let _key;
let calculateHeight = require("../../utils/calculateHeight");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    progressData: {
      chose: 0,
      all: 10
    },
    reqData: {
      inquiryinfo: {
        last: ''
      }
    },
    _data: {},
    type: '', // mobile || pc
    isUpdateImage: false, // 是否上传图片
    imageUrl: [],
    reqImageUrl: [],
    winConfigId: {},
    showActionsheet: false,
    groups: [{
        text: '人工估价',
        value: 1
      },
      {
        text: '立即回收',
        value: 2
      }
    ],
    isLogin: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;

    this.data.pageOption = options;

    console.log(options);

    // init 
    this.init();

  },

  // 删除图片
  cancelImage(e) {
    let id = e.currentTarget.dataset.idx;
    let imageUrl = this.data.imageUrl;
    imageUrl.splice(id, 1);
    this.data.reqImageUrl.splice(id, 1);
    this.setData({
      imageUrl
    });
  },
  // 选择图片
  chooseImage() {
    wx.chooseImage({
      count: 9,
      success(res) {
        let path = res.tempFilePaths;
        let imageUrl = that.data.imageUrl;
        imageUrl.push(...path);
        path.forEach(v => {

          wx.uploadFile({
            filePath: v,
            name: 'file',
            url: util.getSiteRoot() + '/api/common/upload',
            success(ret) {
              console.log(ret);
              let url = JSON.parse(ret.data).data.url;
              that.data.reqImageUrl.push(url);
            }
          });

        });
        that.setData({
          imageUrl
        });
      }
    });
  },
  // 初始化数据
  init() {
    let data = {};
    let url;
    console.log(this.data.pageOption);
    if (this.data.pageOption.cid == 1 || this.data.pageOption.cid == 2) {
      this.data.type = 'mobile';
    } else if (this.data.pageOption.cid == 3) {
      this.data.type = 'pc';
    }


    if (this.data.type == 'mobile') {
      // 手机
      _key = 'inquiryinfo'; // api返回的json的 特殊 key；

      data.mid = this.data.pageOption.id;
      url = '/api/order/getInquiryInfo';
      this.data.reqData.mid = data.mid;
    } else if (this.data.type == 'pc') {
      // 电脑id
      _key = 'inquiryinfopc'; // api返回的json的 特殊 key；

      // data.pcid = 1; // 苹果电脑id
      data.pcid = this.data.pageOption.id; // 其他电脑id
      url = '/api/order/getPcInquiryInfo';
      this.data.reqData.pcid = data.pcid;
    }

    // 请求数据
    util.post(url, data).then(res => {
      console.log(res.data);

      if (res.code == -1) {
        return util.showSuccess(res.msg, function () {
          wx.navigateBack();
        });
      }

      // 请求过来的数据
      let _data = res.data;


      /**
       * 手机配置信息：phone_model， phone_color， phone_storage
       * 电脑配置信息：pc_processor，pc_ram，pc_videocard，pc_ssd，pc_harddisk
       */
      let configKeys = {
        "phone_model": {
          title: "机器型号",
          name: "phonemodel"
        },
        "phone_color": {
          title: "机器颜色",
          name: "phonecolor"
        },
        "phone_storage": {
          title: "存储空间",
          name: "phonestorage"
        },
        "pc_processor": {
          title: "处理器",
          name: "pc_processor"
        },
        "pc_ram": {
          title: "内存",
          name: "pc_ram"
        },
        "pc_videocard": {
          title: "显卡",
          name: "pc_videocard"
        },
        "pc_ssd": {
          title: "固态硬盘",
          name: "pc_ssd"
        },
        "pc_harddisk": {
          title: "机械硬盘",
          name: "pc_harddisk"
        },
      }
      let currentIndex = 0;
      let arrConfigOption = [];
      for (let key in _data) {
        let title = configKeys[key];
        if (title) {
          currentIndex++;
          let data = {
            ...title,
            data: _data[key]
          }
          arrConfigOption.push(data);
        }
      }


      // 将图片路径拼接完整
      let isUpdateImage = _data.bid == 2 ? true : false;
      _data.image = util.getImageFullUrl(_data.image);

      // 将唯一一个多选选项排到最后
      for (let i = 0; i < _data.other.length; i++) {
        if (_data.other[i].multikey == 1) {
          let item = _data.other.splice(i, 1);
          _data.other.push(item[0]);
        }
      }


      // 将最后一个多选选项增添一个选项
      _data.other[_data.other.length - 1][_key].unshift({
        id: 'none',
        name: '无'
      });
      let arrChecked = new Array(_data.other[_data.other.length - 1][_key].length).fill(false);

      let progressData = that.data.progressData;
      progressData.all = _data.other.length + currentIndex;


      /**
       * 获取工作人员订单信息
       * 从storage中获取 staffmachine
       * 订单信息在跳转此页面前存入storage中
       * 
       */

      // util.post('/api/order/orderDetail', {
      //   orderid: that.data.pageOption.orderid
      // }).then(res => {
      //   console.log(res);
      //   that.data.order = res.data;
      //   let order = res.data;
      //   order.coupon_fee = order.coupon_fee ? order.coupon_fee * 1 : 0;
      //   order.estimate_fee = order.estimate_fee ? order.estimate_fee * 1 : 0;
      //   order.total_amount = order.total_amount ? order.total_amount * 1 : 0;
      // that.setData({
      //   order
      // });

      // });


      // 计算组件高度
      calculateHeight.calculateHeight().then(res => {
        let scrollHeight = res;
        that.setData({
          type: that.data.type,
          _data,
          progressData,
          hideCode: progressData.all,
          isUpdateImage,
          arrChecked,
          arrConfigOption,
          currentIndex,
          scrollHeight,
          _key,
        });
      });


    });

  },
  // 获取用户信息
  getUserInfo(e) {
    util.getUserInfo(e, function (res) {
      if (res.code == 1) {
        // util.showSuccess('登录成功，请立即估价');
        util.checkIsLogin.call(that);
      }
    });
  },
  // 获取用户手机号
  getPhoneNum(e) {
    console.log(e);
    if (e.detail.iv) {
      // 用户同意获取手机号
      // 将用户手机号更新到storage（‘currentphone’）
      wx.login({
        success(res) {
          if (!res.code) return util.showSuccess('网络错误，请重试');
          let data = {
            userid: that.data.userInfo.uid,
            code: res.code,
            encrypteddata: encodeURI(e.detail.encryptedData),
            iv: encodeURI(e.detail.iv)
          };
          util.post('/api/login/getWxBindMobile', data).then(ret => {
            console.log(ret);
            if (ret.code == -3) {
              return util.showSuccess(ret.msg);
            }
            wx.setStorage({
              data: ret.data,
              key: 'currentphone',
              success(res) {
                that.getResult();
              }
            });
          });




        }
      });


    } else {
      // 用户不同意获取手机号

    }
  },
  // 选择选项
  radioChange(event) {
    let e = event.detail;
    // val -> 所选id
    let val = e.detail.value;
    // id -> name, reqdata的key
    let id = e.currentTarget.dataset.id;

    if (val.indexOf('none') >= 0) {
      let arrChecked = this.data.arrChecked.fill(false);
      arrChecked[0] = true;
      this.setData({
        arrChecked
      });
    }

    /**
     * 选择特定选项时隐藏其他未选择选项
     */
    let currentIndex = this.data.currentIndex;
    let showCode = [];
    let hiddenCode, hideCode = this.data.hideCode;
    let progressData = this.data.progressData;
    if (this.data.type == 'mobile') {
      hiddenCode = ['1', '3', '5'];
      showCode = ['2', '4'];
    } else if (this.data.type == 'pc') {
      hiddenCode = ['34', '36', '2'];
      showCode = ['35', '1'];
    }

    if (hiddenCode.indexOf(val) == 0 || hiddenCode.indexOf(val) == 1) {
      // 5 -all hidden 第五个选项的判断
      // hideCode = this.data.type == 'pc' ? 6 : 4;
      hideCode = currentIndex + 1;
      progressData.all = hideCode;

    } else if (hiddenCode.indexOf(val) == 2) {
      // 6 - all hidden 第六个选项的判断
      // hideCode = this.data.type == 'pc' ? 7 : 5;
      hideCode = currentIndex + 2;

      progressData.all = hideCode;

    } else {
      if (hideCode < 8 && showCode.indexOf(val) < 0) {

      } else {
        // progressData.all = this.data._data.other.length + (this.data.type == 'pc' ? 5 : 3);
        progressData.all = this.data._data.other.length + currentIndex;
        hideCode = 555;
      }
    }
    this.setData({
      hideCode,
      progressData
    });

    /**
     * 将选择的选项存起来
     */
    if (Number(id) || Number(id) == 0) {
      if (id != this.data._data.other.length - 1) {
        this.data.reqData.inquiryinfo[id] = this.data._data.other[id][_key].filter(v => v.id == val)[0];
      } else if (id == this.data._data.other.length - 1) {
        this.data.reqData.inquiryinfo.last = val;
      }
    } else {
      this.data.reqData[id] = val;
      this.data.winConfigId[id] = val;
    }

    progressData.chose = Object.keys(this.data.reqData).length - 2 + Object.keys(this.data.reqData.inquiryinfo).length;
    if (!this.data.reqData.inquiryinfo.last) {
      progressData.chose--
    }
    let progress = util.getToPersent(progressData.chose / progressData.all);

    this.setData({
      progress,
      progressData
    });

  },

  // 跳转估价结果页
  getResult(e) {
    // 关闭actionsheet
    // this.close();

    let data = Object.assign({}, this.data.reqData);
    // 将用户所选数据进行处理
    let lev1 = [1, 3, 5];
    let lev2 = [34, 36, 2];
    let inquiryinfo = [];
    let keys = Object.keys(data.inquiryinfo);
    for (let key in data.inquiryinfo) {
      if (key != 'last') {
        inquiryinfo.push(data.inquiryinfo[key]);

        if (this.data.type == 'mobile' && lev1.indexOf(data.inquiryinfo[key].id) >= 0) {
          break;
        } else if (this.data.type == 'pc' && lev2.indexOf(data.inquiryinfo[key].id) >= 0) {
          break;
        }

      } else {

        // 处理多选的选项
        if (this.data.reqData.inquiryinfo.last[0] != 'none') {
          let len = this.data._data.other.length;
          let arr = this.data._data.other[len - 1][_key].filter(v => {
            if (data.inquiryinfo.last.indexOf(v.id.toString()) >= 0) {
              return v;
            }
          });
          inquiryinfo.push(...arr);
        }
      }
    }
    data.inquiryinfo = JSON.stringify(inquiryinfo);

    // 数据处理完毕， 手机价格计算可直接使用


    let url = '';
    if (this.data.type == 'mobile') {
      // 手机价格计算接口，
      url = '/api/order/calculatePrice';
    } else if (this.data.type == 'pc') {
      if (this.data._data.bid == 1) {
        // 苹果电脑价格计算数据处理
        url = '/api/order/calculatePricePc';
        let MacData = {
          pcid: data.pcid,
          pcram: data.pc_ram,
          pcssd: data.pc_ssd,
          pcvideocard: data.pc_videocard,
          inquiryinfo: data.inquiryinfo
        };
        data = MacData;
      } else {
        // 其他电脑价格计算数据处理
        url = '/api/order/calculatePricePcNa';

        if (this.data.imageUrl.length != this.data.reqImageUrl.length) {
          return util.showSuccess('正在上传图片，请稍后...');
        }

        let userInfo = wx.getStorageSync('userinfo');

        // 判断是否登录， 未登录则让用户先登录
        if (!userInfo) {
          return util.showError('请您先登录', function () {
            wx.navigateTo({
              url: '/pages/login/login',
            });
          });
        }

        let winData = {
          pcid: data.pcid,
          pcconfigure: Object.values(this.data.winConfigId).join(","),
          inquiryinfo: data.inquiryinfo,
          pictures: this.data.reqImageUrl.join(','),
          userid: userInfo.uid,
          cid: this.data._data.cid
        }

        data = winData;

      }
    }

    // 估价之后直接回退页面


    /**
     * 判断是否跟原来的配置一样
     */
    // pcram: data.pc_ram,
    //       pcssd: data.pc_ssd,
    //       pcvideocard: data.pc_videocard,

    let needKey = ["pcram", "pcssd", "pcvideocard", "phonecolor", "phonestorage", "phonemodel"];
    let needId = {
      configId: {
        value: [],
        isDiff: false
      },
      describeId: {
        value: [],
        isDiff: false
      }
    }
    needKey.forEach(v => {
      if (data[v]) {
        needId.configId.value.push(Number(data[v]));
      }
    });
    needId.configId.value = needId.configId.value.sort((a, b) => (a - b)).toString();
    let allDescribe = JSON.parse(data.inquiryinfo);
    needId.describeId.value = allDescribe.map(v => v.id).sort((a, b) => (a - b)).toString();
    let oldOption = wx.getStorageSync('staffmachine');
    // old config
    oldOption.configure_info = oldOption.configure_info.split(",").sort((a, b) => (a - b)).toString();
    // old describe
    oldOption.describe_info = oldOption.describe_info.split(",").sort((a, b) => (a - b)).toString();
    needId.configId.isDiff = needId.configId.value == oldOption.configure_info;
    needId.describeId.isDiff = needId.describeId.value == oldOption.describe_info;
    let isIdChange = (needId.configId.isDiff && needId.describeId.isDiff);
    if (isIdChange) {
      // 跟原来id一样
      wx.setStorage({
        data: oldOption,
        key: 'newstaffmachine',
        success() {
          // 跳转新页面
          wx.navigateTo({
            url: '/pages/stafforder/stafforder',
          });
        }
      });
      return;
    } else {
      // 跟原来id不一样
      oldOption.configure_info = needId.configId.value;
      oldOption.describe_info = needId.describeId.value;
    }


    util.post(url, data).then(res => {

      // 当前估价机器 Storage
      let newData = Object.assign({}, data);
      let pricevalue = res.data.totalprice;
      util.post("/api/order/doOrderInfo", {
        userid: oldOption.user_id,
        pricevalue
      }).then(ret => {
        console.log(ret);
        if (Number(ret.cinfo.par_value)) {
          oldOption.coupon_fee = ret.cinfo.par_value * 1;
        }else{
          oldOption.coupon_fee = 0;
        }
        oldOption.estimate_fee = pricevalue * 1;
        oldOption.total_amount = oldOption.coupon_fee + oldOption.estimate_fee;
        wx.setStorage({
          data: oldOption,
          key: 'newstaffmachine',
          success() {
            wx.navigateTo({
              url: '/pages/stafforder/stafforder',
            });
          }
        });
      });
      return;
      wx.setStorage({
        data: newData,
        key: 'newstaffmachine',
        success() {
          wx.navigateBack({
            delta: 1,
          });
        }
      });

    });

    return;

    // 共两种情况：  系统估价，人工估价

    // 先判断人工估价
    if (this.data.type == 'pc' && this.data._data.bid != 1) {
      /*
      // 这段代码跳转到一个新页面，新页面判断是否是提交到系统估价还是人工现场估价
      wx.setStorage({
        data: data,
        key: 'currentmachine',
        success(){
          wx.navigateTo({
            url: '/pages/notes/notes',
          });
        }
      });
      return;
      */
      // 人工估价-》提交到系统进行估价，不再进行现场估价
      data.otype = 0;
      submitOrder(function (res) {

        wx.redirectTo({
          url: '/pages/manualresult/manualresult',
        });

      });

      return;

      if (e.detail.value == 2) {
        // 用户现场扫码
        data.otype = 1;
        submitOrder(function (res) {
          wx.navigateTo({
            url: `/pages/evaluation/result?type=${that.data.type}&name=${that.data._data.name}&price=${res.data.totalprice || 0}&frompage=evaluation&otype=1&orderid=${res.data.aoid}`,
          });
        });
      } else if (e.detail.value == 1) {
        // 用户正常流程进行人工估价
        data.otype = 0;
        submitOrder(function (res) {
          wx.redirectTo({
            url: '/pages/recyclelist/recyclelist',
          });
        });
      }
    } else {
      // 普通估价

      // 

      submitOrder(function (res) {
        wx.navigateTo({
          url: `/pages/evaluation/result?type=${that.data.type}&name=${that.data._data.name}&price=${res.data.totalprice}&frompage=evaluation`,
        });
      });


    }

    function submitOrder(callBack) {
      util.post(url, data).then(res => {

        // 当前估价机器 Storage
        let newData = Object.assign({}, data);
        newData.cid = that.data._data.cid;
        wx.setStorage({
          data: newData,
          key: 'currentmachine',
        });

        if (res.code == 1) {
          callBack && callBack(res);
        } else {
          util.showSuccess(res.msg);
        }
      });
    }


  },
  // actionsheet
  showAction() {
    if (this.data.type == 'pc' && this.data._data.bid != 1) {
      this.setData({
        showActionsheet: true
      });
    } else {
      this.getResult();
    }
  },
  close: function () {
    this.setData({
      showActionsheet: false
    })
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
    // 检测是否登录并把数据挂载到AppData
    util.checkIsLogin.call(this);
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