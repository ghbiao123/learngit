// pages/qainput/qainput.js
let that;
let util = require("../../utils/util");
let baseURL = require('../../program.config');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arrImage: [],
    images:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
  },

  // 选择图片
  addImage() {
    wx.chooseImage({
      count: 6,
      success(res) {
        let rlt = res.tempFilePaths;
        let arrImage = that.data.arrImage;
        arrImage.push(...rlt);
        rlt.forEach(v=>{
          wx.uploadFile({
            filePath: v,
            name: 'file',
            url: baseURL.siteroot+'/index.php/api/upload/upload',
            success(result){
              that.data.images.push(result.data);
            }
          });
        });
        that.setData({
          arrImage
        });
      }
    });
  },
  // 删除所选图片
  deleteImage(e) {
    let idx = e.currentTarget.dataset.id;
    let arrImage = this.data.arrImage;
    arrImage.splice(idx, 1);
    this.data.images.splice(idx, 1);
    this.setData({
      arrImage
    });
  },
  // 提交
  submit(e) {
    let data = e.detail.value;

    let a = wx.getStorageSync('uid');
    if(!a){
      return util.showError('请您先登录！', function(){
        wx.navigateTo({
          url: '/pages/login/login',
        });
      });
    }

    if(this.data.arrImage.length!=this.data.images.length){
      return util.showSuccess('图片正在上传，请稍等');
    }

    data.uid = a;

    data.images = this.data.images.join(',');

    let needData = {
      'zhibao_no': '质保号',
      'name': '车主姓名',
      'phone': '联系方式',
      'chejia_no': '车架号',
      'chepai_no': '车牌号',
      'brand': '品牌类型',
      'p_model': '产品型号',
      'position': '施工部位',
      'year': '质保年限',
      'mendian': '门店名称',
      'address': '门店地址',
      'images': '案例照片'
    }

    for(let key in needData){
      if(!data[key]){
        return util.showSuccess(`${needData[key]}不能为空`);
      }
    }

    util._post('/api/warrantylist/add', data).then(res=>{
      if(res.code == 0){
        util.showSuccess(res.msg, function(){
          wx.navigateBack();
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