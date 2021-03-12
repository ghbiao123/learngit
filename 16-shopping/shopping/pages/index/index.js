//index.js
let that;
let util = require("../../utils/util");
Page({
  data: {
    hotGoods: {
      page: 1,
      isMore: true,
      list: {
        l: [],
        r: [],
      }
    }
  },
  //事件处理函数

  onLoad: function () {
    that = this;

    this.init();
  },
  init(){

    util.post("/api/homeindex/indexInfo").then(res=>{
      let bannerList = util.getImageFullUrl(res.data.bannerlist, 'picture');
      that.setData({
        bannerList,
        noticeList: res.data.noticelist
      });
    });


    // 获取热门商品
    this.getHotGoods();

  },

  // 获取热门商品
  getHotGoods(){
    if(!this.data.hotGoods.isMore){
      return util.showSuccess('已加载所有商品');
    }
    util.post("/api/homeindex/hotGoodsList", {page: this.data.hotGoods.page}).then(res=>{
      console.log(res);
      let ret = res.data;
      let hotGoods = that.data.hotGoods;
      if(ret.current_page == ret.last_page){
        hotGoods.isMore = false
      }else{
        hotGoods.page++;
      }

      ret.data.forEach((v,i)=>{

        v.goods_pictures = util.getImageFullUrl([v.goods_pictures])
        v.sales_volume = util.getFormatNum(v.sales_volume);

        if(i%2 == 0){
          hotGoods.list.l.push(v);
        }else{
          hotGoods.list.r.push(v);
        }

        that.setData({
          hotGoods
        });

      });
      

    });
  },

  getGoodsDetail(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/goodsinfo/goodsinfo?id=' + id,
    });
    console.log(id);
  },
  onHide() {},

  onReachBottom(){

    console.log('reach bottom');
    this.getHotGoods();

  },

  onShareAppMessage: function () {

  }

})