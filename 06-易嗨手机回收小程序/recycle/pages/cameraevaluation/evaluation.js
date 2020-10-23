// pages/evaluation/evaluation.js
let util = require("../../utils/util");
let that;
let _key;
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
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;

    this.data.pageOption = options;

    console.log(options);

    // init 
    return;
    this.init();

  },

  // 输入设备型号
  modelInput(e){
    this.data.machineModel = e.detail.value;
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
      console.log(res);

      if (res.code == -1) {
        return util.showSuccess(res.msg, function () {
          wx.navigateBack();
        });
      }

      let _data = res.data;

      let isUpdateImage = _data.bid == 2 ? true : false;

      _data.image = util.getImageFullUrl(_data.image);

      _data.other[_data.other.length - 1][_key].unshift({
        id: 'none',
        name: '无'
      });

      let arrChecked = new Array(_data.other[_data.other.length - 1][_key].length).fill(false);

      let progressData = that.data.progressData;
      progressData.all = _data.other.length + (this.data.type == 'pc' ? 5 : 3);

      that.setData({
        type: this.data.type,
        _data,
        progressData,
        hideCode: progressData.all,
        isUpdateImage,
        arrChecked,
      });
    });

  },
  // 选择选项
  radioChange(e) {

    let val = e.detail.value;
    let id = e.currentTarget.dataset.id;
    if (val.indexOf('none') >= 0) {
      let arrChecked = this.data.arrChecked.fill(false);
      arrChecked[0] = true;
      this.setData({
        arrChecked
      });
    }

    let hiddenCode, hideCode;
    let progressData = this.data.progressData;
    if (this.data.type == 'mobile') {
      hiddenCode = ['1', '3', '5'];
    } else if (this.data.type == 'pc') {
      hiddenCode = ['34', '36', '2'];
    }
    if (hiddenCode.indexOf(val) == 0 || hiddenCode.indexOf(val) == 1) {
      // 5 -all hidden
      hideCode = this.data.type == 'pc' ? 6 : 4;
      progressData.all = hideCode;

    } else if (hiddenCode.indexOf(val) == 2) {
      // 6 - all hidden
      hideCode = this.data.type == 'pc' ? 7 : 5;
      progressData.all = hideCode;

    } else {
      progressData.all = this.data._data.other.length + (this.data.type == 'pc' ? 5 : 3);
      hideCode = 555;
    }
    this.setData({
      hideCode,
      progressData
    });


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
    this.close();


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

    // 共两种情况：  系统估价，人工估价

    // 先判断人工估价
    if (this.data.type == 'pc' && this.data._data.bid != 1) {
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
    if(this.data.type == 'pc' && this.data._data.bid != 1){
      this.setData({
        showActionsheet: true
      });
    }else{
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