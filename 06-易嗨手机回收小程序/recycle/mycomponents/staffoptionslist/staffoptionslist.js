Component({
  properties: {
    // 配置信息
    arrConfig: {
      type: Array,
      value: [],
      observer(newVal) {
        console.log(newVal);
        let staffMachineOld = wx.getStorageSync('staffmachine');
        let arrConfigId = staffMachineOld.configure_info.split(",");
        let arrOtherId = staffMachineOld.describe_info.split(",");

      }
    },
    arrSelected: {
      type: Array,
      value: [],
      observer(newVal) {}
    },
    // 机器其他描述信息
    arrOther: {
      type: Array,
      value: [],
      observer(newVal){
        console.log(newVal);
        
      }
    },
    // 配置信息个数
    currentIndex: {
      type: Number,
      value: 0,
      observer(newVal) {
        console.log(newVal);
        this.setData({
          currentIndex: newVal
        });
      }
    },
    // 从第几个开始隐藏
    hideCode: {
      type: Number,
      value: 200,
      observer(newVal) {
        this.setData({
          hideCode: newVal,
          idx: this.data.idx
        });
      }
    },
    // 多选选项
    arrChecked: {
      type: Array,
      value: [],
      observer(newVal) {
        this.setData({
          arrChecked: newVal
        });
      }
    },
    // scroll-view 高度
    scrollHeight: {
      type: Number,
      value: 792,
      observer(newVal) {
        this.setData({
          scrollHeight: newVal
        });
      }
    },
    // _key
    key: {
      type: String,
      value: ""
    }
  },
  data: {
    arrSelected: []
  },
  observers: {
    "arrConfig,arrOther": function (newConfigVal, newOtherVal) {
      // 数据格式化
      let that = this;
      let arrC = newConfigVal.map(v => {
        return v.data;
      });
      let arrO = newOtherVal.map(v => {
        return v[that.data.key];
      });
      this.data.arrData = [...arrC, ...arrO];

      // 向组件传递的数据， 隐藏列表数据
      let arrLen = newConfigVal.length + newOtherVal.length;
      let arrSelected = new Array(arrLen).fill(0);
      arrSelected = arrSelected.map(v => {
        let data = {
          value: "",
          isShow: true
        };
        return data
      });

      this.setData({
        arrSelected
      });
    }
  },
  lifetimes: {
    attached() {

    },
    ready() {
      console.log(this)
    }
  },
  methods: {
    radioChange(e) {

      // 所选选项的id
      let id = e.detail.value;
      // 显示所选val
      let idx = e.currentTarget.dataset.idx;
      this.showValue(idx, id);

      let viewId = idx;
      this.setData({
        idx: viewId
      });

      // 向父组件传递数据
      this.triggerEvent("radioChange", e);
    },
    // 显示所选内容
    showValue(idx, id) {

      if (idx == this.data.arrData.length - 1) return;

      // item => 当前所选选项
      let item = this.data.arrData[idx].filter(v => {
        return v.id == id
      })[0];

      let arrSelected = [...this.data.arrSelected];
      arrSelected[idx].value = item.name;
      arrSelected[idx].isShow = false;

      this.setData({
        arrSelected
      });

    },
    // 修改配置按钮
    changeConfig(e) {
      let idx = e.currentTarget.dataset.idx;
      let arrSelected = this.data.arrSelected;
      arrSelected[idx].isShow = !arrSelected[idx].isShow;
      this.setData({
        arrSelected
      });
    }
  }
});