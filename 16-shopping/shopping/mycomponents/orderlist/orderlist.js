Component({
  properties: {
    list: {
      type: Array,
      value: []
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