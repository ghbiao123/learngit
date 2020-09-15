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
  methods(){
    
  }
});