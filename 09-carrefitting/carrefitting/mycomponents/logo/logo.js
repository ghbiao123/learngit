Component({
  properties: {
    text: {
      type:String,
      value: ''
    }
  },
  methods: {
    pageToIndex(){
      wx.switchTab({
        url: '/pages/index/index',
      });
    }
  }
});