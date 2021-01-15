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
      name: "",
      sfzh: "",
      phone: "",
      sfaddress: "",
      gongzhong: "",
      certimages: [],
      zhengjianimage: [],
      sfzimages: [],
      skill: "",
      peixun: "",
      banknum: "",
      bankdetail: ""
    },
    arrServer: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;

    this.init();

  },
  // init
  init(){

    // 初始化当前数据，
    
    // 服务项
    util.post("/api/shou_ye/getGongzhong").then(res=>{
      that.setData({
        arrServer: res.data
      });
    });

    let userInfo = this.data.userInfo ? this.data.userInfo : wx.getStorageSync('userinfo');
    util.post("/api/wxlogin/getUserData", {
      users_id: userInfo.id
    }).then(res=>{
      
      that.setData({
        userInfo: res.data
      });

    });

  },

  // add image
  addImage(e){

    let key = e.currentTarget.dataset.key;
    let idx = e.currentTarget.dataset.idx;

    // 限定 count
    let count = 0;
    if(key == "certimages"){
      count = 8 - this.data.reqData.certimages.length
    }else{
      count = 1;
    }

    if(count <= 0){
      util.showSuccess("最多上传8张图片");
      return;
    }

    wx.chooseImage({
      count,
      success(res){
        let arr = res.tempFilePaths;
        arr.forEach(v=>{
          wx.uploadFile({
            filePath: v,
            name: 'image',
            url: util.getSiteRoot() + "/index.php/api/personal/upload",
            success(ret){
              let reqData = that.data.reqData;
              if(key == "certimages" && reqData.certimages.length >=8){
                return
              }

              let url = util.getSiteRoot() + JSON.parse(ret.data).data.replace(/\\/g, "/");

              idx? reqData[key][idx-1] = url : reqData[key].push(url);

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
  deleteImage(e){
    let idx = e.currentTarget.dataset.idx;
    let key = e.currentTarget.dataset.key;
    
    let reqData = this.data.reqData;
    reqData[key].splice(idx, 1);

    that.setData({
      reqData
    });

  },
  
  // serverChange
  serverChange(e){

    let idx = e.detail.value;
    let val = this.data.arrServer[idx];

    let reqData = this.data.reqData;
    reqData.gongzhong = val.name;

    this.setData({
      reqData
    });

  },

  // lv1Change
  lv1Change(e){
    let idx = e.detail.value;
    let levelData = Object.assign(
      this.data.levelData, 
      {
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
    }).then(res=>{

      levelData.arrLv2 = res.data.leveltwo;

      levelData.arrAllLv3 = res.data.levelthree;

      that.setData({
        levelData
      });

    });


  },

  // lv2Change
  lv2Change(e){
    let idx = e.detail.value;
    let levelData = this.data.levelData;

    levelData.lv2 = levelData.arrLv2[idx].name;
    levelData.lv3 = "";
    this.data.reqData.leveltwo_id = levelData.arrLv2[idx].id;

    levelData.arrLv3 = levelData.arrAllLv3.filter(v=> v.leveltwo_id == levelData.arrLv2[idx].id)[0].server_arr;
    
    that.setData({
      levelData
    });

  },
  // lv3Change
  lv3Change(e){
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
  submit(e){

    let userInfo = wx.getStorageSync('userinfo');

    if(!userInfo) {
      return util.showError("请您先登录", function(){

        wx.navigateTo({
          url: '/pages/login/login',
        });

      });

    }
    
    let reqData = Object.assign(this.data.reqData, e.detail.value);
    reqData.users_id = userInfo.id;


    let needData = {
      name: "",
      sfzh: "",
      phone: "",
      sfaddress: "",
      gongzhong: "",
      // certimages: [],
      // zhengjianimage: [],
      // sfzimages: [],
      // skill: "",
      // peixun: "",
      banknum: "",
      bankdetail: ""
    }

    for(let key in needData){
      if(!reqData[key]){
        return util.showSuccess("请完善信息");
      }
    }

    if(reqData.sfzimages.length !=2){
      return util.showSuccess("请上传身份证正反面照片");
    }

    if(userInfo.renzhenglist == 0){
      // 未认证，需要认证
      wx.navigateTo({
        url: '/pages/personalverify/personalverify',
      });
    }

    util.post("/api/apply/apply", reqData).then(res=>{
      if(res.code == 2001){
        util.showSuccess(res.msg, function(){
          wx.navigateBack({
            delta: 1,
          });
        });

      }else{
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