let util = require("../../utils/util");
Component({
  properties: {
    goodsList: {
      type: Array,
      value: [],
      observer: function (newVal, oldVal) {
        let list = util.getImageFullUrl(newVal, 'goods_pictures');
        list = list.map(v => {
          v.sales_volume = util.getFormatNum(v.sales_volume);
          return v;
        });
        this.setData({
          list
        });
      }
    }
  },
  methods: {
    getGoodsDetail(e) {
      let id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '/pages/goodsinfo/goodsinfo?id=' + id,
      });
    }
  }
});