// pages/changeperinfo/changeperinfo.js
let util = require("../../utils/util");
let that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: "",
    reqData: {

    },
    arrServer: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;


    wx.getStorage({
      key: 'userinfo',
      success(res) {
        let reqData = res.data;
        let avatar = reqData.headimage;
        that.setData({
          reqData,
          avatar
        });
      }
    });

    // 服务项
    util.post("/api/shou_ye/getGongzhong").then(res=>{
      that.setData({
        arrServer: res.data
      });
    });

  },

  // ipt change
  iptChange(e){
    this.data.reqData[e.currentTarget.dataset.key] = e.detail.value;
  },
// serverchange
  serverChange(e){

    let idx = e.detail.value;
    let val = this.data.arrServer[idx];

    let reqData = this.data.reqData;
    reqData.gongzhong = val.name;

    this.setData({
      reqData
    });

  },

  // submit
  submit(e) {
    let data = e.detail.value;
    console.log(data);
    data.headimage = this.data.avatar;
    data.users_id = this.data.reqData.id;
    data.certimages = this.data.reqData.certimages;
    data.gongzhong = this.data.reqData.gongzhong;
    util.post("/api/personal/updatePersonalData", data).then(res => {
      if (res.code == 2001) {
        util.showSuccess(res.msg, function () {
          let userInfo = Object.assign(that.data.reqData, data);
          wx.setStorage({
            data: userInfo,
            key: 'userinfo',
            success() {
              wx.navigateBack({
                delta: 1,
              });
            }
          });

        });
      }else{
        util.showSuccess(res.msg);
      }
    });
  },
  // 展示图片
  showImage(e) {
    let key = e.currentTarget.dataset.key;
    let idx = e.currentTarget.dataset.idx;
    let arr = this.data.reqData[key];
    util.showImage(arr, idx);
  },
  // 选择头像
  getAvatar() {
    wx.chooseImage({
      count: 1,
      success(res) {
        let v = res.tempFilePaths[0];
        wx.uploadFile({
          filePath: v,
          name: 'image',
          url: util.getSiteRoot() + "/index.php/api/personal/upload",
          success(ret) {
            let url = util.getSiteRoot1() + JSON.parse(ret.data).data.replace(/\\/g, "/");
            that.setData({
              avatar: url
            });
          }
        });
      }
    });
  },
  addImage() {
    // let count = 8 - this.data.reqData.orderimages.length;
    // if (count <= 0) {
    //   util.showSuccess("最多上传8张图片");
    //   return;
    // }
    wx.chooseImage({
      count: 9,
      success(res) {
        let arr = res.tempFilePaths;
        arr.forEach(v => {
          wx.uploadFile({
            filePath: v,
            name: 'image',
            url: util.getSiteRoot() + "/index.php/api/personal/upload",
            success(ret) {
              let reqData = that.data.reqData;
              // if (reqData.certimages.length >= 8) {
              //   return
              // }
              let url = util.getSiteRoot1() + JSON.parse(ret.data).data.replace(/\\/g, "/");
              reqData.certimages.push(url);
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
    reqData.certimages.splice(idx, 1);

    that.setData({
      reqData
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