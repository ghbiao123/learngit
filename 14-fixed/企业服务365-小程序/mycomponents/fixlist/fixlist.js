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
        url: '/pages/fixdetail/fixdetail?id=' + id,
      });
    },
    getCancel(e){

      let repair_id = e.currentTarget.dataset.id;
      let users_id = wx.getStorageSync('userinfo').id;

      let data = {
        repair_id,
        users_id
      }

      this.triggerEvent("cancel", data);

    }

  }
});