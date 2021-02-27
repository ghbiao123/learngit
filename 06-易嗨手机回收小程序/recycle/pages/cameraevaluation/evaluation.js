// pages/evaluation/evaluation.js
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
    checkbox: [],
    isLogin: false,
    showOneButtonDialog: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;

    this.data.pageOption = options;


    // init 
    this.init();

  },

  // getTip
  getTip(e){
    let tip = e.detail.tip;
    // console.log(id);
    this.setData({
      showOneButtonDialog: true,
      dialogTip: tip
    });
  },
  tapDialogButton(){
    this.setData({
      showOneButtonDialog: false
    });
  },

  // 输入设备型号
  modelInput(e) {
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
    util.post('/api/products/getOtherInquiryInfo', {
      cid: this.data.pageOption.cid,
      cateid: this.data.pageOption.cateid
    }).then(res => {
      if (res.code == -1) {
        return util.showSuccess(res.msg, function () {
          wx.navigateBack();
        });
      }
      if (res.data.length == 0) {
        wx.redirectTo({
          url: '/pages/evaluation/othercalcprice',
        });
      }

      if (this.data.pageOption.cid == 4) {
        _key = 'pinquiryinfo';

      } else if (this.data.pageOption.cid == 5) {

        _key = 'oeinquiryinfo';
      }

      let _data = res.data;

      // 将唯一一个多选选项排到最后
      for (let i = 0; i < _data.length; i++) {
        if (_data[i].multikey == 1) {
          let item = _data.splice(i, 1);
          _data.push(item[0]);
        }
      }

      _data[_data.length - 1][_key].unshift({
        id: 'none',
        name: '无'
      });

      let arrChecked = new Array(_data[_data.length - 1][_key].length).fill(false);

      let progressData = that.data.progressData;
      progressData.all = _data.length;

      calculateHeight.calculateHeight().then(res=>{
        let scrollHeight = res;
        
        that.setData({
          name: this.data.pageOption.name,
          _key,
          _data,
          progressData,
          hideCode: progressData.all,
          arrChecked,
          scrollHeight,
        });
      });

    });

    return;


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
  radioChange(event) {
    let e = event.detail;
    let val = e.detail.value;
    let id = e.currentTarget.dataset.id;
    let progressData = this.data.progressData;
    if (val.indexOf('none') >= 0) {
      let arrChecked = this.data.arrChecked.fill(false);
      arrChecked[0] = true;
      this.setData({
        arrChecked
      });
    }

    if (typeof val != 'object') {
      this.data.reqData.inquiryinfo[id] = this.data._data[id][_key].filter(v => v.id == val)[0];
    } else if (typeof val == 'object') {

      if(val.indexOf("none")>=0){
        val = ["no"]
      }

      this.data.checkbox = this.data._data[id][_key].filter(v => {
        if (val.indexOf(String(v.id)) >= 0) {
          return v;
        }
      });

    }


    progressData.chose = Object.keys(this.data.reqData.inquiryinfo).length;

    if(typeof val == 'object' && val.length > 0){
      progressData.chose += 1;
    }

    let progress = util.getToPersent(progressData.chose / progressData.all);

    this.setData({
      progress,
      progressData
    });

  },// 获取用户信息
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
            if(ret.code == -3){
              return util.showSuccess(ret.msg);
            }
            let userInfo = wx.getStorageSync('userinfo');
            userInfo.phonestatus = 1;
            wx.setStorage({
              data: userInfo,
              key: 'userinfo',
            });
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
  // 跳转估价结果页
  getResult(e) {
    // 关闭actionsheet
    // this.close();

    if(that.data.progressData.chose != that.data.progressData.all){
      return util.showSuccess("请完善选项");
    }

    let data = Object.assign({}, this.data.reqData);
    // 将用户所选数据进行处理
    let inquiryinfo = [];
    for (let key in data.inquiryinfo) {
      inquiryinfo.push(data.inquiryinfo[key]);
    }
    inquiryinfo.push(...this.data.checkbox);
    data.inquiryinfo = JSON.stringify(inquiryinfo);

    // 数据处理完毕， 手机价格计算可直接使用
    data.cid = this.data.pageOption.cid;
    data.mid = this.data.pageOption.mid ? this.data.pageOption.mid : 0;
    this.data.pageOption.bid && (data.bid = this.data.pageOption.bid);
    this.data.pageOption.cateid && (data.cateid = this.data.pageOption.cateid);

    let userInfo = wx.getStorageSync('userinfo');
    // if (!userInfo) {
    //   return util.showError('请您先登录', function () {
    //     wx.navigateTo({
    //       url: '/pages/login/login',
    //     });
    //   })
    // }
    data.userid = userInfo.uid;

    // this.data.machineModel = this.data.name;
    // data.modelname = this.data.machineModel;

    data.modelname = this.data.name;

    data.otype = 0;


    util.post('/api/order/calculateOtherNa', data).then(res => {
      if (res.code == 1) {
        wx.redirectTo({
          url: '/pages/manualresult/manualresult',
        });
      }else{
        return util.showSuccess(res.msg);
      }
    });

    return;

    wx.setStorage({
      data: data,
      key: 'currentmachine',
      success() {
        wx.navigateTo({
          url: '/pages/cameranotes/cameranotes',
        });
      }
    });
    // util.post('/api/order/calculateOtherNa', data).then(res=>{

    // });

    // 共两种情况：  系统估价，人工估价

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