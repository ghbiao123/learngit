// pages/shopquery/shopquery.js
let that;
let util = require('../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    isSearch:false,
    isMore: true,
    keyword: '',
    list: [],
    region: ["北京市", "河北省", "山西省", "辽宁省", "吉林省", "黑龙江省", "江苏省", "浙江省", "安徽省", "福建省", "江西省", "山东省", "河南省", "湖北省", "湖南省", "广东省", "海南省", "四川省", "贵州省", "云南省", "陕西省", "甘肃省", "青海省", "台湾省", "天津市", "上海市", "重庆市", "内蒙古自治区", "广西壮族自治区", "西藏自治区", "宁夏回族自治区", "新疆维吾尔自治区", "香港特别行政区", "澳门特别行政区"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;

    // 获取门店列表
    this.getShopList();

  },
  // 选择省份
  regionChange(e){
    let provience = this.data.region[e.detail.value];
    this.setData({provience});
    this.search(provience);
  },
  // search
  search(e){
    if(!e){
      this.data.isSearch = true;
      this.getShopList();
      return;
    }else if(this.data.keyword != e){
      this.data.list = [];
      this.data.keyword = e;
    }
    if(!this.data.isSearch){
      this.data.page = 1;
      this.data.list = []
    }
    let data = {
      keyword: this.data.keyword,
      page: this.data.page
    }
    util._post('/api/store/search', data).then(res=>{
      that.data.isSearch = true;
      that.data.isMore = res.has_more;
      let list = that.data.list;
      list.push(...res.data);
      that.setData({
        list
      });
    });
  },
  // 获取门店列表
  getShopList(){
    if(this.data.isSearch){
      this.data.page = 1
      this.data.list = []
    }
    util._post('/api/store/list',{page: this.data.page}).then(res=>{
      that.data.isMore = res.has_more;
      that.data.isSearch = false;
      let list = that.data.list;
      list.push(...res.data);
      that.setData({
        list
      });
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
    if(!this.data.isMore){
      return util.showSuccess('已加载所有门店');
    }
    this.data.page++;
    if(this.data.isSearch){
      this.search()
    }else{
      this.getShopList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})