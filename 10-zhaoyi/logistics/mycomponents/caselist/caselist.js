let util = require('../../utils/util');
Component({
  properties:{
    list:{
      type: Array,
      value: [],
      observer: function(newVal){
        let newList = newVal.map(v=>{
          v.createtime = util.getToday(v.createtime*1000).date;
          return v;
        })
        this.setData({
          newList
        });
      }
    }
  },
  methods:{
    getDetail(e){
      let id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '/pages/detail/detail?id='+id,
      });
    }
  }
});