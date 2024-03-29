// pages/createorder/createorder.js
let util = require("../../utils/util");
let that;
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clearValue: "", // 清除页面input内容
    reqData: {
      users_id: "",
      repair_name: "",
      repair_detail: "",
      repairimages: [],
      company_name: "",
      lianxiren: "",
      lianxiphone: "",
      repair_address: "",
    },
    levelData: {
      arrLv1: [],
      arrLv2: [],
      arrLv3: [],
      lv1: "",
      lv2: "",
      lv3: "",
      arrAllLv3: [],
      server: ""
    },
    arrServer: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;

    this.data.pageOption = app.globalData.createOrderId;

  },
  // init
  init() {

    // 初始化当前数据，
    // 1.获取一级分类
    util.post("/api/shou_ye/getFirsLevel").then(res => {

      let levelData = that.data.levelData;

      levelData.arrLv1 = res.data;
      if (!that.data.pageOption.lv1id) {
        that.setData({
          levelData
        });
        return;
      }
      levelData.lv1 = res.data.filter(v => v.id == that.data.pageOption.lv1id)[0].name;

      util.post("/api/shou_ye/getservers", {
        levelone_id: that.data.pageOption.lv1id
      }).then(res => {
         

        levelData.arrLv2 = res.data.leveltwo;
        levelData.lv2 = res.data.leveltwo.filter(v => v.id == that.data.pageOption.lv2id)[0].name;
        levelData.arrLv3 = res.data.levelthree.filter(v => v.leveltwo_id == that.data.pageOption.lv2id)[0].server_arr;
        levelData.lv3 = levelData.arrLv3.filter(v => v.id == that.data.pageOption.lv3id)[0].name;
        levelData.arrAllLv3 = res.data.levelthree;
        // 将pageOption赋值到reqData

        that.data.reqData.levelone_id = that.data.pageOption.lv1id;
        that.data.reqData.leveltwo_id = that.data.pageOption.lv2id;
        that.data.reqData.levelthree_id = that.data.pageOption.lv3id;

        // 初始化数据之后清除pageOption
        that.data.pageOption = {};

        that.setData({
          levelData
        });

      });
    });

    // 服务项
    util.post("/api/shou_ye/getServer").then(res => {
      that.setData({
        arrServer: res.data
      });
    });

    // 初始化用户信息
    wx.getStorage({
      key: 'userinfo',
      success(res){
        let userInfo = res.data;
        that.setData({
          userInfo
        });
      },
      fail(){
        that.setData({
          userInfo: {}
        });
      }
    });

  },
  // showImage
  showImage(e){
    let key = e.currentTarget.dataset.key;
    let idx = e.currentTarget.dataset.idx;
    let arr = this.data.reqData[key];
    util.showImage(arr, idx);
  },
  // add image
  addImage() {
    let count = 8 - this.data.reqData.repairimages.length;
    if (count <= 0) {
      util.showSuccess("最多上传8张图片");
      return;
    }
    wx.chooseImage({
      count,
      success(res) {
        let arr = res.tempFilePaths;
        arr.forEach(v => {
          wx.uploadFile({
            filePath: v,
            name: 'image',
            url: util.getSiteRoot() + "/index.php/api/personal/upload",
            success(ret) {
              let reqData = that.data.reqData;
              if (reqData.repairimages.length >= 8) {
                return
              }
              let url = util.getSiteRoot1() + JSON.parse(ret.data).data.replace(/\\/g, "/");
              reqData.repairimages.push(url);
              that.setData({
                reqData
              });
            }
          });
        });
      }
    });

  },

  // delete image
  deleteImage(e) {
    let idx = e.currentTarget.dataset.idx;

    let reqData = this.data.reqData;
    reqData.repairimages.splice(idx, 1);

    that.setData({
      reqData
    });

  },

  // serverChange
  serverChange(e) {

    let idx = e.detail.value;

    let val = this.data.arrServer[idx];

    this.data.reqData.servers_id = val.id;

    let levelData = this.data.levelData;
    levelData.server = val.name;

    this.setData({
      levelData
    });

  },

  // lv1Change
  lv1Change(e) {
    let idx = e.detail.value;
    let levelData = Object.assign(
      this.data.levelData, {
        arrLv2: [],
        arrLv3: [],
        lv1: "",
        lv2: "",
        lv3: "",
      }
    );


    let val = levelData.arrLv1[idx];

    levelData.lv1 = val.name;
    this.data.reqData.levelone_id = val.id;

    util.post("/api/shou_ye/getservers", {
      levelone_id: that.data.reqData.levelone_id
    }).then(res => {

      levelData.arrLv2 = res.data.leveltwo;

      levelData.arrAllLv3 = res.data.levelthree;

      that.setData({
        levelData
      });

    });


  },

  // lv2Change
  lv2Change(e) {
    let idx = e.detail.value;
    let levelData = this.data.levelData;

    levelData.lv2 = levelData.arrLv2[idx].name;
    levelData.lv3 = "";
    this.data.reqData.leveltwo_id = levelData.arrLv2[idx].id;

    levelData.arrLv3 = levelData.arrAllLv3.filter(v => v.leveltwo_id == levelData.arrLv2[idx].id)[0].server_arr;

    that.setData({
      levelData
    });

  },
  // lv3Change
  lv3Change(e) {
    let idx = e.detail.value;
    let levelData = this.data.levelData;
    let val = levelData.arrLv3[idx];
    levelData.lv3 = val.name;
    this.data.reqData.levelthree_id = val.id;

    this.setData({
      levelData
    });

  },

  // submit
  submit(e) {

    let userInfo = wx.getStorageSync('userinfo');

    if (!userInfo) {
      return util.showError("请您先登录", function () {

        wx.navigateTo({
          url: '/pages/login/login',
        });

      });

    }

    let reqData = Object.assign(this.data.reqData, e.detail.value);
    reqData.users_id = userInfo.id;

    let needData = {
      repair_name: "",
      repair_detail: "",
      company_name: "",
      lianxiren: "",
      lianxiphone: "",
      repair_address: "",
    }

    for (let key in needData) {
      if (!reqData[key]) {
        return util.showSuccess("请完善信息");
      }
    }

    if (userInfo.renzhenglist == 0) {
      // 未认证，需要认证
      wx.navigateTo({
        url: '/pages/personalverify/personalverify',
      });
    }

    util.post("/api/repair/createRepair", reqData).then(res => {
      if (res.code == 2001) {
        // 清除数据
        let reqData = {
          users_id: "",
          repair_name: "",
          repair_detail: "",
          repairimages: [],
          company_name: "",
          lianxiren: "",
          lianxiphone: "",
          repair_address: "",
        }

        let levelData = Object.assign(that.data.levelData, {
          lv1: "",
          lv2: "",
          lv3: "",
          server: ""
        });
        that.setData({
          levelData,
          reqData,
          clearValue: ""
        });
        util.showSuccess(res.msg, function(){
          wx.switchTab({
            url: '/pages/main/main',
          });
        });
      } else {
        util.showSuccess(res.msg);
      }
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