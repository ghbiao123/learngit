Component({
  properties: {
    isShow: {
      type: Boolean,
      value: false,
      observer(newVal){
        this.setData({
          isShow: newVal
        });
      }
    },
  },
  methods: {
    confirm(e){
      this.triggerEvent('getPrompt', e.detail.value.val);
      this.setData({
        isShow: false
      });
    },
    cancel(){
      this.setData({
        isShow: false
      });
    }
  }
});