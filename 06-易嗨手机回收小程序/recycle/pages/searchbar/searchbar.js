// pages/searchbar/searchbar.js
import util from "../../utils/util";
let that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Storage:[],
    showList: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;

    // 查询历史记录
    this.getStorageData();

    this.init();

  },
  init(){
    util.post('/api/products/getSearchRecord').then(res=>{
      that.setData({
        hotList: res.data.hotrecord
      });
    });
  },

  // search confirm
  result(e){
    let key = e.detail;

    // 更新搜索历史记录
    this.addStorageData(key);

    // 请求数据  
    this.getSearchResult(key);

    // this.getList(key);

  },
  // 这里是用户填写关键字来进行搜索，需要列表来展示搜索结果
  getInputText(e){
    let key = e.detail;
    if(!key){
      this.setData({
        showList: false
      });
      return;
    }
    this.getList(key);
  },
  async getList(keywords) {
    keywords = keywords.replace(/\s/g, "");

    let arrKeys = [];

    let reg = /[0-9a-zA-Z_]{1,}/g;
    let ret = reg.exec(keywords);
    let char = ret ? ret[0] : "";
    if(char){
      // 有数字，字母 
      arrKeys = keywords.split(char);
      arrKeys.push(char);
    }else{
      // 没有数字字母
      arrKeys.push(keywords);
    }

    

    arrKeys = arrKeys.filter(v=>{
      if(v) return v;
    });

    let list = await new Promise((resolve, reject)=>{
      util.post('/api/products/searchEmodel', {
        keywords: arrKeys[0]
      }).then(res => {
        resolve(res.data);
      });
    });

    if(arrKeys[1]){ 
      list = list.filter(v=>{
        let name = v.name.toLocaleLowerCase().replace(/\s/g, "");
        let key = arrKeys[1].toLocaleLowerCase();
        if(name.indexOf(key)>=0)  return v;
      });
    }

    that.setData({
      showList: true,
      result: list
    });

    // util.post('/api/products/searchEmodel', {
    //   keywords
    // }).then(res => {
       
    //   that.setData({
    //     showList: true,
    //     result: res.data
    //   });
    // });
  },
  getEvaluation(e) {
    that.setData({
      showList: false,
    });

    let mid = e.currentTarget.dataset.id;
    let mname = e.currentTarget.dataset.name;
    let cid = e.currentTarget.dataset.cid;
    let userInfo = wx.getStorageSync('userinfo');
    
    let idx = e.currentTarget.dataset.idx;
    let data = this.data.result[idx];

    // 增添搜索记录
    this.addStorageData(mname);


    if (userInfo) {
      util.post('/api/products/searchStatistics', {
        mid,
        mname,
        userid: userInfo.uid,
        cid
      });
    }

    if (cid >= 4) {
      wx.navigateTo({
        url: `/pages/cameraevaluation/evaluation?cateid=${data.oecid || data.pcateid}&mid=${data.id}&cid=${data.cid}&bid=${data.bid}&name=${data.name}`
        // url: '/pages/evaluation/othercalcprice',
      });
      return
    }
    wx.navigateTo({
      url: `/pages/evaluation/evaluation?id=${mid}&cid=${cid}`,
    });

    return;
    


  },

  // 根据input value请求内容
  getSearchResult(val){
    // 跳转另一个页面，呈现搜索结果
    wx.navigateTo({
      url: '/pages/searchresult/searchresult?keywords='+ val,
    });
    
  },
  /**
   * Stprage 查， 增， 清空
   *  
   */
  // 查询
  getStorageData(){
    let Storage = wx.getStorageSync('browsingHistory') || [];
    this.setData({
      Storage
    });
  },
  // 增加记录
  addStorageData(item){
    if(!item.trim()){return}
    this.data.Storage.unshift(item);
    let Storage = this.data.Storage;
    Storage = Array.from(new Set(Storage));
    this.setData({Storage});
    wx.setStorage({
      data: Storage,
      key: 'browsingHistory',
    });
  },
  // 清空
  clearStorageData(){

    wx.showModal({
      title: '提示',
      content: '确认删除全部历史记录？',
      success(res){
        if(res.confirm){
          that.setData({
            Storage: []
          });
          wx.removeStorage({
            key: 'browsingHistory',
          });
        }
      }
    });

    
  },

  // 点击记录查询
  getItem(e){
    let key = e.currentTarget.dataset.key;
    this.getSearchResult(key);
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