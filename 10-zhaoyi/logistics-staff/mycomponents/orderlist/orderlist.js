Component({
  properties: {
    list: {
      type: Array,
      value: [],
      observer(newVal){
        this.setData({
          list: newVal
        });
      }
    }
  },
  methods:{
    getOrderDetail(e){
      let id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '/pages/orderdetail/orderdetail?id='+id,
      });
    }

  }
});