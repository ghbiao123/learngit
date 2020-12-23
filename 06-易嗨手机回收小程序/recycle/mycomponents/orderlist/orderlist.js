let util = require("../../utils/util");
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
    // 查看验机报告
    getQualityReport(e){
      let ordersn = e.currentTarget.dataset.ordersn;
      wx.navigateTo({
        url: '/pages/qualityreport/qualityreport?ordersn=' + ordersn,
      });
    },
    // 输入快递单号
    expressNumberInput(e) {
      this.data.pno = e.detail.value;
    },
    // 确认快递单号
    confirmExpressOrder(e) {
      let that = this;
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
        userid: uid,
      };

      wx.showModal({
        title:"提示",
        content: "确认发货后，快递信息不可修改",
        success(res) {
          if (res.confirm) {
            util.post('/api/order/upPackageNo', data).then(res => {
              if (res.code == 1) {
                //  确认订单后要更新数据: 订单是否有快递订单，是否有质检报告

                that.data.list[idx].c_no = data.pno;
                that.data.list[idx].order_status = 4;
                let newList = [...that.data.list];
                that.setData({
                  list: newList
                });

                return util.showSuccess(res.msg);
              } else {
                util.showError(res.msg);
              }
            });
          }
          if (res.cancel) {

          }
        }
      });

    },
    // 复制订单单号
    copyText(e) {
      let text = e.currentTarget.dataset.text;
      wx.setClipboardData({
        data: text,
        success(res) {
        }
      });
    },
    // 获取订单详情
    getDetail(e) {
      let id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '/pages/order/orderdetail?id=' + id,
      });
    }
  }
});