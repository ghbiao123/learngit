let util = require("../../utils/util");
Component({
  properties: {
    list: {
      type: Array,
      value: [],
      observer: function(newVal, oldVal){
        let fbList = newVal.map(v=>{

          v.images = v.images ? v.images.split(",") : '';

          return v;
        });
        this.setData({
          fbList
        });
      }
    }
  },
  methods: {
    showImage(e){
      let arrIdx = e.currentTarget.dataset.arridx;
      let idx = e.currentTarget.dataset.idx;
      let arr = this.data.fbList[arrIdx].images;
      util.showImage(arr, idx);
    },
  }
});
