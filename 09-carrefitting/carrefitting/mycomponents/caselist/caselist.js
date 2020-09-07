Component({
  properties:{
    list:{
      type: Array,
      value: [],
      observer: function(newVal){
        this.setData({
          list: newVal
        });
      }
    }
  },
  methods:{
    getDetail(e){
      let id = e.currentTarget.dataset.id;
      console.log(id);
      wx.navigateTo({
        url: '/pages/detail/detail?type=case&id='+id,
      });
    }
  }
});