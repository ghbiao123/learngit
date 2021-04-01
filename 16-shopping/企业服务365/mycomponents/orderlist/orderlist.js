let util = require("../../utils/util");
Component({
  properties: {
    list: {
      type: Array,
      value: [],
      observer(newVal, oldVal){
        let orderList = newVal.map(v=>{
          v.goodsinfo.goods_pictures = util.getSiteRoot() + v.goodsinfo.goods_pictures;
          return v;
        });
        this.setData({
          orderList
        });
      }
    }
  },
  methods: {
    
    getDetail(e){
      let id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '/pages/orderinfo/orderinfo?id=' + id,
      });
    }
  }
});