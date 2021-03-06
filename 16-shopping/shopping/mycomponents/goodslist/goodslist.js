Component({
  properties: {
    list: {
      type: Array,
      value: []
    }
  },
  methods: {
    getGoodsDetail(e){
      let id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '/pages/goodsinfo/goodsinfo?id=' + id,
      });
      console.log(id);
    }
  }
});