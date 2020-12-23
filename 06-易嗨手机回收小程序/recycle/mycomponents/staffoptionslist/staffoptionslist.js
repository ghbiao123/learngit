Component({
  properties: {
    // 配置信息
    arrConfig: {
      type: Array,
      value: [],
      observer(newVal) {
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
      observer(newVal) {

      }
    },
    // 配置信息个数
    currentIndex: {
      type: Number,
      value: 0,
      observer(newVal) {
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

      // 向组件传递的数据， 隐藏列表数据
      /**
       * let data = {
       *  value,
       *  isShow,
       *  oldId,
       *  newId,
       *  type: c || o,
       * }
       */

      let staffMachineOld = wx.getStorageSync('staffmachine');
      let arrConfigId = staffMachineOld.configure_info.split(",");
      let arrOtherId = staffMachineOld.describe_info.split(",");
      let arrSelected = [];

      let arrC = newConfigVal.map((v, i) => {

        // 查出所选选项
        
        let item = v.data.filter(val => {
          return arrConfigId.indexOf(val.id.toString()) >= 0;
        })[0];
        
        // 将所选选项提交到父组件
        // 所选id
        // let val = e.detail.value;
        // reqData.key
        // let id = e.currentTarget.dataset.id;
        let e = {
          detail: {
            value: item.id.toString()
          },
          currentTarget: {
            dataset: {
              id: v.name
            }
          }
        }

        that.triggerEvent("radioChange", e);


        // 将所选选项显示到组件
        let data = {
          value: item.name,
          isShow: false,
          oldId: item.id,
          newId: item.id,
          type: "c", // c,config; o,other
        }
        arrSelected.push(data);

        return v.data;
      });

      let arrO = newOtherVal.map((v, i) => {
        let data;

        let e = {
          detail: {
            value: ""
          },
          currentTarget: {
            dataset: {
              id: i
            }
          }
        }


        // 单选
        if (v.multikey == 0) {
          let item = v[that.data.key].filter(val => {
            return arrOtherId.indexOf(val.id.toString()) >= 0;
          })[0];
          if (item) {
            e.detail.value = item.id.toString();

            data = {
              value: item.name,
              isShow: false,
              oldId: item.id,
              newId: item.id,
              type: "o", // c,config; o,other
            }
          }else{
            data = {
              value: '',
              isShow: true,
              oldId: '',
              newId: '',
              type: "o", // c,config; o,other
            }
          }

        }
        // 多选
        if (v.multikey == 1) {
          let arrChecked = v[that.data.key].map(val => {
            return arrOtherId.indexOf(val.id.toString()) >= 0 ? true : false;
          });
          e.detail.value = v[that.data.key].filter(val => {
            return arrOtherId.indexOf(val.id.toString()) >= 0;
          }).map(v => v.id.toString());

          data = {
            value: "",
            isShow: true,
            oldId: 0,
            newId: 0,
            type: "o", // c,config; o,other
          }
          that.setData({
            arrChecked
          });
        }

        if(e.detail.value){

          // 提交到父组件
          that.triggerEvent("radioChange", e);
        }

        arrSelected.push(data);

        return v[that.data.key];
      });
      this.data.arrData = [...arrC, ...arrO];

      this.setData({
        arrSelected
      });

    }
  },
  lifetimes: {
    attached() {

    },
    ready() {
    }
  },
  methods: {
    radioChange(e) {
      // 所选选项的id
      let id = e.detail.value;
      // 第几个选项
      let idx = e.currentTarget.dataset.idx;
      // 显示所选val
      this.showValue(idx, id);

      let viewId = idx;
      if(viewId != this.data.arrSelected.length - 1){
        this.setData({
          idx: viewId
        });
      }

      // 向父组件传递数据
      this.triggerEvent("radioChange", e);
    },
    // 显示所选内容
    showValue(idx, id) {
      /**
       * idx 第几个选项
       * id 所选选项id
       */

      if (idx == this.data.arrData.length - 1) return;

      // item => 当前所选选项
      let item = this.data.arrData[idx].filter(v => {
        return v.id == id
      })[0];

      let arrSelected = [...this.data.arrSelected];
      arrSelected[idx].value = item.name;
      arrSelected[idx].isShow = false;
      arrSelected[idx].newId = id;

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