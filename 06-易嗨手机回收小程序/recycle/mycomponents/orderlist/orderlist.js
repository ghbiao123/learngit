Component({
  properties: {
    list: {
      type: Array,
      value: [],
      observer(newVal) {
        this.setData({
          list: newVal,
          status: 1
        });
      }
    }
  },
  methods: {
    expressNumberInput(e){
      this.data.pno = e.detail.value;
    },
    confirmExpressOrder(e) {
      if (!this.data.pno) {
        return util.showSuccess('请填写快递单号');
      }
      let data = {};
      let uid = wx.getStorageSync('userinfo').uid;
      let idx = e.currentTarget.dataset.idx;
      let detail = this.data.list[idx];
      data = {
        pno: this.data.pno,
        orderid: detail.id,
        uid: uid,
      };
      
      util.post('/api/order/upPackageNo', data).then(res => {
        console.log(res);
        if (res.code == 1) {
        //  确认订单后要更新数据: 订单是否有快递订单，是否有质检报告
        } else {
          util.showError(res.msg);
        }
      });

    },
    copyText(e) {
      let text = e.currentTarget.dataset.text;
      wx.setClipboardData({
        data: text,
        success(res) {
          console.log(res);
        }
      });
    },
    getDetail(e) {
      let id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '/pages/order/orderdetail?id=' + id,
      });
    }
  }
});