let util = require('../../utils/util');
Component({
  properties: {
    list: {
      type: Array,
      value: [],
      observer(newVal){
        let newList = newVal.map(v=>{
          v.par_value = parseInt(v.par_value);
          v.etime = util.getToday(v.etime * 1000).date;
          v.stime = util.getToday(v.stime * 1000).date;
          return v;
        });
        this.setData({
          newList
        });
      }
    }
  }
});